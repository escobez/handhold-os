"use client";

import { Quote, Star } from "lucide-react";

export function QuoteTestimonials() {
  const testimonials = [
    {
      quote:
        "O Handhold transformou completamente a velocidade das nossas vendas. Compradores com alta intenção recebem demonstrações sob medida às duas da manhã de um domingo. O volume de demos qualificadas aumentou 340% no primeiro trimestre.",
      author: "Elena Rostova",
      role: "VP de Operações de Receita",
      company: "Synthetix Cloud",
      metric: "+340%",
      metricLabel: "Conclusão de Demos",
    },
    {
      quote:
        "Substituir apresentações de slides estáticas por sandboxes autônomos guiados por voz pareceu um salto de dez anos para o futuro. Os compradores chegam às nossas reuniões já educados e prontos para fechar contrato.",
      author: "Marcus Vance",
      role: "Diretor Comercial (CCO)",
      company: "Kuro Metrics",
      metric: "4.2x",
      metricLabel: "Aceleração de Pipeline",
    },
    {
      quote:
        "O motor nativo de prospecção TRCP descobriu 8.400 estabelecimentos comerciais qualificados em 12 regiões metropolitanas sem gastar um centavo com APIs pagas. O retorno sobre o investimento foi incomparável.",
      author: "Camila Drummond",
      role: "Head de Crescimento & Aquisição",
      company: "Veloce Enterprise",
      metric: "R$ 0 / lead",
      metricLabel: "Custo de Aquisição de Dados",
    },
  ];

  return (
    <section className="py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
          Impacto Empresarial Comprovado
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
          Desenvolvido para <span className="italic font-light text-gradient-purple">líderes exigentes</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-sans">
          Descubra como equipes corporativas de receita usam o Handhold para encurtar ciclos de vendas e acelerar prospecções de forma autônoma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="rounded-3xl bg-[#10141F] border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-300 relative group"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-indigo-400/40 group-hover:text-indigo-400/70 transition-colors" />
                <div className="text-right">
                  <div className="text-xl font-mono font-bold text-white tracking-tight">{t.metric}</div>
                  <div className="text-[10px] uppercase font-mono text-neutral-400">{t.metricLabel}</div>
                </div>
              </div>

              <p className="font-serif text-base sm:text-lg text-neutral-200 leading-relaxed italic">
                "{t.quote}"
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-medium text-white">{t.author}</div>
                <div className="text-[11px] text-neutral-400">{t.role}</div>
                <div className="text-[10px] font-mono text-indigo-400 mt-0.5">{t.company}</div>
              </div>
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
