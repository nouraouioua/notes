import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Brain,
  Shield,
  Zap,
  Search,
  Sparkles,
  FileText,
  Tag,
  MessageSquare,
  ArrowRight,
  Check,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Leverage Google Gemini 2.0 to summarize, improve, and understand your notes like never before.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Real-time sync across devices with instant search. Your notes are always at your fingertips.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Enterprise-grade security with Row Level Security. Your data is encrypted and protected.'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Full-text search across all your notes. Find anything in milliseconds.'
    },
    {
      icon: Tag,
      title: 'Auto-Tagging',
      description: 'AI automatically generates relevant tags to keep your notes organized effortlessly.'
    },
    {
      icon: MessageSquare,
      title: 'Ask AI Anything',
      description: 'Query your entire knowledge base with natural language. Get instant answers.'
    }
  ]

  const useCases = [
    {
      title: 'For Students',
      description: 'Organize lecture notes, generate summaries, and ask questions about your study materials.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'For Professionals',
      description: 'Capture meeting notes, track projects, and quickly retrieve important information.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'For Researchers',
      description: 'Document findings, connect ideas, and search through vast amounts of research notes.',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Notes
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">How it Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
              <Link to="/auth" className="text-gray-600 hover:text-gray-900 transition">Sign In</Link>
              <Link
                to="/auth"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
              <a href="#features" className="block text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#how-it-works" className="block text-gray-600 hover:text-gray-900 transition">How it Works</a>
              <a href="#pricing" className="block text-gray-600 hover:text-gray-900 transition">Pricing</a>
              <Link to="/auth" className="block text-gray-600 hover:text-gray-900 transition">Sign In</Link>
              <Link
                to="/auth"
                className="block text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-70" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Powered by Google Gemini 2.0</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Your Notes,
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Supercharged by AI
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Write, organize, and discover insights in your notes with the power of artificial intelligence.
            Search smarter, write better, remember everything.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/auth"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Start Taking Smart Notes</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:shadow-lg transition-all"
            >
              See How It Works
            </a>
          </div>

          <div className="mt-12 text-sm text-gray-500">
            ✨ Free forever • No credit card required • 2 minute setup
          </div>
        </div>

        {/* Floating Cards Animation */}
        <div className="relative max-w-5xl mx-auto mt-20">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200 transform hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg" />
                <div>
                  <div className="h-3 w-32 bg-gray-200 rounded" />
                  <div className="h-2 w-24 bg-gray-100 rounded mt-2" />
                </div>
              </div>
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="space-y-3">
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-5/6" />
              <div className="h-3 bg-gray-100 rounded w-4/6" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features that make note-taking effortless and intelligent
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl hover:shadow-xl hover:border-purple-200 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Powerful, Intelligent
            </h2>
            <p className="text-xl text-gray-600">Get started in minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Create Notes</h3>
              <p className="text-gray-600">Write your thoughts, ideas, and information in a clean, distraction-free editor</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. AI Enhancement</h3>
              <p className="text-gray-600">Let AI summarize, tag, and improve your notes automatically</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Search & Discover</h3>
              <p className="text-gray-600">Find anything instantly and ask AI questions about your notes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for everyone
            </h2>
            <p className="text-xl text-gray-600">Whatever your use case, AI Notes has you covered</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl p-8 text-white group hover:scale-105 transition-transform"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient}`} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition" />
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-white/90">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">Start for free, upgrade when you need more</p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Unlimited notes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">AI features (100 requests/month)</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Full-text search</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Real-time sync</span>
                </li>
              </ul>
              <Link
                to="/auth"
                className="block w-full text-center px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">$9</span>
                <span className="text-white/80">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Unlimited AI requests</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Advanced semantic search</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-white" />
                  <span>Priority support</span>
                </li>
              </ul>
              <button
                disabled
                className="block w-full text-center px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold opacity-50 cursor-not-allowed"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to transform your note-taking?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join thousands of users who've already upgraded their productivity with AI Notes
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold">AI Notes</span>
              </div>
              <p className="text-sm">
                Intelligent note-taking powered by AI
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How it Works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/nouraouioua/notes" className="hover:text-white transition">Documentation</a></li>
                <li><a href="https://github.com/nouraouioua/notes" className="hover:text-white transition">GitHub</a></li>
                <li><a href="https://github.com/nouraouioua/notes/issues" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/nouraouioua/notes" className="hover:text-white transition">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="hover:text-white transition">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; 2025 AI Notes. Built with ❤️ using React, TypeScript, Supabase & Gemini AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
