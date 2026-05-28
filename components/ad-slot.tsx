"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { getSupabase } from "@/lib/supabase"

interface Ad {
  id: string
  title: string
  image_url: string | null
  destination_url: string
  position: string
  clicks: number
  impressions: number
}

interface AdSlotProps {
  variant: "banner" | "sidebar" | "inline" | "footer"
  className?: string
}

export function AdSlot({ variant, className }: AdSlotProps) {
  const [ad, setAd] = useState<Ad | null>(null)

  const variants = {
    banner: "h-24 md:h-28",
    sidebar: "h-64 w-full",
    inline: "h-20 md:h-24",
    footer: "h-20 md:h-24",
  }

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const supabase = getSupabase()
        const today = new Date().toISOString().split("T")[0]
        const { data } = await supabase
          .from("ads")
          .select("*")
          .eq("position", variant)
          .eq("active", true)
          .lte("start_date", today)
          .gte("end_date", today)
          .limit(1)
          .single()

        if (data) {
          setAd(data)
          // Track impression
          await supabase
            .from("ads")
            .update({ impressions: data.impressions + 1 })
            .eq("id", data.id)
        }
      } catch {
        // No ad available, show placeholder
      }
    }
    fetchAd()
  }, [variant])

  const handleClick = async () => {
    if (!ad) return
    const supabase = getSupabase()
    await supabase
      .from("ads")
      .update({ clicks: ad.clicks + 1 })
      .eq("id", ad.id)
  }

  if (ad) {
    return (
      <a
        href={ad.destination_url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={cn(
          "block rounded-lg overflow-hidden border border-border",
          variants[variant],
          className
        )}
      >
        {ad.image_url ? (
          <img
            src={ad.image_url}
            alt={ad.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted text-sm font-medium">
            {ad.title}
          </div>
        )}
      </a>
    )
  }

  // Placeholder when no ad
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/20 bg-muted/30 text-muted-foreground text-sm",
        variants[variant],
        className
      )}
    >
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs uppercase tracking-wider font-medium">Advertisement</span>
        <span className="text-xs opacity-60">
          {variant === "banner" && "728x90 Banner"}
          {variant === "sidebar" && "300x250 Sidebar"}
          {variant === "inline" && "Inline Ad"}
          {variant === "footer" && "Footer Ad"}
        </span>
      </div>
    </div>
  )
}