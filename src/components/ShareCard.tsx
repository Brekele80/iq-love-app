"use client"

import { toPng } from "html-to-image"
import { useRef } from "react"

type Props = {
  iq: number
  personality: string
  love: string
}

export default function ShareCard({ iq, personality, love }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!ref.current) return
    const dataUrl = await toPng(ref.current)

    const link = document.createElement("a")
    link.download = "my-result.png"
    link.href = dataUrl
    link.click()
  }

  const handleShare = () => {
    navigator.share?.({
      text: `I got IQ ${iq} and ${personality}! Can you beat me? 👀`
    })
  }

  return (
    <div className="flex flex-col items-center">

      <div
        ref={ref}
        className="relative bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl w-80 shadow-xl"
      >
        {/* TOP RIGHT BUTTONS */}
        <div className="absolute top-3 right-3 flex gap-2">

          <button
            onClick={handleShare}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-sm"
            title="Share"
          >
            🔗
          </button>

          <button
            onClick={handleDownload}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-sm"
            title="Download"
          >
            ⬇️
          </button>

        </div>

        {/* CONTENT */}
        <div className="text-center mt-4">

          <h2 className="text-lg opacity-70 mb-2">
            Your Brain Profile 🧠
          </h2>

          <p className="text-4xl font-bold mb-2">
            {iq}
          </p>

          <p className="text-indigo-300 font-medium">
            {personality}
          </p>

          <p className="text-pink-400 mt-2 font-medium">
            {love}
          </p>

          <p className="text-xs mt-4 opacity-60">
            Can you beat me? 👀
          </p>

        </div>
      </div>

    </div>
  )
}