"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X, Briefcase, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/auth-context"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/jobs?category=Internships", label: "Internships" },
  { href: "/jobs?category=Scholarships", label: "Scholarships" },
]

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, loading, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="size-4" />
          </div>
          <span>JobBoard</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!loading && (
            user ? (
              <>
                <span className="hidden sm:block text-sm text-muted-foreground">
                  {user.user_metadata?.full_name ?? user.email}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex gap-1"
                  onClick={signOut}
                >
                  <LogOut className="size-4" />
                  Sign out
                </Button>
              </>
            ) : (
              <Button asChild variant="ghost" className="hidden sm:flex">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
            )
          )}
          <Button asChild className="hidden sm:flex bg-emerald-600 hover:bg-emerald-700 text-white">
            
              href="https://whatsapp.com/channel/example"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join WhatsApp
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden border-t overflow-hidden transition-all duration-300",
          mobileMenuOpen ? "max-h-80" : "max-h-0"
        )}
      >
        <div className="container px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!loading && (
            user ? (
              <>
                <span className="text-sm text-muted-foreground py-1">
                  {user.user_metadata?.full_name ?? user.email}
                </span>
                <Button
                  variant="outline"
                  className="mt-2"
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                >
                  <LogOut className="size-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <Button asChild variant="outline" className="mt-2">
                <Link href="/auth/signin" onClick={()