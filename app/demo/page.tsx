"use client"

import type React from "react"
import { Video } from "lucide-react" // Declare the Video variable

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Bot, Play, Calendar, Users, CheckCircle, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    employees: "",
    useCase: "",
    timeSlot: "",
    message: "",
  })

  const consultationFeatures = [
    "Custom LLM development discussion",
    "AI automation strategy planning",
    "Integration requirements analysis",
    "ROI and implementation timeline",
    "Q&A session with our experts",
    "Personalized solution architecture",
  ]

  const useCases = [
    "HR & Employee Management",
    "Customer Support Automation",
    "Sales & Lead Management",
    "Operations & Workflow Automation",
    "Finance & Invoice Processing",
    "IT & Security Management",
    "Other",
  ]

  const timeSlots = [
    "9:00 AM - 10:00 AM EST",
    "10:00 AM - 11:00 AM EST",
    "11:00 AM - 12:00 PM EST",
    "1:00 PM - 2:00 PM EST",
    "2:00 PM - 3:00 PM EST",
    "3:00 PM - 4:00 PM EST",
    "4:00 PM - 5:00 PM EST",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Demo request:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
            <Calendar className="w-4 h-4 mr-1" />
            Book Consultation
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Schedule a Consultation
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Book a personalized consultation to discuss your custom LLM development needs and AI automation
            requirements.
          </p>
        </div>
      </section>

      <div className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Demo Request Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    Schedule Your Consultation
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll schedule a personalized consultation session
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Work Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company">Company Name *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="employees">Company Size</Label>
                        <Select onValueChange={(value) => handleInputChange("employees", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">11-50 employees</SelectItem>
                            <SelectItem value="51-200">51-200 employees</SelectItem>
                            <SelectItem value="201-1000">201-1000 employees</SelectItem>
                            <SelectItem value="1000+">1000+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="useCase">Primary Use Case</Label>
                        <Select onValueChange={(value) => handleInputChange("useCase", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select use case" />
                          </SelectTrigger>
                          <SelectContent>
                            {useCases.map((useCase) => (
                              <SelectItem key={useCase} value={useCase}>
                                {useCase}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="timeSlot">Preferred Time Slot</Label>
                      <Select onValueChange={(value) => handleInputChange("timeSlot", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Tell us about your specific needs or questions..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Schedule Demo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Demo Information */}
            <div className="space-y-6">
              {/* What to Expect */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-blue-600" />
                    What to Expect
                  </CardTitle>
                  <CardDescription>Your personalized demo will include:</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {consultationFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Demo Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Demo Highlights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">Duration</span>
                    </div>
                    <span className="text-sm font-semibold">45 minutes</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Format</span>
                    </div>
                    <span className="text-sm font-semibold">1-on-1 or Team</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Video className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium">Platform</span>
                    </div>
                    <span className="text-sm font-semibold">Zoom/Teams</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Success */}
              <Card>
                <CardHeader>
                  <CardTitle>Customer Success</CardTitle>
                  <CardDescription>See what our customers achieve with AgentPro</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">92%</div>
                    <div className="text-sm text-slate-600">Average time saved</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold text-green-600 mb-1">2,500+</div>
                      <div className="text-xs text-slate-600">Happy customers</div>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold text-purple-600 mb-1">50M+</div>
                      <div className="text-xs text-slate-600">Tasks automated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600">Have questions before scheduling? Our team is here to help.</p>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/contact">Contact Sales Team</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/docs">View Documentation</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
