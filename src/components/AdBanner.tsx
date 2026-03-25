"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

export default function AdBanner() {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!adRef.current) return

    try {
      const ads = window.adsbygoogle || []

      // prevent duplicate push
      if (ads.length === 0) {
        (window.adsbygoogle = ads).push({})
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div ref={adRef} className="w-full min-h-25">
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%" }}
        data-ad-client="ca-pub-XXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}