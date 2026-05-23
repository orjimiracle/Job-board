import Link from "next/link"
import { Briefcase } from "lucide-react"
import { AdSlot } from "@/components/ad-slot"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-8">
        <AdSlot variant="footer" className="mb-8" />
        
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="size-4" />
              </div>
              <span>JobBoard</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Your go-to platform for finding tech jobs, internships, and scholarships. 
              Join our WhatsApp channel for instant updates on the latest opportunities.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/jobs" className="hover:text-foreground transition-colors">All Jobs</Link></li>
              <li><Link href="/jobs?category=Internships" className="hover:text-foreground transition-colors">Internships</Link></li>
              <li><Link href="/jobs?category=Scholarships" className="hover:text-foreground transition-colors">Scholarships</Link></li>
              <li><Link href="/jobs?type=Remote" className="hover:text-foreground transition-colors">Remote Jobs</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/jobs?category=DevOps" className="hover:text-foreground transition-colors">DevOps</Link></li>
              <li><Link href="/jobs?category=Cybersecurity" className="hover:text-foreground transition-colors">Cybersecurity</Link></li>
              <li><Link href="/jobs?category=Cloud" className="hover:text-foreground transition-colors">Cloud</Link></li>
              <li><Link href="/jobs?category=Software" className="hover:text-foreground transition-colors">Software</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JobBoard. All rights reserved.
          </p>
          <a 
            href="https://whatsapp.com/channel/example" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join WhatsApp Channel
          </a>
        </div>
      </div>
    </footer>
  )
}
