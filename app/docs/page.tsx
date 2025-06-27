import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Code, Zap, Settings, Users, Shield } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      description: "Learn the basics of Orchestra and create your first AI agent",
      icon: BookOpen,
      href: "/docs/getting-started",
      articles: ["Quick Start Guide", "Installation & Setup", "Your First Agent", "Basic Concepts"],
    },
    {
      title: "Agent Builder",
      description: "Master the art of creating intelligent AI agents",
      icon: Zap,
      href: "/docs/agent-builder",
      articles: ["Agent Architecture", "Training Your Agent", "Advanced Configurations", "Best Practices"],
    },
    {
      title: "API Reference",
      description: "Complete API documentation for developers",
      icon: Code,
      href: "/docs/api",
      articles: ["Authentication", "Endpoints", "SDKs & Libraries", "Rate Limits"],
    },
    {
      title: "Integrations",
      description: "Connect Orchestra with your favorite tools",
      icon: Settings,
      href: "/docs/integrations",
      articles: ["Slack Integration", "Microsoft Teams", "Zapier Connector", "Custom Webhooks"],
    },
    {
      title: "Team Management",
      description: "Manage users, permissions, and collaboration",
      icon: Users,
      href: "/docs/team-management",
      articles: ["User Roles", "Permissions", "Team Workspaces", "Audit Logs"],
    },
    {
      title: "Security & Compliance",
      description: "Enterprise security features and compliance",
      icon: Shield,
      href: "/docs/security",
      articles: ["Data Encryption", "SOC 2 Compliance", "GDPR Compliance", "Security Best Practices"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Documentation
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Learn Orchestra
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know to build, deploy, and manage intelligent AI agents.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button variant="outline" asChild>
            <Link href="/docs/getting-started">Quick Start</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/api">API Reference</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/docs/integrations">Integrations</Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            asChild
          >
            <Link href="/dashboard">Try Orchestra</Link>
          </Button>
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <Link href={section.href}>
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                      {section.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600">{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.articles.map((article, articleIndex) => (
                        <li
                          key={articleIndex}
                          className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                        >
                          • {article}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>

        {/* Popular Articles */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Articles</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href="/docs/getting-started" className="hover:text-blue-600 transition-colors">
                    Building Your First AI Agent
                  </Link>
                </CardTitle>
                <CardDescription>
                  A step-by-step guide to creating and deploying your first intelligent agent.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href="/docs/integrations" className="hover:text-blue-600 transition-colors">
                    Slack Integration Setup
                  </Link>
                </CardTitle>
                <CardDescription>Connect your AI agents with Slack for seamless team collaboration.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href="/docs/api" className="hover:text-blue-600 transition-colors">
                    API Authentication
                  </Link>
                </CardTitle>
                <CardDescription>Learn how to authenticate and make your first API calls.</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link href="/docs/agent-builder" className="hover:text-blue-600 transition-colors">
                    Advanced Agent Training
                  </Link>
                </CardTitle>
                <CardDescription>Master advanced techniques for training more intelligent agents.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-slate-600 mb-8">Can't find what you're looking for? Our support team is here to help.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Help Center</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
