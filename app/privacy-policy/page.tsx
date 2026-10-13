import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Shield, Lock, FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#080A0F] text-[#F3F4F6] selection:bg-indigo-600 selection:text-white">
      <Navbar />

      <section className="pt-36 pb-16 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider mb-6">
          Carta de Confiança, Segurança e Privacidade
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight">
          Política de Privacidade & <span className="italic font-light text-gradient-purple">Atribuição de Dados Abertos</span>
        </h1>

        <div className="mt-4 flex items-center gap-4 text-xs font-mono text-neutral-400 pb-8 border-b border-white/10">
          <span>Data de Vigência: Outubro de 2026</span>
          <span>•</span>
          <span>Versão: 2.4 Enterprise</span>
          <span>•</span>
          <span className="text-emerald-400">Certificação SOC2 Tipo II</span>
        </div>

        {/* Corpo Editorial */}
        <article className="mt-12 space-y-12 text-sm text-neutral-300 font-sans leading-relaxed">
          {/* Seção 1 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-white">
              1. Conformidade com a Licença Open Database License (ODbL) do OpenStreetMap
            </h2>
            <p>
              O Handhold e seu motor embutido TRCP Prospector acessam dados públicos cartográficos e de estabelecimentos fornecidos pela OpenStreetMap Foundation sob os termos da licença Open Database License (ODbL).
            </p>
            <div className="p-4 rounded-2xl bg-[#10141F] border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-indigo-400 font-medium text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Compromisso de Atribuição</span>
              </div>
              <p className="text-xs text-neutral-400 leading-normal">
                Qualquer conjunto de dados derivado gerado via nossos conectores Overpass credita expressamente os colaboradores do © OpenStreetMap. O Handhold respeita integralmente as políticas de uso aceitável dos servidores Nominatim e Overpass, implementando jitter aleatório, limites de taxa locais e rotação de espelhos para preservar os recursos da comunidade.
              </p>
            </div>
          </section>

          {/* Seção 2 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-white">
              2. Isolamento de Dados & Garantia de Não-Treinamento de Modelos
            </h2>
            <p>
              Nós não treinamos nem ajustamos modelos fundacionais públicos utilizando suas documentações proprietárias, fluxos de sandbox, listas de clientes ou históricos de conversas.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-neutral-400">
              <li>Cada espaço de trabalho opera em contêineres lógicos isolados com chaves de criptografia exclusivas (AES-256 em repouso).</li>
              <li>Buffers de interação temporários gerados em demonstrações ao vivo são descartados em até 60 minutos após o término da sessão.</li>
              <li>As notas de completude de contato são calculadas via heurísticas determinísticas locais e nunca compartilhadas entre clientes.</li>
            </ul>
          </section>

          {/* Seção 3 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-white">
              3. Proteção Contra Injeção de Fórmulas em CSV (CSV Formula Injection)
            </h2>
            <p>
              Ao exportar cadastros para softwares de planilha, agentes mal-intencionados podem tentar inserir fórmulas perigosas nos campos de contato. O Handhold aplica higienização estrita de caracteres:
            </p>
            <div className="p-4 rounded-xl bg-black/50 border border-white/5 font-mono text-xs text-neutral-300">
              <code>Todos os valores que se iniciam com '=', '+', '-' ou '@' recebem o prefixo de apóstrofo (').</code>
            </div>
            <p className="text-xs text-neutral-400">
              Isso impede a execução não autorizada de macros, scripts e comandos no Microsoft Excel, Apple Numbers e LibreOffice Calc.
            </p>
          </section>

          {/* Seção 4 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-white">
              4. Cookies, Sessões e Telemetria
            </h2>
            <p>
              Não utilizamos cookies de terceiros para rastreamento comportamental de anúncios ou fingerprinting entre sites. Tokens de sessão são protegidos com flags <code className="text-indigo-400">HttpOnly</code> e <code className="text-indigo-400">SameSite=Strict</code> para bloquear ataques XSS e CSRF.
            </p>
          </section>

          {/* Seção 5 */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-medium text-white">
              5. Direitos do Titular de Dados (LGPD e GDPR)
            </h2>
            <p>
              Titulares de dados amparados pela Lei Geral de Proteção de Dados (LGPD) e regulamentos internacionais retêm o direito de solicitar cópia integral ou exclusão definitiva de seus registros a qualquer momento.
            </p>
            <p className="text-neutral-400">
              Para solicitações formais, entre em contato diretamente com nosso Encarregado de Proteção de Dados pelo canal{" "}
              <a href="mailto:privacidade@handhold.io" className="text-white underline hover:text-indigo-300">
                privacidade@handhold.io
              </a>
              .
            </p>
          </section>
        </article>
      </section>

      <Footer />
    </main>
  );
}
