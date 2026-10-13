import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const db = getDatabase();

    return NextResponse.json({
      geminiApiKey: db.geminiApiKey ? `${db.geminiApiKey.slice(0, 6)}...${db.geminiApiKey.slice(-4)}` : "",
      hasGeminiApiKey: !!db.geminiApiKey,
      paymentSettings: db.paymentSettings || {},
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Erro ao buscar configurações." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const body = await req.json();
    const { geminiApiKey, paymentSettings } = body;

    const db = getDatabase();

    if (geminiApiKey !== undefined) {
      db.geminiApiKey = geminiApiKey.trim();
    }

    if (paymentSettings) {
      db.paymentSettings = {
        ...db.paymentSettings,
        ...paymentSettings,
      };
    }

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Configurações atualizadas com sucesso!",
      hasGeminiApiKey: !!db.geminiApiKey,
      paymentSettings: db.paymentSettings,
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Erro ao salvar configurações." }, { status: 500 });
  }
}
