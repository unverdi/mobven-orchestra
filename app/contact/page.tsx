"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-blue-100 text-blue-700 border-blue-200">
              <Mail className="w-4 h-4 mr-2" />
              Enterprise Support
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Get in Touch
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Ready to transform your enterprise with AI agents? Our team is here to help you get started.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a message</CardTitle>
                  <CardDescription>
                    Tell us about your project and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@company.com" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input id="company" placeholder="Your Company" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="projectType">Project Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom-agent">Custom AI Agent Development</SelectItem>
                            <SelectItem value="workflow-automation">Workflow Automation</SelectItem>
                            <SelectItem value="enterprise-integration">Enterprise Integration</SelectItem>
                            <SelectItem value="consultation">Strategic Consultation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us about your project requirements..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                      <p className="text-slate-600 mb-6">
                        Thank you for your interest. Our team will contact you within 24 hours.
                      </p>
                      <Button onClick={() => setIsSubmitted(false)} variant="outline">
                        Send Another Message
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Reach out to us directly through any of these channels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@mobven.com" className="text-blue-600 hover:underline">
                        info@mobven.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+902122155757" className="text-blue-600 hover:underline">
                        +90 212 215 57 57
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">ITU Office (HQ)</p>
                      <p className="text-slate-600">
                        Istanbul Technical University ITUARI 2,
                        <br />
                        Ayazaga Teknokent Building 2 / 101,
                        <br />
                        34467, Maslak, Istanbul
                      </p>
                      <a
                        href="https://maps.google.com/?q=Istanbul+Technical+University+ITUARI+2+Ayazaga+Teknokent"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                      >
                        See on Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">YTU Office</p>
                      <p className="text-slate-600">
                        Istanbul Yildiz Technical University,
                        <br />
                        Building D2 - Z02,
                        <br />
                        34220, Esenler, Istanbul
                      </p>
                      <a
                        href="https://maps.google.com/?q=Istanbul+Yildiz+Technical+University+Building+D2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mt-1 inline-block"
                      >
                        See on Google Maps
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-slate-600">
                        Mon-Fri: 9:00 AM - 6:00 PM (GMT+3)
                        <br />
                        24/7 Enterprise Support
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Enterprise Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    Need immediate assistance? Our enterprise support team is available 24/7 for critical issues.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white w-full">
                    Access Support Portal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
