import Link from "next/link"
import { MapPin, Building2, Clock, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Job } from "@/lib/types"
import { cn } from "@/lib/utils"

interface JobCardProps {
  job: Job
  variant?: "default" | "compact"
}

export function JobCard({ job, variant = "default" }: JobCardProps) {
  const typeColors: Record<string, string> = {
    Remote: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Full-time": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "Part-time": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Internship: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    Contract: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20"
  }

  if (variant === "compact") {
    return (
      <Card className={cn(
        "transition-all hover:shadow-md hover:border-primary/20",
        job.sponsored && "border-primary/30 bg-primary/5"
      )}>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {job.featured && (
                  <Sparkles className="size-4 text-amber-500 shrink-0" />
                )}
                <Link 
                  href={`/jobs/${job.id}`}
                  className="font-semibold text-foreground hover:text-primary transition-colors truncate"
                >
                  {job.title}
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="size-3" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3" />
                  {job.location}
                </span>
              </div>
            </div>
            <Badge variant="outline" className={cn("shrink-0", typeColors[job.type])}>
              {job.type}
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(
      "transition-all hover:shadow-md hover:border-primary/20 group",
      job.sponsored && "border-primary/30 bg-primary/5",
      job.featured && "ring-1 ring-amber-500/20"
    )}>
      <CardContent className="p-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {job.featured && (
                  <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20 gap-1">
                    <Sparkles className="size-3" />
                    Featured
                  </Badge>
                )}
                {job.sponsored && (
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    Sponsored
                  </Badge>
                )}
              </div>
              <Link 
                href={`/jobs/${job.id}`}
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
              >
                {job.title}
              </Link>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building2 className="size-4" />
                  {job.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" />
                  {new Date(job.postedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            </div>
            <Badge variant="outline" className={cn("shrink-0 hidden sm:flex", typeColors[job.type])}>
              {job.type}
            </Badge>
          </div>
          
          {job.salary && (
            <p className="text-sm font-medium text-foreground">{job.salary}</p>
          )}
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {job.description}
          </p>
          
          <div className="flex items-center justify-between gap-4 pt-2">
            <Badge variant="outline" className={cn("sm:hidden", typeColors[job.type])}>
              {job.type}
            </Badge>
            <Button asChild size="sm" className="ml-auto">
              <Link href={`/jobs/${job.id}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
