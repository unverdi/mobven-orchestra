import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Calculator,
  Headphones,
  TrendingUp,
  Shield,
  Package,
  ArrowRight,
  CheckCircle,
  Zap,
  Building2,
} from "lucide-react"
import Link from "next/link"

export default function SolutionsPage() {
  const solutions = [
    {
      name: "HR & Talent Management",
      description: "Streamline recruitment, onboarding, and employee management with AI-powered automation",
      icon: Users,
      category: "Human Resources",
      features: [
        "Automated candidate screening",
        "Smart interview scheduling",
        "Employee onboarding workflows",
        "Performance review automation",
        "Leave management system",
        "Training program coordination",
      ],
      useCases: ["Reduce hiring time by 60%", "Automate repetitive HR tasks", "Improve employee experience"],
      popular: false,
    },
    {
      name: "Finance & Accounting",
      description: "Automate financial processes, invoice management, and compliance reporting",
      icon: Calculator,
      category: "Finance",
      features: [
        "Invoice processing automation",
        "Expense report management",
        "Financial data analysis",
        "Compliance monitoring",
        "Budget tracking",
        "Payment workflow automation",
      ],
      useCases: ["Process invoices 10x faster", "Reduce manual errors by 95%", "Ensure regulatory compliance"],
      popular: true,
    },
    {
      name: "Customer Support",
      description: "Enhance customer service with intelligent ticket routing and automated responses",
      icon: Headphones,
      category: "Customer Service",
      features: [
        "Smart ticket classification",
        "Automated response generation",
        "Escalation management",
        "Customer sentiment analysis",
        "Knowledge base integration",
        "Multi-channel support",
      ],
      useCases: [
        "Resolve 70% of tickets automatically",
        "Improve response time by 80%",
        "Increase customer satisfaction",
      ],
      popular: false,
    },
    {
      name: "Sales & Marketing",
      description: "Boost sales performance with lead qualification and marketing automation",
      icon: TrendingUp,
      category: "Sales",
      features: [
        "Lead scoring and qualification",
        "Email campaign automation",
        "CRM data synchronization",
        "Sales pipeline management",
        "Customer journey mapping",
        "Performance analytics",
      ],
      useCases: ["Increase qualified leads by 150%", "Automate follow-up sequences", "Optimize conversion rates"],
      popular: false,
    },
    {
      name: "Compliance & Risk",
      description: "Ensure regulatory compliance and manage risk with automated monitoring",
      icon: Shield,
      category: "Legal & Compliance",
      features: [
        "Regulatory compliance monitoring",
        "Risk assessment automation",
        "Document review workflows",
        "Audit trail management",
        "Policy enforcement",
        "Incident response automation",
      ],
      useCases: ["Maintain 100% compliance", "Reduce audit preparation time", "Proactive risk management"],
      popular: false,
    },
    {
      name: "Operations & Supply Chain",
      description: "Optimize operations with inventory management and supply chain automation",
      icon: Package,
      category: "Operations",
      features: [
        "Inventory optimization",
        "Supply chain monitoring",
        "Quality control automation",
        "Vendor management",
        "Production planning",
        "Logistics coordination",
      ],
      useCases: ["Reduce inventory costs by 30%", "Optimize supply chain efficiency", "Minimize operational delays"],
      popular: false,
    },
  ]

  const industries = [
    {
      name: "Healthcare",
      description: "Patient management, appointment scheduling, and medical record automation",
      icon: "🏥",
      benefits: ["Improved patient care", "Reduced administrative burden", "HIPAA compliance"],
    },
    {
      name: "Financial Services",
      description: "Risk assessment, fraud detection, and customer onboarding automation",
      icon: "🏦",
      benefits: ["Enhanced security", "Faster processing", "Regulatory compliance"],
    },
    {
      name: "Manufacturing",
      description: "Production optimization, quality control, and supply chain management",
      icon: "🏭",
      benefits: ["Increased efficiency", "Quality assurance", "Cost reduction"],
    },
    {
      name: "Retail & E-commerce",
      description: "Inventory management, customer service, and order processing automation",
      icon: "🛍️",
      benefits: ["Better customer experience", "Inventory optimization", "Sales growth"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header variant="landing" />

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            AI-Powered Solutions
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Transform Every Department
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Discover how Orchestra's AI agents can revolutionize your business operations across all departments and
            industries.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {solutions.map((solution, index) => {
            const Icon = solution.icon
            return (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  solution.popular ? "ring-2 ring-blue-500 shadow-xl" : "hover:shadow-lg"
                }`}
              >
                {solution.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}

                <CardHeader className={`${solution.popular ? "pt-12" : "pt-6"}`}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="w-fit mx-auto mb-2">
                    {solution.category}
                  </Badge>
                  <CardTitle className="text-xl font-bold text-center">{solution.name}</CardTitle>
                  <CardDescription className="text-center">{solution.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900">Key Features:</h4>
                    <ul className="space-y-2">
                      {solution.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-slate-900">Use Cases:</h4>
                    <ul className="space-y-2">
                      {solution.useCases.map((useCase, useCaseIndex) => (
                        <li key={useCaseIndex} className="flex items-center gap-2 text-sm">
                          <Zap className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <span className="text-slate-600">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full mt-6 ${
                      solution.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                        : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                    }`}
                    asChild
                  >
                    <Link href="/contact">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Industries Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-slate-900">Industry Solutions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Tailored AI solutions for specific industry needs and requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-4xl mb-4">{industry.icon}</div>
                <h3 className="text-xl font-bold mb-3">{industry.name}</h3>
                <p className="text-slate-600 mb-4 text-sm">{industry.description}</p>
                <ul className="space-y-1">
                  {industry.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-xs text-slate-500">
                      • {benefit}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Let's discuss how Orchestra can create custom AI solutions for your specific needs and industry
            requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
              asChild
            >
              <Link href="/demo">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
