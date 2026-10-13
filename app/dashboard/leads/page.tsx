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
} from "lucide-react";

export default function LeadsCrmPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [minScore, setMinScore] = useState(0);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [leadNotes, setLeadNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/leads?search=${encodeURIComponent(searchTerm)}&minScore=${minScore}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [minScore]);

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

  const saveLeadNotes = async () => {
    if (!selectedLead) return;
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedLead.id, notes: leadNotes }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === selectedLead.id ? { ...l, notes: leadNotes } : l))
        );
        setSelectedLead({ ...selectedLead, notes: leadNotes });
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
              Gerencie seus alvos comerciais extraídos pelo TRCP e acompanhe o funil de vendas
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

        {/* Barra de Filtros e Busca */}
        <div className="p-4 rounded-2xl bg-[#10141F] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nome, bairro ou categoria..."
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
                  <tr className="bg-white/[0.02] text-neutral-400 font-mono uppercase text-[10px] border-b border-white/5">
                    <th className="py-4 px-6">Empresa & Local</th>
                    <th className="py-4 px-4">Canais de Contato</th>
                    <th className="py-4 px-4">Score TRCP</th>
                    <th className="py-4 px-4">Status no CRM</th>
                    <th className="py-4 px-4 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedLead(lead);
                        setLeadNotes(lead.notes || "");
                      }}
                    >
                      <td className="py-4 px-6">
                        <div className="font-medium text-white text-sm">{lead.name}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">{lead.address}</div>
                        <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                          {lead.category}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {lead.phone ? (
                            <a
                              href={`tel:${lead.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              title={lead.phone}
                              className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1.5 opacity-20"><Phone className="w-3.5 h-3.5" /></span>
                          )}

                          {lead.website ? (
                            <a
                              href={lead.website}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              title={lead.website}
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1.5 opacity-20"><Globe className="w-3.5 h-3.5" /></span>
                          )}

                          {lead.email ? (
                            <a
                              href={`mailto:${lead.email}`}
                              onClick={(e) => e.stopPropagation()}
                              title={lead.email}
                              className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>
                          ) : (
                            <span className="p-1.5 opacity-20"><Mail className="w-3.5 h-3.5" /></span>
                          )}

                          {lead.socialProfiles?.length > 0 && (
                            <a
                              href={lead.socialProfiles[0]}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 hover:bg-pink-500/20"
                            >
                              <Instagram className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 font-mono">
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            lead.score >= 80
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : lead.score >= 50
                              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                              : "bg-white/10 text-neutral-400"
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          <span>{lead.score} pts</span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={lead.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="bg-[#080A0F] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500 cursor-pointer"
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
                          }}
                          className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-300 hover:text-white text-xs font-mono"
                        >
                          Detalhes
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {kanbanColumns.map((col) => {
              const colLeads = leads.filter((l) => l.status === col.id);
              return (
                <div key={col.id} className="rounded-3xl bg-[#10141F] border border-white/10 p-4 flex flex-col min-w-[240px]">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/5">
                    <span className={`text-xs font-mono font-semibold uppercase ${col.color}`}>
                      {col.title}
                    </span>
                    <span className="w-5 h-5 rounded-full bg-white/5 text-neutral-400 text-[10px] font-mono flex items-center justify-center">
                      {colLeads.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px]">
                    {colLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setLeadNotes(lead.notes || "");
                        }}
                        className="p-3.5 rounded-2xl bg-[#080A0F] border border-white/5 hover:border-indigo-500/40 transition-all cursor-pointer space-y-2 shadow-inner"
                      >
                        <div className="font-medium text-xs text-white line-clamp-1">{lead.name}</div>
                        <div className="text-[10px] text-neutral-400 truncate">{lead.category}</div>
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <span className="text-[10px] font-mono text-emerald-400">
                            ★ {lead.score} pts
                          </span>
                          <select
                            value={lead.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="bg-black/60 border border-white/10 rounded-lg text-[10px] px-2 py-0.5 text-neutral-300 font-mono"
                          >
                            <option value="new">Novo</option>
                            <option value="contacted">Contatado</option>
                            <option value="qualified">Qualificado</option>
                            <option value="converted">Convertido</option>
                            <option value="rejected">Descartado</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* DRAWER LATERAL DE DETALHES DO LEAD */}
        {selectedLead && (
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#10141F] border-l border-white/10 shadow-2xl p-6 z-50 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs font-mono uppercase text-indigo-400">Ficha do Lead</span>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-full hover:bg-white/5 text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-white">{selectedLead.name}</h3>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">OSM ID: {selectedLead.osmId}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#080A0F] border border-white/5 space-y-2 text-xs">
                  <div className="text-neutral-400"><strong className="text-white">Endereço:</strong> {selectedLead.address}</div>
                  <div className="text-neutral-400"><strong className="text-white">Categoria:</strong> {selectedLead.category}</div>
                  <div className="text-neutral-400"><strong className="text-white">Score de Contato:</strong> <span className="text-emerald-400 font-mono font-bold">{selectedLead.score} / 100</span></div>
                </div>

                {/* Canais de Contato Diretos */}
                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-400 uppercase">Ações Rápidas de Contato</span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedLead.phone && (
                      <a
                        href={`tel:${selectedLead.phone}`}
                        className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 hover:bg-emerald-500/20"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Ligar Agora</span>
                      </a>
                    )}
                    {selectedLead.website && (
                      <a
                        href={selectedLead.website}
                        target="_blank"
                        className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs flex items-center gap-2 hover:bg-indigo-500/20"
                      >
                        <Globe className="w-4 h-4" />
                        <span>Abrir Site</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bloco de Notas Comerciais */}
                <div className="space-y-2">
                  <label className="text-xs font-mono text-neutral-400 uppercase flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Anotações do CRM</span>
                  </label>
                  <textarea
                    rows={4}
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="Adicione observações sobre a negociação..."
                    className="w-full bg-[#080A0F] border border-white/10 rounded-2xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={saveLeadNotes}
                    className="px-4 py-2 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow"
                  >
                    Salvar Notas
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => setSelectedLead(null)}
                className="w-full py-2.5 rounded-full border border-white/10 text-xs text-neutral-300 hover:bg-white/5"
              >
                Fechar Painel
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
