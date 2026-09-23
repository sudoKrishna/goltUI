"use client"

import { useState, useCallback } from "react"
import BorderBeam from "./BorderBeam"

type ColorVariant =
  | "colorful"
  | "mono"
  | "ocean"
  | "sunset"
  | "forest"
  | "candy"
  | "ice"
  | "gold"

const COLOR_OPTIONS: { value: ColorVariant; label: string }[] = [
  { value: "colorful", label: "Colorful" },
  { value: "ocean", label: "Ocean" },
  { value: "sunset", label: "Sunset" },
  { value: "forest", label: "Forest" },
  { value: "candy", label: "Candy" },
  { value: "ice", label: "Ice" },
  { value: "gold", label: "Gold" },
  { value: "mono", label: "Mono" },
]

/**
 * Live demo: chat-style input wrapped in BorderBeam.
 * Mic opens → Stop button appears; optional theme / color controls.
 */
export default function BorderBeamDemo() {
  const [value, setValue] = useState("")
  const [listening, setListening] = useState(false)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [colorVariant, setColorVariant] = useState<ColorVariant>("colorful")
  const [size, setSize] = useState<"md" | "line">("line")

  const startMic = useCallback(async () => {
    try {
      // Request mic so the gesture is real (optional stream — BorderBeam is visual only)
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setListening(true)
    } catch {
      // Permission denied or unsupported — still show Stop so the UI can be demoed
      setListening(true)
    }
  }, [])

  const stopMic = useCallback(() => {
    setListening(false)
  }, [])

  const isDark = theme === "dark"

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4 py-8">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-white/10"
        >
          Theme: {theme}
        </button>
        <button
          type="button"
          onClick={() => setSize(size === "line" ? "md" : "line")}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:bg-white/10"
        >
          Size: {size}
        </button>
        {COLOR_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setColorVariant(opt.value)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              colorVariant === opt.value
                ? "border-white/30 bg-white/15 text-white"
                : "border-white/10 bg-white/5 text-zinc-400 hover:bg-white/10"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Input + mic / stop */}
      <div className="w-full max-w-md">
        <BorderBeam
          size={size}
          colorVariant={colorVariant}
          theme={theme}
          active={true}
          strength={listening ? 1 : 0.85}
        >
          <div
            className={`flex items-center gap-2 rounded-2xl border px-3 py-2.5 ${
              isDark
                ? "border-white/10 bg-zinc-900"
                : "border-black/10 bg-white"
            }`}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={listening ? "Listening…" : "Type a message or use the mic"}
              className={`min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 ${
                isDark ? "text-white" : "text-zinc-900"
              }`}
            />

            {listening ? (
              <button
                type="button"
                onClick={stopMic}
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-500"
                aria-label="Stop microphone"
              >
                <StopIcon />
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={startMic}
                className={`flex shrink-0 items-center justify-center rounded-full p-2 transition ${
                  isDark
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "bg-black/5 text-zinc-800 hover:bg-black/10"
                }`}
                aria-label="Start microphone"
              >
                <MicIcon />
              </button>
            )}
          </div>
        </BorderBeam>

        {listening && (
          <p className="mt-2 text-center text-xs text-zinc-500">
            Microphone is on — press Stop to end
          </p>
        )}
      </div>
    </div>
  )
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path
        d="M19 11a7 7 0 0 1-14 0M12 18v3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  )
}
