import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase, saveDatabase, Lead, SaleRecord } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const db = getDatabase();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const tier = searchParams.get("tier");
    const search = searchParams.get("search")?.toLowerCase();
    const minScore = parseInt(searchParams.get("minScore") || "0", 10);

    let leads = db.leads;

    if (status && status !== "all") {
      leads = leads.filter((l) => l.status === status);
    }

    if (tier && tier !== "all") {
      leads = leads.filter((l) => l.tier === tier);
    }

    if (search) {
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          l.category.toLowerCase().includes(search) ||
          l.location.toLowerCase().includes(search) ||
          l.address.toLowerCase().includes(search) ||
          l.website?.toLowerCase().includes(search)
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
        noWebsite: db.leads.filter((l) => l.tier === "no_website").length,
        brokenWebsite: db.leads.filter((l) => l.tier === "broken_website").length,
        activeWebsite: db.leads.filter((l) => l.tier === "active_website").length,
        highPotential: db.leads.filter((l) => l.tier === "high_potential").length,
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
    const { id, status, notes, dealValue, paymentMethod, tier } = body;

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
    if (tier) lead.tier = tier;
    if (dealValue !== undefined) lead.dealValue = parseFloat(dealValue);
    if (paymentMethod) lead.paymentMethod = paymentMethod;
    lead.updatedAt = new Date().toISOString();

    // Se foi convertido e tem valor de venda, gera transação no caixa
    if (status === "converted" && dealValue && parseFloat(dealValue) > 0) {
      if (!db.sales) db.sales = [];
      const newSale: SaleRecord = {
        id: `sale_${crypto.randomUUID().slice(0, 8)}`,
        userId: lead.userId || "usr_demo_123",
        leadId: lead.id,
        leadName: lead.name,
        amount: parseFloat(dealValue),
        paymentMethod: paymentMethod || "pix",
        status: "paid",
        date: new Date().toISOString(),
        notes: `Conversão registrada no pipeline: ${lead.notes || ""}`,
      };
      db.sales.push(newSale);
    }

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
