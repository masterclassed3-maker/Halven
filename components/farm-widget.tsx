"use client";

import { Web3Providers } from "./web3-providers";
import FarmControls from "./farm-controls";

export default function FarmWidget() {
  return (
    <Web3Providers>
      <FarmControls />
    </Web3Providers>
  );
}