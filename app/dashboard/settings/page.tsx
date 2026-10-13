"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Settings,
  Key,
  Shield,
  Webhook,
  Copy,
  Check,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Sparkles,
  QrCode,
  CreditCard,
  ExternalLink,
  Save,
  AlertCircle,
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("hh_live_9a8f2d8471e94821a73950");
  const [geminiKey, setGeminiKey] = useState("");
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [pixKey, setPixKey] = useState("financeiro@handhold.io");
  const [pixKeyType, setPixKeyType] = useState("email");
  const [pixBeneficiary, setPixBeneficiary] = useState("Handhold Inteligência Comercial Ltda");
  const [pixCity, setPixCity] = useState("Belo Horizonte");
  const [mercadoPagoKey, setMercadoPagoKey] = useState("");
  const [stripeKey, setStripeKey] = useState("");

  const [copiedKey, setCopiedKey] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.hasGeminiApiKey) {
            setHasGeminiKey(true);
            setGeminiKey(data.geminiApiKey || "");
          }
          if (data.paymentSettings) {
            setPixKey(data.paymentSettings.pixKey || "");
            setPixKeyType(data.paymentSettings.pixKeyType || "email");
            setPixBeneficiary(data.paymentSettings.pixBeneficiary || "");
            setPixCity(data.paymentSettings.pixCity || "");
            setMercadoPagoKey(data.paymentSettings.mercadoPagoPublicKey || "");
            setStripeKey(data.paymentSettings.stripePublicKey || "");
          }
        }
      } catch (e) {}
    }
    loadSettings();
  }, []);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          geminiApiKey: geminiKey,
          paymentSettings: {
            pixKey,
            pixKeyType,
            pixBeneficiary,
            pixCity,
            mercadoPagoPublicKey: mercadoPagoKey,
            stripePublicKey: stripeKey,
          },
        }),
      });
      if (res.ok) {
        setSaved(true);
        setHasGeminiKey(!!geminiKey.trim());
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div>
          <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
            Configurações & Conectores
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Configure seu motor de IA Gemini, métodos de cobrança Pix sem taxas e chaves de integração.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Bloco 1: Conexão IA Gemini (100% Gratuito) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#10141F] border border-indigo-500/30 space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Modelo Oficial Google Gemini AI (Gratuito)</span>
              </div>
              {hasGeminiKey ? (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Conectado ao Gemini Flash
                </span>
              ) : (
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  Modo Simulação Inteligente
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Conecte o modelo <strong>Gemini 2.5 Flash</strong> da Google para alimentar os chats dos seus agentes e widgets com inteligência profunda ao vivo.
            </p>

            <div className="p-4 rounded-2xl bg-[#080A0F] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-300">
                <span>Como obter sua chave 100% gratuita sem cartão de crédito:</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>Google AI Studio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <ol className="text-[11px] text-neutral-400 list-decimal pl-4 space-y-1">
                <li>Acesse o link do Google AI Studio com sua conta Google.</li>
                <li>Clique em <strong>"Get API key"</strong> &gt; <strong>"Create API key"</strong>.</li>
                <li>Copie e cole a chave abaixo. O plano gratuito inclui 15 requisições/minuto sem cobrança.</li>
              </ol>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300">
                Chave da API do Gemini (GEMINI_API_KEY)
              </label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Bloco 2: Cobrança Pix (0% Taxas) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#10141F] border border-teal-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-mono uppercase">
                <QrCode className="w-4 h-4" />
                <span>Configuração de Cobrança Pix Instantânea</span>
              </div>
              <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full">
                Zero Taxas • Cai Direto no Seu Banco
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Dados utilizados para gerar o QR Code Pix e código Copia e Cola diretamente no fechamento de vendas de leads no CRM.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Chave Pix (E-mail, CPF, CNPJ, Celular ou Aleatória)
                </label>
                <input
                  type="text"
                  placeholder="Ex: financeiro@minhaempresa.com.br"
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Tipo da Chave
                </label>
                <select
                  value={pixKeyType}
                  onChange={(e) => setPixKeyType(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="email">E-mail</option>
                  <option value="cnpj">CNPJ</option>
                  <option value="cpf">CPF</option>
                  <option value="phone">Telefone</option>
                  <option value="random">Chave Aleatória (EVP)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Nome do Titular / Beneficiário
                </label>
                <input
                  type="text"
                  placeholder="Ex: Minha Empresa Tecnologia Ltda"
                  value={pixBeneficiary}
                  onChange={(e) => setPixBeneficiary(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Cidade da Conta
                </label>
                <input
                  type="text"
                  placeholder="Ex: Belo Horizonte"
                  value={pixCity}
                  onChange={(e) => setPixCity(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Bloco 3: Gateways Online (Opcional) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-violet-400 text-xs font-mono uppercase">
              <CreditCard className="w-4 h-4" />
              <span>Gateways Online (Cartão de Crédito & Boletos)</span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Sem custo fixo de mensalidade — pague apenas taxa percentual por transação aprovada caso deseje parcelamento no cartão.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Mercado Pago / Asaas (Public Key)
                </label>
                <input
                  type="text"
                  placeholder="APP_USR-..."
                  value={mercadoPagoKey}
                  onChange={(e) => setMercadoPagoKey(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white font-mono focus:outline-none focus:border-violet-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300">
                  Stripe (Publishable Key)
                </label>
                <input
                  type="text"
                  placeholder="pk_live_..."
                  value={stripeKey}
                  onChange={(e) => setStripeKey(e.target.value)}
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white font-mono focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Botão de Salvar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-sans">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Todas as chaves e dados são salvos localmente com proteção criptográfica.</span>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Configurações Salvas!</span>
                </>
              ) : isSaving ? (
                <span>Salvando...</span>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Salvar Todas as Configurações</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
