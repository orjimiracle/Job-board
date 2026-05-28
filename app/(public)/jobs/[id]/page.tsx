export const dynamic = 'force-dynamic'

import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import { ArrowLeft, Building2, MapPin, Clock, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { JobCard } from "@/components/job-card"
import { AdSlot } from "@/components/ad-slot"
import { ShareButtons } from "@/components/share-buttons"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { getJobById, getJobs } from "@/lib/db"
import { cn } from "@/lib/utils"
import type { Job } from "@/lib/types"

interface JobPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    return {
      title: "Job Not Found",
    }
  }

  return {
    title: `${job.title} at ${job.company}`,
    description: job.description?.slice(0, 160),
    openGraph: {
      title: `${job.title} at ${job.company}`,
      description: job.description?.slice(0, 160),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${job.title} at ${job.company}`,
      description: job.description?.slice(0, 160),
    },
  }
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params
  const job = await getJobById(id)

  if (!job) {
    notFound()
  }

  const allJobs = await getJobs()
  const relatedJobs = allJobs
    .filter((j: Job) => j.id !== job.id && j.category === job.category)
    .slice(0, 3)

  const typeColors: Record<string, string> = {
    Remote: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    "Full-time": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    "Part-time": "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    Internship: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
    Contract: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6 -ml-2">
        <Link href="/jobs" className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          Back to Jobs
        </Link>
      </Button>

      {/* Top Banner Ad */}
      <AdSlot variant="banner" className="mb-8" />

      <div className="grid lg:grid-cols-[1fr_300px] gap-8">
        {/* Main Content */}
        <div className="space-y-8">
          {/* Job Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
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
              <Badge variant="outline" className={cn(typeColors[job.type])}>
                {job.type}
              </Badge>
              <Badge variant="outline">{job.category}</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground mb-6">
              <span className="flex items-center gap-2">
                <Building2 className="size-5" />
                {job.company}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-5" />
                {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-5" />
                Posted {new Date(job.postedat).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>

            {job.salary && (
              <p className="text-xl font-semibold text-foreground mb-6">{job.salary}</p>
            )}

            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ExternalLink className="size-4" />
                </a>
              </Button>
              <ShareButtons
                title={`${job.title} at ${job.company}`}
                url={`https://jobboard.com/jobs/${job.id}`}
              />
            </div>
          </div>

          <Separator />

          {/* Inline Ad */}
          <AdSlot variant="inline" />

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {job.requirements.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Apply CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6">
              <div>
                <h3 className="font-semibold mb-1">Ready to apply?</h3>
                <p className="text-sm text-muted-foreground">
                  Click the button to apply directly on the company website.
                </p>
              </div>
              <Button asChild size="lg" className="gap-2 shrink-0">
                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Bottom Ad */}
          <AdSlot variant="inline" />

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Related Jobs</h2>
              <div className="grid gap-4">
                {relatedJobs.map((relatedJob) => (
                  <JobCard key={relatedJob.id} job={relatedJob} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Apply</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Apply directly on the company&apos;s website to submit your application.
                </p>
                <Button asChild className="w-full gap-2">
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            <AdSlot variant="sidebar" />

            <WhatsAppCTA />

            <AdSlot variant="sidebar" />
          </div>
        </aside>
      </div>

      {/* Sticky WhatsApp CTA (Mobile) */}
      <WhatsAppCTA variant="sticky" className="lg:hidden" />
    </div>
  )
}