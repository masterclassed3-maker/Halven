import { createPublicClient, defineChain, http } from "viem";

const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID || "143");
const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.monad.xyz";

const monadCustomChain = defineChain({
  id: chainId,
  name: chainId === 143 ? "Monad Mainnet" : "Monad Testnet",
  nativeCurrency: {
    name: "MON",
    symbol: "MON",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [rpcUrl],
    },
  },
});

export const publicClient = createPublicClient({
  chain: monadCustomChain,
  transport: http(rpcUrl),
});