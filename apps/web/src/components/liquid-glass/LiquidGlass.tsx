"use client";

import React from "react";

/**
 * Liquid Glass — a frosted, optically-distorted glass surface.
 * Ported from the Kokonut UI liquid glass card (MIT) with the
 * dependencies removed so it drops straight into this project.
 */

const GLASS_SHADOW =
  "0 0 8px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08), inset 3px 3px 0.5px -3.5px rgba(255,255,255,0.09), inset -3px -3px 0.5px -3.5px rgba(255,255,255,0.85), inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6), inset 0 0 6px 6px rgba(255,255,255,0.12), inset 0 0 2px 2px rgba(255,255,255,0.06), 0 0 12px rgba(0,0,0,0.15)";

const DEFAULT_FILTER_SCALE = 30;
const BUTTON_FILTER_SCALE = 70;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

interface GlassFilterProps {
  id: string;
  scale?: number;
}

const GlassFilter = React.memo(function GlassFilter({
  id,
  scale = DEFAULT_FILTER_SCALE,
}: GlassFilterProps) {
  return (
    <svg aria-hidden className="hidden" focusable={false}>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          height="200%"
          id={id}
          width="200%"
          x="-50%"
          y="-50%"
        >
          <feTurbulence
            baseFrequency="0.05 0.05"
            numOctaves="1"
            result="turbulence"
            seed="1"
            type="fractalNoise"
          />
          <feGaussianBlur
            in="turbulence"
            result="blurredNoise"
            stdDeviation="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            result="displaced"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="B"
          />
          <feGaussianBlur in="displaced" result="finalBlur" stdDeviation="4" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
});

export type LiquidGlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  glassSize?: "sm" | "default" | "lg";
  glassEffect?: boolean;
};

const glassSizeClasses = {
  sm: "p-4",
  default: "p-6",
  lg: "p-8",
};

export function LiquidGlassCard({
  className,
  glassSize = "default",
  glassEffect = true,
  children,
  ...props
}: LiquidGlassCardProps) {
  const filterId = React.useId();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.06] backdrop-blur-[2px]",
        glassSizeClasses[glassSize],
        className
      )}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: GLASS_SHADOW }}
      />

      {glassEffect && (
        <>
          <div
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]"
            style={{ backdropFilter: `url("#${filterId}")` }}
          />
          <GlassFilter id={filterId} scale={DEFAULT_FILTER_SCALE} />
        </>
      )}

      <div className="relative z-10">{children}</div>

      <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
    </div>
  );
}

export type LiquidGlassButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export function LiquidGlassButton({
  className,
  children,
  ...props
}: LiquidGlassButtonProps) {
  const filterId = React.useId();

  return (
    <button
      type="button"
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-105 active:scale-[0.97]",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: GLASS_SHADOW }}
      />
      <span
        className="pointer-events-none absolute inset-0 isolate -z-10 overflow-hidden rounded-[inherit]"
        style={{ backdropFilter: `url("#${filterId}")` }}
      />
      <span className="relative z-10">{children}</span>
      <GlassFilter id={filterId} scale={BUTTON_FILTER_SCALE} />
    </button>
  );
}
