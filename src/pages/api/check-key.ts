export async function GET() {
  try {
    // Check if environment API key exists (only on server side)
    const hasKey = !!process.env.OPENAI_API_KEY;
    
    return new Response(JSON.stringify({ hasKey }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ hasKey: false }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}