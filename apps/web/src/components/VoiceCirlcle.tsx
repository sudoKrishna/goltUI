'use client'

import { useEffect, useRef } from 'react'
import  { Renderer, Program, Mesh, Triangle } from 'ogl'

export type VoiceState = 'idle' | 'listening' | 'speaking'

// ─── GLSL ────────────────────────────────────────────────────────────────────

const vertex = /* glsl */`
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = /* glsl */`
precision highp float;

uniform float uTime;
uniform float uSpeed;       // 0.3 idle → 1.0 speaking
uniform float uIntensity;   // blob spread
uniform vec3  uColorA;      // primary hue
uniform vec3  uColorB;      // secondary hue
uniform vec3  uColorC;      // accent hue
uniform float uAlpha;

varying vec2 vUv;

// ── Simplex noise helpers ──────────────────────────────────────────────────
vec3 mod289v3(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289v4(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x)  { return mod289v4(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289v3(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j  = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x  = x_ * ns.x + ns.yyyy;
  vec4 y  = y_ * ns.x + ns.yyyy;
  vec4 h  = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

// ── FBM: layered noise for cloud texture ──────────────────────────────────
float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * snoise(p);
    p  = p * 2.1 + vec3(1.7, 9.2, 3.4);
    a *= 0.5;
  }
  return v;
}

void main() {
  // map uv to [-1, 1]
  vec2 uv = vUv * 2.0 - 1.0;
  float dist = length(uv);

  // soft circle clip
  float alpha = smoothstep(1.0, 0.92, dist);
  if (alpha <= 0.0) discard;

  // ── cloud noise ──
  float t = uTime * uSpeed;
  vec3 p  = vec3(uv * uIntensity, t * 0.25);

  // domain-warp: distort the sample point by another layer of noise
  float warpX = fbm(p + vec3(0.0,  0.0, t * 0.15));
  float warpY = fbm(p + vec3(5.2,  1.3, t * 0.15));
  vec3  warped = p + 0.7 * vec3(warpX, warpY, 0.0);

  float n = fbm(warped);       // −1 … +1
  float t2 = n * 0.5 + 0.5;   //  0 … 1

  // second layer for colour variation
  float n2 = fbm(warped + vec3(3.0, 7.0, t * 0.1));
  float t3 = n2 * 0.5 + 0.5;

  // ── colour mix ──
  vec3 col = mix(uColorA, uColorB, t2);
       col = mix(col,     uColorC, t3 * 0.55);

  // ── sphere shading ──
  // reconstruct normal from UV position (unit sphere)
  float z     = sqrt(max(0.0, 1.0 - dist * dist));
  vec3  normal = normalize(vec3(uv, z));
  vec3  light  = normalize(vec3(-0.4, -0.6, 0.9));
  float diff   = max(dot(normal, light), 0.0);
  col = col * (0.6 + 0.55 * diff);

  // ── specular highlight ──
  vec3  viewDir  = vec3(0.0, 0.0, 1.0);
  vec3  halfDir  = normalize(light + viewDir);
  float spec     = pow(max(dot(normal, halfDir), 0.0), 48.0);
  col += vec3(spec * 0.35);

  // ── rim / edge darkening ──
  float rim = 1.0 - smoothstep(0.6, 1.0, dist);
  col *= mix(0.55, 1.0, rim);

  gl_FragColor = vec4(col, alpha * uAlpha);
}
`

// ─── Colour palettes per state ────────────────────────────────────────────

type Vec3Tuple = [number, number, number]

interface Palette {
  colorA: Vec3Tuple
  colorB: Vec3Tuple
  colorC: Vec3Tuple
  speed:  number
  intensity: number
}

const PALETTES: Record<VoiceState, Palette> = {
  idle: {
    colorA:    [0.55, 0.72, 0.78],   // muted blue-grey
    colorB:    [0.45, 0.62, 0.70],
    colorC:    [0.60, 0.76, 0.80],
    speed:     0.28,
    intensity: 1.4,
  },
  listening: {
    colorA:    [0.08, 0.62, 0.72],   // cyan-teal
    colorB:    [0.05, 0.48, 0.65],
    colorC:    [0.12, 0.75, 0.70],
    speed:     0.75,
    intensity: 1.8,
  },
  speaking: {
    colorA:    [0.10, 0.68, 0.65],   // teal
    colorB:    [0.28, 0.75, 0.50],   // teal-green
    colorC:    [0.05, 0.58, 0.72],   // blue accent
    speed:     0.55,
    intensity: 1.6,
  },
}

// ─── Lerp helpers ─────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

function lerpVec3(a: Vec3Tuple, b: Vec3Tuple, t: number): Vec3Tuple {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

// ─── Component ────────────────────────────────────────────────────────────

interface VoiceOrbProps {
  state?:   VoiceState
  size?:    number
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export function VoiceOrb({
  state    = 'speaking',
  size     = 180,
  onClick,
  className,
  style,
}: VoiceOrbProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const stateRef  = useRef<VoiceState>(state)
  const rafRef    = useRef<number>(0)

  // keep stateRef in sync
  useEffect(() => { stateRef.current = state }, [state])

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    // ── renderer ──
    const renderer = new Renderer({
      width:  size,
      height: size,
      alpha:  true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio, 2),
    })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    wrap.appendChild(gl.canvas)

    // ── fullscreen triangle (one draw call) ──
    const geometry = new Triangle(gl)

    const pal = PALETTES[stateRef.current]
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime:      { value: 0 },
        uSpeed:     { value: pal.speed },
        uIntensity: { value: pal.intensity },
        uColorA:    { value: pal.colorA },
        uColorB:    { value: pal.colorB },
        uColorC:    { value: pal.colorC },
        uAlpha:     { value: 1.0 },
      },
      transparent: true,
    })

    const mesh = new Mesh(gl, { geometry, program })

    // ── animation loop ──
    let current: Palette = { ...pal }
    let target:  Palette = { ...pal }
    let lerpT   = 1
    let lastState = stateRef.current

    function update(ts: number) {
      rafRef.current = requestAnimationFrame(update)

      const s = stateRef.current
      if (s !== lastState) {
        target    = PALETTES[s]
        lerpT     = 0
        lastState = s
      }

      // smooth transition
      if (lerpT < 1) {
        lerpT = Math.min(1, lerpT + 0.022)
        const e = 1 - Math.pow(1 - lerpT, 3)   // ease-out-cubic

        current = {
          colorA:    lerpVec3(current.colorA,    target.colorA,    e),
          colorB:    lerpVec3(current.colorB,    target.colorB,    e),
          colorC:    lerpVec3(current.colorC,    target.colorC,    e),
          speed:     lerp(current.speed,    target.speed,    e),
          intensity: lerp(current.intensity, target.intensity, e),
        }
      }

      program.uniforms.uTime.value      = ts * 0.001
      program.uniforms.uSpeed.value     = current.speed
      program.uniforms.uIntensity.value = current.intensity
      program.uniforms.uColorA.value    = current.colorA
      program.uniforms.uColorB.value    = current.colorB
      program.uniforms.uColorC.value    = current.colorC

      renderer.render({ scene: mesh })
    }

    rafRef.current = requestAnimationFrame(update)

    // cleanup
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (gl.canvas.parentNode) gl.canvas.parentNode.removeChild(gl.canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [size])

  return (
    <div
      ref={wrapRef}
      onClick={onClick}
      className={className}
      style={{
        position: 'relative',
        width:  size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
    >
      {/* mic icon overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        <svg
          width={size * 0.2}
          height={size * 0.2}
          viewBox="0 0 36 36"
          fill="none"
          style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }}
        >
          <rect x="13" y="3"  width="10" height="17" rx="5"  fill="white" opacity="0.95"/>
          <path d="M8 18a10 10 0 0 0 20 0"
            stroke="white" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.95"/>
          <line x1="18" y1="28" x2="18" y2="33"
            stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.95"/>
          <line x1="13" y1="33" x2="23" y2="33"
            stroke="white" strokeWidth="2.2" strokeLinecap="round" opacity="0.95"/>
        </svg>
      </div>
    </div>
  )
}