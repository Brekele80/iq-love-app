import { Answer } from "@/types"

export function getPersonality(answers: Answer[]) {
  const traits = {
    logical: 0,
    intuitive: 0,
    fast: 0,
    structured: 0,
  }

  answers.forEach(a => {
    if (a.questionId === 5) {
      if (a.selected === "A") traits.structured++
      if (a.selected === "B") traits.fast++
      if (a.selected === "C") traits.intuitive++
      if (a.selected === "D") traits.logical++
    }
  })

  const max = Object.entries(traits).sort((a, b) => b[1] - a[1])[0][0]

  const map: Record<string, string> = {
    logical: "Analyst",
    structured: "Strategist",
    fast: "Reactor",
    intuitive: "Creator"
  }

  return map[max]
}