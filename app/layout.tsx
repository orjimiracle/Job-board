import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context";


const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

export const metadata: Metadata = {
  title: {
    default: "JobBoard - Find Tech Jobs & Internships Fast",
    template: "%s | JobBoard"
  },
  description: "Discover the latest tech jobs, internships, and scholarships. Get instant updates on opportunities in DevOps, Cybersecurity, Cloud, and Software development.",
  keywords: ["tech jobs", "internships", "scholarships", "remote jobs", "DevOps", "cybersecurity", "cloud", "software developer"],
  authors: [{ name: "JobBoard" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JobBoard",
    title: "JobBoard - Find Tech Jobs & Internships Fast",
    description: "Discover the latest tech jobs, internships, and scholarships."
  },
  twitter: {
    card: "summary_large_image",
    title: "JobBoard - Find Tech Jobs & Internships Fast",
    description: "Discover the latest tech jobs, internships, and scholarships."
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" }
  ],
  width: "device-width",
  initialScale: 1
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
