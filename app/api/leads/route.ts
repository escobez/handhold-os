import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase, Lead } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const db = getDatabase();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.toLowerCase();
    const minScore = parseInt(searchParams.get("minScore") || "0", 10);

    let leads = db.leads;

    if (status && status !== "all") {
      leads = leads.filter((l) => l.status === status);
    }

    if (search) {
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          l.category.toLowerCase().includes(search) ||
          l.location.toLowerCase().includes(search) ||
          l.address.toLowerCase().includes(search)
      );
    }

    if (minScore > 0) {
      leads = leads.filter((l) => l.score >= minScore);
    }

    // Ordena por score decrescente
    leads.sort((a, b) => b.score - a.score);

    return NextResponse.json({
      leads,
      total: leads.length,
      stats: {
        total: db.leads.length,
        qualified: db.leads.filter((l) => l.status === "qualified").length,
        converted: db.leads.filter((l) => l.status === "converted").length,
        highScore: db.leads.filter((l) => l.score >= 80).length,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao listar leads." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID do lead é obrigatório." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const lead = db.leads.find((l) => l.id === id);

    if (!lead) {
      return NextResponse.json(
        { error: "Lead não encontrado." },
        { status: 404 }
      );
    }

    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;
    lead.updatedAt = new Date().toISOString();

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao atualizar lead." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get("id") || "0", 10);

    if (!id) {
      return NextResponse.json(
        { error: "ID do lead é obrigatório." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    db.leads = db.leads.filter((l) => l.id !== id);
    saveDatabase(db);

    return NextResponse.json({ success: true, message: "Lead removido." });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao excluir lead." },
      { status: 500 }
    );
  }
}
