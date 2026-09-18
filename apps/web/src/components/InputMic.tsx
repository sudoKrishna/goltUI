"use client"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

function MicIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 0 1-14 0M12 18v3M8 21h8" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </svg>
  )
}

function ArrowUpIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}

const BAR_COUNT = 24

export default function InputMic() {
  const [recording, setRecording] = useState(false)
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: BAR_COUNT }, () => 4))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        // Drop the oldest bar (left edge) and push a new one in on the
        // right — values flow leftward each tick, like a live recorder.
        setBars((prev) => [...prev.slice(1), 4 + Math.random() * 18])
      }, 90)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      setBars(Array.from({ length: BAR_COUNT }, () => 4))
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [recording])

  function handleMicClick() {
    // Toggles the recording UI only.
    // Real audio capture + speech-to-text wiring left as-is for now.
    setRecording((r) => !r)
  }

  return (
    <div className="mx-auto flex w-full max-w-xs items-center gap-2 rounded-full bg-zinc-900 p-2 shadow-sm">
      <AnimatePresence initial={false}>
        {recording && (
          <motion.button
            key="cancel"
            type="button"
            onClick={() => setRecording(false)}
            initial={{ opacity: 0, scale: 0.6, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: "auto" }}
            exit={{ opacity: 0, scale: 0.6, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white hover:rounded-full"
            aria-label="Cancel recording"
          >
            <XIcon />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative flex h-9 flex-1 items-center overflow-hidden px-2">
        <AnimatePresence mode="wait" initial={false}>
          {recording ? (
            <motion.div
              key="waveform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex h-full w-full items-center gap-[3px]"
            >
              {bars.map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: h }}
                  transition={{ duration: 0.09, ease: "linear" }}
                  className="w-[3px] flex-shrink-0 rounded-full bg-emerald-400"
                />
              ))}
            </motion.div>
          ) : (
            <motion.input
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              type="text"
              placeholder="Type a message..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-400"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Mic */}
      <button
        type="button"
        onClick={handleMicClick}
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition ${
          recording
            ? "bg-zinc-700 text-white hover:bg-zinc-600"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
        }`}
        aria-label={recording ? "Stop recording" : "Voice input"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {recording ? (
            <motion.span
              key="stop"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <StopIcon />
            </motion.span>
          ) : (
            <motion.span
              key="mic"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <MicIcon />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Send */}
      <motion.button
        type="button"
        animate={
          recording
            ? { y: [0, -5, 0], scale: [1, 1.1, 1] }
            : { y: 0, scale: 1 }
        }
        transition={
          recording
            ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
        whileTap={{ scale: 0.95 }}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-zinc-800 text-white transition hover:bg-zinc-700"
        aria-label="Send message"
      >
        <ArrowUpIcon />
      </motion.button>
    </div>
  )
}
