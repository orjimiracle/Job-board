"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FieldGroup, 
  Field, 
  FieldLabel, 
  FieldDescription 
} from "@/components/ui/field"
import { createJob } from "@/lib/db"

const categories = ["DevOps", "Cybersecurity", "Cloud", "Software", "Internships", "Scholarships"]
const jobTypes = ["Remote", "Full-time", "Part-time", "Internship", "Contract"]

export default function CreateJobPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [jobCategory, setJobCategory] = useState<string | undefined>(undefined);
  const [jobType, setJobType] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get('title') as string,
      company: formData.get('company') as string,
      location: formData.get('location') as string,
      salary: formData.get('salary') as string,
      category: jobCategory as string,
      type: jobType as string,
      description: formData.get('description') as string,
      requirements: (formData.get('requirements') as string).split('\n').map(req => req.trim()).filter(req => req !== ''),
      apply_url: formData.get('apply_url') as string,
      featured: featured,
      posted_at: new Date().toISOString(),
      sponsored: false,
    };

    const newJob = await createJob(jobData);

    if (newJob) {
      console.log("Job created successfully:", newJob);
      router.push("/admin/jobs");
    } else {
      console.error("Failed to create job.");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Job</h1>
        <p className="text-muted-foreground">
          Add a new job listing to the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>Fill in the information for the new job posting.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Job Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Senior DevOps Engineer"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="company">Company Name</FieldLabel>
                <Input
                  id="company"
                  name="company"
                  placeholder="e.g. TechCorp Inc."
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. San Francisco, CA"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="salary">Salary (Optional)</FieldLabel>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $120,000 - $160,000"
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select name="category" required value={jobCategory} onValueChange={setJobCategory}>
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="type">Job Type</FieldLabel>
                  <Select name="type" required value={jobType} onValueChange={setJobType}>
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="description">Job Description</FieldLabel>
                <FieldDescription>
                  Describe the role, responsibilities, and what makes this opportunity great.
                </FieldDescription>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter a detailed job description..."
                  rows={6}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="requirements">Requirements</FieldLabel>
                <FieldDescription>
                  Enter each requirement on a new line.
                </FieldDescription>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="5+ years of experience&#10;Proficiency in AWS or GCP&#10;Strong communication skills"
                  rows={4}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="apply_url">Apply URL</FieldLabel>
                <FieldDescription>
                  The external link where candidates will apply.
                </FieldDescription>
                <Input
                  id="apply_url"
                  name="apply_url"
                  type="url"
                  placeholder="https://company.com/careers/apply"
                  required
                />
              </Field>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                <div>
                  <Label htmlFor="featured" className="font-medium cursor-pointer">
                    Featured Job
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Featured jobs appear at the top of search results and on the homepage.
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Job"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
