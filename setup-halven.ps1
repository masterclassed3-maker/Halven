$ErrorActionPreference = "Stop"

Write-Host "Creating Halven frontend folders and files..." -ForegroundColor Cyan

# Ensure we're in the project root
if (-not (Test-Path "package.json")) {
    Write-Host "Warning: package.json not found in this folder." -ForegroundColor Yellow
    Write-Host "Make sure you are running this inside your halven-site project root." -ForegroundColor Yellow
}

# Folders
$folders = @(
    "src/app/stats",
    "src/app/farm",
    "src/app/truths",
    "src/abis",
    "src/config",
    "src/lib",
    "src/components",
    "src/hooks"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
    Write-Host "Created folder: $folder" -ForegroundColor Green
}

# Files and starter contents
$files = @{
    "src/app/page.tsx" = @'
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
'@

    "src/app/stats/page.tsx" = @'
export default function StatsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Stats</h1>
      <p className="text-neutral-300">Live Halven stats will appear here.</p>
    </main>
  );
}
'@

    "src/app/farm/page.tsx" = @'
export default function FarmPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Farm</h1>
      <p className="text-neutral-300">
        Deposit HALV/USDC or HALV/WMON LP tokens to earn HALV rewards.
      </p>
    </main>
  );
}
'@

    "src/app/truths/page.tsx" = @'
export default function TruthsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Truths</h1>
      <p className="text-neutral-300">
        Truths are not given. They are discovered.
      </p>
    </main>
  );
}
'@

    "src/config/contracts.ts" = @'
export const CONTRACTS = {
  halvToken: "0x90c13562C490d138E72B8ec2eFB2fD56a6FA74fb",
  vesting: "0x60FB6CCDAF28D8B3F54d411Cf0e0da82D6b2D2DF",
  farm: "0xa010044b4ecaa75B336C43665f9d30Fef773e8Fe",
  lpUsdc: "0xd3b5c687fcdb0a5713f7020f01719c37537871d4",
  lpWmon: "0xd50e913cb24158a0a354c5adeceb0c025393574e",
} as const;
'@

    "src/abis/halvToken.ts" = @'
export const halvTokenAbi = [
  // Paste the HALV token ABI here
] as const;
'@

    "src/abis/farm.ts" = @'
export const farmAbi = [
  // Paste the farm ABI here
] as const;
'@

    "src/abis/uniswapV2Pair.ts" = @'
export const uniswapV2PairAbi = [
  {
    type: "function",
    name: "token0",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "token1",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "address" }],
  },
  {
    type: "function",
    name: "getReserves",
    stateMutability: "view",
    inputs: [],
    outputs: [
      { name: "_reserve0", type: "uint112" },
      { name: "_reserve1", type: "uint112" },
      { name: "_blockTimestampLast", type: "uint32" },
    ],
  },
  {
    type: "function",
    name: "totalSupply",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "owner", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "allowance",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "approve",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;
'@
}

foreach ($file in $files.Keys) {
    Set-Content -Path $file -Value $files[$file] -Encoding UTF8
    Write-Host "Created file: $file" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done." -ForegroundColor Cyan
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Paste the HALV token ABI into src/abis/halvToken.ts"
Write-Host "2. Paste the farm ABI into src/abis/farm.ts"
Write-Host "3. Run: npm run dev"