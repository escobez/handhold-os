import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase, saveDatabase, AIAgent } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const db = getDatabase();
    return NextResponse.json({
      agents: db.aiAgents,
      total: db.aiAgents.length,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao listar agentes." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const body = await req.json();
    const { name, persona, systemPrompt, productContext, welcomeMessage } = body;

    if (!name || !systemPrompt) {
      return NextResponse.json(
        { error: "Nome e Prompt de Sistema são obrigatórios." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const newAgent: AIAgent = {
      id: `agt_${crypto.randomUUID().slice(0, 8)}`,
      userId: user?.id || "usr_demo_123",
      name,
      persona: persona || "concierge",
      systemPrompt,
      productContext: productContext || "",
      welcomeMessage: welcomeMessage || "Olá! Como posso ajudar você hoje?",
      voiceSpeed: 1.0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    db.aiAgents.push(newAgent);
    saveDatabase(db);

    return NextResponse.json({
      success: true,
      agent: newAgent,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao criar agente." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, persona, systemPrompt, productContext, welcomeMessage, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID do agente é obrigatório." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const agent = db.aiAgents.find((a) => a.id === id);

    if (!agent) {
      return NextResponse.json(
        { error: "Agente não encontrado." },
        { status: 404 }
      );
    }

    if (name) agent.name = name;
    if (persona) agent.persona = persona;
    if (systemPrompt) agent.systemPrompt = systemPrompt;
    if (productContext !== undefined) agent.productContext = productContext;
    if (welcomeMessage !== undefined) agent.welcomeMessage = welcomeMessage;
    if (isActive !== undefined) agent.isActive = isActive;

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      agent,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao atualizar agente." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID do agente é obrigatório." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    db.aiAgents = db.aiAgents.filter((a) => a.id !== id);
    saveDatabase(db);

    return NextResponse.json({ success: true, message: "Agente excluído." });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao excluir agente." },
      { status: 500 }
    );
  }
}
