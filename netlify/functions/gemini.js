// netlify/functions/gemini.js
// Serverless function to proxy Gemini API calls (keeps API key secure)

exports.handler = async (event, context) => {
  // Set up CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  // Get the API Key from Netlify Environment Variables
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables");
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Server configuration error",
        message: "API key not configured. Set GEMINI_API_KEY in Netlify environment variables."
      })
    };
  }

  try {
    // Parse the incoming body from your frontend
    const body = JSON.parse(event.body || "{}");

    // Call the Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    // Check for API errors from Gemini
    if (!response.ok) {
      console.error("Gemini API returned error:", data);
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: "Gemini API error", details: data })
      };
    }

    // Return the result back to your frontend
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error", message: error.message })
    };
  }
};