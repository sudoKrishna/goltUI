"use client";

import LogoMarqueeRow from "./LogoMarqueeRow";

export default function LogoCloudTwo() {
  return (
    <div className="w-full bg-black py-16 text-center">
      <h2 className="text-3xl font-bold text-white">Trusted by Industry Leaders</h2>
      <p className="mx-auto mt-3 max-w-xl text-zinc-400">
        Our platform powers the most ambitious companies in the world.
      </p>

      <div className="mt-10">
        <LogoMarqueeRow />
      </div>

      <button className="mt-10 rounded-lg border border-white/15 bg-black px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/30">
        View our network
      </button>
    </div>
  );
}
