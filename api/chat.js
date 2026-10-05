// Serverless proxy for Gemini API SSE Stream
// Compatible with Vercel Serverless Functions and Node.js dev server

module.exports = async function handler(req, res) {
  // Enable CORS for local preview/development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-gemini-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    // Parse body if string or stream
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const {
      messages,
      contents,
      systemInstruction,
      model = 'gemini-3.8-flash',
      temperature = 0.7
    } = body || {};

    const apiKey = process.env.GEMINI_API_KEY || req.headers['x-gemini-key'];
    if (!apiKey) {
      return res.status(401).json({
        error: 'Gemini API Key is not configured on server (process.env.GEMINI_API_KEY) or in request headers.'
      });
    }

    // Convert messages array to Gemini contents format if necessary
    let geminiContents = contents;
    if (!geminiContents && Array.isArray(messages)) {
      geminiContents = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
    }

    if (!geminiContents || !geminiContents.length) {
      return res.status(400).json({ error: 'Missing or empty messages.' });
    }

    const payload = {
      contents: geminiContents,
      generationConfig: {
        temperature: typeof temperature === 'number' ? temperature : 0.7
      }
    };

    if (systemInstruction) {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    const cleanModel = model.replace(/^models\//, '');
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:streamGenerateContent?alt=sse&key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      return res.status(geminiRes.status).json({
        error: `Gemini API returned status ${geminiRes.status}: ${errorText}`
      });
    }

    // Set SSE headers for browser client
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no'
    });

    const reader = geminiRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (error) {
    console.error('Error in /api/chat proxy:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    } else {
      res.end();
    }
  }
};
