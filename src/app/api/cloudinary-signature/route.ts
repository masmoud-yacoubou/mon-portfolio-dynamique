// src/app/api/cloudinary-signature/route.ts
// Génère une signature pour upload direct vers Cloudinary
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
    }

    const body      = await request.json();
    const folder    = body.folder ?? "portfolio";
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Génère la signature
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      timestamp,
      signature,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey:    process.env.CLOUDINARY_API_KEY,
    });

  } catch (error) {
    console.error("[POST /api/cloudinary-signature]", error);
    return NextResponse.json(
      { error: "Erreur lors de la génération de la signature." },
      { status: 500 }
    );
  }
}