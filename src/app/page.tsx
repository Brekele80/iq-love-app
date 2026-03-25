"use client"

import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="text-3xl font-bold text-center">
        Discover your mind, personality & perfect match
      </h1>

      <button
        onClick={() => router.push("/test")}
        className="mt-6 bg-purple-600 px-6 py-3 rounded-lg"
      >
        Start Test
      </button>
    </main>
  )
}