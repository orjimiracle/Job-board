"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

interface AdminAuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (accessCode: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

const ADMIN_ACCESS_CODE = "admin123"
const AUTH_STORAGE_KEY = "jobboard_admin_auth"

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing auth on mount
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)
    if (storedAuth === "true") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      const isLoginPage = pathname === "/admin/login"
      
      if (!isAuthenticated && !isLoginPage && pathname?.startsWith("/admin")) {
        router.push("/admin/login")
      }
      
      if (isAuthenticated && isLoginPage) {
        router.push("/admin")
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const login = (accessCode: string): boolean => {
    if (accessCode === ADMIN_ACCESS_CODE) {
      setIsAuthenticated(true)
      localStorage.setItem(AUTH_STORAGE_KEY, "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    router.push("/admin/login")
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider")
  }
  return context
}
