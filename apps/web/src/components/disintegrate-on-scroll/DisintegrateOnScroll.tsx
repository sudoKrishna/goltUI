"use client";

import {
  CSSProperties,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import html2canvas from "html2canvas";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./disintegrate-on-scroll.css";

gsap.registerPlugin(ScrollTrigger);

export type DisintegrateOptions = {
  /** Distance the section stays pinned while the effect plays. */
  pinDistance?: number;
  /** Sampling gap. Lower = more particles, higher = better performance. */
  particleGap?: number;
  /** How far the dust travels horizontally. */
  windDistance?: number;
  /** Vertical turbulence amount. */
  turbulence?: number;
  /** Upward lift as particles leave. */
  lift?: number;
  /** Particle size multiplier. */
  particleSize?: number;
  /** Delay range before individual particles start. */
  stagger?: number;
  /** How quickly the original DOM fades away. */
  contentFade?: number;
  /** Particle color override. By default pixels keep the source color. */
  color?: string;
  /** Reduce motion for accessibility. */
  reducedMotion?: boolean;
};

export type DisintegrateOnScrollProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  options?: DisintegrateOptions;
};

type Particle = {
  ox: number;
  oy: number;
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  seed: number;
  delay: number;
  drift: number;
};

const defaults: Required<DisintegrateOptions> = {
  pinDistance: 1300,
  particleGap: 2,
  windDistance: 620,
  turbulence: 80,
  lift: 75,
  particleSize: 1,
  stagger: 0.16,
  contentFade: 0.16,
  color: "",
  reducedMotion: false,
};

function seeded(seed: number) {
  const x = Math.sin(seed * 9999.91) * 43758.5453;
  return x - Math.floor(x);
}

export default function DisintegrateOnScroll({
  children,
  className = "",
  style,
  options: userOptions,
}: DisintegrateOnScrollProps) {
  const options = { ...defaults, ...userOptions };

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particlesRef = useRef<Particle[]>([]);
  const progressRef = useRef(0);
  const renderRef = useRef<() => void>(() => {});
  const snapshotRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return null;

    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, width: rect.width, height: rect.height };
  }, []);

  const capture = useCallback(async () => {
    const content = contentRef.current;
    const section = sectionRef.current;
    if (!content || !section) return;

    // Wait one frame so fonts/layout are settled.
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => resolve())
    );

    if ("fonts" in document) {
      try {
        await document.fonts.ready;
      } catch {}
    }

    const contentRect = content.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    const shot = await html2canvas(content, {
      backgroundColor: null,
      scale: 1,
      logging: false,
      useCORS: true,
      allowTaint: false,
    });

    snapshotRef.current = shot;

    const ctx = shot.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const image = ctx.getImageData(0, 0, shot.width, shot.height);
    const data = image.data;
    const gap = Math.max(2, options.particleGap);
    const next: Particle[] = [];

    for (let y = 0; y < shot.height; y += gap) {
      for (let x = 0; x < shot.width; x += gap) {
        const i = (y * shot.width + x) * 4;
        const a = data[i + 3] / 255;
        if (a < 0.12) continue;

        const seed = x * 0.0137 + y * 0.0713;
        const n = seeded(seed);

        // Correctly map the DOM screenshot into the section's canvas.
        const ox = contentRect.left - sectionRect.left + x;
        const oy = contentRect.top - sectionRect.top + y;

        next.push({
          ox,
          oy,
          size: (gap * (0.6 + n * 0.6)) * options.particleSize,
          r: data[i],
          g: data[i + 1],
          b: data[i + 2],
          alpha: a,
          seed,
          delay: n * options.stagger,
          drift: seeded(seed + 17.3) * 2 - 1,
        });
      }
    }

    particlesRef.current = next;
    setupCanvas();
    renderRef.current();
  }, [options, setupCanvas]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = section.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const p = progressRef.current;

    /*
     * The rendered children fade over [fadeStart, release]. The dust is
     * held exactly on top of them during that window and cross-fades in
     * as they fade out, so the text appears to turn into its own dust
     * instead of noisy dots fighting the still-readable text. Once the
     * hand-off is complete the dust is released to blow away.
     */
    const fadeStart = 0;
    const release = Math.min(
      0.92,
      fadeStart + options.contentFade
    );
    const flightRange = Math.max(
      0.001,
      1 - release - options.stagger
    );

    // 0 at the start of the fade, 1 once the DOM is gone.
    const appear = Math.max(
      0,
      Math.min(1, (p - fadeStart) / Math.max(0.001, release - fadeStart))
    );

    for (const particle of particlesRef.current) {
      const local = Math.max(
        0,
        Math.min(1, (p - release - particle.delay) / flightRange)
      );

      let x = particle.ox;
      let y = particle.oy;
      let size = particle.size;
      let alpha = particle.alpha * appear;

      if (local > 0) {
        const eased = 1 - Math.pow(1 - local, 3);

        // Stable noise: no Math.random() inside the render loop.
        const wave1 =
          Math.sin(particle.oy * 0.026 + particle.seed * 8 + local * 8.5) *
          options.turbulence *
          eased;

        const wave2 =
          Math.cos(particle.ox * 0.018 + particle.seed * 5 + local * 5.5) *
          options.turbulence *
          0.45 *
          eased;

        const wind =
          options.windDistance *
          eased *
          (0.65 + particle.drift * 0.22 + local * 0.35);

        x = particle.ox + wind + wave2;
        y =
          particle.oy +
          wave1 -
          options.lift * eased +
          particle.drift * 18 * eased;

        alpha =
          particle.alpha *
          Math.max(0, 1 - Math.pow(local, 1.35));

        size = particle.size * (1 + eased * 0.35);
      }

      if (alpha <= 0.002) continue;

      if (options.color) {
        ctx.globalAlpha = alpha;
        ctx.fillStyle = options.color;
        ctx.fillRect(x, y, size, size);
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = `rgba(${particle.r},${particle.g},${particle.b},${alpha})`;
        ctx.fillRect(x, y, size, size);
      }
    }
  }, [options]);

  renderRef.current = render;

  useLayoutEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (cancelled) return;
      await capture();
      if (cancelled) return;
      renderRef.current();
      ScrollTrigger.refresh();
    };

    init();

    const resizeObserver = new ResizeObserver(() => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        capture();
      });
    });

    if (sectionRef.current) resizeObserver.observe(sectionRef.current);

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [capture]);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    if (
      options.reducedMotion ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${options.pinDistance}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;

          // Keep the DOM visible at the beginning, then hand off to particles.
          const fade = Math.max(0.001, options.contentFade);
          const contentOpacity = Math.max(0, 1 - self.progress / fade);

          gsap.set(content, { opacity: contentOpacity });
          renderRef.current();
        },
      });
    }, section);

    return () => context.revert();
  }, [options]);

  return (
    <section
      ref={sectionRef}
      className={`disintegrate-on-scroll ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="disintegrate-on-scroll__canvas"
        aria-hidden="true"
      />

      <div ref={contentRef} className="disintegrate-on-scroll__content">
        {children}
      </div>
    </section>
  );
}
