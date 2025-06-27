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
  Bot,
  Code,
  Users,
  MessageSquare,
  BarChart3,
  Settings,
  Pause,
  Search,
  Filter,
  Plus,
  Activity,
  Zap,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const agents = [
    {
      id: "code-reviewer",
      name: "Code Review Assistant",
      description: "AI-powered code review agent that analyzes pull requests and provides feedback",
      status: "active",
      category: "Development",
      tasksCompleted: 1247,
      successRate: 94.2,
      avgResponseTime: "2.3s",
      lastActive: "5 minutes ago",
      integrations: ["GitHub", "GitLab", "Slack"],
      efficiency: 92,
      icon: Code,
      color: "bg-blue-500",
    },
    {
      id: "hr-onboarding",
      name: "HR Onboarding Bot",
      description: "Automated employee onboarding assistant with document processing",
      status: "active",
      category: "HR",
      tasksCompleted: 856,
      successRate: 96.8,
      avgResponseTime: "1.8s",
      lastActive: "2 minutes ago",
      integrations: ["Azure AD", "Slack", "Email"],
      efficiency: 88,
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: "performance-analyzer",
      name: "Performance Review Agent",
      description: "Analyzes employee performance data and generates insights",
      status: "active",
      category: "HR",
      tasksCompleted: 423,
      successRate: 89.5,
      avgResponseTime: "4.1s",
      lastActive: "1 hour ago",
      integrations: ["Azure AD", "Teams", "Email"],
      efficiency: 91,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      id: "customer-support",
      name: "Customer Support AI",
      description: "24/7 customer support agent with natural language processing",
      status: "paused",
      category: "Support",
      tasksCompleted: 2341,
      successRate: 87.3,
      avgResponseTime: "1.2s",
      lastActive: "3 hours ago",
      integrations: ["Zendesk", "Slack", "Email"],
      efficiency: 85,
      icon: MessageSquare,
      color: "bg-orange-500",
    },
    {
      id: "data-analyst",
      name: "Data Analysis Agent",
      description: "Automated data analysis and reporting with machine learning insights",
      status: "error",
      category: "Analytics",
      tasksCompleted: 178,
      successRate: 76.4,
      avgResponseTime: "8.7s",
      lastActive: "1 day ago",
      integrations: ["Power BI", "SQL Server"],
      efficiency: 73,
      icon: BarChart3,
      color: "bg-red-500",
    },
    {
      id: "security-monitor",
      name: "Security Monitoring Agent",
      description: "Real-time security threat detection and incident response",
      status: "active",
      category: "Security",
      tasksCompleted: 3421,
      successRate: 98.1,
      avgResponseTime: "0.8s",
      lastActive: "Just now",
      integrations: ["Azure Security", "Splunk"],
      efficiency: 97,
      icon: Bot,
      color: "bg-indigo-500",
    },
  ]

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || agent.status === statusFilter
    const matchesCategory = categoryFilter === "all" || agent.category === categoryFilter

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
        return <Activity className="w-3 h-3" />
      case "paused":
        return <Pause className="w-3 h-3" />
      case "error":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const totalAgents = agents.length
  const activeAgents = agents.filter((a) => a.status === "active").length
  const totalTasks = agents.reduce((sum, a) => sum + a.tasksCompleted, 0)
  const avgSuccessRate = Math.round(agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length)

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
        <Header variant="dashboard" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                AI Agents
              </h1>
              <p className="text-slate-600 mt-1">Manage and monitor your intelligent automation agents</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />
                {activeAgents} Active
              </Badge>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" asChild>
                <Link href="/agents/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Agent
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{totalAgents}</div>
                    <div className="text-sm text-slate-600">Total Agents</div>
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
                    <div className="text-2xl font-bold text-slate-900">{activeAgents}</div>
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
                    <div className="text-2xl font-bold text-slate-900">{avgSuccessRate}%</div>
                    <div className="text-sm text-slate-600">Avg Success Rate</div>
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
                      placeholder="Search agents..."
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
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Analytics">Analytics</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agents Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${agent.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <agent.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-900">
                          <Link href={`/agents/${agent.id}`} className="hover:text-blue-600 transition-colors">
                            {agent.name}
                          </Link>
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`${getStatusColor(agent.status)} text-xs`}>
                            {getStatusIcon(agent.status)}
                            <span className="ml-1 capitalize">{agent.status}</span>
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {agent.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/agents/${agent.id}?tab=settings`}>
                        <Settings className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                  <CardDescription className="text-slate-600 mt-2">{agent.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-blue-50/50 rounded-xl">
                      <div className="text-lg font-bold text-blue-600">{agent.tasksCompleted}</div>
                      <div className="text-xs text-slate-600">Tasks</div>
                    </div>
                    <div className="text-center p-3 bg-green-50/50 rounded-xl">
                      <div className="text-lg font-bold text-green-600">{agent.successRate}%</div>
                      <div className="text-xs text-slate-600">Success</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50/50 rounded-xl">
                      <div className="text-lg font-bold text-purple-600">{agent.avgResponseTime}</div>
                      <div className="text-xs text-slate-600">Response</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Efficiency Score</span>
                      <span className="text-blue-600">{agent.efficiency}%</span>
                    </div>
                    <Progress value={agent.efficiency} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Integrations</span>
                      <div className="flex gap-1">
                        {agent.integrations.map((integration, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                            {integration}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Last Active</span>
                      <span className="font-medium">{agent.lastActive}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No agents found</h3>
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
