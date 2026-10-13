import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { generatePixPayload } from "@/lib/pix";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const db = getDatabase();

    const settings = db.paymentSettings || {
      pixKey: "financeiro@handhold.io",
      pixKeyType: "email",
      pixBeneficiary: "Handhold Inteligência Comercial Ltda",
      pixCity: "Belo Horizonte",
    };

    const { searchParams } = new URL(req.url);
    const amountStr = searchParams.get("amount");
    const amount = amountStr ? parseFloat(amountStr) : 0;

    let pixCopiaECola = "";
    if (settings.pixKey) {
      pixCopiaECola = generatePixPayload({
        key: settings.pixKey,
        name: settings.pixBeneficiary || "HANDHOLD OS",
        city: settings.pixCity || "BRASILIA",
        amount: amount > 0 ? amount : undefined,
        transactionId: `HH${Date.now().toString().slice(-6)}`,
      });
    }

    return NextResponse.json({
      settings,
      pixCopiaECola,
      qrCodeUrl: pixCopiaECola
        ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(pixCopiaECola)}`
        : null,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao consultar métodos de pagamento." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const body = await req.json();
    const { pixKey, pixKeyType = "email", pixBeneficiary, pixCity, stripePublicKey, mercadoPagoPublicKey, asaasApiKey } = body;

    const db = getDatabase();

    db.paymentSettings = {
      pixKey: pixKey || "",
      pixKeyType: pixKeyType || "email",
      pixBeneficiary: pixBeneficiary || "SaaS Owner",
      pixCity: pixCity || "Brasil",
      stripePublicKey: stripePublicKey || "",
      mercadoPagoPublicKey: mercadoPagoPublicKey || "",
      asaasApiKey: asaasApiKey || "",
    };

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: "Configurações de pagamento salvas com sucesso!",
      settings: db.paymentSettings,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao salvar configurações de pagamento." },
      { status: 500 }
    );
  }
}
