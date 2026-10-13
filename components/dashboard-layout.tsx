"use client";

import { useState, useEffect } from "react";
import Link from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  Users,
  Bot,
  Compass,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Bell,
  BadgeDollarSign,
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Alexandre Silva");
  const [userEmail, setUserEmail] = useState("fundador@empresa.com.br");

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserName(data.user.name);
            setUserEmail(data.user.email);
          }
        }
      } catch (e) {}
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {}
    router.push("/login");
  };

  const navItems = [
    {
      label: "Visão Geral",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Base de Leads (CRM)",
      href: "/dashboard/leads",
      icon: Users,
    },
    {
      label: "Vendas & Caixa",
      href: "/dashboard/sales",
      icon: BadgeDollarSign,
    },
    {
      label: "Estúdio de Agentes IA",
      href: "/dashboard/agents",
      icon: Bot,
    },
    {
      label: "Motor TRCP Prospector",
      href: "/dashboard/prospect",
      icon: Compass,
    },
    {
      label: "Configurações",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#080A0F] text-[#F3F4F6] flex flex-col md:flex-row">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r border-white/10 bg-[#0A0D14]/90 p-5 shrink-0 min-h-screen sticky top-0 h-screen">
        <div className="space-y-6">
          {/* Brand Logo */}
          <a href="/" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-400 p-[1px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#080A0F] rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-indigo-400" />
              </div>
            </div>
            <span className="font-serif text-lg tracking-tight font-medium text-white">
              Handhold
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 ml-1">
              PRO
            </span>
          </a>

          {/* Navigation Links */}
          <nav className="space-y-1.5 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-neutral-400"}`} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout Bottom */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
              {userName.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-medium text-white truncate">{userName}</div>
              <div className="text-[10px] text-neutral-500 truncate font-mono">{userEmail}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-neutral-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/10 bg-[#0A0D14]/60 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 hidden sm:flex">
              <span>Handhold OS</span>
              <ChevronRight className="w-3 h-3 text-neutral-600" />
              <span className="text-white capitalize">
                {pathname.replace("/dashboard", "").replace("/", "") || "Visão Geral"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
            >
              <span>Ver Site Público</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Sistemas Operacionais" />
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-4 top-20 bg-[#10141F] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl flex flex-col gap-2 z-50 animate-in fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "text-neutral-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </a>
              );
            })}
            <div className="pt-4 border-t border-white/10 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-rose-300 rounded-xl hover:bg-rose-500/10"
              >
                <LogOut className="w-4 h-4" />
                <span>Encerrar Sessão</span>
              </button>
            </div>
          </div>
        )}

        {/* Body Container */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
