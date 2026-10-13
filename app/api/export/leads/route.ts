import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/lib/db";

// Sanitiza campos contra CSV Formula Injection
function sanitizeCSVField(val: any): string {
  if (val === null || val === undefined) return '""';
  let str = String(val).trim();

  // Se começar com caractere perigoso de fórmula, adiciona apóstrofo
  if (["=", "+", "-", "@"].includes(str.charAt(0))) {
    str = "'" + str;
  }

  // Escapa aspas duplas internas
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const db = getDatabase();
    const leads = db.leads;

    const headers = [
      "ID",
      "OSM_ID",
      "Nome",
      "Categoria",
      "Localizacao",
      "Endereco",
      "Telefone",
      "Website",
      "Email",
      "Instagram",
      "Score",
      "Status_CRM",
      "Notas",
      "Data_Captura",
    ];

    const rows = leads.map((l) => [
      sanitizeCSVField(l.id),
      sanitizeCSVField(l.osmId),
      sanitizeCSVField(l.name),
      sanitizeCSVField(l.category),
      sanitizeCSVField(l.location),
      sanitizeCSVField(l.address),
      sanitizeCSVField(l.phone),
      sanitizeCSVField(l.website),
      sanitizeCSVField(l.email),
      sanitizeCSVField(l.socialProfiles?.[0] || ""),
      sanitizeCSVField(l.score),
      sanitizeCSVField(l.status),
      sanitizeCSVField(l.notes),
      sanitizeCSVField(l.createdAt),
    ]);

    // Adiciona BOM (\uFEFF) para que o Excel abra acentuação em PT-BR corretamente
    const csvContent =
      "\uFEFF" +
      headers.join(";") +
      "\n" +
      rows.map((r) => r.join(";")).join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="leads_handhold_trcp_${Date.now()}.csv"`,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao gerar exportação de leads." },
      { status: 500 }
    );
  }
}
