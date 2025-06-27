"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/header"
import { AuthGuard } from "@/components/auth-guard"
import {
  CheckCircle,
  Zap,
  Activity,
  Brain,
  Send,
  Bot,
  User,
  BarChart3,
  X,
  Clock,
  Code,
  TestTube,
  Rocket,
  Shield,
} from "lucide-react"

export default function SDLCDemoPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const workflows = [
    {
      id: "code-review-automation",
      name: "Automated Code Review Pipeline",
      description: "AI-powered code review with security scanning and quality checks",
      status: "Active",
      progress: 92,
      lastRun: "15 minutes ago",
      nextRun: "On every PR",
      completedTasks: 847,
      totalTasks: 920,
      efficiency: 94,
      icon: Code,
      color: "bg-blue-500",
      results: [
        "Reviewed 23 pull requests this week",
        "Detected 8 security vulnerabilities",
        "Improved code quality score by 15%",
        "Reduced review time from 4h to 45min",
      ],
    },
    {
      id: "ci-cd-pipeline",
      name: "Continuous Integration & Deployment",
      description: "Automated testing, building, and deployment to production",
      status: "Active",
      progress: 88,
      lastRun: "2 hours ago",
      nextRun: "On code merge",
      completedTasks: 1247,
      totalTasks: 1415,
      efficiency: 96,
      icon: Rocket,
      color: "bg-green-500",
      results: [
        "Deployed 15 releases successfully",
        "99.8% deployment success rate",
        "Reduced deployment time by 60%",
        "Zero production incidents this month",
      ],
    },
    {
      id: "security-compliance",
      name: "Security & Compliance Monitoring",
      description: "Continuous security scanning and compliance validation",
      status: "Active",
      progress: 76,
      lastRun: "30 minutes ago",
      nextRun: "Every 4 hours",
      completedTasks: 456,
      totalTasks: 600,
      efficiency: 89,
      icon: Shield,
      color: "bg-red-500",
      results: [
        "Scanned 1,200+ code commits",
        "Identified 12 compliance issues",
        "Automated 85% of security checks",
        "Maintained SOC 2 compliance",
      ],
    },
  ]

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: "bot",
      message:
        "🚀 **Welcome to Orchestra SDLC Command Center!**\n\nI'm your AI-powered development workflow assistant. I can help you:\n\n**🔍 Code Quality & Reviews**\n• Automated code review with AI insights\n• Security vulnerability detection\n• Code quality metrics and improvements\n\n**🚀 CI/CD Pipeline Management**\n• Automated testing and deployment\n• Environment management\n• Release orchestration\n\n**🛡️ Security & Compliance**\n• Continuous security scanning\n• Compliance monitoring (SOC 2, GDPR)\n• Vulnerability management\n\n**📊 Development Analytics**\n• Team productivity insights\n• Code quality trends\n• Deployment success metrics\n\nWhat aspect of your SDLC would you like to optimize today?",
      timestamp: "Just now",
    },
  ])

  const integrations = [
    {
      name: "GitHub Enterprise",
      status: "Connected",
      icon: "🐙",
      lastSync: "2 minutes ago",
      activeWorkflows: 8,
      color: "bg-gray-800",
      metrics: "1,247 commits processed",
    },
    {
      name: "Jenkins",
      status: "Connected",
      icon: "🔧",
      lastSync: "5 minutes ago",
      activeWorkflows: 12,
      color: "bg-blue-600",
      metrics: "156 builds completed",
    },
    {
      name: "SonarQube",
      status: "Connected",
      icon: "📊",
      lastSync: "1 minute ago",
      activeWorkflows: 4,
      color: "bg-orange-500",
      metrics: "89% code coverage",
    },
    {
      name: "Slack DevOps",
      status: "Connected",
      icon: "💬",
      lastSync: "30 seconds ago",
      activeWorkflows: 6,
      color: "bg-purple-500",
      metrics: "234 notifications sent",
    },
    {
      name: "Jira Software",
      status: "Connected",
      icon: "🎯",
      lastSync: "3 minutes ago",
      activeWorkflows: 5,
      color: "bg-blue-700",
      metrics: "67 issues tracked",
    },
    {
      name: "Docker Registry",
      status: "Connected",
      icon: "🐳",
      lastSync: "10 minutes ago",
      activeWorkflows: 3,
      color: "bg-blue-400",
      metrics: "45 images deployed",
    },
  ]

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
        "🎯 **Excellent choice!** Let me analyze your current SDLC setup.\n\n**Current Performance Analysis:**\n\n📈 **Code Quality Metrics:**\n• Code coverage: 89.2% (↑ 5.3% this month)\n• Technical debt ratio: 12.4% (↓ 2.1%)\n• Security vulnerabilities: 3 critical, 12 medium\n\n🚀 **Deployment Statistics:**\n• Average deployment time: 12 minutes\n• Success rate: 96.8%\n• Rollback incidents: 2 this month\n\n**Recommended Optimizations:**\n1. Implement automated security scanning in PR reviews\n2. Add performance testing to CI pipeline\n3. Set up automated dependency updates\n\nWould you like me to configure any of these improvements?",
        "✨ **Great! I can see significant optimization opportunities.**\n\n**AI-Powered Workflow Suggestions:**\n\n🤖 **Smart Code Review Assistant:**\n• Automatically detect code smells and anti-patterns\n• Suggest performance optimizations\n• Enforce coding standards across teams\n\n🔄 **Intelligent CI/CD Pipeline:**\n• Dynamic test selection based on code changes\n• Parallel execution optimization\n• Smart deployment strategies (blue-green, canary)\n\n📊 **Predictive Analytics:**\n• Predict deployment risks before release\n• Identify potential bottlenecks\n• Team productivity insights\n\n**Estimated Impact:**\n• 40% faster code reviews\n• 60% reduction in deployment issues\n• 25% improvement in team velocity\n\nShall I start implementing these optimizations?",
        "🔧 **SDLC Optimization in Progress...**\n\n**Phase 1**: Enhanced Code Review Pipeline ✅\n• AI code analysis: Configured\n• Security scanning: Integrated\n• Quality gates: Activated\n\n**Phase 2**: CI/CD Pipeline Enhancement ⏳\n• Parallel test execution: 75% complete\n• Deployment automation: Configuring\n• Monitoring integration: In progress\n\n**Phase 3**: Analytics & Insights ⏳\n• Performance dashboards: Setting up\n• Predictive models: Training\n• Alert systems: Configuring\n\n**Real-time Metrics:**\n• Code quality score: 94.2/100 (↑ 8.7%)\n• Deployment frequency: 12.3 per day\n• Lead time: 2.4 hours (↓ 35%)\n• MTTR: 18 minutes (↓ 42%)\n\nYour SDLC optimization is 68% complete. The improvements are already showing measurable results!",
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

  const openChat = () => {
    setIsChatOpen(true)
  }

  const closeChat = () => {
    setIsChatOpen(false)
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-purple-50/20">
        <Header />

        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
                SDLC Command Center
              </h1>
              <p className="text-slate-600 mt-1">
                AI-powered software development lifecycle automation and optimization
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800 px-3 py-1">
                <Activity className="w-4 h-4 mr-1" />3 Active Pipelines
              </Badge>
              <Button onClick={openChat} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <Brain className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>

          {/* Active Workflows */}
          <div className="grid lg:grid-cols-3 gap-6">
            {workflows.map((workflow) => (
              <Card key={workflow.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${workflow.color} rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <workflow.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-bold text-slate-900">{workflow.name}</CardTitle>
                        <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {workflow.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-slate-600 mt-2">{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50/50 rounded-xl">
                      <div className="text-xl font-bold text-blue-600">{workflow.completedTasks}</div>
                      <div className="text-xs text-slate-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-green-50/50 rounded-xl">
                      <div className="text-xl font-bold text-green-600">{workflow.efficiency}%</div>
                      <div className="text-xs text-slate-600">Efficiency</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="text-blue-600">{workflow.progress}%</span>
                    </div>
                    <Progress value={workflow.progress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-slate-900">Recent Results:</h4>
                    {workflow.results.map((result, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-slate-600">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                        {result}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t">
                    <span>Last run: {workflow.lastRun}</span>
                    <span>Next: {workflow.nextRun}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SDLC Analytics */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Development Metrics */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Development Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">1,247</div>
                    <div className="text-xs text-slate-600">Commits This Month</div>
                  </div>
                  <div className="text-center p-4 bg-green-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">96.8%</div>
                    <div className="text-xs text-slate-600">Deployment Success</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-purple-600">2.4h</div>
                    <div className="text-xs text-slate-600">Avg Lead Time</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50/50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">18min</div>
                    <div className="text-xs text-slate-600">Mean Time to Recovery</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Code Quality Score</span>
                    <span className="text-blue-600">94.2/100</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Test Coverage</span>
                    <span className="text-green-600">89.3%</span>
                  </div>
                  <Progress value={89.3} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>Security Score</span>
                    <span className="text-purple-600">87.6%</span>
                  </div>
                  <Progress value={87.6} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Integrations Status */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Development Tools
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 ${integration.color} rounded-lg flex items-center justify-center text-white text-lg`}
                      >
                        {integration.icon}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{integration.name}</div>
                        <div className="text-xs text-slate-500">{integration.lastSync}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800 text-xs mb-1">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                      <div className="text-xs text-slate-500">{integration.metrics}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent SDLC Activity */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                Recent Development Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-green-50/50 rounded-xl">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Production deployment completed successfully</div>
                    <div className="text-sm text-slate-600">v2.4.1 deployed to production with zero downtime</div>
                  </div>
                  <div className="text-xs text-slate-500">2 hours ago</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-blue-50/50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <TestTube className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Automated test suite completed</div>
                    <div className="text-sm text-slate-600">1,247 tests passed, 0 failures, 89.3% coverage</div>
                  </div>
                  <div className="text-xs text-slate-500">3 hours ago</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-purple-50/50 rounded-xl">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Security scan completed</div>
                    <div className="text-sm text-slate-600">
                      No critical vulnerabilities found, 2 medium issues resolved
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">5 hours ago</div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-orange-50/50 rounded-xl">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Code review automation triggered</div>
                    <div className="text-sm text-slate-600">23 pull requests reviewed, 8 approved automatically</div>
                  </div>
                  <div className="text-xs text-slate-500">6 hours ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                        SDLC AI Assistant
                      </h2>
                      <p className="text-slate-600 text-sm">Optimize your development workflow with AI insights</p>
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
                    placeholder="Ask about code quality, deployments, security, or any SDLC optimization..."
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
