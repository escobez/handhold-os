import fs from "fs";
import path from "path";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  emailVerified: boolean;
  role: "owner" | "admin" | "member";
  createdAt: string;
}

export interface VerificationToken {
  id: string;
  userId: string;
  token: string;
  type: "email_verify" | "password_reset";
  expiresAt: string;
  createdAt: string;
}

export interface AIAgent {
  id: string;
  userId: string;
  name: string;
  persona: "executive" | "technical" | "concierge";
  systemPrompt: string;
  productContext: string;
  welcomeMessage: string;
  voiceSpeed: number;
  isActive: boolean;
  createdAt: string;
}

export interface Lead {
  id: number;
  userId: string;
  osmId: string;
  name: string;
  category: string;
  location: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  website: string;
  phone: string;
  email: string;
  socialProfiles: string[];
  score: number;
  status: "new" | "contacted" | "qualified" | "converted" | "rejected";
  tier: "no_website" | "broken_website" | "active_website" | "high_potential" | "disqualified";
  websiteStatus: "active" | "broken" | "none" | "untested";
  websiteHttpCode: number | null;
  dealValue?: number;
  paymentMethod?: "pix" | "credit_card" | "bank_slip";
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface SaleRecord {
  id: string;
  userId: string;
  leadId: number;
  leadName: string;
  amount: number;
  paymentMethod: "pix" | "credit_card" | "bank_slip";
  status: "paid" | "pending";
  date: string;
  notes?: string;
}

export interface PaymentSettings {
  pixKey: string;
  pixKeyType: "cpf" | "cnpj" | "email" | "phone" | "random";
  pixBeneficiary: string;
  pixCity: string;
  stripePublicKey?: string;
  mercadoPagoPublicKey?: string;
  asaasApiKey?: string;
}

export interface DatabaseSchema {
  users: User[];
  verificationTokens: VerificationToken[];
  aiAgents: AIAgent[];
  leads: Lead[];
  sales: SaleRecord[];
  paymentSettings: PaymentSettings;
  geminiApiKey?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "store.json");

// Garante que o diretório de dados exista
function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("Erro ao criar diretório de dados:", err);
  }
}

// Inicializa dados de exemplo caso o banco esteja vazio
const INITIAL_DATA: DatabaseSchema = {
  users: [
    {
      id: "usr_demo_123",
      name: "Alexandre Silva",
      email: "fundador@empresa.com.br",
      passwordHash: "$2b$10$jVAc2dH1ru2070ZIbPSQvuPsvZHbURmNOBtXZ4P/q9ph9jpZt0KK2", // Handhold2026!Seguro
      emailVerified: true,
      role: "owner",
      createdAt: new Date().toISOString(),
    },
  ],
  verificationTokens: [],
  aiAgents: [
    {
      id: "agt_aura_01",
      userId: "usr_demo_123",
      name: "Aura Concierge",
      persona: "concierge",
      systemPrompt:
        "Você é Aura, o guia interativo autônomo da Handhold. Seja sofisticado, persuasivo, ágil e transmita segurança técnica sobre demonstrações e prospecção de leads.",
      productContext:
        "Handhold OS conecta prospecção OpenStreetMap via TRCP a agentes que realizam demos interativas em tempo real sem custo de API.",
      welcomeMessage:
        "Olá! Sou a Aura. Como posso guiar você pela nossa plataforma de demonstração autônoma hoje?",
      voiceSpeed: 1.0,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: "agt_trcp_02",
      userId: "usr_demo_123",
      name: "Trinity Prospector Bot",
      persona: "technical",
      systemPrompt:
        "Você é um especialista em arquitetura de dados e mineração geoespacial. Responda detalhando os espelhos Overpass, limites de bounding box e desduplicação por osm_id.",
      productContext:
        "O TRCP extrai alvos comerciais locais com cobertura de ~3.5km² por fatia e proteção contra CSV formula injection.",
      welcomeMessage:
        "Pronto para prospectar. Indique a cidade e categoria que deseja mapear.",
      voiceSpeed: 1.1,
      isActive: true,
      createdAt: new Date().toISOString(),
    },
  ],
  leads: [
    {
      id: 1,
      userId: "usr_demo_123",
      osmId: "node:10829182",
      name: "Padaria Artesanal & Café Grão Nobre",
      category: "Padarias, Cafés",
      location: "Belo Horizonte, MG",
      address: "Rua Fernandes Tourinho, 340, Savassi, Belo Horizonte",
      latitude: -19.9382,
      longitude: -43.9341,
      website: "https://padariagraonobre.com.br",
      phone: "+55 31 3284-9102",
      email: "contato@graonobre.com.br",
      socialProfiles: ["https://instagram.com/padariagraonobre"],
      score: 95,
      status: "qualified",
      tier: "active_website",
      websiteStatus: "active",
      websiteHttpCode: 200,
      notes: "Lead com alto interesse em IA para reservas e cardápio interativo.",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      userId: "usr_demo_123",
      osmId: "node:10829183",
      name: "Clínica OdontoPrime Savassi",
      category: "Clínicas, Saúde",
      location: "Belo Horizonte, MG",
      address: "Av. do Contorno, 5800, Funcionários, Belo Horizonte",
      latitude: -19.9321,
      longitude: -43.9312,
      website: "https://odontoprimesavassi.med.br",
      phone: "+55 31 3221-5040",
      email: "recepcao@odontoprimesavassi.med.br",
      socialProfiles: ["https://instagram.com/odontoprimesavassi"],
      score: 90,
      status: "contacted",
      tier: "high_potential",
      websiteStatus: "active",
      websiteHttpCode: 200,
      notes: "Primeiro contato realizado via WhatsApp. Aguardando retorno da gestora.",
      createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 3,
      userId: "usr_demo_123",
      osmId: "node:10829184",
      name: "Restaurante Villa Toscana",
      category: "Restaurantes",
      location: "Belo Horizonte, MG",
      address: "Rua Alagoas, 1150, Savassi, Belo Horizonte",
      latitude: -19.9355,
      longitude: -43.9366,
      website: "https://villatoscanabh.com.br",
      phone: "+55 31 3261-8899",
      email: "eventos@villatoscanabh.com.br",
      socialProfiles: ["https://instagram.com/villatoscanabh"],
      score: 85,
      status: "new",
      tier: "broken_website",
      websiteStatus: "broken",
      websiteHttpCode: 502,
      notes: "Site corporativo retornando erro 502 (Bad Gateway). Excelente gancho para oferecer modernização e nova landing page.",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 4,
      userId: "usr_demo_123",
      osmId: "way:2948194",
      name: "Empório dos Pães & Confeitaria",
      category: "Padarias",
      location: "Belo Horizonte, MG",
      address: "Rua Sergipe, 1200, Savassi, Belo Horizonte",
      latitude: -19.9367,
      longitude: -43.9378,
      website: "",
      phone: "+55 31 3281-2200",
      email: "",
      socialProfiles: [],
      score: 45,
      status: "new",
      tier: "no_website",
      websiteStatus: "none",
      websiteHttpCode: null,
      notes: "Estabelecimento de alto fluxo sem website registrado. Oportunidade prioritária para venda de presença digital e IA.",
      createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 5,
      userId: "usr_demo_123",
      osmId: "node:10829185",
      name: "Boutique Jurídica Castro & Associados",
      category: "Advocacia, Serviços",
      location: "Belo Horizonte, MG",
      address: "Rua Paraíba, 1000, Funcionários, Belo Horizonte",
      latitude: -19.9318,
      longitude: -43.9304,
      website: "https://castroadvogados.com.br",
      phone: "+55 31 3241-1100",
      email: "contato@castroadvogados.com.br",
      socialProfiles: ["https://linkedin.com/company/castroadvogados"],
      score: 100,
      status: "converted",
      tier: "active_website",
      websiteStatus: "active",
      websiteHttpCode: 200,
      dealValue: 2400,
      paymentMethod: "pix",
      notes: "Contrato de demonstração fechado. Assinatura do plano Enterprise confirmada com pagamento via Pix.",
      createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  sales: [
    {
      id: "sale_001",
      userId: "usr_demo_123",
      leadId: 5,
      leadName: "Boutique Jurídica Castro & Associados",
      amount: 2400,
      paymentMethod: "pix",
      status: "paid",
      date: new Date(Date.now() - 3600000 * 24).toISOString(),
      notes: "Plano Enterprise Anual Handhold OS + Agente Jurídico IA",
    },
  ],
  paymentSettings: {
    pixKey: "financeiro@handhold.io",
    pixKeyType: "email",
    pixBeneficiary: "Handhold Inteligência Comercial Ltda",
    pixCity: "Belo Horizonte",
  },
};

// Variável em memória para fallback caso o sistema de arquivos esteja em modo somente leitura (ex: Vercel lambdas)
let memoryStore: DatabaseSchema | null = null;

export function getDatabase(): DatabaseSchema {
  if (memoryStore) {
    if (!memoryStore.sales) memoryStore.sales = [];
    if (!memoryStore.paymentSettings) {
      memoryStore.paymentSettings = INITIAL_DATA.paymentSettings;
    }
    return memoryStore;
  }

  ensureDataDir();

  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      memoryStore = JSON.parse(content);
      if (!memoryStore!.sales) memoryStore!.sales = INITIAL_DATA.sales;
      if (!memoryStore!.paymentSettings) memoryStore!.paymentSettings = INITIAL_DATA.paymentSettings;
      memoryStore!.leads.forEach((l) => {
        if (!l.tier) {
          if (!l.website) l.tier = "no_website";
          else if (l.websiteStatus === "broken") l.tier = "broken_website";
          else l.tier = "active_website";
        }
        if (!l.websiteStatus) l.websiteStatus = l.website ? "active" : "none";
      });
      return memoryStore!;
    } else {
      fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
      memoryStore = INITIAL_DATA;
      return memoryStore;
    }
  } catch (err) {
    console.warn("Aviso: Utilizando armazenamento em memória (fallback):", err);
    memoryStore = INITIAL_DATA;
    return memoryStore;
  }
}

export function saveDatabase(data: DatabaseSchema): void {
  memoryStore = data;
  ensureDataDir();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("Aviso: Falha ao persistir no disco (ambiente somente leitura):", err);
  }
}
