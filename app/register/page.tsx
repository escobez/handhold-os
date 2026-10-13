"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, Check, ArrowLeft, Bot, Building2, User, CheckCircle2, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    productUrl: "",
    buyerSegment: "Enterprise B2B",
    agentPersona: "Conselheiro Executivo",
    enableTrcp: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsDone(true);
      }, 1200);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F3F4F6] flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Luz ambiente de fundo */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Cabeçalho */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 p-[1px]">
            <div className="w-full h-full bg-[#080A0F] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <span className="font-serif text-lg tracking-tight font-medium text-white">
            Handhold
          </span>
        </Link>

        <div className="flex items-center gap-4 text-xs">
          <span className="text-neutral-500 hidden sm:inline">Já possui uma conta?</span>
          <Link
            href="/login"
            className="text-white hover:text-indigo-300 transition-colors font-medium"
          >
            Entrar
          </Link>
        </div>
      </header>

      {/* Cartão Central do Onboarding */}
      <main className="max-w-xl w-full mx-auto my-10 z-10">
        <div className="rounded-3xl bg-[#10141F] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Indicador de Etapas */}
          {!isDone && (
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center transition-all ${
                        step === s
                          ? "bg-indigo-600 text-white font-bold ring-4 ring-indigo-500/20"
                          : step > s
                          ? "bg-emerald-500 text-black font-bold"
                          : "bg-white/10 text-neutral-400"
                      }`}
                    >
                      {step > s ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s}
                    </div>
                    {s < 3 && <div className="w-8 h-[1px] bg-white/10 hidden sm:block" />}
                  </div>
                ))}
              </div>

              <span className="text-xs font-mono text-neutral-400">
                Etapa {step} de 3
              </span>
            </div>
          )}

          {isDone ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl font-medium text-white">
                Espaço de Trabalho Criado!
              </h2>
              <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
                O seu guia autônomo para <strong className="text-white">{formData.company || "Sua Empresa"}</strong> foi sintetizado com a persona <span className="text-indigo-400 font-mono">{formData.agentPersona}</span>.
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-left text-xs font-mono text-neutral-300 space-y-2 mt-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Motor TRCP Prospector:</span>
                  <span className="text-emerald-400">Ativo (Multi-Espelho Overpass)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">URL Dedicada do Guia:</span>
                  <span className="text-indigo-300">guia.handhold.io/{formData.company.toLowerCase().replace(/\s+/g, "") || "preview"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Período de Avaliação:</span>
                  <span className="text-white">14 Dias Ilimitados</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-all shadow-xl"
                >
                  <span>Acessar Painel de Controle</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* ETAPA 1: Dados do Perfil */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-white">
                      Vamos configurar sua área de trabalho
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      Sem necessidade de cartão de crédito. Teste de 14 dias grátis.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Seu Nome Completo</label>
                      <input
                        type="text"
                        placeholder="Ana Silva"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-[#080A0F] border border-white/10 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">E-mail Corporativo</label>
                      <input
                        type="email"
                        placeholder="ana@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#080A0F] border border-white/10 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Nome da Empresa</label>
                      <input
                        type="text"
                        placeholder="Nexus Soluções Digitais"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-[#080A0F] border border-white/10 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 2: Produto e Público */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-white">
                      Público Alvo e Produto
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      Ajuda o agente a dosar a complexidade técnica e as regras de qualificação.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Site ou URL do Produto</label>
                      <input
                        type="url"
                        placeholder="https://nexus.com.br"
                        value={formData.productUrl}
                        onChange={(e) => setFormData({ ...formData, productUrl: e.target.value })}
                        className="w-full bg-[#080A0F] border border-white/10 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Segmento Principal de Clientes</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Grandes Empresas (B2B)", "Médias em Crescimento", "Comércio Local / PMEs"].map((seg) => (
                          <button
                            key={seg}
                            type="button"
                            onClick={() => setFormData({ ...formData, buyerSegment: seg })}
                            className={`p-2.5 rounded-xl text-[11px] text-center border transition-all ${
                              formData.buyerSegment === seg
                                ? "bg-indigo-600/30 border-indigo-400 text-white font-medium"
                                : "bg-[#080A0F] border-white/10 text-neutral-400 hover:text-white"
                            }`}
                          >
                            {seg}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 3: Persona do Agente e TRCP */}
              {step === 3 && (
                <div className="space-y-5 animate-in fade-in">
                  <div>
                    <h2 className="font-serif text-2xl font-medium text-white">
                      Persona do Agente & Motor
                    </h2>
                    <p className="text-xs text-neutral-400 mt-1">
                      Defina a personalidade da IA e ative o módulo de prospecção autônoma.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-neutral-400 uppercase">Tom de Voz do Agente</label>
                      <div className="grid grid-cols-3 gap-2">
                        {["Conselheiro Executivo", "Especialista Técnico", "Guia Concierge"].map((persona) => (
                          <button
                            key={persona}
                            type="button"
                            onClick={() => setFormData({ ...formData, agentPersona: persona })}
                            className={`p-3 rounded-xl text-[11px] text-center border transition-all ${
                              formData.agentPersona === persona
                                ? "bg-indigo-600/30 border-indigo-400 text-white font-medium"
                                : "bg-[#080A0F] border-white/10 text-neutral-400 hover:text-white"
                            }`}
                          >
                            <Bot className="w-4 h-4 mx-auto mb-1 text-indigo-400" />
                            {persona}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#080A0F] border border-white/10 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="text-xs font-medium text-white flex items-center gap-1.5">
                          <span>Ativar Motor TRCP Prospector</span>
                          <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded">
                            GRÁTIS
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          Descoberta automática de leads locais via multi-espelho Overpass
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.enableTrcp}
                        onChange={(e) => setFormData({ ...formData, enableTrcp: e.target.checked })}
                        className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Botões de Navegação */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-full bg-white text-[#080A0F] font-medium text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{step === 3 ? "Ativar Espaço de Trabalho" : "Continuar"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center text-[11px] text-neutral-500 z-10">
        Ao criar conta você concorda com nossos Termos e com a Licença ODbL de dados abertos.
      </footer>
    </div>
  );
}
