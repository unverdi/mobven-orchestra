"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, User, Settings, LogOut, Bell, Search, Zap, HelpCircle } from "lucide-react"

interface HeaderProps {
  variant?: "landing" | "dashboard"
}

export function Header({ variant = "dashboard" }: HeaderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const loginTime = localStorage.getItem("orchestra_login_time")
    const email = localStorage.getItem("orchestra_user_email")

    if (loginTime && email) {
      setIsLoggedIn(true)
      setUserEmail(email)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("orchestra_login_time")
    localStorage.removeItem("orchestra_user_email")
    setIsLoggedIn(false)
    setUserEmail("")
    router.push("/")
  }

  const getUserInitials = (email: string) => {
    return email
      .split("@")[0]
      .split(".")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const isActivePath = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  if (variant === "landing") {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Orchestra</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/features" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="text-sm font-medium hover:text-purple-600 transition-colors">
                Docs
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-purple-600 transition-colors">
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Button variant="ghost" asChild className="hidden sm:inline-flex">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <Link href="/demo">Get Started</Link>
                </Button>
              </>
            ) : (
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <Link href="/features" className="block text-sm font-medium hover:text-purple-600 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="block text-sm font-medium hover:text-purple-600 transition-colors">
                Pricing
              </Link>
              <Link href="/docs" className="block text-sm font-medium hover:text-purple-600 transition-colors">
                Docs
              </Link>
              <Link href="/about" className="block text-sm font-medium hover:text-purple-600 transition-colors">
                About
              </Link>
              {!isLoggedIn && (
                <Link href="/login" className="block text-sm font-medium hover:text-purple-600 transition-colors">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Orchestra</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={`text-sm font-medium transition-colors ${
                isActivePath("/dashboard") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/workflows"
              className={`text-sm font-medium transition-colors ${
                isActivePath("/workflows") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Workflows
            </Link>
            <Link
              href="/agents"
              className={`text-sm font-medium transition-colors ${
                isActivePath("/agents") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Agents
            </Link>
            <Link
              href="/integrations"
              className={`text-sm font-medium transition-colors ${
                isActivePath("/integrations") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Integrations
            </Link>
            <Link
              href="/analytics"
              className={`text-sm font-medium transition-colors ${
                isActivePath("/analytics") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Analytics
            </Link>
          </nav>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Bell className="h-4 w-4" />
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="bg-purple-600 text-white text-xs">
                      {getUserInitials(userEmail)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-white border border-gray-200 shadow-lg z-[9999]"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Account</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                <Link href="/demo">Get Started</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-6 py-4 space-y-4">
            <Link
              href="/dashboard"
              className={`block text-sm font-medium transition-colors ${
                isActivePath("/dashboard") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/workflows"
              className={`block text-sm font-medium transition-colors ${
                isActivePath("/workflows") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Workflows
            </Link>
            <Link
              href="/agents"
              className={`block text-sm font-medium transition-colors ${
                isActivePath("/agents") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Agents
            </Link>
            <Link
              href="/integrations"
              className={`block text-sm font-medium transition-colors ${
                isActivePath("/integrations") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Integrations
            </Link>
            <Link
              href="/analytics"
              className={`block text-sm font-medium transition-colors ${
                isActivePath("/analytics") ? "text-purple-600" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Analytics
            </Link>
            {!isLoggedIn && (
              <Link
                href="/login"
                className="block text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
