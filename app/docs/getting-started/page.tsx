import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wand2, ArrowRight, CheckCircle, Zap, Settings } from "lucide-react"
import Link from "next/link"

export default function GettingStartedPage() {
  const steps = [
    {
      step: "1",
      title: "Create Your Account",
      description: "Sign up for Orchestra and access your dashboard",
      details: [
        "Visit the Orchestra dashboard",
        "Create your enterprise account",
        "Verify your email address",
        "Complete your organization profile",
      ],
    },
    {
      step: "2",
      title: "Set Up Your First Workflow",
      description: "Design your initial automated workflow with Orchestra's visual editor",
      details: [
        "Explore pre-built workflow templates",
        "Define your workflow's objectives and scope",
        "Configure essential settings and permissions",
        "Simulate your workflow in test mode",
      ],
    },
    {
      step: "3",
      title: "Connect Your Systems",
      description: "Integrate Orchestra with your existing enterprise tools and data sources",
      details: [
        "Browse available integrations and connectors",
        "Configure authentication and authorization",
        "Validate data flow and system connectivity",
        "Establish monitoring and notification rules",
      ],
    },
    {
      step: "4",
      title: "Deploy and Monitor",
      description: "Launch your workflow and monitor its performance in real-time",
      details: [
        "Deploy your workflow to the production environment",
        "Track key performance indicators (KPIs)",
        "Analyze automation outcomes and identify bottlenecks",
        "Refine your workflow based on performance data",
      ],
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
        <div className="container mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm" style={{ color: "#6b7c93" }}>
              <Link href="/docs" className="hover:text-purple-600">
                Documentation
              </Link>
              <span>/</span>
              <span style={{ color: "#425466" }}>Getting Started</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <Badge className="badge-stripe mb-4">
              <Zap className="w-4 h-4 mr-2" />
              Quick Start
            </Badge>
            <h1 className="section-title-stripe">Getting Started with Orchestra</h1>
            <p className="section-subtitle-stripe">
              Discover how to automate your business processes with Orchestra. This guide provides the fundamental steps
              to begin using Orchestra effectively.
            </p>
          </div>

          {/* Prerequisites */}
          <Card className="stripe-card mb-12">
            <CardHeader>
              <CardTitle style={{ color: "#0a2540" }}>Prerequisites</CardTitle>
              <CardDescription>What you'll need before getting started</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span style={{ color: "#425466" }}>Active Orchestra subscription</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span style={{ color: "#425466" }}>Necessary credentials for system integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span style={{ color: "#425466" }}>Clear understanding of your automation goals</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Steps */}
          <div className="space-y-8 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="stripe-card">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 gradient-stripe-primary rounded-full flex items-center justify-center text-white font-bold">
                      {step.step}
                    </div>
                    <div>
                      <CardTitle style={{ color: "#0a2540" }}>{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-3">
                        <div
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: "#635bff" }}
                        />
                        <span style={{ color: "#425466" }}>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Next Steps */}
          <Card className="stripe-card">
            <CardHeader>
              <CardTitle style={{ color: "#0a2540" }}>Next Steps</CardTitle>
              <CardDescription>Continue your Orchestra journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Wand2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                      Workflow Design Guide
                    </h4>
                    <p className="text-sm mb-3" style={{ color: "#425466" }}>
                      Explore advanced workflow creation techniques
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/workflow-design">
                        Read Guide <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                      Integration Setup
                    </h4>
                    <p className="text-sm mb-3" style={{ color: "#425466" }}>
                      Connect with your enterprise systems
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/integrations">
                        View Integrations <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
