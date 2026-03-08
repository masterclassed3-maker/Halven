export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-5xl font-bold mb-6">Halven</h1>
      <p className="text-lg max-w-2xl text-neutral-300">
        Halven is a protocol centered on scarcity, emissions, and LP farming.
        Deposit HALV/USDC or HALV/WMON LP tokens to earn HALV rewards.
      </p>

      <div className="mt-10 flex gap-4">
        <a href="/stats" className="rounded-xl bg-white text-black px-5 py-3 font-semibold">
          View Stats
        </a>
        <a href="/farm" className="rounded-xl border border-white px-5 py-3 font-semibold">
          Enter Farm
        </a>
        <a href="/truths" className="rounded-xl border border-neutral-600 px-5 py-3 font-semibold">
          Truths
        </a>
      </div>
    </main>
  );
}