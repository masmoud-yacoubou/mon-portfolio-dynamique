import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(skills);
  } catch (error) {
    console.error("[GET /api/skills]", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des compétences." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

    const body = await request.json();

    if (!body.name || body.level === undefined || !body.category) {
      return NextResponse.json({ error: "Les champs nom, niveau et catégorie sont obligatoires." }, { status: 400 });
    }

    if (body.level < 0 || body.level > 100) {
      return NextResponse.json({ error: "Le niveau doit être compris entre 0 et 100." }, { status: 400 });
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

    // ← Invalide le cache des pages concernées
    revalidatePath("/dashboard/skills");
    revalidatePath("/fr");
    revalidatePath("/en");

    return NextResponse.json(skill, { status: 201 });

  } catch (error) {
    console.error("[POST /api/skills]", error);
    return NextResponse.json({ error: "Erreur lors de la création de la compétence." }, { status: 500 });
  }
}