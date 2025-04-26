import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-display font-bold text-primary">GlowGirl.AI</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/quizzes" className="text-dark hover:text-primary transition">
            Quizzes
          </Link>
          <Link href="/reviews" className="text-dark hover:text-primary transition">
            Reviews
          </Link>
          <Link href="/suggestions" className="text-dark hover:text-primary transition">
            Suggestions
          </Link>
          <Link href="/issues" className="text-dark hover:text-primary transition">
            Report Issues
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition">
            Sign In
          </button>
          <button className="md:hidden">
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