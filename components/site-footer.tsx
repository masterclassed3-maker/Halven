import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-neutral-900 bg-black">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-white">
            HALVEN PROTOCOL
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-neutral-500">
            Scarcity • Emissions • Signal
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/stats" className="transition hover:text-white">
            Stats
          </Link>
          <Link href="/farm" className="transition hover:text-white">
            Farm
          </Link>
          <Link href="/truths" className="transition hover:text-white">
            Truths
          </Link>
        </div>

        <div className="text-sm text-neutral-500">
          Not everything important is visible.
        </div>
      </div>
    </footer>
  );
}