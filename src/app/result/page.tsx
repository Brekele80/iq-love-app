"use client"

import { useEffect, useState } from "react"
import { computeIQ } from "@/lib/scoring"
import { getPersonality } from "@/lib/personality"
import { getLoveArchetype } from "@/lib/love"
import { Answer } from "@/types"
import { supabase } from "@/lib/supabase"
import ShareCard from "@/components/ShareCard"
import AdBanner from "@/components/AdBanner"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/i18n"
import { getAnimal } from "@/lib/animal"

export default function ResultPage() {
  const { lang } = useLanguage()
  const t = translations[lang] || translations["en"]

  const [loading, setLoading] = useState(true)

  const [result, setResult] = useState<{
    iq: number
    personality: string
    love: string
    animal: {
      name: string
      description: string
    }
  } | null>(null)

  useEffect(() => {
    const run = async () => {
      const stored = localStorage.getItem("answers")
      if (!stored) return

      const answers: Answer[] = JSON.parse(stored)

      const iq = computeIQ(answers)
      const personality = getPersonality(answers)
      const love = getLoveArchetype(answers, personality)
      const animal = getAnimal(iq)

      setResult({
        iq,
        personality,
        love,
        animal
      })

      await supabase.from("results").insert([
        {
          iq,
          personality,
          love,
          animal: animal.name
        }
      ])

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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">

      <ShareCard
        iq={result.iq}
        personality={result.personality}
        love={result.love}
        animal={result.animal}
      />

      <AdBanner />

      <button
        onClick={() => (window.location.href = "/leaderboard")}
        className="bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-xl"
      >
        View Leaderboard 🏆
      </button>

    </div>
  )
}