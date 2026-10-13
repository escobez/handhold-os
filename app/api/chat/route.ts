import { NextRequest } from "next/server";
import { getDatabase } from "@/lib/db";
import { streamGeminiChat } from "@/lib/gemini";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentId, messages } = body;

    const db = getDatabase();
    const agent = db.aiAgents.find((a) => a.id === agentId) || db.aiAgents[0];

    const encoder = new TextEncoder();

    // Cria um ReadableStream alimentado pelo modelo oficial do Google Gemini
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of streamGeminiChat({
            messages: messages || [],
            systemPrompt: agent?.systemPrompt,
            agentName: agent?.name,
            productContext: agent?.productContext,
          })) {
            controller.enqueue(encoder.encode(chunk));
          }
        } catch (err: any) {
          console.error("Erro no stream Gemini:", err);
          controller.enqueue(encoder.encode("Desculpe, ocorreu um erro temporário no processamento da mensagem."));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: "Falha ao processar chat com IA." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
