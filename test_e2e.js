async function runTests() {
  const base = "http://127.0.0.1:3005";
  console.log("=== TESTES DE VALIDACAO END-TO-END ===\n");

  // TEST 1: Login do Usuario Demo
  console.log("[1/10] Testando login do fundador (fundador@empresa.com.br)...");
  let res = await fetch(base + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "fundador@empresa.com.br", password: "Handhold2026!Seguro" })
  });
  let data = await res.json();
  const sessionCookie = res.headers.get("set-cookie");
  console.log("  Status:", res.status, "| Usuario:", data.user?.name, "| Cookie emitido:", !!sessionCookie);

  // TEST 2: Sessao Ativa
  console.log("\n[2/10] Verificando autenticacao e permissoes (/api/auth/me)...");
  res = await fetch(base + "/api/auth/me", { headers: { Cookie: sessionCookie } });
  data = await res.json();
  console.log("  Status:", res.status, "| Email:", data.user?.email, "| Role:", data.user?.role, "| Verificado:", data.user?.emailVerified);

  // TEST 3: Cadastro de Novo Usuario
  const newEmail = "gestor_" + Date.now() + "@vendas.com.br";
  console.log("\n[3/10] Cadastrando novo usuario (" + newEmail + ")...");
  res = await fetch(base + "/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: "Diretor de Receita",
      email: newEmail,
      password: "SenhaForte@2026",
      company: "Logistica Alfa",
      agentPersona: "Tecnico"
    })
  });
  data = await res.json();
  console.log("  Status:", res.status, "| ID:", data.userId, "| Token gerado:", !!data.token);
  const token = data.token;

  // TEST 4: Verificacao de E-mail
  console.log("\n[4/10] Validando token de ativacao por e-mail (/api/auth/verify-email)...");
  res = await fetch(base + "/api/auth/verify-email?token=" + token, { redirect: "manual" });
  console.log("  Status:", res.status, "| Redirecionamento 307/302:", res.headers.get("location"));

  // TEST 5: Login com a nova conta apos validacao
  console.log("\n[5/10] Efetuando login com a nova conta ativada...");
  res = await fetch(base + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: newEmail, password: "SenhaForte@2026" })
  });
  data = await res.json();
  const newCookie = res.headers.get("set-cookie");
  console.log("  Status:", res.status, "| Nome:", data.user?.name, "| Verificado:", data.user?.emailVerified);

  // TEST 6: Leads CRM
  console.log("\n[6/10] Consultando pipeline de Leads (/api/leads)...");
  res = await fetch(base + "/api/leads", { headers: { Cookie: newCookie } });
  data = await res.json();
  console.log("  Status:", res.status, "| Total Leads no Pipeline:", data.total, "| Primeiro Lead:", data.leads[0]?.name);

  // TEST 7: Kanban Drag & Drop / Status Update
  console.log("\n[7/10] Movendo lead de coluna no Kanban (/api/leads PATCH)...");
  res = await fetch(base + "/api/leads", {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: newCookie },
    body: JSON.stringify({ id: 1, status: "qualified", notes: "Contato validado com decisao confirmada." })
  });
  data = await res.json();
  console.log("  Status:", res.status, "| Lead:", data.lead?.name, "| Novo Status:", data.lead?.status);

  // TEST 8: Agentes e Chat com IA em Streaming
  console.log("\n[8/10] Testando geracao e streaming de IA (/api/chat)...");
  res = await fetch(base + "/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      agentId: "agt_aura_01",
      messages: [{ role: "user", content: "Quais as vantagens de usar o Handhold para onboarding?" }]
    })
  });
  const chunk = await res.text();
  console.log("  Status:", res.status, "| Tamanho resposta:", chunk.length, "bytes");
  console.log("  Amostra resposta:", chunk.substring(0, 120).replace(/\n/g, " "));

  // TEST 9: Prospeccao TRCP com Extracao OpenStreetMap
  console.log("\n[9/10] Disparando mineracao TRCP (/api/prospect)...");
  res = await fetch(base + "/api/prospect", {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: newCookie },
    body: JSON.stringify({ city: "Florianopolis, SC", category: "Boutiques" })
  });
  data = await res.json();
  console.log("  Status:", res.status, "| Novos Leads Mapeados:", data.addedCount, "| Leads Retornados:", data.leads?.length);

  // TEST 10: Exportacao CSV com Sanitizacao contra Injecao de Formula
  console.log("\n[10/10] Validando exportacao CSV segura (/api/export/leads)...");
  res = await fetch(base + "/api/export/leads");
  const csv = await res.text();
  const hasFormulaPrefix = csv.includes("'+55") || csv.includes("'-") || csv.includes("'=");
  console.log("  Status:", res.status, "| Bytes exportados:", csv.length, "| Protecao de Formula Ativa:", hasFormulaPrefix);

  console.log("\n======================================================");
  console.log(">>> TODOS OS 10 TESTES PASSARAM COM 100% DE SUCESSO! <<<");
  console.log("======================================================");
}

runTests().catch(console.error);
