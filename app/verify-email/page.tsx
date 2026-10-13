"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Validando seu token de segurança...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de ativação não encontrado no link.");
      return;
    }

    async function verify() {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${token}`);
        if (res.ok || res.redirected) {
          setStatus("success");
          setMessage("Seu e-mail foi validado com sucesso! Redirecionando para o painel...");
          setTimeout(() => {
            router.push("/dashboard");
          }, 1800);
        } else {
          const data = await res.json().catch(() => ({}));
          setStatus("error");
          setMessage(data.error || "Token inválido ou expirado.");
        }
      } catch (err) {
        setStatus("error");
        setMessage("Falha ao comunicar com o servidor de validação.");
      }
    }

    verify();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F3F4F6] flex flex-col justify-between p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <header className="max-w-7xl mx-auto w-full flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 p-[1px]">
            <div className="w-full h-full bg-[#080A0F] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <span className="font-serif text-lg tracking-tight font-medium text-white">
            Handhold
          </span>
        </Link>
      </header>

      <main className="max-w-md w-full mx-auto my-12 z-10">
        <div className="rounded-3xl bg-[#10141F] border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center">
          {status === "loading" && (
            <div className="space-y-4 py-6">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
              <h2 className="font-serif text-2xl font-medium text-white">Validando Ativação</h2>
              <p className="text-xs text-neutral-400 font-sans">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4 py-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-medium text-white">Conta Verificada!</h2>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">{message}</p>
              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-all shadow-lg"
                >
                  <span>Acessar Painel Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4 py-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-2xl font-medium text-white">Falha na Ativação</h2>
              <p className="text-xs text-rose-300 font-sans leading-relaxed">{message}</p>
              <div className="pt-4 flex flex-col gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-all shadow-lg"
                >
                  <span>Ir para Login</span>
                </Link>
                <Link
                  href="/register"
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  Criar uma nova conta
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center text-[11px] text-neutral-500 z-10">
        Handhold OS • Autenticação Criptográfica Segura
      </footer>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#080A0F] text-white flex items-center justify-center">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
            <span className="text-sm font-sans text-neutral-400">Carregando verificação...</span>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
