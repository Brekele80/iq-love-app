"use client"

import { createContext, useContext, useState } from "react"
import { Language } from "@/lib/i18n"

type ContextType = {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<ContextType | null>(null)

function getInitialLang(): Language {
  if (typeof window === "undefined") return "en"

  try {
    const saved = localStorage.getItem("lang") as Language | null
    if (saved === "en" || saved === "id") return saved

    const browserLang = navigator.language
    if (browserLang.startsWith("id")) return "id"
  } catch {}

  return "en"
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang)

  const setLang = (l: Language) => {
    setLangState(l)
    localStorage.setItem("lang", l)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used inside provider")
  return ctx
}