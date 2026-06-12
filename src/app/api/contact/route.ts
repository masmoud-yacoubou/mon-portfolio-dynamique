// src/app/api/contact/route.ts
// =============================================================================
// API ROUTE - Formulaire de contact
// POST /api/contact → Sauvegarde le message dans Neon + envoie un email via Resend
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, content } = body;

    // ---- Validation ----
    if (!name || !email || !content) {
      return NextResponse.json(
        { error: "Nom, email et message sont requis." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    // ---- Sauvegarde dans Neon ----
    await prisma.message.create({
      data: { name, email, subject: subject ?? null, content },
    });

// ---- Sauvegarde dans Neon ----
await prisma.message.create({
  data: { name, email, subject: subject ?? null, content },
});

// ---- Notification email via Resend secondaire ----
try {
  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: process.env.RESEND_TO_EMAIL!,
    subject: `📩 Nouveau message de ${name} — ${subject ?? "Sans sujet"}`,
    html: `
      ...
    `,
  });
} catch (emailError) {
  console.error("[POST /api/contact] Email notification failed", emailError);
}

return NextResponse.json(
  { message: "Message reçu avec succès." },
  { status: 201 }
);

  } catch (error) {
    console.error("[POST /api/contact]", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message." },
      { status: 500 }
    );
  }
}