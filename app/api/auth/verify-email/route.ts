import { NextRequest, NextResponse } from "next/server";
import { getDatabase, saveDatabase } from "@/lib/db";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token de verificação não informado." },
        { status: 400 }
      );
    }

    const db = getDatabase();
    const tokenRecord = db.verificationTokens.find(
      (t) => t.token === token && t.type === "email_verify"
    );

    if (!tokenRecord) {
      return NextResponse.json(
        { error: "Token de verificação inválido ou expirado." },
        { status: 400 }
      );
    }

    // Checa expiração
    if (new Date(tokenRecord.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: "Este token de verificação expirou. Solicite um novo link." },
        { status: 400 }
      );
    }

    const user = db.users.find((u) => u.id === tokenRecord.userId);
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    // Ativa o usuário
    user.emailVerified = true;

    // Remove token já utilizado
    db.verificationTokens = db.verificationTokens.filter(
      (t) => t.id !== tokenRecord.id
    );

    saveDatabase(db);

    // Cria sessão automática para redirecionamento direto
    const sessionToken = await createSessionToken(user);

    const redirectUrl = new URL("/dashboard", req.url);
    const response = NextResponse.redirect(redirectUrl);

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600,
    });

    return response;
  } catch (error: any) {
    console.error("Erro ao validar token de e-mail:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao verificar e-mail." },
      { status: 500 }
    );
  }
}
