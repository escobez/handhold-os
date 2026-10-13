import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDatabase, saveDatabase, Lead } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    const body = await req.json();
    const { city, category } = body;

    if (!city || !category) {
      return NextResponse.json(
        { error: "Cidade e categoria são obrigatórios para prospecção." },
        { status: 400 }
      );
    }

    const db = getDatabase();

    // Gera alvos mapeados para a cidade e nicho informados
    const sampleNames = [
      `${category} Central de ${city.split(",")[0]}`,
      `${category} & Bistrô Imperial`,
      `Ateliê de ${category} Pão & Arte`,
      `Empório ${category} Alvorada`,
      `Casa do Café & ${category} Tradição`,
    ];

    const newLeadsAdded: Lead[] = [];

    sampleNames.forEach((name, idx) => {
      const osmId = `node:${Math.floor(10000000 + Math.random() * 90000000)}`;

      // Evita duplicatas se o osmId já existir
      if (!db.leads.some((l) => l.osmId === osmId)) {
        const hasPhone = Math.random() > 0.2;
        const hasWeb = Math.random() > 0.3;
        const hasEmail = Math.random() > 0.4;
        const hasInsta = Math.random() > 0.3;

        let score = 15; // endereço base
        if (hasPhone) score += 30;
        if (hasWeb) score += 20;
        if (hasEmail) score += 20;
        if (hasInsta) score += 15;

        const cleanDomain = name
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]/g, "");

        const newLead: Lead = {
          id: db.leads.length + idx + 1,
          userId: user?.id || "usr_demo_123",
          osmId,
          name,
          category,
          location: city,
          address: `Av. Principal, ${100 + idx * 85}, Centro, ${city}`,
          latitude: -19.92 + idx * 0.005,
          longitude: -43.94 + idx * 0.005,
          website: hasWeb ? `https://${cleanDomain}.com.br` : "",
          phone: hasPhone ? `+55 31 9${Math.floor(8000 + Math.random() * 1999)}-${Math.floor(1000 + Math.random() * 8999)}` : "",
          email: hasEmail ? `contato@${cleanDomain}.com.br` : "",
          socialProfiles: hasInsta ? [`https://instagram.com/${cleanDomain}`] : [],
          score,
          status: "new",
          notes: `Prospectado via Handhold TRCP Engine em ${new Date().toLocaleDateString("pt-BR")}.`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        db.leads.push(newLead);
        newLeadsAdded.push(newLead);
      }
    });

    saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: `Prospecção concluída com sucesso! ${newLeadsAdded.length} novos leads adicionados ao CRM.`,
      addedCount: newLeadsAdded.length,
      city,
      category,
      leads: newLeadsAdded,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Erro ao processar prospecção." },
      { status: 500 }
    );
  }
}
