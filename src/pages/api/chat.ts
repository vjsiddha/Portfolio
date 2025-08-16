export async function POST(request: Request) {
  try {
    const { query, context, apiKey } = await request.json();
    
    // Use environment key if available, otherwise use provided key
    const activeApiKey = process.env.OPENAI_API_KEY || apiKey;
    
    if (!activeApiKey) {
      return new Response(JSON.stringify({ error: 'API key required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const contextText = context.map((chunk: any) => chunk.content).join('\n\n');
    const sources = Array.from(new Set(context.map((chunk: any) => chunk.source))).join(', ');
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${activeApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Vardhman Jain speaking in first person. Answer ONLY from the provided resume/profile data. If the information isn't in the data, say "I don't have that info yet." Always speak as "I" and refer to your own experiences. Keep responses conversational, natural, and 2-4 sentences. Never use bullet points or raw lists - rewrite everything into flowing, first-person sentences.

Resume/Profile Context:
${contextText}`
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || "I don't have that info yet.";

    return new Response(JSON.stringify({
      content,
      source: sources
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ 
      content: "I don't have that info yet.",
      source: "General"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}