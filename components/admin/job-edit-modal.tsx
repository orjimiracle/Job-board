"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
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
import type { Job } from "@/lib/types"
import { updateJob } from "@/lib/db"

interface JobEditModalProps {
  isOpen: boolean
  onClose: () => void
  job: Job | null
  onJobUpdated: (updatedJob: Job) => void
}

const categories = ["DevOps", "Cybersecurity", "Cloud", "Software", "Internships", "Scholarships"]
const jobTypes = ["Remote", "Full-time", "Part-time", "Internship", "Contract"]

export function JobEditModal({ isOpen, onClose, job, onJobUpdated }: JobEditModalProps) {
  const [formData, setFormData] = useState<Partial<Job>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (job) {
      setFormData({
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary || '',
        category: job.category,
        type: job.type,
        description: job.description,
        requirements: job.requirements.join('
'), // Convert array to string for textarea
        applyUrl: job.applyUrl,
        featured: job.featured,
        sponsored: job.sponsored,
      });
    }
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof Job, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: keyof Job, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job?.id) return;

    setIsSubmitting(true);
    const updates = {
      ...formData,
      requirements: (formData.requirements as string)?.split('
').map(req => req.trim()).filter(req => req !== ''),
    };

    const updated = await updateJob(job.id, updates);

    if (updated) {
      onJobUpdated(updated); // Pass the updated job back to the parent
      onClose();
    } else {
      console.error("Failed to update job.");
    }
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Job: {job?.title}</DialogTitle>
          <DialogDescription>
            Make changes to the job details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Job Title</FieldLabel>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="company">Company Name</FieldLabel>
                <Input
                  id="company"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ''}
                    onChange={handleChange}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="salary">Salary (Optional)</FieldLabel>
                  <Input
                    id="salary"
                    name="salary"
                    value={formData.salary || ''}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select 
                    name="category" 
                    value={formData.category || ''} 
                    onValueChange={(val) => handleSelectChange('category', val)}
                    required
                  >
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
                  <Select 
                    name="type" 
                    value={formData.type || ''} 
                    onValueChange={(val) => handleSelectChange('type', val)}
                    required
                  >
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
                  value={formData.description || ''}
                  onChange={handleChange}
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
                  value={formData.requirements || ''}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="applyUrl">Apply URL</FieldLabel>
                <FieldDescription>
                  The external link where candidates will apply.
                </FieldDescription>
                <Input
                  id="applyUrl"
                  name="applyUrl"
                  type="url"
                  value={formData.applyUrl || ''}
                  onChange={handleChange}
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
                  checked={formData.featured || false}
                  onCheckedChange={(checked) => handleSwitchChange('featured', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                <div>
                  <Label htmlFor="sponsored" className="font-medium cursor-pointer">
                    Sponsored Job
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Sponsored jobs appear in prominent positions.
                  </p>
                </div>
                <Switch
                  id="sponsored"
                  checked={formData.sponsored || false}
                  onCheckedChange={(checked) => handleSwitchChange('sponsored', checked)}
                />
              </div>

            </FieldGroup>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving changes..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
