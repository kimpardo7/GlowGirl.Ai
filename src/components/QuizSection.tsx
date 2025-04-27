import React from 'react'
import Link from 'next/link'

const QuizSection = () => {
  const quizzes = [
    {
      title: "Seasonal Color Analysis",
      description: "Identify your correct seasonal color palette—Spring, Summer, Autumn, or Winter—based on undertones and natural features.",
      icon: "🎨",
      link: "/quizzes/seasonal-color",
      color: "bg-gradient-to-r from-blue-50 to-purple-100",
      border: "border-purple-200",
      hoverEffect: "hover:shadow-purple-200/40"
    },
    {
      title: "Silver vs. Gold Quiz",
      description: "Determine whether you look better in silver or gold jewelry based on your skin undertones and wardrobe tones.",
      icon: "✨",
      link: "/quizzes/silver-gold",
      color: "bg-gradient-to-r from-yellow-50 to-amber-100",
      border: "border-amber-200",
      hoverEffect: "hover:shadow-amber-200/40"
    },
    {
      title: "Style Aesthetic Quiz",
      description: "Discover your personal style aesthetic—from cottagecore to y2k, minimalist to streetwear—based on your preferences.",
      icon: "👗",
      link: "/quizzes/fashion-style",
      color: "bg-gradient-to-r from-indigo-50 to-blue-100",
      border: "border-blue-200",
      hoverEffect: "hover:shadow-blue-200/40"
    },
    {
      title: "Makeup Style Quiz",
      description: "Match with the makeup style that best suits your features and personality—natural, soft glam, bold, and more.",
      icon: "💄",
      link: "/quizzes/makeup-style",
      color: "bg-gradient-to-r from-pink-50 to-rose-100",
      border: "border-rose-200",
      hoverEffect: "hover:shadow-rose-200/40"
    },
    {
      title: "Hair Color Analysis",
      description: "Get suggestions for the most flattering hair colors based on skin tone, eye color, and personal vibe.",
      icon: "💇‍♀️",
      link: "/quizzes/hair-color",
      color: "bg-gradient-to-r from-orange-50 to-red-100",
      border: "border-red-200",
      hoverEffect: "hover:shadow-red-200/40"
    },
    {
      title: "Hairstyle Analysis",
      description: "Find hairstyles that go best with both your face shape and current outfit or occasion.",
      icon: "💁‍♀️",
      link: "/quizzes/hairstyle",
      color: "bg-gradient-to-r from-green-50 to-teal-100",
      border: "border-teal-200",
      hoverEffect: "hover:shadow-teal-200/40"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full pointer-events-none overflow-hidden">
        <div className="absolute left-10 top-10 opacity-20">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-rose-300 to-violet-300 blur-3xl"></div>
        </div>
        <div className="absolute right-10 bottom-10 opacity-20">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-amber-300 to-emerald-300 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-3">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500">
            Style & Beauty Analysis Quizzes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our interactive quizzes to discover personalized style recommendations that make you glow.
          </p>
          <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-violet-300 via-rose-300 to-amber-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <Link 
              key={index}
              href={quiz.link}
              className={`${quiz.color} rounded-xl p-7 shadow-sm border ${quiz.border} ${quiz.hoverEffect} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group overflow-hidden relative`}
            >
              <div className="flex items-start relative z-10">
                <div className="relative overflow-hidden rounded-full w-14 h-14 mr-4 flex items-center justify-center bg-white/70 backdrop-blur-sm border border-white shadow-sm">
                  <span className="text-3xl">{quiz.icon}</span>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white opacity-50 animate-pulse"></div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-slate-700 mb-2 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r from-rose-500 to-violet-500 transition-all">{quiz.title}</h3>
                  <p className="text-gray-600">{quiz.description}</p>
                </div>
              </div>
              
              <div className="mt-5 flex justify-end">
                <span className="text-slate-700 font-medium inline-flex items-center border-b border-slate-300 pb-1 transition-all group-hover:border-slate-700">
                  Take Quiz
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  )
}

export default QuizSection 