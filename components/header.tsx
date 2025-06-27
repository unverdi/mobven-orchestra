"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Bell,
  Settings,
  User,
  LogOut,
  Home,
  BarChart3,
  Users,
  GitBranch,
  Zap,
  HelpCircle,
  Plus,
  Menu,
  X,
} from "lucide-react"

interface HeaderProps {
  variant?: "landing" | "dashboard"
}

export function Header({ variant = "landing" }: HeaderProps) {
  const router = useRouter()
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Get user email from localStorage for avatar initials
  const userEmail =
    typeof window !== "undefined"
      ? localStorage.getItem("orchestra_user_email") || "admin@mobven.com"
      : "admin@mobven.com"
  const userInitials = userEmail ? userEmail.split("@")[0].substring(0, 2).toUpperCase() : "U"

  const handleLogout = () => {
    localStorage.removeItem("orchestra_login_time")
    localStorage.removeItem("orchestra_user_email")
    router.push("/login")
  }

  if (variant === "landing") {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-xl">Orchestra</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </Link>
              <Link href="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </Link>
              <Link
                href="/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                Docs
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                About
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <nav className="flex flex-col space-y-4">
                <Link href="/features" className="text-slate-600 hover:text-slate-900 transition-colors px-4">
                  Features
                </Link>
                <Link href="/pricing" className="text-slate-600 hover:text-slate-900 transition-colors px-4">
                  Pricing
                </Link>
                <Link
                  href="/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-slate-900 transition-colors px-4"
                >
                  Docs
                </Link>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors px-4">
                  About
                </Link>
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                >
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    Get Started
                  </Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">Orchestra</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/workflows"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              <span>Workflows</span>
            </Link>
            <Link
              href="/agents"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Users className="w-4 h-4" />
              <span>Agents</span>
            </Link>
            <Link
              href="/integrations"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <Zap className="w-4 h-4" />
              <span>Integrations</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/workflows/create">
                    <GitBranch className="w-4 h-4 mr-2" />
                    New Workflow
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/agents/create">
                    <Users className="w-4 h-4 mr-2" />
                    New Agent
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setIsIntegrationsOpen(true)}>
                  <Zap className="w-4 h-4 mr-2" />
                  Add Integration
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0 min-w-[20px]">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Workflow completed successfully</p>
                    <p className="text-xs text-slate-500">SDLC Automation finished in 45 minutes</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">New integration available</p>
                    <p className="text-xs text-slate-500">Slack integration is now ready to configure</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">Agent requires attention</p>
                    <p className="text-xs text-slate-500">Code Review Agent needs API key update</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center">
                  <span className="text-sm text-blue-600">View all notifications</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-medium">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Admin User</p>
                    <p className="text-xs leading-none text-slate-500">{userEmail}</p>
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
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors px-4"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/workflows"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors px-4"
              >
                <GitBranch className="w-4 h-4" />
                <span>Workflows</span>
              </Link>
              <Link
                href="/agents"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors px-4"
              >
                <Users className="w-4 h-4" />
                <span>Agents</span>
              </Link>
              <Link
                href="/integrations"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors px-4"
              >
                <Zap className="w-4 h-4" />
                <span>Integrations</span>
              </Link>
              <Link
                href="/analytics"
                className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors px-4"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </Link>
            </nav>
          </div>
        )}
      </div>

      {/* Integration Settings Modal */}
      <Dialog open={isIntegrationsOpen} onOpenChange={setIsIntegrationsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white shadow-2xl border-0 rounded-3xl z-[100]">
          <DialogHeader className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 -m-6 p-6 mb-6 rounded-t-3xl">
            <DialogTitle>Add New Integration</DialogTitle>
            <DialogDescription>
              Connect Orchestra with your favorite tools and services to automate your workflows.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 p-6">
            {/* Integration Type Selection */}
            <div>
              <Label htmlFor="integration-type">Integration Type</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select integration type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slack">Slack</SelectItem>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="gitlab">GitLab</SelectItem>
                  <SelectItem value="jira">Jira</SelectItem>
                  <SelectItem value="azure">Azure DevOps</SelectItem>
                  <SelectItem value="aws">AWS</SelectItem>
                  <SelectItem value="gcp">Google Cloud</SelectItem>
                  <SelectItem value="docker">Docker</SelectItem>
                  <SelectItem value="kubernetes">Kubernetes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Integration Name */}
            <div>
              <Label htmlFor="integration-name">Integration Name</Label>
              <Input id="integration-name" placeholder="Enter a name for this integration" className="mt-1" />
            </div>

            {/* API Configuration */}
            <div>
              <Label htmlFor="api-key">API Key / Token</Label>
              <Input id="api-key" type="password" placeholder="Enter your API key or access token" className="mt-1" />
            </div>

            {/* Server URL (optional) */}
            <div>
              <Label htmlFor="server-url">Server URL (Optional)</Label>
              <Input id="server-url" placeholder="https://your-server.com" className="mt-1" />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="integration-description">Description</Label>
              <Textarea
                id="integration-description"
                placeholder="Describe how this integration will be used"
                className="mt-1"
                rows={3}
              />
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable Integration</Label>
                  <p className="text-sm text-slate-600">Allow this integration to be used in workflows</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-sync</Label>
                  <p className="text-sm text-slate-600">Automatically sync data every hour</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Send Notifications</Label>
                  <p className="text-sm text-slate-600">Receive notifications for integration events</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsIntegrationsOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Integration
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}

export default Header
