"use client"

import { useState } from "react"

export default function BlockPreview({
  install,
  code,
  children,
}: {
  install: string
  code: string
  children: React.ReactNode
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(install)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-4 text-sm">
          <button
            onClick={() => setTab("preview")}
            className={tab === "preview" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}
          >
            Preview
          </button>
          <button
            onClick={() => setTab("code")}
            className={tab === "code" ? "text-white" : "text-zinc-500 hover:text-zinc-300"}
          >
            Code
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300 transition-colors hover:text-white"
        >
          {copied ? "Copied" : install}
        </button>
      </div>

      {tab === "preview" ? (
        <div>{children}</div>
      ) : (
        <pre className="overflow-x-auto p-6 text-sm text-zinc-300">
          <code>{code}</code>
        </pre>
      )}
    </div>
  )
}
