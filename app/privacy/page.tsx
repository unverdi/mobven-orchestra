import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Shield, Lock, Eye, FileText, Users, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information We Collect",
      icon: FileText,
      content: [
        "Account information (name, email, company details)",
        "Usage data and analytics",
        "Agent configurations and training data",
        "Integration and API usage logs",
        "Support communications",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Provide and improve our services",
        "Process transactions and billing",
        "Send important service updates",
        "Provide customer support",
        "Ensure platform security and compliance",
      ],
    },
    {
      title: "Data Security",
      icon: Shield,
      content: [
        "End-to-end encryption for all data",
        "SOC 2 Type II certified infrastructure",
        "Regular security audits and penetration testing",
        "Multi-factor authentication requirements",
        "Secure data centers with 24/7 monitoring",
      ],
    },
    {
      title: "Data Sharing",
      icon: Globe,
      content: [
        "We never sell your personal information",
        "Limited sharing with trusted service providers",
        "Legal compliance when required by law",
        "Anonymous, aggregated analytics only",
        "Your explicit consent for any other sharing",
      ],
    },
    {
      title: "Your Rights",
      icon: Eye,
      content: [
        "Access your personal data",
        "Correct inaccurate information",
        "Delete your account and data",
        "Export your data",
        "Opt-out of marketing communications",
      ],
    },
    {
      title: "Data Retention",
      icon: Lock,
      content: [
        "Account data retained while account is active",
        "Usage logs retained for 2 years",
        "Deleted data purged within 30 days",
        "Backup data purged within 90 days",
        "Legal hold exceptions may apply",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AgentPro
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/features" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Documentation
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200">
            <Shield className="w-4 h-4 mr-1" />
            Privacy Policy
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            We're committed to protecting your privacy and being transparent about how we handle your data.
          </p>
          <p className="text-sm text-slate-500">Last updated: January 15, 2024 • Effective date: January 15, 2024</p>
        </div>
      </section>

      <div className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Introduction */}
          <Card className="mb-12">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-slate-600 mb-4">
                AgentPro ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you use our AI automation platform
                and related services.
              </p>
              <p className="text-slate-600 mb-4">
                By using AgentPro, you agree to the collection and use of information in accordance with this policy. We
                will not use or share your information with anyone except as described in this Privacy Policy.
              </p>
              <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  We are SOC 2 Type II certified and GDPR compliant
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {sections.map((section, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <section.icon className="w-6 h-6 text-blue-600" />
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* International Transfers */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-blue-600" />
                International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                AgentPro operates globally and may transfer your personal information to countries other than your own.
                We ensure that such transfers comply with applicable data protection laws through:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  Standard Contractual Clauses approved by the European Commission
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  Adequacy decisions for certain countries
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  Your explicit consent where required
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-6 h-6 text-blue-600" />
                Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                AgentPro is not intended for use by children under the age of 13. We do not knowingly collect personal
                information from children under 13. If you are a parent or guardian and believe your child has provided
                us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                Changes to This Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-slate-600">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>If you have any questions about this Privacy Policy, please contact us:</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">General Privacy Questions</h4>
                  <p className="text-sm text-slate-600">privacy@mobven.com</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Protection Officer</h4>
                  <p className="text-sm text-slate-600">dpo@mobven.com</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Mailing Address</h4>
                  <p className="text-sm text-slate-600">
                    AgentPro Inc.
                    <br />
                    123 Market Street, Suite 500
                    <br />
                    San Francisco, CA 94105
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">EU Representative</h4>
                  <p className="text-sm text-slate-600">
                    AgentPro Europe Ltd.
                    <br />
                    789 Oxford Street, Suite 300
                    <br />
                    London, UK W1C 1DX
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <Button asChild>
                  <Link href="/contact">
                    Contact Our Privacy Team <ArrowRight className="ml-2 w-4 h-4" />
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
