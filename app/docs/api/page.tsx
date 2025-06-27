import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wand2, Code, Key, Shield, Zap, ArrowRight, Copy } from "lucide-react"
import Link from "next/link"

export default function APIReferencePage() {
  const endpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/agents",
      description: "Create a new AI agent",
      parameters: ["name", "type", "configuration"],
    },
    {
      method: "GET",
      endpoint: "/api/v1/agents",
      description: "List all agents",
      parameters: ["limit", "offset", "filter"],
    },
    {
      method: "GET",
      endpoint: "/api/v1/agents/{id}",
      description: "Get agent details",
      parameters: ["id"],
    },
    {
      method: "PUT",
      endpoint: "/api/v1/agents/{id}",
      description: "Update an agent",
      parameters: ["id", "configuration"],
    },
    {
      method: "DELETE",
      endpoint: "/api/v1/agents/{id}",
      description: "Delete an agent",
      parameters: ["id"],
    },
    {
      method: "POST",
      endpoint: "/api/v1/agents/{id}/execute",
      description: "Execute an agent",
      parameters: ["id", "input", "context"],
    },
  ]

  const sdks = [
    {
      language: "Python",
      description: "Official Python SDK for Orchestra",
      installation: "pip install orchestra-python",
      example: `from orchestra import Orchestra

client = Orchestra(api_key="your_api_key")
agent = client.agents.create(
    name="Customer Support Bot",
    type="conversational"
)`,
    },
    {
      language: "Node.js",
      description: "Official Node.js SDK for Orchestra",
      installation: "npm install orchestra-node",
      example: `const Orchestra = require('orchestra-node');

const client = new Orchestra({
  apiKey: 'your_api_key'
});

const agent = await client.agents.create({
  name: 'Customer Support Bot',
  type: 'conversational'
});`,
    },
    {
      language: "Go",
      description: "Official Go SDK for Orchestra",
      installation: "go get github.com/orchestra/go-sdk",
      example: `package main

import "github.com/orchestra/go-sdk"

func main() {
    client := orchestra.NewClient("your_api_key")
    agent, err := client.Agents.Create(&orchestra.AgentRequest{
        Name: "Customer Support Bot",
        Type: "conversational",
    })
}`,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-stripe-primary rounded-xl flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Orchestra</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/features" className="nav-link-stripe">
              Features
            </Link>
            <Link href="/pricing" className="nav-link-stripe">
              Solutions
            </Link>
            <Link href="/docs" className="nav-link-stripe text-purple-600">
              Documentation
            </Link>
            <Link href="/contact" className="nav-link-stripe">
              Contact
            </Link>
          </nav>
          <Button className="btn-stripe-primary" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </header>

      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm" style={{ color: "#6b7c93" }}>
              <Link href="/docs" className="hover:text-purple-600">
                Documentation
              </Link>
              <span>/</span>
              <span style={{ color: "#425466" }}>API Reference</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <Badge className="badge-stripe mb-4">
              <Code className="w-4 h-4 mr-2" />
              API Documentation
            </Badge>
            <h1 className="section-title-stripe">API Reference</h1>
            <p className="section-subtitle-stripe">
              Complete REST API documentation for integrating Orchestra into your applications. Build powerful AI agents
              programmatically.
            </p>
          </div>

          {/* Authentication */}
          <Card className="stripe-card mb-12">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle style={{ color: "#0a2540" }}>Authentication</CardTitle>
                  <CardDescription>Secure your API requests with API keys</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <code className="text-sm" style={{ color: "#425466" }}>
                  Authorization: Bearer YOUR_API_KEY
                </code>
                <Button variant="ghost" size="sm" className="ml-2">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p style={{ color: "#425466" }}>
                Include your API key in the Authorization header of every request. You can find your API key in your
                dashboard settings.
              </p>
            </CardContent>
          </Card>

          {/* Endpoints */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#0a2540" }}>
              API Endpoints
            </h2>
            <div className="space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card key={index} className="stripe-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Badge
                          className={`${
                            endpoint.method === "GET"
                              ? "bg-blue-100 text-blue-700"
                              : endpoint.method === "POST"
                                ? "bg-green-100 text-green-700"
                                : endpoint.method === "PUT"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-lg font-mono" style={{ color: "#0a2540" }}>
                          {endpoint.endpoint}
                        </code>
                      </div>
                    </div>
                    <p className="mb-4" style={{ color: "#425466" }}>
                      {endpoint.description}
                    </p>
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                        Parameters:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {endpoint.parameters.map((param, paramIndex) => (
                          <code
                            key={paramIndex}
                            className="px-2 py-1 bg-gray-100 rounded text-sm"
                            style={{ color: "#425466" }}
                          >
                            {param}
                          </code>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* SDKs */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#0a2540" }}>
              Official SDKs
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {sdks.map((sdk, index) => (
                <Card key={index} className="stripe-card">
                  <CardHeader>
                    <CardTitle style={{ color: "#0a2540" }}>{sdk.language}</CardTitle>
                    <CardDescription>{sdk.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                        Installation:
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <code className="text-sm" style={{ color: "#425466" }}>
                          {sdk.installation}
                        </code>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                        Example:
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <pre className="text-xs overflow-x-auto" style={{ color: "#425466" }}>
                          {sdk.example}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Rate Limits */}
          <Card className="stripe-card mb-12">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle style={{ color: "#0a2540" }}>Rate Limits</CardTitle>
                  <CardDescription>API usage limits and best practices</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: "#635bff" }}>
                    1,000
                  </div>
                  <div className="text-sm" style={{ color: "#425466" }}>
                    Requests per hour
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: "#635bff" }}>
                    100
                  </div>
                  <div className="text-sm" style={{ color: "#425466" }}>
                    Concurrent requests
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2" style={{ color: "#635bff" }}>
                    10MB
                  </div>
                  <div className="text-sm" style={{ color: "#425466" }}>
                    Max payload size
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="stripe-card">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4" style={{ color: "#635bff" }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#0a2540" }}>
                Need Help with the API?
              </h3>
              <p className="mb-6" style={{ color: "#425466" }}>
                Our developer support team is here to help you integrate Orchestra into your applications. Get expert
                assistance with implementation, troubleshooting, and optimization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-stripe-primary" asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs/getting-started">
                    Getting Started <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
