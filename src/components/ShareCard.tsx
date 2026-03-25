"use client"

import { toPng } from "html-to-image"
import { useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/i18n"

type Props = {
  iq: number
  personality: string
  love: string
}

export default function ShareCard({ iq, personality, love }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { lang } = useLanguage()
  const t = translations[lang]

  const handleDownload = async () => {
    if (!ref.current) return
    const dataUrl = await toPng(ref.current)

    const link = document.createElement("a")
    link.download = "result.png"
    link.href = dataUrl
    link.click()
  }

  const handleShare = () => {
    navigator.share?.({
      text: `IQ ${iq} • ${personality} • ${love}`
    })
  }

  return (
    <div className="flex flex-col items-center">

      <div
        ref={ref}
        className="relative bg-linear-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl w-80 shadow-xl"
      >
        <div className="absolute top-3 right-3 flex gap-2">
          <button onClick={handleShare} className="bg-white/10 p-2 rounded-lg">🔗</button>
          <button onClick={handleDownload} className="bg-white/10 p-2 rounded-lg">⬇️</button>
        </div>

        <div className="text-center mt-4">
          <h2 className="text-lg opacity-70">{t.resultTitle}</h2>

          <p className="text-4xl font-bold mt-2">{iq}</p>

          <p className="text-indigo-300">{personality}</p>
          <p className="text-pink-400">{love}</p>

          <p className="text-xs mt-4 opacity-60">
            {t.canYouBeat}
          </p>
        </div>
      </div>
    </div>
  )
}