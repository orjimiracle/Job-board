"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Pencil,
  Trash2,
  ImageIcon,
  MousePointerClick,
  TrendingUp,
  Eye,
  Upload,
  ExternalLink,
  Calendar,
  BarChart3,
} from "lucide-react";

// Mock ads data
const mockAds = [
  {
    id: 1,
    title: "AWS Certification Training",
    imageUrl: "/placeholder-ad-1.jpg",
    destinationUrl: "https://aws.amazon.com/training",
    position: "Top Banner",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    active: true,
    clicks: 1245,
    impressions: 28500,
    ctr: 4.4,
  },
  {
    id: 2,
    title: "DevOps Bootcamp 2024",
    imageUrl: "/placeholder-ad-2.jpg",
    destinationUrl: "https://devops-bootcamp.com",
    position: "Sidebar",
    startDate: "2024-01-20",
    endDate: "2024-03-20",
    active: true,
    clicks: 856,
    impressions: 15200,
    ctr: 5.6,
  },
  {
    id: 3,
    title: "Tech Resume Builder",
    imageUrl: "/placeholder-ad-3.jpg",
    destinationUrl: "https://resume-builder.io",
    position: "Inline",
    startDate: "2024-01-10",
    endDate: "2024-01-31",
    active: false,
    clicks: 432,
    impressions: 9800,
    ctr: 4.4,
  },
  {
    id: 4,
    title: "Cybersecurity Course",
    imageUrl: "/placeholder-ad-4.jpg",
    destinationUrl: "https://cyber-course.edu",
    position: "Footer",
    startDate: "2024-02-01",
    endDate: "2024-04-01",
    active: true,
    clicks: 287,
    impressions: 6500,
    ctr: 4.4,
  },
  {
    id: 5,
    title: "Cloud Hosting Promo",
    imageUrl: "/placeholder-ad-5.jpg",
    destinationUrl: "https://cloud-host.com",
    position: "Inline",
    startDate: "2024-01-25",
    endDate: "2024-02-25",
    active: true,
    clicks: 654,
    impressions: 12800,
    ctr: 5.1,
  },
];

export default function AdsManagementPage() {
  const [ads, setAds] = useState(mockAds);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<(typeof mockAds)[0] | null>(null);

  // Calculate totals
  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const activeAds = ads.filter((ad) => ad.active).length;
  const mostClickedAd = ads.reduce((max, ad) => (ad.clicks > max.clicks ? ad : max), ads[0]);

  const handleToggleActive = (id: number) => {
    setAds(
      ads.map((ad) => (ad.id === id ? { ...ad, active: !ad.active } : ad))
    );
  };

  const handleDeleteAd = (id: number) => {
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const getPositionBadgeVariant = (position: string) => {
    switch (position) {
      case "Top Banner":
        return "default";
      case "Sidebar":
        return "secondary";
      case "Inline":
        return "outline";
      case "Footer":
        return "secondary";
      default:
        return "secondary";
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ads Management</h1>
          <p className="text-muted-foreground">
            Create and manage advertisement placements across your job board.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Ad
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Advertisement</DialogTitle>
              <DialogDescription>
                Add a new advertisement to display on your job board.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="ad-title">Ad Title</Label>
                <Input id="ad-title" placeholder="Enter ad title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ad-image">Ad Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG up to 2MB
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ad-url">Destination URL</Label>
                <Input id="ad-url" placeholder="https://example.com" type="url" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ad-position">Ad Position</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top-banner">Top Banner</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="inline">Inline (In-feed)</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="ad-active">Active</Label>
                <Switch id="ad-active" defaultChecked />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>Create Ad</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Total Ad Clicks</CardDescription>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Total Impressions</CardDescription>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImpressions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total ad views</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Active Ads</CardDescription>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {activeAds} / {ads.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Top Performer</CardDescription>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{mostClickedAd.title}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mostClickedAd.clicks.toLocaleString()} clicks
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-ads" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-ads">All Ads</TabsTrigger>
          <TabsTrigger value="analytics">Ad Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-ads">
          <Card>
            <CardHeader>
              <CardTitle>Advertisement Inventory</CardTitle>
              <CardDescription>
                Manage all your advertisement placements from one place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Preview</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead className="text-right">Clicks</TableHead>
                    <TableHead className="text-right">CTR</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ads.map((ad) => (
                    <TableRow key={ad.id}>
                      <TableCell>
                        <div className="h-12 w-16 rounded bg-muted flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{ad.title}</div>
                        <a
                          href={ad.destinationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          {ad.destinationUrl.replace(/^https?:\/\//, "").slice(0, 30)}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPositionBadgeVariant(ad.position)}>
                          {ad.position}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {new Date(ad.startDate).toLocaleDateString()} -{" "}
                            {new Date(ad.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {ad.clicks.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant={ad.ctr >= 5 ? "default" : "secondary"}>
                          {ad.ctr}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Switch
                          checked={ad.active}
                          onCheckedChange={() => handleToggleActive(ad.id)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setEditingAd(ad)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Edit Advertisement</DialogTitle>
                                <DialogDescription>
                                  Update the advertisement details below.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-title">Ad Title</Label>
                                  <Input
                                    id="edit-title"
                                    defaultValue={ad.title}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-url">Destination URL</Label>
                                  <Input
                                    id="edit-url"
                                    defaultValue={ad.destinationUrl}
                                    type="url"
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-position">Ad Position</Label>
                                  <Select defaultValue={ad.position.toLowerCase().replace(" ", "-")}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="top-banner">Top Banner</SelectItem>
                                      <SelectItem value="sidebar">Sidebar</SelectItem>
                                      <SelectItem value="inline">Inline (In-feed)</SelectItem>
                                      <SelectItem value="footer">Footer</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-start">Start Date</Label>
                                    <Input
                                      id="edit-start"
                                      type="date"
                                      defaultValue={ad.startDate}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="edit-end">End Date</Label>
                                    <Input
                                      id="edit-end"
                                      type="date"
                                      defaultValue={ad.endDate}
                                    />
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteAd(ad.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ad Performance by Position</CardTitle>
                <CardDescription>Click performance across different ad placements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { position: "Top Banner", clicks: 1245, impressions: 28500, icon: "🔝" },
                    { position: "Sidebar", clicks: 856, impressions: 15200, icon: "📌" },
                    { position: "Inline", clicks: 1086, impressions: 22600, icon: "📄" },
                    { position: "Footer", clicks: 287, impressions: 6500, icon: "⬇️" },
                  ].map((item) => (
                    <div key={item.position} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span>{item.icon}</span>
                          <span className="font-medium">{item.position}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">{item.clicks.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm ml-1">clicks</span>
                        </div>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${(item.clicks / 1245) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.impressions.toLocaleString()} impressions | CTR:{" "}
                        {((item.clicks / item.impressions) * 100).toFixed(1)}%
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Clicked Ads</CardTitle>
                <CardDescription>Top performing advertisements by total clicks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...ads]
                    .sort((a, b) => b.clicks - a.clicks)
                    .slice(0, 5)
                    .map((ad, index) => (
                      <div
                        key={ad.id}
                        className="flex items-center gap-4 p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{ad.title}</p>
                          <p className="text-sm text-muted-foreground">{ad.position}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{ad.clicks.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">clicks</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
