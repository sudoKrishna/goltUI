"use client"

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"

const ROUND_SECONDS = 30
const BEST_KEY = "gotlui-orb-catcher-best"
const FALL_START = { top: "-8%", opacity: 0 }
const FALL_TARGET = { top: "92%", opacity: 1 }

type Status = "idle" | "playing" | "over"
type OrbKind = "normal" | "gold"
type Orb = { id: number; x: number; duration: number; kind: OrbKind }
type Pop = { id: number; x: number; kind: "catch" | "miss"; label: string; gold: boolean }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function OrbCatcher() {
  const boardRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)
  const popIdRef = useRef(0)
  const keysRef = useRef({ left: false, right: false })
  const statusRef = useRef<Status>("idle")

  const [boardW, setBoardW] = useState(0)
  const [status, setStatus] = useState<Status>("idle")
  const [orbs, setOrbs] = useState<Orb[]>([])
  const [pops, setPops] = useState<Pop[]>([])
  const [score, setScore] = useState(0)
  const [combo, setCombo] = useState(0)
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS)
  const [best, setBest] = useState(0)

  const targetX = useMotionValue(0.5)
  const springX = useSpring(targetX, { stiffness: 350, damping: 32, mass: 0.7 })
  const catcherW = boardW ? clamp(boardW * 0.2, 84, 150) : 120
  const hitHalf = boardW ? catcherW / 2 / boardW : 0.1
  const catcherLeft = useTransform(springX, (value) => value * boardW)

  // Keep a ref of the countdown so the spawn loop can read it without re-subscribing.
  const timeLeftRef = useRef(ROUND_SECONDS)
  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  useEffect(() => {
    statusRef.current = status
  }, [status])

  // Measure the board so the catcher and its hitbox scale responsively.
  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    const update = () => setBoardW(el.clientWidth)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Load the best score once.
  useEffect(() => {
    const raw = window.localStorage.getItem(BEST_KEY)
    const value = raw ? Number(raw) : 0
    if (!Number.isNaN(value)) setBest(value)
  }, [])

  // Keyboard controls.
  useEffect(() => {
    const isLeft = (key: string) => key === "ArrowLeft" || key === "a" || key === "A"
    const isRight = (key: string) => key === "ArrowRight" || key === "d" || key === "D"
    const down = (event: KeyboardEvent) => {
      if (isLeft(event.key)) {
        keysRef.current.left = true
        if (statusRef.current === "playing") event.preventDefault()
      }
      if (isRight(event.key)) {
        keysRef.current.right = true
        if (statusRef.current === "playing") event.preventDefault()
      }
    }
    const up = (event: KeyboardEvent) => {
      if (isLeft(event.key)) keysRef.current.left = false
      if (isRight(event.key)) keysRef.current.right = false
    }
    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)
    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  // Smooth keyboard-driven movement of the spring target.
  useAnimationFrame((_, delta) => {
    if (status !== "playing") return
    const speed = 0.0009 * delta
    const min = hitHalf
    const max = 1 - hitHalf
    if (keysRef.current.left) targetX.set(clamp(targetX.get() - speed, min, max))
    if (keysRef.current.right) targetX.set(clamp(targetX.get() + speed, min, max))
  })

  // Round countdown.
  useEffect(() => {
    if (status !== "playing") return
    const id = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          window.clearInterval(id)
          setStatus("over")
          return 0
        }
        return current - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [status])

  // Persist the best score when the round ends.
  useEffect(() => {
    if (status !== "over") return
    setBest((prev) => {
      if (score > prev) {
        window.localStorage.setItem(BEST_KEY, String(score))
        return score
      }
      return prev
    })
  }, [status, score])

  // Clear the board when the round ends.
  useEffect(() => {
    if (status === "over") {
      setOrbs([])
      setPops([])
    }
  }, [status])

  const addPop = useCallback((x: number, kind: Pop["kind"], label: string, gold = false) => {
    const id = popIdRef.current++
    setPops((prev) => [...prev, { id, x, kind, label, gold }])
    window.setTimeout(() => {
      setPops((prev) => prev.filter((pop) => pop.id !== id))
    }, 650)
  }, [])

  const resolveOrb = useCallback(
    (orb: Orb) => {
      setOrbs((prev) => prev.filter((item) => item.id !== orb.id))
      if (status !== "playing") return

      const caught = Math.abs(orb.x - springX.get()) <= hitHalf + 0.015
      if (caught) {
        const bonus = combo >= 5 ? 1 : 0
        setScore((current) => current + (orb.kind === "gold" ? 5 : 1) + bonus)
        setCombo((current) => current + 1)
        addPop(orb.x, "catch", orb.kind === "gold" ? "+5" : "+1", orb.kind === "gold")
      } else {
        setCombo(0)
        addPop(orb.x, "miss", "miss")
      }
    },
    [status, springX, hitHalf, combo, addPop]
  )

  // Spawn orbs on a self-scheduling loop that speeds up as the round goes on.
  useEffect(() => {
    if (status !== "playing") return
    let cancelled = false
    let timeoutId = 0

    const spawn = () => {
      if (cancelled) return
      const elapsed = ROUND_SECONDS - timeLeftRef.current
      const id = idRef.current++
      const kind: OrbKind = Math.random() < 0.16 ? "gold" : "normal"
      const duration = clamp(2.7 - elapsed * 0.035 + (Math.random() * 0.5 - 0.25), 1.15, 2.9)
      const x = clamp(0.08 + Math.random() * 0.84, 0.08, 0.92)

      setOrbs((prev) => [...prev, { id, x, duration, kind }])

      const base = Math.max(300, 820 - elapsed * 26)
      timeoutId = window.setTimeout(spawn, base + Math.random() * 260)
    }

    spawn()
    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [status])

  const movePointer = useCallback(
    (clientX: number) => {
      const el = boardRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const next = (clientX - rect.left) / rect.width
      targetX.set(clamp(next, hitHalf, 1 - hitHalf))
    },
    [targetX, hitHalf]
  )

  const startGame = useCallback(() => {
    setScore(0)
    setCombo(0)
    setOrbs([])
    setPops([])
    setTimeLeft(ROUND_SECONDS)
    timeLeftRef.current = ROUND_SECONDS
    targetX.set(0.5)
    setStatus("playing")
  }, [targetX])

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-5">
          <span className="text-zinc-500">
            Score <span className="ml-1 font-semibold tabular-nums text-white">{score}</span>
          </span>
          <span className="text-zinc-500">
            Combo <span className="ml-1 font-semibold tabular-nums text-white">x{combo}</span>
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="text-zinc-500">
            Best <span className="ml-1 font-semibold tabular-nums text-white">{best}</span>
          </span>
          <span
            className={`font-semibold tabular-nums ${timeLeft <= 5 && status === "playing" ? "text-amber-300" : "text-zinc-300"}`}
          >
            {status === "playing" ? `${timeLeft}s` : `${ROUND_SECONDS}s`}
          </span>
        </div>
      </div>

      <div
        ref={boardRef}
        onPointerMove={(event) => movePointer(event.clientX)}
        onPointerDown={(event) => movePointer(event.clientX)}
        className="relative h-[420px] w-full touch-none select-none overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_50%_120%,rgba(251,191,36,0.12),transparent_60%)] sm:h-[520px]"
      >
        {/* faint grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* falling orbs */}
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            initial={FALL_START}
            animate={FALL_TARGET}
            transition={{
              top: { duration: orb.duration, ease: "linear" },
              opacity: { duration: 0.2 },
            }}
            onAnimationComplete={() => resolveOrb(orb)}
            style={{ left: `${orb.x * 100}%` }}
            className="absolute -translate-x-1/2"
          >
            <span
              className={
                orb.kind === "gold"
                  ? "block h-6 w-6 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 shadow-[0_0_22px_rgba(251,191,36,0.85)]"
                  : "block h-5 w-5 rounded-full bg-gradient-to-br from-white to-zinc-400 shadow-[0_0_16px_rgba(255,255,255,0.55)]"
              }
            />
          </motion.div>
        ))}

        {/* catcher */}
        <motion.div
          style={{ left: catcherLeft, width: catcherW }}
          className="absolute top-[92%] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-amber-300 via-white to-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.55)]" />
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90 blur-[0.5px]"
          />
        </motion.div>

        {/* score / miss pops */}
        <AnimatePresence>
          {pops.map((pop) => (
            <motion.div
              key={pop.id}
              initial={{ opacity: 0, y: 0, scale: 0.6 }}
              animate={{ opacity: 1, y: -28, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.85 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ left: `${pop.x * 100}%` }}
              className={`pointer-events-none absolute top-[84%] -translate-x-1/2 text-sm font-semibold ${
                pop.gold
                  ? "text-amber-300"
                  : pop.kind === "catch"
                    ? "text-emerald-300"
                    : "text-zinc-500"
              }`}
            >
              {pop.label}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* overlays */}
        <AnimatePresence>
          {status !== "playing" && (
            <motion.div
              key={status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-black/70 px-6 text-center backdrop-blur-sm"
            >
              {status === "idle" ? (
                <>
                  <h2 className="text-2xl font-semibold text-white">Orb Catcher</h2>
                  <p className="max-w-sm text-sm text-zinc-400">
                    Move with your mouse, finger, or the{" "}
                    <span className="text-zinc-200">← →</span> keys. Catch the orbs —
                    gold ones are worth 5.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold text-white">Time&apos;s up!</h2>
                  <p className="text-sm text-zinc-400">
                    You scored{" "}
                    <span className="font-semibold text-white">{score}</span>
                    {score >= best && score > 0 ? " — a new best!" : ""}
                  </p>
                </>
              )}

              <motion.button
                type="button"
                onClick={startGame}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="mt-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
              >
                {status === "idle" ? "Play" : "Play again"}
              </motion.button>

              <span className="text-xs text-zinc-500">Best: {best}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
