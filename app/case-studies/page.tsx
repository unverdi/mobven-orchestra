import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Building2, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      company: "Mobven",
      industry: "Technology Consulting",
      logo: "/images/mobven-logo.png",
      challenge:
        "Manual HR processes were consuming 40+ hours per week, slowing down employee onboarding and performance management.",
      solution:
        "Implemented Symphony's AI agents to automate employee onboarding, performance reviews, and policy Q&A systems.",
      results: [
        "300% increase in HR efficiency",
        "95% reduction in onboarding time",
        "99.2% employee satisfaction with automated processes",
        "$2M annual cost savings",
      ],
      metrics: {
        efficiency: "300%",
        timeSaved: "35h/week",
        satisfaction: "99.2%",
      },
    },
    {
      company: "Global Financial Services",
      industry: "Banking & Finance",
      logo: null,
      challenge:
        "Complex compliance processes required manual review of thousands of documents daily, creating bottlenecks and compliance risks.",
      solution:
        "Deployed Symphony's document intelligence agents to automate compliance monitoring, risk assessment, and regulatory reporting.",
      results: [
        "85% reduction in compliance processing time",
        "99.8% accuracy in document classification",
        "Zero compliance violations since implementation",
        "24/7 automated monitoring capabilities",
      ],
      metrics: {
        efficiency: "85%",
        accuracy: "99.8%",
        violations: "0",
      },
    },
    {
      company: "Manufacturing Enterprise",
      industry: "Manufacturing",
      logo: null,
      challenge:
        "Supply chain disruptions and vendor management inefficiencies were causing production delays and increased costs.",
      solution:
        "Implemented Symphony's workflow automation agents for vendor management, inventory optimization, and predictive maintenance.",
      results: [
        "60% improvement in supply chain efficiency",
        "40% reduction in inventory costs",
        "90% decrease in production downtime",
        "Real-time vendor performance monitoring",
      ],
      metrics: {
        efficiency: "60%",
        costReduction: "40%",
        downtime: "90%",
      },
    },
  ]

  const industries = [
    { name: "Financial Services", count: 12, growth: "+45%" },
    { name: "Healthcare", count: 8, growth: "+60%" },
    { name: "Manufacturing", count: 15, growth: "+35%" },
    { name: "Technology", count: 20, growth: "+80%" },
    { name: "Retail", count: 6, growth: "+25%" },
    { name: "Government", count: 4, growth: "+40%" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header variant="landing" />

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="badge-stripe mb-4">
            <TrendingUp className="w-4 h-4 mr-2" />
            Customer Success Stories
          </Badge>
          <h1 className="section-title-stripe">Unlocking Potential: Real Customer Transformations</h1>
          <p className="section-subtitle-stripe">
            Explore how leading organizations are revolutionizing their workflows with Symphony's intelligent
            automation. Witness firsthand the power of AI-driven efficiency and innovation.
          </p>
        </div>
      </section>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Case Studies */}
          <div className="space-y-16 mb-20">
            {caseStudies.map((study, index) => (
              <Card key={index} className="stripe-card">
                <CardContent className="p-12">
                  <div className="grid lg:grid-cols-3 gap-12">
                    {/* Company Info */}
                    <div>
                      <div className="mb-6">
                        {study.logo ? (
                          <img
                            src={study.logo || "/placeholder.svg"}
                            alt={study.company}
                            className="h-12 w-auto object-contain mb-4"
                          />
                        ) : (
                          <div className="w-16 h-16 gradient-stripe-primary rounded-2xl flex items-center justify-center mb-4">
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                        )}
                        <h3 className="text-2xl font-bold mb-2" style={{ color: "#0a2540" }}>
                          {study.company}
                        </h3>
                        <Badge variant="secondary">{study.industry}</Badge>
                      </div>

                      {/* Metrics */}
                      <div className="space-y-4">
                        {Object.entries(study.metrics).map(([key, value], metricIndex) => (
                          <div
                            key={metricIndex}
                            className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
                          >
                            <div className="text-2xl font-bold" style={{ color: "#635bff" }}>
                              {value}
                            </div>
                            <div className="text-sm font-medium" style={{ color: "#0a2540" }}>
                              {key === "efficiency" && "Efficiency Gain"}
                              {key === "timeSaved" && "Time Saved"}
                              {key === "satisfaction" && "Satisfaction"}
                              {key === "accuracy" && "Accuracy"}
                              {key === "violations" && "Violations"}
                              {key === "costReduction" && "Cost Reduction"}
                              {key === "downtime" && "Downtime Reduction"}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenge & Solution */}
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h4 className="text-xl font-bold mb-4" style={{ color: "#0a2540" }}>
                          The Challenge
                        </h4>
                        <p className="text-lg" style={{ color: "#425466" }}>
                          {study.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-4" style={{ color: "#0a2540" }}>
                          The Solution
                        </h4>
                        <p className="text-lg" style={{ color: "#425466" }}>
                          {study.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-xl font-bold mb-4" style={{ color: "#0a2540" }}>
                          The Results
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {study.results.map((result, resultIndex) => (
                            <div key={resultIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: "#00d924" }} />
                              <span style={{ color: "#425466" }}>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Industries */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#0a2540" }}>
              Industries We Serve
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <Card key={index} className="stripe-card text-center p-6">
                  <CardHeader>
                    <CardTitle style={{ color: "#0a2540" }}>{industry.name}</CardTitle>
                    <CardDescription>{industry.count} active customers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold mb-2" style={{ color: "#635bff" }}>
                      {industry.growth}
                    </div>
                    <div className="text-sm" style={{ color: "#425466" }}>
                      Growth this year
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="stripe-card">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6" style={{ color: "#0a2540" }}>
                Ready to Write Your Success Story?
              </h3>
              <p className="text-xl mb-8 max-w-3xl mx-auto" style={{ color: "#425466" }}>
                Join hundreds of enterprises who have transformed their operations with Symphony. Let's discuss how AI
                automation can drive similar results for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-stripe-primary text-lg px-8 py-4" asChild>
                  <Link href="/contact">
                    Start Your Transformation <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="text-lg px-8 py-4" asChild>
                  <Link href="/demo">Schedule Demo</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
