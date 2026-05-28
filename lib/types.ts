export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Remote" | "Full-time" | "Part-time" | "Internship" | "Contract"
  category: "DevOps" | "Cybersecurity" | "Cloud" | "Software" | "Internships" | "Scholarships"
  description: string
  requirements: string[]
  apply_url: string
  featured: boolean
  sponsored: boolean
  posted_at: string
  salary?: string
}

export interface JobFilters {
  category?: string
  location?: string
  remote?: boolean
  search?: string
}