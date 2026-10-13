"use client";

import { useState } from "react";
import { X, Play, Pause, Sparkles, Volume2, VolumeX, ArrowRight, CheckCircle2, Shield, User, Bot } from "lucide-react";
import Link from "next/link";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InteractiveDemoModal({ isOpen, onClose }: DemoModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const demoSteps = [
    {
      title: "1. Descoberta de Intenção e Qualificação",
      speaker: "Agente Handhold (Aura)",
      message:
        "Olá! Notei que você procura automatizar a prospecção de vendas locais. Gostaria de ver como nós sincronizamos mais de 800 leads enriquecidos do OSM no seu CRM em menos de 2 minutos?",
      previewState: "Matriz de Score do Lead: 92/100 (Alta Intenção)",
      metrics: { confianca: "99.2%", latencia: "140ms", contatosValidados: "42 Encontrados" },
    },
    {
      title: "2. Tour Autônomo de Produto",
      speaker: "Agente Handhold (Aura)",
      message:
        "Permita-me destacar nosso motor de tolerância a falhas com rotação entre 3 espelhos Overpass. Caso um nó público sofra limitação, nossa camada de rede comuta automaticamente sem perder nenhuma requisição.",
      previewState: "Espelhos Ativos: 3 online • Tolerância a falha: 0% perda",
      metrics: { disponibilidade: "99.98%", redundancia: "3x Espelhos", cache: "88%" },
    },
    {
      title: "3. Conversão e Agendamento Imediato",
      speaker: "Agente Handhold (Aura)",
      message:
        "Com base no seu perfil, sua empresa já se qualifica para webhooks de CRM dedicados e exportação higienizada para Excel. Posso ativar seu período de avaliação agora mesmo?",
      previewState: "Pronto para Ativação do Piloto • 14 Dias de Acesso Gratuito",
      metrics: { conversao: "+320%", cicloVendas: "-65%", valorPipeline: "R$ 95.000" },
    },
  ];

  const currentStepData = demoSteps[activeStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#10141F] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
                Demonstração de IA em Tempo Real
              </span>
            </div>
            <span className="text-neutral-500">•</span>
            <span className="text-xs text-neutral-400 font-sans hidden sm:inline">
              Modelo: Handhold-Pro-3.8-Live
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
              title={isMuted ? "Ativar Áudio" : "Silenciar Áudio"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-400" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Corpo do Modal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Visualização da Tela Interativa */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-[#080A0F]/60 border-b lg:border-b-0 lg:border-r border-white/10">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  {currentStepData.title}
                </span>
                <span className="text-xs text-neutral-400">Etapa {activeStep + 1} de 3</span>
              </div>

              {/* Tela do Agente */}
              <div className="mt-4 p-5 rounded-2xl bg-[#10141F] border border-white/10 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-indigo-300" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">{currentStepData.speaker}</div>
                      <div className="text-[10px] text-emerald-400">Respondendo agora</div>
                    </div>
                  </div>

                  {/* Onda Sonora Sintética */}
                  <div className="flex items-center gap-1 h-4">
                    {[16, 28, 42, 20, 36, 14, 30, 22].map((height, idx) => (
                      <span
                        key={idx}
                        className={`w-0.5 bg-indigo-400 rounded-full transition-all duration-300 ${
                          isPlaying ? "animate-pulse" : "opacity-30"
                        }`}
                        style={{ height: `${height * (isPlaying ? 0.8 : 0.2)}%` }}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed font-sans mb-4">
                  "{currentStepData.message}"
                </p>

                {/* Telemetria de Estado */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="text-[11px] font-mono text-neutral-400 mb-2 uppercase tracking-wide">
                    Telemetria do Sistema ao Vivo
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {Object.entries(currentStepData.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white/[0.02] p-2 rounded-lg border border-white/5">
                        <div className="text-xs font-semibold text-white font-mono">{value}</div>
                        <div className="text-[10px] text-neutral-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Controles de Navegação */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                {[0, 1, 2].map((stepIdx) => (
                  <button
                    key={stepIdx}
                    onClick={() => setActiveStep(stepIdx)}
                    className={`h-2 rounded-full transition-all ${
                      activeStep === stepIdx ? "w-8 bg-indigo-500" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-3 py-1.5 rounded-full text-xs text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Voltar
                  </button>
                )}
                {activeStep < 2 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-white text-black hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
                  >
                    Próxima Etapa
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <Link
                    href="/register"
                    onClick={onClose}
                    className="px-4 py-1.5 rounded-full text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
                  >
                    Iniciar Teste de 14 Dias Grátis
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Destaques e Explicações à Direita */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#10141F]">
            <div>
              <h4 className="font-serif text-xl font-medium text-white mb-2">
                Por que compradores preferem o Handhold em vez de docs estáticos?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                Hoje os compradores não querem ler manuais de 20 páginas nem esperar 4 dias por um retorno de SDR. O Handhold entrega clareza prática e imediata.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-white">Sem Fadiga de Aprendizado</h5>
                    <p className="text-[11px] text-neutral-400">
                      Guia os leads pelos fluxos de trabalho reais em vez de mostrar telas estáticas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-white">Sincronização Total com TRCP</h5>
                    <p className="text-[11px] text-neutral-400">
                      Encontra alvos comerciais de alto valor no OpenStreetMap e calcula a nota de contato automaticamente.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-white">Segurança de Nível Corporativo</h5>
                    <p className="text-[11px] text-neutral-400">
                      Conformidade SOC2 Tipo II, isolamento total de dados e higienização contra injeção de fórmulas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Link
                href="/register"
                onClick={onClose}
                className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-medium text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all"
              >
                Crie seu primeiro agente de IA em 5 min
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
