"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Bookmark,
  Heart,
  MessageCircle,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import articlesData from "@/data/articles.json"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(42)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const article = articlesData.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = articlesData
    .filter((a) => a.id !== article.id && a.tags.some((tag) => article.tags.includes(tag)))
    .slice(0, 3)

  const estimatedReadTime = Math.ceil(article.content.split(" ").length / 200)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleShare = async (platform: string) => {
    const url = window.location.href
    const title = article.title

    switch (platform) {
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
        break
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
          "_blank",
        )
        break
      case "copy":
        await navigator.clipboard.writeText(url)
        alert("Link copied to clipboard!")
        break
    }
    setShowShareMenu(false)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-blue-600 transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-sm sticky top-1 z-40">
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
              <Link href="/about" className="text-gray-700 hover:text-blue-900 font-medium transition-colors">
                About
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/archive">
            <Button variant="ghost" className="text-blue-900 hover:text-blue-800 hover:bg-blue-50 transition-all">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Archive
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="mb-12">
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{article.date}</span>
              <User className="h-4 w-4 ml-4 mr-1" />
              <span>{article.author}</span>
              <Clock className="h-4 w-4 ml-4 mr-1" />
              <span>{estimatedReadTime} min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">{article.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Actions */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`transition-all ${isLiked ? "text-red-600 border-red-600" : ""}`}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`} />
                {likes}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`transition-all ${isBookmarked ? "text-blue-600 border-blue-600" : ""}`}
              >
                <Bookmark className={`h-4 w-4 mr-1 ${isBookmarked ? "fill-current" : ""}`} />
                {isBookmarked ? "Saved" : "Save"}
              </Button>
              <div className="relative">
                <Button variant="outline" size="sm" onClick={() => setShowShareMenu(!showShareMenu)}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                {showShareMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-10">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare("facebook")}
                      className="w-full justify-start"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare("twitter")}
                      className="w-full justify-start"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare("copy")}
                      className="w-full justify-start"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="mb-8 relative overflow-hidden rounded-xl">
            <Image
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={500}
              className="w-full h-64 md:h-96 object-cover shadow-2xl transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Article Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleLike}
                  className={`transition-all ${isLiked ? "text-red-600 border-red-600 bg-red-50" : ""}`}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
                  {isLiked ? "Liked" : "Like"} ({likes})
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
              <div className="text-sm text-gray-500">Share this article with your network</div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <article
                  key={relatedArticle.id}
                  className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-500 transform hover:-translate-y-1 group"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={relatedArticle.coverImage || "/placeholder.svg"}
                      alt={relatedArticle.title}
                      width={300}
                      height={200}
                      className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-900 transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{relatedArticle.excerpt.substring(0, 100)}...</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {relatedArticle.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/article/${relatedArticle.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group-hover:bg-blue-900 group-hover:text-white transition-all"
                      >
                        Read More
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
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
