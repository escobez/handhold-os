"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Sparkles, ArrowRight, Terminal, Cpu, Shield, Globe2, Briefcase, CheckCircle2 } from "lucide-react";

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState("Todos");

  const jobs = [
    {
      id: "ai-eng",
      title: "Engenheiro Sênior de Sistemas de IA & Agentes",
      department: "Engenharia",
      location: "São Paulo / Remoto",
      type: "Tempo Integral",
      description: "Projetar loops autônomos de raciocínio multi-turn, streaming websocket com baixa latência e arquiteturas resilientes de failover.",
    },
    {
      id: "data-eng",
      title: "Arquiteto de Dados Distribuídos & Geoespaciais",
      department: "Plataforma de Dados",
      location: "Remoto (Brasil / Global)",
      type: "Tempo Integral",
      description: "Escalar nossos clusters de extração OpenStreetMap no TRCP, roteamento de espelhos Overpass e pipelines de alta vazão no SQLite.",
    },
    {
      id: "design",
      title: "Staff Product Designer & Tecnólogo Criativo",
      department: "Design",
      location: "Remoto",
      type: "Tempo Integral",
      description: "Construir estética editorial de luxo, widgets generativos em canvas 3D nativo e micro-interações refinadas.",
    },
    {
      id: "revops",
      title: "Líder de Engenharia de Receita & Crescimento",
      department: "Comercial",
      location: "Remoto",
      type: "Tempo Integral",
      description: "Desenvolver manuais de agentes para vendas ativas, integrações com CRM e programas de onboarding para clientes corporativos.",
    },
  ];

  const filteredJobs = selectedDept === "Todos" ? jobs : jobs.filter(j => j.department === selectedDept);

  return (
    <main className="min-h-screen bg-[#080A0F] text-[#F3F4F6] selection:bg-indigo-600 selection:text-white">
      <Navbar />

      {/* Seção Manifesto */}
      <section className="pt-36 pb-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider mb-6">
          Coletivo de Engenharia Handhold
        </div>

        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal text-white leading-tight">
          Nós criamos softwares que dão aos produtos <span className="italic font-light text-gradient-purple">uma voz própria</span>
        </h1>

        <p className="mt-8 text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto font-sans font-light leading-relaxed">
          O futuro do software não são manuais em PDF ou painéis sobrecarregados. É o software que se auto-explica, demonstra seu valor de forma interativa e prospecta seu próprio mercado.
        </p>
      </section>

      {/* Princípios Fundamentais */}
      <section id="culture" className="py-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-medium text-white">Nossos Princípios de Engenharia</h2>
          <p className="text-xs text-neutral-400 mt-2 font-mono">Os axiomas que guiam como projetamos e publicamos cada linha de código</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono">
              01
            </div>
            <h3 className="font-serif text-xl font-medium text-white">Artesanato Digital Radical</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Cada transição, partícula em canvas e resposta de terminal reflete intencionalidade. Rejeitamos modelos genéricos em busca de sofisticação duradoura.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono">
              02
            </div>
            <h3 className="font-serif text-xl font-medium text-white">Zero Inchaço & Autonomia</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              Código é um passivo. Priorizamos soluções resilientes na biblioteca padrão, cache inteligente e failover multi-espelho em vez de dependências pesadas.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-mono">
              03
            </div>
            <h3 className="font-serif text-xl font-medium text-white">Inteligência Aberta e Acessível</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              O motor TRCP demonstra que dados de alto valor comercial podem ser minerados a partir de bases públicas sem a necessidade de taxas abusivas de terceiros.
            </p>
          </div>
        </div>
      </section>

      {/* Vagas Abertas */}
      <section className="py-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <h2 className="font-serif text-3xl font-medium text-white">Oportunidades em Aberto</h2>
            <p className="text-xs text-neutral-400 mt-1">Estamos buscando construtores, pesquisadores e artesãos de software</p>
          </div>

          {/* Filtro por Departamento */}
          <div className="flex flex-wrap gap-2">
            {["Todos", "Engenharia", "Plataforma de Dados", "Design", "Comercial"].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedDept === dept
                    ? "bg-white text-black font-semibold"
                    : "bg-white/5 text-neutral-400 hover:text-white"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#10141F] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {job.department}
                  </span>
                  <span className="text-xs text-neutral-500">•</span>
                  <span className="text-xs text-neutral-400">{job.location}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-white group-hover:text-indigo-300 transition-colors">
                  {job.title}
                </h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  {job.description}
                </p>
              </div>

              <a
                href="mailto:talentos@handhold.io"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white text-white hover:text-black font-medium text-xs border border-white/10 transition-all shrink-0"
              >
                <span>Candidatar-se à vaga</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
