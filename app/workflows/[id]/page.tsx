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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Header } from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import Link from "next/link"
import {
  ArrowLeft,
  Play,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle,
  GitBranch,
  Users,
  TrendingUp,
  Activity,
  FileText,
  BarChart3,
  Save,
  RefreshCw,
  Trash2,
  Bell,
  Shield,
  Zap,
  Timer,
  Target,
  Workflow,
  Edit,
} from "lucide-react"

export default function WorkflowDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const workflowId = params.id as string
  const defaultTab = searchParams.get("tab") || "overview"

  const [workflowSettings, setWorkflowSettings] = useState({
    name: "",
    description: "",
    category: "",
    enabled: true,
    schedule: {
      type: "manual", // manual, interval, cron
      interval: 60, // minutes
      cronExpression: "0 9 * * 1-5", // weekdays at 9 AM
    },
    execution: {
      timeout: 1800, // seconds
      retryAttempts: 3,
      retryDelay: 60, // seconds
      maxConcurrentRuns: 1,
      priority: "normal",
    },
    notifications: {
      onSuccess: true,
      onFailure: true,
      onTimeout: true,
      email: "admin@mobven.com",
      slack: true,
      webhookUrl: "",
    },
    triggers: {
      manual: true,
      scheduled: false,
      webhook: false,
      fileChange: false,
      apiCall: false,
    },
    security: {
      requireApproval: false,
      allowedUsers: [],
      encryptLogs: true,
      auditTrail: true,
    },
    performance: {
      logLevel: "info", // debug, info, warn, error
      enableMetrics: true,
      enableProfiling: false,
      resourceLimits: {
        cpu: 80, // percentage
        memory: 4096, // MB
        disk: 20480, // MB
      },
    },
  })

  const [editingStep, setEditingStep] = useState<any>(null)
  const [stepSettings, setStepSettings] = useState({
    name: "",
    description: "",
    timeout: 300,
    retryAttempts: 3,
    retryDelay: 30,
    integrations: [],
    conditions: {
      onSuccess: "continue",
      onFailure: "retry",
      onTimeout: "fail",
    },
    parameters: {},
  })

  // Workflow data based on ID
  const workflowsData = {
    "sdlc-automation": {
      id: "sdlc-automation",
      name: "SDLC Automation Workflow",
      description: "End-to-end software development lifecycle automation with GitLab, Jira, and Azure integration",
      status: "active",
      category: "Development",
      icon: GitBranch,
      steps: 12,
      completedRuns: 247,
      totalRuns: 290,
      successRate: 92.4,
      lastRun: "2 hours ago",
      avgDuration: "45 minutes",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-20",
      triggers: ["Code commit to main branch", "Pull request creation", "Release tag"],
      owner: "DevOps Team",
      team: "Engineering",
      nextRun: "In 4 hours",
      efficiency: 92,
      performanceMetrics: [
        { label: "Success Rate", value: 92.4, change: +2.1, color: "text-emerald-600" },
        { label: "Avg Duration", value: "45m", change: -5.2, color: "text-blue-600" },
        { label: "Total Runs", value: 247, change: +28, color: "text-purple-600" },
        { label: "Error Rate", value: 7.6, change: -2.1, color: "text-red-600" },
      ],
      recentTasks: [
        {
          id: 1,
          name: "Code review for payment module",
          status: "completed",
          duration: "12m 30s",
          timestamp: "2 hours ago",
          step: "Step 3: Code Review",
        },
        {
          id: 2,
          name: "Deploy to staging environment",
          status: "completed",
          duration: "8m 45s",
          timestamp: "4 hours ago",
          step: "Step 8: Deployment",
        },
        {
          id: 3,
          name: "Run integration tests",
          status: "in_progress",
          duration: "5m 30s",
          timestamp: "6 hours ago",
          step: "Step 5: Testing",
        },
      ],
      workflowSteps: [
        {
          id: 1,
          name: "Code Analysis",
          description: "Analyze code quality and security vulnerabilities",
          status: "active",
          avgDuration: "3m",
          successRate: 98.5,
          integrations: ["GitLab", "SonarQube"],
          timeout: 300,
          retryAttempts: 3,
          retryDelay: 30,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "fail",
          },
          parameters: {
            scanType: "full",
            threshold: "high",
          },
        },
        {
          id: 2,
          name: "Build Process",
          description: "Compile and build application artifacts",
          status: "active",
          avgDuration: "8m",
          successRate: 95.2,
          integrations: ["GitLab CI", "Docker"],
          timeout: 600,
          retryAttempts: 2,
          retryDelay: 60,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "fail",
          },
          parameters: {
            buildType: "release",
            platform: "linux",
          },
        },
        {
          id: 3,
          name: "Code Review",
          description: "Automated and manual code review process",
          status: "active",
          avgDuration: "12m",
          successRate: 89.7,
          integrations: ["GitLab", "Jira"],
          timeout: 900,
          retryAttempts: 1,
          retryDelay: 120,
          conditions: {
            onSuccess: "continue",
            onFailure: "manual_review",
            onTimeout: "escalate",
          },
          parameters: {
            reviewType: "automated",
            assignReviewer: true,
          },
        },
        {
          id: 4,
          name: "Unit Testing",
          description: "Run comprehensive unit test suite",
          status: "active",
          avgDuration: "5m",
          successRate: 97.8,
          integrations: ["Jest", "GitLab CI"],
          timeout: 400,
          retryAttempts: 2,
          retryDelay: 30,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "fail",
          },
          parameters: {
            coverage: "80%",
            parallel: true,
          },
        },
        {
          id: 5,
          name: "Integration Testing",
          description: "Execute integration tests with external services",
          status: "active",
          avgDuration: "15m",
          successRate: 92.1,
          integrations: ["Docker", "TestContainers"],
          timeout: 1200,
          retryAttempts: 3,
          retryDelay: 60,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "fail",
          },
          parameters: {
            environment: "staging",
            services: ["database", "redis", "api"],
          },
        },
        {
          id: 6,
          name: "Security Scan",
          description: "Perform security vulnerability assessment",
          status: "active",
          avgDuration: "7m",
          successRate: 94.5,
          integrations: ["OWASP ZAP", "Snyk"],
          timeout: 500,
          retryAttempts: 2,
          retryDelay: 45,
          conditions: {
            onSuccess: "continue",
            onFailure: "security_review",
            onTimeout: "fail",
          },
          parameters: {
            scanDepth: "deep",
            reportFormat: "json",
          },
        },
      ],
    },
    "employee-onboarding": {
      id: "employee-onboarding",
      name: "Employee Onboarding Workflow",
      description: "Automated new hire onboarding with HR systems, Slack integration, and training coordination",
      status: "active",
      category: "HR",
      icon: Users,
      steps: 8,
      completedRuns: 156,
      totalRuns: 200,
      successRate: 95.2,
      lastRun: "1 hour ago",
      avgDuration: "2.5 days",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-22",
      triggers: ["New employee record created", "Start date approaching"],
      owner: "HR Team",
      team: "Human Resources",
      nextRun: "Tomorrow 9:00 AM",
      efficiency: 88,
      performanceMetrics: [
        { label: "Success Rate", value: 95.2, change: +3.8, color: "text-emerald-600" },
        { label: "Avg Duration", value: "2.5d", change: -0.8, color: "text-blue-600" },
        { label: "Total Runs", value: 156, change: +12, color: "text-purple-600" },
        { label: "Error Rate", value: 4.8, change: -3.8, color: "text-red-600" },
      ],
      recentTasks: [
        {
          id: 1,
          name: "Create accounts for Sarah Johnson",
          status: "completed",
          duration: "5m 15s",
          timestamp: "1 hour ago",
          step: "Step 2: Account Setup",
        },
        {
          id: 2,
          name: "Send welcome email package",
          status: "completed",
          duration: "2m 30s",
          timestamp: "3 hours ago",
          step: "Step 1: Welcome",
        },
        {
          id: 3,
          name: "Schedule orientation meeting",
          status: "completed",
          duration: "3m 45s",
          timestamp: "5 hours ago",
          step: "Step 6: Scheduling",
        },
      ],
      workflowSteps: [
        {
          id: 1,
          name: "Welcome Package",
          description: "Send welcome email with company information and first-day details",
          status: "active",
          avgDuration: "2m",
          successRate: 99.1,
          integrations: ["Email", "HR System"],
          timeout: 120,
          retryAttempts: 2,
          retryDelay: 30,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "manual_send",
          },
          parameters: {
            template: "welcome_v2",
            attachments: ["handbook", "policies"],
          },
        },
        {
          id: 2,
          name: "Account Creation",
          description: "Create user accounts in all necessary systems",
          status: "active",
          avgDuration: "5m",
          successRate: 94.8,
          integrations: ["Active Directory", "Slack", "Jira"],
          timeout: 400,
          retryAttempts: 3,
          retryDelay: 60,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "escalate",
          },
          parameters: {
            permissions: "standard_employee",
            groups: ["all_employees", "department_specific"],
          },
        },
        {
          id: 3,
          name: "Equipment Request",
          description: "Request and track IT equipment for new employee",
          status: "active",
          avgDuration: "15m",
          successRate: 92.3,
          integrations: ["IT Service Desk", "Asset Management"],
          timeout: 1800,
          retryAttempts: 2,
          retryDelay: 300,
          conditions: {
            onSuccess: "continue",
            onFailure: "manual_request",
            onTimeout: "escalate",
          },
          parameters: {
            equipmentType: "laptop",
            priority: "normal",
          },
        },
      ],
    },
    "performance-reviews": {
      id: "performance-reviews",
      name: "Performance Review Workflow",
      description: "Quarterly performance review automation with 360-degree feedback and goal tracking",
      status: "active",
      category: "HR",
      icon: TrendingUp,
      steps: 10,
      completedRuns: 89,
      totalRuns: 120,
      successRate: 88.7,
      lastRun: "3 days ago",
      avgDuration: "5 days",
      createdAt: "2024-01-05",
      updatedAt: "2024-01-18",
      triggers: ["Quarterly review period", "Manager request"],
      owner: "HR Team",
      team: "Human Resources",
      nextRun: "Next Monday",
      efficiency: 85,
      performanceMetrics: [
        { label: "Success Rate", value: 88.7, change: +5.2, color: "text-emerald-600" },
        { label: "Avg Duration", value: "5d", change: -1.2, color: "text-blue-600" },
        { label: "Total Runs", value: 89, change: +15, color: "text-purple-600" },
        { label: "Error Rate", value: 11.3, change: -5.2, color: "text-red-600" },
      ],
      recentTasks: [
        {
          id: 1,
          name: "Collect 360 feedback for Q4 reviews",
          status: "completed",
          duration: "2d 4h",
          timestamp: "3 days ago",
          step: "Step 4: Feedback Collection",
        },
        {
          id: 2,
          name: "Generate performance reports",
          status: "completed",
          duration: "45m",
          timestamp: "1 week ago",
          step: "Step 8: Report Generation",
        },
        {
          id: 3,
          name: "Schedule review meetings",
          status: "completed",
          duration: "1h 20m",
          timestamp: "1 week ago",
          step: "Step 9: Meeting Scheduling",
        },
      ],
      workflowSteps: [
        {
          id: 1,
          name: "Review Initiation",
          description: "Start performance review cycle and notify participants",
          status: "active",
          avgDuration: "10m",
          successRate: 97.5,
          integrations: ["HR System", "Email"],
          timeout: 600,
          retryAttempts: 2,
          retryDelay: 120,
          conditions: {
            onSuccess: "continue",
            onFailure: "retry",
            onTimeout: "manual_notify",
          },
          parameters: {
            reviewPeriod: "Q4_2024",
            participants: "all_employees",
          },
        },
        {
          id: 2,
          name: "Self Assessment",
          description: "Employee completes self-assessment form",
          status: "active",
          avgDuration: "2h",
          successRate: 85.2,
          integrations: ["Performance Management System"],
          timeout: 7200,
          retryAttempts: 1,
          retryDelay: 3600,
          conditions: {
            onSuccess: "continue",
            onFailure: "reminder",
            onTimeout: "escalate",
          },
          parameters: {
            formType: "self_assessment_v3",
            deadline: "7_days",
          },
        },
        {
          id: 3,
          name: "360 Feedback",
          description: "Collect feedback from peers, subordinates, and managers",
          status: "active",
          avgDuration: "3d",
          successRate: 78.9,
          integrations: ["Survey Platform", "HR System"],
          timeout: 259200,
          retryAttempts: 2,
          retryDelay: 86400,
          conditions: {
            onSuccess: "continue",
            onFailure: "partial_feedback",
            onTimeout: "extend_deadline",
          },
          parameters: {
            feedbackTypes: ["peer", "subordinate", "manager"],
            anonymity: true,
          },
        },
      ],
    },
  }

  const workflow = workflowsData[workflowId as keyof typeof workflowsData] || workflowsData["sdlc-automation"]

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(`workflow_settings_${workflowId}`)
    if (savedSettings) {
      setWorkflowSettings({ ...workflowSettings, ...JSON.parse(savedSettings) })
    } else {
      // Initialize with workflow data
      setWorkflowSettings({
        ...workflowSettings,
        name: workflow.name,
        description: workflow.description,
        category: workflow.category,
      })
    }
  }, [workflowId])

  const saveSettings = () => {
    localStorage.setItem(`workflow_settings_${workflowId}`, JSON.stringify(workflowSettings))
    alert("Workflow settings saved successfully!")
  }

  const resetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      localStorage.removeItem(`workflow_settings_${workflowId}`)
      setWorkflowSettings({
        name: workflow.name,
        description: workflow.description,
        category: workflow.category,
        enabled: true,
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
          slack: true,
          webhookUrl: "",
        },
        triggers: {
          manual: true,
          scheduled: false,
          webhook: false,
          fileChange: false,
          apiCall: false,
        },
        security: {
          requireApproval: false,
          allowedUsers: [],
          encryptLogs: true,
          auditTrail: true,
        },
        performance: {
          logLevel: "info",
          enableMetrics: true,
          enableProfiling: false,
          resourceLimits: {
            cpu: 80,
            memory: 4096,
            disk: 20480,
          },
        },
      })
    }
  }

  const openStepEditor = (step: any) => {
    setEditingStep(step)
    setStepSettings({
      name: step.name,
      description: step.description,
      timeout: step.timeout,
      retryAttempts: step.retryAttempts,
      retryDelay: step.retryDelay,
      integrations: step.integrations,
      conditions: step.conditions,
      parameters: step.parameters,
    })
  }

  const saveStepSettings = () => {
    // In a real app, this would save to backend
    console.log("Saving step settings:", stepSettings)
    setEditingStep(null)
    alert("Step settings saved successfully!")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 animate-in fade-in duration-500">
        <Header variant="dashboard" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in slide-in-from-bottom-4 duration-700">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 animate-in slide-in-from-left-6 duration-500">
            <Link
              href="/workflows"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Workflows
            </Link>
          </div>

          {/* Workflow Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
                  <workflow.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">{workflow.name}</h1>
                  <p className="text-slate-600 text-lg mb-3">{workflow.description}</p>
                  <div className="flex items-center gap-4">
                    <Badge className={getStatusColor(workflow.status)} className="text-sm">
                      {getStatusIcon(workflow.status)}
                      <span className="ml-1 capitalize">{workflow.status}</span>
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      {workflow.category}
                    </Badge>
                    <span className="text-sm text-slate-500">{workflow.steps} steps</span>
                    <span className="text-sm text-slate-500">Owner: {workflow.owner}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="transition-all duration-300 hover:scale-105 bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Run Workflow
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflow.performanceMetrics.map((metric, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">{metric.label}</p>
                        <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                        <p className={`text-xs mt-1 ${metric.color}`}>
                          {metric.change > 0 ? "+" : ""}
                          {metric.change}% from last month
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="animate-in slide-in-from-bottom-4 duration-700 delay-300">
            <Tabs defaultValue={defaultTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="executions">Executions</TabsTrigger>
                <TabsTrigger value="steps">Steps</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Performance Chart */}
                  <div className="lg:col-span-2">
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          Workflow Performance
                        </CardTitle>
                        <CardDescription>Success rate and execution metrics over time</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Success Rate</span>
                              <span className="text-sm text-slate-600">{workflow.successRate}%</span>
                            </div>
                            <Progress value={workflow.successRate} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Completion Rate</span>
                              <span className="text-sm text-slate-600">
                                {Math.round((workflow.completedRuns / workflow.totalRuns) * 100)}%
                              </span>
                            </div>
                            <Progress value={(workflow.completedRuns / workflow.totalRuns) * 100} className="h-2" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Efficiency Score</span>
                              <span className="text-sm text-slate-600">{workflow.efficiency}%</span>
                            </div>
                            <Progress value={workflow.efficiency} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Workflow Info */}
                  <div className="space-y-6">
                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-green-600" />
                          Workflow Details
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Status</span>
                          <Badge className={getStatusColor(workflow.status)}>
                            {getStatusIcon(workflow.status)}
                            <span className="ml-1 capitalize">{workflow.status}</span>
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Last Run</span>
                          <span className="text-sm text-slate-600">{workflow.lastRun}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Next Run</span>
                          <span className="text-sm text-slate-600">{workflow.nextRun}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Avg Duration</span>
                          <span className="text-sm text-slate-600">{workflow.avgDuration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Total Runs</span>
                          <span className="text-sm text-slate-600">{workflow.totalRuns}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Success Rate</span>
                          <span className="text-sm text-slate-600">{workflow.successRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Created</span>
                          <span className="text-sm text-slate-600">{workflow.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">Updated</span>
                          <span className="text-sm text-slate-600">{workflow.updatedAt}</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-purple-600" />
                          Triggers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {workflow.triggers.map((trigger, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-slate-600">{trigger}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="executions" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Recent Executions
                    </CardTitle>
                    <CardDescription>Latest workflow runs and their results</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workflow.recentTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between p-4 border border-slate-200/50 rounded-lg hover:bg-slate-50/50 transition-colors duration-200"
                        >
                          <div className="flex items-center gap-4">
                            <Badge className={getStatusColor(task.status)}>
                              {getStatusIcon(task.status)}
                              <span className="ml-1 capitalize">{task.status.replace("_", " ")}</span>
                            </Badge>
                            <div>
                              <p className="font-medium text-slate-900">{task.name}</p>
                              <p className="text-sm text-slate-500">
                                {task.timestamp} • Duration: {task.duration} • {task.step}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-slate-100 transition-colors duration-200"
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="steps" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Workflow className="w-5 h-5 text-purple-600" />
                      Workflow Steps
                    </CardTitle>
                    <CardDescription>Configure and monitor individual workflow steps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workflow.workflowSteps.map((step, index) => (
                        <div
                          key={step.id}
                          className="p-6 border border-slate-200/50 rounded-xl hover:bg-slate-50/30 transition-all duration-200 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-900">{step.name}</h4>
                                <p className="text-sm text-slate-600">{step.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={getStatusColor(step.status)}>
                                {getStatusIcon(step.status)}
                                <span className="ml-1 capitalize">{step.status}</span>
                              </Badge>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openStepEditor(step)}
                                    className="hover:bg-slate-100 transition-colors duration-200"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl border-0 rounded-3xl z-[9999] fixed">
                                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[9998]" />
                                  <div className="relative z-[9999] bg-white rounded-3xl shadow-2xl">
                                    <DialogHeader className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-t-3xl border-b">
                                      <DialogTitle className="text-2xl font-bold text-slate-900">
                                        Edit Step: {step.name}
                                      </DialogTitle>
                                      <DialogDescription className="text-slate-600 text-lg">
                                        Configure step parameters, conditions, and behavior settings
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="p-8 space-y-8">
                                      {/* Basic Settings */}
                                      <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                                          Basic Settings
                                        </h3>
                                        <div className="grid grid-cols-2 gap-6">
                                          <div>
                                            <Label htmlFor="step-name" className="text-sm font-medium">
                                              Step Name
                                            </Label>
                                            <Input
                                              id="step-name"
                                              value={stepSettings.name}
                                              onChange={(e) =>
                                                setStepSettings({ ...stepSettings, name: e.target.value })
                                              }
                                              className="mt-2"
                                              placeholder="Enter step name"
                                            />
                                          </div>
                                          <div>
                                            <Label htmlFor="step-timeout" className="text-sm font-medium">
                                              Timeout (seconds)
                                            </Label>
                                            <Input
                                              id="step-timeout"
                                              type="number"
                                              value={stepSettings.timeout}
                                              onChange={(e) =>
                                                setStepSettings({
                                                  ...stepSettings,
                                                  timeout: Number.parseInt(e.target.value),
                                                })
                                              }
                                              className="mt-2"
                                              placeholder="300"
                                            />
                                          </div>
                                        </div>
                                        <div>
                                          <Label htmlFor="step-description" className="text-sm font-medium">
                                            Description
                                          </Label>
                                          <Textarea
                                            id="step-description"
                                            value={stepSettings.description}
                                            onChange={(e) =>
                                              setStepSettings({ ...stepSettings, description: e.target.value })
                                            }
                                            className="mt-2"
                                            rows={3}
                                            placeholder="Describe what this step does"
                                          />
                                        </div>
                                      </div>

                                      {/* Retry Settings */}
                                      <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                                          Retry Settings
                                        </h3>
                                        <div className="grid grid-cols-2 gap-6">
                                          <div>
                                            <Label htmlFor="retry-attempts" className="text-sm font-medium">
                                              Retry Attempts
                                            </Label>
                                            <Input
                                              id="retry-attempts"
                                              type="number"
                                              value={stepSettings.retryAttempts}
                                              onChange={(e) =>
                                                setStepSettings({
                                                  ...stepSettings,
                                                  retryAttempts: Number.parseInt(e.target.value),
                                                })
                                              }
                                              className="mt-2"
                                              placeholder="3"
                                            />
                                          </div>
                                          <div>
                                            <Label htmlFor="retry-delay" className="text-sm font-medium">
                                              Retry Delay (seconds)
                                            </Label>
                                            <Input
                                              id="retry-delay"
                                              type="number"
                                              value={stepSettings.retryDelay}
                                              onChange={(e) =>
                                                setStepSettings({
                                                  ...stepSettings,
                                                  retryDelay: Number.parseInt(e.target.value),
                                                })
                                              }
                                              className="mt-2"
                                              placeholder="30"
                                            />
                                          </div>
                                        </div>
                                      </div>

                                      {/* Conditions */}
                                      <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                                          Execution Conditions
                                        </h3>
                                        <div className="grid grid-cols-3 gap-6">
                                          <div>
                                            <Label htmlFor="on-success" className="text-sm font-medium">
                                              On Success
                                            </Label>
                                            <Select
                                              value={stepSettings.conditions.onSuccess}
                                              onValueChange={(value) =>
                                                setStepSettings({
                                                  ...stepSettings,
                                                  conditions: { ...stepSettings.conditions, onSuccess: value },
                                                })
                                              }
                                            >
                                              <SelectTrigger className="mt-2">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="continue">Continue</SelectItem>
                                                <SelectItem value="stop">Stop</SelectItem>
                                                <SelectItem value="skip_next">Skip Next</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <Label htmlFor="on-failure" className="text-sm font-medium">
                                              On Failure
                                            </Label>
                                            <Select
                                              value={stepSettings.conditions.onFailure}
                                              onValueChange={(value) =>
                                                setStepSettings({
                                                  ...stepSettings,
                                                  conditions: { ...stepSettings.conditions, onFailure: value },
                                                })
                                              }
                                            >
                                              <SelectTrigger className="mt-2">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="retry">Retry</SelectItem>
                                                <SelectItem value="fail">Fail</SelectItem>
                                                <SelectItem value="continue">Continue</SelectItem>
                                                <SelectItem value="manual_review">Manual Review</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div>
                                            <Label htmlFor="on-timeout" className="text-sm font-medium">
                                              On Timeout
                                            </Label>
                                            <Select
                                              value={stepSettings.conditions.onTimeout}
                                              onValueChange={(value) =>
                                                setStepSettings({
                                                  ...stepSettings,
                                                  conditions: { ...stepSettings.conditions, onTimeout: value },
                                                })
                                              }
                                            >
                                              <SelectTrigger className="mt-2">
                                                <SelectValue />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="fail">Fail</SelectItem>
                                                <SelectItem value="retry">Retry</SelectItem>
                                                <SelectItem value="escalate">Escalate</SelectItem>
                                                <SelectItem value="continue">Continue</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Integrations */}
                                      <div className="space-y-6">
                                        <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">
                                          Integrations
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                          {step.integrations.map((integration, idx) => (
                                            <Badge key={idx} variant="outline" className="px-3 py-1">
                                              {integration}
                                            </Badge>
                                          ))}
                                        </div>
                                        <p className="text-sm text-slate-600">
                                          This step uses the integrations listed above. You can modify integration
                                          settings in the main integrations page.
                                        </p>
                                      </div>

                                      {/* Action Buttons */}
                                      <div className="flex items-center justify-end gap-4 pt-6 border-t">
                                        <Button variant="outline" onClick={() => setEditingStep(null)} className="px-6">
                                          Cancel
                                        </Button>
                                        <Button
                                          onClick={saveStepSettings}
                                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6"
                                        >
                                          <Save className="w-4 h-4 mr-2" />
                                          Save Changes
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div className="text-center p-3 bg-blue-50/50 rounded-lg">
                              <div className="text-sm font-bold text-blue-600">{step.avgDuration}</div>
                              <div className="text-xs text-slate-600">Avg Duration</div>
                            </div>
                            <div className="text-center p-3 bg-green-50/50 rounded-lg">
                              <div className="text-sm font-bold text-green-600">{step.successRate}%</div>
                              <div className="text-xs text-slate-600">Success Rate</div>
                            </div>
                            <div className="text-center p-3 bg-purple-50/50 rounded-lg">
                              <div className="text-sm font-bold text-purple-600">{step.timeout}s</div>
                              <div className="text-xs text-slate-600">Timeout</div>
                            </div>
                            <div className="text-center p-3 bg-orange-50/50 rounded-lg">
                              <div className="text-sm font-bold text-orange-600">{step.retryAttempts}</div>
                              <div className="text-xs text-slate-600">Max Retries</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-600">Integrations:</span>
                              <div className="flex gap-1">
                                {step.integrations.map((integration, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs px-2 py-0">
                                    {integration}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-slate-500">
                              On Success: {step.conditions.onSuccess} • On Failure: {step.conditions.onFailure}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="logs" className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-green-600" />
                      Workflow Logs
                    </CardTitle>
                    <CardDescription>Real-time execution logs and debugging information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                      <div>[2024-01-25 14:32:15] INFO: Workflow started - {workflow.name}</div>
                      <div>[2024-01-25 14:32:16] INFO: Step 1: Code Analysis - Starting</div>
                      <div>[2024-01-25 14:32:17] INFO: GitLab integration connected</div>
                      <div>[2024-01-25 14:32:18] INFO: SonarQube scan initiated</div>
                      <div>[2024-01-25 14:32:19] INFO: Code quality score: 8.5/10</div>
                      <div>[2024-01-25 14:32:20] INFO: Step 1: Code Analysis - Completed (3m 15s)</div>
                      <div>[2024-01-25 14:32:21] INFO: Step 2: Build Process - Starting</div>
                      <div>[2024-01-25 14:32:22] INFO: Docker build initiated</div>
                      <div>[2024-01-25 14:32:23] INFO: Build artifacts created successfully</div>
                      <div>[2024-01-25 14:32:24] INFO: Step 2: Build Process - Completed (8m 45s)</div>
                      <div>[2024-01-25 14:32:25] INFO: Step 3: Code Review - Starting</div>
                      <div>[2024-01-25 14:32:26] INFO: Automated review checks passed</div>
                      <div>[2024-01-25 14:32:27] INFO: Manual review assigned to senior developer</div>
                      <div>[2024-01-25 14:32:28] INFO: Step 3: Code Review - Completed (12m 30s)</div>
                      <div>[2024-01-25 14:32:29] INFO: Workflow execution completed successfully</div>
                      <div>[2024-01-25 14:32:30] INFO: Total execution time: 45m 20s</div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Workflow Settings</h2>
                    <p className="text-slate-600">Configure workflow behavior, scheduling, and execution parameters</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={resetSettings}
                      className="hover:bg-slate-100 transition-colors duration-200 bg-transparent"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset to Default
                    </Button>
                    <Button
                      onClick={saveSettings}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* General Settings */}
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        General Settings
                      </CardTitle>
                      <CardDescription>Basic workflow configuration and behavior</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="workflow-name">Workflow Name</Label>
                        <Input
                          id="workflow-name"
                          value={workflowSettings.name}
                          onChange={(e) => setWorkflowSettings({ ...workflowSettings, name: e.target.value })}
                          placeholder="Enter workflow name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="workflow-description">Description</Label>
                        <Textarea
                          id="workflow-description"
                          value={workflowSettings.description}
                          onChange={(e) => setWorkflowSettings({ ...workflowSettings, description: e.target.value })}
                          placeholder="Describe what this workflow does"
                          className="mt-1"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={workflowSettings.category}
                          onValueChange={(value) => setWorkflowSettings({ ...workflowSettings, category: value })}
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
                          <Label htmlFor="enabled">Enable Workflow</Label>
                          <p className="text-sm text-slate-600">Allow this workflow to be executed</p>
                        </div>
                        <Switch
                          id="enabled"
                          checked={workflowSettings.enabled}
                          onCheckedChange={(checked) => setWorkflowSettings({ ...workflowSettings, enabled: checked })}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Schedule Settings */}
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Timer className="w-5 h-5 text-purple-600" />
                        Schedule Settings
                      </CardTitle>
                      <CardDescription>Configure when and how often the workflow runs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="schedule-type">Schedule Type</Label>
                        <Select
                          value={workflowSettings.schedule.type}
                          onValueChange={(value) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              schedule: { ...workflowSettings.schedule, type: value },
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
                      {workflowSettings.schedule.type === "interval" && (
                        <div>
                          <Label htmlFor="interval">Interval (minutes)</Label>
                          <Input
                            id="interval"
                            type="number"
                            value={workflowSettings.schedule.interval}
                            onChange={(e) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                schedule: { ...workflowSettings.schedule, interval: Number.parseInt(e.target.value) },
                              })
                            }
                            placeholder="60"
                            className="mt-1"
                          />
                        </div>
                      )}
                      {workflowSettings.schedule.type === "cron" && (
                        <div>
                          <Label htmlFor="cron">Cron Expression</Label>
                          <Input
                            id="cron"
                            value={workflowSettings.schedule.cronExpression}
                            onChange={(e) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                schedule: { ...workflowSettings.schedule, cronExpression: e.target.value },
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
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-orange-600" />
                        Execution Settings
                      </CardTitle>
                      <CardDescription>Configure execution limits and behavior</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="timeout">Timeout (seconds)</Label>
                        <Input
                          id="timeout"
                          type="number"
                          value={workflowSettings.execution.timeout}
                          onChange={(e) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              execution: { ...workflowSettings.execution, timeout: Number.parseInt(e.target.value) },
                            })
                          }
                          placeholder="1800"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="retry-attempts">Retry Attempts</Label>
                        <Input
                          id="retry-attempts"
                          type="number"
                          value={workflowSettings.execution.retryAttempts}
                          onChange={(e) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              execution: {
                                ...workflowSettings.execution,
                                retryAttempts: Number.parseInt(e.target.value),
                              },
                            })
                          }
                          placeholder="3"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="retry-delay">Retry Delay (seconds)</Label>
                        <Input
                          id="retry-delay"
                          type="number"
                          value={workflowSettings.execution.retryDelay}
                          onChange={(e) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              execution: { ...workflowSettings.execution, retryDelay: Number.parseInt(e.target.value) },
                            })
                          }
                          placeholder="60"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="max-concurrent">Max Concurrent Runs</Label>
                        <Input
                          id="max-concurrent"
                          type="number"
                          value={workflowSettings.execution.maxConcurrentRuns}
                          onChange={(e) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              execution: {
                                ...workflowSettings.execution,
                                maxConcurrentRuns: Number.parseInt(e.target.value),
                              },
                            })
                          }
                          placeholder="1"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={workflowSettings.execution.priority}
                          onValueChange={(value) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              execution: { ...workflowSettings.execution, priority: value },
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
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
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
                          value={workflowSettings.notifications.email}
                          onChange={(e) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              notifications: { ...workflowSettings.notifications, email: e.target.value },
                            })
                          }
                          placeholder="admin@mobven.com"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          type="url"
                          value={workflowSettings.notifications.webhookUrl}
                          onChange={(e) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              notifications: { ...workflowSettings.notifications, webhookUrl: e.target.value },
                            })
                          }
                          placeholder="https://hooks.slack.com/..."
                          className="mt-1"
                        />
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Notify on Success</Label>
                            <p className="text-sm text-slate-600">
                              Send notifications when workflow completes successfully
                            </p>
                          </div>
                          <Switch
                            checked={workflowSettings.notifications.onSuccess}
                            onCheckedChange={(checked) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                notifications: { ...workflowSettings.notifications, onSuccess: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Notify on Failure</Label>
                            <p className="text-sm text-slate-600">Send notifications when workflow fails</p>
                          </div>
                          <Switch
                            checked={workflowSettings.notifications.onFailure}
                            onCheckedChange={(checked) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                notifications: { ...workflowSettings.notifications, onFailure: checked },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Notify on Timeout</Label>
                            <p className="text-sm text-slate-600">Send notifications when workflow times out</p>
                          </div>
                          <Switch
                            checked={workflowSettings.notifications.onTimeout}
                            onCheckedChange={(checked) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                notifications: { ...workflowSettings.notifications, onTimeout: checked },
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
                            checked={workflowSettings.notifications.slack}
                            onCheckedChange={(checked) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                notifications: { ...workflowSettings.notifications, slack: checked },
                              })
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Security Settings */}
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
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
                          <p className="text-sm text-slate-600">Require manual approval before workflow execution</p>
                        </div>
                        <Switch
                          checked={workflowSettings.security.requireApproval}
                          onCheckedChange={(checked) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              security: { ...workflowSettings.security, requireApproval: checked },
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
                          checked={workflowSettings.security.encryptLogs}
                          onCheckedChange={(checked) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              security: { ...workflowSettings.security, encryptLogs: checked },
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
                          checked={workflowSettings.security.auditTrail}
                          onCheckedChange={(checked) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              security: { ...workflowSettings.security, auditTrail: checked },
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Performance Settings */}
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-indigo-600" />
                        Performance Settings
                      </CardTitle>
                      <CardDescription>Configure monitoring and resource limits</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="log-level">Log Level</Label>
                        <Select
                          value={workflowSettings.performance.logLevel}
                          onValueChange={(value) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              performance: { ...workflowSettings.performance, logLevel: value },
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
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Enable Metrics</Label>
                          <p className="text-sm text-slate-600">Collect detailed performance metrics</p>
                        </div>
                        <Switch
                          checked={workflowSettings.performance.enableMetrics}
                          onCheckedChange={(checked) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              performance: { ...workflowSettings.performance, enableMetrics: checked },
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Enable Profiling</Label>
                          <p className="text-sm text-slate-600">Enable detailed performance profiling</p>
                        </div>
                        <Switch
                          checked={workflowSettings.performance.enableProfiling}
                          onCheckedChange={(checked) =>
                            setWorkflowSettings({
                              ...workflowSettings,
                              performance: { ...workflowSettings.performance, enableProfiling: checked },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-4">
                        <h4 className="font-medium text-slate-900">Resource Limits</h4>
                        <div>
                          <Label htmlFor="cpu-limit">CPU Limit (%)</Label>
                          <Input
                            id="cpu-limit"
                            type="number"
                            value={workflowSettings.performance.resourceLimits.cpu}
                            onChange={(e) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                performance: {
                                  ...workflowSettings.performance,
                                  resourceLimits: {
                                    ...workflowSettings.performance.resourceLimits,
                                    cpu: Number.parseInt(e.target.value),
                                  },
                                },
                              })
                            }
                            placeholder="80"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="memory-limit">Memory Limit (MB)</Label>
                          <Input
                            id="memory-limit"
                            type="number"
                            value={workflowSettings.performance.resourceLimits.memory}
                            onChange={(e) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                performance: {
                                  ...workflowSettings.performance,
                                  resourceLimits: {
                                    ...workflowSettings.performance.resourceLimits,
                                    memory: Number.parseInt(e.target.value),
                                  },
                                },
                              })
                            }
                            placeholder="4096"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="disk-limit">Disk Limit (MB)</Label>
                          <Input
                            id="disk-limit"
                            type="number"
                            value={workflowSettings.performance.resourceLimits.disk}
                            onChange={(e) =>
                              setWorkflowSettings({
                                ...workflowSettings,
                                performance: {
                                  ...workflowSettings.performance,
                                  resourceLimits: {
                                    ...workflowSettings.performance.resourceLimits,
                                    disk: Number.parseInt(e.target.value),
                                  },
                                },
                              })
                            }
                            placeholder="20480"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Danger Zone */}
                  <Card className="border-0 shadow-xl bg-red-50/50 backdrop-blur-sm rounded-2xl border-red-200 hover:shadow-2xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-red-600 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        Danger Zone
                      </CardTitle>
                      <CardDescription>Irreversible actions for this workflow</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white/50">
                        <div>
                          <h4 className="font-medium text-red-600">Reset Workflow</h4>
                          <p className="text-sm text-slate-600">
                            Reset workflow to factory defaults, losing all configuration
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Reset
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-white/50">
                        <div>
                          <h4 className="font-medium text-red-600">Delete Workflow</h4>
                          <p className="text-sm text-slate-600">Permanently delete this workflow and all its data</p>
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
      </div>
    </AuthGuard>
  )
}
