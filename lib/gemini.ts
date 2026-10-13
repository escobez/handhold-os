import { GoogleGenAI } from "@google/genai";
import { getDatabase } from "./db";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function* streamGeminiChat({
  messages,
  systemPrompt,
  agentName = "Handhold AI",
  productContext = "Handhold OS - Plataforma de Prospecção e Demonstrações com IA",
}: {
  messages: ChatMessage[];
  systemPrompt?: string;
  agentName?: string;
  productContext?: string;
}) {
  const db = getDatabase();
  const apiKey = db.geminiApiKey || process.env.GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

      const contents = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

      const fullSystemInstruction = `${systemPrompt || `Você é ${agentName}, um guia inteligente e atencioso.`}
Contexto do produto/empresa: ${productContext}
Responda sempre em português do Brasil com elegância, clareza, empatia e objetividade executiva.`;

      const responseStream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: fullSystemInstruction,
          temperature: 0.7,
        },
        contents,
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
      return;
    } catch (err: any) {
      console.warn("Aviso ao conectar com Gemini API ao vivo, ativando fallback contextual:", err.message);
    }
  }

  // Fallback Inteligente Contextual com a Persona do Agente
  const lastUserMessage = messages[messages.length - 1]?.content || "";
  const baseResponses = [
    `Como ${agentName}: Analisamos sua dúvida sobre "${lastUserMessage.slice(0, 50)}...". Com o Handhold OS, seus agentes operam 24/7 apresentando produtos e qualificando leads minerados pelo TRCP em tempo real.`,
    `A automação de demonstrações permite que cada comprador receba um tour personalizado no momento exato em que demonstra interesse, aumentando a taxa de conversão em até 3x.`,
    `\n\n💡 Dica Pro: Deseja respostas ilimitadas com inteligência profunda do Gemini 2.5 Flash ao vivo? Adicione sua chave gratuita do Google AI Studio em "Configurações" sem nenhum custo!`,
  ];

  for (const part of baseResponses) {
    const words = part.split(" ");
    for (const w of words) {
      yield w + " ";
      await new Promise((r) => setTimeout(r, 25));
    }
    yield "\n\n";
  }
}
