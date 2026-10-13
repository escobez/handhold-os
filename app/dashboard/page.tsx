"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Users,
  Bot,
  Compass,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Download,
  Plus,
  BadgeDollarSign,
  AlertCircle,
  AlertTriangle,
  Globe,
  QrCode,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [salesMetrics, setSalesMetrics] = useState({ totalRevenue: 0, totalTransactions: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [resLeads, resAgents, resSales] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/agents"),
          fetch("/api/sales"),
        ]);
        if (resLeads.ok) {
          const data = await resLeads.json();
          setLeads(data.leads || []);
        }
        if (resAgents.ok) {
          const data = await resAgents.json();
          setAgents(data.agents || []);
        }
        if (resSales.ok) {
          const data = await resSales.json();
          if (data.metrics) setSalesMetrics(data.metrics);
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const totalLeads = leads.length;
  const noWebsiteLeads = leads.filter((l) => l.tier === "no_website").length;
  const brokenWebsiteLeads = leads.filter((l) => l.tier === "broken_website").length;
  const qualifiedLeads = leads.filter((l) => l.score >= 80).length;
  const convertedLeads = leads.filter((l) => l.status === "converted").length;

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Top Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
              Centro de Comando & Inteligência
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Visão geral de prospecção autônoma, CRM em camadas e faturamento de contratos
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/sales"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors"
            >
              <BadgeDollarSign className="w-3.5 h-3.5" />
              <span>Ver Caixa & Vendas</span>
            </Link>

            <Link
              href="/dashboard/prospect"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-lg shadow-white/10"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Nova Prospecção TRCP</span>
            </Link>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Faturamento Realizado</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <BadgeDollarSign className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-serif font-bold text-emerald-400 tracking-tight">
                R$ {salesMetrics.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                {salesMetrics.totalTransactions} contratos liquidados
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Leads no Pipeline</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-white tracking-tight">
                {isLoading ? "..." : totalLeads}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                <TrendingUp className="w-3 h-3" />
                <span>Base própria OpenStreetMap</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Oportunidades Sem Site</span>
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-rose-300 tracking-tight">
                {isLoading ? "..." : noWebsiteLeads}
              </div>
              <div className="text-[11px] text-rose-400/80 mt-1 font-mono">
                Alvo prioritário de venda
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Agentes de IA Ativos</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-white tracking-tight">
                {isLoading ? "..." : agents.length}
              </div>
              <div className="text-[11px] text-cyan-400 mt-1 font-mono">
                Modelos 24/7 com IA
              </div>
            </div>
          </div>
        </div>

        {/* Camadas de Diagnóstico Comercial */}
        <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-xl font-medium text-white">
                Diagnóstico de Presença Digital (Camadas de Oportunidade)
              </h2>
              <p className="text-xs text-neutral-400">
                Leads classificados automaticamente pelo motor TRCP por maturidade web.
              </p>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>Filtrar no CRM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Link
              href="/dashboard/leads"
              className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-rose-300">Sem Website ({noWebsiteLeads})</span>
                <AlertCircle className="w-4 h-4 text-rose-400" />
              </div>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Empresas físicas sem nenhuma página cadastrada. Ideal para ofertar presença digital completa.
              </p>
            </Link>

            <Link
              href="/dashboard/leads"
              className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-amber-300">Site Fora do Ar ({brokenWebsiteLeads})</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Sites que retornaram erro HTTP 502/404 ou falha de DNS. Gancho perfeito para modernização imediata.
              </p>
            </Link>

            <Link
              href="/dashboard/leads"
              className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 hover:border-teal-500/40 transition-all block group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-teal-300">Sites Operacionais</span>
                <Globe className="w-4 h-4 text-teal-400" />
              </div>
              <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                Empresas prontas para implantação de agentes de demonstração e concierge autônomo 24/7.
              </p>
            </Link>
          </div>
        </div>

        {/* Tabela de Leads Recentes */}
        <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-medium text-white">
                Últimos Leads Mapeados
              </h2>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Alvos disponíveis para abordagem imediata
              </p>
            </div>
            <Link
              href="/dashboard/leads"
              className="text-xs font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
            >
              <span>Ver todos ({totalLeads})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="divide-y divide-white/5">
            {leads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-white/[0.02] rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center font-mono text-xs font-bold text-indigo-400 border border-white/5">
                    {lead.score}
                  </div>
                  <div>
                    <div className="font-medium text-white text-xs">{lead.name}</div>
                    <div className="text-[11px] text-neutral-400">{lead.location} • {lead.category}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {lead.tier === "no_website" ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      Sem Site
                    </span>
                  ) : lead.tier === "broken_website" ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      Site Fora do Ar
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      Site Ativo
                    </span>
                  )}
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
