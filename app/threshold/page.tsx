import Link from "next/link";

const fragments = [
  "The threshold is not a wall.",
  "It is a change in what you notice.",
  "Some values measure supply.",
  "Some values measure time.",
  "A smaller number can carry the greater meaning.",
  "The visible layer was always meant to be read twice.",
];

const observations = [
  "Observe the split before you observe the total.",
  "Observe what remains before what has already appeared.",
  "Observe repetition. Repetition is rarely accidental.",
  "The pair is part of the message, not just the mechanism.",
  "What looks decorative may only be waiting for context.",
  "The first answer is often the public answer.",
];

export default function ThresholdPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-6rem] h-[26rem] w-[26rem] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_42%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.42em] text-neutral-500">
            Threshold
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            You were not expected
            <br />
            to arrive here quickly.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-300">
            The threshold is not a gate.
            <br />
            It is a moment of recognition.
            <br />
            If you reached this page without instruction,
            <br />
            you are already paying closer attention than most.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-neutral-800 bg-neutral-950/80 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Entry Record
            </p>

            <div className="mt-6 space-y-5 text-lg leading-8 text-neutral-300">
              <p>The surface explains the interface.</p>
              <p>The threshold suggests there was always more than interface.</p>
              <p>
                Some systems are built to be used.
                <br />
                A few are built to be interpreted.
              </p>
              <p>
                Halven may be both.
                <br />
                That is the first useful discomfort.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-neutral-800 bg-black/80 p-6">
              <p className="text-xs uppercase tracking-[0.26em] text-neutral-500">
                Signal
              </p>

              <p className="mt-4 text-2xl font-semibold tracking-tight">
                Observe the eras.
                <br />
                Observe the split.
                <br />
                Observe the numbers that repeat.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-400">
                Do not begin with the loudest metric.
                Begin with the one that seems too small to matter.
                Then ask why it was given a place at all.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-neutral-800 bg-black/80 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Fragments
            </p>

            <div className="mt-6 space-y-3">
              {fragments.map((fragment, index) => (
                <div
                  key={`${fragment}-${index}`}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950/70 px-4 py-4 text-sm leading-7 text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-950"
                >
                  {fragment}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {observations.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-3xl border border-neutral-800 bg-neutral-950/70 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              <p className="text-xs uppercase tracking-[0.26em] text-neutral-500">
                Observation {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-7 text-neutral-300">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-neutral-800 bg-gradient-to-b from-neutral-950 to-black p-8 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
          <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">
            Exit Prompt
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
            Return when the visible structure
            <br />
            starts to feel arranged.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-neutral-300">
            Most people reach a dashboard and stop.
            <br />
            A few begin asking why it looks the way it does.
            <br />
            Fewer still notice that some systems seem to expect observation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/truths"
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Return to Truths
            </Link>

            <Link
              href="/farm"
              className="rounded-2xl border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-950"
            >
              Re-enter Farm
            </Link>

            <Link
              href="/stats"
              className="rounded-2xl border border-neutral-900 bg-neutral-950 px-6 py-3 font-semibold text-neutral-300 transition hover:border-neutral-700 hover:text-white"
            >
              Review Stats
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}