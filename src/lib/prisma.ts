// src/lib/prisma.ts
// =============================================================================
// CLIENT PRISMA - Singleton
// Description : Initialise une seule instance de Prisma pour toute l'app.
//               Configure un timeout adapté à Neon (réveil depuis veille).
// =============================================================================

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === "development"
    ? ["error", "warn"]
    : ["error"],
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "&connect_timeout=30&pool_timeout=30",
    },
  },
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;