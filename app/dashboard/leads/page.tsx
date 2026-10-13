"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Users,
  Search,
  Filter,
  Download,
  Phone,
  Globe,
  Mail,
  Instagram,
  Sparkles,
  Columns,
  List,
  Edit3,
  X,
  CheckCircle2,
  Trash2,
  AlertTriangle,
  AlertCircle,
  QrCode,
  BadgeDollarSign,
  Check,
  Copy,
  ExternalLink,
} from "lucide-react";

export default function LeadsCrmPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [selectedTier, setSelectedTier] = useState("all");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [leadNotes, setLeadNotes] = useState("");
  const [dealValue, setDealValue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card" | "bank_slip">("pix");
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<any>({
    total: 0,
    noWebsite: 0,
    brokenWebsite: 0,
    activeWebsite: 0,
    highPotential: 0,
  });

  // Modal Pix no fechamento
  const [pixModalOpen, setPixModalOpen] = useState(false);
  const [pixCopiaECola, setPixCopiaECola] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const tierParam = selectedTier !== "all" ? `&tier=${selectedTier}` : "";
      const res = await fetch(
        `/api/leads?search=${encodeURIComponent(searchTerm)}&minScore=${minScore}${tierParam}`
      );
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [minScore, selectedTier]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  const updateLeadStatus = async (leadId: number, newStatus: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      }
    } catch (e) {}
  };

  const saveLeadDetails = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedLead.id,
          notes: leadNotes,
          dealValue: dealValue ? parseFloat(dealValue) : undefined,
          paymentMethod,
          status: dealValue && parseFloat(dealValue) > 0 ? "converted" : selectedLead.status,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? data.lead : l))
        );
        setSelectedLead(data.lead);
      }
    } catch (e) {}
  };

  const handleOpenPixForLead = async (amount: string) => {
    try {
      const res = await fetch(`/api/payments?amount=${amount || "1500"}`);
      if (res.ok) {
        const data = await res.json();
        setPixCopiaECola(data.pixCopiaECola);
        setQrCodeUrl(data.qrCodeUrl);
        setPixModalOpen(true);
      }
    } catch (e) {}
  };

  const kanbanColumns = [
    { id: "new", title: "Novos", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { id: "contacted", title: "Contatados", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { id: "qualified", title: "Qualificados", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
    { id: "converted", title: "Convertidos", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { id: "rejected", title: "Descartados", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
              Base de Leads & CRM
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Gerencie seus alvos comerciais extraídos pelo TRCP, filtre por camadas de oportunidade e converta em vendas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Alternador Tabela / Kanban */}
            <div className="flex items-center p-1 rounded-full bg-[#10141F] border border-white/10">
              <button
                onClick={() => setViewMode("table")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                  viewMode === "table" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Tabela</span>
              </button>
              <button
                onClick={() => setViewMode("kanban")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                  viewMode === "kanban" ? "bg-white text-black font-semibold" : "text-neutral-400 hover:text-white"
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span>Funil Kanban</span>
              </button>
            </div>

            <a
              href="/api/export/leads"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV Seguro</span>
            </a>
          </div>
        </div>

        {/* Abas de Filtro por Camadas de Oportunidade (Tiers) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-white/10 text-xs font-sans">
          <button
            onClick={() => setSelectedTier("all")}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 ${
              selectedTier === "all"
                ? "bg-white text-black"
                : "text-neutral-400 hover:text-white bg-white/5"
            }`}
          >
            Todos ({stats.total || leads.length})
          </button>
          <button
            onClick={() => setSelectedTier("no_website")}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 flex items-center gap-1.5 ${
              selectedTier === "no_website"
                ? "bg-rose-500 text-white font-semibold"
                : "text-rose-300 hover:text-white bg-rose-500/10 border border-rose-500/20"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Sem Website ({stats.noWebsite || 0})</span>
          </button>
          <button
            onClick={() => setSelectedTier("broken_website")}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 flex items-center gap-1.5 ${
              selectedTier === "broken_website"
                ? "bg-amber-500 text-black font-semibold"
                : "text-amber-300 hover:text-white bg-amber-500/10 border border-amber-500/20"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Site Fora do Ar ({stats.brokenWebsite || 0})</span>
          </button>
          <button
            onClick={() => setSelectedTier("high_potential")}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 flex items-center gap-1.5 ${
              selectedTier === "high_potential"
                ? "bg-purple-600 text-white font-semibold"
                : "text-purple-300 hover:text-white bg-purple-500/10 border border-purple-500/20"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alto Potencial ({stats.highPotential || 0})</span>
          </button>
          <button
            onClick={() => setSelectedTier("active_website")}
            className={`px-3.5 py-1.5 rounded-full font-medium transition-all shrink-0 flex items-center gap-1.5 ${
              selectedTier === "active_website"
                ? "bg-teal-500 text-black font-semibold"
                : "text-teal-300 hover:text-white bg-teal-500/10 border border-teal-500/20"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Site Ativo ({stats.activeWebsite || 0})</span>
          </button>
        </div>

        {/* Barra de Filtros e Busca */}
        <div className="p-4 rounded-2xl bg-[#10141F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, bairro, site ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#080A0F] border border-white/10 rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500"
            />
          </form>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-[11px] font-mono text-neutral-400">Score mínimo:</span>
            <div className="flex gap-1.5">
              {[0, 60, 80, 90].map((score) => (
                <button
                  key={score}
                  onClick={() => setMinScore(score)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                    minScore === score
                      ? "bg-indigo-600 text-white font-bold"
                      : "bg-white/5 text-neutral-400 hover:text-white border border-white/5"
                  }`}
                >
                  {score === 0 ? "Todos" : `+${score}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MODO TABELA */}
        {viewMode === "table" && (
          <div className="rounded-3xl bg-[#10141F] border border-white/10 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 bg-white/[0.02]">
                    <th className="py-4 px-4 font-medium">Empresa</th>
                    <th className="py-4 px-4 font-medium">Camada (Tier)</th>
                    <th className="py-4 px-4 font-medium">Presença Digital / Site</th>
                    <th className="py-4 px-4 font-medium">Telefone</th>
                    <th className="py-4 px-4 font-medium">Score</th>
                    <th className="py-4 px-4 font-medium">Status CRM</th>
                    <th className="py-4 px-4 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setLeadNotes(lead.notes || "");
                        setDealValue(lead.dealValue ? String(lead.dealValue) : "");
                        setPaymentMethod(lead.paymentMethod || "pix");
                      }}
                      className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                    >
                      <td className="py-4 px-4">
                        <div className="font-medium text-white group-hover:text-indigo-300 transition-colors">
                          {lead.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 truncate max-w-xs">{lead.address}</div>
                      </td>

                      <td className="py-4 px-4">
                        {lead.tier === "no_website" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30">
                            <AlertCircle className="w-3 h-3" />
                            <span>Sem Site</span>
                          </span>
                        ) : lead.tier === "broken_website" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            <AlertTriangle className="w-3 h-3" />
                            <span>Site Fora do Ar</span>
                          </span>
                        ) : lead.tier === "high_potential" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                            <Sparkles className="w-3 h-3" />
                            <span>Alto Potencial</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                            <Globe className="w-3 h-3" />
                            <span>Site Ativo</span>
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        {lead.website ? (
                          <a
                            href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-cyan-400 hover:underline flex items-center gap-1 font-mono truncate max-w-[160px]"
                          >
                            <span>{lead.website.replace(/^https?:\/\//, "")}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-neutral-500 font-mono italic">Sem website</span>
                        )}
                      </td>

                      <td className="py-4 px-4 font-mono text-neutral-300">
                        {lead.phone || "—"}
                      </td>

                      <td className="py-4 px-4">
                        <span
                          className={`font-mono font-bold ${
                            lead.score >= 80 ? "text-emerald-400" : lead.score >= 60 ? "text-amber-400" : "text-neutral-500"
                          }`}
                        >
                          {lead.score}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="bg-[#080A0F] border border-white/10 rounded-full px-2.5 py-1 text-[11px] text-white focus:outline-none"
                        >
                          <option value="new">Novo</option>
                          <option value="contacted">Contatado</option>
                          <option value="qualified">Qualificado</option>
                          <option value="converted">Convertido</option>
                          <option value="rejected">Descartado</option>
                        </select>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                            setLeadNotes(lead.notes || "");
                            setDealValue(lead.dealValue ? String(lead.dealValue) : "");
                            setPaymentMethod(lead.paymentMethod || "pix");
                          }}
                          className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODO KANBAN */}
        {viewMode === "kanban" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {kanbanColumns.map((col) => {
              const colLeads = leads.filter((l) => l.status === col.id);
              return (
                <div
                  key={col.id}
                  className="rounded-3xl bg-[#10141F] border border-white/10 p-4 space-y-3 min-h-[500px]"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className={`text-xs font-semibold ${col.color}`}>{col.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                      {colLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setLeadNotes(lead.notes || "");
                          setDealValue(lead.dealValue ? String(lead.dealValue) : "");
                          setPaymentMethod(lead.paymentMethod || "pix");
                        }}
                        className="p-3.5 rounded-2xl bg-[#080A0F] border border-white/5 hover:border-white/20 transition-all cursor-pointer space-y-2 group shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-medium text-white text-xs group-hover:text-indigo-300 transition-colors leading-tight">
                            {lead.name}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 shrink-0 font-bold">
                            {lead.score}
                          </span>
                        </div>

                        {/* Tag de Camada no Kanban */}
                        <div>
                          {lead.tier === "no_website" ? (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                              Sem Website
                            </span>
                          ) : lead.tier === "broken_website" ? (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                              Site Fora do Ar
                            </span>
                          ) : lead.tier === "high_potential" ? (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              Alto Potencial
                            </span>
                          ) : (
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                              Site Ativo
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-neutral-400 truncate">
                          {lead.category}
                        </div>

                        {lead.dealValue && (
                          <div className="text-[11px] font-mono text-emerald-400 font-semibold pt-1 border-t border-white/5">
                            R$ {lead.dealValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* GAVETA LATERAL DE DETALHES DO LEAD & FECHAMENTO */}
        {selectedLead && (
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-[#10141F] border-l border-white/10 p-6 md:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl animate-in slide-in-from-right duration-200 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                  Ficha do Lead & Fechamento
                </span>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-white">{selectedLead.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">OSM ID: {selectedLead.osmId}</p>
                </div>

                {/* Status do Website */}
                <div className="p-4 rounded-2xl bg-[#080A0F] border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Diagnóstico de Presença:</span>
                    {selectedLead.tier === "no_website" ? (
                      <span className="text-rose-400 font-medium">🚨 Sem Website Registrado</span>
                    ) : selectedLead.tier === "broken_website" ? (
                      <span className="text-amber-400 font-medium">⚠️ Site Fora do Ar (Erro de Servidor)</span>
                    ) : (
                      <span className="text-teal-400 font-medium">🌐 Website Operacional</span>
                    )}
                  </div>
                  <div className="text-neutral-400"><strong className="text-white">Endereço:</strong> {selectedLead.address}</div>
                  <div className="text-neutral-400"><strong className="text-white">Score de Contato:</strong> <span className="text-emerald-400 font-mono font-bold">{selectedLead.score} / 100</span></div>
                </div>

                {/* Ações Rápidas de Contato */}
                <div className="grid grid-cols-2 gap-2">
                  {selectedLead.phone && (
                    <a
                      href={`tel:${selectedLead.phone}`}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-center gap-2 hover:bg-emerald-500/20"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Ligar ({selectedLead.phone})</span>
                    </a>
                  )}
                  {selectedLead.website ? (
                    <a
                      href={selectedLead.website.startsWith("http") ? selectedLead.website : `https://${selectedLead.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs flex items-center justify-center gap-2 hover:bg-cyan-500/20"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Visitar Site</span>
                    </a>
                  ) : (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center justify-center gap-1.5 text-center">
                      <span>Sem site para visitar</span>
                    </div>
                  )}
                </div>

                {/* Fechamento de Venda & Pagamento Pix */}
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#141A28] to-[#0D121D] border border-emerald-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-emerald-400 flex items-center gap-1.5">
                      <BadgeDollarSign className="w-3.5 h-3.5" />
                      Fechamento de Contrato
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenPixForLead(dealValue || "1200")}
                      className="text-[11px] text-teal-300 bg-teal-500/10 border border-teal-500/30 px-2 py-0.5 rounded-full flex items-center gap-1 hover:bg-teal-500/20"
                    >
                      <QrCode className="w-3 h-3" />
                      <span>Cobrar via Pix</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400">Valor da Venda (R$)</label>
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Ex: 1500.00"
                        value={dealValue}
                        onChange={(e) => setDealValue(e.target.value)}
                        className="w-full bg-[#080A0F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400">Forma de Pagamento</label>
                      <select
                        value={paymentMethod}
                        onChange={(e: any) => setPaymentMethod(e.target.value)}
                        className="w-full bg-[#080A0F] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="pix">Pix (Sem Taxas)</option>
                        <option value="credit_card">Cartão de Crédito</option>
                        <option value="bank_slip">Boleto Bancário</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Anotações Comerciais */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Anotações da Negociação</span>
                  </label>
                  <textarea
                    rows={3}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Ex: Cliente tem interesse em modernizar o site e implantar IA..."
                    className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                  />
                  <button
                    onClick={saveLeadDetails}
                    className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow"
                  >
                    Salvar Dados & Atualizar Lead
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Pix Direto no Fechamento */}
        {pixModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-[#10141F] border border-teal-500/30 rounded-3xl p-6 sm:p-8 space-y-5 text-center shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-teal-400 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  Pix Banco Central
                </span>
                <button
                  onClick={() => setPixModalOpen(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-serif text-xl font-medium text-white">
                  Cobrança para {selectedLead?.name}
                </h3>
                <div className="text-lg font-serif font-bold text-emerald-400 mt-1">
                  R$ {parseFloat(dealValue || "1200").toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>

              {qrCodeUrl && (
                <div className="p-3 bg-white rounded-2xl w-fit mx-auto shadow-xl">
                  <img src={qrCodeUrl} alt="QR Code Pix" className="w-44 h-44 rounded-lg" />
                </div>
              )}

              <button
                onClick={() => {
                  navigator.clipboard.writeText(pixCopiaECola);
                  setCopiedPix(true);
                  setTimeout(() => setCopiedPix(false), 2000);
                }}
                className="w-full py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-medium text-xs transition-all flex items-center justify-center gap-2"
              >
                {copiedPix ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copia e Cola Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Código Pix Copia e Cola</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
