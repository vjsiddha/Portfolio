// api/chat.ts (Edge runtime)
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

export const config = { runtime: "edge" };

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: Request): Promise<Response> {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
    }

    const { history = [], context = "" } = await req.json();

    const system =
      "You are Vardhman Jain’s portfolio assistant. Answer in 1–3 short paragraphs or bullets. " +
      "Use ONLY the provided context; if unknown, say you're not sure.";

    const userContent =
      `Context:\n${context}\n\nChat so far:\n` +
      history.map((m: any) => `${String(m.role).toUpperCase()}: ${m.content}`).join("\n") +
      `\n\nAnswer the last user message.`;

    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: system },
      { role: "user", content: userContent },
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4,
    });

    const reply = completion.choices?.[0]?.message?.content ?? "Sorry, I couldn’t generate a reply.";
    return new Response(JSON.stringify({ reply }), { headers: { "Content-Type": "application/json" } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
