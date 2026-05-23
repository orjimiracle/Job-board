import { Suspense } from "react"
import type { Metadata } from "next"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { JobCard } from "@/components/job-card"
import { JobFilters } from "@/components/job-filters"
import { SearchBar } from "@/components/search-bar"
import { AdSlot } from "@/components/ad-slot"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { mockJobs } from "@/lib/mock-data"
import type { Job } from "@/lib/types"

export const metadata: Metadata = {
  title: "Browse Jobs",
  description: "Find the latest tech jobs, internships, and scholarships. Filter by category, location, and job type.",
}

interface JobsPageProps {
  searchParams: Promise<{
    category?: string
    location?: string
    remote?: string
    search?: string
    page?: string
  }>
}

function filterJobs(jobs: Job[], filters: {
  category?: string
  location?: string
  remote?: string
  search?: string
}): Job[] {
  return jobs.filter((job) => {
    if (filters.category && job.category !== filters.category) {
      return false
    }
    if (filters.location && filters.location !== "Remote" && job.location !== filters.location) {
      return false
    }
    if (filters.remote === "true" && job.type !== "Remote") {
      return false
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      return (
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower)
      )
    }
    return true
  })
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams
  const filteredJobs = filterJobs(mockJobs, params)
  const sponsoredJobs = filteredJobs.filter((job) => job.sponsored)

  return (
    <div className="container px-4 md:px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Jobs</h1>
        <p className="text-muted-foreground mb-6">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
          {params.category && ` in ${params.category}`}
          {params.location && ` in ${params.location}`}
          {params.remote === "true" && " (Remote only)"}
          {params.search && ` matching "${params.search}"`}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchBar defaultValue={params.search} className="flex-1" />
          
          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <Filter className="size-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Filter Jobs</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <Suspense fallback={<div>Loading filters...</div>}>
                  <JobFilters />
                </Suspense>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Top Banner Ad */}
      <AdSlot variant="banner" className="mb-8" />

      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <Card>
              <CardContent className="p-4">
                <Suspense fallback={<div>Loading filters...</div>}>
                  <JobFilters />
                </Suspense>
              </CardContent>
            </Card>

            <AdSlot variant="sidebar" />
            
            <WhatsAppCTA />
          </div>
        </aside>

        {/* Job Listings */}
        <div className="space-y-6">
          {/* Sponsored Jobs */}
          {sponsoredJobs.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-primary" />
                Sponsored Jobs
              </h2>
              <div className="grid gap-4">
                {sponsoredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          )}

          {/* All Jobs */}
          <div>
            <h2 className="text-lg font-semibold mb-4">All Jobs</h2>
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Filter className="size-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">No jobs found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Try adjusting your filters or search terms to find more opportunities.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredJobs.map((job, index) => (
                  <div key={job.id}>
                    <JobCard job={job} />
                    {/* Ad placement every 5 jobs */}
                    {(index + 1) % 5 === 0 && index !== filteredJobs.length - 1 && (
                      <div className="mt-4">
                        <AdSlot variant="inline" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination Placeholder */}
          {filteredJobs.length > 0 && (
            <div className="flex justify-center gap-2 pt-4">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline" className="bg-primary text-primary-foreground">
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          )}

          {/* Bottom Ad */}
          <AdSlot variant="inline" className="mt-8" />
          
          {/* Mobile WhatsApp CTA */}
          <div className="lg:hidden">
            <WhatsAppCTA variant="inline" />
          </div>
        </div>
      </div>
    </div>
  )
}
