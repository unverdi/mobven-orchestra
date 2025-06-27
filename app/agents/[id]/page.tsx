"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import {
  ArrowLeft,
  Code,
  Users,
  BarChart3,
  Settings,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  FileText,
  Save,
  RefreshCw,
  Trash2,
  Bell,
  Shield,
  Zap,
  Brain,
  TrendingUp,
} from "lucide-react"
import AuthGuard from "@/components/auth-guard"
import Header from "@/components/header"

export default function AgentDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const agentId = params.id as string
  const defaultTab = searchParams.get("tab") || "overview"

  const [agentSettings, setAgentSettings] = useState({
    name: "",
    description: "",
    category: "",
    enabled: true,
    model: "gpt-4",
    temperature: 0.7,
    maxTokens: 2048,
    systemPrompt: "",
    notifications: {
      onSuccess: true,
      onFailure: true,
      onTimeout: true,
      email: "admin@mobven.com",
      slack: true,
    },
    performance: {
      maxConcurrentTasks: 10,
      timeout: 30,
      retryAttempts: 3,
      logLevel: "info",
    },
    security: {
      requireApproval: false,
      allowedUsers: [],
      encryptLogs: true,
      auditTrail: true,
    },
  })

  // Agent data based on ID
  const agentsData = {
    "code-reviewer": {
      id: "code-reviewer",
      name: "Code Review Assistant",
      description: "AI-powered code review agent that analyzes pull requests and provides feedback",
      status: "active",
      category: "Development",
      icon: Code,
      tasksCompleted: 1247,
      successRate: 94.2,
      avgResponseTime: "2.3s",
      lastActive: "5 minutes ago",
      efficiency: 92,
      performanceMetrics: [
        { label: "Tasks Completed", value: 1247, change: +15, color: "text-blue-600" },
        { label: "Success Rate", value: "94.2%", change: +2.1, color: "text-green-600" },
        { label: "Avg Response", value: "2.3s", change: -0.2, color: "text-purple-600" },
        { label: "Efficiency", value: "92%", change: +3, color: "text-orange-600" },
      ],
      recentTasks: [
        {
          id: 1,
          name: "Review PR #1234 - Payment Module",
          status: "completed",
          duration: "2.1s",
          timestamp: "5 minutes ago",
        },
        {
          id: 2,
          name: "Analyze security vulnerabilities",
          status: "completed",
          duration: "3.4s",
          timestamp: "12 minutes ago",
        },
        {
          id: 3,
          name: "Code quality assessment",
          status: "in_progress",
          duration: "1.8s",
          timestamp: "18 minutes ago",
        },
      ],
    },
    "hr-onboarding": {
      id: "hr-onboarding",
      name: "HR Onboarding Bot",
      description: "Automated employee onboarding assistant with document processing",
      status: "active",
      category: "HR",
      icon: Users,
      tasksCompleted: 856,
      successRate: 96.8,
      avgResponseTime: "1.8s",
      lastActive: "2 minutes ago",
      efficiency: 88,
      performanceMetrics: [
        { label: "Tasks Completed", value: 856, change: +23, color: "text-blue-600" },
        { label: "Success Rate", value: "96.8%", change: +1.2, color: "text-green-600" },
        { label: "Avg Response", value: "1.8s", change: -0.3, color: "text-purple-600" },
        { label: "Efficiency", value: "88%", change: +5, color: "text-orange-600" },
      ],
      recentTasks: [
        {
          id: 1,
          name: "Process new hire documents",
          status: "completed",
          duration: "1.2s",
          timestamp: "2 minutes ago",
        },
        {
          id: 2,
          name: "Send welcome email package",
          status: "completed",
          duration: "0.8s",
          timestamp: "15 minutes ago",
        },
        {
          id: 3,
          name: "Schedule orientation meeting",
          status: "completed",
          duration: "2.1s",
          timestamp: "32 minutes ago",
        },
      ],
    },
    "performance-analyzer": {
      id: "performance-analyzer",
      name: "Performance Review Agent",
      description: "Analyzes employee performance data and generates insights",
      status: "active",
      category: "HR",
      icon: TrendingUp,
      tasksCompleted: 423,
      successRate: 89.5,
      avgResponseTime: "4.1s",
      lastActive: "1 hour ago",
      efficiency: 91,
      performanceMetrics: [
        { label: "Tasks Completed", value: 423, change: +8, color: "text-blue-600" },
        { label: "Success Rate", value: "89.5%", change: +3.2, color: "text-green-600" },
        { label: "Avg Response", value: "4.1s", change: -0.5, color: "text-purple-600" },
        { label: "Efficiency", value: "91%", change: +2, color: "text-orange-600" },
      ],
      recentTasks: [
        {
          id: 1,
          name: "Generate Q4 performance report",
          status: "completed",
          duration: "5.2s",
          timestamp: "1 hour ago",
        },
        {
          id: 2,
          name: "Analyze team productivity metrics",
          status: "completed",
          duration: "3.8s",
          timestamp: "2 hours ago",
        },
        {
          id: 3,
          name: "Process 360-degree feedback",
          status: "completed",
          duration: "4.5s",
          timestamp: "3 hours ago",
        },
      ],
    },
  }

  const agent = agentsData[agentId as keyof typeof agentsData] || agentsData["code-reviewer"]

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(`agent_settings_${agentId}`)
    if (savedSettings) {
      setAgentSettings({ ...agentSettings, ...JSON.parse(savedSettings) })
    } else {
      // Initialize with agent data
      setAgentSettings({
        ...agentSettings,
        name: agent.name,
        description: agent.description,
        category: agent.category,
      })
    }
  }, [agentId])

  const saveSettings = () => {
    localStorage.setItem(`agent_settings_${agentId}`, JSON.stringify(agentSettings))
    alert("Agent settings saved successfully!")
  }

  const resetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      localStorage.removeItem(`agent_settings_${agentId}`)
      setAgentSettings({
        name: agent.name,
        description: agent.description,
        category: agent.category,
        enabled: true,
        model: "gpt-4",
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: "",
        notifications: {
          onSuccess: true,
          onFailure: true,
          onTimeout: true,
          email: "admin@mobven.com",
          slack: true,
        },
        performance: {
          maxConcurrentTasks: 10,
          timeout: 30,
          retryAttempts: 3,
          logLevel: "info",
        },
        security: {
          requireApproval: false,
          allowedUsers: [],
          encryptLogs: true,
          auditTrail: true,
        },
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "failed":
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
        return <Clock className="w-3 h-3" />
      case "error":
        return <AlertTriangle className="w-3 h-3" />
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      case "in_progress":
        return <Activity className="w-3 h-3 animate-pulse" />
      case "failed":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <Header />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/agents" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Agents
            </Link>
          </div>

          {/* Agent Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <agent.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{agent.name}</h1>
                  <p className="text-slate-600 text-lg mb-3">{agent.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(agent.status)} className="text-sm">
                      {getStatusIcon(agent.status)}
                      <span className="ml-1 capitalize">{agent.status}</span>
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      {agent.category}
                    </Badge>
                    <span className="text-sm text-slate-500">Last active: {agent.lastActive}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  <Activity className="w-4 h-4 mr-2" />
                  Test Agent
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agent.performanceMetrics.map((metric, index) => (
                <Card key={index} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">{metric.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                        <p className={`text-xs mt-1 ${metric.color}`}>
                          {metric.change > 0 ? "+" : ""}
                          {metric.change} from last week
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <Tabs defaultValue={defaultTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-blue-600" />
                        Agent Performance
                      </CardTitle>
                      <CardDescription>Success rate and response time metrics over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Success Rate</span>
                            <span className="text-sm text-slate-600">{agent.successRate}%</span>
                          </div>
                          <Progress value={agent.successRate} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Efficiency Score</span>
                            <span className="text-sm text-slate-600">{agent.efficiency}%</span>
                          </div>
                          <Progress value={agent.efficiency} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Response Time (Target: 3s)</span>
                            <span className="text-sm text-slate-600">{agent.avgResponseTime}</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Agent Info */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        Agent Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Status</span>
                        <Badge className={getStatusColor(agent.status)}>
                          {getStatusIcon(agent.status)}
                          <span className="ml-1 capitalize">{agent.status}</span>
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Tasks Completed</span>
                        <span className="text-sm text-slate-600">{agent.tasksCompleted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Success Rate</span>
                        <span className="text-sm text-slate-600">{agent.successRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Avg Response</span>
                        <span className="text-sm text-slate-600">{agent.avgResponseTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Last Active</span>
                        <span className="text-sm text-slate-600">{agent.lastActive}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Category</span>
                        <span className="text-sm text-slate-600">{agent.category}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Recent Tasks
                  </CardTitle>
                  <CardDescription>Latest tasks executed by this agent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {agent.recentTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-4 border border-slate-200/50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Badge className={getStatusColor(task.status)}>
                            {getStatusIcon(task.status)}
                            <span className="ml-1 capitalize">{task.status.replace("_", " ")}</span>
                          </Badge>
                          <div>
                            <p className="font-medium text-slate-900">{task.name}</p>
                            <p className="text-sm text-slate-500">
                              {task.timestamp} • Duration: {task.duration}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Agent Logs
                  </CardTitle>
                  <CardDescription>Real-time execution logs and debugging information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                    <div>[2024-01-25 14:32:15] INFO: Agent started - {agent.name}</div>
                    <div>[2024-01-25 14:32:16] INFO: Initializing AI model...</div>
                    <div>[2024-01-25 14:32:17] INFO: Loading system prompt</div>
                    <div>[2024-01-25 14:32:18] INFO: Task received: {agent.recentTasks[0]?.name}</div>
                    <div>[2024-01-25 14:32:19] INFO: Processing task...</div>
                    <div>[2024-01-25 14:32:20] INFO: Task completed successfully</div>
                    <div>[2024-01-25 14:32:21] INFO: Response time: {agent.avgResponseTime}</div>
                    <div>[2024-01-25 14:32:22] INFO: Agent ready for next task</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Agent Settings</h2>
                  <p className="text-slate-600">Configure agent behavior, model parameters, and execution settings</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" onClick={resetSettings}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset to Default
                  </Button>
                  <Button onClick={saveSettings} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Settings
                  </Button>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-blue-600" />
                      General Settings
                    </CardTitle>
                    <CardDescription>Basic agent configuration and behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="agent-name">Agent Name</Label>
                      <Input
                        id="agent-name"
                        value={agentSettings.name}
                        onChange={(e) => setAgentSettings({ ...agentSettings, name: e.target.value })}
                        placeholder="Enter agent name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="agent-description">Description</Label>
                      <Textarea
                        id="agent-description"
                        value={agentSettings.description}
                        onChange={(e) => setAgentSettings({ ...agentSettings, description: e.target.value })}
                        placeholder="Describe what this agent does"
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={agentSettings.category}
                        onValueChange={(value) => setAgentSettings({ ...agentSettings, category: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="Support">Support</SelectItem>
                          <SelectItem value="Analytics">Analytics</SelectItem>
                          <SelectItem value="Security">Security</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enabled">Enable Agent</Label>
                        <p className="text-sm text-slate-600">Allow this agent to process tasks</p>
                      </div>
                      <Switch
                        id="enabled"
                        checked={agentSettings.enabled}
                        onCheckedChange={(checked) => setAgentSettings({ ...agentSettings, enabled: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* AI Model Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-purple-600" />
                      AI Model Settings
                    </CardTitle>
                    <CardDescription>Configure AI model parameters and behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="model">AI Model</Label>
                      <Select
                        value={agentSettings.model}
                        onValueChange={(value) => setAgentSettings({ ...agentSettings, model: value })}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude-3">Claude 3</SelectItem>
                          <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="temperature">Temperature: {agentSettings.temperature}</Label>
                      <input
                        id="temperature"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={agentSettings.temperature}
                        onChange={(e) =>
                          setAgentSettings({ ...agentSettings, temperature: Number.parseFloat(e.target.value) })
                        }
                        className="w-full mt-2"
                      />
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>Focused</span>
                        <span>Creative</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="max-tokens">Max Tokens</Label>
                      <Input
                        id="max-tokens"
                        type="number"
                        value={agentSettings.maxTokens}
                        onChange={(e) =>
                          setAgentSettings({ ...agentSettings, maxTokens: Number.parseInt(e.target.value) })
                        }
                        placeholder="2048"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="system-prompt">System Prompt</Label>
                      <Textarea
                        id="system-prompt"
                        value={agentSettings.systemPrompt}
                        onChange={(e) => setAgentSettings({ ...agentSettings, systemPrompt: e.target.value })}
                        placeholder="Enter system prompt for the AI agent..."
                        className="mt-1"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-600" />
                      Performance Settings
                    </CardTitle>
                    <CardDescription>Configure execution limits and performance parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="max-concurrent">Max Concurrent Tasks</Label>
                      <Input
                        id="max-concurrent"
                        type="number"
                        value={agentSettings.performance.maxConcurrentTasks}
                        onChange={(e) =>
                          setAgentSettings({
                            ...agentSettings,
                            performance: {
                              ...agentSettings.performance,
                              maxConcurrentTasks: Number.parseInt(e.target.value),
                            },
                          })
                        }
                        placeholder="10"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="timeout">Timeout (seconds)</Label>
                      <Input
                        id="timeout"
                        type="number"
                        value={agentSettings.performance.timeout}
                        onChange={(e) =>
                          setAgentSettings({
                            ...agentSettings,
                            performance: { ...agentSettings.performance, timeout: Number.parseInt(e.target.value) },
                          })
                        }
                        placeholder="30"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="retry-attempts">Retry Attempts</Label>
                      <Input
                        id="retry-attempts"
                        type="number"
                        value={agentSettings.performance.retryAttempts}
                        onChange={(e) =>
                          setAgentSettings({
                            ...agentSettings,
                            performance: {
                              ...agentSettings.performance,
                              retryAttempts: Number.parseInt(e.target.value),
                            },
                          })
                        }
                        placeholder="3"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select
                        value={agentSettings.performance.logLevel}
                        onValueChange={(value) =>
                          setAgentSettings({
                            ...agentSettings,
                            performance: { ...agentSettings.performance, logLevel: value },
                          })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-green-600" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>Configure when and how to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="notification-email">Notification Email</Label>
                      <Input
                        id="notification-email"
                        type="email"
                        value={agentSettings.notifications.email}
                        onChange={(e) =>
                          setAgentSettings({
                            ...agentSettings,
                            notifications: { ...agentSettings.notifications, email: e.target.value },
                          })
                        }
                        placeholder="admin@mobven.com"
                        className="mt-1"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Notify on Success</Label>
                          <p className="text-sm text-slate-600">Send notifications when tasks complete successfully</p>
                        </div>
                        <Switch
                          checked={agentSettings.notifications.onSuccess}
                          onCheckedChange={(checked) =>
                            setAgentSettings({
                              ...agentSettings,
                              notifications: { ...agentSettings.notifications, onSuccess: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Notify on Failure</Label>
                          <p className="text-sm text-slate-600">Send notifications when tasks fail</p>
                        </div>
                        <Switch
                          checked={agentSettings.notifications.onFailure}
                          onCheckedChange={(checked) =>
                            setAgentSettings({
                              ...agentSettings,
                              notifications: { ...agentSettings.notifications, onFailure: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Notify on Timeout</Label>
                          <p className="text-sm text-slate-600">Send notifications when tasks timeout</p>
                        </div>
                        <Switch
                          checked={agentSettings.notifications.onTimeout}
                          onCheckedChange={(checked) =>
                            setAgentSettings({
                              ...agentSettings,
                              notifications: { ...agentSettings.notifications, onTimeout: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Slack Notifications</Label>
                          <p className="text-sm text-slate-600">Send notifications to Slack channels</p>
                        </div>
                        <Switch
                          checked={agentSettings.notifications.slack}
                          onCheckedChange={(checked) =>
                            setAgentSettings({
                              ...agentSettings,
                              notifications: { ...agentSettings.notifications, slack: checked },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>Configure security and access control</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Approval</Label>
                        <p className="text-sm text-slate-600">Require manual approval before task execution</p>
                      </div>
                      <Switch
                        checked={agentSettings.security.requireApproval}
                        onCheckedChange={(checked) =>
                          setAgentSettings({
                            ...agentSettings,
                            security: { ...agentSettings.security, requireApproval: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Encrypt Logs</Label>
                        <p className="text-sm text-slate-600">Encrypt all execution logs</p>
                      </div>
                      <Switch
                        checked={agentSettings.security.encryptLogs}
                        onCheckedChange={(checked) =>
                          setAgentSettings({
                            ...agentSettings,
                            security: { ...agentSettings.security, encryptLogs: checked },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Audit Trail</Label>
                        <p className="text-sm text-slate-600">Maintain detailed audit trail</p>
                      </div>
                      <Switch
                        checked={agentSettings.security.auditTrail}
                        onCheckedChange={(checked) =>
                          setAgentSettings({
                            ...agentSettings,
                            security: { ...agentSettings.security, auditTrail: checked },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-0 shadow-xl bg-red-50/50 backdrop-blur-sm rounded-2xl border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible actions for this agent</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white/50">
                      <div>
                        <h4 className="font-medium text-red-600">Reset Agent</h4>
                        <p className="text-sm text-slate-600">
                          Reset agent to factory defaults, losing all configuration
                        </p>
                      </div>
                      <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white/50">
                      <div>
                        <h4 className="font-medium text-red-600">Delete Agent</h4>
                        <p className="text-sm text-slate-600">Permanently delete this agent and all its data</p>
                      </div>
                      <Button variant="destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  )
}
