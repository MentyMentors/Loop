import LoopWordmark from "./LoopLogo";

const LINK_GROUPS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Games", href: "#games" },
      { label: "Community", href: "#community" },
      { label: "How It Works", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
];

export default function Footer(): React.ReactElement {
  return (
    <footer className="border-t border-white/10 bg-midnight-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <LoopWordmark className="text-white" />
            <p className="max-w-xs text-sm leading-relaxed text-white/50">
              The social gaming and learning platform for university students.
              Play. Connect. Learn. Repeat.
            </p>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-loop-teal" />
              Powered by Menty
            </span>
          </div>
          {LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/40">
                {group.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-loop-teal"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 LOOP. All rights reserved.</p>
          <p>
            Made for students, <span className="text-loop-teal">powered by Menty</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}