// api/chat.ts
import OpenAI from "openai";

export const config = { runtime: "edge" }; // optional on Vercel Edge

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: Request) {
  try {
    const { history, context } = await req.json(); 
    // history = [{role:"user"|"assistant", content:"..."}, ...]
    // context = string (from your profile/resume)

    const system = [
      "You are Vardhman Jain’s portfolio assistant.",
      "Answer conversationally and clearly in 1–3 short paragraphs or bullet points.",
      "Use ONLY the provided context for facts. If something isn’t in context, say you’re not sure.",
      "Prefer concise, well-structured answers; no fluff.",
    ].join(" ");

    const messages = [
      { role: "system", content: system },
      { role: "user", content: `Context:\n${context}\n\nChat so far:\n${history.map(m=>`${m.role.toUpperCase()}: ${m.content}`).join("\n")}\n\nAnswer the last user message.` }
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini", // fast & cheap; upgrade if you want
      messages,
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn’t generate a reply.";
    return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Server error" }), { status: 500 });
  }
}
