import { cookies } from "next/headers";
import { Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  decodeSessionToken,
  SESSION_COOKIE_NAME_SECURE,
  SESSION_COOKIE_NAME_DEV,
} from "@/services/auth";
import { syncLoungeUser } from "@/services/lounge-user";
import EngineeringFeedComponent from "@/components/EngineeringFeedComponent";

export const dynamic = "force-dynamic";

const MAIN_APP_URL = "https://mentmw.org";

/**
 * "Access Locked" placeholder shown to anyone without a valid Menty
 * session. Visually consistent with the rest of the app via shadcn/ui.
 */
function AccessLocked(): React.ReactElement {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">Access Locked</CardTitle>
          <CardDescription>
            This social feed is restricted to registered Menty accounts.
            Sign in on the main mentorship platform to unlock the
            engineering community feed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href={MAIN_APP_URL}
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            Go to Menty to sign in
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

export default async function FeedPage(): Promise<React.ReactElement> {
  const cookieStore = await cookies();

  const token =
    cookieStore.get(SESSION_COOKIE_NAME_SECURE)?.value ??
    cookieStore.get(SESSION_COOKIE_NAME_DEV)?.value;

  const sessionUser = await decodeSessionToken(token);

  if (!sessionUser) {
    return <AccessLocked />;
  }

  await syncLoungeUser(sessionUser);

  return <EngineeringFeedComponent currentUser={sessionUser} />;
}
