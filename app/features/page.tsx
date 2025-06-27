import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  Zap,
  Shield,
  Globe,
  Users,
  BarChart3,
  MessageSquare,
  Settings,
  Workflow,
  Lock,
  Clock,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      icon: Brain,
      title: "Intelligent AI Agents",
      description: "Deploy smart agents that learn, adapt, and evolve with your business needs.",
      benefits: ["Natural language processing", "Machine learning capabilities", "Contextual understanding"],
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description: "Streamline complex processes with visual workflow builders and automation tools.",
      benefits: ["Drag-and-drop interface", "Custom triggers", "Multi-step automation"],
    },
    {
      icon: MessageSquare,
      title: "Real-time Communication",
      description: "Enable seamless interaction between agents, teams, and customers.",
      benefits: ["Live chat integration", "Multi-channel support", "Instant notifications"],
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Gain deep insights into agent performance and business metrics.",
      benefits: ["Real-time dashboards", "Custom reports", "Performance tracking"],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance features.",
      benefits: ["SOC 2 compliance", "Data encryption", "Access controls"],
    },
    {
      icon: Globe,
      title: "Global Integrations",
      description: "Connect with 1000+ popular tools and services seamlessly.",
      benefits: ["API integrations", "Webhook support", "Custom connectors"],
    },
  ]

  const capabilities = [
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Agents work towards specific objectives with measurable outcomes",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock operation without breaks or downtime",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Multi-agent coordination for complex task completion",
    },
    {
      icon: Lock,
      title: "Secure by Design",
      description: "Built-in security features and privacy protection",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Everything You Need
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Orchestra provides all the tools and capabilities you need to build, deploy, and manage intelligent AI
            agents at scale.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                  <CardDescription className="text-slate-600 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Capabilities Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Capabilities</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built-in features that make Orchestra agents truly intelligent and reliable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{capability.title}</h3>
                  <p className="text-slate-600 text-sm">{capability.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Integration Showcase */}
        <div className="bg-white rounded-3xl p-12 shadow-lg mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Connect with your favorite tools and services in minutes, not hours
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {/* Integration logos would go here */}
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <Settings className="w-8 h-8 text-slate-400" />
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <Globe className="w-8 h-8 text-slate-400" />
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-slate-400" />
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-slate-400" />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses already using Orchestra to transform their operations with AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 font-semibold" asChild>
              <Link href="/dashboard">Start Free Trial</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
