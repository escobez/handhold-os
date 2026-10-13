"use client";

import { useState } from "react";
import { MessageSquare, MonitorPlay, Compass, Sparkles, Check, ArrowRight, Shield, Zap, Search, Layers, UserCheck } from "lucide-react";
import Link from "next/link";

export function JourneyShowcase() {
  const [activeTab, setActiveTab] = useState<"chat" | "demo" | "onboarding">("chat");

  return (
    <section id="journey" className="py-28 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Cabeçalho da Seção */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4">
          Ciclo de Vida do Cliente com IA Autônoma
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white leading-tight">
          Implemente agentes em toda a <span className="italic font-light text-gradient-purple">jornada do comprador</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-sans">
          Desde o primeiro contato e qualificação técnica profunda até demonstrações interativas de produto e onboarding self-service.
        </p>
      </div>

      {/* Controles de Aba em Pílula */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1.5 rounded-full bg-[#10141F] border border-white/10 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              activeTab === "chat"
                ? "bg-white text-[#080A0F] shadow-lg shadow-white/10"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>1. Chat de Qualificação</span>
          </button>

          <button
            onClick={() => setActiveTab("demo")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              activeTab === "demo"
                ? "bg-white text-[#080A0F] shadow-lg shadow-white/10"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>2. Demonstrações 1:1</span>
          </button>

          <button
            onClick={() => setActiveTab("onboarding")}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              activeTab === "onboarding"
                ? "bg-white text-[#080A0F] shadow-lg shadow-white/10"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3. Onboarding Guiado</span>
          </button>
        </div>
      </div>

      {/* Painéis de Conteúdo */}
      <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Luz de fundo do cartão */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* ABA 1: Chat de Qualificação */}
        {activeTab === "chat" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Qualificação Imediata de Inbound</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Ajude leads a validar sua solução com respostas técnicas em tempo real
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                O agente do Handhold indexa suas documentações de API, manuais de produto e tabelas de preços. Ele conversa com prospects de alta intenção, esclarece dúvidas de conformidade e avalia o poder de decisão de compra.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Respostas instantâneas para mais de 500 perguntas arquiteturais complexas</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Pontuação autônoma de contato e classificação de intenção no CRM</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Transição fluida e transparente para executivos de contas humanos</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-indigo-300 transition-colors"
                >
                  <span>Configure seu agente de qualificação</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Simulação Visual do Chat */}
            <div className="lg:col-span-7 rounded-2xl bg-[#080A0F] border border-white/10 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-white">Concierge Handhold</span>
                  <span className="text-[10px] font-mono text-neutral-500 px-2 py-0.5 rounded bg-white/5">
                    Sessão Ativa
                  </span>
                </div>
                <div className="text-[11px] font-mono text-neutral-400">Latência: 90ms</div>
              </div>

              {/* Mensagem do usuário */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-indigo-600/30 border border-indigo-500/40 rounded-2xl rounded-tr-sm p-3.5 max-w-sm text-xs text-white">
                  O motor de vocês consegue prospectar 2.000 padarias e clínicas em São Paulo sem estourar o limite de requisições da Overpass?
                </div>
              </div>

              {/* Resposta do Agente */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0 text-indigo-300 text-xs font-mono">
                  IA
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm p-4 max-w-lg space-y-3">
                  <p className="text-xs text-neutral-200 leading-relaxed">
                    Sim, com certeza! O nosso motor TRCP integrado subdivide a região em quadrantes geográficos de ~3,5 km² e faz rotação automática entre 3 servidores espelho públicos da Overpass com backoff resiliente conforme a RFC 7231.
                  </p>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                      <span>Simulação de Prospecção Ativa</span>
                      <span className="text-emerald-400">2.140 Leads Verificados</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full w-[94%]" />
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                      <span className="text-indigo-400">★ 94% Score de Contato</span>
                      <span>• Telefones: 89%</span>
                      <span>• Instagram: 72%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chips de perguntas sugeridas */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 cursor-pointer transition-colors">
                  Como funciona a pontuação de completude dos contatos?
                </span>
                <span className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 cursor-pointer transition-colors">
                  Posso exportar direto para Excel com proteção contra fórmulas?
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ABA 2: Demonstrações 1:1 */}
        {activeTab === "demo" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
                <MonitorPlay className="w-4 h-4" />
                <span>Demos Interativas Sem Latência</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Ofereça tours 1:1 sob medida em escala ilimitada
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Em vez de obrigar cada visitante a assistir a um vídeo gravado de 30 minutos, o Handhold cria um ambiente interativo do seu software com pontos de destaque e um guia por voz que reage onde o usuário clica.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Ambientes interativos reais (não são gravações estáticas)</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Adapta o vocabulário e a profundidade conforme a senioridade do lead</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Gatilho de agendamento automático na reunião assim que o prospect atinge o momento ideal</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-indigo-300 transition-colors"
                >
                  <span>Crie seu modelo de demonstração</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Simulação Visual do Sandbox */}
            <div className="lg:col-span-7 rounded-2xl bg-[#080A0F] border border-white/10 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  <span className="text-[11px] font-mono text-neutral-400 ml-2">app.handhold.io/demo/trcp-prospector</span>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  Etapa 2 de 4
                </span>
              </div>

              {/* Interface do Sandbox */}
              <div className="relative p-6 rounded-xl bg-[#10141F] border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Pipeline de Prospecção TRCP</h4>
                    <p className="text-[11px] text-neutral-400">Região Alvo: Belo Horizonte - Savassi</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                    ● Processamento Ativo #8412
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-neutral-400">Leads Coletados</div>
                    <div className="text-lg font-mono font-semibold text-white">1.480</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-neutral-400">Alto Score (&gt;80)</div>
                    <div className="text-lg font-mono font-semibold text-indigo-400">642</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] text-neutral-400">Custo por Lead</div>
                    <div className="text-lg font-mono font-semibold text-emerald-400">R$ 0,00</div>
                  </div>
                </div>

                {/* Balão de Destaque da IA */}
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-indigo-900/60 to-violet-900/40 border border-indigo-500/30 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span className="text-xs text-white">
                      Aviso: Desduplicação por <code className="text-indigo-300">osm_id</code> global impede dados repetidos!
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-200 underline cursor-pointer">Ver Regra</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ABA 3: Onboarding Guiado */}
        {activeTab === "onboarding" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Adoção Rápida de Produto Sem Atrito</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                Ofereça onboarding sob medida com um guia pessoal inteligente
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Assim que novos usuários criam conta, o Handhold inicia um copiloto contextual que acompanha os primeiros passos, configura o espaço da equipe e reduz o tempo de ativação de semanas para minutos.
              </p>
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Listas de tarefas específicas por função (Engenharia, Vendas, Operações)</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Intervenção proativa caso o cliente fique com dúvidas em alguma etapa</span>
                </li>
                <li className="flex items-center gap-3 text-xs text-neutral-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>Validação automática de variáveis de ambiente e webhooks</span>
                </li>
              </ul>
              <div className="pt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-indigo-300 transition-colors"
                >
                  <span>Iniciar agente de onboarding</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Simulação de Lista de Onboarding */}
            <div className="lg:col-span-7 rounded-2xl bg-[#080A0F] border border-white/10 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-medium text-white">Protocolo de Onboarding do Comprador</span>
                </div>
                <div className="text-[11px] font-mono text-emerald-400">75% Concluído</div>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white line-through text-neutral-400">
                        1. Conectar CRM e Banco SQLite Local
                      </div>
                      <div className="text-[10px] text-neutral-500">Schema migrado automaticamente em 1,2s</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Verificado</span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-emerald-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white line-through text-neutral-400">
                        2. Definir Raio de Busca no Nominatim (OSM)
                      </div>
                      <div className="text-[10px] text-neutral-500">Expansão mínima garantida de 1,1 km</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Verificado</span>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-900/20 border border-indigo-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center font-mono text-xs">
                      3
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white">
                        3. Disparar Primeira Prospecção Autônoma
                      </div>
                      <div className="text-[10px] text-indigo-300">Clique para rodar busca multi-espelho Overpass</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-300 animate-pulse">Em Andamento</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
