"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  PlusCircle, 
  Briefcase, 
  BarChart3, 
  Settings,
  ChevronLeft,
  Menu,
  Megaphone,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useAdminAuth } from "@/contexts/admin-auth-context"

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/create", icon: PlusCircle, label: "Create Job" },
  { href: "/admin/jobs", icon: Briefcase, label: "Manage Jobs" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/ads", icon: Megaphone, label: "Ads" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { logout } = useAdminAuth()

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-background">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
            <Briefcase className="size-4" />
          </div>
          <span>Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed top-16 left-0 bottom-0 z-50 w-64 bg-background border-r transform transition-transform",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <item.icon className="size-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            onClick={logout}
          >
            <LogOut className="size-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 border-r bg-background transition-all",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          {!collapsed && (
            <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="size-4" />
              </div>
              <span>Admin</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/admin" className="mx-auto">
              <div className="flex items-center justify-center size-8 rounded-lg bg-primary text-primary-foreground">
                <Briefcase className="size-4" />
              </div>
            </Link>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="size-5 shrink-0" />
              {!collapsed && item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t space-y-2">
          <div className={cn("flex", collapsed ? "justify-center" : "justify-between")}>
            {!collapsed && <ThemeToggle />}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn(collapsed && "mx-auto")}
            >
              <ChevronLeft className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
            </Button>
          </div>
          {!collapsed && (
            <Button asChild variant="outline" className="w-full" size="sm">
              <Link href="/">View Site</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            className={cn(
              "w-full text-muted-foreground hover:text-foreground",
              collapsed ? "justify-center px-0" : "justify-start gap-3"
            )}
            size="sm"
            onClick={logout}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="size-4 shrink-0" />
            {!collapsed && "Logout"}
          </Button>
        </div>
      </div>
    </>
  )
}
