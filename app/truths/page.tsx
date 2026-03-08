import Link from "next/link";

const truths = [
  {
    id: "Truth 01",
    title: "The emission was never random.",
    body:
      "What appears gradual is measured. What appears delayed is intentional. The rhythm was chosen long before the first participant arrived.",
  },
  {
    id: "Truth 02",
    title: "Two pools feed one current.",
    body:
      "The split is visible. The reason is not. One path holds weight. The other holds reference. Together they shape the signal.",
  },
  {
    id: "Truth 03",
    title: "The remaining supply matters more than the visible supply.",
    body:
      "Many projects want attention on what has already been minted. Halven points somewhere else. Watch what remains. Watch what has not yet appeared.",
  },
  {
    id: "Truth 04",
    title: "Liquidity is part of the message.",
    body:
      "Single-sided participation was excluded for a reason. Pairing was not a convenience decision. It was part of the architecture.",
  },
  {
    id: "Truth 05",
    title: "Not every number is there for accounting.",
    body:
      "Some values only describe state. Others describe intention. A few describe neither, but still recur. Those are the ones worth tracking.",
  },
  {
    id: "Truth 06",
    title: "A system can be functional and symbolic at the same time.",
    body:
      "Most will stop at the interface. A few will notice repetition. Fewer will ask why the structure feels arranged to be observed.",
  },
];

const fragments = [
  "The first reading is always incomplete.",
  "A split can be economic or ceremonial.",
  "Scarcity is not merely reduction. It is pacing.",
  "The visible layer is not the whole protocol.",
  "Every era teaches the same lesson differently.",
  "The pairs were selected. They were not incidental.",
];

export default function TruthsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.32em] text-neutral-500">
            Truths
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-6xl">
            Some systems explain themselves.
            <br />
            Others wait to be interpreted.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
            Halven can be read as a farm, a token, a pacing mechanism, or
            something quieter and more deliberate. These are not instructions.
            They are observations. Whether they are complete is another matter.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/farm"
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
            >
              Return to Farm
            </Link>

            <Link
              href="/stats"
              className="rounded-2xl border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-950"
            >
              Review Stats
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {truths.map((truth) => (
              <div
                key={truth.id}
                className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                  {truth.id}
                </p>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                  {truth.title}
                </h2>

                <p className="mt-4 leading-8 text-neutral-300">{truth.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2rem] border border-neutral-800 bg-gradient-to-b from-neutral-950 to-black p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Fragments
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {fragments.map((fragment, index) => (
                <div
                  key={`${fragment}-${index}`}
                  className="rounded-2xl border border-neutral-800 bg-black p-5"
                >
                  <p className="text-sm leading-7 text-neutral-300">{fragment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                Observation
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                The obvious interpretation is rarely the final one.
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-neutral-300">
                Most interfaces want to reduce doubt.
                <br />
                Halven leaves a small amount of it in place.
                <br />
                That may be design.
                <br />
                It may be signal.
                <br />
                Or it may be an invitation to keep looking.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-black p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                Prompt
              </p>

              <p className="mt-4 text-sm leading-8 text-neutral-300">
                Ask better questions.
                <br />
                Not what the protocol does.
                <br />
                Why it does it this way.
                <br />
                Why certain numbers repeat.
                <br />
                Why the language feels arranged.
                <br />
                Why the structure seems to expect observation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2rem] border border-neutral-800 bg-neutral-950 p-8 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Continue
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              The interface is only one layer.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
              Some users will stop at the dashboard.
              <br />
              Some will follow the pattern.
              <br />
              Some will notice what does not need to be there, but is.
            </p>

            <div className="mt-10 rounded-2xl border border-neutral-800 bg-black/70 p-6 text-left">
              <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                Side Note
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-300">
                There is a difference between a boundary and a{" "}
                <span className="font-semibold text-white">threshold</span>.
                <br />
                A boundary stops movement.
                <br />
                A threshold changes perception.
                <br />
                The second transition is quieter.
                <br />
                Some would call it a{" "}
                <span className="font-semibold text-white">signal</span>.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Back to Home
              </Link>

              <Link
                href="/farm"
                className="rounded-2xl border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-900"
              >
                Re-enter Farm
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}