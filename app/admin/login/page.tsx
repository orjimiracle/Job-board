"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Shield, Loader2, KeyRound, AlertCircle } from "lucide-react"
import { useAdminAuth } from "@/contexts/admin-auth-context"

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

export default function AdminLoginPage() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [accessCode, setAccessCode] = useState("")
  const [error, setError] = useState("")
  const [isCodeLoading, setIsCodeLoading] = useState(false)
  const { login } = useAdminAuth()
  const router = useRouter()

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    setError("")
    // Simulate Google OAuth - in production, this would trigger real OAuth
    setTimeout(() => {
      setIsGoogleLoading(false)
      setError("Google OAuth is not configured yet. Please use the access code.")
    }, 1500)
  }

  const handleAccessCodeLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsCodeLoading(true)

    // Simulate a brief loading state
    setTimeout(() => {
      const success = login(accessCode)
      if (success) {
        router.push("/admin")
      } else {
        setError("Invalid access code. Please try again.")
        setIsCodeLoading(false)
      }
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">J</span>
            </div>
            <span className="text-2xl font-bold text-foreground">JobBoard</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Dashboard Login</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Sign In */}
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-base font-medium border-border hover:bg-accent transition-colors"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isCodeLoading}
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-3 h-5 w-5 animate-spin" />
              ) : (
                <GoogleIcon className="mr-3 h-5 w-5" />
              )}
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or use access code
                </span>
              </div>
            </div>

            {/* Access Code Form */}
            <form onSubmit={handleAccessCodeLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter admin access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="pl-10 h-12"
                    disabled={isCodeLoading}
                  />
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full h-12 text-base font-medium"
                disabled={!accessCode || isCodeLoading || isGoogleLoading}
              >
                {isCodeLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Access Dashboard"
                )}
              </Button>
            </form>

            <div className="rounded-lg bg-muted/50 p-4 border border-border/50">
              <p className="text-sm text-muted-foreground text-center">
                Only authorized admins can access this dashboard. For demo purposes, use access code: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono text-xs">admin123</code>
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pt-2">
            <div className="text-center text-sm text-muted-foreground">
              <Link href="/" className="text-primary hover:underline font-medium">
                Back to homepage
              </Link>
            </div>
          </CardFooter>
        </Card>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Protected by enterprise-grade security. Your data is safe with us.
        </p>
      </div>
    </div>
  )
}
