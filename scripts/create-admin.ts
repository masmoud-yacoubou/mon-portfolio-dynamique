// scripts/create-admin.ts
// =============================================================================
// SCRIPT : Créer le premier compte administrateur
// Usage   : npx tsx scripts/create-admin.ts
// ⚠️  Supprimer ce fichier après utilisation !
// =============================================================================

import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";

// Charge les variables d'environnement
dotenv.config({ path: ".env" });

const prisma = new PrismaClient();

async function main() {
  // ⚠️ Modifie ces valeurs avant de lancer le script
  const email = "maxdomyacoubou@gmail.com";
  const password = "Maxouney5002!";
  const name = "Masmoud";

  // Hash du mot de passe (12 rounds = très sécurisé)
  const hashedPassword = await bcrypt.hash(password, 12);

  // Création de l'admin
  const admin = await prisma.admin.create({
    data: { email, password: hashedPassword, name },
  });

  console.log("✅ Admin créé avec succès :", admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());