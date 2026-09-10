import { decode } from "next-auth/jwt";

/**
 * The minimal set of user attributes this standalone app needs from the
 * main mentorship platform's session. Nothing else is ever read from the
 * decoded token.
 */
export interface SessionUserAttributes {
  id: string;
  name: string;
  email: string;
  role: string;
}

/** Cookie name used by the main app in production (HTTPS, `Secure` prefix). */
export const SESSION_COOKIE_NAME_SECURE = "__Secure-next-auth.session-token";
/** Cookie name used by the main app in local/non-HTTPS development. */
export const SESSION_COOKIE_NAME_DEV = "next-auth.session-token";

/**
 * Decodes and validates a NextAuth JWT session token that was minted by the
 * main mentorship platform. This requires NEXTAUTH_SECRET in this app's
 * environment to be identical to the main platform's secret — that shared
 * secret is the ONLY thing these two independent apps have in common.
 *
 * Returns null for any missing, malformed, expired, or otherwise invalid
 * token. Callers must treat null as "not authenticated" and must not throw.
 */
export async function decodeSessionToken(
  token: string | undefined,
): Promise<SessionUserAttributes | null> {
  if (!token) {
    return null;
  }

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error(
      "NEXTAUTH_SECRET is not configured for the Game Lounge app. " +
        "It must match the main mentorship platform's secret.",
    );
  }

  try {
    const payload = await decode({ token, secret });

    if (!payload) {
      return null;
    }

    const { sub, name, email, role } = payload as {
      sub?: string;
      name?: string;
      email?: string;
      role?: string;
    };

    if (!sub || !name || !email || !role) {
      // Token decoded but is missing fields this app depends on.
      return null;
    }

    return { id: sub, name, email, role };
  } catch {
    // Any decode/verification failure is treated as "unauthenticated",
    // never surfaced as a hard error to the page.
    return null;
  }
}
