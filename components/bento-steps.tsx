"use client";

import { Database, Cpu, Globe2, ArrowRight, ShieldCheck, Zap, Code2, LineChart } from "lucide-react";
import Link from "next/link";

export function BentoSteps() {
  return (
    <section id="steps" className="py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Cabeçalho */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
          Arquitetura de Implementação Rápida
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
          Pronto em minutos. <span className="italic font-light text-gradient-purple">Simples de escalar.</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-sans">
          Um pipeline em 3 etapas desenhado para equipes de vendas de alta performance, líderes de crescimento e fundadores exigentes.
        </p>
      </div>

      {/* Grid Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cartão Etapa 1 */}
        <div className="group rounded-3xl bg-[#10141F] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                Etapa 01
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-medium text-white mb-3">
              Conecte e Extraia Leads
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Conecte seu banco local ou utilize nosso motor nativo TRCP baseado em OpenStreetMap. Geocodifique cidades com o Nominatim, colete dados via 3 espelhos Overpass com custo zero de API e exporte planilhas protegidas contra injeção de fórmulas.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="p-3 rounded-xl bg-[#080A0F] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Status dos Espelhos Overpass</span>
                <span className="text-emerald-400">3/3 Online</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500 truncate">
                rot: overpass-api.de → coffee → kumi
              </div>
            </div>
          </div>
        </div>

        {/* Cartão Etapa 2 */}
        <div className="group rounded-3xl bg-[#10141F] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                Etapa 02
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-medium text-white mb-3">
              Treine e Configure Agentes
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Faça upload de documentações, cenários de teste e regras comerciais de qualificação. Personalize o tom de voz do agente, políticas de segurança e pesos de pontuação (+30 telefone, +20 site, +20 e-mail, +15 instagram).
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="p-3 rounded-xl bg-[#080A0F] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Matriz de Qualificação</span>
                <span className="text-indigo-400">Escala 100pts</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500">
                Telefone (+30) • Site (+20) • E-mail (+20)
              </div>
            </div>
          </div>
        </div>

        {/* Cartão Etapa 3 */}
        <div className="group rounded-3xl bg-[#10141F] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />

          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full bg-white/5 text-neutral-400 border border-white/5">
                Etapa 03
              </span>
              <div className="w-10 h-10 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Globe2 className="w-5 h-5" />
              </div>
            </div>

            <h3 className="font-serif text-2xl font-medium text-white mb-3">
              Implemente 24/7 Onde Quiser
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Insira um widget flutuante no seu site, envie links de demonstração personalizada por e-mail ou integre webhooks com seu CRM. Disponível 24 horas por dia com resposta imediata e sem fila de espera.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <div className="p-3 rounded-xl bg-[#080A0F] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>Canais de Publicação</span>
                <span className="text-emerald-400">Omnicanal</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500">
                Widget Web • Link Direto • Webhooks REST
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Chamada Final */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-indigo-950/40 via-[#10141F] to-purple-950/40 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h4 className="font-serif text-xl font-medium text-white">
            Pronto para testar seu primeiro agente de demonstração autônoma?
          </h4>
          <p className="text-xs text-neutral-400 font-sans mt-1">
            Teste grátis por 14 dias com acesso total ao Handhold OS e ao TRCP Prospector.
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#080A0F] font-medium text-xs shadow-lg hover:bg-neutral-200 transition-all shrink-0"
        >
          <span>Começar em 5 Minutos</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
