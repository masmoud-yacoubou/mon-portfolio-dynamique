// src/app/api/messages/[id]/route.ts
// =============================================================================
// API ROUTES - Message (Individuel)
// PATCH  /api/messages/:id    → Marque un message comme lu
// DELETE /api/messages/:id    → Supprime un message
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// ---------------------------------------------------------------------------
// PATCH — Marque un message comme lu (admin uniquement)
// ---------------------------------------------------------------------------
export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
    }

    // Bascule entre lu et non lu
    const updated = await prisma.message.update({
      where: { id },
      data:  { read: !existing.read },
    });

    return NextResponse.json(updated);

  } catch (error) {
    console.error("[PATCH /api/messages/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// DELETE — Supprime un message (admin uniquement)
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

    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Message introuvable." }, { status: 404 });
    }

    await prisma.message.delete({ where: { id } });

    return NextResponse.json(
      { message: "Message supprimé avec succès." },
      { status: 200 }
    );

  } catch (error) {
    console.error("[DELETE /api/messages/:id]", error);
    return NextResponse.json(
      { error: "Erreur lors de la suppression." },
      { status: 500 }
    );
  }
}