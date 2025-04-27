import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-white to-rose-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 w-full pointer-events-none">
        <div className="absolute right-0 opacity-20">
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-rose-300 to-purple-300 blur-3xl"></div>
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-amber-300 to-pink-300 blur-3xl ml-20 -mt-10"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 relative z-10">
            <div className="inline-block mb-3">
              <span className="text-2xl">✨</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Discover What Makes You <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500">Glow</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Personalized style guidance through interactive tools and expert-backed analysis.
              Find clothing, hairstyles, and makeup that suit your natural features.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/quizzes" 
                className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 text-white px-8 py-3 rounded-full font-medium text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <span className="relative z-10">Take a Quiz</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Link>
              
              <Link 
                href="/about" 
                className="relative overflow-hidden border border-slate-300 text-slate-700 hover:text-slate-900 px-8 py-3 rounded-full font-medium text-center transition-all duration-300 hover:border-slate-400 hover:shadow hover:-translate-y-1"
              >
                Learn More
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-50"></div>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative w-full h-[400px] md:h-[500px]">
              {/* This would be replaced with an actual image in production */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-amber-100/50 to-violet-100/50 rounded-2xl shadow-xl backdrop-blur-sm border border-white/50 overflow-hidden">
                <div className="absolute inset-0 bg-white/30"></div>
                <div className="absolute -inset-1 bg-gradient-to-tr from-transparent via-white/10 to-white/30 animate-pulse opacity-80"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-5xl mb-2 block">✨👸✨</span>
                    <span className="text-xl text-slate-600 font-medium">Hero Image Placeholder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 