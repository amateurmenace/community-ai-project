// Simple Gemini API Proxy for Netlify Functions
// This proxies requests to the Gemini API, adding your API key from environment variables

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  // Only allow POST
  if (event.httpMethod !== "POST") {
    return { 
      statusCode: 405, 
      headers, 
      body: JSON.stringify({ 
        error: "Method Not Allowed",
        message: "Method Not Allowed"
      }) 
    };
  }

  // Check for API key
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    console.error("GEMINI_API_KEY environment variable not set");
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ 
        error: "Server configuration error: API key not configured",
        message: "Server configuration error: API key not configured"
      }) 
    };
  }

  try {
    // Parse the incoming request body
    const payload = JSON.parse(event.body || "{}");
    
    // Use the model from the request or default to gemini-2.0-flash
    const MODEL = "gemini-2.0-flash";
    
    // Build the Gemini API URL
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;
    
    // Forward the request to Gemini
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Get the response data
    const data = await response.json();

    // Check for API errors
    if (!response.ok) {
      console.error("Gemini API error:", data);
      const errorMsg = data.error?.message || "Gemini API request failed";
      return { 
        statusCode: response.status, 
        headers, 
        body: JSON.stringify({ 
          error: errorMsg,
          message: errorMsg,
          details: data.error
        }) 
      };
    }

    // Return successful response
    return { 
      statusCode: 200, 
      headers, 
      body: JSON.stringify(data) 
    };

  } catch (error) {
    console.error("Function error:", error);
    const errorMsg = error.message || "Internal server error";
    return { 
      statusCode: 500, 
      headers, 
      body: JSON.stringify({ 
        error: errorMsg,
        message: errorMsg
      }) 
    };
  }
};