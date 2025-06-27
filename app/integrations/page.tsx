"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AuthGuard } from "@/components/auth-guard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Github,
  Slack,
  Database,
  Mail,
  Calendar,
  FileText,
  Cloud,
  Zap,
  LinkIcon,
  Trash2,
  Eye,
  EyeOff,
  MessageSquare,
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  status: "connected" | "disconnected" | "error" | "pending"
  icon: any
  color: string
  connectedAt?: string
  lastSync?: string
  version?: string
  settings?: {
    apiKey?: string
    webhookUrl?: string
    syncInterval?: number
    enabled?: boolean
  }
}

const integrations: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    description: "Connect your repositories for automated code reviews and deployments",
    category: "Development",
    status: "connected",
    icon: Github,
    color: "bg-gray-900",
    connectedAt: "2024-01-15",
    lastSync: "2024-01-20 14:30",
    version: "v2.1.0",
    settings: {
      apiKey: "ghp_xxxxxxxxxxxx",
      webhookUrl: "https://api.orchestra.dev/webhooks/github",
      syncInterval: 15,
      enabled: true,
    },
  },
  {
    id: "slack",
    name: "Slack",
    description: "Send real-time notifications and workflow updates to your team channels",
    category: "Communication",
    status: "connected",
    icon: Slack,
    color: "bg-purple-600",
    connectedAt: "2024-01-10",
    lastSync: "2024-01-20 15:45",
    version: "v1.8.2",
    settings: {
      webhookUrl: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
      enabled: true,
    },
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    description: "Connect to your PostgreSQL database for data workflows and analytics",
    category: "Database",
    status: "connected",
    icon: Database,
    color: "bg-blue-600",
    connectedAt: "2024-01-12",
    lastSync: "2024-01-20 16:00",
    version: "v14.0",
    settings: {
      enabled: true,
      syncInterval: 30,
    },
  },
  {
    id: "gmail",
    name: "Gmail",
    description: "Send automated emails and notifications through Gmail SMTP",
    category: "Communication",
    status: "error",
    icon: Mail,
    color: "bg-red-600",
    connectedAt: "2024-01-08",
    lastSync: "2024-01-19 10:15",
    version: "v1.5.0",
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Schedule workflow events and manage automated calendar entries",
    category: "Productivity",
    status: "disconnected",
    icon: Calendar,
    color: "bg-green-600",
  },
  {
    id: "notion",
    name: "Notion",
    description: "Sync workflow data with your Notion workspace and databases",
    category: "Productivity",
    status: "pending",
    icon: FileText,
    color: "bg-gray-800",
  },
  {
    id: "aws",
    name: "AWS",
    description: "Deploy and manage cloud resources through AWS services",
    category: "Cloud",
    status: "disconnected",
    icon: Cloud,
    color: "bg-orange-500",
  },
  {
    id: "zapier",
    name: "Zapier",
    description: "Connect with 5000+ apps through Zapier's automation platform",
    category: "Automation",
    status: "disconnected",
    icon: Zap,
    color: "bg-orange-600",
  },
  {
    id: "jira",
    name: "Jira",
    description: "Integrate with Atlassian Jira for issue tracking and project management",
    category: "Development",
    status: "disconnected",
    icon: FileText,
    color: "bg-blue-700",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    description: "Deploy and manage applications on Microsoft Azure cloud platform",
    category: "Cloud",
    status: "disconnected",
    icon: Cloud,
    color: "bg-blue-500",
  },
  {
    id: "teams",
    name: "Microsoft Teams",
    description: "Send notifications and updates to Microsoft Teams channels",
    category: "Communication",
    status: "disconnected",
    icon: MessageSquare,
    color: "bg-purple-700",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    description: "Connect to MongoDB databases for document-based data workflows",
    category: "Database",
    status: "disconnected",
    icon: Database,
    color: "bg-green-700",
  },
]

const categories = ["All", "Development", "Communication", "Database", "Productivity", "Cloud", "Automation"]

export default function IntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)
  const [localIntegrations, setLocalIntegrations] = useState<Integration[]>(integrations)

  useEffect(() => {
    // Load integrations from localStorage
    const saved = localStorage.getItem("orchestra_integrations")
    if (saved) {
      try {
        setLocalIntegrations(JSON.parse(saved))
      } catch (error) {
        console.error("Failed to load integrations:", error)
      }
    }
  }, [])

  const saveIntegrations = (updatedIntegrations: Integration[]) => {
    setLocalIntegrations(updatedIntegrations)
    localStorage.setItem("orchestra_integrations", JSON.stringify(updatedIntegrations))
  }

  const filteredIntegrations = localIntegrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: "bg-green-100 text-green-800",
      disconnected: "bg-gray-100 text-gray-800",
      error: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
    }
    return variants[status as keyof typeof variants] || variants.disconnected
  }

  const handleConnect = (integration: Integration) => {
    const updated = localIntegrations.map((int) =>
      int.id === integration.id
        ? {
            ...int,
            status: "connected" as const,
            connectedAt: new Date().toISOString().split("T")[0],
            lastSync: new Date().toLocaleString(),
          }
        : int,
    )
    saveIntegrations(updated)
  }

  const handleDisconnect = (integration: Integration) => {
    const updated = localIntegrations.map((int) =>
      int.id === integration.id ? { ...int, status: "disconnected" as const } : int,
    )
    saveIntegrations(updated)
  }

  const handleToggleEnabled = (integration: Integration, enabled: boolean) => {
    const updated = localIntegrations.map((int) =>
      int.id === integration.id
        ? {
            ...int,
            settings: { ...int.settings, enabled },
          }
        : int,
    )
    saveIntegrations(updated)
  }

  const connectedCount = localIntegrations.filter((i) => i.status === "connected").length
  const errorCount = localIntegrations.filter((i) => i.status === "error").length

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 animate-in fade-in duration-500">
        <Header />

        <div className="container mx-auto px-4 py-8 animate-in slide-in-from-bottom-4 duration-700">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="animate-in slide-in-from-left-6 duration-500">
                <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
                <p className="text-gray-600 mt-2">
                  Connect Orchestra with your favorite tools and services to automate workflows across your entire tech
                  stack
                </p>
              </div>
              <div className="animate-in slide-in-from-right-6 duration-500">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                  <Plus className="w-4 h-4 mr-2" />
                  Browse Marketplace
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl animate-in slide-in-from-bottom-4 duration-500 delay-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Connected Integrations</p>
                      <p className="text-2xl font-bold text-green-600">{connectedCount}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl animate-in slide-in-from-bottom-4 duration-500 delay-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Available Integrations</p>
                      <p className="text-2xl font-bold text-blue-600">{localIntegrations.length}</p>
                    </div>
                    <LinkIcon className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl animate-in slide-in-from-bottom-4 duration-500 delay-300 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Issues Detected</p>
                      <p className="text-2xl font-bold text-red-600">{errorCount}</p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-400">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search integrations by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 transition-all duration-300 focus:bg-white focus:shadow-md"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap transition-all duration-300 hover:scale-105"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Integrations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration, index) => {
              const IconComponent = integration.icon
              return (
                <Card
                  key={integration.id}
                  className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl ${integration.color} flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-bold">{integration.name}</CardTitle>
                          <Badge className={`text-xs ${getStatusBadge(integration.status)} mt-1`}>
                            {integration.status}
                          </Badge>
                        </div>
                      </div>
                      {getStatusIcon(integration.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="mb-4 text-slate-600">{integration.description}</CardDescription>

                    {integration.status === "connected" && (
                      <div className="text-xs text-gray-500 mb-4 space-y-1 bg-slate-50/50 p-3 rounded-xl">
                        <p>
                          <span className="font-medium">Connected:</span> {integration.connectedAt}
                        </p>
                        <p>
                          <span className="font-medium">Last sync:</span> {integration.lastSync}
                        </p>
                        {integration.version && (
                          <p>
                            <span className="font-medium">Version:</span> {integration.version}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2">
                      {integration.status === "connected" ? (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 transition-all duration-300 hover:scale-105"
                              >
                                <Settings className="w-4 h-4 mr-1" />
                                Configure
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl bg-white shadow-2xl border-0 rounded-3xl z-[100]">
                              <DialogHeader className="border-b border-slate-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 -m-6 p-6 mb-6 rounded-t-3xl">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`w-12 h-12 rounded-2xl ${integration.color} flex items-center justify-center shadow-lg`}
                                  >
                                    <IconComponent className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <DialogTitle className="text-xl font-bold">{integration.name} Settings</DialogTitle>
                                    <DialogDescription>
                                      Configure your integration settings and preferences
                                    </DialogDescription>
                                  </div>
                                </div>
                              </DialogHeader>
                              <div className="p-6 space-y-6 bg-white">
                                <Tabs defaultValue="general" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="general">General</TabsTrigger>
                                    <TabsTrigger value="authentication">Authentication</TabsTrigger>
                                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                                  </TabsList>

                                  <TabsContent value="general" className="space-y-6 mt-6">
                                    <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl">
                                      <div>
                                        <Label htmlFor="enabled" className="text-base font-medium">
                                          Enable Integration
                                        </Label>
                                        <p className="text-sm text-gray-600 mt-1">
                                          Turn this integration on or off for all workflows
                                        </p>
                                      </div>
                                      <Switch
                                        id="enabled"
                                        checked={integration.settings?.enabled ?? true}
                                        onCheckedChange={(enabled) => handleToggleEnabled(integration, enabled)}
                                      />
                                    </div>

                                    {integration.settings?.syncInterval && (
                                      <div className="space-y-2">
                                        <Label htmlFor="sync-interval" className="text-base font-medium">
                                          Sync Interval (minutes)
                                        </Label>
                                        <Input
                                          id="sync-interval"
                                          type="number"
                                          defaultValue={integration.settings.syncInterval}
                                          className="bg-white"
                                          placeholder="Enter sync interval in minutes"
                                        />
                                        <p className="text-sm text-gray-600">
                                          How often to sync data with this integration
                                        </p>
                                      </div>
                                    )}
                                  </TabsContent>

                                  <TabsContent value="authentication" className="space-y-6 mt-6">
                                    {integration.settings?.apiKey && (
                                      <div className="space-y-2">
                                        <Label htmlFor="api-key" className="text-base font-medium">
                                          API Key
                                        </Label>
                                        <div className="flex gap-2">
                                          <Input
                                            id="api-key"
                                            type={showApiKey ? "text" : "password"}
                                            defaultValue={integration.settings.apiKey}
                                            className="flex-1 bg-white"
                                            placeholder="Enter your API key"
                                          />
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowApiKey(!showApiKey)}
                                            className="px-3"
                                          >
                                            {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                          </Button>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                          Your API key is encrypted and stored securely
                                        </p>
                                      </div>
                                    )}

                                    {integration.settings?.webhookUrl && (
                                      <div className="space-y-2">
                                        <Label htmlFor="webhook-url" className="text-base font-medium">
                                          Webhook URL
                                        </Label>
                                        <Input
                                          id="webhook-url"
                                          defaultValue={integration.settings.webhookUrl}
                                          className="bg-white"
                                          placeholder="https://your-webhook-url.com"
                                        />
                                        <p className="text-sm text-gray-600">URL where webhook events will be sent</p>
                                      </div>
                                    )}
                                  </TabsContent>

                                  <TabsContent value="advanced" className="space-y-6 mt-6">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="p-4 bg-slate-50/50 rounded-xl">
                                        <Label className="text-base font-medium">Connection Status</Label>
                                        <div className="flex items-center gap-2 mt-2">
                                          {getStatusIcon(integration.status)}
                                          <span className="capitalize font-medium">{integration.status}</span>
                                        </div>
                                      </div>

                                      <div className="p-4 bg-slate-50/50 rounded-xl">
                                        <Label className="text-base font-medium">Last Sync</Label>
                                        <p className="text-sm text-gray-600 mt-2">
                                          {integration.lastSync || "Never synced"}
                                        </p>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>

                                <div className="flex justify-end gap-3 pt-6 border-t border-slate-200/50">
                                  <Button variant="outline">Cancel</Button>
                                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(integration)}
                            className="transition-all duration-300 hover:scale-105"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      ) : integration.status === "error" ? (
                        <>
                          <Button
                            onClick={() => handleConnect(integration)}
                            className="flex-1 bg-red-600 hover:bg-red-700 transition-all duration-300 hover:scale-105"
                          >
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Reconnect
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={() => handleConnect(integration)}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105"
                          disabled={integration.status === "pending"}
                        >
                          {integration.status === "pending" ? (
                            <>
                              <Clock className="w-4 h-4 mr-2" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredIntegrations.length === 0 && (
            <div className="text-center py-12 animate-in fade-in duration-500">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No integrations found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
