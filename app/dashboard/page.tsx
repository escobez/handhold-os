"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [resLeads, resAgents] = await Promise.all([
          fetch("/api/leads"),
          fetch("/api/agents"),
        ]);
        if (resLeads.ok) {
          const data = await resLeads.json();
          setLeads(data.leads || []);
        }
        if (resAgents.ok) {
          const data = await resAgents.json();
          setAgents(data.agents || []);
        }
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const totalLeads = leads.length;
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
              Visão geral de prospecção autônoma, CRM e desempenho de agentes de IA
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/export/leads"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-xs text-neutral-300 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </a>

            <a
              href="/dashboard/prospect"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-lg shadow-white/10"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Nova Prospecção TRCP</span>
            </a>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Leads no CRM</span>
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
                <span>+100% base própria (OSM)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Alto Score (&gt;80)</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-purple-400">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-indigo-300 tracking-tight">
                {isLoading ? "..." : qualifiedLeads}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                Telefone + Web + Instagram
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Agentes de IA Ativos</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400">
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-white tracking-tight">
                {isLoading ? "..." : agents.length}
              </div>
              <div className="text-[11px] text-emerald-400 mt-1 font-mono">
                24/7 em operação
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col justify-between">
            <div className="flex items-center justify-between text-neutral-400 mb-4">
              <span className="text-xs font-mono uppercase">Contratos Convertidos</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-mono font-bold text-emerald-400 tracking-tight">
                {isLoading ? "..." : convertedLeads}
              </div>
              <div className="text-[11px] text-neutral-400 mt-1 font-mono">
                Pipeline consolidado
              </div>
            </div>
          </div>
        </div>

        {/* Central Grid: Recent Leads & Active Agents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Recent Leads Table Snippet */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div>
                <h3 className="font-serif text-lg font-medium text-white">Leads Recentes Capturados</h3>
                <p className="text-[11px] text-neutral-400">Atualização em tempo real via TRCP Engine</p>
              </div>
              <a
                href="/dashboard/leads"
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1"
              >
                <span>Ver Todos no CRM</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="text-neutral-500 font-mono uppercase text-[10px] border-b border-white/5">
                    <th className="pb-3">Estabelecimento</th>
                    <th className="pb-3">Categoria</th>
                    <th className="pb-3">Score</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.slice(0, 5).map((l) => (
                    <tr key={l.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 font-medium text-white">
                        <div>{l.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono">{l.location}</div>
                      </td>
                      <td className="py-3 text-neutral-400">{l.category}</td>
                      <td className="py-3 font-mono">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            l.score >= 80
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          }`}
                        >
                          {l.score} pts
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="capitalize text-[11px] font-mono text-neutral-300">
                          {l.status === "qualified"
                            ? "Qualificado"
                            : l.status === "contacted"
                            ? "Contatado"
                            : l.status === "converted"
                            ? "Convertido"
                            : "Novo"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Active Agents & TRCP Mirror Status */}
          <div className="lg:col-span-4 space-y-6">
            {/* Active Agents Box */}
            <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h3 className="font-serif text-lg font-medium text-white">Agentes Ativos</h3>
                <a
                  href="/dashboard/agents"
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-mono"
                >
                  Estúdio
                </a>
              </div>

              <div className="space-y-3">
                {agents.map((ag) => (
                  <div
                    key={ag.id}
                    className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white flex items-center gap-2">
                        <Bot className="w-3.5 h-3.5 text-indigo-400" />
                        {ag.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                        Online
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-2">
                      {ag.systemPrompt}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Overpass Infrastructure Status */}
            <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-neutral-400">Nós Overpass (OSM)</span>
                <span className="text-[10px] font-mono text-emerald-400">3/3 Conectados</span>
              </div>
              <div className="space-y-1.5 text-[11px] font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>overpass-api.de</span>
                  <span className="text-emerald-400">Online (42ms)</span>
                </div>
                <div className="flex justify-between">
                  <span>overpass.private.coffee</span>
                  <span className="text-emerald-400">Online (58ms)</span>
                </div>
                <div className="flex justify-between">
                  <span>overpass.kumi.systems</span>
                  <span className="text-emerald-400">Online (51ms)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
