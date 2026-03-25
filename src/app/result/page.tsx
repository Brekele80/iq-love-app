"use client"

import { useEffect, useState } from "react"
import { computeIQ } from "@/lib/scoring"
import { getPersonality } from "@/lib/personality"
import { getLoveArchetype } from "@/lib/love"
import { Answer } from "@/types"
import { supabase } from "@/lib/supabase"
import ShareCard from "@/components/ShareCard"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/i18n"

export default function ResultPage() {
  const { lang } = useLanguage()
  const t = translations[lang]

  const [loading, setLoading] = useState(true)

  const [result, setResult] = useState<{
    iq: number
    personality: string
    love: string
  } | null>(null)

  useEffect(() => {
    const run = async () => {
      const stored = localStorage.getItem("answers")
      if (!stored) return

      const answers: Answer[] = JSON.parse(stored)

      const iq = computeIQ(answers)
      const personality = getPersonality(answers)
      const love = getLoveArchetype(answers, personality)

      setResult({ iq, personality, love })

      await supabase.from("results").insert([{ iq, personality, love }])

      setTimeout(() => setLoading(false), 2000)
    }

    run()
  }, [])

  if (loading || !result) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>{t.analyzing}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <ShareCard
        iq={result.iq}
        personality={result.personality}
        love={result.love}
      />
    </div>
  )
}