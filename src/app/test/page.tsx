"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Answer } from "@/types"
import { getNow } from "@/lib/time"

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
    <div className="p-6 text-white bg-black min-h-screen">
      <h2 className="text-xl mb-4">{q.question}</h2>

      {q.options.map(opt => (
        <button
          key={opt}
          onClick={() => handleAnswer(opt)}
          className="block w-full bg-gray-800 p-3 mb-2 rounded"
        >
          {opt}
        </button>
      ))}
    </div>
  )
}