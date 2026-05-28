"use client";

import { useState, useEffect } from "react";
import { getSupabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, MousePointerClick, TrendingUp, Eye, ExternalLink, Calendar, BarChart3, Loader2 } from "lucide-react";

type Ad = {
  id: string;
  title: string;
  image_url: string | null;
  destination_url: string;
  position: string;
  start_date: string | null;
  end_date: string | null;
  active: boolean;
  clicks: number;
  impressions: number;
};

export default function AdsManagementPage() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [saving, setSaving] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");
  const [newActive, setNewActive] = useState(true);

  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");

  useEffect(() => { fetchAds(); }, []);

  const fetchAds = async () => {
    setLoading(true);
    const { data, error } = await getSupabase()
      .from("ads")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAds(data);
    setLoading(false);
  };

  const handleCreateAd = async () => {
    if (!newTitle || !newUrl || !newPosition) return;
    setSaving(true);
    const { data, error } = await getSupabase()
      .from("ads")
      .insert([{ title: newTitle, destination_url: newUrl, position: newPosition, start_date: newStartDate || null, end_date: newEndDate || null, active: newActive }])
      .select()
      .single();
    if (!error && data) {
      setAds([data, ...ads]);
      setNewTitle(""); setNewUrl(""); setNewPosition(""); setNewStartDate(""); setNewEndDate(""); setNewActive(true);
      setIsCreateDialogOpen(false);
    }
    setSaving(false);
  };

  const handleSaveEdit = async () => {
    if (!editingAd) return;
    setSaving(true);
    const { data, error } = await getSupabase()
      .from("ads")
      .update({ title: editTitle, destination_url: editUrl, position: editPosition, start_date: editStartDate || null, end_date: editEndDate || null })
      .eq("id", editingAd.id)
      .select()
      .single();
    if (!error && data) {
      setAds(ads.map((a) => (a.id === data.id ? data : a)));
      setEditingAd(null);
    }
    setSaving(false);
  };

  const handleToggleActive = async (ad: Ad) => {
    const { data, error } = await getSupabase()
      .from("ads")
      .update({ active: !ad.active })
      .eq("id", ad.id)
      .select()
      .single();
    if (!error && data) setAds(ads.map((a) => (a.id === data.id ? data : a)));
  };

  const handleDeleteAd = async (id: string) => {
    const { error } = await getSupabase().from("ads").delete().eq("id", id);
    if (!error) setAds(ads.filter((a) => a.id !== id));
  };

  const totalClicks = ads.reduce((sum, ad) => sum + ad.clicks, 0);
  const totalImpressions = ads.reduce((sum, ad) => sum + ad.impressions, 0);
  const activeAds = ads.filter((ad) => ad.active).length;
  const mostClickedAd = ads.length > 0 ? ads.reduce((max, ad) => (ad.clicks > max.clicks ? ad : max), ads[0]) : null;

  const getPositionBadgeVariant = (position: string): "default" | "secondary" | "outline" => {
    if (position === "banner") return "default";
    if (position === "inline") return "outline";
    return "secondary";
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Ads Management</h1>
          <p className="text-muted-foreground">Create and manage advertisement placements across your job board.</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Create New Ad</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Advertisement</DialogTitle>
              <DialogDescription>Add a new advertisement to display on your job board.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Ad Title</Label>
                <Input placeholder="Enter ad title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Destination URL</Label>
                <Input placeholder="https://example.com" type="url" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label>Ad Position</Label>
                <Select onValueChange={setNewPosition}>
                  <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="banner">Top Banner</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                    <SelectItem value="inline">Inline (In-feed)</SelectItem>
                    <SelectItem value="footer">Footer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Date</Label>
                  <Input type="date" value={newStartDate} onChange={(e) => setNewStartDate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label>End Date</Label>
                  <Input type="date" value={newEndDate} onChange={(e) => setNewEndDate(e.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Active</Label>
                <Switch checked={newActive} onCheckedChange={setNewActive} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateAd} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Create Ad
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
            <div className="text-2xl font-bold">{activeAds} / {ads.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardDescription className="text-sm font-medium">Top Performer</CardDescription>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{mostClickedAd?.title ?? "—"}</div>
            <p className="text-xs text-muted-foreground mt-1">{mostClickedAd?.clicks.toLocaleString() ?? 0} clicks</p>
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
              <CardDescription>Manage all your advertisement placements from one place.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : ads.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No ads yet. Create one above.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Clicks</TableHead>
                      <TableHead className="text-right">Impressions</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ads.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell>
                          <div className="font-medium">{ad.title}</div>
                          <a href={ad.destination_url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                            {ad.destination_url.replace(/^https?:\/\//, "").slice(0, 30)}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getPositionBadgeVariant(ad.position)}>{ad.position}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {ad.start_date ? new Date(ad.start_date).toLocaleDateString() : "—"} -{" "}
                              {ad.end_date ? new Date(ad.end_date).toLocaleDateString() : "—"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium">{ad.clicks.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{ad.impressions.toLocaleString()}</TableCell>
                        <TableCell className="text-center">
                          <Switch checked={ad.active} onCheckedChange={() => handleToggleActive(ad)} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => {
                                  setEditingAd(ad);
                                  setEditTitle(ad.title);
                                  setEditUrl(ad.destination_url);
                                  setEditPosition(ad.position);
                                  setEditStartDate(ad.start_date ?? "");
                                  setEditEndDate(ad.end_date ?? "");
                                }}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Advertisement</DialogTitle>
                                  <DialogDescription>Update the advertisement details below.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label>Ad Title</Label>
                                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Destination URL</Label>
                                    <Input type="url" value={editUrl} onChange={(e) => setEditUrl(e.target.value)} />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Ad Position</Label>
                                    <Select value={editPosition} onValueChange={setEditPosition}>
                                      <SelectTrigger><SelectValue /></SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="banner">Top Banner</SelectItem>
                                        <SelectItem value="sidebar">Sidebar</SelectItem>
                                        <SelectItem value="inline">Inline (In-feed)</SelectItem>
                                        <SelectItem value="footer">Footer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                      <Label>Start Date</Label>
                                      <Input type="date" value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)} />
                                    </div>
                                    <div className="grid gap-2">
                                      <Label>End Date</Label>
                                      <Input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setEditingAd(null)}>Cancel</Button>
                                  <Button onClick={handleSaveEdit} disabled={saving}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save Changes
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteAd(ad.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
                  {(["banner", "sidebar", "inline", "footer"] as const).map((pos) => {
                    const posAds = ads.filter((a) => a.position === pos);
                    const clicks = posAds.reduce((s, a) => s + a.clicks, 0);
                    const impressions = posAds.reduce((s, a) => s + a.impressions, 0);
                    const maxClicks = Math.max(...ads.map((a) => a.clicks), 1);
                    const icons: Record<string, string> = { banner: "🔝", sidebar: "📌", inline: "📄", footer: "⬇️" };
                    return (
                      <div key={pos} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span>{icons[pos]}</span>
                            <span className="font-medium capitalize">{pos}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-medium">{clicks.toLocaleString()}</span>
                            <span className="text-muted-foreground text-sm ml-1">clicks</span>
                          </div>
                        </div>
                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${(clicks / maxClicks) * 100}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {impressions.toLocaleString()} impressions | CTR:{" "}
                          {impressions > 0 ? ((clicks / impressions) * 100).toFixed(1) : "0.0"}%
                        </p>
                      </div>
                    );
                  })}
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
                  {[...ads].sort((a, b) => b.clicks - a.clicks).slice(0, 5).map((ad, index) => (
                    <div key={ad.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{ad.title}</p>
                        <p className="text-sm text-muted-foreground capitalize">{ad.position}</p>
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