import type { Job } from "./types"

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior DevOps Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Remote",
    category: "DevOps",
    description: "We are looking for an experienced DevOps Engineer to join our growing team. You will be responsible for building and maintaining our cloud infrastructure, implementing CI/CD pipelines, and ensuring the reliability and scalability of our systems.",
    requirements: [
      "5+ years of experience in DevOps or SRE roles",
      "Strong experience with AWS, GCP, or Azure",
      "Proficiency in Terraform, Kubernetes, and Docker",
      "Experience with CI/CD tools like Jenkins, GitLab CI, or GitHub Actions",
      "Strong scripting skills in Python or Bash"
    ],
    applyUrl: "https://example.com/apply/1",
    featured: true,
    sponsored: false,
    postedAt: "2024-01-15",
    salary: "$150,000 - $200,000"
  },
  {
    id: "2",
    title: "Cybersecurity Analyst",
    company: "SecureNet Solutions",
    location: "New York, NY",
    type: "Full-time",
    category: "Cybersecurity",
    description: "Join our security team to protect critical infrastructure and respond to security incidents. You will conduct vulnerability assessments, monitor security systems, and develop security policies.",
    requirements: [
      "3+ years of experience in cybersecurity",
      "Knowledge of SIEM tools and security frameworks",
      "Experience with penetration testing",
      "Security certifications (CISSP, CEH, or equivalent)",
      "Strong analytical and problem-solving skills"
    ],
    applyUrl: "https://example.com/apply/2",
    featured: true,
    sponsored: true,
    postedAt: "2024-01-14",
    salary: "$120,000 - $160,000"
  },
  {
    id: "3",
    title: "Cloud Solutions Architect",
    company: "CloudFirst",
    location: "Austin, TX",
    type: "Remote",
    category: "Cloud",
    description: "Design and implement scalable cloud solutions for enterprise clients. Work with cutting-edge cloud technologies and help organizations modernize their infrastructure.",
    requirements: [
      "7+ years of experience in cloud architecture",
      "AWS Solutions Architect certification required",
      "Experience with multi-cloud environments",
      "Strong communication and presentation skills",
      "Experience with infrastructure as code"
    ],
    applyUrl: "https://example.com/apply/3",
    featured: false,
    sponsored: false,
    postedAt: "2024-01-13",
    salary: "$180,000 - $250,000"
  },
  {
    id: "4",
    title: "Software Engineering Intern",
    company: "StartupXYZ",
    location: "Remote",
    type: "Internship",
    category: "Internships",
    description: "Summer internship opportunity for aspiring software engineers. Work on real projects, learn from experienced mentors, and gain hands-on experience with modern technologies.",
    requirements: [
      "Currently pursuing a degree in Computer Science or related field",
      "Familiarity with JavaScript, Python, or Java",
      "Basic understanding of web development",
      "Strong desire to learn and grow",
      "Available for 3-month commitment"
    ],
    applyUrl: "https://example.com/apply/4",
    featured: true,
    sponsored: false,
    postedAt: "2024-01-12"
  },
  {
    id: "5",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Seattle, WA",
    type: "Full-time",
    category: "Software",
    description: "Build and maintain web applications using modern frameworks. Collaborate with designers and product managers to deliver exceptional user experiences.",
    requirements: [
      "4+ years of full stack development experience",
      "Proficiency in React, Node.js, and TypeScript",
      "Experience with PostgreSQL or MongoDB",
      "Knowledge of RESTful APIs and GraphQL",
      "Strong problem-solving skills"
    ],
    applyUrl: "https://example.com/apply/5",
    featured: false,
    sponsored: true,
    postedAt: "2024-01-11",
    salary: "$130,000 - $170,000"
  },
  {
    id: "6",
    title: "Tech Scholarship 2024",
    company: "TechFoundation",
    location: "Worldwide",
    type: "Full-time",
    category: "Scholarships",
    description: "Full scholarship for students pursuing technology degrees. Covers tuition, books, and living expenses for up to 4 years. Open to students from underrepresented backgrounds.",
    requirements: [
      "Enrolled in a technology-related degree program",
      "Minimum GPA of 3.5",
      "Demonstrated financial need",
      "Strong academic record",
      "Commitment to giving back to the community"
    ],
    applyUrl: "https://example.com/apply/6",
    featured: true,
    sponsored: false,
    postedAt: "2024-01-10"
  },
  {
    id: "7",
    title: "Junior Cloud Engineer",
    company: "CloudScale",
    location: "Denver, CO",
    type: "Full-time",
    category: "Cloud",
    description: "Entry-level position for cloud enthusiasts. Learn and grow with our team while working on exciting cloud projects.",
    requirements: [
      "1-2 years of experience with cloud platforms",
      "Basic understanding of networking concepts",
      "Familiarity with Linux systems",
      "AWS Cloud Practitioner certification preferred",
      "Eagerness to learn and adapt"
    ],
    applyUrl: "https://example.com/apply/7",
    featured: false,
    sponsored: false,
    postedAt: "2024-01-09",
    salary: "$80,000 - $100,000"
  },
  {
    id: "8",
    title: "Security Operations Center Analyst",
    company: "CyberDefend",
    location: "Chicago, IL",
    type: "Full-time",
    category: "Cybersecurity",
    description: "Monitor and respond to security threats in our 24/7 SOC. Work with cutting-edge security tools and protect our clients from cyber threats.",
    requirements: [
      "2+ years of SOC experience",
      "Knowledge of SIEM platforms (Splunk, QRadar)",
      "Understanding of network protocols",
      "Security+ certification preferred",
      "Ability to work rotating shifts"
    ],
    applyUrl: "https://example.com/apply/8",
    featured: false,
    sponsored: false,
    postedAt: "2024-01-08",
    salary: "$90,000 - $120,000"
  },
  {
    id: "9",
    title: "DevOps Intern",
    company: "TechGiants",
    location: "Remote",
    type: "Internship",
    category: "Internships",
    description: "Learn DevOps practices in a supportive environment. Gain experience with CI/CD, containerization, and cloud infrastructure.",
    requirements: [
      "Currently pursuing a degree in CS or related field",
      "Basic understanding of Linux and command line",
      "Interest in automation and infrastructure",
      "Knowledge of at least one programming language",
      "Available for 6-month internship"
    ],
    applyUrl: "https://example.com/apply/9",
    featured: false,
    sponsored: false,
    postedAt: "2024-01-07"
  },
  {
    id: "10",
    title: "Senior Software Engineer",
    company: "MegaSoft",
    location: "Boston, MA",
    type: "Remote",
    category: "Software",
    description: "Lead development of our flagship product. Mentor junior developers and drive technical decisions.",
    requirements: [
      "8+ years of software development experience",
      "Expert-level knowledge of Java or Python",
      "Experience with distributed systems",
      "Strong leadership and mentoring skills",
      "Track record of delivering complex projects"
    ],
    applyUrl: "https://example.com/apply/10",
    featured: true,
    sponsored: false,
    postedAt: "2024-01-06",
    salary: "$200,000 - $280,000"
  },
  {
    id: "11",
    title: "Cloud Security Engineer",
    company: "SecureCloud",
    location: "Miami, FL",
    type: "Full-time",
    category: "Cloud",
    description: "Secure our multi-cloud infrastructure. Implement security controls and ensure compliance with industry standards.",
    requirements: [
      "5+ years of cloud security experience",
      "Experience with AWS, Azure, and GCP security services",
      "Knowledge of compliance frameworks (SOC2, HIPAA)",
      "CCSP or AWS Security Specialty certification",
      "Experience with security automation"
    ],
    applyUrl: "https://example.com/apply/11",
    featured: false,
    sponsored: true,
    postedAt: "2024-01-05",
    salary: "$160,000 - $210,000"
  },
  {
    id: "12",
    title: "Women in Tech Scholarship",
    company: "DiversityTech",
    location: "USA",
    type: "Full-time",
    category: "Scholarships",
    description: "Supporting women pursuing careers in technology. Full tuition coverage plus mentorship and networking opportunities.",
    requirements: [
      "Identify as a woman",
      "Enrolled in a STEM program",
      "Minimum GPA of 3.0",
      "Demonstrated interest in technology",
      "Active in community service"
    ],
    applyUrl: "https://example.com/apply/12",
    featured: false,
    sponsored: false,
    postedAt: "2024-01-04"
  }
]

export const dashboardStats = {
  totalJobs: 156,
  totalClicks: 12543,
  totalVisitors: 45678,
  mostViewedJob: mockJobs[0]
}

export const analyticsData = {
  pageViews: [
    { date: "Mon", views: 1200 },
    { date: "Tue", views: 1400 },
    { date: "Wed", views: 1100 },
    { date: "Thu", views: 1800 },
    { date: "Fri", views: 2100 },
    { date: "Sat", views: 900 },
    { date: "Sun", views: 700 }
  ],
  jobClicks: [
    { date: "Mon", clicks: 320 },
    { date: "Tue", clicks: 450 },
    { date: "Wed", clicks: 280 },
    { date: "Thu", clicks: 520 },
    { date: "Fri", clicks: 680 },
    { date: "Sat", clicks: 220 },
    { date: "Sun", clicks: 180 }
  ],
  whatsappClicks: [
    { date: "Mon", clicks: 85 },
    { date: "Tue", clicks: 120 },
    { date: "Wed", clicks: 95 },
    { date: "Thu", clicks: 150 },
    { date: "Fri", clicks: 180 },
    { date: "Sat", clicks: 60 },
    { date: "Sun", clicks: 45 }
  ]
}
