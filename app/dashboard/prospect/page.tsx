"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Compass,
  Search,
  Sparkles,
  MapPin,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Phone,
  Globe,
  Loader2,
} from "lucide-react";

export default function ProspectorPage() {
  const [city, setCity] = useState("Belo Horizonte, MG");
  const [category, setCategory] = useState("Padarias & Confeitarias");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMirror, setActiveMirror] = useState("overpass-api.de");
  const [progressStep, setProgressStep] = useState(0);
  const [minedResults, setMinedResults] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  const popularCities = [
    "Belo Horizonte, MG",
    "São Paulo, SP",
    "Curitiba, PR",
    "Campinas, SP",
    "Rio de Janeiro, RJ",
  ];

  const popularCategories = [
    "Padarias & Confeitarias",
    "Clínicas Odontológicas",
    "Restaurantes & Cafés",
    "Escritórios de Advocacia",
    "Academias & Estúdios",
  ];

  const handleStartProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !category) return;

    setIsProcessing(true);
    setProgressStep(1);
    setActiveMirror("overpass-api.de");
    setSuccessMessage("");
    setMinedResults([]);

    // Simulação visual de passos de rede e failover
    setTimeout(() => {
      setProgressStep(2);
      setActiveMirror("overpass.private.coffee");
    }, 1200);

    setTimeout(() => {
      setProgressStep(3);
      setActiveMirror("overpass.kumi.systems");
    }, 2400);

    try {
      const res = await fetch("/api/prospect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, category }),
      });

      const data = await res.json();
      if (res.ok) {
        setProgressStep(4);
        setMinedResults(data.leads || []);
        setSuccessMessage(data.message || "Prospecção concluída com sucesso!");
      }
    } catch (err) {
      setSuccessMessage("Falha ao comunicar com o servidor de prospecção.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div>
          <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
            Motor de Prospecção TRCP (OpenStreetMap)
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Extração de alvos comerciais locais em bases públicas abertas com custo zero de API
          </p>
        </div>

        {/* Formulário de Configuração da Busca */}
        <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
          <form onSubmit={handleStartProspect} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cidade / Região */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Cidade / Bairro Alvo</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Belo Horizonte, MG"
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl py-3 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 font-sans"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {popularCities.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCity(c)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nicho Comercial */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase text-neutral-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  <span>Nicho / Categoria Comercial</span>
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Ex: Padarias, Restaurantes..."
                  className="w-full bg-[#080A0F] border border-white/10 rounded-2xl py-3 px-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 font-sans"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {popularCategories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão de Disparo */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Espelhos Overpass Prontos • Tolerância Ativa</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-xl shadow-white/10 flex items-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Minerando Dados OSM...</span>
                  </>
                ) : (
                  <>
                    <span>Disparar Prospecção Autônoma</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Barra de Progresso e Telemetria durante a Busca */}
          {isProcessing && (
            <div className="p-4 rounded-2xl bg-[#080A0F] border border-indigo-500/20 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                <span>Status da Operação: Etapa {progressStep} de 4</span>
                <span className="text-indigo-400">Nó Ativo: {activeMirror}</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${progressStep * 25}%` }}
                />
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                Geocodificando com Nominatim → Consultando Overpass Interpreter → Calculando scores de contato (0-100)
              </div>
            </div>
          )}

          {successMessage && !isProcessing && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between animate-in fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
              <a
                href="/dashboard/leads"
                className="font-mono underline text-white hover:text-emerald-200"
              >
                Abrir Leads no CRM →
              </a>
            </div>
          )}
        </div>

        {/* Tabela com os Resultados Minerados */}
        {minedResults.length > 0 && (
          <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl font-medium text-white">
              Alvos Descobertos Nesta Rodada ({minedResults.length})
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="text-neutral-500 font-mono uppercase text-[10px] border-b border-white/5">
                    <th className="pb-3">Estabelecimento</th>
                    <th className="pb-3">Endereço</th>
                    <th className="pb-3">Score</th>
                    <th className="pb-3">Canais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {minedResults.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 font-medium text-white">{lead.name}</td>
                      <td className="py-3 text-neutral-400">{lead.address}</td>
                      <td className="py-3 font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold text-[10px]">
                          {lead.score} pts
                        </span>
                      </td>
                      <td className="py-3 flex gap-2">
                        {lead.phone && <span className="text-emerald-400"><Phone className="w-3.5 h-3.5" /></span>}
                        {lead.website && <span className="text-indigo-400"><Globe className="w-3.5 h-3.5" /></span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
