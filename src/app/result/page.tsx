"use client"

import { useEffect, useState } from "react"
import { computeIQ } from "@/lib/scoring"
import { getPersonality } from "@/lib/personality"
import { getLoveArchetype } from "@/lib/love"
import { Answer } from "@/types"
import { supabase } from "@/lib/supabase"

export default function ResultPage() {
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

      await supabase.from("results").insert([
        {
          iq,
          personality,
          love
        }
      ])

      setTimeout(() => setLoading(false), 2000)
    }

    run()
  }, [])

  if (loading || !result) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p>Analyzing your brain... 🧠</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Your Result</h1>

      <div className="bg-gray-900 p-6 rounded-2xl w-full max-w-md space-y-4">
        <p className="text-xl">🧠 IQ: {result.iq}</p>
        <p>🧬 Personality: {result.personality}</p>
        <p className="text-pink-400">❤️ {result.love}</p>
      </div>

      <button
        onClick={() =>
          navigator.share?.({
            text: `I got IQ ${result.iq} and ${result.personality}! Can you beat me?`
          })
        }
        className="mt-6 bg-purple-600 px-6 py-3 rounded-xl"
      >
        Share Result 🔥
      </button>
    </div>
  )
}