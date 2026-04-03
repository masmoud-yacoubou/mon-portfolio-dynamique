// src/lib/cloudinary.ts
// =============================================================================
// CLIENT CLOUDINARY
// Description : Configure et exporte le client Cloudinary pour l'upload
//               et la gestion des images du portfolio.
// =============================================================================

import { v2 as cloudinary } from "cloudinary";

// Configuration avec les variables d'environnement
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true, // Toujours utiliser HTTPS
});

export default cloudinary;

/**
 * Upload une image vers Cloudinary
 * @param file      - Fichier en base64 ou URL
 * @param folder    - Dossier de destination (ex: "portfolio/projects")
 * @param publicId  - Identifiant public optionnel
 * @returns URL de l'image uploadée
 */
export async function uploadImage(
  file: string,
  folder: string = "portfolio",
  publicId?: string
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    public_id:      publicId,
    overwrite:      true,
    transformation: [
      { quality: "auto:best" },   // Qualité optimale automatique
      { fetch_format: "auto" },   // WebP si supporté, AVIF sinon
      { width: 1200, crop: "limit" }, // ← Max 1200px, jamais d'agrandissement
    ],
  });

  return result.secure_url;
}

/**
 * Supprime une image de Cloudinary
 * @param publicId - Identifiant public de l'image
 */
export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Extrait le public_id depuis une URL Cloudinary
 * @param url - URL Cloudinary complète
 * @returns public_id de l'image
 */
export function extractPublicId(url: string): string {
  const parts = url.split("/");
  const filename = parts[parts.length - 1].split(".")[0];
  const folder = parts[parts.length - 2];
  return `${folder}/${filename}`;
}

/**
 * Upload une vidéo vers Cloudinary
 */
export async function uploadVideo(
  file: string,
  folder: string = "portfolio/videos",
): Promise<string> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    resource_type: "video",
    overwrite:     true,
    transformation: [
      { quality: "auto:good" },     // Bon ratio qualité/poids
      { fetch_format: "auto" },     // WebM si supporté
      { width: 1280, crop: "limit" }, // Max 720p
      { bit_rate: "800k" },         // ← Limite le débit
    ],
  });

  return result.secure_url;
}