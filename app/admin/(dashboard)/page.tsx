import Link from "next/link"
import { Briefcase, MousePointerClick, Users, TrendingUp, Eye, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
const dashboardStats = {
  totalJobs: 150,
  totalClicks: 2500,
  totalVisitors: 10000,
  mostViewedJob: {
    id: "job1",
    title: "Senior DevOps Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    featured: true,
  },
};

const mockJobs = [
  {
    id: "job1",
    title: "Senior DevOps Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    category: "DevOps",
    type: "Full-time",
    postedat: "2023-01-15T10:00:00Z",
    featured: true,
  },
  {
    id: "job2",
    title: "Cloud Security Architect",
    company: "SecureNet",
    location: "Remote",
    category: "Cybersecurity",
    type: "Full-time",
    postedat: "2023-01-10T09:00:00Z",
    featured: false,
  },
  {
    id: "job3",
    title: "Junior Software Developer",
    company: "InnovateX",
    location: "New York, NY",
    category: "Software",
    type: "Internship",
    postedat: "2023-01-05T14:30:00Z",
    featured: false,
  },
  {
    id: "job4",
    title: "Data Scientist",
    company: "DataCo",
    location: "Boston, MA",
    category: "Software",
    type: "Full-time",
    postedat: "2023-01-01T11:00:00Z",
    featured: true,
  },
  {
    id: "job5",
    title: "Network Engineer",
    company: "GlobalNet",
    location: "London, UK",
    category: "Cloud",
    type: "Contract",
    postedat: "2022-12-28T16:00:00Z",
    featured: false,
  },
];

const stats = [
  {
    title: "Total Jobs",
    value: dashboardStats.totalJobs.toLocaleString(),
    change: "+12 this week",
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Total Clicks",
    value: dashboardStats.totalClicks.toLocaleString(),
    change: "+8.2% from last week",
    icon: MousePointerClick,
    color: "text-emerald-600",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Total Visitors",
    value: dashboardStats.totalVisitors.toLocaleString(),
    change: "+15.3% from last week",
    icon: Users,
    color: "text-amber-600",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Conversion Rate",
    value: "27.4%",
    change: "+2.1% from last week",
    icon: TrendingUp,
    color: "text-pink-600",
    bgColor: "bg-pink-500/10",
  },
]

const recentJobs = mockJobs.slice(0, 5)

export default function AdminDashboardPage() {
  const mostViewedJob = dashboardStats.mostViewedJob

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s an overview of your job board.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center justify-center size-10 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`size-5 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Most Viewed Job */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="size-5" />
              Most Viewed Job
            </CardTitle>
            <CardDescription>Your top performing job listing this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between gap-4 p-4 rounded-lg bg-muted/50">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {mostViewedJob.featured && (
                    <Sparkles className="size-4 text-amber-500" />
                  )}
                  <h3 className="font-semibold truncate">{mostViewedJob.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{mostViewedJob.company} - {mostViewedJob.location}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="size-4 text-muted-foreground" />
                    <span className="font-medium">2,847</span>
                    <span className="text-muted-foreground">views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MousePointerClick className="size-4 text-muted-foreground" />
                    <span className="font-medium">423</span>
                    <span className="text-muted-foreground">clicks</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline">{mostViewedJob.type}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Jobs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Jobs</CardTitle>
              <CardDescription>Latest job postings on the platform</CardDescription>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/jobs">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{job.title}</p>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {job.category}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link href="/admin/create">
                  <Briefcase className="size-5" />
                  <span>Create New Job</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link href="/admin/jobs">
                  <Eye className="size-5" />
                  <span>Manage Listings</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link href="/admin/analytics">
                  <TrendingUp className="size-5" />
                  <span>View Analytics</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                <Link href="/admin/settings">
                  <Users className="size-5" />
                  <span>Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
