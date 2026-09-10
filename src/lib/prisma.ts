import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton scoped to the Game Lounge's own isolated
 * Neon database (LOUNGE_DATABASE_URL). This client must never be pointed
 * at, or merged with, the main mentorship platform's database connection.
 */
const globalForPrisma = globalThis as unknown as {
  loungePrisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  globalForPrisma.loungePrisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.loungePrisma = prisma;
}
