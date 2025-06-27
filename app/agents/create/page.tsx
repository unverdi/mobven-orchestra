"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Bot,
  ArrowLeft,
  Upload,
  FileText,
  Zap,
  Settings,
  Brain,
  Users,
  Building2,
  MessageSquare,
  Calendar,
  Mail,
  Slack,
  Database,
  Code,
  Play,
  Save,
} from "lucide-react"
import Link from "next/link"

export default function CreateAgentPage() {
  const [agentName, setAgentName] = useState("")
  const [agentDescription, setAgentDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])

  const categories = [
    { value: "hr", label: "Human Resources", icon: Users },
    { value: "operations", label: "Operations", icon: Building2 },
    { value: "support", label: "Customer Support", icon: MessageSquare },
    { value: "sales", label: "Sales & Marketing", icon: Zap },
    { value: "finance", label: "Finance & Legal", icon: FileText },
    { value: "it", label: "IT & Security", icon: Settings },
  ]

  const integrations = [
    { id: "slack", name: "Slack", icon: Slack, description: "Team communication" },
    { id: "email", name: "Email", icon: Mail, description: "Email automation" },
    { id: "calendar", name: "Calendar", icon: Calendar, description: "Meeting scheduling" },
    { id: "database", name: "Database", icon: Database, description: "Data access" },
    { id: "api", name: "Custom API", icon: Code, description: "External services" },
  ]

  const templates = [
    {
      id: "onboarding",
      name: "Employee Onboarding",
      description: "Automate new hire paperwork, training schedules, and welcome processes",
      category: "hr",
      estimatedTime: "30 minutes",
    },
    {
      id: "performance",
      name: "Performance Review Manager",
      description: "Schedule reviews, send reminders, and collect feedback automatically",
      category: "hr",
      estimatedTime: "45 minutes",
    },
    {
      id: "interview",
      name: "Interview Coordinator",
      description: "Manage candidate scheduling, feedback collection, and follow-ups",
      category: "hr",
      estimatedTime: "25 minutes",
    },
    {
      id: "support",
      name: "Customer Support Bot",
      description: "Handle common queries, route tickets, and escalate complex issues",
      category: "support",
      estimatedTime: "40 minutes",
    },
    {
      id: "vendor",
      name: "Vendor Management",
      description: "Automate vendor communications, contract renewals, and payments",
      category: "operations",
      estimatedTime: "35 minutes",
    },
    {
      id: "invoice",
      name: "Invoice Processing",
      description: "Automate invoice approval workflows and payment processing",
      category: "finance",
      estimatedTime: "20 minutes",
    },
  ]

  const handleIntegrationToggle = (integrationId: string) => {
    setSelectedIntegrations((prev) =>
      prev.includes(integrationId) ? prev.filter((id) => id !== integrationId) : [...prev, integrationId],
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Create AI Orchestra</h1>
                <p className="text-slate-600">Design a custom AI Orchestra for your business processes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Deploy Orchestra
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="template" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="template">Choose Template</TabsTrigger>
              <TabsTrigger value="configure">Configure</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            {/* Template Selection */}
            <TabsContent value="template" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Start with a Template</CardTitle>
                  <CardDescription>Choose from pre-built templates or start from scratch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="cursor-pointer hover:border-blue-300 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h3 className="font-medium text-slate-900">{template.name}</h3>
                                <Badge variant="secondary" className="text-xs">
                                  {categories.find((c) => c.value === template.category)?.label}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-xs text-slate-500">{template.estimatedTime}</span>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                          <Button size="sm" className="w-full">
                            Use Template
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <Card className="border-dashed">
                      <CardContent className="p-6 text-center">
                        <Brain className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h3 className="font-medium text-slate-900 mb-2">Start from Scratch</h3>
                        <p className="text-sm text-slate-600 mb-4">
                          Build a completely custom agent tailored to your specific needs
                        </p>
                        <Button variant="outline">Create Custom Agent</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Configuration */}
            <TabsContent value="configure" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Define your agent's core properties</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Agent Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., HR Onboarding Assistant"
                        value={agentName}
                        onChange={(e) => setAgentName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe what this agent does and how it helps your business..."
                        value={agentDescription}
                        onChange={(e) => setAgentDescription(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <category.icon className="w-4 h-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Agent Behavior</CardTitle>
                    <CardDescription>Configure how your agent operates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="personality">Personality & Tone</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Primary Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="escalation">Escalation Rules</Label>
                      <Textarea
                        id="escalation"
                        placeholder="Define when and how the agent should escalate to humans..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Knowledge Base */}
            <TabsContent value="knowledge" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Knowledge Base</CardTitle>
                  <CardDescription>Upload documents and data sources for your agent to learn from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* File Upload */}
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="font-medium text-slate-900 mb-2">Upload Documents</h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Upload PDFs, Word docs, spreadsheets, and other files
                      </p>
                      <Button>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                      </Button>
                    </div>

                    {/* Data Sources */}
                    <div>
                      <h3 className="font-medium text-slate-900 mb-4">Connect Data Sources</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card className="cursor-pointer hover:border-blue-300 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Database className="w-8 h-8 text-blue-600" />
                              <div>
                                <h4 className="font-medium">Company Database</h4>
                                <p className="text-sm text-slate-600">Connect to your internal database</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="cursor-pointer hover:border-blue-300 transition-colors">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <FileText className="w-8 h-8 text-green-600" />
                              <div>
                                <h4 className="font-medium">SharePoint</h4>
                                <p className="text-sm text-slate-600">Access SharePoint documents</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Training Instructions */}
                    <div>
                      <Label htmlFor="instructions">Custom Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Provide specific instructions on how the agent should behave, what information to prioritize, and any special rules..."
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Integrations */}
            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Connect Integrations</CardTitle>
                  <CardDescription>Choose which tools and services your agent can interact with</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {integrations.map((integration) => (
                      <Card key={integration.id} className="cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <integration.icon className="w-8 h-8 text-slate-600" />
                              <div>
                                <h4 className="font-medium">{integration.name}</h4>
                                <p className="text-sm text-slate-600">{integration.description}</p>
                              </div>
                            </div>
                            <Checkbox
                              checked={selectedIntegrations.includes(integration.id)}
                              onCheckedChange={() => handleIntegrationToggle(integration.id)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium text-slate-900 mb-4">Custom Integrations</h3>
                    <Card className="border-dashed">
                      <CardContent className="p-6 text-center">
                        <Code className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                        <h4 className="font-medium text-slate-900 mb-2">Add Custom Integration</h4>
                        <p className="text-sm text-slate-600 mb-4">
                          Connect to any API or service using webhooks and custom code
                        </p>
                        <Button variant="outline">Add Custom Integration</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
