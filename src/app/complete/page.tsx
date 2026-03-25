"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdBanner from "@/components/AdBanner"

export default function CompletePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleContinue = () => {
    setLoading(true)

    // simulate 30s ad
    setTimeout(() => {
      router.push("/result")
    }, 30000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-2xl font-bold mb-4">
        🎉 Congratulations!
      </h1>

      <p className="opacity-80 mb-6 max-w-md">
        You’ve completed the quiz successfully.  
        Please click the button below to proceed to your results.

        <br /><br />

        To support our platform, a short 30-second advertisement will be shown before your results are revealed.  
        Thank you for your understanding ❤️
      </p>

      {!loading ? (
        <button
          onClick={handleContinue}
          className="bg-indigo-600 px-6 py-3 rounded-xl"
        >
          Continue to Results
        </button>
      ) : (
        <div className="w-full max-w-md">
          <p className="mb-4">Loading advertisement...</p>
          <AdBanner />
        </div>
      )}
    </div>
  )
}