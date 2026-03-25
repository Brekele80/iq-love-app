"use client"

export default function ProgressBar({ current, total }: { current: number, total: number }) {
  const percent = (current / total) * 100

  return (
    <div className="w-full h-2 bg-gray-800 rounded mb-6">
      <div
        className="h-2 bg-purple-500 rounded transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}