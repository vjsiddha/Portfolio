// api/chat.ts
import OpenAI from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const { history = [], context = "" } =
      typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});

    const system =
      "You are Vardhman Jain’s portfolio assistant. Answer in 1–3 short paragraphs or bullets. " +
      "Use ONLY the provided context; if unknown, say you're not sure.";

    const userContent =
      `Context:\n${context}\n\nChat so far:\n` +
      history.map((m: any) => `${String(m.role).toUpperCase()}: ${m.content}`).join("\n") +
      `\n\nAnswer the last user message.`;

    // ✅ Properly typed messages array
    const messages: ChatCompletionMessageParam[] = [
      { role: "system", content: system },
      { role: "user", content: userContent },
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4,
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn’t generate a reply.";
    res.status(200).json({ reply });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Server error" });
  }
}
