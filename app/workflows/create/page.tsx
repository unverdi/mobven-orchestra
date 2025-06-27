"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"
import {
  ArrowLeft,
  Save,
  Plus,
  X,
  GitBranch,
  Users,
  TrendingUp,
  MessageSquare,
  BarChart3,
  Settings,
  Target,
  Zap,
  Bell,
  Shield,
  Workflow,
  ChevronRight,
  Check,
  FileText,
  Timer,
  CheckCircle,
  RefreshCw,
  LucideLink,
  Send,
  Bot,
  User,
  Lightbulb,
  Sparkles,
} from "lucide-react"

export default function CreateWorkflowPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

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

  const [newStep, setNewStep] = useState({
    name: "",
    description: "",
    type: "",
    integrations: [] as string[],
    timeout: 300,
    retryAttempts: 3,
    conditions: {
      onSuccess: "continue",
      onFailure: "retry",
      onTimeout: "fail",
    },
    parameters: {} as Record<string, string>,
  })

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
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

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

  const stepTypes = [
    {
      id: "notification",
      name: "Notification",
      icon: Bell,
      description: "Send emails, Slack messages, or other notifications",
    },
    { id: "analysis", name: "Analysis", icon: BarChart3, description: "Analyze code, data, or other content" },
    { id: "build", name: "Build", icon: Settings, description: "Compile, build, or package applications" },
    { id: "testing", name: "Testing", icon: CheckCircle, description: "Run automated tests and validations" },
    { id: "deployment", name: "Deployment", icon: Zap, description: "Deploy applications or infrastructure" },
    { id: "security", name: "Security", icon: Shield, description: "Security scans and vulnerability checks" },
    { id: "review", name: "Review", icon: FileText, description: "Manual or automated review processes" },
    { id: "provisioning", name: "Provisioning", icon: Users, description: "Create accounts, resources, or access" },
    { id: "request", name: "Request", icon: Plus, description: "Create requests or tickets in external systems" },
    { id: "condition", name: "Condition", icon: Target, description: "Conditional logic and branching" },
    { id: "transformation", name: "Transformation", icon: RefreshCw, description: "Transform or process data" },
    { id: "integration", name: "Integration", icon: LucideLink, description: "Connect with external systems" },
  ]

  const availableIntegrations = [
    "GitLab",
    "GitHub",
    "Jira",
    "Slack",
    "Email",
    "Active Directory",
    "Docker",
    "Kubernetes",
    "SonarQube",
    "OWASP ZAP",
    "Snyk",
    "Jest",
    "TestContainers",
    "Zendesk",
    "HR System",
    "Survey Platform",
    "Performance Management System",
    "Calendar",
    "Database",
    "API",
    "Data Warehouse",
    "BI Tools",
    "ETL Engine",
    "Data Quality Tools",
    "LMS",
    "IT Service Desk",
  ]

  const wizardSteps = [
    { id: 1, name: "Template", description: "Choose a template or start from scratch" },
    { id: 2, name: "Basic Info", description: "Set workflow name and description" },
    { id: 3, name: "Steps", description: "Configure workflow steps" },
    { id: 4, name: "Settings", description: "Configure execution settings" },
    { id: 5, name: "Review", description: "Review and create workflow" },
  ]

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

  const addStep = () => {
    if (newStep.name && newStep.type) {
      const step = {
        id: workflowData.steps.length + 1,
        ...newStep,
        parameters: Object.fromEntries(Object.entries(newStep.parameters).filter(([_, value]) => value.trim() !== "")),
      }
      setWorkflowData({
        ...workflowData,
        steps: [...workflowData.steps, step],
      })
      setNewStep({
        name: "",
        description: "",
        type: "",
        integrations: [],
        timeout: 300,
        retryAttempts: 3,
        conditions: {
          onSuccess: "continue",
          onFailure: "retry",
          onTimeout: "fail",
        },
        parameters: {},
      })
    }
  }

  const removeStep = (stepId: number) => {
    setWorkflowData({
      ...workflowData,
      steps: workflowData.steps.filter((step) => step.id !== stepId),
    })
  }

  const createWorkflow = () => {
    // In a real app, this would save to backend
    console.log("Creating workflow:", workflowData)
    alert("Workflow created successfully!")
    router.push("/workflows")
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

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find((t) => t.id === type)
    return stepType ? stepType.icon : Settings
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

  const applySuggestion = (suggestion: string) => {
    if (currentStep === 1) {
      const templateId = suggestion.toLowerCase().includes("sdlc")
        ? "sdlc-automation"
        : suggestion.toLowerCase().includes("onboarding")
          ? "employee-onboarding"
          : suggestion.toLowerCase().includes("support")
            ? "customer-support"
            : "blank"
      selectTemplate(templateId)
    } else if (currentStep === 2 && suggestion.includes("name")) {
      setWorkflowData({ ...workflowData, name: suggestion })
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
        <Header variant="dashboard" />

        <div className="p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/workflows" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Workflows
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent mb-2">
              Create New Workflow
            </h1>
            <p className="text-slate-600">Build automated workflows to streamline your business processes</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {wizardSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                        currentStep >= step.id ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                    </div>
                    <div className="ml-3">
                      <p className={`font-medium ${currentStep >= step.id ? "text-blue-600" : "text-slate-600"}`}>
                        {step.name}
                      </p>
                      <p className="text-sm text-slate-500">{step.description}</p>
                    </div>
                  </div>
                  {index < wizardSteps.length - 1 && <ChevronRight className="w-5 h-5 text-slate-400 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6">
            {/* Step 1: Template Selection */}
            {currentStep === 1 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Workflow className="w-5 h-5 text-blue-600" />
                    Choose a Template
                  </CardTitle>
                  <CardDescription>
                    Start with a pre-built template or create a custom workflow from scratch
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workflowTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                          selectedTemplate === template.id
                            ? "border-blue-500 bg-blue-50/50"
                            : "border-slate-200 hover:border-blue-300"
                        }`}
                        onClick={() => selectTemplate(template.id)}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center`}>
                            <template.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{template.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {template.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm mb-4">{template.description}</p>
                        <div className="space-y-2 text-xs text-slate-500">
                          <div className="flex justify-between">
                            <span>Steps:</span>
                            <span>{template.steps}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Complexity:</span>
                            <span>{template.complexity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Est. Time:</span>
                            <span>{template.estimatedTime}</span>
                          </div>
                        </div>
                        {template.integrations.length > 0 && (
                          <div className="mt-4">
                            <p className="text-xs font-medium text-slate-700 mb-2">Integrations:</p>
                            <div className="flex flex-wrap gap-1">
                              {template.integrations.slice(0, 3).map((integration) => (
                                <Badge key={integration} variant="outline" className="text-xs px-2 py-0">
                                  {integration}
                                </Badge>
                              ))}
                              {template.integrations.length > 3 && (
                                <Badge variant="outline" className="text-xs px-2 py-0">
                                  +{template.integrations.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Basic Information */}
            {currentStep === 2 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-600" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Provide basic details about your workflow</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="workflow-name">Workflow Name *</Label>
                    <Input
                      id="workflow-name"
                      value={workflowData.name}
                      onChange={(e) => setWorkflowData({ ...workflowData, name: e.target.value })}
                      placeholder="Enter workflow name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workflow-description">Description</Label>
                    <Textarea
                      id="workflow-description"
                      value={workflowData.description}
                      onChange={(e) => setWorkflowData({ ...workflowData, description: e.target.value })}
                      placeholder="Describe what this workflow does"
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={workflowData.category}
                      onValueChange={(value) => setWorkflowData({ ...workflowData, category: value })}
                    >
                      <SelectTrigger className="mt-1">
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
                </CardContent>
              </Card>
            )}

            {/* Step 3: Workflow Steps */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-purple-600" />
                      Workflow Steps
                    </CardTitle>
                    <CardDescription>Configure the steps that make up your workflow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Existing Steps */}
                    {workflowData.steps.length > 0 && (
                      <div className="space-y-4 mb-6">
                        <h4 className="font-medium text-slate-900">Current Steps:</h4>
                        {workflowData.steps.map((step, index) => {
                          const StepIcon = getStepIcon(step.type)
                          return (
                            <div
                              key={step.id}
                              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-white/60"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <span className="text-sm font-semibold text-blue-600">{index + 1}</span>
                                </div>
                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                  <StepIcon className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-slate-900">{step.name}</h5>
                                  <p className="text-sm text-slate-600">{step.description}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {stepTypes.find((t) => t.id === step.type)?.name}
                                    </Badge>
                                    {step.integrations.length > 0 && (
                                      <div className="flex gap-1">
                                        {step.integrations.slice(0, 2).map((integration) => (
                                          <Badge key={integration} variant="outline" className="text-xs px-2 py-0">
                                            {integration}
                                          </Badge>
                                        ))}
                                        {step.integrations.length > 2 && (
                                          <Badge variant="outline" className="text-xs px-2 py-0">
                                            +{step.integrations.length - 2}
                                          </Badge>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeStep(step.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          )
                        })}
                      </div>
                    )}

                    {/* Add New Step */}
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6">
                      <h4 className="font-medium text-slate-900 mb-4">Add New Step</h4>
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="step-name">Step Name *</Label>
                          <Input
                            id="step-name"
                            value={newStep.name}
                            onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
                            placeholder="Enter step name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="step-type">Step Type *</Label>
                          <Select
                            value={newStep.type}
                            onValueChange={(value) => setNewStep({ ...newStep, type: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select step type" />
                            </SelectTrigger>
                            <SelectContent>
                              {stepTypes.map((type) => (
                                <SelectItem key={type.id} value={type.id}>
                                  <div className="flex items-center gap-2">
                                    <type.icon className="w-4 h-4" />
                                    {type.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mb-4">
                        <Label htmlFor="step-description">Description</Label>
                        <Textarea
                          id="step-description"
                          value={newStep.description}
                          onChange={(e) => setNewStep({ ...newStep, description: e.target.value })}
                          placeholder="Describe what this step does"
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <Label htmlFor="step-timeout">Timeout (seconds)</Label>
                          <Input
                            id="step-timeout"
                            type="number"
                            value={newStep.timeout}
                            onChange={(e) => setNewStep({ ...newStep, timeout: Number.parseInt(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="step-retry">Retry Attempts</Label>
                          <Input
                            id="step-retry"
                            type="number"
                            value={newStep.retryAttempts}
                            onChange={(e) => setNewStep({ ...newStep, retryAttempts: Number.parseInt(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="step-integrations">Integrations</Label>
                          <Select
                            onValueChange={(value) => {
                              if (!newStep.integrations.includes(value)) {
                                setNewStep({ ...newStep, integrations: [...newStep.integrations, value] })
                              }
                            }}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Add integration" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableIntegrations.map((integration) => (
                                <SelectItem key={integration} value={integration}>
                                  {integration}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      {newStep.integrations.length > 0 && (
                        <div className="mb-4">
                          <Label>Selected Integrations:</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {newStep.integrations.map((integration) => (
                              <Badge key={integration} variant="outline" className="text-xs">
                                {integration}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="ml-1 h-auto p-0"
                                  onClick={() => {
                                    setNewStep({
                                      ...newStep,
                                      integrations: newStep.integrations.filter((i) => i !== integration),
                                    })
                                  }}
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <Button onClick={addStep} disabled={!newStep.name || !newStep.type}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Step
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Settings */}
            {currentStep === 4 && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Schedule Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Timer className="w-5 h-5 text-green-600" />
                      Schedule Settings
                    </CardTitle>
                    <CardDescription>Configure when the workflow runs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="schedule-type">Schedule Type</Label>
                      <Select
                        value={workflowData.settings.schedule.type}
                        onValueChange={(value) =>
                          setWorkflowData({
                            ...workflowData,
                            settings: {
                              ...workflowData.settings,
                              schedule: { ...workflowData.settings.schedule, type: value },
                            },
                          })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manual">Manual</SelectItem>
                          <SelectItem value="interval">Interval</SelectItem>
                          <SelectItem value="cron">Cron Expression</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {workflowData.settings.schedule.type === "interval" && (
                      <div>
                        <Label htmlFor="interval">Interval (minutes)</Label>
                        <Input
                          id="interval"
                          type="number"
                          value={workflowData.settings.schedule.interval}
                          onChange={(e) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                schedule: { ...workflowData.settings.schedule, interval: Number(e.target.value) },
                              },
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    )}
                    {workflowData.settings.schedule.type === "cron" && (
                      <div>
                        <Label htmlFor="cron">Cron Expression</Label>
                        <Input
                          id="cron"
                          value={workflowData.settings.schedule.cronExpression}
                          onChange={(e) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                schedule: { ...workflowData.settings.schedule, cronExpression: e.target.value },
                              },
                            })
                          }
                          placeholder="0 9 * * 1-5"
                          className="mt-1"
                        />
                        <p className="text-xs text-slate-500 mt-1">Example: 0 9 * * 1-5 (weekdays at 9 AM)</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Execution Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      Execution Settings
                    </CardTitle>
                    <CardDescription>Configure execution behavior</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="timeout">Timeout (seconds)</Label>
                      <Input
                        id="timeout"
                        type="number"
                        value={workflowData.settings.execution.timeout}
                        onChange={(e) =>
                          setWorkflowData({
                            ...workflowData,
                            settings: {
                              ...workflowData.settings,
                              execution: { ...workflowData.settings.execution, timeout: Number(e.target.value) },
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="retry-attempts">Retry Attempts</Label>
                      <Input
                        id="retry-attempts"
                        type="number"
                        value={workflowData.settings.execution.retryAttempts}
                        onChange={(e) =>
                          setWorkflowData({
                            ...workflowData,
                            settings: {
                              ...workflowData.settings,
                              execution: { ...workflowData.settings.execution, retryAttempts: Number(e.target.value) },
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Priority</Label>
                      <Select
                        value={workflowData.settings.execution.priority}
                        onValueChange={(value) =>
                          setWorkflowData({
                            ...workflowData,
                            settings: {
                              ...workflowData.settings,
                              execution: { ...workflowData.settings.execution, priority: value },
                            },
                          })
                        }
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Notification Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-orange-600" />
                      Notifications
                    </CardTitle>
                    <CardDescription>Configure notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="notification-email">Email</Label>
                      <Input
                        id="notification-email"
                        type="email"
                        value={workflowData.settings.notifications.email}
                        onChange={(e) =>
                          setWorkflowData({
                            ...workflowData,
                            settings: {
                              ...workflowData.settings,
                              notifications: { ...workflowData.settings.notifications, email: e.target.value },
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Notify on Success</Label>
                        <Switch
                          checked={workflowData.settings.notifications.onSuccess}
                          onCheckedChange={(checked) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                notifications: { ...workflowData.settings.notifications, onSuccess: checked },
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Notify on Failure</Label>
                        <Switch
                          checked={workflowData.settings.notifications.onFailure}
                          onCheckedChange={(checked) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                notifications: { ...workflowData.settings.notifications, onFailure: checked },
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Slack Notifications</Label>
                        <Switch
                          checked={workflowData.settings.notifications.slack}
                          onCheckedChange={(checked) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                notifications: { ...workflowData.settings.notifications, slack: checked },
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trigger Settings */}
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-indigo-600" />
                      Triggers
                    </CardTitle>
                    <CardDescription>Configure what can trigger this workflow</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Manual Trigger</Label>
                        <Switch
                          checked={workflowData.settings.triggers.manual}
                          onCheckedChange={(checked) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                triggers: { ...workflowData.settings.triggers, manual: checked },
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Scheduled Trigger</Label>
                        <Switch
                          checked={workflowData.settings.triggers.scheduled}
                          onCheckedChange={(checked) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                triggers: { ...workflowData.settings.triggers, scheduled: checked },
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Webhook Trigger</Label>
                        <Switch
                          checked={workflowData.settings.triggers.webhook}
                          onCheckedChange={(checked) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                triggers: { ...workflowData.settings.triggers, webhook: checked },
                              },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>API Call Trigger</Label>
                        <Switch
                          checked={workflowData.settings.triggers.apiCall}
                          onCheckedChange={(checked) =>
                            setWorkflowData({
                              ...workflowData,
                              settings: {
                                ...workflowData.settings,
                                triggers: { ...workflowData.settings.triggers, apiCall: checked },
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Review & Create
                  </CardTitle>
                  <CardDescription>Review your workflow configuration before creating</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Basic Information</h4>
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Name:</span>
                        <span className="font-medium">{workflowData.name || "Untitled Workflow"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Category:</span>
                        <span className="font-medium">{workflowData.category || "Not specified"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Template:</span>
                        <span className="font-medium">
                          {workflowTemplates.find((t) => t.id === workflowData.template)?.name || "Custom"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Steps:</span>
                        <span className="font-medium">{workflowData.steps.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Steps Preview */}
                  {workflowData.steps.length > 0 && (
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Workflow Steps</h4>
                      <div className="space-y-3">
                        {workflowData.steps.map((step, index) => {
                          const StepIcon = getStepIcon(step.type)
                          return (
                            <div key={step.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                              </div>
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <StepIcon className="w-4 h-4 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-slate-900">{step.name}</p>
                                <p className="text-sm text-slate-600">{step.description}</p>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {stepTypes.find((t) => t.id === step.type)?.name}
                              </Badge>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Settings Summary */}
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Settings Summary</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h5 className="font-medium text-slate-800 mb-2">Schedule</h5>
                        <p className="text-sm text-slate-600 capitalize">
                          {workflowData.settings.schedule.type}
                          {workflowData.settings.schedule.type === "interval" &&
                            ` (${workflowData.settings.schedule.interval} minutes)`}
                          {workflowData.settings.schedule.type === "cron" &&
                            ` (${workflowData.settings.schedule.cronExpression})`}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h5 className="font-medium text-slate-800 mb-2">Execution</h5>
                        <p className="text-sm text-slate-600">
                          Timeout: {workflowData.settings.execution.timeout}s, Retries:{" "}
                          {workflowData.settings.execution.retryAttempts}, Priority:{" "}
                          {workflowData.settings.execution.priority}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h5 className="font-medium text-slate-800 mb-2">Notifications</h5>
                        <p className="text-sm text-slate-600">
                          Email: {workflowData.settings.notifications.email}
                          {workflowData.settings.notifications.slack && ", Slack enabled"}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <h5 className="font-medium text-slate-800 mb-2">Triggers</h5>
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(workflowData.settings.triggers)
                            .filter(([_, enabled]) => enabled)
                            .map(([trigger, _]) => (
                              <Badge key={trigger} variant="outline" className="text-xs capitalize">
                                {trigger.replace(/([A-Z])/g, " $1").trim()}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Assistant */}
          <div className="fixed bottom-6 right-6 z-50">
            {!isChatOpen ? (
              <Button
                onClick={() => setIsChatOpen(true)}
                className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <MessageSquare className="w-6 h-6" />
              </Button>
            ) : (
              <Card className="w-96 h-[500px] border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col">
                <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">Workflow Assistant</CardTitle>
                        <p className="text-xs text-blue-100">AI-powered workflow helper</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsChatOpen(false)}
                      className="text-white hover:bg-white/20 h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-0 flex flex-col">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.type === "assistant" && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            message.type === "user"
                              ? "bg-blue-600 text-white rounded-br-md"
                              : "bg-slate-100 text-slate-900 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {message.type === "user" && (
                          <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-slate-600" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-slate-100 p-3 rounded-2xl rounded-bl-md">
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
                    <div className="px-4 pb-2">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-transparent"
                          onClick={() => setChatInput("I need help with SDLC automation")}
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          SDLC Help
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-transparent"
                          onClick={() => setChatInput("Show me HR templates")}
                        >
                          <Users className="w-3 h-3 mr-1" />
                          HR Templates
                        </Button>
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="px-4 pb-2">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 bg-transparent"
                          onClick={() => setChatInput("Suggest a good name for this workflow")}
                        >
                          <Lightbulb className="w-3 h-3 mr-1" />
                          Name Ideas
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 border-t border-slate-200">
                    <div className="flex gap-2">
                      <Input
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask me anything about workflows..."
                        className="flex-1 text-sm"
                        onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                      />
                      <Button
                        onClick={sendChatMessage}
                        disabled={!chatInput.trim() || isTyping}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              Previous
            </Button>
            <div className="flex items-center gap-3">
              {currentStep < wizardSteps.length ? (
                <Button
                  onClick={nextStep}
                  disabled={(currentStep === 1 && !selectedTemplate) || (currentStep === 2 && !workflowData.name)}
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
                  <Save className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
