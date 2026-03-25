"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Answer } from "@/types"
import { getNow } from "@/lib/time"
import { motion } from "framer-motion"
import ProgressBar from "@/components/ProgressBar"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/i18n"

export default function TestPage() {
  const router = useRouter()
  const { lang } = useLanguage()
  const t = translations[lang]

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = getNow()
  }, [])

  const correctAnswers = ["🔴", "30"]

  const handleAnswer = (option: string) => {
    const now = getNow()

    const answer: Answer = {
      questionId: current,
      selected: option,
      correct: option === correctAnswers[current],
      timeMs: now - startTimeRef.current
    }

    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    alert("Nice! ⚡")

    if (current + 1 < t.questions.length) {
      setCurrent(current + 1)
      startTimeRef.current = getNow()
    } else {
      localStorage.setItem("answers", JSON.stringify(newAnswers))
      router.push("/complete")
    }
  }

  const q = t.questions[current]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md">
        <ProgressBar current={current + 1} total={t.questions.length} />

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl mb-6 text-center">{q.question}</h2>

          {q.options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full bg-gray-800 hover:bg-indigo-600 transition p-4 mb-3 rounded-xl"
            >
              {opt}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}