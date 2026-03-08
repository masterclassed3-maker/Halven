"use client";

import dynamic from "next/dynamic";

const FarmWidget = dynamic(() => import("./farm-widget"), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
      <p className="text-sm uppercase tracking-[0.22em] text-neutral-500">
        Wallet Controls
      </p>
      <p className="mt-3 text-sm text-neutral-400">
        Loading wallet interface...
      </p>
    </div>
  ),
});

export default function FarmWidgetLoader() {
  return <FarmWidget />;
}