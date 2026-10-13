"use client";

import Link from "next/link";
import { Sparkles, Shield, Heart, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#06080C] pt-20 pb-12 px-4 sm:px-6 md:px-8 text-neutral-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
        {/* Coluna da Marca */}
        <div className="md:col-span-2 space-y-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 p-[1px]">
              <div className="w-full h-full bg-[#080A0F] rounded-full flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              </div>
            </div>
            <span className="font-serif text-lg tracking-tight font-medium text-white">
              Handhold
            </span>
          </Link>

          <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
            Guias autônomos de produto e motor de inteligência para equipes de vendas B2B modernas. Operando 24 horas por dia em cada etapa da jornada do comprador.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono text-neutral-300">
              Todos os Sistemas Operacionais • 99,99% Uptime
            </span>
          </div>
        </div>

        {/* Coluna 1: Produto */}
        <div>
          <h5 className="font-mono text-xs uppercase tracking-wider text-white mb-4">
            Produto
          </h5>
          <ul className="space-y-2.5">
            <li>
              <Link href="/#journey" className="hover:text-white transition-colors">
                Demonstrações Interativas
              </Link>
            </li>
            <li>
              <Link href="/#steps" className="hover:text-white transition-colors">
                Motor de Leads TRCP
              </Link>
            </li>
            <li>
              <Link href="/#journey" className="hover:text-white transition-colors">
                Onboarding Autônomo
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-white transition-colors">
                Planos & Preços
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 2: Empresa */}
        <div>
          <h5 className="font-mono text-xs uppercase tracking-wider text-white mb-4">
            Empresa
          </h5>
          <ul className="space-y-2.5">
            <li>
              <Link href="/careers" className="hover:text-white transition-colors">
                Carreiras & Manifesto
              </Link>
            </li>
            <li>
              <Link href="/careers#culture" className="hover:text-white transition-colors">
                Valores de Engenharia
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white transition-colors">
                Confiança & Segurança
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy#terms" className="hover:text-white transition-colors">
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>

        {/* Coluna 3: Conformidade & Certificações */}
        <div>
          <h5 className="font-mono text-xs uppercase tracking-wider text-white mb-4">
            Conformidade
          </h5>
          <div className="space-y-3">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-[11px] font-medium text-white flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Certificado SOC2 Tipo II</span>
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Auditorias contínuas automáticas</div>
            </div>

            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="text-[11px] font-medium text-white flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Conforme LGPD & GDPR</span>
              </div>
              <div className="text-[10px] text-neutral-500 mt-0.5">Isolamento total de inquilinos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
        <div>
          © {new Date().getFullYear()} Handhold Technologies Inc. Todos os direitos reservados.
        </div>
        <div className="flex items-center gap-6">
          <Link href="/privacy-policy" className="hover:text-neutral-300 transition-colors">
            Política de Privacidade
          </Link>
          <Link href="/privacy-policy" className="hover:text-neutral-300 transition-colors">
            Termos de Serviço
          </Link>
          <Link href="/privacy-policy" className="hover:text-neutral-300 transition-colors">
            Licença ODbL (OpenStreetMap)
          </Link>
        </div>
      </div>
    </footer>
  );
}
