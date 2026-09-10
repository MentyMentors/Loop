import Link from "next/link";
import { Gamepad2, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GameEntry {
  slug: string;
  title: string;
  description: string;
}

const GAMES: GameEntry[] = [
  {
    slug: "trivia",
    title: "Trivia Challenge",
    description:
      "Test your knowledge with random single-player trivia questions.",
  },
];

/**
 * Public Game Hub Dashboard. Fully static/serverless and requires zero
 * login credentials to view or interact with — no session lookups, no
 * database reads happen on this route.
 */
export default function GameHubPage(): React.ReactElement {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Menty Game Lounge
        </h1>
        <p className="mt-1 text-muted-foreground">
          Public mini-games, open to everyone — no account required.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {GAMES.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}`}>
            <Card className="h-full transition-colors hover:border-primary">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                  <Gamepad2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}

        <Link href="/feed">
          <Card className="h-full border-dashed transition-colors hover:border-primary">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-md bg-secondary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <CardTitle className="text-lg">Engineering Feed</CardTitle>
              <CardDescription>
                Members-only community feed. Requires a Menty account.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
