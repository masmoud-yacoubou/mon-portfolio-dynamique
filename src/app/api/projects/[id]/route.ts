// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error("[GET /api/projects/:id]", error);
    return NextResponse.json({ error: "Erreur lors de la récupération du projet." }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });

    const updated = await prisma.project.update({
      where: { id },
      data: {
        title:          body.title          ?? existing.title,
        title_en:       body.title_en       ?? existing.title_en,
        description:    body.description    ?? existing.description,
        description_en: body.description_en ?? existing.description_en,
        imageUrl:       body.imageUrl       ?? existing.imageUrl,
        link:           body.link           ?? existing.link,
        githubUrl:      body.githubUrl      ?? existing.githubUrl,
        slug:           body.slug           ?? existing.slug,
        technologies:   body.technologies   ?? existing.technologies,
        featured:       body.featured       ?? existing.featured,
        order:          body.order          ?? existing.order,
      },
    });

    revalidatePath("/dashboard/projects");
    revalidatePath(`/dashboard/projects/${id}/edit`);
    revalidatePath("/fr");
    revalidatePath("/en");
    revalidatePath(`/fr/project/${updated.slug}`);
    revalidatePath(`/en/project/${updated.slug}`);

    return NextResponse.json(updated);
  } catch (error) {
    console.error("[PUT /api/projects/:id]", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour du projet." }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ error: "Non autorisé." }, { status: 401 });

    const { id } = await params;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });

    await prisma.project.delete({ where: { id } });

    revalidatePath("/dashboard/projects");
    revalidatePath("/fr");
    revalidatePath("/en");

    return NextResponse.json({ message: "Projet supprimé avec succès." }, { status: 200 });
  } catch (error) {
    console.error("[DELETE /api/projects/:id]", error);
    return NextResponse.json({ error: "Erreur lors de la suppression du projet." }, { status: 500 });
  }
}