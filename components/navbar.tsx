"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Menu, X, ChevronDown, ArrowRight, ShieldCheck, Compass, Terminal, Cpu } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logotipo da Marca */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 p-[1px] shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
            <div className="w-full h-full bg-[#080A0F] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-indigo-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <span className="font-serif text-xl tracking-tight font-medium text-white group-hover:text-indigo-200 transition-colors">
            Handhold
          </span>
          <span className="text-[10px] tracking-wider uppercase font-mono px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 ml-1">
            OS
          </span>
        </Link>

        {/* Menu Flutuante Desktop */}
        <nav
          className={`hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full border transition-all duration-300 ${
            scrolled
              ? "bg-[#10141F]/80 backdrop-blur-xl border-white/10 shadow-2xl shadow-black/50"
              : "bg-white/[0.03] backdrop-blur-md border-white/5"
          }`}
        >
          <Link
            href="/#journey"
            className="px-3.5 py-1.5 text-xs text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors font-medium"
          >
            Produto
          </Link>

          <Link
            href="/#steps"
            className="px-3.5 py-1.5 text-xs text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors font-medium"
          >
            Como Funciona
          </Link>

          {/* Dropdown: Inteligência / Recursos */}
          <div className="relative">
            <button
              onClick={() => setResourcesOpen(!resourcesOpen)}
              onMouseEnter={() => setResourcesOpen(true)}
              className="flex items-center gap-1 px-3.5 py-1.5 text-xs text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors font-medium"
            >
              Inteligência
              <ChevronDown className="w-3 h-3 text-neutral-400" />
            </button>

            {resourcesOpen && (
              <div
                onMouseLeave={() => setResourcesOpen(false)}
                className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-[#10141F]/95 backdrop-blur-2xl border border-white/10 p-3 shadow-2xl shadow-black/80 flex flex-col gap-1 text-left"
              >
                <Link
                  href="/#journey"
                  className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 text-left"
                  onClick={() => setResourcesOpen(false)}
                >
                  <Cpu className="w-4 h-4 text-indigo-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-white">Demos Autônomas</div>
                    <div className="text-[11px] text-neutral-400">Guias interativos de produto em escala</div>
                  </div>
                </Link>
                <Link
                  href="/#steps"
                  className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 text-left"
                  onClick={() => setResourcesOpen(false)}
                >
                  <Compass className="w-4 h-4 text-indigo-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-white">Motor TRCP Prospector</div>
                    <div className="text-[11px] text-neutral-400">Prospecção B2B local sem custo de API</div>
                  </div>
                </Link>
                <Link
                  href="/careers"
                  className="p-2.5 rounded-xl hover:bg-white/5 transition-colors flex items-start gap-3 text-left"
                  onClick={() => setResourcesOpen(false)}
                >
                  <Terminal className="w-4 h-4 text-indigo-400 mt-0.5" />
                  <div>
                    <div className="text-xs font-medium text-white">Manifesto de Engenharia</div>
                    <div className="text-[11px] text-neutral-400">Conheça nossos princípios técnicos</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/careers"
            className="px-3.5 py-1.5 text-xs text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors font-medium"
          >
            Carreiras
          </Link>

          <Link
            href="/privacy-policy"
            className="px-3.5 py-1.5 text-xs text-neutral-300 hover:text-white rounded-full hover:bg-white/5 transition-colors font-medium"
          >
            Segurança & Privacidade
          </Link>
        </nav>

        {/* Botões de Ação à Direita */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-xs font-medium text-neutral-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all"
          >
            Entrar
          </Link>

          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#080A0F] text-xs font-medium shadow-lg shadow-white/10 hover:shadow-indigo-500/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Testar grátis</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#080A0F] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Botão Mobile */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
          aria-label="Alternar Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Gaveta Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-[#10141F] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col gap-4 z-50">
          <Link
            href="/#journey"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-neutral-200 py-2 border-b border-white/5"
          >
            Tour pelo Produto
          </Link>
          <Link
            href="/#steps"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-neutral-200 py-2 border-b border-white/5"
          >
            Como Funciona
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-neutral-200 py-2 border-b border-white/5"
          >
            Carreiras
          </Link>
          <Link
            href="/privacy-policy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-medium text-neutral-200 py-2 border-b border-white/5"
          >
            Segurança & Privacidade
          </Link>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium rounded-full border border-white/10 text-white hover:bg-white/5"
            >
              Entrar
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-medium rounded-full bg-white text-[#080A0F] font-semibold"
            >
              Testar grátis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
