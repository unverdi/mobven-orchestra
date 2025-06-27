import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wand2, ArrowRight, Brain, Zap, Settings, FileText, Code, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function AgentBuilderPage() {
  const agentTypes = [
    {
      icon: MessageSquare,
      title: "Chat Agents",
      description: "AI agents designed for interactive conversations and support.",
      features: [
        "Real-time interaction",
        "Personalized responses",
        "Contextual understanding",
        "Seamless communication",
      ],
    },
    {
      icon: FileText,
      title: "Data Processing Agents",
      description: "Agents that specialize in extracting, transforming, and loading data.",
      features: ["Automated data extraction", "Data validation", "Format conversion", "Efficient data loading"],
    },
    {
      icon: Zap,
      title: "Automation Agents",
      description: "AI agents that automate repetitive tasks and streamline workflows.",
      features: ["Task automation", "Workflow optimization", "Process streamlining", "Error reduction"],
    },
  ]

  const buildingSteps = [
    {
      title: "Define Objectives",
      description: "Clearly outline the goals and purpose of your AI agent.",
      details: [
        "Identify target outcomes",
        "Define key performance indicators (KPIs)",
        "Establish success criteria",
        "Align with business goals",
      ],
    },
    {
      title: "Design Agent Logic",
      description: "Create the decision-making framework for your agent.",
      details: [
        "Map decision trees",
        "Define rules and conditions",
        "Implement reasoning algorithms",
        "Incorporate feedback loops",
      ],
    },
    {
      title: "Implement and Train",
      description: "Develop and train your agent using relevant data.",
      details: [
        "Select appropriate training data",
        "Implement machine learning models",
        "Fine-tune parameters",
        "Validate performance metrics",
      ],
    },
    {
      title: "Deploy and Monitor",
      description: "Deploy your agent and continuously monitor its performance.",
      details: [
        "Integrate with existing systems",
        "Monitor key metrics",
        "Gather user feedback",
        "Iterate and improve",
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
        <div className="container mx-auto max-w-6xl">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm" style={{ color: "#6b7c93" }}>
              <Link href="/docs" className="hover:text-purple-600">
                Documentation
              </Link>
              <span>/</span>
              <span style={{ color: "#425466" }}>Agent Builder</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <Badge className="badge-stripe mb-4">
              <Brain className="w-4 h-4 mr-2" />
              Agent Development
            </Badge>
            <h1 className="section-title-stripe">Orchestra Agent Builder Guide</h1>
            <p className="section-subtitle-stripe">
              Discover how to build intelligent AI agents that automate tasks, process data, and enhance user
              interactions.
            </p>
          </div>

          {/* Agent Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#0a2540" }}>
              Types of AI Agents
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {agentTypes.map((type, index) => (
                <Card key={index} className="stripe-card">
                  <CardHeader>
                    <div className="w-12 h-12 gradient-stripe-primary rounded-xl flex items-center justify-center mb-4">
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle style={{ color: "#0a2540" }}>{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#635bff" }} />
                          <span className="text-sm" style={{ color: "#425466" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Building Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#0a2540" }}>
              Agent Building Process
            </h2>
            <div className="space-y-8">
              {buildingSteps.map((step, index) => (
                <Card key={index} className="stripe-card">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 gradient-stripe-primary rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle style={{ color: "#0a2540" }}>{step.title}</CardTitle>
                        <CardDescription>{step.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start gap-3">
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: "#635bff" }}
                          />
                          <span style={{ color: "#425466" }}>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Best Practices */}
          <Card className="stripe-card mb-12">
            <CardHeader>
              <CardTitle style={{ color: "#0a2540" }}>Best Practices</CardTitle>
              <CardDescription>Tips for building effective AI agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: "#0a2540" }}>
                    Design Principles
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Start with simple use cases</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Design for scalability</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Plan for error scenarios</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Implement proper logging</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4" style={{ color: "#0a2540" }}>
                    Training Tips
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Use diverse training data</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Test with real user scenarios</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Continuously improve responses</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: "#00d924" }} />
                      <span style={{ color: "#425466" }}>Monitor performance metrics</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="stripe-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                      API Reference
                    </h4>
                    <p className="text-sm mb-4" style={{ color: "#425466" }}>
                      Explore our comprehensive API documentation
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/api">
                        View API Docs <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="stripe-card">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                      Integrations
                    </h4>
                    <p className="text-sm mb-4" style={{ color: "#425466" }}>
                      Connect your agents with enterprise systems
                    </p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs/integrations">
                        View Integrations <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
