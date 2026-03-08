"use client";

import { useEffect, useMemo, useState } from "react";
import { formatUnits, parseUnits } from "viem";
import {
  useAccount,
  useBlockNumber,
  useConnect,
  useDisconnect,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { injected } from "wagmi/connectors";

import { CONTRACTS } from "../config/contracts";
import { erc20Abi } from "../abis/erc20";
import { farmAbi } from "../abis/farm";

function formatToken(
  value: unknown,
  decimals = 18,
  maxFractionDigits = 6
): string {
  if (typeof value !== "bigint") return "0";

  try {
    return Number(formatUnits(value, decimals)).toLocaleString(undefined, {
      maximumFractionDigits: maxFractionDigits,
    });
  } catch {
    return value.toString();
  }
}

function shortenAddress(address?: string) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function shortenHash(hash?: string) {
  if (!hash) return "";
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
}

function formatAllowance(value: unknown, decimals = 18) {
  if (typeof value !== "bigint") return "0";

  const unlimitedThreshold = BigInt("1" + "0".repeat(30));
  if (value >= unlimitedThreshold) return "Unlimited";

  return formatToken(value, decimals);
}

function estimatePendingReward(params: {
  userAmount: bigint;
  rewardDebt: bigint;
  totalDeposited: bigint;
  allocPoint: bigint;
  lastRewardBlock: bigint;
  accRewardPerShare: bigint;
  currentBlock: bigint;
  rewardPerBlock: bigint;
  totalAlloc: bigint;
  precision: bigint;
}) {
  const {
    userAmount,
    rewardDebt,
    totalDeposited,
    allocPoint,
    lastRewardBlock,
    accRewardPerShare,
    currentBlock,
    rewardPerBlock,
    totalAlloc,
    precision,
  } = params;

  let acc = accRewardPerShare;

  if (
    currentBlock > lastRewardBlock &&
    totalDeposited > 0n &&
    totalAlloc > 0n &&
    allocPoint > 0n
  ) {
    const blocks = currentBlock - lastRewardBlock;
    const poolReward = (blocks * rewardPerBlock * allocPoint) / totalAlloc;
    acc = acc + (poolReward * precision) / totalDeposited;
  }

  const pending = (userAmount * acc) / precision - rewardDebt;
  return pending > 0n ? pending : 0n;
}

function statLabel(label: string) {
  return (
    <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
      {label}
    </p>
  );
}

export default function FarmControls() {
  const [mounted, setMounted] = useState(false);

  const [amountMon, setAmountMon] = useState("");
  const [amountUsdc, setAmountUsdc] = useState("");
  const [uiError, setUiError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  const {
    data: txHash,
    writeContract,
    isPending: isWritePending,
    error: writeError,
  } = useWriteContract();

  const {
    isLoading: isConfirming,
    isSuccess: txConfirmed,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  const { data: blockNumber } = useBlockNumber({
    watch: true,
  });

  const { data, isLoading, error } = useReadContracts({
    allowFailure: true,
    contracts: address
      ? [
          {
            address: CONTRACTS.lpWmon,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: CONTRACTS.lpUsdc,
            abi: erc20Abi,
            functionName: "balanceOf",
            args: [address],
          },
          {
            address: CONTRACTS.lpWmon,
            abi: erc20Abi,
            functionName: "allowance",
            args: [address, CONTRACTS.farm],
          },
          {
            address: CONTRACTS.lpUsdc,
            abi: erc20Abi,
            functionName: "allowance",
            args: [address, CONTRACTS.farm],
          },
          {
            address: CONTRACTS.lpWmon,
            abi: erc20Abi,
            functionName: "decimals",
          },
          {
            address: CONTRACTS.lpUsdc,
            abi: erc20Abi,
            functionName: "decimals",
          },
          {
            address: CONTRACTS.farm,
            abi: farmAbi,
            functionName: "PID_MON",
          },
          {
            address: CONTRACTS.farm,
            abi: farmAbi,
            functionName: "PID_USDC",
          },
          {
            address: CONTRACTS.farm,
            abi: farmAbi,
            functionName: "currentRewardPerBlock",
          },
          {
            address: CONTRACTS.farm,
            abi: farmAbi,
            functionName: "TOTAL_ALLOC",
          },
          {
            address: CONTRACTS.farm,
            abi: farmAbi,
            functionName: "ACC_REWARD_PRECISION",
          },
        ]
      : [],
    query: {
      enabled: !!address,
      refetchInterval: 10000,
    },
  });

  const lpMonBalance = data?.[0]?.result as bigint | undefined;
  const lpUsdcBalance = data?.[1]?.result as bigint | undefined;
  const lpMonAllowance = data?.[2]?.result as bigint | undefined;
  const lpUsdcAllowance = data?.[3]?.result as bigint | undefined;
  const lpMonDecimals = Number(data?.[4]?.result ?? 18);
  const lpUsdcDecimals = Number(data?.[5]?.result ?? 18);

  const pidMonBigInt = data?.[6]?.result as bigint | undefined;
  const pidUsdcBigInt = data?.[7]?.result as bigint | undefined;

  const pidMonDisplay =
    typeof pidMonBigInt === "bigint" ? pidMonBigInt.toString() : "—";
  const pidUsdcDisplay =
    typeof pidUsdcBigInt === "bigint" ? pidUsdcBigInt.toString() : "—";

  const rewardPerBlock = data?.[8]?.result as bigint | undefined;
  const totalAlloc = data?.[9]?.result as bigint | undefined;
  const precision = data?.[10]?.result as bigint | undefined;

  const { data: monPoolAndUser } = useReadContracts({
    allowFailure: true,
    contracts:
      address && pidMonBigInt !== undefined
        ? [
            {
              address: CONTRACTS.farm,
              abi: farmAbi,
              functionName: "poolInfo",
              args: [pidMonBigInt],
            },
            {
              address: CONTRACTS.farm,
              abi: farmAbi,
              functionName: "userInfo",
              args: [pidMonBigInt, address],
            },
          ]
        : [],
    query: {
      enabled: !!address && pidMonBigInt !== undefined,
      refetchInterval: 10000,
    },
  });

  const { data: usdcPoolAndUser } = useReadContracts({
    allowFailure: true,
    contracts:
      address && pidUsdcBigInt !== undefined
        ? [
            {
              address: CONTRACTS.farm,
              abi: farmAbi,
              functionName: "poolInfo",
              args: [pidUsdcBigInt],
            },
            {
              address: CONTRACTS.farm,
              abi: farmAbi,
              functionName: "userInfo",
              args: [pidUsdcBigInt, address],
            },
          ]
        : [],
    query: {
      enabled: !!address && pidUsdcBigInt !== undefined,
      refetchInterval: 10000,
    },
  });

  const monPool = monPoolAndUser?.[0]?.result as
    | readonly [`0x${string}`, bigint, bigint, bigint, bigint]
    | undefined;

  const monUser = monPoolAndUser?.[1]?.result as
    | readonly [bigint, bigint]
    | undefined;

  const usdcPool = usdcPoolAndUser?.[0]?.result as
    | readonly [`0x${string}`, bigint, bigint, bigint, bigint]
    | undefined;

  const usdcUser = usdcPoolAndUser?.[1]?.result as
    | readonly [bigint, bigint]
    | undefined;

  const monPending = useMemo(() => {
    if (
      !monPool ||
      !monUser ||
      rewardPerBlock === undefined ||
      totalAlloc === undefined ||
      precision === undefined ||
      blockNumber === undefined
    ) {
      return 0n;
    }

    return estimatePendingReward({
      userAmount: monUser[0],
      rewardDebt: monUser[1],
      totalDeposited: monPool[4],
      allocPoint: monPool[1],
      lastRewardBlock: monPool[2],
      accRewardPerShare: monPool[3],
      currentBlock: blockNumber,
      rewardPerBlock,
      totalAlloc,
      precision,
    });
  }, [monPool, monUser, rewardPerBlock, totalAlloc, precision, blockNumber]);

  const usdcPending = useMemo(() => {
    if (
      !usdcPool ||
      !usdcUser ||
      rewardPerBlock === undefined ||
      totalAlloc === undefined ||
      precision === undefined ||
      blockNumber === undefined
    ) {
      return 0n;
    }

    return estimatePendingReward({
      userAmount: usdcUser[0],
      rewardDebt: usdcUser[1],
      totalDeposited: usdcPool[4],
      allocPoint: usdcPool[1],
      lastRewardBlock: usdcPool[2],
      accRewardPerShare: usdcPool[3],
      currentBlock: blockNumber,
      rewardPerBlock,
      totalAlloc,
      precision,
    });
  }, [usdcPool, usdcUser, rewardPerBlock, totalAlloc, precision, blockNumber]);

  if (!mounted) return null;

  function approveLP(
    lpAddress: `0x${string}`,
    amount: string,
    decimals: number
  ) {
    setUiError("");

    if (!amount) {
      setUiError("Enter an amount before approving.");
      return;
    }

    try {
      writeContract({
        address: lpAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [CONTRACTS.farm, parseUnits(amount, decimals)],
      });
    } catch {
      setUiError("Approve transaction could not be prepared.");
    }
  }

  function deposit(
    pid: bigint | undefined,
    amount: string,
    decimals: number
  ) {
    setUiError("");

    if (pid === undefined) {
      setUiError("Pool ID is not available.");
      return;
    }

    if (!amount) {
      setUiError("Enter an amount before depositing.");
      return;
    }

    try {
      writeContract({
        address: CONTRACTS.farm,
        abi: farmAbi,
        functionName: "deposit",
        args: [pid, parseUnits(amount, decimals)],
      });
    } catch {
      setUiError("Deposit transaction could not be prepared.");
    }
  }

  function withdraw(
    pid: bigint | undefined,
    amount: string,
    decimals: number
  ) {
    setUiError("");

    if (pid === undefined) {
      setUiError("Pool ID is not available.");
      return;
    }

    if (!amount) {
      setUiError("Enter an amount before withdrawing.");
      return;
    }

    try {
      writeContract({
        address: CONTRACTS.farm,
        abi: farmAbi,
        functionName: "withdraw",
        args: [pid, parseUnits(amount, decimals)],
      });
    } catch {
      setUiError("Withdraw transaction could not be prepared.");
    }
  }

  function claim(pid: bigint | undefined) {
    setUiError("");

    if (pid === undefined) {
      setUiError("Pool ID is not available.");
      return;
    }

    try {
      writeContract({
        address: CONTRACTS.farm,
        abi: farmAbi,
        functionName: "claim",
        args: [pid],
      });
    } catch {
      setUiError("Claim transaction could not be prepared.");
    }
  }

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <div className="flex flex-col gap-6 border-b border-neutral-800 pb-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-neutral-500">
            Wallet Controls
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight">
            Manage LP Farming
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-neutral-400">
            Connect a wallet to view balances, monitor pending HALV, approve LP
            tokens, deposit liquidity, claim rewards, and withdraw positions.
          </p>
        </div>

        {!isConnected ? (
          <button
            onClick={() => connect({ connector: injected() })}
            disabled={isConnecting}
            className="rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-60"
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </button>
        ) : (
          <div className="flex flex-col items-start gap-3 rounded-2xl border border-neutral-800 bg-black px-4 py-4 md:items-end">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Connected Wallet
            </p>
            <p className="text-sm text-neutral-200">{shortenAddress(address)}</p>
            <button
              onClick={() => disconnect()}
              className="rounded-xl border border-white px-4 py-2 text-sm font-semibold transition hover:bg-white hover:text-black"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      {isConnected && (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-800 bg-black p-4">
              {statLabel("Current Block")}
              <p className="mt-2 text-xl font-semibold">
                {blockNumber ? blockNumber.toString() : "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-black p-4">
              {statLabel("Reward Per Block")}
              <p className="mt-2 text-xl font-semibold">
                {rewardPerBlock !== undefined ? formatToken(rewardPerBlock, 18) : "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-black p-4">
              {statLabel("Total Alloc")}
              <p className="mt-2 text-xl font-semibold">
                {totalAlloc !== undefined ? totalAlloc.toString() : "—"}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-neutral-800 bg-black p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Pool
                  </p>
                  <h4 className="mt-2 text-xl font-semibold">HALV / WMON LP</h4>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-300">
                  PID {pidMonDisplay}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  {statLabel("Wallet Balance")}
                  <p className="mt-2 text-xl font-semibold">
                    {formatToken(lpMonBalance, lpMonDecimals)}
                  </p>
                </div>

                <div>
                  {statLabel("Staked Balance")}
                  <p className="mt-2 text-xl font-semibold">
                    {formatToken(monUser?.[0], lpMonDecimals)}
                  </p>
                </div>

                <div>
                  {statLabel("Pending HALV")}
                  <p className="mt-2 text-xl font-semibold text-yellow-300">
                    {formatToken(monPending, 18)}
                  </p>
                </div>

                <div>
                  {statLabel("Allowance")}
                  <p className="mt-2 text-xl font-semibold">
                    {formatAllowance(lpMonAllowance, lpMonDecimals)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {statLabel("Amount")}
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enter LP amount"
                    value={amountMon}
                    onChange={(e) => setAmountMon(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none transition focus:border-neutral-600"
                  />
                  <button
                    onClick={() =>
                      setAmountMon(
                        formatToken(lpMonBalance, lpMonDecimals, 18).replace(/,/g, "")
                      )
                    }
                    className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm font-semibold transition hover:bg-neutral-800"
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                <button
                  onClick={() =>
                    approveLP(CONTRACTS.lpWmon, amountMon, lpMonDecimals)
                  }
                  disabled={isWritePending}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:opacity-60"
                >
                  Approve
                </button>

                <button
                  onClick={() => deposit(pidMonBigInt, amountMon, lpMonDecimals)}
                  disabled={isWritePending}
                  className="rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold transition hover:bg-green-500 disabled:opacity-60"
                >
                  Deposit
                </button>

                <button
                  onClick={() => claim(pidMonBigInt)}
                  disabled={isWritePending}
                  className="rounded-xl bg-yellow-600 px-4 py-3 text-sm font-semibold text-black transition hover:bg-yellow-500 disabled:opacity-60"
                >
                  Claim
                </button>

                <button
                  onClick={() =>
                    withdraw(pidMonBigInt, amountMon, lpMonDecimals)
                  }
                  disabled={isWritePending}
                  className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold transition hover:bg-red-500 disabled:opacity-60"
                >
                  Withdraw
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-800 bg-black p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
                    Pool
                  </p>
                  <h4 className="mt-2 text-xl font-semibold">HALV / USDC LP</h4>
                </div>

                <div className="rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm text-neutral-300">
                  PID {pidUsdcDisplay}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  {statLabel("Wallet Balance")}
                  <p className="mt-2 text-xl font-semibold">
                    {formatToken(lpUsdcBalance, lpUsdcDecimals)}
                  </p>
                </div>

                <div>
                  {statLabel("Staked Balance")}
                  <p className="mt-2 text-xl font-semibold">
                    {formatToken(usdcUser?.[0], lpUsdcDecimals)}
                  </p>
                </div>

                <div>
                  {statLabel("Pending HALV")}
                  <p className="mt-2 text-xl font-semibold text-yellow-300">
                    {formatToken(usdcPending, 18)}
                  </p>
                </div>

                <div>
                  {statLabel("Allowance")}
                  <p className="mt-2 text-xl font-semibold">
                    {formatAllowance(lpUsdcAllowance, lpUsdcDecimals)}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                {statLabel("Amount")}
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enter LP amount"
                    value={amountUsdc}
                    onChange={(e) => setAmountUsdc(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm outline-none transition focus:border-neutral-600"
                  />
                  <button
                    onClick={() =>
                      setAmountUsdc(
                        formatToken(lpUsdcBalance, lpUsdcDecimals, 18).replace(/,/g, "")
                      )
                    }
                    className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm font-semibold transition hover:bg-neutral-800"
                  >
                    Max
                  </button>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                <button
                  onClick={() =>
                    approveLP(CONTRACTS.lpUsdc, amountUsdc, lpUsdcDecimals)
                  }
                  disabled={isWritePending}
                  className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold transition hover:bg-blue-500 disabled:opacity-60"
                >
                  Approve
                </button>

                <button
                  onClick={() => deposit(pidUsdcBigInt, amountUsdc, lpUsdcDecimals)}
                  disabled={isWritePending}
                  className="rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold transition hover:bg-green-500 disabled:opacity-60"
                >
                  Deposit
                </button>

                <button
                  onClick={() => claim(pidUsdcBigInt)}
                  disabled={isWritePending}
                  className="rounded-xl bg-yellow-600 px-4 py-3 text-sm font-semibold text-black transition hover:bg-yellow-500 disabled:opacity-60"
                >
                  Claim
                </button>

                <button
                  onClick={() =>
                    withdraw(pidUsdcBigInt, amountUsdc, lpUsdcDecimals)
                  }
                  disabled={isWritePending}
                  className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold transition hover:bg-red-500 disabled:opacity-60"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-800 bg-black p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Transaction Status
            </p>

            <div className="mt-3 space-y-2 text-sm">
              {isWritePending && (
                <p className="text-neutral-300">Waiting for wallet confirmation...</p>
              )}

              {txHash && (
                <p className="text-neutral-300">
                  Submitted Tx: {shortenHash(txHash)}
                </p>
              )}

              {isConfirming && (
                <p className="text-neutral-300">Transaction is confirming...</p>
              )}

              {txConfirmed && (
                <p className="text-green-400">Transaction confirmed.</p>
              )}

              {uiError && <p className="text-red-400">{uiError}</p>}
              {writeError && (
                <p className="break-words text-red-400">
                  Write error: {writeError.message}
                </p>
              )}
              {receiptError && (
                <p className="break-words text-red-400">
                  Receipt error: {receiptError.message}
                </p>
              )}
              {error && (
                <p className="break-words text-red-400">
                  Read error: {error.message}
                </p>
              )}
              {isLoading && (
                <p className="text-neutral-400">Refreshing wallet data...</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}