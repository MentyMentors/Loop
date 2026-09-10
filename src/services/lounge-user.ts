import { prisma } from "@/lib/prisma";
import type { User } from "@prisma/client";
import type { SessionUserAttributes } from "@/services/auth";

/**
 * Synchronizes a single authenticated user's profile attributes from the
 * main mentorship platform's session into this app's own isolated
 * database. This is a one-way, best-effort cache refresh — the lounge
 * database is never treated as a source of truth for identity, and this
 * function performs no writes back to the main platform.
 *
 * Safe to call on every authenticated request: `upsert` makes it
 * idempotent, and the compound key (`id`) guarantees at most one row per
 * user regardless of how many times this runs.
 */
export async function syncLoungeUser(
  sessionUser: SessionUserAttributes,
): Promise<User> {
  const { id, name, email, role } = sessionUser;

  if (!id || !name || !email || !role) {
    throw new Error(
      "syncLoungeUser requires id, name, email, and role to be present.",
    );
  }

  const user = await prisma.user.upsert({
    where: { id },
    update: {
      name,
      email,
      role,
    },
    create: {
      id,
      name,
      email,
      role,
    },
  });

  return user;
}
