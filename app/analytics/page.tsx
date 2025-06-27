"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  DollarSign,
  Calendar,
  Target,
  Award,
} from "lucide-react"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const metrics = [
    {
      title: "Total Workflows",
      value: "6",
      change: "+2 this month",
      trend: "up",
      icon: BarChart3,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tasks Automated",
      value: "1,247",
      change: "+18% from last month",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Time Saved",
      value: "340h",
      change: "This month",
      trend: "up",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Cost Savings",
      value: "$45,200",
      change: "+12% efficiency gain",
      trend: "up",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const workflowPerformance = [
    {
      name: "SDLC Automation",
      efficiency: 92.4,
      tasks: 247,
      timeSaved: "120h",
      status: "excellent",
      trend: "up",
    },
    {
      name: "Employee Onboarding",
      efficiency: 88.7,
      tasks: 156,
      timeSaved: "85h",
      status: "good",
      trend: "up",
    },
    {
      name: "Performance Reviews",
      efficiency: 91.2,
      tasks: 89,
      timeSaved: "65h",
      status: "excellent",
      trend: "up",
    },
    {
      name: "Code Deployment",
      efficiency: 87.3,
      tasks: 78,
      timeSaved: "45h",
      status: "good",
      trend: "down",
    },
    {
      name: "Security Compliance",
      efficiency: 76.1,
      tasks: 23,
      timeSaved: "15h",
      status: "needs-attention",
      trend: "down",
    },
    {
      name: "Customer Support",
      efficiency: 94.8,
      tasks: 445,
      timeSaved: "180h",
      status: "excellent",
      trend: "up",
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
    },
    {
      type: "info",
      title: "Employee Onboarding started",
      description: "New hire Sarah Johnson - Software Engineer",
      time: "3 hours ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      type: "success",
      title: "Performance Review completed",
      description: "Q4 2024 review for Engineering team member",
      time: "5 hours ago",
      icon: Award,
      color: "text-purple-600",
    },
    {
      type: "warning",
      title: "Security Compliance check failed",
      description: "Compliance check requires manual intervention",
      time: "1 day ago",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      type: "success",
      title: "Customer Support resolved ticket",
      description: "Auto-resolved 15 customer inquiries",
      time: "1 day ago",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800"
      case "good":
        return "bg-blue-100 text-blue-800"
      case "needs-attention":
        return "bg-orange-100 text-orange-800"
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
                Analytics
              </h1>
              <p className="text-slate-600 mt-1">Monitor performance and insights across all workflows</p>
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
                Live Data
              </Badge>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl">
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
            ))}
          </div>

          {/* Workflow Performance */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600" />
                Workflow Performance Overview
              </CardTitle>
              <CardDescription>Detailed performance metrics for all active workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {workflowPerformance.map((workflow, index) => (
                <div key={index} className="p-4 bg-slate-50/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-slate-900">{workflow.name}</h4>
                      <Badge className={`${getStatusColor(workflow.status)} text-xs`}>
                        {workflow.status.replace("-", " ")}
                      </Badge>
                      {getTrendIcon(workflow.trend)}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{workflow.efficiency}%</div>
                      <div className="text-xs text-slate-500">Efficiency</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-slate-900">{workflow.tasks}</div>
                      <div className="text-xs text-slate-500">Tasks Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-slate-900">{workflow.timeSaved}</div>
                      <div className="text-xs text-slate-500">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-slate-900">{workflow.efficiency}%</div>
                      <div className="text-xs text-slate-500">Success Rate</div>
                    </div>
                  </div>

                  <Progress value={workflow.efficiency} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Efficiency Trends */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Efficiency Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">90.3%</div>
                    <div className="text-xs text-slate-600">Average Efficiency</div>
                    <div className="text-xs text-green-600 mt-1">+2.1% vs last month</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-xs text-slate-600">Total Tasks</div>
                    <div className="text-xs text-blue-600 mt-1">+18% vs last month</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Automation Rate</span>
                    <span className="text-green-600">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Error Rate</span>
                    <span className="text-red-600">2.1%</span>
                  </div>
                  <Progress value={2.1} className="h-2" />

                  <div className="flex justify-between text-sm">
                    <span>Manual Intervention</span>
                    <span className="text-orange-600">3.7%</span>
                  </div>
                  <Progress value={3.7} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Cost Analysis */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">$45,200</div>
                    <div className="text-xs text-slate-600">Total Savings</div>
                    <div className="text-xs text-green-600 mt-1">This month</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">340h</div>
                    <div className="text-xs text-slate-600">Time Saved</div>
                    <div className="text-xs text-purple-600 mt-1">≈ $34,000 value</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Labor Cost Reduction</span>
                    <span className="font-semibold text-green-600">67%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Process Efficiency Gain</span>
                    <span className="font-semibold text-blue-600">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Error Reduction</span>
                    <span className="font-semibold text-purple-600">82%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">ROI</span>
                    <span className="font-semibold text-orange-600">340%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Recent Activity
              </CardTitle>
              <CardDescription>Latest workflow executions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-slate-50/50 rounded-xl">
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  )
}
