import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wand2, ArrowRight, Settings, Database, Cloud, Shield, Zap, Users } from "lucide-react"
import Link from "next/link"

export default function IntegrationsPage() {
  const integrationCategories = [
    {
      icon: Database,
      title: "Data Sources",
      description: "Connect to various data sources to ingest data into Orchestra.",
      integrations: ["PostgreSQL", "MySQL", "Snowflake", "BigQuery", "S3", "Kafka"],
    },
    {
      icon: Cloud,
      title: "Cloud Services",
      description: "Integrate with cloud platforms to leverage their services within Orchestra.",
      integrations: ["AWS", "Azure", "Google Cloud", "Databricks", "ECS", "Lambda"],
    },
    {
      icon: Users,
      title: "Collaboration Tools",
      description: "Connect with team collaboration tools to streamline workflows.",
      integrations: ["Slack", "Microsoft Teams", "Jira", "Confluence", "PagerDuty", "GitHub"],
    },
    {
      icon: Shield,
      title: "Security & Monitoring",
      description: "Enhance security and monitoring with these integrations.",
      integrations: ["Okta", "Auth0", "DataDog", "New Relic", "CloudWatch", "Sentry"],
    },
  ]

  const setupSteps = [
    {
      title: "Select Integration",
      description: "Choose the integration you want to set up from our extensive marketplace.",
      details: "Browse our marketplace and select the tools and platforms you want to connect to Orchestra.",
    },
    {
      title: "Configure Connection",
      description: "Configure the connection settings and authentication details.",
      details:
        "Provide the necessary credentials, API keys, and connection parameters to establish a secure connection.",
    },
    {
      title: "Define Data Flow",
      description: "Define how data should flow between Orchestra and the integrated system.",
      details: "Configure data mappings, transformations, and synchronization rules to ensure seamless data flow.",
    },
    {
      title: "Test and Deploy",
      description: "Test the integration and deploy it to your production environment.",
      details:
        "Run tests to validate the integration and deploy it to your production environment for real-time data processing.",
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
              <span style={{ color: "#425466" }}>Integrations</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <Badge className="badge-stripe mb-4">
              <Settings className="w-4 h-4 mr-2" />
              Seamless Integration
            </Badge>
            <h1 className="section-title-stripe">Integration Guide</h1>
            <p className="section-subtitle-stripe">
              Connect Orchestra with your favorite tools and services. Integrate seamlessly with a wide range of
              platforms to automate your workflows and enhance productivity.
            </p>
          </div>

          {/* Integration Categories */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#0a2540" }}>
              Integration Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {integrationCategories.map((category, index) => (
                <Card key={index} className="stripe-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 gradient-stripe-primary rounded-xl flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle style={{ color: "#0a2540" }}>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.integrations.map((integration, integrationIndex) => (
                        <Badge
                          key={integrationIndex}
                          variant="secondary"
                          className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                          {integration}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Setup Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: "#0a2540" }}>
              Integration Setup Process
            </h2>
            <div className="space-y-6">
              {setupSteps.map((step, index) => (
                <Card key={index} className="stripe-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 gradient-stripe-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2" style={{ color: "#0a2540" }}>
                          {step.title}
                        </h3>
                        <p className="mb-3" style={{ color: "#6b7c93" }}>
                          {step.description}
                        </p>
                        <p style={{ color: "#425466" }}>{step.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Popular Integrations */}
          <Card className="stripe-card mb-12">
            <CardHeader>
              <CardTitle style={{ color: "#0a2540" }}>Popular Integrations</CardTitle>
              <CardDescription>Explore some of the most popular integrations used by Orchestra users.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Database className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                    Snowflake
                  </h4>
                  <p className="text-sm" style={{ color: "#425466" }}>
                    Cloud-based data warehouse for storing and analyzing large datasets.
                  </p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                    Slack
                  </h4>
                  <p className="text-sm" style={{ color: "#425466" }}>
                    Team communication platform for real-time messaging and collaboration.
                  </p>
                </div>
                <div className="text-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Shield className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: "#0a2540" }}>
                    Okta
                  </h4>
                  <p className="text-sm" style={{ color: "#425466" }}>
                    Identity and access management solution for secure authentication.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Custom Integrations */}
          <Card className="stripe-card">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4" style={{ color: "#635bff" }} />
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#0a2540" }}>
                Need a Custom Integration?
              </h3>
              <p className="mb-6" style={{ color: "#425466" }}>
                If you don't see the integration you need, our team can build a custom solution tailored to your
                specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-stripe-primary" asChild>
                  <Link href="/contact">Request Custom Integration</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs/api">
                    View API Docs <ArrowRight className="ml-2 w-4 h-4" />
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
