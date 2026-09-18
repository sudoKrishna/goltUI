'use client'

import { VoiceOrb, VoiceState } from '@/components/VoiceCirlcle'
import { useState } from 'react'


export default function Page() {
  const [state, setState] = useState<VoiceState>('idle')

  const cycle = () => {
    setState(s => {
      const next: Record<VoiceState, VoiceState> = {
        idle: 'listening',
        listening: 'speaking',
        speaking: 'idle',
      }
      return next[s]
    })
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8">
      <VoiceOrb
        state={state}
        size={220}
        onClick={cycle}
      />

      {/* State label */}
      <p className="text-sm text-gray-400 tracking-wide capitalize">{state}</p>

      {/* Manual controls */}
      <div className="flex gap-3">
        {(['idle', 'listening', 'speaking'] as VoiceState[]).map(s => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
              state === s
                ? 'bg-teal-600 text-white border-transparent'
                : 'text-gray-500 border-gray-300 hover:border-gray-400'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </main>
  )
}