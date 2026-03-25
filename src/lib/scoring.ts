import { Answer } from "@/types"

export function computeIQ(answers: Answer[]) {
  let score = 0

  answers.forEach(a => {
    if (a.correct) score += 1

    const speedBonus = Math.max(0, 1 - a.timeMs / 5000)
    score += speedBonus
  })

  return Math.round(85 + score * 3)
}