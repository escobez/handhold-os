"use client";

import { useState } from "react";
import Link from "next/link";
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
  AlertTriangle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Check,
} from "lucide-react";
import { COMMERCIAL_NICHES, PRESET_CITIES } from "@/lib/prospector";

export default function ProspectorPage() {
  const [city, setCity] = useState("Belo Horizonte, MG");
  const [category, setCategory] = useState("Restaurantes & Gastronomia");
  const [limit, setLimit] = useState(25);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMirror, setActiveMirror] = useState("overpass-api.de");
  const [progressStep, setProgressStep] = useState(0);
  const [minedResults, setMinedResults] = useState<any[]>([]);
  const [miningStats, setMiningStats] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const presetCityKeys = Object.keys(PRESET_CITIES);

  const handleStartProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city || !category) return;

    setIsProcessing(true);
    setProgressStep(1);
    setActiveMirror("overpass-api.de");
    setSuccessMessage("");
    setErrorMessage("");
    setMinedResults([]);
    setMiningStats(null);

    // Etapas visuais de telemetria
    const mirrorTimer = setTimeout(() => {
      setProgressStep(2);
      setActiveMirror("overpass.kumi.systems");
    }, 1500);

    const probeTimer = setTimeout(() => {
      setProgressStep(3);
    }, 3200);

    try {
      const res = await fetch("/api/prospect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city, category, limit }),
      });

      clearTimeout(mirrorTimer);
      clearTimeout(probeTimer);

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Falha na extração de dados.");
        setIsProcessing(false);
        return;
      }

      setProgressStep(4);
      setSuccessMessage(data.message);
      setMinedResults(data.leads || []);
      setMiningStats(data.stats || null);
    } catch (err: any) {
      setErrorMessage("Erro de conexão ao consultar os espelhos Overpass.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                TRCP Real Multi-Mirror
              </span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
              Motor de Prospecção Geográfica TRCP
            </h1>
            <p className="text-sm text-neutral-400 font-sans mt-1">
              Mineração de estabelecimentos comerciais no OpenStreetMap com verificação ativa de websites e categorização em camadas.
            </p>
          </div>

          <Link
            href="/dashboard/leads"
            className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white hover:bg-white/10 transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <span>Ver Pipeline no CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Formulário de Configuração da Mineração */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-medium text-white">
                    Parâmetros de Extração
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Selecione o polo urbano e o nicho de negócios para varredura.
                  </p>
                </div>
              </div>

              <form onSubmit={handleStartProspect} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-300 flex items-center justify-between">
                    <span>Cidade / Região Alvo</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Nominatim BBox Auto-detect
                    </span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Curitiba, PR ou Balneário Camboriú, SC"
                      className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                    />
                  </div>

                  {/* Sugestões de Cidades */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {presetCityKeys.slice(0, 8).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setCity(c)}
                        className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                          city === c
                            ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                            : "bg-white/[0.03] text-neutral-400 border-white/5 hover:border-white/20 hover:text-white"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-neutral-300 flex items-center justify-between">
                    <span>Nicho / Categoria Comercial</span>
                    <span className="text-[10px] text-neutral-500 font-mono">
                      Tags OSM Mapeadas
                    </span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#080A0F] border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors font-sans"
                  >
                    {COMMERCIAL_NICHES.map((n) => (
                      <option key={n.id} value={n.label}>
                        {n.label} ({n.categoryGroup})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-1/2 space-y-1">
                    <label className="text-xs font-medium text-neutral-300">
                      Limite de Alvos
                    </label>
                    <select
                      value={limit}
                      onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value={10}>10 Leads</option>
                      <option value={20}>20 Leads</option>
                      <option value={30}>30 Leads</option>
                      <option value={40}>40 Leads (Profundo)</option>
                    </select>
                  </div>

                  <div className="w-1/2 pt-5">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-medium text-xs transition-all shadow-lg shadow-cyan-400/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Minerando Overpass...</span>
                        </>
                      ) : (
                        <>
                          <Compass className="w-4 h-4" />
                          <span>Iniciar Varredura Real</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>

            {/* Painel de Estatísticas da Mineração */}
            {miningStats && (
              <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-medium text-white">
                    Distribuição em Camadas (Tiers)
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    {miningStats.totalMined} Leads Inseridos no CRM
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                    <span className="text-[10px] font-mono text-rose-300 uppercase">
                      Oportunidade Crítica
                    </span>
                    <div className="text-2xl font-bold font-serif text-rose-400">
                      {miningStats.noWebsite}
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      Estabelecimentos sem website ativo (Alvo #1 para vender presença digital).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
                    <span className="text-[10px] font-mono text-amber-300 uppercase">
                      Site Fora do Ar
                    </span>
                    <div className="text-2xl font-bold font-serif text-amber-400">
                      {miningStats.brokenWebsite}
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      Sites com erro HTTP 502/404/DNS (Oportunidade de modernização).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/20 space-y-1">
                    <span className="text-[10px] font-mono text-teal-300 uppercase">
                      Sites Operacionais
                    </span>
                    <div className="text-2xl font-bold font-serif text-teal-400">
                      {miningStats.activeWebsite}
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-snug">
                      Presença ativa na web pronta para integração de agentes de IA.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Telemetria e Monitor de Rede */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 space-y-6">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <h3 className="font-serif text-lg font-medium text-white">
                  Telemetria de Nós OSM
                </h3>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-[#080A0F] border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Espelho Ativo</span>
                    <span className="text-cyan-400">{activeMirror}</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Protocolo</span>
                    <span className="text-neutral-300">Overpass QL / JSON</span>
                  </div>
                  <div className="flex items-center justify-between text-neutral-400">
                    <span>Resiliência</span>
                    <span className="text-emerald-400">4 Espelhos com Auto-Failover</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-neutral-400 text-[11px]">Etapas do Processo:</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-neutral-300">
                      <div className={`w-2 h-2 rounded-full ${progressStep >= 1 ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"}`} />
                      <span>1. Geocodificação Nominatim (BBox)</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <div className={`w-2 h-2 rounded-full ${progressStep >= 2 ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"}`} />
                      <span>2. Consulta Overpass QL Multi-Espelho</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <div className={`w-2 h-2 rounded-full ${progressStep >= 3 ? "bg-emerald-400 animate-pulse" : "bg-neutral-600"}`} />
                      <span>3. Probe HTTP Ativo de Websites</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-300">
                      <div className={`w-2 h-2 rounded-full ${progressStep >= 4 ? "bg-emerald-400" : "bg-neutral-600"}`} />
                      <span>4. Cálculo de Tiers & Gravação no CRM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-neutral-300 font-sans leading-relaxed">
                <span className="text-cyan-400 font-medium">Por que não trava mais?</span> A nova arquitetura utiliza requisições assíncronas com timeout estrito de 12s por espelho e rotação contínua entre servidores da Alemanha, Japão e Finlândia.
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Resultados Minerados */}
        {minedResults.length > 0 && (
          <div className="rounded-3xl bg-[#10141F] border border-white/10 p-6 sm:p-8 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl font-medium text-white">
                  Últimos Leads Capturados ({minedResults.length})
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">
                  Estes estabelecimentos foram registrados no banco local e já estão disponíveis no seu CRM.
                </p>
              </div>
              <Link
                href="/dashboard/leads"
                className="px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-all flex items-center gap-1.5"
              >
                <span>Abrir Funil Kanban</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 font-medium">
                    <th className="py-3 px-3">Empresa</th>
                    <th className="py-3 px-3">Camada (Tier)</th>
                    <th className="py-3 px-3">Website</th>
                    <th className="py-3 px-3">Telefone</th>
                    <th className="py-3 px-3">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {minedResults.map((lead) => (
                    <tr key={lead.osmId} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-[11px] text-neutral-400">{lead.address}</div>
                      </td>
                      <td className="py-3.5 px-3">
                        {lead.tier === "no_website" ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/30">
                            Sem Website
                          </span>
                        ) : lead.tier === "broken_website" ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                            Site Fora do Ar
                          </span>
                        ) : lead.tier === "high_potential" ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                            Alto Potencial
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/30">
                            Site Operacional
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        {lead.website ? (
                          <a
                            href={lead.website.startsWith("http") ? lead.website : `https://${lead.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-1 font-mono truncate max-w-[180px]"
                          >
                            <span>{lead.website.replace(/^https?:\/\//, "")}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-neutral-500 font-mono italic">Nenhum</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-neutral-300">
                        {lead.phone || "—"}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-emerald-400 font-mono">
                          {lead.score} pts
                        </span>
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
