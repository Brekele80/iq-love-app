"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import AdBanner from "@/components/AdBanner"

type Entry = {
  id: string
  iq: number
  personality: string
  love: string
  animal: string
}

export const dynamic = "force-dynamic"

export default function LeaderboardPage() {
  const [data, setData] = useState<Entry[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .order("iq", { ascending: false })
        .limit(20)

      if (!error && data) {
        setData(data)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        🏆 Leaderboard
      </h1>

      <div className="max-w-md mx-auto space-y-3">
        {data.map((user, index) => (
          <div
            key={user.id}
            className="bg-gray-900 p-4 rounded-xl flex justify-between"
          >
            <div>
              <p className="font-bold">
                #{index + 1} • {user.animal}
              </p>
              <p className="text-sm opacity-70">
                {user.personality}
              </p>
            </div>

            <p className="text-lg font-bold">{user.iq}</p>
          </div>
        ))}
      </div>

      {/* ✅ AD */}
      <div className="mt-8">
        <AdBanner />
      </div>
    </div>
  )
}