import Link from "next/link";
import { Play } from "lucide-react";
import Reveal from "./Reveal";

export default function FinalCta(): React.ReactElement {
  return (
    <section className="bg-cream pb-24 md:pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="loop-grid relative overflow-hidden rounded-3xl bg-midnight-900 px-6 py-16 text-center shadow-lift sm:px-12 md:py-24">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-loop-teal/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-loop-violet/15 blur-3xl" />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                Ready to get back in the{" "}
                <span className="text-gradient">LOOP</span>?
              </h2>
              <p className="max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
                Grab a game. Challenge someone. Learn something. Then do it
                again.
              </p>
              <Link
                href="/games/trivia"
                className="group inline-flex items-center gap-2 rounded-full bg-loop-teal px-8 py-4 text-sm font-bold text-midnight-900 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-loop-teal/90 active:translate-y-0 active:scale-[0.98]"
              >
                <Play className="h-4 w-4 fill-current" />
                Start Playing
              </Link>
              <p className="text-xs text-white/40">
                Free for students · your Menty account is your LOOP account
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
