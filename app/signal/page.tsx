import Link from "next/link";

const transmissions = [
  "A signal does not require explanation to be real.",
  "Most people only notice structure after repetition.",
  "The second hidden page is never found by accident twice.",
  "Watch what changes slowly enough to feel permanent.",
  "The visible layer teaches function. The hidden layer tests attention.",
  "Not every clue points forward. Some confirm what was already passed.",
];

const markers = [
  "Era",
  "Split",
  "Supply",
  "Silence",
  "Observation",
  "Return",
];

export default function SignalPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[8%] h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-[8%] top-[30%] h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[8%] left-[18%] h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs uppercase tracking-[0.42em] text-neutral-500">
            Signal
          </p>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            What repeats
            <br />
            is rarely meaningless.
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-300">
            A signal is not always loud.
            <br />
            Sometimes it appears as pacing.
            <br />
            Sometimes as recurrence.
            <br />
            Sometimes as the quiet insistence that certain forms were chosen.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-neutral-800 bg-neutral-950/80 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur">
            <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
              Transmission Log
            </p>

            <div className="mt-8 space-y-4">
              {transmissions.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-neutral-800 bg-black/70 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                    Entry {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 text-sm leading-8 text-neutral-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-neutral-800 bg-black/80 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                Markers
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {markers.map((marker, index) => (
                  <div
                    key={`${marker}-${index}`}
                    className="rounded-full border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-neutral-300"
                  >
                    {marker}
                  </div>
                ))}
              </div>

              <p className="mt-6 text-sm leading-8 text-neutral-300">
                Some markers describe mechanics.
                <br />
                Some describe interpretation.
                <br />
                One or two may describe neither, and still remain.
              </p>
            </div>

            <div className="rounded-[2rem] border border-neutral-800 bg-neutral-950 p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                Reading Guidance
              </p>

              <p className="mt-4 text-sm leading-8 text-neutral-300">
                Do not start with what is largest.
                <br />
                Start with what is repeated.
                <br />
                Then ask why repetition was given shape.
                <br />
                Then ask why the shape was made visible.
              </p>
            </div>

            <div className="rounded-[2rem] border border-neutral-800 bg-gradient-to-b from-neutral-950 to-black p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
              <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">
                Continue
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                The third layer is not named yet.
              </h2>

              <p className="mt-4 text-sm leading-8 text-neutral-300">
                That does not mean it is absent.
                <br />
                It only means it has not been introduced openly.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/threshold"
                  className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
                >
                  Return to Threshold
                </Link>

                <Link
                  href="/truths"
                  className="rounded-2xl border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-950"
                >
                  Return to Truths
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}