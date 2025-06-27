"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Bot,
  GitBranch,
  MessageSquare,
  Calendar,
  Award,
  ArrowRight,
  Play,
  Settings,
  Eye,
  Plus,
} from "lucide-react"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const metrics = [
    {
      title: "Active Workflows",
      value: "6",
      change: "+2 this month",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/workflows",
    },
    {
      title: "AI Agents",
      value: "4",
      change: "+1 this week",
      trend: "up",
      icon: Bot,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/agents",
    },
    {
      title: "Tasks Automated",
      value: "1,247",
      change: "+18% from last month",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/analytics",
    },
    {
      title: "Time Saved",
      value: "340h",
      change: "This month",
      trend: "up",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/analytics",
    },
  ]

  const recentWorkflows = [
    {
      id: "sdlc-automation",
      name: "SDLC Automation",
      status: "active",
      lastRun: "2 hours ago",
      nextRun: "In 4 hours",
      efficiency: 92.4,
      icon: GitBranch,
      color: "bg-blue-500",
    },
    {
      id: "employee-onboarding",
      name: "Employee Onboarding",
      status: "active",
      lastRun: "1 hour ago",
      nextRun: "Tomorrow 9:00 AM",
      efficiency: 88.7,
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: "performance-reviews",
      name: "Performance Reviews",
      status: "active",
      lastRun: "3 hours ago",
      nextRun: "Weekly on Fridays",
      efficiency: 91.2,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ]

  const recentAgents = [
    {
      id: "code-reviewer",
      name: "Code Review Assistant",
      status: "active",
      tasksCompleted: 1247,
      successRate: 94.2,
      lastActive: "5 minutes ago",
      icon: GitBranch,
      color: "bg-blue-500",
    },
    {
      id: "hr-onboarding",
      name: "HR Onboarding Bot",
      status: "active",
      tasksCompleted: 856,
      successRate: 96.8,
      lastActive: "2 minutes ago",
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: "customer-support",
      name: "Customer Support AI",
      status: "paused",
      tasksCompleted: 2341,
      successRate: 87.3,
      lastActive: "3 hours ago",
      icon: MessageSquare,
      color: "bg-orange-500",
    },
  ]

  const recentActivity = [
    {
      type: "success",
      title: "SDLC Automation completed deployment",
      description: "Successfully deployed v2.1.4 to production",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-green-600",
      href: "/workflows/sdlc-automation",
    },
    {
      type: "info",
      title: "Employee Onboarding started",
      description: "New hire Sarah Johnson - Software Engineer",
      time: "3 hours ago",
      icon: Users,
      color: "text-blue-600",
      href: "/workflows/employee-onboarding",
    },
    {
      type: "success",
      title: "Code Review Assistant completed review",
      description: "Analyzed 15 pull requests with 94% accuracy",
      time: "5 hours ago",
      icon: Bot,
      color: "text-purple-600",
      href: "/agents/code-reviewer",
    },
    {
      type: "warning",
      title: "Security Compliance check failed",
      description: "Compliance check requires manual intervention",
      time: "1 day ago",
      icon: AlertTriangle,
      color: "text-orange-600",
      href: "/workflows/security-compliance",
    },
  ]

  const upcomingTasks = [
    {
      title: "Performance Review Cycle Q1",
      description: "Quarterly performance reviews for all employees",
      dueDate: "In 2 days",
      priority: "high",
      workflow: "Performance Reviews",
      icon: Award,
    },
    {
      title: "Security Audit",
      description: "Monthly security compliance check",
      dueDate: "In 5 days",
      priority: "medium",
      workflow: "Security Compliance",
      icon: AlertTriangle,
    },
    {
      title: "New Employee Onboarding",
      description: "Onboard 3 new team members",
      dueDate: "Next week",
      priority: "normal",
      workflow: "Employee Onboarding",
      icon: Users,
    },
  ]

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-600" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-600" />
    )
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
        <Header variant="dashboard" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 mt-1">
                Welcome back! Here's what's happening with your automation platform.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40 bg-white/80">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />
                All Systems Operational
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Link key={index} href={metric.href}>
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">{metric.title}</p>
                        <p className="text-2xl font-bold text-slate-900 mt-1">{metric.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {getTrendIcon(metric.trend)}
                          <p className="text-xs text-slate-500">{metric.change}</p>
                        </div>
                      </div>
                      <div className={`w-12 h-12 ${metric.bgColor} rounded-2xl flex items-center justify-center`}>
                        <metric.icon className={`w-6 h-6 ${metric.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Workflows */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Recent Workflows
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/workflows" className="text-blue-600 hover:text-blue-700">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentWorkflows.map((workflow) => (
                  <div
                    key={workflow.id}
                    className="p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${workflow.color} rounded-xl flex items-center justify-center`}>
                          <workflow.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{workflow.name}</h4>
                          <Badge className={`${getStatusColor(workflow.status)} text-xs`}>
                            <Activity className="w-3 h-3 mr-1" />
                            {workflow.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/workflows/${workflow.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Play className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Efficiency</span>
                        <span className="font-medium text-blue-600">{workflow.efficiency}%</span>
                      </div>
                      <Progress value={workflow.efficiency} className="h-2" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Last: {workflow.lastRun}</span>
                        <span>Next: {workflow.nextRun}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Agents */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    AI Agents
                  </CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/agents" className="text-purple-600 hover:text-purple-700">
                      View All <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAgents.map((agent) => (
                  <div key={agent.id} className="p-4 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${agent.color} rounded-xl flex items-center justify-center`}>
                          <agent.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{agent.name}</h4>
                          <Badge className={`${getStatusColor(agent.status)} text-xs`}>
                            <Activity className="w-3 h-3 mr-1" />
                            {agent.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/agents/${agent.id}`}>
                            <Eye className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-blue-600">{agent.tasksCompleted}</div>
                        <div className="text-xs text-slate-600">Tasks</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{agent.successRate}%</div>
                        <div className="text-xs text-slate-600">Success</div>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 text-center mt-2">Last active: {agent.lastActive}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-4 bg-slate-50/50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <task.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 text-sm">{task.title}</h4>
                          <p className="text-xs text-slate-600">{task.description}</p>
                        </div>
                      </div>
                      <Badge className={`${getPriorityColor(task.priority)} text-xs`}>{task.priority}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">{task.workflow}</span>
                      <span className="font-medium text-blue-600">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/analytics" className="text-blue-600 hover:text-blue-700">
                    View Analytics <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <CardDescription>Latest system events and workflow executions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <Link key={index} href={activity.href}>
                    <div className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-xl hover:bg-slate-100/50 transition-colors cursor-pointer">
                      <div
                        className={`w-10 h-10 ${
                          activity.color === "text-green-600"
                            ? "bg-green-100"
                            : activity.color === "text-blue-600"
                              ? "bg-blue-100"
                              : activity.color === "text-purple-600"
                                ? "bg-purple-100"
                                : "bg-orange-100"
                        } 
                                     rounded-lg flex items-center justify-center`}
                      >
                        <activity.icon className={`w-5 h-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-900">{activity.title}</div>
                        <div className="text-sm text-slate-600">{activity.description}</div>
                      </div>
                      <div className="text-xs text-slate-500">{activity.time}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Create Workflow</h3>
                    <p className="text-blue-100 text-sm">Build a new automation workflow</p>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/workflows/create">
                      <Plus className="w-4 h-4 mr-2" />
                      Create
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Deploy Agent</h3>
                    <p className="text-purple-100 text-sm">Create a new AI agent</p>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/agents/create">
                      <Bot className="w-4 h-4 mr-2" />
                      Deploy
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg mb-2">View Analytics</h3>
                    <p className="text-green-100 text-sm">Monitor performance metrics</p>
                  </div>
                  <Button variant="secondary" size="sm" asChild>
                    <Link href="/analytics">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyze
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
