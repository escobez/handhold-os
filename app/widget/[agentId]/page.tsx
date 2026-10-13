"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Bot, Send, Sparkles } from "lucide-react";

export default function EmbeddableWidgetPage() {
  const params = useParams();
  const agentId = (params?.agentId as string) || "agt_aura_01";

  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    {
      role: "assistant",
      content: "Olá! Sou seu assistente de demonstração autônomo. Como posso ajudar com sua dúvida agora?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isStreaming) return;

    const userMsg = { role: "user", content: inputMessage };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputMessage("");
    setIsStreaming(true);

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentId, messages: updated }),
      });

      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { role: "assistant", content: accumulated };
          return next;
        });
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro de conexão ao gerar resposta." },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#080A0F] text-[#F3F4F6] flex flex-col justify-between p-4 font-sans select-none">
      {/* Header */}
      <div className="p-3.5 rounded-2xl bg-[#10141F] border border-white/10 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 p-[1px]">
            <div className="w-full h-full bg-[#080A0F] rounded-full flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-white">Guia Interativo de IA</div>
            <div className="text-[10px] text-emerald-400 font-mono">Disponível 24/7</div>
          </div>
        </div>
        <span className="text-[9px] font-mono text-neutral-500 uppercase">Handhold Widget</span>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 my-3 overflow-y-auto space-y-3 p-1">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-tr-sm"
                  : "bg-[#10141F] border border-white/10 text-neutral-200 rounded-tl-sm shadow-sm"
              }`}
            >
              {m.content || <span className="inline-block w-2 h-3.5 bg-indigo-400 animate-pulse" />}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          value={inputMessage}
          disabled={isStreaming}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-[#10141F] border border-white/10 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={isStreaming || !inputMessage.trim()}
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-neutral-200 disabled:opacity-30 shrink-0"
        >
          <Send className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </form>
    </div>
  );
}
