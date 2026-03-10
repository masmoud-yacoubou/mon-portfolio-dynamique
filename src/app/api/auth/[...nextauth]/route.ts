// src/app/api/auth/[...nextauth]/route.ts
// =============================================================================
// ROUTE HANDLER NEXTAUTH
// Description : Point d'entrée HTTP pour toutes les requêtes d'auth.
//               Gère /api/auth/signin, /api/auth/signout, /api/auth/session...
// =============================================================================

import { handlers } from "@/lib/auth";

// Export des méthodes HTTP gérées par NextAuth
export const { GET, POST } = handlers;