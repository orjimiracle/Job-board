"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FieldGroup, 
  Field, 
  FieldLabel, 
  FieldDescription 
} from "@/components/ui/field"

export default function SettingsPage() {
  const [saving, setSaving] = useState(false)
  
  // Settings state
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [autoPublish, setAutoPublish] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSaving(false)
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your job board settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>Basic information about your job board.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="siteName">Site Name</FieldLabel>
                  <Input id="siteName" defaultValue="JobBoard" />
                </Field>

                <Field>
                  <FieldLabel htmlFor="siteDescription">Site Description</FieldLabel>
                  <Input 
                    id="siteDescription" 
                    defaultValue="Find Tech Jobs & Internships Fast" 
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="contactEmail">Contact Email</FieldLabel>
                  <Input 
                    id="contactEmail" 
                    type="email"
                    defaultValue="contact@jobboard.com" 
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Settings</CardTitle>
              <CardDescription>Configure how jobs are displayed and managed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-publish Jobs</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically publish new jobs without manual approval.
                  </p>
                </div>
                <Switch
                  checked={autoPublish}
                  onCheckedChange={setAutoPublish}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <Field>
                  <FieldLabel htmlFor="jobsPerPage">Jobs Per Page</FieldLabel>
                  <FieldDescription>Number of jobs displayed per page on the listing.</FieldDescription>
                  <Input 
                    id="jobsPerPage" 
                    type="number"
                    defaultValue="10" 
                    className="w-32"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="featuredSlots">Featured Job Slots</FieldLabel>
                  <FieldDescription>Maximum number of featured jobs on the homepage.</FieldDescription>
                  <Input 
                    id="featuredSlots" 
                    type="number"
                    defaultValue="5" 
                    className="w-32"
                  />
                </Field>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Manage your email notification preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Job Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email when a new job is posted.
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of job board activity.
                  </p>
                </div>
                <Switch
                  checked={weeklyDigest}
                  onCheckedChange={setWeeklyDigest}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Integration</CardTitle>
              <CardDescription>Configure your WhatsApp channel for job updates.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="whatsappChannel">WhatsApp Channel URL</FieldLabel>
                  <FieldDescription>The URL to your WhatsApp channel or group.</FieldDescription>
                  <Input 
                    id="whatsappChannel" 
                    defaultValue="https://whatsapp.com/channel/0029VbDEyiMBvvscpoIaaH2i" 
                    placeholder="https://whatsapp.com/channel/..."
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Configure analytics tracking for your job board.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="gaId">Google Analytics ID</FieldLabel>
                  <FieldDescription>Your Google Analytics measurement ID.</FieldDescription>
                  <Input 
                    id="gaId" 
                    placeholder="G-XXXXXXXXXX"
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Advertising</CardTitle>
              <CardDescription>Configure ad placements and integrations.</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="adsenseId">Google AdSense Publisher ID</FieldLabel>
                  <FieldDescription>Your AdSense publisher ID for monetization.</FieldDescription>
                  <Input 
                    id="adsenseId" 
                    placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-4 mt-8">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}
