"use client";

import { useEffect, useRef, useState } from "react";
import { LiquidGlassButton, LiquidGlassCard } from "./LiquidGlass";

const VOLUME_BAR_COUNT = 8;
const SEEK_JUMP_SECONDS = 5;
const STATIC_BAR_HEIGHT = "6px";

const formatTime = (timeInSeconds: number): string => {
  if (!Number.isFinite(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

/* --- Inline icons (keeps this component dependency-free) --- */

function IconPlay({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

function IconPause({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function IconArrowLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

function IconArrowRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function IconMore({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}

/* --- Volume bars --- */

function VolumeBars({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: VOLUME_BAR_COUNT }, (_, i) => ({
    id: `bar-${i}`,
    delay: i * 0.1,
  }));

  return (
    <div className="pointer-events-none flex h-8 w-10 items-end gap-0.5">
      {bars.map((bar) => (
        <div
          key={bar.id}
          className={`w-[3px] rounded-sm ${isPlaying ? "animate-bounce-music" : ""}`}
          style={{
            height: isPlaying ? undefined : STATIC_BAR_HEIGHT,
            animationDelay: `${bar.delay}s`,
            background: "linear-gradient(to top, #FF2E55, #FF6B88)",
          }}
        />
      ))}
    </div>
  );
}

/* --- Progress bar --- */

function ProgressBar({
  currentTime,
  totalDuration,
  onSeek,
}: {
  currentTime: number;
  totalDuration: number;
  onSeek: (newTime: number) => void;
}) {
  const progress = totalDuration > 0 ? (currentTime / totalDuration) * 100 : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(Math.min(Math.max(0, percent * totalDuration), totalDuration));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      onSeek(Math.min(currentTime + SEEK_JUMP_SECONDS, totalDuration));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      onSeek(Math.max(currentTime - SEEK_JUMP_SECONDS, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      onSeek(0);
    } else if (e.key === "End") {
      e.preventDefault();
      onSeek(totalDuration);
    }
  };

  return (
    <>
      <div className="flex justify-between text-xs font-medium text-white/50">
        <span className="tabular-nums">{formatTime(currentTime)}</span>
        <span className="tabular-nums">{formatTime(totalDuration)}</span>
      </div>
      <div
        aria-label="Seek progress bar"
        aria-valuemax={totalDuration}
        aria-valuemin={0}
        aria-valuenow={currentTime}
        aria-valuetext={`${formatTime(currentTime)} of ${formatTime(totalDuration)}`}
        className="relative z-10 h-1 w-full cursor-pointer overflow-hidden rounded-full bg-white/15"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={0}
      >
        <div
          className="h-full bg-gradient-to-r from-[#FF2E55] to-[#FF6B88] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}

/* --- Demo --- */

const TRACK = {
  title: "Paint The Town Red",
  artist: "Doja Cat",
  src: "/music/paint-the-town-red.mp3",
  cover: "/music/paint-the-town-red.jpg",
};

export default function LiquidGlassDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Pause playback when scrolled out of view.
  useEffect(() => {
    if (!isVisible) audioRef.current?.pause();
  }, [isVisible]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  const handleSeek = (newTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const glassButton =
    "h-10 w-10 rounded-full bg-transparent text-white/70 hover:bg-white/10";

  return (
    <div
      ref={rootRef}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-black p-6 sm:p-10"
    >
      <audio ref={audioRef} src={TRACK.src} preload="metadata" />

      {/* Colourful light behind the glass so the distortion is visible */}
      <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-fuchsia-500/40 blur-3xl" />
      <div className="pointer-events-none absolute top-6 right-0 h-56 w-56 rounded-full bg-sky-500/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-emerald-500/30 blur-3xl" />

      <div className="relative mx-auto w-full max-w-sm">
        <LiquidGlassCard className="flex flex-col gap-3.5 rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <div className="relative mb-4 mr-2 h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-pink-400 via-pink-300 to-rose-200 shadow-lg ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={`Album art for ${TRACK.title} by ${TRACK.artist}`}
                className="h-full w-full object-cover"
                height={64}
                width={64}
                src={TRACK.cover}
              />
            </div>

            <div className="flex-1 overflow-hidden">
              <h3 className="overflow-hidden text-lg font-semibold text-ellipsis whitespace-nowrap text-white">
                {TRACK.title}
              </h3>
              <p className="mt-0.5 text-sm text-white/60">{TRACK.artist}</p>
            </div>

            <VolumeBars isPlaying={isPlaying} />
          </div>

          <div className="flex flex-col gap-2">
            <ProgressBar
              currentTime={currentTime}
              onSeek={handleSeek}
              totalDuration={duration}
            />

            <div className="mt-1 flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <LiquidGlassButton
                  aria-label="Previous track"
                  className={glassButton}
                >
                  <IconArrowLeft className="size-4" />
                </LiquidGlassButton>
                <LiquidGlassButton
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className={`${glassButton} h-11 w-11`}
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <IconPause className="size-5" />
                  ) : (
                    <IconPlay className="size-5" />
                  )}
                </LiquidGlassButton>
                <LiquidGlassButton
                  aria-label="Next track"
                  className={glassButton}
                >
                  <IconArrowRight className="size-4" />
                </LiquidGlassButton>
              </div>
              <LiquidGlassButton
                aria-label="More options"
                className={glassButton}
              >
                <IconMore className="size-4" />
              </LiquidGlassButton>
            </div>
          </div>
        </LiquidGlassCard>
      </div>
    </div>
  );
}
