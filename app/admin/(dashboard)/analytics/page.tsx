"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { analyticsData } from "@/lib/mock-data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import {
  Users,
  Eye,
  MousePointerClick,
  ExternalLink,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Calendar,
  Download,
} from "lucide-react";

// Extended mock data for activity logs
const activityLogs = [
  { id: 1, action: "Job View", job: "Senior DevOps Engineer", source: "WhatsApp", time: "2 mins ago", ip: "192.168.1.1" },
  { id: 2, action: "Apply Click", job: "Cybersecurity Analyst", source: "Direct", time: "5 mins ago", ip: "192.168.1.2" },
  { id: 3, action: "WhatsApp Click", job: "Homepage", source: "Google", time: "8 mins ago", ip: "192.168.1.3" },
  { id: 4, action: "Job View", job: "Cloud Solutions Architect", source: "Social", time: "12 mins ago", ip: "192.168.1.4" },
  { id: 5, action: "Apply Click", job: "Software Engineering Intern", source: "WhatsApp", time: "15 mins ago", ip: "192.168.1.5" },
  { id: 6, action: "Ad Click", job: "Sponsored: AWS Training", source: "Direct", time: "18 mins ago", ip: "192.168.1.6" },
  { id: 7, action: "Job View", job: "Full Stack Developer", source: "Google", time: "22 mins ago", ip: "192.168.1.7" },
  { id: 8, action: "WhatsApp Click", job: "Jobs Page", source: "WhatsApp", time: "25 mins ago", ip: "192.168.1.8" },
];

const topJobs = [
  { title: "Senior DevOps Engineer", company: "TechCorp", views: 1580, clicks: 245, ctr: 15.5 },
  { title: "Cybersecurity Analyst", company: "SecureNet", views: 1240, clicks: 198, ctr: 16.0 },
  { title: "Cloud Solutions Architect", company: "CloudFirst", views: 980, clicks: 142, ctr: 14.5 },
  { title: "Software Engineering Intern", company: "StartupXYZ", views: 856, clicks: 178, ctr: 20.8 },
  { title: "Full Stack Developer", company: "WebDev Inc", views: 720, clicks: 108, ctr: 15.0 },
];

// Daily visitors data
const dailyVisitors = [
  { date: "Mon", visitors: 1240, newUsers: 320, returning: 920 },
  { date: "Tue", visitors: 1580, newUsers: 410, returning: 1170 },
  { date: "Wed", visitors: 1320, newUsers: 280, returning: 1040 },
  { date: "Thu", visitors: 1890, newUsers: 520, returning: 1370 },
  { date: "Fri", visitors: 2100, newUsers: 580, returning: 1520 },
  { date: "Sat", visitors: 980, newUsers: 210, returning: 770 },
  { date: "Sun", visitors: 1090, newUsers: 240, returning: 850 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d");

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Track your job board performance and engagement metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Top Metric Cards - 6 cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Total Visitors</CardDescription>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+18.2%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Job Views</CardDescription>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,920</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">WhatsApp Clicks</CardDescription>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,850</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+24.8%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Apply Clicks</CardDescription>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,340</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+8.3%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Ad Clicks</CardDescription>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">485</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>-3.2%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Avg. CTR</CardDescription>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16.2%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+2.1%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Daily Visitors Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Visitors</CardTitle>
                <CardDescription>New vs returning visitors over the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dailyVisitors}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        className="text-xs fill-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        className="text-xs fill-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="returning"
                        stackId="1"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="newUsers"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Top Jobs by Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Jobs</CardTitle>
                <CardDescription>Jobs with highest engagement this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topJobs} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis type="number" className="text-xs fill-muted-foreground" tickLine={false} axisLine={false} />
                      <YAxis
                        type="category"
                        dataKey="title"
                        className="text-xs fill-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                        width={120}
                        tick={{ fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="views" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Jobs Table */}
          <Card>
            <CardHeader>
              <CardTitle>Job Performance Details</CardTitle>
              <CardDescription>Detailed metrics for top performing job posts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topJobs.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell className="text-right">{job.views.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{job.clicks.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={job.ctr > 15 ? "default" : "secondary"}>
                          {job.ctr}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-6">
          {/* Traffic Sources */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: "WhatsApp", percentage: 45, visitors: 5603, color: "bg-emerald-500" },
                    { source: "Direct", percentage: 25, visitors: 3113, color: "bg-blue-500" },
                    { source: "Google Search", percentage: 18, visitors: 2241, color: "bg-amber-500" },
                    { source: "Social Media", percentage: 8, visitors: 996, color: "bg-pink-500" },
                    { source: "Referral", percentage: 4, visitors: 497, color: "bg-purple-500" },
                  ].map((item) => (
                    <div key={item.source} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.source}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">{item.visitors.toLocaleString()}</span>
                          <span className="font-medium w-12 text-right">{item.percentage}%</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.color}`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { page: "/", views: 4200, name: "Homepage" },
                    { page: "/jobs", views: 3800, name: "Jobs Listing" },
                    { page: "/jobs/1", views: 1580, name: "Senior DevOps Engineer" },
                    { page: "/jobs/2", views: 1240, name: "Cybersecurity Analyst" },
                    { page: "/jobs/4", views: 856, name: "Software Engineering Intern" },
                  ].map((item) => (
                    <div key={item.page} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.page}</p>
                      </div>
                      <span className="text-sm font-medium">{item.views.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Job Clicks Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Job Clicks</CardTitle>
                <CardDescription>Daily job application clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData.jobClicks}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        className="text-xs fill-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        className="text-xs fill-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="clicks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Clicks Chart */}
            <Card>
              <CardHeader>
                <CardTitle>WhatsApp Channel Clicks</CardTitle>
                <CardDescription>Daily WhatsApp CTA clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.whatsappClicks}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        dataKey="date"
                        className="text-xs fill-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        className="text-xs fill-muted-foreground"
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="clicks"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ fill: "#22c55e" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Real-time user activity and click logs</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="hidden sm:table-cell">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activityLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Badge
                          variant={
                            log.action === "Apply Click"
                              ? "default"
                              : log.action === "WhatsApp Click"
                              ? "outline"
                              : log.action === "Ad Click"
                              ? "secondary"
                              : "secondary"
                          }
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {log.job}
                      </TableCell>
                      <TableCell>{log.source}</TableCell>
                      <TableCell className="text-muted-foreground">{log.time}</TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground font-mono text-xs">
                        {log.ip}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
