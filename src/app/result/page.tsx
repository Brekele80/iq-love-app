"use client"

import { computeIQ } from "@/lib/scoring"
import { getPersonality } from "@/lib/personality"
import { getLoveArchetype } from "@/lib/love"
import { Answer } from "@/types"

export default function ResultPage() {
  const stored =
    typeof window !== "undefined"
      ? localStorage.getItem("answers")
      : null

  if (!stored) return <div className="text-white p-6">No data</div>

  const answers: Answer[] = JSON.parse(stored)

  const iq = computeIQ(answers)
  const personality = getPersonality(answers)
  const love = getLoveArchetype(answers, personality)

  return (
    <div className="p-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl mb-4">Your Result</h1>

      <p>🧠 IQ: {iq}</p>
      <p>🧬 Personality: {personality}</p>
      <p>❤️ Love Style: {love}</p>
    </div>
  )
}