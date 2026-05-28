export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: "Remote" | "Full-time" | "Part-time" | "Internship" | "Contract"
  category: "DevOps" | "Cybersecurity" | "Cloud" | "Software" | "Internships" | "Scholarships"
  description: string
  requirements: string[]
  applyUrl: string
  featured: boolean
  sponsored: boolean
  postedat: string   // DB column is all lowercase: postedat
  salary?: string
}

export interface JobFilters {
  category?: string
  location?: string
  remote?: boolean
  search?: string
}