export const dynamic = "force-dynamic";
export const revalidate = 0;

import { formatUnits } from "viem";

import { halvTokenAbi } from "../../abis/halvToken";
import { farmAbi } from "../../abis/farm";
import { erc20Abi } from "../../abis/erc20";
import { uniswapV2PairAbi } from "../../abis/uniswapV2Pair";
import { CONTRACTS } from "../../config/contracts";
import { publicClient } from "../../lib/publicClient";

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

export default async function StatsPage() {
  const [
    name,
    symbol,
    decimals,
    totalSupply,
    maxSupply,
    mineableSupply,
    remainingMineableSupply,
    currentEra,
    currentRewardPerBlock,
    totalMinted,
    startBlock,
    pidMon,
    pidUsdc,
    monPoolAlloc,
    usdcPoolAlloc,
    totalAlloc,
    blocksPerEra,
    rewardPrecision,
    lpMonAddress,
    lpUsdcAddress,
    lpMonDecimals,
    lpUsdcDecimals,
    lpMonToken0,
    lpMonToken1,
    lpUsdcToken0,
    lpUsdcToken1,
    lpMonReserves,
    lpUsdcReserves,
    lpMonTotalSupply,
    lpUsdcTotalSupply,
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
      functionName: "MAX_SUPPLY",
    }),
    publicClient.readContract({
      address: CONTRACTS.halvToken,
      abi: halvTokenAbi,
      functionName: "MINEABLE_SUPPLY",
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
    publicClient.readContract({
      address: CONTRACTS.farm,
      abi: farmAbi,
      functionName: "startBlock",
    }),
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
      address: CONTRACTS.lpWmon,
      abi: erc20Abi,
      functionName: "decimals",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpUsdc,
      abi: erc20Abi,
      functionName: "decimals",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpWmon,
      abi: uniswapV2PairAbi,
      functionName: "token0",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpWmon,
      abi: uniswapV2PairAbi,
      functionName: "token1",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpUsdc,
      abi: uniswapV2PairAbi,
      functionName: "token0",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpUsdc,
      abi: uniswapV2PairAbi,
      functionName: "token1",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpWmon,
      abi: uniswapV2PairAbi,
      functionName: "getReserves",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpUsdc,
      abi: uniswapV2PairAbi,
      functionName: "getReserves",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpWmon,
      abi: uniswapV2PairAbi,
      functionName: "totalSupply",
    }),
    publicClient.readContract({
      address: CONTRACTS.lpUsdc,
      abi: uniswapV2PairAbi,
      functionName: "totalSupply",
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

  const topStats = [
    { label: "Token", value: `${String(name)} (${String(symbol)})` },
    { label: "Total Supply", value: formatToken(totalSupply as bigint, Number(decimals)) },
    { label: "Max Supply", value: formatToken(maxSupply as bigint, Number(decimals)) },
    { label: "Mineable Supply", value: formatToken(mineableSupply as bigint, Number(decimals)) },
    {
      label: "Remaining Mineable",
      value: formatToken(remainingMineableSupply as bigint, Number(decimals)),
    },
    { label: "Total Minted", value: formatToken(totalMinted as bigint, Number(decimals)) },
    { label: "Current Era", value: formatInteger(currentEra as bigint) },
    {
      label: "Reward / Block",
      value: formatToken(currentRewardPerBlock as bigint, Number(decimals)),
    },
    { label: "Blocks / Era", value: formatInteger(blocksPerEra as bigint) },
    { label: "Farm Start Block", value: formatInteger(startBlock as bigint) },
    {
      label: "Pool Split",
      value: `${formatInteger(monPoolAlloc as bigint)} / ${formatInteger(
        usdcPoolAlloc as bigint
      )}`,
    },
    { label: "Total Alloc", value: formatInteger(totalAlloc as bigint) },
    {
      label: "Total LP Deposited",
      value:
        `${formatToken(monPool[4] as bigint, Number(lpMonDecimals))} / ` +
        `${formatToken(usdcPool[4] as bigint, Number(lpUsdcDecimals))}`,
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Stats</h1>
          <p className="mt-3 max-w-3xl text-neutral-300">
            Live protocol metrics for HALV token supply, farm emissions, pool
            allocations, and LP pair state.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {topStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5"
            >
              <p className="text-sm uppercase tracking-wide text-neutral-400">
                {stat.label}
              </p>
              <p className="mt-2 break-words text-2xl font-semibold">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-neutral-400">
                  Farm Pool
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
                <p className="mt-1 break-words text-sm">{String(lpMonAddress)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Pool LP Token</p>
                <p className="mt-1 break-words text-sm">{String(monPool[0])}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Allocation Points</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(monPool[1] as bigint)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Last Reward Block</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(monPool[2] as bigint)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Total Deposited</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(monPool[4] as bigint, Number(lpMonDecimals))}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Acc Reward / Share</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatScaledByPrecision(
                    monPool[3] as bigint,
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
                  Farm Pool
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
                <p className="mt-1 break-words text-sm">{String(lpUsdcAddress)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Pool LP Token</p>
                <p className="mt-1 break-words text-sm">{String(usdcPool[0])}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Allocation Points</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(usdcPool[1] as bigint)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Last Reward Block</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatInteger(usdcPool[2] as bigint)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Total Deposited</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(usdcPool[4] as bigint, Number(lpUsdcDecimals))}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Acc Reward / Share</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatScaledByPrecision(
                    usdcPool[3] as bigint,
                    rewardPrecision as bigint
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-wide text-neutral-400">
                LP Pair State
              </p>
              <h2 className="mt-1 text-2xl font-semibold">HALV / WMON Pair</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-400">Token 0</p>
                <p className="mt-1 break-words text-sm">{String(lpMonToken0)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Token 1</p>
                <p className="mt-1 break-words text-sm">{String(lpMonToken1)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">HALV Reserve</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(lpMonReserves[0], 18)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">WMON Reserve</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(lpMonReserves[1], 18)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">LP Total Supply</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(lpMonTotalSupply as bigint, Number(lpMonDecimals))}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Last Reserve Update</p>
                <p className="mt-1 text-xl font-semibold">
                  {lpMonReserves[2].toString()}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <div className="mb-5">
              <p className="text-sm uppercase tracking-wide text-neutral-400">
                LP Pair State
              </p>
              <h2 className="mt-1 text-2xl font-semibold">HALV / USDC Pair</h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-neutral-400">Token 0</p>
                <p className="mt-1 break-words text-sm">{String(lpUsdcToken0)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Token 1</p>
                <p className="mt-1 break-words text-sm">{String(lpUsdcToken1)}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">HALV Reserve</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(lpUsdcReserves[0], 18)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">USDC Reserve</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(lpUsdcReserves[1], 18)}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">LP Total Supply</p>
                <p className="mt-1 text-xl font-semibold">
                  {formatToken(lpUsdcTotalSupply as bigint, Number(lpUsdcDecimals))}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-400">Last Reserve Update</p>
                <p className="mt-1 text-xl font-semibold">
                  {lpUsdcReserves[2].toString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}