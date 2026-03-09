export const dynamic = "force-dynamic";
export const revalidate = 0;
import { formatUnits } from "viem";

import { farmAbi } from "../../abis/farm";
import { erc20Abi } from "../../abis/erc20";
import { CONTRACTS } from "../../config/contracts";
import { publicClient } from "../../lib/publicClient";
import FarmWidgetLoader from "../../components/farm-widget-loader";

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

function formatScaledByPrecision(
  value: bigint | undefined,
  precision: bigint | undefined,
  maxFractionDigits = 8
) {
  if (value === undefined || precision === undefined) return "0";

  const precisionString = precision.toString();

  const precisionDecimals =
    precisionString.startsWith("1") && /^10*$/.test(precisionString)
      ? precisionString.length - 1
      : 0;

  try {
    return Number(formatUnits(value, precisionDecimals)).toLocaleString(
      undefined,
      {
        maximumFractionDigits: maxFractionDigits,
      }
    );
  } catch {
    return value.toString();
  }
}

export default async function FarmPage() {
  const [
    pidMon,
    pidUsdc,
    lpMon,
    lpUsdc,
    currentEra,
    currentRewardPerBlock,
    monPoolAlloc,
    usdcPoolAlloc,
    totalAlloc,
    blocksPerEra,
    rewardPrecision,
    lpMonDecimals,
    lpUsdcDecimals,
  ] = await Promise.all([
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "PID_MON",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "PID_USDC",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "lpMon",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "lpUsdc",
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
      functionName: "MON_POOL_ALLOC",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "USDC_POOL_ALLOC",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "TOTAL_ALLOC",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "BLOCKS_PER_ERA",
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "ACC_REWARD_PRECISION",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpWmon,
      abi: erc20Abi,
      functionName: "decimals",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpUsdc,
      abi: erc20Abi,
      functionName: "decimals",
    }),
  ]);

  const [monPool, usdcPool] = await Promise.all([
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "poolInfo",
      args: [pidMon],
    }),
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "poolInfo",
      args: [pidUsdc],
    }),
  ]);

  const monPoolLpToken = String(monPool[0]);
  const monPoolAllocPoint = monPool[1] as bigint;
  const monPoolLastRewardBlock = monPool[2] as bigint;
  const monPoolAccRewardPerShare = monPool[3] as bigint;
  const monPoolTotalDeposited = monPool[4] as bigint;

  const usdcPoolLpToken = String(usdcPool[0]);
  const usdcPoolAllocPoint = usdcPool[1] as bigint;
  const usdcPoolLastRewardBlock = usdcPool[2] as bigint;
  const usdcPoolAccRewardPerShare = usdcPool[3] as bigint;
  const usdcPoolTotalDeposited = usdcPool[4] as bigint;

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Farm</h1>
          <p className="mt-3 max-w-3xl text-neutral-300">
            Deposit HALV/WMON or HALV/USDC LP tokens to earn HALV rewards.
            Single-sided HALV is not accepted in the farm.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <p className="text-sm uppercase tracking-wide text-neutral-400">
              Current Era
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatInteger(currentEra as bigint)}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <p className="text-sm uppercase tracking-wide text-neutral-400">
              Reward / Block
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatToken(currentRewardPerBlock as bigint, 18)}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <p className="text-sm uppercase tracking-wide text-neutral-400">
              Blocks / Era
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatInteger(blocksPerEra as bigint)}
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <p className="text-sm uppercase tracking-wide text-neutral-400">
              Pool Split
            </p>
            <p className="mt-2 text-2xl font-semibold">
              {formatInteger(monPoolAlloc as bigint)} /{" "}
              {formatInteger(usdcPoolAlloc as bigint)}
            </p>
            <p className="mt-1 text-sm text-neutral-400">
              Total alloc: {formatInteger(totalAlloc as bigint)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-neutral-400">
                  Pool
                </p>
                <h2 className="mt-1 text-2xl font-semibold">HALV / WMON</h2>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-black px-3 py-2 text-sm text-neutral-300">
                PID {pidMon.toString()}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-400">LP Address</p>
                <p className="mt-1 break-words text-sm">{String(lpMon)}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Pool LP Token</p>
                <p className="mt-1 break-words text-sm">{monPoolLpToken}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Allocation Points</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(monPoolAllocPoint)}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Last Reward Block</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(monPoolLastRewardBlock)}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Total Deposited</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(monPoolTotalDeposited, Number(lpMonDecimals))}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">
                  Acc Reward / Share (scaled)
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {formatScaledByPrecision(
                    monPoolAccRewardPerShare,
                    rewardPrecision as bigint
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-neutral-400">
                  Pool
                </p>
                <h2 className="mt-1 text-2xl font-semibold">HALV / USDC</h2>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-black px-3 py-2 text-sm text-neutral-300">
                PID {pidUsdc.toString()}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-400">LP Address</p>
                <p className="mt-1 break-words text-sm">{String(lpUsdc)}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Pool LP Token</p>
                <p className="mt-1 break-words text-sm">{usdcPoolLpToken}</p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Allocation Points</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(usdcPoolAllocPoint)}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Last Reward Block</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(usdcPoolLastRewardBlock)}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">Total Deposited</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(usdcPoolTotalDeposited, Number(lpUsdcDecimals))}
                </p>
              </div>

              <div>
                <p className="text-sm text-neutral-400">
                  Acc Reward / Share (scaled)
                </p>
                <p className="mt-1 text-xl font-semibold">
                  {formatScaledByPrecision(
                    usdcPoolAccRewardPerShare,
                    rewardPrecision as bigint
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
          <p className="text-sm uppercase tracking-wide text-neutral-400">
            Farm Contract
          </p>
          <p className="mt-2 break-words text-sm">{CONTRACTS.farm}</p>
        </div>

        <div className="mt-8">
          <FarmWidgetLoader />
        </div>
      </div>
    </main>
  );
}