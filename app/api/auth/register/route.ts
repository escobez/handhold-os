import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { getDatabase, saveDatabase, User, AIAgent } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { createVerificationToken, sendVerificationEmail } from "@/lib/email";

const registerSchema = z.object({
  fullName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  company: z.string().optional(),
  buyerSegment: z.string().optional(),
  agentPersona: z.string().optional(),
  enableTrcp: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const { fullName, email, password, company, agentPersona } = result.data;
    const db = getDatabase();

    const existingUser = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return NextResponse.json(
        { error: "Já existe uma conta associada a este e-mail" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const userId = `usr_${crypto.randomUUID().slice(0, 10)}`;

    const newUser: User = {
      id: userId,
      name: fullName,
      email: email.toLowerCase(),
      passwordHash,
      emailVerified: false,
      role: "owner",
      createdAt: new Date().toISOString(),
    };

    db.users.push(newUser);

    // Cria agente inicial configurado durante o onboarding
    const personaType = (agentPersona?.toLowerCase().includes("técnico")
      ? "technical"
      : agentPersona?.toLowerCase().includes("executivo")
      ? "executive"
      : "concierge") as "executive" | "technical" | "concierge";

    const newAgent: AIAgent = {
      id: `agt_${crypto.randomUUID().slice(0, 8)}`,
      userId,
      name: `${company || fullName} Guia IA`,
      persona: personaType,
      systemPrompt: `Você é o guia autônomo de ${company || "Handhold"}. Seu objetivo é qualificar leads e apresentar o produto com sofisticação e precisão.`,
      productContext: `Empresa: ${company || "Tecnologia"}. Solução focada em inteligência comercial e demos 24/7.`,
      welcomeMessage: `Olá! Sou o agente de ${company || "Handhold"}. Como posso auxiliar sua equipe hoje?`,
      voiceSpeed: 1.0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    db.aiAgents.push(newAgent);
    saveDatabase(db);

    // Gera token de verificação e dispara e-mail
    const token = createVerificationToken(userId);
    const host = req.headers.get("host") || "localhost:3005";
    const emailResult = await sendVerificationEmail(email, fullName, token, host);

    return NextResponse.json({
      success: true,
      message: "Conta criada com sucesso! Verifique seu e-mail para ativar o acesso.",
      verifyUrl: emailResult.verifyUrl,
      userId,
      token,
    });
  } catch (error: any) {
    console.error("Erro no cadastro:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao processar o cadastro." },
      { status: 500 }
    );
  }
}
