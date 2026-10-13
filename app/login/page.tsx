"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, Shield, Lock, Mail, Eye, EyeOff, CheckCircle2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Falha na autenticação.");
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      setErrorMessage("Erro de conexão com o servidor.");
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("fundador@empresa.com.br");
    setPassword("Handhold2026!Seguro");
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F3F4F6] flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <header className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 p-[1px]">
            <div className="w-full h-full bg-[#080A0F] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <span className="font-serif text-lg tracking-tight font-medium text-white">
            Handhold
          </span>
        </Link>

        <Link
          href="/"
          className="text-xs text-neutral-400 hover:text-white transition-colors"
        >
          ← Voltar para a página inicial
        </Link>
      </header>

      <main className="max-w-md w-full mx-auto my-12 z-10">
        <div className="rounded-3xl bg-[#10141F] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-medium text-white tracking-tight">
              Acesse o Handhold
            </h1>
            <p className="mt-2 text-xs text-neutral-400 font-sans">
              Entre no centro de comando dos seus guias e prospecções TRCP
            </p>
          </div>

          {/* Botão de Preenchimento Automático para Demonstração */}
          <button
            type="button"
            onClick={handleDemoFill}
            className="w-full mb-6 py-2 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono flex items-center justify-center gap-2 hover:bg-indigo-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preencher Credenciais Demo de Exemplo</span>
          </button>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="py-8 text-center space-y-3 animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-white">Sessão Autenticada</h3>
              <p className="text-xs text-neutral-400">
                Redirecionando para o seu Dashboard de Produção...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  E-mail Corporativo
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.nome@empresa.com.br"
                    className="w-full bg-[#080A0F] border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Senha de Acesso
                  </label>
                  <a href="#" className="text-[11px] text-neutral-400 hover:text-white transition-colors">
                    Esqueceu?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-[#080A0F] border border-white/10 rounded-full py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-sans"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 py-3 rounded-full bg-white text-[#080A0F] font-medium text-xs hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
              >
                {isLoading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Entrar no sistema</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-neutral-500">
              Ainda não tem conta corporativa?{" "}
              <Link href="/register" className="text-white hover:underline font-medium">
                Testar grátis
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="text-center text-[11px] text-neutral-500 z-10">
        Protegido com criptografia TLS 1.3 de ponta a ponta e certificação SOC2 Tipo II
      </footer>
    </div>
  );
}
