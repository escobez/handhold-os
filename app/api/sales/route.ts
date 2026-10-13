import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase, saveDatabase, SaleRecord } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const db = getDatabase();

    const sales = db.sales || [];
    const totalRevenue = sales.reduce((acc, s) => acc + (s.amount || 0), 0);
    const totalTransactions = sales.length;
    const averageTicket = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    // Métricas por método de pagamento
    const byMethod = {
      pix: sales.filter((s) => s.paymentMethod === "pix").reduce((a, b) => a + b.amount, 0),
      credit_card: sales.filter((s) => s.paymentMethod === "credit_card").reduce((a, b) => a + b.amount, 0),
      bank_slip: sales.filter((s) => s.paymentMethod === "bank_slip").reduce((a, b) => a + b.amount, 0),
    };

    return NextResponse.json({
      sales: sales.slice().reverse(),
      metrics: {
        totalRevenue,
        totalTransactions,
        averageTicket,
        byMethod,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Erro ao consultar vendas." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const body = await req.json();
    const { leadId, leadName, amount, paymentMethod = "pix", notes } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Valor da venda deve ser maior que zero." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    if (!db.sales) db.sales = [];

    const newSale: SaleRecord = {
      id: `sale_${crypto.randomUUID().slice(0, 8)}`,
      userId: user?.id || "usr_demo_123",
      leadId: leadId || 0,
      leadName: leadName || "Lead Comercial",
      amount: parseFloat(amount),
      paymentMethod,
      status: "paid",
      date: new Date().toISOString(),
      notes: notes || "",
    };

    db.sales.push(newSale);

    // Se houver leadId associado, atualiza o lead para status 'converted' e adiciona o dealValue
    if (leadId) {
      const lead = db.leads.find((l) => l.id === leadId);
      if (lead) {
        lead.status = "converted";
        lead.dealValue = parseFloat(amount);
        lead.paymentMethod = paymentMethod;
        lead.updatedAt = new Date().toISOString();
      }
    }

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Venda registrada com sucesso no caixa!",
      sale: newSale,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao registrar venda." },
      { status: 500 }
    );
  }
}
