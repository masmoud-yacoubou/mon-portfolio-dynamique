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

    // ---- Notification email via Resend ----
    await resend.emails.send({
      from:    "Portfolio <onboarding@resend.dev>",
      to:      process.env.RESEND_TO_EMAIL!,
      subject: `📩 Nouveau message de ${name} — ${subject ?? "Sans sujet"}`,
      html: `
        <div style="font-family: monospace; max-width: 600px; margin: 0 auto; padding: 32px; background: #050505; color: #ffffff; border: 1px solid #222;">

          <div style="margin-bottom: 32px;">
            <div style="font-size: 20px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em;">
              M<span style="color: #2563eb;">.</span>Y — Nouveau Message
            </div>
          </div>

          <div style="border-left: 2px solid #2563eb; padding-left: 16px; margin-bottom: 24px;">
            <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: #2563eb; margin-bottom: 8px;">
              Expéditeur
            </div>
            <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">${name}</div>
            <div style="font-size: 12px; color: #888;">${email}</div>
          </div>

          ${subject ? `
          <div style="border-left: 2px solid #333; padding-left: 16px; margin-bottom: 24px;">
            <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: #666; margin-bottom: 8px;">
              Sujet
            </div>
            <div style="font-size: 13px; font-weight: 700;">${subject}</div>
          </div>
          ` : ""}

          <div style="border-left: 2px solid #333; padding-left: 16px; margin-bottom: 32px;">
            <div style="font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: #666; margin-bottom: 8px;">
              Message
            </div>
            <div style="font-size: 13px; line-height: 1.8; color: #ccc; white-space: pre-wrap;">${content}</div>
          </div>

          <a href="mailto:${email}?subject=Re: ${subject ?? "Votre message"}"
            style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; text-decoration: none;">
            Répondre →
          </a>

          <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #222; font-size: 9px; color: #444; text-transform: uppercase; letter-spacing: 0.2em;">
            Reçu depuis ton portfolio — ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </div>

        </div>
      `,
    });

    return NextResponse.json(
      { message: "Message envoyé avec succès." },
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