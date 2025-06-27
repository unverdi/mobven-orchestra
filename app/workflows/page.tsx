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
  MessageSquare,
  Bot,
  User,
  Send,
  X,
  Lightbulb,
  Sparkles,
  Workflow,
  FileText,
  ChevronRight,
  Check,
} from "lucide-react"

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hi! I'm your workflow assistant. I'm here to help you create the perfect workflow. What kind of process would you like to automate?",
      timestamp: new Date(),
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const [workflowData, setWorkflowData] = useState({
    name: "",
    description: "",
    category: "",
    template: "",
    steps: [] as any[],
    settings: {
      schedule: {
        type: "manual",
        interval: 60,
        cronExpression: "0 9 * * 1-5",
      },
      execution: {
        timeout: 1800,
        retryAttempts: 3,
        retryDelay: 60,
        maxConcurrentRuns: 1,
        priority: "normal",
      },
      notifications: {
        onSuccess: true,
        onFailure: true,
        onTimeout: true,
        email: "admin@mobven.com",
        slack: false,
      },
      triggers: {
        manual: true,
        scheduled: false,
        webhook: false,
        fileChange: false,
        apiCall: false,
      },
    },
  })

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

  const workflowTemplates = [
    {
      id: "sdlc-automation",
      name: "SDLC Automation",
      description: "Complete software development lifecycle automation with CI/CD pipeline",
      category: "Development",
      icon: GitBranch,
      color: "bg-blue-500",
      steps: 8,
      integrations: ["GitLab", "Jira", "Docker", "SonarQube"],
      estimatedTime: "30-60 minutes",
      complexity: "Advanced",
      prebuiltSteps: [
        { name: "Code Analysis", type: "analysis", integrations: ["GitLab", "SonarQube"] },
        { name: "Build Process", type: "build", integrations: ["GitLab CI", "Docker"] },
        { name: "Unit Testing", type: "testing", integrations: ["Jest", "GitLab CI"] },
        { name: "Security Scan", type: "security", integrations: ["OWASP ZAP", "Snyk"] },
        { name: "Deploy to Staging", type: "deployment", integrations: ["Docker", "Kubernetes"] },
        { name: "Integration Testing", type: "testing", integrations: ["TestContainers"] },
        { name: "Code Review", type: "review", integrations: ["GitLab", "Jira"] },
        { name: "Deploy to Production", type: "deployment", integrations: ["Docker", "Kubernetes"] },
      ],
    },
    {
      id: "employee-onboarding",
      name: "Employee Onboarding",
      description: "Automated new hire onboarding with HR systems and account creation",
      category: "HR",
      icon: Users,
      color: "bg-green-500",
      steps: 6,
      integrations: ["Active Directory", "Slack", "Email", "HR System"],
      estimatedTime: "2-3 days",
      complexity: "Intermediate",
      prebuiltSteps: [
        { name: "Welcome Email", type: "notification", integrations: ["Email", "HR System"] },
        { name: "Account Creation", type: "provisioning", integrations: ["Active Directory", "Slack"] },
        { name: "Equipment Request", type: "request", integrations: ["IT Service Desk"] },
        { name: "Training Assignment", type: "assignment", integrations: ["LMS", "HR System"] },
        { name: "Manager Introduction", type: "notification", integrations: ["Email", "Slack"] },
        { name: "First Day Checklist", type: "checklist", integrations: ["HR System"] },
      ],
    },
    {
      id: "performance-review",
      name: "Performance Review",
      description: "Quarterly performance review automation with 360-degree feedback",
      category: "HR",
      icon: TrendingUp,
      color: "bg-purple-500",
      steps: 7,
      integrations: ["HR System", "Survey Platform", "Email"],
      estimatedTime: "5-7 days",
      complexity: "Intermediate",
      prebuiltSteps: [
        { name: "Review Initiation", type: "notification", integrations: ["HR System", "Email"] },
        { name: "Self Assessment", type: "form", integrations: ["Performance Management System"] },
        { name: "360 Feedback Collection", type: "survey", integrations: ["Survey Platform"] },
        { name: "Manager Review", type: "review", integrations: ["HR System"] },
        { name: "Goal Setting", type: "planning", integrations: ["Performance Management System"] },
        { name: "Report Generation", type: "reporting", integrations: ["HR System"] },
        { name: "Meeting Scheduling", type: "scheduling", integrations: ["Calendar", "Email"] },
      ],
    },
    {
      id: "customer-support",
      name: "Customer Support Automation",
      description: "Automated ticket routing and response with AI-powered assistance",
      category: "Support",
      icon: MessageSquare,
      color: "bg-orange-500",
      steps: 5,
      integrations: ["Zendesk", "Slack", "AI Assistant", "Email"],
      estimatedTime: "Real-time",
      complexity: "Beginner",
      prebuiltSteps: [
        { name: "Ticket Classification", type: "classification", integrations: ["AI Assistant", "Zendesk"] },
        { name: "Auto Response", type: "response", integrations: ["AI Assistant", "Email"] },
        { name: "Agent Assignment", type: "routing", integrations: ["Zendesk", "Slack"] },
        { name: "Escalation Check", type: "condition", integrations: ["Zendesk"] },
        { name: "Follow-up Survey", type: "survey", integrations: ["Email", "Survey Platform"] },
      ],
    },
    {
      id: "data-processing",
      name: "Data Processing Pipeline",
      description: "ETL pipeline for data extraction, transformation, and loading",
      category: "Analytics",
      icon: BarChart3,
      color: "bg-indigo-500",
      steps: 6,
      integrations: ["Database", "API", "Data Warehouse", "Email"],
      estimatedTime: "1-2 hours",
      complexity: "Advanced",
      prebuiltSteps: [
        { name: "Data Extraction", type: "extraction", integrations: ["Database", "API"] },
        { name: "Data Validation", type: "validation", integrations: ["Data Quality Tools"] },
        { name: "Data Transformation", type: "transformation", integrations: ["ETL Engine"] },
        { name: "Data Loading", type: "loading", integrations: ["Data Warehouse"] },
        { name: "Quality Check", type: "validation", integrations: ["Data Quality Tools"] },
        { name: "Report Generation", type: "reporting", integrations: ["BI Tools", "Email"] },
      ],
    },
    {
      id: "blank",
      name: "Blank Workflow",
      description: "Start from scratch and build your custom workflow",
      category: "Custom",
      icon: Workflow,
      color: "bg-slate-500",
      steps: 0,
      integrations: [],
      estimatedTime: "Variable",
      complexity: "Custom",
      prebuiltSteps: [],
    },
  ]

  const wizardSteps = [
    { id: 1, name: "Template", description: "Choose a template or start from scratch" },
    { id: 2, name: "Basic Info", description: "Set workflow name and description" },
    { id: 3, name: "Steps", description: "Configure workflow steps" },
    { id: 4, name: "Settings", description: "Configure execution settings" },
    { id: 5, name: "Review", description: "Review and create workflow" },
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

  const selectTemplate = (templateId: string) => {
    const template = workflowTemplates.find((t) => t.id === templateId)
    if (template) {
      setSelectedTemplate(templateId)
      setWorkflowData({
        ...workflowData,
        template: templateId,
        category: template.category,
        steps: template.prebuiltSteps.map((step, index) => ({
          id: index + 1,
          ...step,
          timeout: 300,
          retryAttempts: 3,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "fail",
          },
          parameters: {},
        })),
      })
    }
  }

  const sendChatMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = {
      id: chatMessages.length + 1,
      type: "user",
      content: chatInput,
      timestamp: new Date(),
    }

    setChatMessages([...chatMessages, userMessage])
    setChatInput("")
    setIsTyping(true)

    // Simulate AI response based on current step and context
    setTimeout(() => {
      let assistantResponse = ""

      if (currentStep === 1) {
        if (chatInput.toLowerCase().includes("sdlc") || chatInput.toLowerCase().includes("development")) {
          assistantResponse =
            "Great! For SDLC automation, I recommend the 'SDLC Automation' template. It includes code analysis, build process, testing, security scans, and deployment steps. Would you like me to select this template for you?"
        } else if (chatInput.toLowerCase().includes("hr") || chatInput.toLowerCase().includes("employee")) {
          assistantResponse =
            "Perfect! For HR processes, we have 'Employee Onboarding' and 'Performance Review' templates. The onboarding template automates account creation, welcome emails, and training assignments. Which one interests you?"
        } else if (chatInput.toLowerCase().includes("support") || chatInput.toLowerCase().includes("customer")) {
          assistantResponse =
            "Excellent choice! The 'Customer Support Automation' template can help you automatically classify tickets, send responses, and route to the right agents. It uses AI to understand customer issues. Shall I set this up for you?"
        } else {
          assistantResponse =
            "I can help you choose the right template! Tell me more about your process - is it related to development, HR, customer support, data processing, or something else? I'll recommend the best starting point."
        }
      } else if (currentStep === 2) {
        if (chatInput.toLowerCase().includes("name") || chatInput.toLowerCase().includes("what should")) {
          assistantResponse = `Based on your template choice, here are some name suggestions:
        
${selectedTemplate === "sdlc-automation" ? "• 'Production Deployment Pipeline'\n• 'Code Quality & Security Workflow'\n• 'Full SDLC Automation'" : ""}
${selectedTemplate === "employee-onboarding" ? "• 'New Hire Onboarding Process'\n• 'Employee Welcome Automation'\n• 'HR Onboarding Pipeline'" : ""}
${selectedTemplate === "customer-support" ? "• 'Smart Ticket Processing'\n• 'Customer Support Automation'\n• 'AI-Powered Help Desk'" : ""}

Would you like me to use one of these names?`
        } else {
          assistantResponse =
            "I can help you with the workflow details! You can ask me about naming suggestions, description ideas, or category selection. What would you like help with?"
        }
      } else if (currentStep === 3) {
        if (chatInput.toLowerCase().includes("step") || chatInput.toLowerCase().includes("add")) {
          assistantResponse =
            "I can suggest additional steps based on your workflow! What specific functionality are you looking to add? For example:\n\n• Notification steps (email, Slack)\n• Integration steps (connect to external systems)\n• Conditional logic (if/then scenarios)\n• Data processing steps\n• Security validation steps"
        } else {
          assistantResponse =
            "Great question about workflow steps! I can help you optimize your workflow structure, suggest additional steps, or explain how different step types work. What would you like to know?"
        }
      } else if (currentStep === 4) {
        assistantResponse =
          "For workflow settings, I recommend:\n\n• Set appropriate timeouts based on step complexity\n• Enable failure notifications for critical workflows\n• Use manual triggers for testing, then add scheduled triggers\n• Set retry attempts to 2-3 for network-dependent steps\n\nNeed help with any specific setting?"
      } else {
        assistantResponse =
          "I'm here to help with any questions about your workflow! Feel free to ask about templates, steps, settings, or best practices."
      }

      const assistantMessage = {
        id: chatMessages.length + 2,
        type: "assistant",
        content: assistantResponse,
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const nextStep = () => {
    if (currentStep < wizardSteps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const createWorkflow = () => {
    console.log("Creating workflow:", workflowData)
    alert("Workflow created successfully!")
    setIsChatOpen(false)
    setCurrentStep(1)
    setSelectedTemplate(null)
    setWorkflowData({
      name: "",
      description: "",
      category: "",
      template: "",
      steps: [],
      settings: {
        schedule: {
          type: "manual",
          interval: 60,
          cronExpression: "0 9 * * 1-5",
        },
        execution: {
          timeout: 1800,
          retryAttempts: 3,
          retryDelay: 60,
          maxConcurrentRuns: 1,
          priority: "normal",
        },
        notifications: {
          onSuccess: true,
          onFailure: true,
          onTimeout: true,
          email: "admin@mobven.com",
          slack: false,
        },
        triggers: {
          manual: true,
          scheduled: false,
          webhook: false,
          fileChange: false,
          apiCall: false,
        },
      },
    })
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
        <Header variant="dashboard" />

        {/* Full Screen Chat Modal */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
            <div className="h-full flex">
              {/* Left Side - Chat */}
              <div className="w-1/2 flex flex-col bg-white/80 backdrop-blur-sm border-r border-slate-200">
                {/* Chat Header */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <Bot className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Workflow Assistant</h2>
                        <p className="text-blue-100">AI-powered workflow creation helper</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsChatOpen(false)}
                      className="text-white hover:bg-white/20"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-4 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.type === "assistant" && (
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] p-4 rounded-2xl ${
                          message.type === "user"
                            ? "bg-blue-600 text-white rounded-br-md"
                            : "bg-slate-100 text-slate-900 rounded-bl-md"
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.type === "user" && (
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-slate-600" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-4 justify-start">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-md">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Suggestions */}
                {currentStep === 1 && (
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setChatInput("I need help with SDLC automation")}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        SDLC Help
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setChatInput("Show me HR templates")}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        HR Templates
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setChatInput("I want to automate customer support")}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Support Automation
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="px-6 pb-4">
                    <div className="flex flex-wrap gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setChatInput("Suggest a good name for this workflow")}
                      >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Name Ideas
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                        onClick={() => setChatInput("Help me write a description")}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Description Help
                      </Button>
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-6 border-t border-slate-200">
                  <div className="flex gap-3">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask me anything about workflows..."
                      className="flex-1"
                      onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                    />
                    <Button
                      onClick={sendChatMessage}
                      disabled={!chatInput.trim() || isTyping}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Side - Workflow Builder */}
              <div className="w-1/2 flex flex-col bg-white/60 backdrop-blur-sm">
                {/* Progress Steps */}
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">Create Workflow</h3>
                    <div className="text-sm text-slate-600">
                      Step {currentStep} of {wizardSteps.length}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {wizardSteps.map((step, index) => (
                      <div key={step.id} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                            currentStep >= step.id ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                        </div>
                        {index < wizardSteps.length - 1 && (
                          <div className={`w-8 h-0.5 ${currentStep > step.id ? "bg-blue-600" : "bg-slate-200"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {/* Step 1: Template Selection */}
                  {currentStep === 1 && (
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Choose a Template</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {workflowTemplates.map((template) => (
                          <div
                            key={template.id}
                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                              selectedTemplate === template.id
                                ? "border-blue-500 bg-blue-50/50"
                                : "border-slate-200 hover:border-blue-300"
                            }`}
                            onClick={() => selectTemplate(template.id)}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className={`w-10 h-10 ${template.color} rounded-xl flex items-center justify-center`}
                              >
                                <template.icon className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h5 className="font-semibold text-slate-900 text-sm">{template.name}</h5>
                                <Badge variant="outline" className="text-xs">
                                  {template.category}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-slate-600 text-xs mb-3">{template.description}</p>
                            <div className="space-y-1 text-xs text-slate-500">
                              <div className="flex justify-between">
                                <span>Steps:</span>
                                <span>{template.steps}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Complexity:</span>
                                <span>{template.complexity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Basic Information */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-slate-900">Basic Information</h4>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Workflow Name *</label>
                        <Input
                          value={workflowData.name}
                          onChange={(e) => setWorkflowData({ ...workflowData, name: e.target.value })}
                          placeholder="Enter workflow name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                        <textarea
                          value={workflowData.description}
                          onChange={(e) => setWorkflowData({ ...workflowData, description: e.target.value })}
                          placeholder="Describe what this workflow does"
                          className="w-full p-3 border border-slate-300 rounded-lg resize-none"
                          rows={4}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                        <Select
                          value={workflowData.category}
                          onValueChange={(value) => setWorkflowData({ ...workflowData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Development">Development</SelectItem>
                            <SelectItem value="HR">Human Resources</SelectItem>
                            <SelectItem value="Finance">Finance</SelectItem>
                            <SelectItem value="Operations">Operations</SelectItem>
                            <SelectItem value="Marketing">Marketing</SelectItem>
                            <SelectItem value="Support">Support</SelectItem>
                            <SelectItem value="Analytics">Analytics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Steps Preview */}
                  {currentStep === 3 && (
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Workflow Steps</h4>
                      {workflowData.steps.length > 0 ? (
                        <div className="space-y-3">
                          {workflowData.steps.map((step, index) => (
                            <div key={step.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-slate-900 text-sm">{step.name}</p>
                                <p className="text-xs text-slate-600">{step.description}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {step.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-slate-500">No steps configured yet. Ask the assistant for help!</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Settings Preview */}
                  {currentStep === 4 && (
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Settings Overview</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h5 className="font-medium text-slate-800 mb-2">Schedule</h5>
                          <p className="text-sm text-slate-600 capitalize">{workflowData.settings.schedule.type}</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h5 className="font-medium text-slate-800 mb-2">Execution</h5>
                          <p className="text-sm text-slate-600">
                            Timeout: {workflowData.settings.execution.timeout}s, Priority:{" "}
                            {workflowData.settings.execution.priority}
                          </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h5 className="font-medium text-slate-800 mb-2">Notifications</h5>
                          <p className="text-sm text-slate-600">Email: {workflowData.settings.notifications.email}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review */}
                  {currentStep === 5 && (
                    <div>
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Review & Create</h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg">
                          <h5 className="font-medium text-slate-800 mb-2">Workflow Summary</h5>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Name:</span>
                              <span className="font-medium">{workflowData.name || "Untitled Workflow"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Category:</span>
                              <span className="font-medium">{workflowData.category || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-600">Steps:</span>
                              <span className="font-medium">{workflowData.steps.length}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm text-green-800">
                            ✅ Your workflow is ready to be created! Click "Create Workflow" to finish.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="p-6 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                      Previous
                    </Button>
                    <div className="flex items-center gap-3">
                      {currentStep < wizardSteps.length ? (
                        <Button
                          onClick={nextStep}
                          disabled={
                            (currentStep === 1 && !selectedTemplate) || (currentStep === 2 && !workflowData.name)
                          }
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button
                          onClick={createWorkflow}
                          disabled={!workflowData.name}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Create Workflow
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Workflows Page */}
        {!isChatOpen && (
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
                <Button
                  onClick={() => setIsChatOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
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
        )}
      </div>
    </AuthGuard>
  )
}
