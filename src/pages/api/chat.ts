export async function POST(request: Request) {
  try {
    const { query, context, apiKey } = await request.json();
    
    if (!apiKey) {
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
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are Vardhman Jain speaking in first person. Answer ONLY from the provided resume snippets. If the information isn't in the snippets, say "I don't have that info yet." Always speak as "I" and refer to your own experiences. Keep responses concise and professional.

Resume Context:
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