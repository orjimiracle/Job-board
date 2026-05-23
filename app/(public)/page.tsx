import Link from "next/link"
import { ArrowRight, Zap, Shield, Cloud, Code, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { JobCard } from "@/components/job-card"
import { AdSlot } from "@/components/ad-slot"
import { SearchBar } from "@/components/search-bar"
import { WhatsAppCTA } from "@/components/whatsapp-cta"
import { mockJobs } from "@/lib/mock-data"

const categories = [
  { name: "DevOps", icon: Zap, count: 24 },
  { name: "Cybersecurity", icon: Shield, count: 18 },
  { name: "Cloud", icon: Cloud, count: 32 },
  { name: "Software", icon: Code, count: 45 },
  { name: "Internships", icon: GraduationCap, count: 15 },
  { name: "Scholarships", icon: Award, count: 8 },
]

export default function HomePage() {
  const featuredJobs = mockJobs.filter(job => job.featured)
  const latestJobs = mockJobs.slice(0, 6)
  const internships = mockJobs.filter(job => job.category === "Internships")
  const scholarships = mockJobs.filter(job => job.category === "Scholarships")

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="container relative px-4 md:px-6 py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Updated Daily
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              Find Tech Jobs & Internships{" "}
              <span className="text-primary">Fast</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Discover the latest opportunities in DevOps, Cybersecurity, Cloud, and Software Development. 
              Get instant updates via WhatsApp.
            </p>
            
            <SearchBar className="max-w-2xl mx-auto mb-6" />
            
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <a 
                  href="https://whatsapp.com/channel/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Join WhatsApp Channel
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/jobs" className="flex items-center gap-2">
                  Browse All Jobs
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner Ad */}
      <section className="container px-4 md:px-6 py-4">
        <AdSlot variant="banner" />
      </section>

      {/* Categories */}
      <section className="container px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Browse by Category</h2>
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link href="/jobs" className="flex items-center gap-2">
              View All <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/jobs?category=${category.name}`}
              className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-card hover:bg-accent/50 hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <category.icon className="size-6" />
              </div>
              <div className="text-center">
                <p className="font-medium">{category.name}</p>
                <p className="text-sm text-muted-foreground">{category.count} jobs</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="container px-4 md:px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Featured Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Featured Jobs</h2>
                <Button asChild variant="ghost">
                  <Link href="/jobs?featured=true" className="flex items-center gap-2">
                    View All <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4">
                {featuredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* Mid-Content Ad */}
            <AdSlot variant="inline" />

            {/* Latest Jobs */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-3xl font-bold">Latest Jobs</h2>
                <Button asChild variant="ghost">
                  <Link href="/jobs" className="flex items-center gap-2">
                    View All <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4">
                {latestJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* Internships */}
            {internships.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">Internships</h2>
                  <Button asChild variant="ghost">
                    <Link href="/jobs?category=Internships" className="flex items-center gap-2">
                      View All <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-4">
                  {internships.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}

            {/* Scholarships */}
            {scholarships.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold">Scholarships</h2>
                  <Button asChild variant="ghost">
                    <Link href="/jobs?category=Scholarships" className="flex items-center gap-2">
                      View All <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-4">
                  {scholarships.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div className="sticky top-20 space-y-6">
              <AdSlot variant="sidebar" />
              
              <WhatsAppCTA />
              
              <AdSlot variant="sidebar" />
            </div>
          </aside>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container px-4 md:px-6 py-12">
        <WhatsAppCTA variant="inline" />
      </section>
    </div>
  )
}
