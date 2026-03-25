export type Answer = {
  questionId: number
  selected: string
  correct?: boolean
  timeMs: number
}

export type Submission = {
  answers: Answer[]
  birthdate?: string
}

export type Result = {
  iq: number
  personality: string
  loveArchetype: string
  zodiac: string
  shio: string
}