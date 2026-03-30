import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(experiences);
  } catch (error) {
    console.error("[GET /api/experiences]", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des expériences." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

    const body = await request.json();

    if (!body.role || !body.description || !body.startDate || !body.company) {
      return NextResponse.json({ error: "Les champs rôle, description, entreprise et date de début sont obligatoires." }, { status: 400 });
    }

    const experience = await prisma.experience.create({
      data: {
        role:           body.role,
        role_en:        body.role_en        ?? null,
        description:    body.description,
        description_en: body.description_en ?? null,
        company:        body.company,
        startDate:      new Date(body.startDate),
        endDate:        body.endDate ? new Date(body.endDate) : null,
        order:          body.order          ?? 0,
      },
    });

    // ← Invalide le cache des pages concernées
    revalidatePath("/dashboard/experiences");
    revalidatePath("/fr");
    revalidatePath("/en");

    return NextResponse.json(experience, { status: 201 });

  } catch (error) {
    console.error("[POST /api/experiences]", error);
    return NextResponse.json({ error: "Erreur lors de la création de l'expérience." }, { status: 500 });
  }
}