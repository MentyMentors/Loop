import Link from "next/link";
import { Play } from "lucide-react";
import Reveal from "./Reveal";

export default function Hero(): React.ReactElement {
  return (
    <section className="loop-grid relative overflow-hidden bg-midnight-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-loop-teal/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-56 w-56 rounded-full bg-loop-violet/15 blur-3xl" />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/70 ring-1 ring-white/10">
          Powered by Menty
        </span>
        <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Welcome to the <span className="text-gradient">LOOP</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          Games, challenges, and your Menty engineering community — all in
          one lounge.
        </p>
        <Link
          href="/games/trivia"
          className="group inline-flex items-center gap-2 rounded-full bg-loop-teal px-8 py-4 text-sm font-bold text-midnight-900 shadow-glow transition-all hover:-translate-y-0.5 hover:bg-loop-teal/90 active:translate-y-0 active:scale-[0.98]"
        >
          <Play className="h-4 w-4 fill-current" />
          Start Playing
        </Link>
      </Reveal>
    </section>
  );
}