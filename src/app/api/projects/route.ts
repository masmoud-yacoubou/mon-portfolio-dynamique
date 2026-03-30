import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("[GET /api/projects]", error);
    return NextResponse.json({ error: "Erreur lors de la récupération des projets." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

    const body = await request.json();

    if (!body.title || !body.description || !body.slug) {
      return NextResponse.json({ error: "Les champs titre, description et slug sont obligatoires." }, { status: 400 });
    }

    const existing = await prisma.project.findUnique({ where: { slug: body.slug } });
    if (existing) {
      return NextResponse.json({ error: "Un projet avec ce slug existe déjà." }, { status: 409 });
    }

    const project = await prisma.project.create({
      data: {
        title:          body.title,
        title_en:       body.title_en       ?? null,
        description:    body.description,
        description_en: body.description_en ?? null,
        imageUrl:       body.imageUrl       ?? null,
        link:           body.link           ?? null,
        githubUrl:      body.githubUrl      ?? null,
        slug:           body.slug,
        technologies:   body.technologies   ?? [],
        featured:       body.featured       ?? false,
        order:          body.order          ?? 0,
      },
    });

    // ← Invalide le cache des pages concernées
    revalidatePath("/dashboard/projects");
    revalidatePath("/fr");
    revalidatePath("/en");

    return NextResponse.json(project, { status: 201 });

  } catch (error) {
    console.error("[POST /api/projects]", error);
    return NextResponse.json({ error: "Erreur dans la création du projet" }, { status: 500 });
  }
}