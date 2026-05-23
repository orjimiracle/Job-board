import { cn } from "@/lib/utils"

interface AdSlotProps {
  variant: "banner" | "sidebar" | "inline" | "footer"
  className?: string
}

export function AdSlot({ variant, className }: AdSlotProps) {
  const variants = {
    banner: "h-24 md:h-28",
    sidebar: "h-64 w-full",
    inline: "h-20 md:h-24",
    footer: "h-20 md:h-24"
  }

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
