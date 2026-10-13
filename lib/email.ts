import crypto from "crypto";
import { getDatabase, saveDatabase } from "./db";

export function createVerificationToken(userId: string): string {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 24 * 3600 * 1000).toISOString(); // 24 horas

  const db = getDatabase();
  // Remove tokens anteriores deste usuário para verificação de e-mail
  db.verificationTokens = db.verificationTokens.filter(
    (t) => !(t.userId === userId && t.type === "email_verify")
  );

  db.verificationTokens.push({
    id: `tok_${crypto.randomUUID().slice(0, 8)}`,
    userId,
    token,
    type: "email_verify",
    expiresAt,
    createdAt: new Date().toISOString(),
  });

  saveDatabase(db);
  return token;
}

export async function sendVerificationEmail(
  toEmail: string,
  userName: string,
  token: string,
  host: string
): Promise<{ success: boolean; verifyUrl: string }> {
  const protocol = host.includes("localhost") ? "http" : "https";
  const verifyUrl = `${protocol}://${host}/verify-email?token=${token}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>Confirme seu e-mail corporativo - Handhold OS</title>
      <style>
        body { background-color: #080A0F; color: #F3F4F6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 20px; }
        .card { max-width: 520px; margin: 0 auto; background: #10141F; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 36px; text-align: center; }
        .logo { font-size: 22px; font-weight: 600; color: #FFFFFF; margin-bottom: 24px; }
        .title { font-size: 20px; font-weight: 500; color: #FFFFFF; margin-bottom: 12px; }
        .text { font-size: 14px; color: #9CA3AF; line-height: 1.6; margin-bottom: 28px; }
        .btn { display: inline-block; background: #FFFFFF; color: #080A0F; padding: 12px 32px; border-radius: 9999px; font-size: 13px; font-weight: 600; text-decoration: none; box-shadow: 0 4px 20px rgba(255,255,255,0.15); }
        .footer { font-size: 11px; color: #6B7280; margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="logo">✨ Handhold OS</div>
        <div class="title">Confirme seu endereço de e-mail</div>
        <div class="text">
          Olá, <strong>${userName}</strong>!<br>
          Seu espaço de trabalho e seu agente autônomo estão quase prontos. Clique no botão abaixo para ativar sua conta e acessar o painel.
        </div>
        <a href="${verifyUrl}" class="btn">Confirmar E-mail & Ativar Acesso</a>
        <div class="footer">
          Se você não solicitou este cadastro, pode ignorar este e-mail com segurança.<br>
          Link válido por 24 horas.
        </div>
      </div>
    </body>
    </html>
  `;

  // Se houver RESEND_API_KEY configurada, dispara via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Handhold OS <noreply@handhold.io>",
          to: [toEmail],
          subject: "Ative sua conta no Handhold OS",
          html: htmlContent,
        }),
      });
    } catch (err) {
      console.warn("Erro ao disparar via Resend, usando fallback local:", err);
    }
  }

  console.log(`[E-MAIL VERIFICATION] Para: ${toEmail} | Link de ativação: ${verifyUrl}`);

  return { success: true, verifyUrl };
}
