"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Answer } from "@/types"
import { getNow } from "@/lib/time"
import { motion } from "framer-motion"
import ProgressBar from "@/components/ProgressBar"

const questions = [
  {
    id: 1,
    question: "🔵 🔴 🔵 🔴 🔵 ?",
    options: ["🔴", "🔵", "🟢", "🔺"],
    correct: "🔴"
  },
  {
    id: 2,
    question: "15% of 200?",
    options: ["20", "25", "30", "35"],
    correct: "30"
  }
]

export default function TestPage() {
  const router = useRouter()

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = getNow()
  }, [])

  const handleAnswer = (option: string) => {
    const q = questions[current]

    const now = getNow()

    const answer: Answer = {
      questionId: q.id,
      selected: option,
      correct: option === q.correct,
      timeMs: now - startTimeRef.current
    }

    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    // ✅ MICRO FEEDBACK (here)
    alert("Nice! ⚡")

    if (current + 1 < questions.length) {
      setCurrent(current + 1)
      startTimeRef.current = getNow()
    } else {
      localStorage.setItem("answers", JSON.stringify(newAnswers))
      router.push("/result")
    }
  }

  const q = questions[current]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md">
        <ProgressBar current={current + 1} total={questions.length} />

        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-xl mb-6 text-center">{q.question}</h2>

          {q.options.map(opt => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              className="w-full bg-gray-800 hover:bg-purple-600 transition p-4 mb-3 rounded-xl"
            >
              {opt}
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}