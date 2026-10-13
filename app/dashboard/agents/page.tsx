"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Bot,
  Plus,
  Sparkles,
  Send,
  Code2,
  Copy,
  Check,
  Edit2,
  Trash2,
  CheckCircle2,
  MessageSquare,
  Cpu,
} from "lucide-react";

export default function AgentsStudioPage() {
  const [agents, setAgents] = useState<any[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Olá! Sou o agente de IA da Handhold. Como posso apresentar nossa plataforma ou qualificar seus leads hoje?" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);

  // Formulário de Criação de Agente
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAgentName, setNewAgentName] = useState("");
  const [newAgentPersona, setNewAgentPersona] = useState<"concierge" | "technical" | "executive">("concierge");
  const [newAgentPrompt, setNewAgentPrompt] = useState("");
  const [newAgentContext, setNewAgentContext] = useState("");

  const loadAgents = async () => {
    try {
      const res = await fetch("/api/agents");
      if (res.ok) {
        const data = await res.json();
        setAgents(data.agents || []);
        if (data.agents?.length > 0 && !selectedAgentId) {
          setSelectedAgentId(data.agents[0].id);
        }
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isStreaming) return;

    const userMsg = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage("");
    setIsStreaming(true);

    // Adiciona espaço vazio para o streaming da resposta
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgentId,
          messages: updatedMessages,
        }),
      });

      if (!res.body) return;

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        accumulated += text;

        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: accumulated };
          return next;
        });
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro de conexão ao gerar resposta do agente." },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAgentName || !newAgentPrompt) return;

    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newAgentName,
          persona: newAgentPersona,
          systemPrompt: newAgentPrompt,
          productContext: newAgentContext,
        }),
      });

      if (res.ok) {
        setShowCreateModal(false);
        setNewAgentName("");
        setNewAgentPrompt("");
        setNewAgentContext("");
        loadAgents();
      }
    } catch (e) {}
  };

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || agents[0];
  const embedCode = `<iframe src="https://express-topaz-2gdb91a.vercel.app/widget/${selectedAgentId || "default"}" width="400" height="600" frameborder="0"></iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
              Estúdio de Agentes de IA
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Configure personas, prompts de qualificação e teste em tempo real no playground
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Novo Agente</span>
          </button>
        </div>

        {/* Layout Grid: Lista de Agentes & Playground */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Coluna Esquerda: Lista e Configuração dos Agentes */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-2xl bg-[#10141F] border border-white/10">
              <span className="text-xs font-mono uppercase text-neutral-400 block mb-3">
                Selecione o Agente para Edição & Teste
              </span>
              <div className="space-y-2">
                {agents.map((ag) => (
                  <div
                    key={ag.id}
                    onClick={() => setSelectedAgentId(ag.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedAgentId === ag.id
                        ? "bg-indigo-600/20 border-indigo-500/40 text-white"
                        : "bg-[#080A0F] border-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-xs">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{ag.name}</div>
                        <div className="text-[10px] text-neutral-500 font-mono capitalize">
                          Persona: {ag.persona}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5">
                      {ag.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ficha de Calibração do Agente Selecionado */}
            {selectedAgent && (
              <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
                <h3 className="font-serif text-lg font-medium text-white">
                  Diretrizes de Comportamento
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase">
                      Prompt de Sistema (Persona)
                    </label>
                    <p className="mt-1 p-3 rounded-xl bg-[#080A0F] border border-white/5 text-neutral-300 font-sans leading-relaxed">
                      {selectedAgent.systemPrompt}
                    </p>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase">
                      Contexto de Produto Injetado
                    </label>
                    <p className="mt-1 p-3 rounded-xl bg-[#080A0F] border border-white/5 text-neutral-400 font-sans leading-relaxed">
                      {selectedAgent.productContext || "Nenhum contexto adicional injetado."}
                    </p>
                  </div>
                </div>

                {/* Código de Embarque */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase text-indigo-400 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Script de Embarque no seu Site</span>
                    </span>
                    <button
                      onClick={copyEmbedCode}
                      className="text-[10px] font-mono text-neutral-300 hover:text-white flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? "Copiado!" : "Copiar"}</span>
                    </button>
                  </div>
                  <pre className="p-2.5 rounded-xl bg-black/60 border border-white/5 text-[10px] text-neutral-400 font-mono overflow-x-auto">
                    {embedCode}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Coluna Direita: Playground Interativo com Streaming */}
          <div className="lg:col-span-7 rounded-3xl bg-[#10141F] border border-white/10 flex flex-col h-[650px] shadow-2xl overflow-hidden">
            {/* Cabeçalho do Chat */}
            <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">
                  Playground em Tempo Real: {selectedAgent?.name || "Agente IA"}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                Streaming SSE Ativo
              </span>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-mono flex items-center justify-center shrink-0">
                      IA
                    </div>
                  )}

                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-indigo-600 text-white rounded-tr-sm"
                        : "bg-[#080A0F] border border-white/10 text-neutral-200 rounded-tl-sm shadow-inner"
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-block w-2 h-4 bg-indigo-400 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input e Envio */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-white/10 bg-[#080A0F]/60 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Pergunte sobre overpass, leads, score ou produto..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isStreaming}
                className="flex-1 bg-[#10141F] border border-white/10 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 font-sans"
              />
              <button
                type="submit"
                disabled={isStreaming || !inputMessage.trim()}
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 transition-colors disabled:opacity-30 shrink-0"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>

        {/* MODAL DE CRIAÇÃO DE NOVO AGENTE */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="max-w-lg w-full bg-[#10141F] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="font-serif text-xl font-medium text-white">Criar Novo Agente de IA</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-neutral-400 hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateAgent} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Nome do Agente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Consultor Especialista em Vendas"
                    value={newAgentName}
                    onChange={(e) => setNewAgentName(e.target.value)}
                    className="w-full bg-[#080A0F] border border-white/10 rounded-xl py-2 px-3 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Persona</label>
                  <select
                    value={newAgentPersona}
                    onChange={(e) => setNewAgentPersona(e.target.value as any)}
                    className="w-full bg-[#080A0F] border border-white/10 rounded-xl py-2 px-3 text-xs text-white"
                  >
                    <option value="concierge">Concierge Guide (Amigável e acolhedor)</option>
                    <option value="technical">Especialista Técnico (Aprofundado e arquitetural)</option>
                    <option value="executive">Conselheiro Executivo (Focado em ROI e estratégia)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Prompt de Sistema</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Defina o tom de voz e as instruções de qualificação..."
                    value={newAgentPrompt}
                    onChange={(e) => setNewAgentPrompt(e.target.value)}
                    className="w-full bg-[#080A0F] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-neutral-400 uppercase">Contexto de Produto</label>
                  <textarea
                    rows={2}
                    placeholder="Informações sobre preços, diferenciais e documentação..."
                    value={newAgentContext}
                    onChange={(e) => setNewAgentContext(e.target.value)}
                    className="w-full bg-[#080A0F] border border-white/10 rounded-xl p-3 text-xs text-white"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-full border border-white/10 text-xs text-neutral-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200"
                  >
                    Salvar Agente
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
