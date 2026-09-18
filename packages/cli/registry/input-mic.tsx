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

// The Web Speech API isn't in TypeScript's DOM lib yet — minimal shape
// for what we actually use.
interface SpeechRecognitionResultLike {
  isFinal: boolean
  0: { transcript: string }
}
interface SpeechRecognitionEventLike {
  resultIndex: number
  results: ArrayLike<SpeechRecognitionResultLike>
}
interface SpeechRecognitionLike {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: ((event: SpeechRecognitionEventLike) => void) | null
  onerror: ((event: unknown) => void) | null
  start: () => void
  stop: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike
    webkitSpeechRecognition?: new () => SpeechRecognitionLike
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export interface InputMicProps {
  /** Controlled text value. Omit to let the component manage its own state. */
  value?: string
  /** Initial text when uncontrolled. */
  defaultValue?: string
  /** Fires whenever the text changes (typing or speech). */
  onChange?: (value: string) => void
  /**
   * Fires with the live transcript while the mic is on, converting speech
   * to text via the browser's SpeechRecognition API. This is what you
   * wire up to actually turn the mic into voice-to-text — it's additive
   * to `onChange`, so you can use either or both.
   */
  onTranscript?: (text: string, isFinal: boolean) => void
  /** Fires when the send button is pressed, with the current text. */
  onSend?: (value: string) => void
  placeholder?: string
  /** BCP-47 language tag for speech recognition. Defaults to "en-US". */
  lang?: string
  className?: string
}

export default function InputMic({
  value,
  defaultValue = "",
  onChange,
  onTranscript,
  onSend,
  placeholder = "Type a message...",
  lang = "en-US",
  className = "",
}: InputMicProps) {
  const [recording, setRecording] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const text = value ?? internalValue
  const textRef = useRef(text)
  textRef.current = text

  const [bars, setBars] = useState<number[]>(() => Array.from({ length: BAR_COUNT }, () => 4))
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const streamRef = useRef<MediaStream | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataArrayRef = useRef<Uint8Array | null>(null)
  const smoothedRef = useRef(4)
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)

  function setText(next: string) {
    if (value === undefined) setInternalValue(next)
    onChange?.(next)
  }

  useEffect(() => {
    if (recording) {
      intervalRef.current = setInterval(() => {
        const analyser = analyserRef.current
        const dataArray = dataArrayRef.current

        let target = 4
        if (analyser && dataArray) {
          // Time-domain samples center on 128 at silence; deviation from
          // that is the actual amplitude, so RMS gives a real loudness
          // reading instead of a flattened frequency average.
          analyser.getByteTimeDomainData(dataArray as Uint8Array<ArrayBuffer>)
          let sumSquares = 0
          for (let i = 0; i < dataArray.length; i++) {
            const normalized = (dataArray[i] - 128) / 128         
            sumSquares += normalized * normalized
          }
          const rms = Math.sqrt(sumSquares / dataArray.length)
          const boosted = Math.min(1, rms * 5) // gain so normal speech visibly moves the bars
          target = 4 + boosted * 34
        }

        // Fast attack, slow release — like a real level meter: bars snap
        // up quickly on a loud sound, then decay gradually afterward,
        // instead of jumping straight between raw readings each tick.
        const prev = smoothedRef.current
        const smoothing = target > prev ? 0.55 : 0.12
        const next = prev + (target - prev) * smoothing
        smoothedRef.current = next

        // Drop the oldest bar (left edge) and push the newest reading in
        // on the right — values flow leftward each tick, like a live recorder.
        setBars((prevBars) => [...prevBars.slice(1), next])
      }, 130)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      smoothedRef.current = 4
      setBars(Array.from({ length: BAR_COUNT }, () => 4))
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [recording])

  // Release the mic, audio graph, and recognizer however recording ends
  // (stop click, cancel click, or the component unmounting).
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop())
      audioCtxRef.current?.close()
      recognitionRef.current?.stop()
    }
  }, [])

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)

      streamRef.current = stream
      audioCtxRef.current = audioCtx
      analyserRef.current = analyser
      dataArrayRef.current = new Uint8Array(analyser.fftSize)

      // Speech-to-text: optional, only runs if the browser supports it
      // and only matters if you pass onTranscript (or rely on onChange).
      const SpeechRecognitionCtor = getSpeechRecognition()
      if (SpeechRecognitionCtor) {
        const recognition = new SpeechRecognitionCtor()
        recognition.continuous = true
        recognition.interimResults = true
        recognition.lang = lang

        recognition.onresult = (event) => {
          let finalTranscript = ""
          let interimTranscript = ""
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i]
            const transcript = result[0].transcript
            if (result.isFinal) finalTranscript += transcript
            else interimTranscript += transcript
          }
          if (finalTranscript) {
            const current = textRef.current
            setText((current ? current + " " : "") + finalTranscript.trim())
            onTranscript?.(finalTranscript.trim(), true)
          } else if (interimTranscript) {
            onTranscript?.(interimTranscript.trim(), false)
          }
        }
        recognition.onerror = (err) => console.error("Speech recognition error", err)

        recognitionRef.current = recognition
        recognition.start()
      }

      setRecording(true)
    } catch (err) {
      console.error("Microphone access denied", err)
    }
  }

  function stopRecording() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    audioCtxRef.current?.close()
    recognitionRef.current?.stop()
    streamRef.current = null
    audioCtxRef.current = null
    analyserRef.current = null
    dataArrayRef.current = null
    recognitionRef.current = null
    setRecording(false)
  }

  function handleMicClick() {
    if (recording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  return (
    <div className={`mx-auto flex w-full max-w-sm items-center gap-2 rounded-full bg-zinc-900 p-2 shadow-sm ${className}`}>
      <AnimatePresence initial={false}>
        {recording && (
          <motion.button
            key="cancel"
            type="button"
            onClick={stopRecording}
            initial={{ opacity: 0, scale: 0.6, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: "auto" }}
            exit={{ opacity: 0, scale: 0.6, width: 0 }}
            transition={{ duration: 0.2 }}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
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
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="w-[3px] flex-shrink-0 rounded-full bg-white"
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
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={placeholder}
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
        onClick={() => onSend?.(text)}
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
