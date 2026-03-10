// src/lib/auth.d.ts
// =============================================================================
// DÉCLARATIONS DE TYPES - NextAuth
// Description : Étend les types de NextAuth pour inclure l'id dans la session.
// =============================================================================

import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}