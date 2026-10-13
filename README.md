# Handhold OS — Plataforma SaaS de Guias Autônomos de IA & Prospecção B2B

Uma plataforma web moderna, elegante e de alto padrão estético inspirada no [handhold.io](https://handhold.io), integrando demonstrações interativas de produtos por IA e o motor de prospecção local **TRCP (Trinity Client Prospector)**.

---

## 🌟 Destaques e Funcionalidades

- **Design Editorial B2B de Luxo:**
  - Tipografia de alto impacto combinando *Playfair Display* (serif) e *Inter* (sans-serif).
  - Modo escuro profundo (`#080A0F`), cartões em superfície vítrea (`#10141F`) e iluminação radial sutil.
  - Botões arredondados em formato de pílula (*rounded-full*) com micro-interações táteis.
- **Orbe 3D Interativo Generativo:**
  - Renderizado via HTML5 Canvas 2D nativo (sem dependências de bibliotecas 3D pesadas), com nuvem de partículas distribuídas em espiral de Fibonacci reativa ao movimento do cursor do mouse.
- **Modal de Demonstração em Tempo Real:**
  - Simulação de agente de voz sintética com visualizador de onda sonora, métricas de telemetria e etapas guiadas de conversão.
- **Carrossel Infinito com Máscara Gradiente:**
  - Logos monocromáticos com desfoque de transição suave nas bordas.
- **Showcase Interativo da Jornada do Cliente:**
  - 3 momentos fundamentais: Chat de Qualificação Técnica, Demos 1:1 e Onboarding Guiado.
- **Integração com o Motor TRCP:**
  - Descoberta gratuita de leads em bases abertas do OpenStreetMap via 3 espelhos Overpass com tolerância a falhas.
  - Sanitização de exportação contra injeção de fórmulas de planilhas.
- **Rotas Completas:**
  - `/` — Landing Page principal.
  - `/login` — Autenticação minimalista com botão para auto-preenchimento de dados de teste.
  - `/register` — Fluxo de onboarding "Testar grátis" guiado em 3 etapas.
  - `/careers` — Manifesto de engenharia, princípios e vagas abertas.
  - `/privacy-policy` — Carta editorial de privacidade, LGPD e conformidade com a licença ODbL do OSM.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js 18+ (recomendado 20+)
- npm ou yarn

### Instalação e Execução
```bash
# Instalar dependências
npm install

# Modo de desenvolvimento
npm run dev

# Compilar para produção
npm run build

# Iniciar servidor de produção
npm run start -- -p 3000
```

Abra no navegador em [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS & PostCSS
- **Animações:** Framer Motion & CSS Keyframes
- **Ícones:** Lucide React
- **Fontes:** Google Fonts (*Playfair Display* e *Inter*)

---

## 📄 Licença

Distribuído sob a licença MIT. Dados cartográficos fornecidos por © Colaboradores do OpenStreetMap sob a licença Open Database License (ODbL).
