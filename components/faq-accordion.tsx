"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Como o Handhold se compara a vídeos gravados tradicionais (Loom, Gong)?",
      a: "Gravações de vídeo são passivas, estáticas e frequentemente ignoradas por compradores ocupados. O Handhold gera sandboxes interativos em tempo real onde o prospect pode clicar, explorar dados de exemplo e receber respostas explicadas por voz ou texto personalizadas para suas dúvidas exatas.",
    },
    {
      q: "O que é a integração com o TRCP Prospector e há algum custo adicional?",
      a: "O TRCP (Trinity Client Prospector) é o nosso motor nativo de inteligência baseado em dados abertos. Ele extrai e enriquece leads comerciais locais do OpenStreetMap utilizando geocodificação Nominatim e 3 espelhos Overpass rotativos. Ele é 100% gratuito e não exige nenhuma chave de API paga.",
    },
    {
      q: "Quanto tempo leva para treinar um agente sobre o nosso produto?",
      a: "A maioria das equipes coloca seu agente no ar em menos de 15 minutos. Basta informar a URL do seu site, anexar suas especificações OpenAPI/Swagger ou conectar seu ambiente de homologação. O Handhold estrutura o comportamento do guia automaticamente.",
    },
    {
      q: "Os dados confidenciais dos nossos clientes estão seguros?",
      a: "Sim. O Handhold atende aos padrões internacionais SOC2 Tipo II, criptografa todo o tráfego em repouso e em trânsito com TLS 1.3 e nunca utiliza dados proprietários da sua empresa para treinar modelos públicos de fundação.",
    },
    {
      q: "Podemos exportar os leads qualificados do CRM para nossas ferramentas atuais?",
      a: "Sim. O Handhold e o TRCP suportam exportações imediatas para CSV (sanitizado contra injeção de fórmulas de planilhas), planilhas Excel estilizadas (.xlsx), relatórios executivos em Word (.docx) e webhooks customizados para Salesforce, HubSpot e Slack.",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto border-t border-white/5">
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider mb-4">
          Perguntas Frequentes
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
          Tudo o que você precisa saber
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-[#10141F] border border-white/10 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-sans text-sm sm:text-base font-medium text-white">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-white" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
