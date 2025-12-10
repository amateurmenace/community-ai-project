import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, SearchResultItem, CivicBriefing } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

export const analyzeDocument = async (content: string, mimeType: string): Promise<AnalysisResult> => {
  let parts: any[] = [];
  let tools: any[] = [];

  const systemInstruction = `
    You act as a "Community Reader" tool designed to make complex government/civic documents accessible to the public.
    
    You MUST return valid JSON. Do not include markdown formatting like \`\`\`json.
    
    Structure:
    1. title: A generated title for the document content.
    2. summary: A very brief abstract (1-2 sentences).
    3. executiveSummary: A comprehensive, standard-level professional summary of the document. Constraint: STRICTLY Maximum 7 sentences. Keep it accurate to the source.
    4. highlights: An array of exactly 10 strings, each being a key takeaway or critical point.
    5. wordCloud: An array of 15 objects with 'text' (keyword) and 'weight' (1-5).
    6. snippets: An array of 10-15 objects representing direct quotes. Each has 'id', 'text', 'page' (guess if needed), and 'tags'.
    
    CRITICAL: Ensure 'tags' in snippets correspond directly to keywords in 'wordCloud' so that clicking a word cloud item can filter snippets effectively.
    CRITICAL: Ensure NO fields are empty strings or empty arrays. You must infer or generate the best possible analysis from the provided text.
    
    If the content provided is a URL that you cannot access or read directly, return a specific JSON indicating this:
    {
      "title": "Analysis Unavailable",
      "summary": "COULD_NOT_READ",
      "executiveSummary": "We could not automatically read the content of this document due to browser security restrictions. Please download the file to your computer and use the 'Upload File' feature for a full analysis.",
      "highlights": ["Download the file manually", "Upload to Community Reader", "Get instant analysis"],
      "wordCloud": [],
      "snippets": []
    }
  `;

  if (mimeType === 'application/pdf' || mimeType.startsWith('image/')) {
    parts.push({
      inlineData: {
        mimeType: mimeType,
        data: content
      }
    });
    parts.push({ text: "Analyze the attached document comprehensively." });
  } else {
    let promptContext = "Analyze the following document text.";
    
    if (content.startsWith("URL_ANALYSIS_REQUEST:")) {
      const url = content.replace("URL_ANALYSIS_REQUEST:", "").trim();
      promptContext = `The user wants to analyze the document at this URL: ${url}. 
      
      Use your Google Search tool to find the text, meeting minutes, or summary associated with this specific document title or URL. 
      Synthesize the information you find into the requested JSON format.
      
      If you can find the info via search, treat it as the document content.
      If you absolutely cannot find details, use the "COULD_NOT_READ" fallback defined in the system instructions.
      
      CRITICAL: Output pure JSON text only. No markdown fences.`;
      
      // Enable search tool for URLs so it can "read" the web
      tools = [{ googleSearch: {} }];
    }
    
    parts.push({ text: `${promptContext}\n\nDocument Content:\n${content}` });
  }

  // Base configuration
  const generateConfig: any = {
    systemInstruction: systemInstruction,
    tools: tools,
    thinkingConfig: { thinkingBudget: 1024 }, // Reduced slightly for speed
  };

  // CRITICAL: Google Search Grounding is incompatible with responseMimeType and responseSchema.
  // We only apply JSON enforcement if NOT using search tools.
  if (tools.length === 0) {
    generateConfig.responseMimeType = "application/json";
    generateConfig.responseSchema = {
      type: Type.OBJECT,
      required: ["title", "summary", "executiveSummary", "highlights", "wordCloud", "snippets"],
      properties: {
        title: { type: Type.STRING },
        summary: { type: Type.STRING },
        executiveSummary: { type: Type.STRING },
        highlights: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        },
        wordCloud: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              weight: { type: Type.INTEGER }
            }
          }
        },
        snippets: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
              page: { type: Type.INTEGER },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      }
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: 'user', parts: parts }], 
      config: generateConfig
    });

    let jsonText = response.text || "{}";
    // Aggressive JSON cleaning to handle chatty responses from Search tool
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    const data = JSON.parse(jsonText) as AnalysisResult;

    return {
      title: data.title || "Untitled Document",
      summary: data.summary || "No summary available.",
      executiveSummary: data.executiveSummary || "No executive summary available.",
      highlights: Array.isArray(data.highlights) ? data.highlights : [],
      wordCloud: Array.isArray(data.wordCloud) ? data.wordCloud : [],
      snippets: Array.isArray(data.snippets) ? data.snippets : []
    };

  } catch (error) {
    console.error("Gemini analysis failed:", error);
    throw error;
  }
};

export const generateCivicBriefing = async (topic: string, location: string): Promise<CivicBriefing> => {
  const prompt = `
    Research the following civic topic: "${topic}" specifically for the location "${location}".
    
    Goal: Provide an Executive Briefing for a citizen who wants to understand this issue.
    
    Using Google Search, find the most recent and relevant information (news, official government pages, minutes, PDFs).
    
    Output Format: JSON ONLY (no markdown fences).
    
    Structure:
    {
      "summary": "A 3-paragraph markdown formatted text. Paragraph 1: What is the issue/topic? Paragraph 2: What are the key debates or recent actions? Paragraph 3: What is the current status or next step?",
      "sources": [
         { "title": "Page Title", "link": "URL", "source": "Source Name (e.g. brooklinema.gov)" }
      ]
    }
      
    For sources, try to find at least 4-6 distinct, relevant links.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    let briefing: CivicBriefing = {
      topic,
      location,
      summary: "Briefing unavailable.",
      sources: []
    };

    // 1. Extract Grounding Metadata (Real Search Results)
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && Array.isArray(chunks)) {
      for (const chunk of chunks) {
        if (chunk.web) {
          briefing.sources.push({
            title: chunk.web.title || "Source",
            link: chunk.web.uri || "",
            snippet: "Source found via Google Search",
            source: new URL(chunk.web.uri || "http://google.com").hostname,
            date: "Recent"
          });
        }
      }
    }

    // 2. Parse JSON for the Summary
    try {
      let jsonText = response.text || "{}";
      const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
      if (jsonMatch) jsonText = jsonMatch[0];
      
      const data = JSON.parse(jsonText);
      if (data.summary) briefing.summary = data.summary;
      
      // If AI provided sources in JSON that aren't in Grounding, add them
      if (data.sources && Array.isArray(data.sources)) {
        for (const s of data.sources) {
          if (!briefing.sources.some(existing => existing.link === s.link)) {
             briefing.sources.push({
               title: s.title,
               link: s.link,
               snippet: "Extracted from briefing",
               source: s.source || new URL(s.link).hostname,
               date: "Recent"
             });
          }
        }
      }
    } catch (e) {
      // If JSON parsing fails, use raw text as summary
      briefing.summary = response.text || "Summary generation failed, but sources were found.";
    }

    return briefing;

  } catch (error) {
    console.error("Briefing failed", error);
    throw error;
  }
};

export const searchCivicDocuments = async (query: string): Promise<SearchResultItem[]> => {
  // Strategy: Use broader search terms to capture pages listing the docs, not just PDFs.
  const searchPrompt = `
    Perform a Google Search using exactly this query: "${query}" (minutes OR agenda OR budget OR report OR plan) after:2023-01-01
    
    Return a list of the 20 most relevant document URLs found.
    Prioritize official government sources (.gov, .org).
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: 'user', parts: [{ text: searchPrompt }] }],
      config: {
        tools: [{ googleSearch: {} }],
      }
    });

    const results: SearchResultItem[] = [];

    // Strategy 1: Grounding Metadata
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks && Array.isArray(chunks)) {
      for (const chunk of chunks) {
        if (chunk.web) {
          const title = chunk.web.title || "Untitled Document";
          const link = chunk.web.uri || "";
          
          if (!results.some(r => r.link === link)) {
            results.push({
              title: title,
              link: link,
              snippet: "Source found via Google Search",
              source: new URL(link).hostname,
              date: "Recent"
            });
          }
        }
      }
    }

    // Strategy 2: Link Scraping from Text (Fallback)
    if (response.text) {
      const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g;
      let match;
      while ((match = linkRegex.exec(response.text)) !== null) {
        const title = match[1];
        const link = match[2];
        if (!results.some(r => r.link === link)) {
           try {
             results.push({
              title: title,
              link: link,
              snippet: "Extracted from search summary",
              source: new URL(link).hostname,
              date: "Recent"
            });
           } catch (e) {
             // invalid url, skip
           }
        }
      }
    }

    return results;

  } catch (e) {
    console.error("Search failed", e);
    return [];
  }
};

export const transformText = async (text: string, task: 'simplify' | 'translate', option?: string): Promise<string> => {
  const prompt = task === 'simplify' 
    ? `Rewrite the following text at a 9th-grade reading level (Plain Language). Keep it professional but easy to understand:\n\n${text}`
    : `Translate the following text into ${option}. Keep the professional tone:\n\n${text}`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    return response.text || text;
  } catch (e) {
    console.error("Transformation failed", e);
    return "Error transforming text.";
  }
};

export const createChatSession = (content: string, mimeType: string) => {
  const systemInstruction = `You are a helpful assistant for the "Community Documenter" app. 
  Your goal is to help users understand the attached document. 
  Answer questions based ONLY on the document provided. 
  Be concise, friendly, and use simple language.`;

  const history = [];

  if (mimeType === 'application/pdf' || mimeType.startsWith('image/')) {
    history.push({
      role: 'user',
      parts: [
        { inlineData: { mimeType: mimeType, data: content } },
        { text: "Here is the document I want to ask questions about." }
      ]
    });
  } else {
    history.push({
      role: 'user',
      parts: [{ text: `Here is the document content:\n\n${content}\n\nI will now ask you questions about it.` }]
    });
  }

  history.push({
    role: 'model',
    parts: [{ text: "I have read the document. What would you like to know?" }]
  });

  return ai.chats.create({
    model: MODEL_NAME,
    history: history,
    config: {
      systemInstruction: systemInstruction,
    }
  });
};