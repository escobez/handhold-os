"use client";

import { TrendingUp, Users, ShieldCheck, Zap } from "lucide-react";

export function StatsBanner() {
  const stats = [
    {
      value: "R$ 750M+",
      label: "Em Pipeline Comercial Influenciado",
      subtext: "Validado em mais de 450 empresas de tecnologia",
      icon: TrendingUp,
    },
    {
      value: "2.8M+",
      label: "Demonstrações Autônomas Realizadas",
      subtext: "Zero quedas de infraestrutura registradas",
      icon: Users,
    },
    {
      value: "99.4%",
      label: "Precisão Semântica das Respostas",
      subtext: "Auditado contra bases oficiais de produto",
      icon: ShieldCheck,
    },
    {
      value: "140ms",
      label: "Latência Média de Interação",
      subtext: "Inferência global em 32 zonas regionais",
      icon: Zap,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-gradient-to-b from-[#10141F] to-[#0A0D14] border border-white/10 p-8 sm:p-12 shadow-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {stats.map((s, index) => {
            const Icon = s.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
                  {s.value}
                </div>
                <div className="text-xs font-medium text-neutral-300 mb-1">{s.label}</div>
                <div className="text-[11px] text-neutral-400">{s.subtext}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
