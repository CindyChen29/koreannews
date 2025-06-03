"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, Clock, ArrowRight, Newspaper, Globe, TrendingUp, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import articlesData from "@/data/articles.json"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const featuredArticle = articlesData[0]
  const recentArticles = articlesData.slice(1)

  const categories = useMemo(() => {
    const cats = new Set(articlesData.flatMap((article) => article.tags))
    return ["all", ...Array.from(cats)]
  }, [])

  const filteredArticles = useMemo(() => {
    let filtered = recentArticles

    if (searchTerm) {
      filtered = articlesData.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.tags.includes(selectedCategory))
    }

    return filtered
  }, [searchTerm, selectedCategory, recentArticles])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-slate-200 rounded-full animate-spin border-t-violet-600 mx-auto mb-4"></div>
          <p className="text-slate-600 font-body">Loading HanLetter</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="text-xl font-display text-slate-900">HanLetter</span>
                <p className="text-xs text-slate-500 font-body">Korean News & Analysis</p>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              {["Home", "Archive", "About"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-slate-700 hover:text-violet-700 font-body transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Breaking News Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-3">
            <span className="bg-white text-red-600 px-2 py-1 rounded text-xs font-medium">BREAKING</span>
            <p className="text-sm font-body">Latest updates on Korean tech industry developments</p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="bg-slate-50 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 border-slate-300 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Filter className="h-5 w-5 text-slate-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-slate-300 rounded-md px-4 py-3 bg-white focus:border-violet-500 focus:ring-violet-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {(searchTerm || selectedCategory !== "all") && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                {filteredArticles.length} articles found
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                }}
                className="text-slate-500 hover:text-slate-700"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Featured Article */}
        {!searchTerm && selectedCategory === "all" && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <TrendingUp className="h-5 w-5 text-violet-600 mr-2" />
              <h2 className="text-2xl font-display text-slate-900">Top Story</h2>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="md:w-2/3">
                  <Image
                    src={featuredArticle.coverImage || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    width={800}
                    height={400}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>
                <div className="md:w-1/3 p-6">
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{featuredArticle.date}</span>
                    <span className="mx-2">•</span>
                    <User className="h-4 w-4 mr-1" />
                    <span>{featuredArticle.author}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-display text-slate-900 mb-3 leading-tight">
                    {featuredArticle.title}
                  </h3>

                  <p className="text-slate-600 mb-4 font-body leading-relaxed">{featuredArticle.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredArticle.tags.map((tag) => (
                      <span key={tag} className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/article/${featuredArticle.slug}`}>
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display text-slate-900">
              {searchTerm || selectedCategory !== "all" ? "Search Results" : "Latest News"}
            </h2>
            <div className="flex items-center text-sm text-slate-500">
              <Globe className="h-4 w-4 mr-1" />
              <span>Updated {new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
              <article
                key={article.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <Image
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  width={400}
                  height={240}
                  className="w-full h-48 object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center text-xs text-slate-500 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <Clock className="h-3 w-3 mr-1" />
                    <span>5 min read</span>
                  </div>

                  <h3 className="text-lg font-display text-slate-900 mb-2 leading-tight hover:text-violet-700 transition-colors">
                    <Link href={`/article/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="text-slate-600 text-sm mb-3 font-body leading-relaxed">
                    {article.excerpt.substring(0, 100)}...
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">{article.author}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-4">
                <Newspaper className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-display text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-600 font-body">Try adjusting your search terms or filters</p>
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section className="mt-16 py-8 bg-slate-50 rounded-lg">
          <div className="px-6">
            <h2 className="text-xl font-display text-slate-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(1).map((category) => {
                const categoryCount = articlesData.filter((article) => article.tags.includes(category)).length
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="text-left p-4 bg-white border border-slate-200 rounded-lg hover:border-violet-300 hover:bg-violet-50 transition-colors"
                  >
                    <h3 className="font-display text-slate-900 mb-1">{category}</h3>
                    <p className="text-sm text-slate-500">{categoryCount} articles</p>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-display mb-4">Stay Informed</h2>
            <p className="font-body mb-6 opacity-90">
              Get the latest Korean news and analysis delivered to your inbox weekly
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
              <Button className="bg-white text-violet-700 hover:bg-slate-100">Subscribe</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-purple-700 rounded flex items-center justify-center">
                  <Newspaper className="w-3 h-3 text-white" />
                </div>
                <span className="font-display">HanLetter</span>
              </div>
              <p className="text-slate-400 text-sm font-body">Your trusted source for Korean news and analysis</p>
            </div>

            <div>
              <h3 className="font-display mb-3">Categories</h3>
              <ul className="space-y-2 text-sm">
                {categories.slice(1, 5).map((category) => (
                  <li key={category}>
                    <Link href={`/?category=${category}`} className="text-slate-400 hover:text-white transition-colors">
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-slate-400 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm font-body">© 2025 HanLetter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
