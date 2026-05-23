"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, Loader2, CheckCircle2 } from "lucide-react";

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
  );
}

const benefits = [
  "Save jobs to your profile",
  "Get personalized job alerts",
  "Track your applications",
  "One-click apply to jobs",
];

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    // Simulate loading - in production, this would trigger Google OAuth
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border border-primary-foreground/20 rounded-full" />
          <div className="absolute bottom-20 right-20 w-96 h-96 border border-primary-foreground/20 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-primary-foreground/20 rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-primary-foreground">
          <div className="flex items-center gap-3 mb-12">
            <div className="h-12 w-12 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Briefcase className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">JobBoard</span>
          </div>

          <h1 className="text-4xl font-bold mb-6 text-balance">
            Find your dream tech job today
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-10">
            Join thousands of professionals who found their perfect role through our platform.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/90">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/60">
              Trusted by 10,000+ job seekers and 500+ companies
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Sign In */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">J</span>
              </div>
              <span className="text-2xl font-bold text-foreground">JobBoard</span>
            </Link>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to continue to JobBoard
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Button
                variant="outline"
                size="lg"
                className="w-full h-12 text-base font-medium border-border hover:bg-accent transition-colors"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                ) : (
                  <GoogleIcon className="mr-3 h-5 w-5" />
                )}
                {isLoading ? "Signing in..." : "Continue with Google"}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Quick and secure
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                By continuing, you agree to our{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2">
              <div className="text-center text-sm text-muted-foreground">
                {"Don't have an account?"}{" "}
                <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
