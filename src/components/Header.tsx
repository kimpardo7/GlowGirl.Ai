import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <span className="text-2xl mr-1">✨</span>
          <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 group-hover:opacity-80 transition-opacity">
            GlowGirl.AI
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/quizzes" className="text-slate-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-500 hover:to-violet-500 transition-all">
            Quizzes
          </Link>
          <Link href="/reviews" className="text-slate-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-500 hover:to-violet-500 transition-all">
            Reviews
          </Link>
          <Link href="/suggestions" className="text-slate-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-500 hover:to-violet-500 transition-all">
            Suggestions
          </Link>
          <Link href="/issues" className="text-slate-700 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-rose-500 hover:to-violet-500 transition-all">
            Report Issues
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
            <span className="relative z-10">Sign In</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
          <button className="md:hidden text-slate-700 hover:text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header 