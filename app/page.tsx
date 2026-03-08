import Link from "next/link";
import { halvTokenAbi } from "../abis/halvToken";
import { farmAbi } from "../abis/farm";
import { CONTRACTS } from "../config/contracts";
import { publicClient } from "../lib/publicClient";
import { formatUnits } from "viem";

function formatToken(
  value: bigint | undefined,
  decimals = 18,
  maxFractionDigits = 6
) {
  if (value === undefined) return "0";

  try {
    return Number(formatUnits(value, decimals)).toLocaleString(undefined, {
      maximumFractionDigits: maxFractionDigits,
    });
  } catch {
    return value.toString();
  }
}

function formatInteger(value: bigint | undefined) {
  if (value === undefined) return "0";
  return value.toLocaleString();
}

export default async function HomePage() {
  const [
    name,
    symbol,
    decimals,
    totalSupply,
    remainingMineableSupply,
    currentEra,
    currentRewardPerBlock,
    totalMinted,
  ] = await Promise.all([
    publicClient.readContract({
      address: CONTRACTS.halvToken,
      abi: halvTokenAbi,
      functionName: "name",
    }),
    publicClient.readContract({
      address: CONTRACTS.halvToken,
      abi: halvTokenAbi,
      functionName: "symbol",
    }),
    publicClient.readContract({
      address: CONTRACTS.halvToken,
      abi: halvTokenAbi,
      functionName: "decimals",
    }),
    publicClient.readContract({
      address: CONTRACTS.halvToken,
      abi: halvTokenAbi,
      functionName: "totalSupply",
    }),
    publicClient.readContract({
      address: CONTRACTS.halvToken,
      abi: halvTokenAbi,
      functionName: "remainingMineableSupply",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "currentEra",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "currentRewardPerBlock",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "totalMinted",
    }),
  ]);

  const heroStats = [
    {
      label: "Token",
      value: `${String(name)} (${String(symbol)})`,
    },
    {
      label: "Total Supply",
      value: formatToken(totalSupply as bigint, Number(decimals)),
    },
    {
      label: "Remaining Mineable",
      value: formatToken(remainingMineableSupply as bigint, Number(decimals)),
    },
    {
      label: "Current Era",
      value: formatInteger(currentEra as bigint),
    },
    {
      label: "Reward / Block",
      value: formatToken(currentRewardPerBlock as bigint, Number(decimals)),
    },
    {
      label: "Total Minted",
      value: formatToken(totalMinted as bigint, Number(decimals)),
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
              Protocol Interface
            </p>

            <h1 className="mt-4 max-w-4xl text-5xl font-semibold tracking-tight md:text-6xl">
              Scarcity with a clock. Liquidity with a purpose.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
              Halven is a farm-driven protocol centered on emissions, paired
              liquidity, and controlled supply. Deposit HALV/WMON or HALV/USDC
              LP tokens to earn HALV, monitor live protocol state, and uncover
              the deeper layer behind the system.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/farm"
                className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Enter Farm
              </Link>

              <Link
                href="/stats"
                className="rounded-2xl border border-neutral-700 px-6 py-3 font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-950"
              >
                View Stats
              </Link>

              <Link
                href="/truths"
                className="rounded-2xl border border-neutral-900 bg-neutral-950 px-6 py-3 font-semibold text-neutral-300 transition hover:border-neutral-700 hover:text-white"
              >
                Read the Truths
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
            <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
              Live Snapshot
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-neutral-800 bg-black p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 break-words text-xl font-semibold">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                01
              </p>
              <h2 className="mt-4 text-2xl font-semibold">Understand</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-300">
                Explore the token supply design, emissions structure, farm
                allocation split, and LP pair state from a single interface.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                02
              </p>
              <h2 className="mt-4 text-2xl font-semibold">Participate</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-300">
                Deposit eligible LP into the farm, monitor live balances, track
                pending HALV, and manage rewards directly from the dashboard.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6">
              <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
                03
              </p>
              <h2 className="mt-4 text-2xl font-semibold">Discover</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-300">
                Halven is more than a farm interface. The protocol leaves clues,
                fragments, and signals for those paying close attention.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2rem] border border-neutral-800 bg-gradient-to-b from-neutral-950 to-black p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
              Signal
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight">
              Two pools. One emission stream. A system designed to be watched.
            </h2>

            <p className="mt-4 max-w-2xl text-neutral-300">
              Halven only accepts paired liquidity. That choice is part of the
              protocol’s identity. What you see on the surface is structure.
              What sits beneath it may be something else entirely.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/farm"
                className="rounded-2xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90"
              >
                Open Farm
              </Link>

              <Link
                href="/truths"
                className="rounded-2xl border border-neutral-700 px-5 py-3 font-semibold text-white transition hover:border-neutral-500 hover:bg-neutral-950"
              >
                Continue to Truths
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}