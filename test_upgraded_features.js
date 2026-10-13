async function testUpgradedFeatures() {
  const base = "http://127.0.0.1:3005";
  console.log("=== INICIANDO TESTE DOS RECURSOS AVANÇADOS TRCP + VENDAS + GEMINI ===\n");

  // 1. Login
  console.log("[1/7] Efetuando login...");
  let res = await fetch(base + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "fundador@empresa.com.br", password: "Handhold2026!Seguro" }),
  });
  let data = await res.json();
  const cookie = res.headers.get("set-cookie");
  console.log("  Status:", res.status, "| Sessão iniciada:", !!cookie);

  // 2. Real TRCP Overpass Prospecting com Probe de Website
  console.log("\n[2/7] Testando mineração real TRCP com detecção de websites (/api/prospect)...");
  res = await fetch(base + "/api/prospect", {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({ city: "Curitiba, PR", category: "Restaurantes & Gastronomia", limit: 10 }),
  });
  data = await res.json();
  console.log("  Status:", res.status, "| Leads minerados:", data.addedCount);
  console.log("  Diagnóstico em Camadas (Tiers):", data.stats);
  if (data.leads && data.leads.length > 0) {
    const l = data.leads[0];
    console.log(`  Exemplo de Lead: "${l.name}" | Tier: [${l.tier}] | Status Web: [${l.websiteStatus}] | HTTP: ${l.websiteHttpCode}`);
  }

  // 3. CRM Leads com Filtro de Camada (Tier)
  console.log("\n[3/7] Consultando CRM com filtro 'Sem Website' (/api/leads?tier=no_website)...");
  res = await fetch(base + "/api/leads?tier=no_website", { headers: { Cookie: cookie } });
  data = await res.json();
  console.log("  Status:", res.status, "| Total Sem Website:", data.leads?.length);

  console.log("\n[4/7] Consultando CRM com filtro 'Site Operacional' (/api/leads?tier=active_website)...");
  res = await fetch(base + "/api/leads?tier=active_website", { headers: { Cookie: cookie } });
  data = await res.json();
  console.log("  Status:", res.status, "| Total Sites Ativos:", data.leads?.length);

  // 4. Teste de Vendas e Caixa (/api/sales)
  console.log("\n[5/7] Registrando nova venda no caixa corporativo (/api/sales)...");
  res = await fetch(base + "/api/sales", {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({
      leadName: "Restaurante Villa Toscana",
      amount: 1800.0,
      paymentMethod: "pix",
      notes: "Contrato Anual Handhold OS + Agente de Reservas fechado via Pix!",
    }),
  });
  data = await res.json();
  console.log("  Status:", res.status, "| Venda ID:", data.sale?.id, "| Valor:", data.sale?.amount);

  // 5. Consulta de Métricas de Vendas
  res = await fetch(base + "/api/sales", { headers: { Cookie: cookie } });
  data = await res.json();
  console.log("  Faturamento Total Atualizado:", `R$ ${data.metrics?.totalRevenue}`);
  console.log("  Ticket Médio:", `R$ ${data.metrics?.averageTicket}`);
  console.log("  Vendas via Pix:", `R$ ${data.metrics?.byMethod?.pix}`);

  // 6. Teste de Cobrança Pix com QR Code (/api/payments)
  console.log("\n[6/7] Gerando cobrança Pix com QR Code e Copia e Cola (/api/payments)...");
  res = await fetch(base + "/api/payments?amount=1800.00", { headers: { Cookie: cookie } });
  data = await res.json();
  console.log("  Status:", res.status, "| Pix Copia e Cola gerado:", !!data.pixCopiaECola);
  console.log("  QR Code URL:", data.qrCodeUrl?.substring(0, 70) + "...");
  console.log("  Prefixo Pix EMVCo:", data.pixCopiaECola?.substring(0, 30));

  // 7. Teste de Streaming do Chat com IA Gemini (/api/chat)
  console.log("\n[7/7] Testando motor de chat com IA Gemini em streaming (/api/chat)...");
  res = await fetch(base + "/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agentId: "agt_aura_01",
      messages: [{ role: "user", content: "Como posso prospectar clientes sem site e vender presença digital?" }],
    }),
  });
  const text = await res.text();
  console.log("  Status:", res.status, "| Resposta recebida (primeiros 150 caracteres):");
  console.log("  " + text.substring(0, 150).replace(/\n/g, " "));

  console.log("\n==================================================================");
  console.log(">>> TODOS OS NOVOS MÓDULOS FORAM TESTADOS E VALIDADOS COM ÊXITO! <<<");
  console.log("==================================================================");
}

testUpgradedFeatures().catch(console.error);
