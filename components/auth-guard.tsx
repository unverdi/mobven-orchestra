"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const loginTime = localStorage.getItem("orchestra_login_time")
      const userEmail = localStorage.getItem("orchestra_user_email")

      if (!loginTime || !userEmail) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      // Check if session is still valid (24 hours)
      const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours in milliseconds
      const currentTime = Date.now()
      const loginTimestamp = Number.parseInt(loginTime)

      if (currentTime - loginTimestamp > sessionDuration) {
        // Session expired
        localStorage.removeItem("orchestra_login_time")
        localStorage.removeItem("orchestra_user_email")
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      setIsAuthenticated(true)
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}

export default AuthGuard
