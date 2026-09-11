import { ArrowUpRight } from "lucide-react";

export default function MentyConnection(): React.ReactElement {
  return (
    <section className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-3xl border border-loop-teal/25 bg-white px-6 py-12 text-center shadow-card sm:px-12 md:py-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-loop-teal/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-loop-teal ring-1 ring-loop-teal/30">
            <span className="h-4 w-4 rounded-full border-2 border-loop-teal" />
            Powered by Menty
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-midnight-900 sm:text-4xl">
            Built on real mentorship.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-midnight-500">
            LOOP is powered by Menty, a platform built around meaningful
            mentorship and student connection. Same trust, same community —
            a whole new way to play inside it.
          </p>
          <a
            href="https://mentmw.org"
            className="group inline-flex items-center gap-2 rounded-full border-2 border-loop-teal px-7 py-3 text-sm font-bold text-midnight-900 transition-all hover:-translate-y-0.5 hover:bg-loop-teal hover:shadow-glow active:translate-y-0"
          >
            Explore Menty
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
