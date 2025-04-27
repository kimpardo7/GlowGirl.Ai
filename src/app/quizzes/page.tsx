import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Quizzes() {
  const quizzes = [
    {
      id: "seasonal-color",
      title: "Seasonal Color Analysis",
      description: "Identify your correct seasonal color palette—Spring, Summer, Autumn, or Winter—based on undertones and natural features.",
      icon: "🎨",
      color: "bg-gradient-to-r from-blue-50 to-purple-100",
      border: "border-purple-200",
      hoverEffect: "hover:shadow-purple-200/40"
    },
    {
      id: "fashion-style",
      title: "Fashion Style Quiz",
      description: "Discover your fashion aesthetic—from Cottagecore to Minimalist and everything in between.",
      icon: "👗",
      color: "bg-gradient-to-r from-indigo-50 to-blue-100",
      border: "border-blue-200",
      hoverEffect: "hover:shadow-blue-200/40"
    },
    {
      id: "silver-gold",
      title: "Silver vs. Gold Quiz",
      description: "Determine whether you look better in silver or gold jewelry based on your skin undertones and wardrobe tones.",
      icon: "✨",
      color: "bg-gradient-to-r from-yellow-50 to-amber-100",
      border: "border-amber-200",
      hoverEffect: "hover:shadow-amber-200/40"
    },
    {
      id: "makeup-style",
      title: "Makeup Style Quiz",
      description: "Match with the makeup style that best suits your features and personality—natural, soft glam, bold, and more.",
      icon: "💄",
      color: "bg-gradient-to-r from-pink-50 to-rose-100",
      border: "border-rose-200",
      hoverEffect: "hover:shadow-rose-200/40"
    },
    {
      id: "hair-color",
      title: "Hair Color Analysis",
      description: "Get suggestions for the most flattering hair colors based on skin tone, eye color, and personal vibe.",
      icon: "💇‍♀️",
      color: "bg-gradient-to-r from-orange-50 to-red-100",
      border: "border-red-200",
      hoverEffect: "hover:shadow-red-200/40"
    },
    {
      id: "hairstyle",
      title: "Hairstyle Analysis",
      description: "Find hairstyles that go best with both your face shape and current outfit or occasion.",
      icon: "💁‍♀️",
      color: "bg-gradient-to-r from-green-50 to-teal-100",
      border: "border-teal-200",
      hoverEffect: "hover:shadow-teal-200/40"
    }
  ]

  return (
    <main>
      <Header />
      <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden">
          <div className="absolute left-10 top-20 opacity-20">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-rose-300 to-violet-300 blur-3xl"></div>
          </div>
          <div className="absolute right-20 bottom-20 opacity-20">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-amber-300 to-emerald-300 blur-3xl"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500">
              Style Analysis Quizzes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our interactive quizzes to discover personalized style recommendations that make you glow.
            </p>
            <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quizzes/${quiz.id}`}
                className={`${quiz.color} border ${quiz.border} rounded-xl p-8 shadow-sm ${quiz.hoverEffect} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden`}
              >
                <div className="flex items-center mb-4">
                  <div className="relative overflow-hidden rounded-full w-14 h-14 mr-4 flex items-center justify-center bg-white/70 backdrop-blur-sm border border-white shadow-sm">
                    <span className="text-3xl">{quiz.icon}</span>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white opacity-50 animate-pulse"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-700 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-violet-500 transition-all">{quiz.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{quiz.description}</p>
                <div className="flex justify-end">
                  <span className="inline-flex items-center text-slate-700 font-medium border-b border-slate-300 pb-1 transition-all group-hover:border-slate-700">
                    Start Quiz
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
                
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-gradient-to-br from-white/5 to-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="inline-block relative">
              <div className="w-48 h-1 mx-auto bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
              <span className="text-xl text-slate-400 absolute top-3 left-1/2 transform -translate-x-1/2">✨</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 