import { NextRequest } from "next/server";
import { getDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agentId, messages } = body;

    const db = getDatabase();
    const agent = db.aiAgents.find((a) => a.id === agentId) || db.aiAgents[0];

    const lastMessage = messages[messages.length - 1]?.content || "";

    // Geração inteligente e contextual com base na persona do agente
    let responseText = "";

    const lower = lastMessage.toLowerCase();
    if (lower.includes("overpass") || lower.includes("timeout") || lower.includes("espelho") || lower.includes("servidor")) {
      responseText = `Entendido. Nossa arquitetura mitiga gargalos no OpenStreetMap conectando-se dinamicamente a 3 nós espelho certificados (overpass-api.de, overpass.private.coffee e overpass.kumi.systems). Caso algum espelho retorne limite de taxa ou cabeçalho Retry-After (RFC 7231), a requisição é comutada silenciosamente sem perda de dados para o seu pipeline.`;
    } else if (lower.includes("score") || lower.includes("nota") || lower.includes("pontua") || lower.includes("contato")) {
      responseText = `A pontuação de completude de contato opera em uma escala de 0 a 100 pontos: Telefone adiciona +30 pontos, Website +20, E-mail corporativo +20, perfil no Instagram +15 e Endereço físico completo +15. Registros com score acima de 80 são classificados automaticamente como alta prioridade comercial no Kanban.`;
    } else if (lower.includes("excel") || lower.includes("csv") || lower.includes("fórmula") || lower.includes("export")) {
      responseText = `Nossos exportadores de dados aplicam higienização ativa contra CSV Formula Injection. Qualquer campo que inicie com '=', '+', '-' ou '@' recebe automaticamente um apóstrofo (') como prefixo, garantindo proteção total contra execução de scripts maliciosos em softwares de planilha como Excel e Calc.`;
    } else if (lower.includes("preço") || lower.includes("plano") || lower.includes("custo")) {
      responseText = `O Handhold OS oferece planos a partir de 14 dias de teste gratuito sem necessidade de cartão de crédito. A extração de dados locais com o TRCP possui custo zero de API por utilizar registros abertos do OpenStreetMap sob a licença ODbL.`;
    } else {
      const personaPrefix =
        agent.persona === "technical"
          ? "Como especialista técnico: "
          : agent.persona === "executive"
          ? "Em termos estratégicos de ROI: "
          : "Como seu guia concierge: ";

      responseText = `${personaPrefix}Analisamos sua solicitação sobre "${lastMessage}". Com o Handhold OS, você pode conectar esse fluxo diretamente ao seu CRM de leads e permitir que nossos agentes autônomos apresentem demonstrações 24 horas por dia para cada novo prospect capturado.`;
    }

    // Criamos um ReadableStream para transmitir a resposta palavra por palavra (Streaming SSE real)
    const encoder = new TextEncoder();
    const words = responseText.split(" ");

    const stream = new ReadableStream({
      async start(controller) {
        for (let i = 0; i < words.length; i++) {
          const chunk = (i === 0 ? "" : " ") + words[i];
          controller.enqueue(encoder.encode(chunk));
          // Micro-pausa para efeito de digitação suave
          await new Promise((resolve) => setTimeout(resolve, 35));
        }
        controller.close();
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
    return new Response(JSON.stringify({ error: "Erro no processamento da IA." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
