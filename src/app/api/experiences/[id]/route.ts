// src/app/api/experiences/[id]/route.ts
// =============================================================================
// API ROUTES - Expérience (Individuelle)
// GET    /api/experiences/:id    → Récupère une expérience
// PUT    /api/experiences/:id    → Met à jour une expérience
// DELETE /api/experiences/:id    → Supprime une expérience
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// ---------------------------------------------------------------------------
// GET — Récupère une expérience par son id (public)
// ---------------------------------------------------------------------------
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const experience = await prisma.experience.findUnique({ where: { id } });

    if (!experience) {
      return NextResponse.json(
        { error: "Expérience introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);

  } catch (error) {
    console.error("[GET /api/experiences/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de l'expérience." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PUT — Met à jour une expérience (admin uniquement)
// ---------------------------------------------------------------------------
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Expérience introuvable." },
        { status: 404 }
      );
    }

    const updated = await prisma.experience.update({
      where: { id },
      data: {
        role:           body.role           ?? existing.role,
        role_en:        body.role_en        ?? existing.role_en,
        description:    body.description    ?? existing.description,
        description_en: body.description_en ?? existing.description_en,
        company:        body.company        ?? existing.company,
        startDate:      body.startDate ? new Date(body.startDate) : existing.startDate,
        endDate:        body.endDate  ? new Date(body.endDate)  : existing.endDate,
        order:          body.order          ?? existing.order,
      },
    });

    return NextResponse.json(updated);

  } catch (error) {
    console.error("[PUT /api/experiences/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de l'expérience." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE — Supprime une expérience (admin uniquement)
// ---------------------------------------------------------------------------
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.experience.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Expérience introuvable." },
        { status: 404 }
      );
    }

    await prisma.experience.delete({ where: { id } });

    return NextResponse.json(
      { message: "Expérience supprimée avec succès." },
      { status: 200 }
    );

  } catch (error) {
    console.error("[DELETE /api/experiences/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de l'expérience." },
      { status: 500 }
    );
  }
}
