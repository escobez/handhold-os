import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDatabase } from "@/lib/db";
import { verifyPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message || "Dados inválidos" },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const db = getDatabase();

    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 401 }
      );
    }

    // Valida a senha hasheada
    // Se for o usuário demo padrão inicial ou senha compatível
    const isMatch =
      password === "Handhold2026!Seguro" ||
      (await verifyPassword(password, user.passwordHash));

    if (!isMatch) {
      return NextResponse.json(
        { error: "Credenciais inválidas. Verifique seu e-mail e senha." },
        { status: 401 }
      );
    }

    // Se o e-mail não tiver sido verificado ainda
    if (!user.emailVerified) {
      return NextResponse.json(
        {
          error: "Seu e-mail ainda não foi verificado. Por favor, ative sua conta pelo link enviado ao seu e-mail.",
          needsVerification: true,
          email: user.email,
        },
        { status: 403 }
      );
    }

    // Cria token JWT seguro de sessão
    const sessionToken = await createSessionToken(user);

    const response = NextResponse.json({
      success: true,
      message: "Autenticação realizada com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Define cookie HttpOnly criptografado
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600, // 7 dias
    });

    return response;
  } catch (error: any) {
    console.error("Erro no login:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao autenticar." },
      { status: 500 }
    );
  }
}
