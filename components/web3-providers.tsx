"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";

const config = createConfig({
  chains: [
    {
      id: 143,
      name: "Monad Mainnet",
      nativeCurrency: {
        name: "Monad",
        symbol: "MON",
        decimals: 18,
      },
      rpcUrls: {
        default: {
          http: ["https://rpc.monad.xyz"],
        },
      },
      blockExplorers: {
        default: {
          name: "Monad Explorer",
          url: "https://explorer.monad.xyz",
        },
      },
    },
  ],
  connectors: [injected()],
  transports: {
    143: http("https://rpc.monad.xyz"),
  },
});

export function Web3Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}