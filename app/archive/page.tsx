"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, SortAsc, SortDesc, Grid, List, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import articlesData from "@/data/articles.json"

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedTag, setSelectedTag] = useState("all")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const years = useMemo(() => {
    const yearSet = new Set(articlesData.map((article) => new Date(article.date).getFullYear()))
    return Array.from(yearSet).sort((a, b) => b - a)
  }, [])

  const allTags = useMemo(() => {
    const tagSet = new Set(articlesData.flatMap((article) => article.tags))
    return Array.from(tagSet).sort()
  }, [])

  const filteredArticles = useMemo(() => {
    const filtered = articlesData.filter((article) => {
      const matchesSearch =
        searchTerm === "" ||
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesYear = selectedYear === "all" || new Date(article.date).getFullYear().toString() === selectedYear
      const matchesTag = selectedTag === "all" || article.tags.includes(selectedTag)

      return matchesSearch && matchesYear && matchesTag
    })

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [searchTerm, selectedYear, selectedTag, sortOrder])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedYear("all")
    setSelectedTag("all")
    setSortOrder("newest")
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
              <Link href="/" className="text-slate-700 hover:text-violet-700 font-body transition-colors">
                Home
              </Link>
              <Link href="/archive" className="text-violet-700 font-body font-medium">
                Archive
              </Link>
              <Link href="/about" className="text-slate-700 hover:text-violet-700 font-body transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-display text-slate-900 mb-2">News Archive</h1>
          <p className="text-slate-600 font-body">Browse our complete collection of Korean news and analysis</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-300 focus:border-violet-500"
              />
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2 bg-white focus:border-violet-500"
            >
              <option value="all">All Years</option>
              {years.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2 bg-white focus:border-violet-500"
            >
              <option value="all">All Categories</option>
              {allTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "newest" ? "oldest" : "newest")}
                className="flex-1"
              >
                {sortOrder === "newest" ? <SortDesc className="h-4 w-4 mr-1" /> : <SortAsc className="h-4 w-4 mr-1" />}
                {sortOrder === "newest" ? "Newest" : "Oldest"}
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4 mr-1" />
                List
              </Button>
            </div>

            {(searchTerm || selectedYear !== "all" || selectedTag !== "all") && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-slate-600 font-body">
            Showing {filteredArticles.length} of {articlesData.length} articles
          </p>
          {searchTerm && <p className="text-sm text-violet-600">Results for "{searchTerm}"</p>}
        </div>

        {/* Articles Display */}
        {filteredArticles.length > 0 ? (
          <div className={viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className={`bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : ""}`}>
                  <Image
                    src={article.coverImage || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={250}
                    className={`object-cover ${viewMode === "list" ? "w-full h-full" : "w-full h-48"}`}
                  />
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-center text-xs text-slate-500 mb-2">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <User className="h-3 w-3 mr-1" />
                    <span>{article.author}</span>
                  </div>
                  <h3 className="text-lg font-display text-slate-900 mb-2 leading-tight hover:text-violet-700 transition-colors">
                    <Link href={`/article/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="text-slate-600 text-sm mb-3 font-body leading-relaxed">
                    {viewMode === "list" ? article.excerpt : article.excerpt.substring(0, 120) + "..."}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded cursor-pointer hover:bg-violet-100 hover:text-violet-700 transition-colors"
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-4">
              <Newspaper className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-display text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600 font-body mb-6">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters}>Clear All Filters</Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-violet-600 to-purple-700 rounded flex items-center justify-center">
                <Newspaper className="w-3 h-3 text-white" />
              </div>
              <span className="font-display">HanLetter</span>
            </div>
            <p className="text-slate-400 font-body mb-6">Your trusted source for Korean news and analysis</p>
            <div className="flex justify-center space-x-8 text-sm mb-6">
              <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
            <p className="text-slate-500 text-sm font-body">© 2025 HanLetter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
