"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"
import {
  CheckCircle,
  Clock,
  Play,
  Pause,
  Settings,
  BarChart3,
  Users,
  GitBranch,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Activity,
  Zap,
  AlertTriangle,
} from "lucide-react"

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const workflows = [
    {
      id: "sdlc-automation",
      name: "SDLC Automation Workflow",
      description: "End-to-end software development lifecycle automation with CI/CD integration",
      status: "active",
      category: "Development",
      progress: 85,
      lastRun: "2 hours ago",
      nextRun: "In 4 hours",
      completedTasks: 247,
      totalTasks: 290,
      efficiency: 92,
      icon: GitBranch,
      color: "bg-blue-500",
      integrations: ["Jira", "GitHub", "Slack"],
      successRate: 94.2,
      avgRunTime: "12 min",
    },
    {
      id: "employee-onboarding",
      name: "Employee Onboarding Workflow",
      description: "Automated new hire onboarding with training coordination and account setup",
      status: "active",
      category: "HR",
      progress: 78,
      lastRun: "1 hour ago",
      nextRun: "Tomorrow 9:00 AM",
      completedTasks: 156,
      totalTasks: 200,
      efficiency: 88,
      icon: Users,
      color: "bg-green-500",
      integrations: ["Azure AD", "Slack", "Email"],
      successRate: 96.8,
      avgRunTime: "8 min",
    },
    {
      id: "performance-reviews",
      name: "Performance Review Workflow",
      description: "Automated performance evaluation and feedback collection with analytics",
      status: "active",
      category: "HR",
      progress: 65,
      lastRun: "3 hours ago",
      nextRun: "Weekly on Fridays",
      completedTasks: 89,
      totalTasks: 137,
      efficiency: 91,
      icon: TrendingUp,
      color: "bg-purple-500",
      integrations: ["Azure AD", "Email", "Teams"],
      successRate: 89.5,
      avgRunTime: "15 min",
    },
    {
      id: "code-deployment",
      name: "Code Deployment Pipeline",
      description: "Automated code deployment with testing and rollback capabilities",
      status: "paused",
      category: "Development",
      progress: 45,
      lastRun: "6 hours ago",
      nextRun: "On demand",
      completedTasks: 78,
      totalTasks: 120,
      efficiency: 87,
      icon: Zap,
      color: "bg-orange-500",
      integrations: ["GitHub", "Azure", "Slack"],
      successRate: 91.3,
      avgRunTime: "18 min",
    },
    {
      id: "security-compliance",
      name: "Security Compliance Check",
      description: "Automated security audits and compliance monitoring",
      status: "error",
      category: "Security",
      progress: 30,
      lastRun: "1 day ago",
      nextRun: "Needs attention",
      completedTasks: 23,
      totalTasks: 45,
      efficiency: 76,
      icon: AlertTriangle,
      color: "bg-red-500",
      integrations: ["Azure", "Jira"],
      successRate: 82.1,
      avgRunTime: "25 min",
    },
    {
      id: "customer-support",
      name: "Customer Support Automation",
      description: "AI-powered customer support with ticket routing and escalation",
      status: "active",
      category: "Support",
      progress: 92,
      lastRun: "30 minutes ago",
      nextRun: "Continuous",
      completedTasks: 334,
      totalTasks: 350,
      efficiency: 95,
      icon: Users,
      color: "bg-indigo-500",
      integrations: ["Slack", "Email", "Jira"],
      successRate: 97.2,
      avgRunTime: "5 min",
    },
  ]

  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || workflow.status === statusFilter
    const matchesCategory = categoryFilter === "all" || workflow.category === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-3 h-3" />
      case "paused":
        return <Pause className="w-3 h-3" />
      case "error":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const totalWorkflows = workflows.length
  const activeWorkflows = workflows.filter((w) => w.status === "active").length
  const totalTasks = workflows.reduce((sum, w) => sum + w.completedTasks, 0)
  const avgEfficiency = Math.round(workflows.reduce((sum, w) => sum + w.efficiency, 0) / workflows.length)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
        <Header variant="dashboard" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Workflows
              </h1>
              <p className="text-slate-600 mt-1">Manage and monitor your automated workflows</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />
                {activeWorkflows} Active
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{totalWorkflows}</div>
                    <div className="text-sm text-slate-600">Total Workflows</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{activeWorkflows}</div>
                    <div className="text-sm text-slate-600">Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{totalTasks.toLocaleString()}</div>
                    <div className="text-sm text-slate-600">Tasks Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{avgEfficiency}%</div>
                    <div className="text-sm text-slate-600">Avg Efficiency</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search workflows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/80"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 bg-white/80">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="paused">Paused</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40 bg-white/80">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="HR">HR</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflows Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredWorkflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${workflow.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <workflow.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-900">
                          <Link href={`/workflows/${workflow.id}`} className="hover:text-blue-600 transition-colors">
                            {workflow.name}
                          </Link>
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getStatusColor(workflow.status)} text-xs`}>
                            {getStatusIcon(workflow.status)}
                            <span className="ml-1 capitalize">{workflow.status}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {workflow.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/workflows/${workflow.id}?tab=settings`}>
                        <Settings className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription className="text-slate-600 mt-2">{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50/50 rounded-xl">
                      <div className="text-lg font-bold text-blue-600">{workflow.completedTasks}</div>
                      <div className="text-xs text-slate-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-green-50/50 rounded-xl">
                      <div className="text-lg font-bold text-green-600">{workflow.efficiency}%</div>
                      <div className="text-xs text-slate-600">Efficiency</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50/50 rounded-xl">
                      <div className="text-lg font-bold text-purple-600">{workflow.successRate}%</div>
                      <div className="text-xs text-slate-600">Success Rate</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>
                        Progress ({workflow.completedTasks}/{workflow.totalTasks})
                      </span>
                      <span className="text-blue-600">{workflow.progress}%</span>
                    </div>
                    <Progress value={workflow.progress} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Integrations</span>
                      <div className="flex gap-1">
                        {workflow.integrations.map((integration, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Avg Runtime</span>
                      <span className="font-medium">{workflow.avgRunTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
                    <span>Last run: {workflow.lastRun}</span>
                    <span>Next: {workflow.nextRun}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredWorkflows.length === 0 && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No workflows found</h3>
                <p className="text-slate-600 mb-4">Try adjusting your search criteria or filters.</p>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
