"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("hh_live_9a8f2d8471e94821a73950");
  const [webhookUrl, setWebhookUrl] = useState("https://api.minhaempresa.com.br/webhooks/handhold-leads");
  const [copiedKey, setCopiedKey] = useState(false);
  const [saved, setSaved] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div>
          <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
            Configurações & Chaves de Integração
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Gerencie chaves de API, webhooks e parâmetros de segurança da conta
          </p>
        </div>

        {/* Bloco 1: Chaves de API */}
        <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase">
            <Key className="w-4 h-4" />
            <span>Chave de API do Espaço de Trabalho</span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            Utilize esta chave para sincronizar leads minerados pelo TRCP ou interações de chat diretamente em seu CRM externo (Salesforce, HubSpot ou Pipedrive).
          </p>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={apiKey}
              className="flex-1 bg-[#080A0F] border border-white/10 rounded-2xl py-2.5 px-4 text-xs font-mono text-neutral-300"
            />
            <button
              onClick={copyKey}
              className="px-4 py-2.5 rounded-2xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1.5 shadow"
            >
              {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey ? "Copiada" : "Copiar"}</span>
            </button>
          </div>
        </div>

        {/* Bloco 2: Webhooks de Notificação */}
        <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-mono uppercase">
            <Webhook className="w-4 h-4" />
            <span>Webhook para Leads Qualificados</span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-neutral-400 uppercase">
                URL de Notificação (POST JSON)
              </label>
              <input
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full bg-[#080A0F] border border-white/10 rounded-2xl py-2.5 px-4 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow"
            >
              {saved ? "Configurações Salvas!" : "Salvar Configuração de Webhook"}
            </button>
          </form>
        </div>

        {/* Bloco 3: Checklist de Segurança Ativa */}
        <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase">
            <Shield className="w-4 h-4" />
            <span>Camadas de Segurança Ativas</span>
          </div>

          <div className="space-y-2.5 text-xs text-neutral-300">
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sessões HttpOnly com Criptografia JWT (jose) e SameSite=Lax</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Sanitização Automática contra CSV Formula Injection (prefixo com ')</span>
            </div>
            <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Tolerância a Falhas com Rotação Ativa em 3 Espelhos Públicos Overpass</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
