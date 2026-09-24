"use client";

/**
 * Demo wrapper around VoiceBeam ("voice-glow"), originally from
 * Libraries.dev (https://libraries.dev/voice) by Jakub Antalik, MIT
 * licensed. Copied in as-is (it's designed to be dropped into a project
 * directly) — only this demo wrapper is original.
 */

import { useState } from "react";
import { VoiceBeam } from "./VoiceBeam";
import { useMicrophone } from "./useMicrophone";

export default function VoiceGlowDemo() {
  const mic = useMicrophone();
  const [processing, setProcessing] = useState(false);

  function handleMicClick() {
    if (mic.state === "live") {
      mic.stop();
    } else {
      mic.start();
    }
  }

  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <VoiceBeam
        stream={mic.stream}
        type="default"
        colorVariant="colorful"
        theme="dark"
        processing={processing}
      >
        <div className="flex w-[350px] items-center gap-3 rounded-2xl bg-zinc-900 px-4 py-3">
          <button
            onClick={handleMicClick}
            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm transition-colors ${
              mic.state === "live"
                ? "bg-red-500 text-white"
                : "bg-white/10 text-zinc-300 hover:bg-white/20"
            }`}
          >
            {mic.state === "live" ? "■" : "●"}
          </button>
          <span className="text-sm text-zinc-400">
            {mic.state === "live" ? "Listening — speak into your mic" : "Click to start the mic"}
          </span>
        </div>
      </VoiceBeam>

      <label className="flex items-center gap-2 text-xs text-zinc-500">
        <input
          type="checkbox"
          checked={processing}
          onChange={(e) => setProcessing(e.target.checked)}
        />
        Simulate &quot;processing&quot; state
      </label>

      {mic.state === "denied" && (
        <p className="text-xs text-red-400">Microphone access was denied.</p>
      )}
    </div>
  );
}
