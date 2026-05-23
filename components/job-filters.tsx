"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import { X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  "All Categories",
  "DevOps",
  "Cybersecurity",
  "Cloud",
  "Software",
  "Internships",
  "Scholarships",
]

const locations = [
  "All Locations",
  "Remote",
  "San Francisco, CA",
  "New York, NY",
  "Austin, TX",
  "Seattle, WA",
  "Boston, MA",
  "Chicago, IL",
  "Denver, CO",
  "Miami, FL",
]

export function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const category = searchParams.get("category") || ""
  const location = searchParams.get("location") || ""
  const remote = searchParams.get("remote") === "true"

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== "All Categories" && value !== "All Locations") {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleCategoryChange = (value: string) => {
    router.push(`/jobs?${createQueryString("category", value)}`)
  }

  const handleLocationChange = (value: string) => {
    router.push(`/jobs?${createQueryString("location", value)}`)
  }

  const handleRemoteToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    if (checked) {
      params.set("remote", "true")
    } else {
      params.delete("remote")
    }
    router.push(`/jobs?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/jobs")
  }

  const hasActiveFilters = category || location || remote

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
            <X className="size-3 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {category && (
            <Badge variant="secondary" className="gap-1">
              {category}
              <button onClick={() => handleCategoryChange("")} className="ml-1 hover:text-destructive">
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {location && (
            <Badge variant="secondary" className="gap-1">
              {location}
              <button onClick={() => handleLocationChange("")} className="ml-1 hover:text-destructive">
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {remote && (
            <Badge variant="secondary" className="gap-1">
              Remote Only
              <button onClick={() => handleRemoteToggle(false)} className="ml-1 hover:text-destructive">
                <X className="size-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category || "All Categories"} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select value={location || "All Locations"} onValueChange={handleLocationChange}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Label htmlFor="remote" className="cursor-pointer">Remote Only</Label>
          <Switch
            id="remote"
            checked={remote}
            onCheckedChange={handleRemoteToggle}
          />
        </div>
      </div>
    </div>
  )
}
