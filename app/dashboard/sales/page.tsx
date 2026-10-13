"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import {
  BadgeDollarSign,
  TrendingUp,
  CreditCard,
  QrCode,
  Copy,
  Check,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Building,
  Calendar,
  Sparkles,
  AlertCircle,
  Receipt,
  X,
} from "lucide-react";

interface SaleRecord {
  id: string;
  userId: string;
  leadId: number;
  leadName: string;
  amount: number;
  paymentMethod: "pix" | "credit_card" | "bank_slip";
  status: "paid" | "pending";
  date: string;
  notes?: string;
}

interface PaymentSettings {
  pixKey: string;
  pixKeyType: string;
  pixBeneficiary: string;
  pixCity: string;
  stripePublicKey?: string;
  mercadoPagoPublicKey?: string;
  asaasApiKey?: string;
}

export default function SalesPage() {
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalTransactions: 0,
    averageTicket: 0,
    byMethod: { pix: 0, credit_card: 0, bank_slip: 0 },
  });
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    pixKey: "financeiro@handhold.io",
    pixKeyType: "email",
    pixBeneficiary: "Handhold Inteligência Comercial Ltda",
    pixCity: "Belo Horizonte",
  });
  const [isLoading, setIsLoading] = useState(true);

  // Estados de Nova Venda
  const [showNewSaleModal, setShowNewSaleModal] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "credit_card" | "bank_slip">("pix");
  const [saleNotes, setSaleNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados de Gerador Pix
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixAmount, setPixAmount] = useState("1200.00");
  const [pixCopiaECola, setPixCopiaECola] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);

  // Carrega dados iniciais
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [resSales, resPayments] = await Promise.all([
        fetch("/api/sales"),
        fetch("/api/payments"),
      ]);

      if (resSales.ok) {
        const data = await resSales.json();
        setSales(data.sales || []);
        if (data.metrics) setMetrics(data.metrics);
      }

      if (resPayments.ok) {
        const data = await resPayments.json();
        if (data.settings) setPaymentSettings(data.settings);
        if (data.pixCopiaECola) setPixCopiaECola(data.pixCopiaECola);
        if (data.qrCodeUrl) setQrCodeUrl(data.qrCodeUrl);
      }
    } catch (e) {
      console.error("Erro ao carregar dados de vendas:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateSale = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !amount) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadName,
          amount: parseFloat(amount),
          paymentMethod,
          notes: saleNotes,
        }),
      });

      if (res.ok) {
        setShowNewSaleModal(false);
        setLeadName("");
        setAmount("");
        setSaleNotes("");
        await loadData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneratePix = async () => {
    try {
      const res = await fetch(`/api/payments?amount=${pixAmount}`);
      if (res.ok) {
        const data = await res.json();
        setPixCopiaECola(data.pixCopiaECola);
        setQrCodeUrl(data.qrCodeUrl);
        setShowPixModal(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                Receita & Contratos
              </span>
            </div>
            <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
              Vendas & Gestão de Caixa
            </h1>
            <p className="text-sm text-neutral-400 font-sans mt-1">
              Acompanhe o faturamento gerado pelos leads convertidos e configure cobranças Pix sem taxas.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handleGeneratePix();
              }}
              className="px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium hover:bg-emerald-500/20 transition-all flex items-center gap-2"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Gerar Cobrança Pix</span>
            </button>
            <button
              onClick={() => setShowNewSaleModal(true)}
              className="px-5 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Registrar Venda</span>
            </button>
          </div>
        </div>

        {/* Grade de KPIs Financeiros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#10141F] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span>Faturamento Realizado</span>
              <BadgeDollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="font-serif text-2xl md:text-3xl font-semibold text-white">
              R$ {metrics.totalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+100% de margem sobre leads próprios</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#10141F] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span>Ticket Médio por Lead</span>
              <Receipt className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="font-serif text-2xl md:text-3xl font-semibold text-white">
              R$ {metrics.averageTicket.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-neutral-400 font-sans mt-2">
              Base de {metrics.totalTransactions} contratos fechados
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#10141F] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span>Receita via Pix (Zero Taxas)</span>
              <QrCode className="w-4 h-4 text-teal-400" />
            </div>
            <div className="font-serif text-2xl md:text-3xl font-semibold text-teal-300">
              R$ {metrics.byMethod.pix.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-teal-400 font-mono mt-2 flex items-center gap-1">
              <span>Depósito instantâneo na conta</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#10141F] border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between text-neutral-400 text-xs mb-3">
              <span>Cartão & Boletos</span>
              <CreditCard className="w-4 h-4 text-violet-400" />
            </div>
            <div className="font-serif text-2xl md:text-3xl font-semibold text-white">
              R${" "}
              {(metrics.byMethod.credit_card + metrics.byMethod.bank_slip).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </div>
            <div className="text-[11px] text-neutral-400 font-sans mt-2">
              Recorrência / Parcelamento
            </div>
          </div>
        </div>

        {/* Métodos de Pagamento Conectados (Opções Gratuitas e Acessíveis) */}
        <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-medium text-white">
                Métodos de Pagamento Integrados
              </h2>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Escolha soluções sem custo fixo ou mensalidade para fechar vendas sem comprometer seu caixa.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              100% Gratuito: Sem Mensalidade
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* Cartão 1: PIX Oficial */}
            <div className="p-5 rounded-2xl bg-[#080A0F] border border-emerald-500/30 flex flex-col justify-between space-y-4 relative">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-white text-sm">Pix Instantâneo</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Ativo (0% Taxa)
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Cai direto na sua conta bancária sem intermediários ou mensalidade.
                </p>
                <div className="pt-2 text-xs font-mono text-neutral-300 bg-white/5 p-2 rounded-lg break-all">
                  Chave: {paymentSettings.pixKey || "Não configurada"}
                </div>
              </div>
              <button
                onClick={handleGeneratePix}
                className="w-full py-2 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-xs font-medium hover:bg-teal-500/20 transition-all flex items-center justify-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Emitir Cobrança Pix</span>
              </button>
            </div>

            {/* Cartão 2: Mercado Pago / Asaas */}
            <div className="p-5 rounded-2xl bg-[#080A0F] border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-white text-sm">Mercado Pago / Asaas</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                    Sem Mensalidade
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Permite parcelar em até 12x no cartão de crédito ou emitir boletos bancários. Pague apenas uma pequena porcentagem se vender.
                </p>
              </div>
              <a
                href="/dashboard/settings"
                className="w-full py-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-medium hover:bg-white/10 transition-all text-center"
              >
                Configurar Chaves de API
              </a>
            </div>

            {/* Cartão 3: Stripe Internacional */}
            <div className="p-5 rounded-2xl bg-[#080A0F] border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/30 flex items-center justify-center text-violet-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-white text-sm">Stripe Connect</span>
                  </div>
                  <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full">
                    Global / USD & BRL
                  </span>
                </div>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                  Ideal para cobrar clientes no exterior ou criar planos de assinatura recorrente (SaaS MRR).
                </p>
              </div>
              <a
                href="/dashboard/settings"
                className="w-full py-2 rounded-full border border-white/10 bg-white/5 text-neutral-300 text-xs font-medium hover:bg-white/10 transition-all text-center"
              >
                Conectar Conta Stripe
              </a>
            </div>
          </div>
        </div>

        {/* Tabela de Vendas & Contratos Fechados */}
        <div className="p-6 rounded-3xl bg-[#10141F] border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-medium text-white">
                Contratos & Vendas Realizadas
              </h2>
              <p className="text-xs text-neutral-400 font-sans mt-0.5">
                Histórico detalhado de transações recebidas no pipeline de prospecção.
              </p>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              {sales.length} registros
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-medium">
                  <th className="py-3 px-3">Cliente / Empresa</th>
                  <th className="py-3 px-3">Valor (R$)</th>
                  <th className="py-3 px-3">Método</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Data</th>
                  <th className="py-3 px-3">Observações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-neutral-500">
                      Nenhuma venda registrada ainda. Clique em "Registrar Venda" para adicionar seu primeiro contrato!
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-3.5 px-3">
                        <div className="font-medium text-white">{sale.leadName}</div>
                        <div className="text-[11px] text-neutral-400 font-mono">{sale.id}</div>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-emerald-400 font-mono">
                        R$ {sale.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                            sale.paymentMethod === "pix"
                              ? "bg-teal-500/10 text-teal-300 border-teal-500/20"
                              : sale.paymentMethod === "credit_card"
                              ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                              : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                          }`}
                        >
                          {sale.paymentMethod === "pix"
                            ? "Pix"
                            : sale.paymentMethod === "credit_card"
                            ? "Cartão"
                            : "Boleto"}
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                          <Check className="w-3 h-3" />
                          <span>Liquidado</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-neutral-400 font-mono">
                        {new Date(sale.date).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="py-3.5 px-3 text-neutral-400 max-w-xs truncate">
                        {sale.notes || "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Registrar Nova Venda */}
        {showNewSaleModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#10141F] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-serif text-xl font-medium text-white">
                  Registrar Nova Venda
                </h3>
                <button
                  onClick={() => setShowNewSaleModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateSale} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Nome da Empresa / Cliente
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Clínica OdontoPrime Savassi"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Valor Fechado (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ex: 1500.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Método de Pagamento
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e: any) => setPaymentMethod(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="pix">Pix (Instantâneo - Zero Taxas)</option>
                    <option value="credit_card">Cartão de Crédito</option>
                    <option value="bank_slip">Boleto Bancário</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">
                    Detalhes / Escopo do Contrato
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Implantação de Agente IA + Manutenção Mensal..."
                    value={saleNotes}
                    onChange={(e) => setSaleNotes(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080A0F] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowNewSaleModal(false)}
                    className="px-4 py-2 rounded-full text-xs text-neutral-400 hover:text-white"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-medium text-xs transition-all shadow-lg shadow-emerald-500/20"
                  >
                    {isSubmitting ? "Gravando..." : "Confirmar Venda no Caixa"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Gerador de Cobrança Pix com QR Code */}
        {showPixModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-[#10141F] border border-teal-500/30 rounded-3xl p-6 sm:p-8 space-y-5 text-center shadow-2xl animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-teal-400 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4" />
                  Pix Banco Central
                </span>
                <button
                  onClick={() => setShowPixModal(false)}
                  className="p-1 rounded-full text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="font-serif text-xl font-medium text-white">
                  Cobrança Pix Instantânea
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Peça para o cliente escanear ou copiar o código.
                </p>
              </div>

              {qrCodeUrl && (
                <div className="p-3 bg-white rounded-2xl w-fit mx-auto shadow-xl">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code Pix"
                    className="w-48 h-48 rounded-lg"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <div className="text-[11px] text-neutral-400 font-mono">
                  Beneficiário: {paymentSettings.pixBeneficiary}
                </div>
                <div className="text-lg font-serif font-bold text-white">
                  R$ {parseFloat(pixAmount || "0").toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => copyToClipboard(pixCopiaECola)}
                  className="w-full py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-black font-medium text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 active:scale-95"
                >
                  {copiedPix ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Código Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar Chave Copia e Cola</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
