// src/app/api/upload/route.ts
// =============================================================================
// API ROUTE - Upload d'image
// POST /api/upload → Upload une image vers Cloudinary
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadImage, uploadVideo } from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    // Vérification de l'authentification
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const body = await request.json();

    // Validation
    if (!body.file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni." },
        { status: 400 }
      );
    }

    // Validation du type de fichier (base64)
    const isValidImage = body.file.startsWith("data:image/");
    const isVideo = body.file.startsWith("data:video/");
    if (!isValidImage && !isVideo) {
      return NextResponse.json(
        { error: "Format invalide. Image ou vidéo uniquement." },
        { status: 400 }
      );
    }

    // Détermination du dossier selon le contexte
    const folder = body.folder ?? "portfolio";

    // Upload selon le type
    const url = isVideo
      ? await uploadVideo(body.file, `portfolio/${folder}`)
      : await uploadImage(body.file, `portfolio/${folder}`);

    return NextResponse.json({ url, type: isVideo ? "video" : "image" }, { status: 201 });

  } catch (error) {
    console.error("[POST /api/upload]", error);
    return NextResponse.json(
      { error: "Erreur lors de l'upload." },
      { status: 500 }
    );
  }
}

