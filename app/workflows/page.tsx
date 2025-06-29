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
  Brain,
  Bot,
  User,
  Send,
  X,
} from "lucide-react"

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot",
      message:
        "🚀 **Welcome to Orchestra Workflow Creator!**\n\nI'm your AI-powered workflow assistant. I can help you create intelligent workflows for:\n\n**💼 Business Process Automation**\n• Employee onboarding and offboarding\n• Approval workflows and document routing\n• Customer support ticket management\n• Invoice processing and payments\n\n**🔧 Development & IT Operations**\n• CI/CD pipeline automation\n• Code review and deployment workflows\n• Infrastructure monitoring and alerts\n• Security compliance checks\n\n**📊 Data & Analytics**\n• Data pipeline automation\n• Report generation and distribution\n• ETL processes and data validation\n• Performance monitoring dashboards\n\n**🎯 Marketing & Sales**\n• Lead nurturing campaigns\n• Social media automation\n• Customer journey workflows\n• Sales pipeline management\n\nWhat type of workflow would you like to create today? Just describe your process and I'll help you build it step by step!",
      timestamp: "Just now",
    },
  ])

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

  const openChat = () => {
    setIsChatOpen(true)
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      type: "user",
      message: newMessage,
      timestamp: "Just now",
    }

    setChatMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    setTimeout(() => {
      const responses = [
        "🎯 **Excellent choice!** Let me help you create that workflow.\n\n**Workflow Creation Process:**\n\n📋 **Step 1: Define Your Process**\n• What triggers should start this workflow?\n• What are the main steps involved?\n• Who are the stakeholders and approvers?\n\n🔧 **Step 2: Configure Automation**\n• Which systems need to be integrated?\n• What data needs to be collected or processed?\n• Are there any conditional logic requirements?\n\n⚡ **Step 3: Set Up Monitoring**\n• How should success/failure be measured?\n• What notifications are needed?\n• Who should receive status updates?\n\n**Popular Workflow Templates:**\n• Employee Onboarding (HR)\n• Code Review & Deployment (DevOps)\n• Invoice Processing (Finance)\n• Customer Support Ticket Routing\n• Marketing Campaign Automation\n\nWhich type of workflow interests you most, or would you like to describe a custom process?",
        "✨ **Great! I can see several automation opportunities.**\n\n**AI-Powered Workflow Suggestions:**\n\n🤖 **Smart Process Automation:**\n• Intelligent document processing and routing\n• Automated decision-making based on business rules\n• Dynamic task assignment and load balancing\n\n🔄 **Integration Capabilities:**\n• Connect with 200+ business applications\n• Real-time data synchronization\n• API-first architecture for custom integrations\n\n📊 **Advanced Analytics:**\n• Process performance monitoring\n• Bottleneck identification and optimization\n• Predictive analytics for resource planning\n\n**Workflow Builder Features:**\n• Drag-and-drop visual designer\n• Pre-built templates and components\n• Version control and rollback capabilities\n• A/B testing for process optimization\n\n**Estimated Benefits:**\n• 60% reduction in manual tasks\n• 40% faster process completion\n• 95% accuracy in automated decisions\n• Real-time visibility into all processes\n\nWould you like me to start building a specific workflow for you?",
        "🔧 **Workflow Creation in Progress...**\n\n**Phase 1**: Process Analysis ✅\n• Business requirements: Captured\n• Stakeholder mapping: Complete\n• Integration points: Identified\n\n**Phase 2**: Workflow Design ⏳\n• Process flow: 75% complete\n• Automation rules: Configuring\n• Error handling: Setting up\n\n**Phase 3**: Testing & Deployment ⏳\n• Unit testing: Preparing\n• Integration testing: Scheduled\n• Production deployment: Pending\n\n**Workflow Components:**\n• Triggers: 3 configured\n• Actions: 8 automated steps\n• Integrations: 4 systems connected\n• Notifications: 6 stakeholder groups\n\n**Performance Predictions:**\n• Processing time: 85% faster\n• Error reduction: 92% improvement\n• Cost savings: $12,000/month\n• ROI timeline: 3 months\n\nYour workflow is 68% complete. Would you like to review the design or proceed with testing?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      const botResponse = {
        id: chatMessages.length + 2,
        type: "bot",
        message: randomResponse,
        timestamp: "Just now",
      }
      setChatMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 2500)
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
                Workflows
              </h1>
              <p className="text-slate-600 mt-1">Manage and monitor your automated workflows</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />
                {activeWorkflows} Active
              </Badge>
              <Button onClick={openChat} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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

        {/* Chat Modal */}
        {isChatOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="w-full max-w-4xl h-[80vh] bg-white rounded-3xl shadow-2xl overflow-hidden border-0">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border-b border-blue-200/20 backdrop-blur-md p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg ring-4 ring-blue-100/50">
                      <Brain className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Workflow Creator AI
                      </h2>
                      <p className="text-slate-600 text-sm">Create intelligent workflows with AI assistance</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={closeChat}
                    className="bg-white/80 hover:bg-white border-blue-200/50 h-8 w-8 p-0 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[calc(80vh-200px)] bg-white">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.type === "bot" && (
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                        msg.type === "user"
                          ? "bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white ml-auto"
                          : "bg-white border border-slate-200/50 text-slate-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line font-medium">{msg.message}</p>
                      <p className={`text-xs mt-2 ${msg.type === "user" ? "text-blue-100" : "text-slate-500"}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                    {msg.type === "user" && (
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-slate-200/50 p-4 rounded-2xl shadow-lg backdrop-blur-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-blue-200/20 bg-gradient-to-r from-blue-50/30 via-white/50 to-purple-50/30 backdrop-blur-md">
                <div className="flex gap-4">
                  <Input
                    placeholder="Describe the workflow you want to create (e.g., 'Employee onboarding process' or 'Code deployment pipeline')..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1 h-12 text-sm shadow-lg border-blue-200/30 rounded-xl bg-white/80 backdrop-blur-sm"
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white shadow-lg px-6 h-12 rounded-xl"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}
