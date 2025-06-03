"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Users, Target, Award, Send } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-900 hover:text-blue-800 transition-colors">
              HanLetter
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                Home
              </Link>
              <Link href="/archive" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                Archive
              </Link>
              <Link href="/about" className="text-blue-900 font-medium">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">About HanLetter</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Your premier digital gateway to Korean news, culture, and insights. We bridge the gap between Korea and the
            world through compelling storytelling and comprehensive coverage.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-500">
            <Target className="h-12 w-12 text-blue-600 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              HanLetter transforms traditional Korean newsletter content into a modern, accessible digital platform. We
              aim to make Korean culture, technology, and social issues accessible to a global audience through
              engaging, mobile-first design and offline accessibility.
            </p>
            <p className="text-gray-700 leading-relaxed">
              With mobile-first design and offline access capabilities, you can stay updated with the latest Korean news
              anytime, anywhere.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-500">
            <Award className="h-12 w-12 text-green-600 mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              To become the world's leading digital platform for Korean news and cultural content, fostering global
              understanding and appreciation of Korea's rich heritage and modern innovations.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We envision a connected world where Korean stories inspire, inform, and unite people across cultures and
              continents.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose HanLetter?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "📱",
                title: "Mobile Optimized",
                description: "Designed for the best reading experience on smartphones and tablets.",
              },
              {
                icon: "🔄",
                title: "Offline Access",
                description: "PWA technology allows you to read articles without an internet connection.",
              },
              {
                icon: "🔍",
                title: "Smart Search",
                description: "Find articles easily with our advanced search and filtering system.",
              },
              {
                icon: "📚",
                title: "Complete Archive",
                description: "Access our comprehensive collection of past articles and issues.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A passionate team of journalists, developers, and cultural enthusiasts dedicated to bringing you the best
              of Korean news and culture.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Kim", role: "Editor-in-Chief", image: "/placeholder.svg?height=200&width=200" },
              { name: "Michael Park", role: "Tech Lead", image: "/placeholder.svg?height=200&width=200" },
              { name: "Jennifer Lee", role: "Cultural Correspondent", image: "/placeholder.svg?height=200&width=200" },
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">contact@hanletter.com</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">+82-2-1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-blue-600 mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        123 Teheran-ro, Gangnam-gu
                        <br />
                        Seoul, South Korea
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 transition-colors">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">✉️</div>
                    <h4 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-900 to-indigo-800 rounded-2xl p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            HanLetter values your feedback and suggestions. Help us create better content and improve our service for
            the Korean diaspora and culture enthusiasts worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="mailto:contact@hanletter.com">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 transition-colors">Share Your Ideas</Button>
            </Link>
            <Link href="/archive">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 transition-colors"
              >
                Explore Articles
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">HanLetter</h3>
            <p className="text-gray-400 mb-6">Your gateway to Korean news and culture</p>
            <div className="flex justify-center space-x-8 text-sm mb-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
            <p className="text-gray-500 text-sm">© 2025 HanLetter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
