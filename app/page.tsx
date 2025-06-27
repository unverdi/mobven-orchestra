import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  FileText,
  BarChart3,
  Workflow,
  Brain,
  Users,
  Building2,
  CheckCircle,
  Star,
  Quote,
  Wand2,
  Rocket,
  Globe,
  TrendingUp,
  MessageSquare,
  Settings,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const testimonials = [
    {
      name: "Okan Ünverdi",
      role: "COO",
      company: "Mobven",
      content:
        "Orchestra has revolutionized our operations. The AI agents we've deployed have increased our efficiency by 300% and reduced manual work significantly. This is the future of enterprise automation.",
      rating: 5,
    },
    {
      name: "Dara Hizveren",
      role: "COO",
      company: "Madduck",
      content:
        "The custom AI agents developed by Orchestra have transformed our workflow management. We've seen unprecedented improvements in productivity and our teams can now focus on strategic initiatives.",
      rating: 5,
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "Intelligent Agent Builder",
      description:
        "Create sophisticated AI agents with advanced natural language processing and decision-making capabilities.",
    },
    {
      icon: Workflow,
      title: "AI-Powered Workflow Chat",
      description:
        "Create sophisticated workflows through natural conversation with our intelligent AI assistant. Simply describe your process and watch it come to life.",
    },
    {
      icon: FileText,
      title: "Document Intelligence",
      description: "Advanced document processing with contextual understanding and automated data extraction.",
    },
    {
      icon: Zap,
      title: "Enterprise Integration",
      description: "Seamless connectivity with 500+ enterprise tools and real-time data synchronization.",
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "AI-powered insights that anticipate needs and optimize business operations proactively.",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption with zero-trust architecture and continuous security monitoring.",
    },
  ]

  const useCases = [
    {
      icon: Users,
      title: "Human Resources",
      items: [
        "Intelligent employee onboarding automation",
        "AI-powered performance review analysis",
        "Smart interview coordination and scheduling",
        "Natural language policy assistance",
      ],
    },
    {
      icon: Building2,
      title: "Operations",
      items: [
        "Autonomous vendor management",
        "Predictive incident response",
        "Quality assurance automation",
        "Compliance monitoring and reporting",
      ],
    },
  ]

  const stats = [
    { icon: Rocket, value: "300%", label: "Efficiency Increase" },
    { icon: Globe, value: "500+", label: "Integrations" },
    { icon: TrendingUp, value: "99.9%", label: "Uptime SLA" },
    { icon: Shield, value: "SOC 2", label: "Certified" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header variant="landing" />

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pattern-mesh opacity-40"></div>
        <div className="absolute inset-0 gradient-stripe-hero"></div>

        <div className="container mx-auto text-center max-w-6xl relative z-10">
          <div className="animate-fade-in-up-enhanced">
            <Badge className="badge-enhanced mb-8 animate-float">
              <Bot className="w-5 h-5 mr-2" />
              Next-Generation AI Platform
            </Badge>

            <h1 className="section-title-enhanced mb-8">
              Conduct Your Enterprise
              <span className="block text-gradient-primary">AI Orchestra</span>
            </h1>

            <p className="section-subtitle-enhanced mb-12 max-w-4xl mx-auto">
              Orchestra empowers enterprises to create sophisticated AI agents that understand, learn, and automate
              complex workflows. Conduct intelligent automation with enterprise-grade security and reliability.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-10 py-5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                asChild
              >
                <Link href="/dashboard">
                  Start Conducting Agents
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-purple-300 font-semibold px-10 py-5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                asChild
              >
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="card-stripe-glass p-6 text-center hover-glow">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                <div className="text-2xl font-bold text-gradient-primary mb-1">{stat.value}</div>
                <div className="text-sm font-medium" style={{ color: "#6b7c93" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Client Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="card-stripe-enhanced p-8 text-center hover-lift-enhanced">
              <Image
                src="/images/prometa-logo.jpeg"
                alt="Prometa.ai"
                width={120}
                height={40}
                className="h-10 w-auto object-contain mx-auto mb-4"
              />
              <div className="text-sm font-semibold" style={{ color: "#6b7c93" }}>
                Technology Partner
              </div>
            </div>
            <div className="card-stripe-enhanced p-8 text-center hover-lift-enhanced">
              <Image
                src="/images/mobven-logo.png"
                alt="Mobven"
                width={120}
                height={40}
                className="h-10 w-auto object-contain mx-auto mb-4"
              />
              <div className="text-sm font-semibold" style={{ color: "#6b7c93" }}>
                Enterprise Client
              </div>
            </div>
            <div className="card-stripe-enhanced p-8 text-center hover-lift-enhanced">
              <div className="text-3xl font-bold mb-2 text-gradient-primary">Banks</div>
              <div className="text-sm font-semibold" style={{ color: "#6b7c93" }}>
                Financial Sector
              </div>
            </div>
            <div className="card-stripe-enhanced p-8 text-center hover-lift-enhanced">
              <div className="text-3xl font-bold mb-2" style={{ color: "#00d924" }}>
                99.9%
              </div>
              <div className="text-sm font-semibold" style={{ color: "#6b7c93" }}>
                Uptime SLA
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white relative">
        <div className="absolute inset-0 pattern-dots-enhanced opacity-30"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#0a2540" }}>
              Powerful AI Capabilities
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto font-medium" style={{ color: "#425466" }}>
              Built with cutting-edge artificial intelligence to deliver enterprise-grade automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-stripe-enhanced p-8 hover-lift-enhanced group">
                <CardHeader className="pb-6">
                  <div className="feature-icon-enhanced mb-6 group-hover:shadow-stripe-glow transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold mb-4" style={{ color: "#0a2540" }}>
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed" style={{ color: "#425466" }}>
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chat Showcase Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-purple-50 to-blue-50 relative">
        <div className="absolute inset-0 pattern-dots-enhanced opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <Badge className="badge-enhanced mb-8">
              <MessageSquare className="w-5 h-5 mr-2" />
              Revolutionary Workflow Creation
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#0a2540" }}>
              Create Workflows by Simply Talking
            </h2>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto font-medium" style={{ color: "#425466" }}>
              Our AI assistant understands your business needs and transforms conversations into powerful automated
              workflows
            </p>
          </div>

          {/* Chat Interface Preview */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-12">
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Workflow Assistant</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">Live</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl px-6 py-3 max-w-md">
                    <p className="text-sm">I need to automate our employee onboarding process</p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-3xl px-6 py-3 max-w-md">
                    <p className="text-sm text-gray-800">
                      Perfect! I'll help you create an onboarding workflow. This will include welcome emails, account
                      setup, training assignments, and manager notifications. Would you like me to integrate with Slack
                      and your HR system?
                    </p>
                  </div>
                </div>

                {/* User Response */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-3xl px-6 py-3 max-w-md">
                    <p className="text-sm">Yes, integrate with Slack and send training materials automatically</p>
                  </div>
                </div>

                {/* AI Final Response */}
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-3xl px-6 py-3 max-w-md">
                    <p className="text-sm text-gray-800">
                      Excellent! I've created your Employee Onboarding Workflow with Slack integration and automated
                      training delivery. Ready to deploy?
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                <input
                  type="text"
                  placeholder="Describe your workflow needs..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-600"
                  disabled
                />
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#0a2540" }}>
                  Natural Language
                </h3>
                <p className="text-sm" style={{ color: "#425466" }}>
                  Describe workflows in plain English - no technical knowledge required
                </p>
              </div>

              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#0a2540" }}>
                  Instant Creation
                </h3>
                <p className="text-sm" style={{ color: "#425466" }}>
                  Workflows are generated and ready to deploy in seconds
                </p>
              </div>

              <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: "#0a2540" }}>
                  Smart Integration
                </h3>
                <p className="text-sm" style={{ color: "#425466" }}>
                  AI suggests and configures the best integrations for your needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 px-6 relative" style={{ backgroundColor: "#f6f9fc" }}>
        <div className="absolute inset-0 pattern-grid-enhanced opacity-40"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#0a2540" }}>
              Transform Every Department
            </h2>
            <p className="text-xl md:text-2xl font-medium" style={{ color: "#425466" }}>
              AI agents that revolutionize enterprise operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card key={index} className="card-stripe-enhanced p-10 hover-lift-enhanced">
                <div className="flex items-start gap-8">
                  <div className="feature-icon-enhanced">
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold mb-8" style={{ color: "#0a2540" }}>
                      {useCase.title}
                    </h3>
                    <ul className="space-y-4">
                      {useCase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-4" style={{ color: "#425466" }}>
                          <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: "#00d924" }} />
                          <span className="text-lg">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-white relative">
        <div className="absolute inset-0 pattern-mesh opacity-20"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#0a2540" }}>
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl md:text-2xl font-medium" style={{ color: "#425466" }}>
              See how enterprises are transforming with Orchestra
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-stripe-enhanced p-10 hover-lift-enhanced">
                <div className="flex items-center gap-3 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="w-10 h-10 mb-6" style={{ color: "#635bff" }} />
                <p className="text-xl leading-relaxed mb-8 font-medium" style={{ color: "#425466" }}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 gradient-stripe-primary rounded-2xl flex items-center justify-center shadow-stripe-md">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold" style={{ color: "#0a2540" }}>
                      {testimonial.name}
                    </h4>
                    <p className="text-lg" style={{ color: "#6b7c93" }}>
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 pattern-dots-enhanced opacity-20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to Conduct AI Agents?</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto font-medium">
            Join leading enterprises who trust Orchestra to automate their critical business processes with intelligent
            AI agents.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-50 font-semibold px-12 py-6 text-xl rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <Link href="/dashboard">
                Start Conducting Now
                <ArrowRight className="ml-3 w-6 h-6" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-12 py-6 text-xl rounded-xl transition-all duration-300 hover:-translate-y-1"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6" style={{ backgroundColor: "#0a2540", color: "white" }}>
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 gradient-stripe-primary rounded-2xl flex items-center justify-center shadow-stripe-md">
                  <Wand2 className="w-7 h-7 text-white" />
                </div>
                <span className="text-3xl font-bold">Orchestra</span>
              </div>
              <p className="text-lg leading-relaxed" style={{ color: "#8898aa" }}>
                The enterprise AI platform that transforms how organizations operate with intelligent automation.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Product</h4>
              <ul className="space-y-4 text-lg" style={{ color: "#8898aa" }}>
                <li>
                  <Link href="/features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-white transition-colors">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Resources</h4>
              <ul className="space-y-4 text-lg" style={{ color: "#8898aa" }}>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/api" className="hover:text-white transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="/case-studies" className="hover:text-white transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-xl">Company</h4>
              <ul className="space-y-4 text-lg" style={{ color: "#8898aa" }}>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-16 pt-10 text-center text-lg" style={{ color: "#8898aa" }}>
            <p>&copy; 2024 Orchestra. All rights reserved. Built for enterprise excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
