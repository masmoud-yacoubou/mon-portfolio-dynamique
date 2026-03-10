// src/lib/auth.ts
// =============================================================================
// CONFIGURATION NEXTAUTH
// Description : Gère l'authentification de l'administrateur du dashboard.
//               Utilise une stratégie "Credentials" (email + mot de passe).
// =============================================================================

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // Stratégie JWT — pas de table de sessions en base
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Session de 24h
  },

  // Pages personnalisées
  pages: {
    signIn: "/dashboard/login", // Notre page de login custom
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },

      /**
       * Vérifie les credentials de l'admin
       * Retourne l'utilisateur si valide, null sinon
       */
      async authorize(credentials) {
        // Validation basique des champs
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        // Recherche de l'admin en base
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin) {
          throw new Error("Identifiants invalides");
        }

        // Vérification du mot de passe hashé
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          admin.password
        );

        if (!isPasswordValid) {
          throw new Error("Identifiants invalides");
        }

        // Retourne les données qui seront dans le token JWT
        return {
          id: admin.id,
          email: admin.email,
          name: admin.name ?? "Admin",
        };
      },
    }),
  ],

  callbacks: {
    /**
     * Ajoute l'id admin dans le token JWT
     */
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    /**
     * Expose l'id dans la session côté client
     */
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});