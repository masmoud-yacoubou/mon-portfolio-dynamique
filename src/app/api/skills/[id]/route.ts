// src/app/api/skills/[id]/route.ts
// =============================================================================
// API ROUTES - Compétence (Individuelle)
// GET    /api/skills/:id    → Récupère une compétence
// PUT    /api/skills/:id    → Met à jour une compétence
// DELETE /api/skills/:id    → Supprime une compétence
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// ---------------------------------------------------------------------------
// GET — Récupère une compétence par son id (public)
// ---------------------------------------------------------------------------
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const skill = await prisma.skill.findUnique({ where: { id } });

    if (!skill) {
      return NextResponse.json(
        { error: "Compétence introuvable." },
        { status: 404 }
      );
    }

    return NextResponse.json(skill);

  } catch (error) {
    console.error("[GET /api/skills/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération de la compétence." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// PUT — Met à jour une compétence (admin uniquement)
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

    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Compétence introuvable." },
        { status: 404 }
      );
    }

    const updated = await prisma.skill.update({
      where: { id },
      data: {
        name:     body.name     ?? existing.name,
        level:    body.level    ?? existing.level,
        category: body.category ?? existing.category,
        iconUrl:  body.iconUrl  ?? existing.iconUrl,
        order:    body.order    ?? existing.order,
      },
    });

    return NextResponse.json(updated);

  } catch (error) {
    console.error("[PUT /api/skills/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour de la compétence." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE — Supprime une compétence (admin uniquement)
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

    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "Compétence introuvable." },
        { status: 404 }
      );
    }

    await prisma.skill.delete({ where: { id } });

    return NextResponse.json(
      { message: "Compétence supprimée avec succès." },
      { status: 200 }
    );

  } catch (error) {
    console.error("[DELETE /api/skills/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression de la compétence." },
      { status: 500 }
    );
  }
}