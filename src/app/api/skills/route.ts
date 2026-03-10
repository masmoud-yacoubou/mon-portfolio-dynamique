// src/app/api/skills/route.ts
// =============================================================================
// API ROUTES - Compétences (Collection)
// GET    /api/skills        → Liste toutes les compétences
// POST   /api/skills        → Crée une nouvelle compétence
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// ---------------------------------------------------------------------------
// GET — Liste toutes les compétences (public)
// ---------------------------------------------------------------------------
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });

    return NextResponse.json(skills);

  } catch (error) {
    console.error("[GET /api/skills]", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des compétences." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST — Crée une nouvelle compétence (admin uniquement)
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const body = await request.json();

    // Validation des champs obligatoires
    if (!body.name || body.level === undefined || !body.category) {
      return NextResponse.json(
        { error: "Les champs nom, niveau et catégorie sont obligatoires." },
        { status: 400 }
      );
    }

    // Validation du niveau (0-100)
    if (body.level < 0 || body.level > 100) {
      return NextResponse.json(
        { error: "Le niveau doit être compris entre 0 et 100." },
        { status: 400 }
      );
    }

    const skill = await prisma.skill.create({
      data: {
        name:     body.name,
        level:    body.level,
        category: body.category,
        iconUrl:  body.iconUrl ?? null,
        order:    body.order   ?? 0,
      },
    });

    return NextResponse.json(skill, { status: 201 });

  } catch (error) {
    console.error("[POST /api/skills]", error);
    return NextResponse.json(
      { error: "Erreur lors de la création de la compétence." },
      { status: 500 }
    );
  }
}