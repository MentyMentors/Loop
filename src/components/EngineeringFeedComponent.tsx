import { prisma } from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SessionUserAttributes } from "@/services/auth";

interface EngineeringFeedComponentProps {
  currentUser: SessionUserAttributes;
}

/**
 * Renders the members-only microblogging feed. This is a server component:
 * it reads directly from the lounge's own Prisma client (never the main
 * platform's database) and is only ever rendered after a valid session
 * token has been decoded and the user replica has been synced.
 */
export default async function EngineeringFeedComponent({
  currentUser,
}: EngineeringFeedComponentProps): Promise<React.ReactElement> {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: {
      author: {
        select: { id: true, name: true, role: true },
      },
      _count: {
        select: { likes: true },
      },
    },
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Engineering Feed
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {currentUser.name}. Posts are visible to all
          registered Menty accounts.
        </p>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">No posts yet</CardTitle>
            <CardDescription>
              Be the first to post something in the engineering feed.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                  {post.author.name}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    {post.author.role}
                  </span>
                </CardTitle>
                <CardDescription>
                  {post.createdAt.toLocaleString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="whitespace-pre-wrap text-sm">{post.content}</p>
                <span className="text-xs text-muted-foreground">
                  {post._count.likes}{" "}
                  {post._count.likes === 1 ? "like" : "likes"}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
