"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Play, ArrowRight, Bot, Shield, CheckCircle } from "lucide-react";
import { InteractiveOrb } from "./interactive-orb";
import { InteractiveDemoModal } from "./interactive-demo-modal";

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-radial-hero">
      {/* Fundo do Orbe 3D Interativo */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-70 pointer-events-none">
        <InteractiveOrb />
      </div>

      {/* Esferas de luz e brilho radial */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Conteúdo Central em Primeiro Plano */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Pílula de Novidade */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 hover:bg-white/[0.07] transition-all cursor-default">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span className="text-xs font-mono tracking-wide text-neutral-300">
            Handhold 2.0 • Guias Autônomos de Produto & Prospecção Inteligente
          </span>
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
        </div>

        {/* Manchete Editorial Serifada de Grande Impacto */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.08] max-w-4xl text-balance">
          Um guia dedicado para{" "}
          <span className="italic font-light text-gradient-purple">cada comprador</span>
        </h1>

        {/* Subtítulo Elegante */}
        <p className="mt-8 text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl font-sans font-light leading-relaxed text-balance">
          Agentes de IA executando demonstrações sob medida e onboarding interativo 24 horas por dia. Transforme cada visitante em um cliente engajado e qualificado sem aumentar sua equipe.
        </p>

        {/* Botões de Ação em Pílula */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => setDemoOpen(true)}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white text-[#080A0F] font-medium text-sm shadow-xl shadow-white/10 hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-5 h-5 rounded-full bg-indigo-600/15 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3 h-3 text-[#080A0F] fill-current ml-0.5" />
            </div>
            <span>Ver demonstração de IA</span>
          </button>

          <Link
            href="/register"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/10 text-white font-medium text-sm border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Experimente grátis</span>
            <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Selos de Confiança */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 font-sans">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Sem necessidade de cartão de crédito</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Configuração pronta em menos de 5 minutos</span>
          </div>
          <span className="text-white/20 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Em conformidade com SOC2 Tipo II e LGPD</span>
          </div>
        </div>
      </div>

      {/* Modal Interativo de Demonstração */}
      <InteractiveDemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
