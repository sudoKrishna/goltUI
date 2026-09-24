"use client";

/**
 * Lightweight canvas substitute for a real WebGL cloud fragment shader —
 * soft blurred blobs drifting left to right, redrawn every frame. Matches
 * the `speed`/`count` prop shape of a shader-based version so it drops in
 * the same way, without needing actual GLSL.
 */

import { useEffect, useRef } from "react";

interface CloudShaderProps {
  speed?: number;
  count?: number;
  className?: string;
}

interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  opacity: number;
}

export function CloudShader({ speed = 1, count = 6, className = "" }: CloudShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cloudsRef = useRef<Cloud[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const el = canvas!.parentElement;
      width = el?.clientWidth ?? canvas!.clientWidth;
      height = el?.clientHeight ?? canvas!.clientHeight;
      canvas!.width = width;
      canvas!.height = height;

      cloudsRef.current = Array.from({ length: count }, (_, i) => ({
        x: (i / count) * width + Math.random() * width * 0.3,
        y: height * (0.15 + Math.random() * 0.5),
        scale: 0.6 + Math.random() * 0.8,
        speed: (0.15 + Math.random() * 0.25) * speed,
        opacity: 0.35 + Math.random() * 0.35,
      }));
    }

    function drawCloud(cloud: Cloud) {
      if (!ctx) return;
      const w = 160 * cloud.scale;
      const h = 60 * cloud.scale;
      ctx.save();
      ctx.filter = "blur(18px)";
      ctx.globalAlpha = cloud.opacity;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(cloud.x, cloud.y, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
      ctx.ellipse(cloud.x - w * 0.3, cloud.y + h * 0.15, w * 0.32, h * 0.4, 0, 0, Math.PI * 2);
      ctx.ellipse(cloud.x + w * 0.3, cloud.y + h * 0.1, w * 0.35, h * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function frame() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const cloud of cloudsRef.current) {
        cloud.x += cloud.speed;
        if (cloud.x - 100 > width) cloud.x = -100;
        drawCloud(cloud);
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed, count]);

  return <canvas ref={canvasRef} className={className} />;
}
