import { Answer } from "@/types"

export function getLoveArchetype(answers: Answer[], personality: string) {
  let depth = 0
  let passion = 0

  answers.forEach(a => {
    if (a.questionId === 8) {
      if (a.selected === "B") passion++
      if (a.selected === "C") depth++
    }
  })

  if (depth > passion && personality === "Strategist") {
    return "Deep Strategist Lover"
  }

  if (passion > depth) {
    return "Passionate Challenger"
  }

  return "Balanced Lover"
}