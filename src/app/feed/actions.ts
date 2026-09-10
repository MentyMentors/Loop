"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  decodeSessionToken,
  SESSION_COOKIE_NAME_DEV,
  SESSION_COOKIE_NAME_SECURE,
} from "@/services/auth";
import { syncLoungeUser } from "@/services/lounge-user";

const MAX_POST_LENGTH = 280;

async function requireLoungeUser() {
  const cookieStore = await cookies();
  const token =
    cookieStore.get(SESSION_COOKIE_NAME_SECURE)?.value ??
    cookieStore.get(SESSION_COOKIE_NAME_DEV)?.value;

  const sessionUser = await decodeSessionToken(token);
  if (!sessionUser) {
    throw new Error("Not authenticated.");
  }

  return syncLoungeUser(sessionUser);
}

/** Creates a new feed post on behalf of the currently authenticated user. */
export async function createPost(formData: FormData): Promise<void> {
  const user = await requireLoungeUser();
  const content = String(formData.get("content") ?? "").trim();

  if (content.length === 0) {
    throw new Error("Post content cannot be empty.");
  }
  if (content.length > MAX_POST_LENGTH) {
    throw new Error(`Posts are limited to ${MAX_POST_LENGTH} characters.`);
  }

  await prisma.post.create({
    data: {
      content,
      authorId: user.id,
    },
  });

  revalidatePath("/feed");
}

/**
 * Toggles a like on a post for the current user. The database's compound
 * unique constraint on [postId, userId] is the real source of truth for
 * "already liked" — this function simply reacts to it.
 */
export async function toggleLike(postId: string): Promise<void> {
  const user = await requireLoungeUser();

  const existingLike = await prisma.like.findUnique({
    where: {
      unique_post_like_per_user: {
        postId,
        userId: user.id,
      },
    },
  });

  if (existingLike) {
    await prisma.like.delete({ where: { id: existingLike.id } });
  } else {
    await prisma.like.create({
      data: { postId, userId: user.id },
    });
  }

  revalidatePath("/feed");
}
