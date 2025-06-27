import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Bot,
  Workflow,
  Zap,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  Star,
  Music,
  Sparkles,
} from "lucide-react"
import Header from "@/components/header"

const features = [
  {
    name: "AI-Powered Agents",
    description: "Deploy intelligent agents that learn and adapt to your business processes.",
    icon: Bot,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Workflow Automation",
    description: "Build complex workflows with our intuitive visual editor and chat assistant.",
    icon: Workflow,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Smart Integrations",
    description: "Connect seamlessly with your favorite tools and platforms.",
    icon: Zap,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Enterprise Security",
    description: "Bank-grade security with SOC 2 compliance and end-to-end encryption.",
    icon: Shield,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Team Collaboration",
    description: "Work together seamlessly with real-time collaboration features.",
    icon: Users,
    color: "from-indigo-500 to-purple-500",
  },
  {
    name: "Advanced Analytics",
    description: "Get deep insights into your processes with comprehensive analytics.",
    icon: BarChart3,
    color: "from-teal-500 to-blue-500",
  },
]

const testimonials = [
  {
    content:
      "Orchestra has transformed how we handle our business processes. The AI agents are incredibly smart and the workflow builder is intuitive.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Inc",
    rating: 5,
  },
  {
    content:
      "The integration capabilities are outstanding. We connected all our tools in minutes and saw immediate productivity gains.",
    author: "Michael Rodriguez",
    role: "Operations Director",
    company: "DataSync Solutions",
    rating: 5,
  },
  {
    content:
      "Best productivity platform we've used. The chat-based workflow creation is a game-changer for our non-technical team members.",
    author: "Emily Johnson",
    role: "Product Manager",
    company: "InnovateLab",
    rating: 5,
  },
]

const stats = [
  { label: "Active Users", value: "50K+" },
  { label: "Workflows Created", value: "1M+" },
  { label: "Time Saved Daily", value: "10K hrs" },
  { label: "Customer Satisfaction", value: "99%" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
              <Sparkles className="w-4 h-4 mr-1" />
              AI-Powered Productivity Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Orchestrate Your
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Success
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Streamline your business processes with AI agents, workflow automation, and intelligent integrations.
              Build, deploy, and scale your productivity solutions with ease.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Link href="/demo">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/features">Learn More</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                14-day free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Powerful features designed to streamline your workflow and boost productivity
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card
                    key={feature.name}
                    className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Loved by teams worldwide</h2>
            <p className="mt-4 text-lg text-gray-600">See what our customers are saying about Orchestra</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-gray-900 mb-4">"{testimonial.content}"</blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to transform your workflow?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-100">
              Join thousands of teams who have already streamlined their processes with Orchestra.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/demo">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild className="text-white hover:text-purple-100 hover:bg-white/10">
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Orchestra</span>
              </Link>
              <p className="mt-4 text-sm text-gray-400">AI-powered productivity platform for modern teams.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/features" className="text-sm text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="text-sm text-gray-400 hover:text-white">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-sm text-gray-400 hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-gray-400 hover:text-white">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400 text-center">© 2024 Orchestra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
