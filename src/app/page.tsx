"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-black text-white px-6">

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center"
      >
        Discover your mind, personality & perfect match
      </motion.h1>

      <p className="mt-4 text-gray-400 text-center">
        Takes only 5 minutes 👀
      </p>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/test")}
        className="mt-6 bg-purple-600 px-6 py-3 rounded-xl text-lg"
      >
        Start Test
      </motion.button>

    </main>
  )
}