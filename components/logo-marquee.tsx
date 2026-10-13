"use client";

export function LogoMarquee() {
  const logos = [
    { name: "STRIPE", category: "Infraestrutura de Pagamentos" },
    { name: "LINEAR", category: "Gestão de Projetos" },
    { name: "SUPABASE", category: "Motor de Backend" },
    { name: "VERCEL", category: "Nuvem Edge & Servidores" },
    { name: "RETOOL", category: "Ferramentas Internas" },
    { name: "RAMP", category: "Automação Financeira" },
    { name: "RAYCAST", category: "Produtividade de Alta Performance" },
    { name: "SCALE AI", category: "Sistemas de Dados para IA" },
  ];

  return (
    <section className="py-14 border-y border-white/5 bg-[#080A0F] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center mb-8">
        <p className="text-xs uppercase font-mono tracking-widest text-neutral-400">
          Utilizado pelas equipes de receita e engenharia de maior crescimento no mundo
        </p>
      </div>

      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="flex w-max animate-marquee gap-12 sm:gap-20 items-center">
          {/* Lista duplicada para garantir loop contínuo e infinito */}
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-neutral-400 hover:text-white transition-colors duration-300 group cursor-default select-none"
            >
              <span className="font-serif text-lg tracking-wider font-semibold text-neutral-300 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)] transition-all">
                {logo.name}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-neutral-400 group-hover:border-white/20 transition-all">
                {logo.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
