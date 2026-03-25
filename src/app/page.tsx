"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/i18n"

export default function Home() {
  const router = useRouter()
  const { lang, setLang } = useLanguage()
  const t = translations[lang]

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-black text-white px-6">

      {/* LANGUAGE SWITCH */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button onClick={() => setLang("en")}>🇺🇸</button>
        <button onClick={() => setLang("id")}>🇮🇩</button>
      </div>

      <motion.h1 className="text-3xl font-bold text-center">
        {t.title}
      </motion.h1>

      <p className="mt-4 text-gray-400 text-center">
        {t.subtitle}
      </p>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/test")}
        className="mt-6 bg-purple-600 px-6 py-3 rounded-xl text-lg"
      >
        {t.start}
      </motion.button>

    </main>
  )
}