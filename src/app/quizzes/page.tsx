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
      color: "bg-gradient-to-r from-blue-100 to-purple-100"
    },
    {
      id: "silver-gold",
      title: "Silver vs. Gold Quiz",
      description: "Determine whether you look better in silver or gold jewelry based on your skin undertones and wardrobe tones.",
      icon: "✨",
      color: "bg-gradient-to-r from-yellow-100 to-amber-100"
    },
    {
      id: "makeup-style",
      title: "Makeup Style Quiz",
      description: "Match with the makeup style that best suits your features and personality—natural, soft glam, bold, and more.",
      icon: "💄",
      color: "bg-gradient-to-r from-pink-100 to-rose-100"
    },
    {
      id: "hair-color",
      title: "Hair Color Analysis",
      description: "Get suggestions for the most flattering hair colors based on skin tone, eye color, and personal vibe.",
      icon: "💇‍♀️",
      color: "bg-gradient-to-r from-orange-100 to-red-100"
    },
    {
      id: "hairstyle",
      title: "Hairstyle Analysis",
      description: "Find hairstyles that go best with both your face shape and current outfit or occasion.",
      icon: "💁‍♀️",
      color: "bg-gradient-to-r from-green-100 to-teal-100"
    }
  ]

  return (
    <main>
      <Header />
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6">
              Style Analysis Quizzes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take our interactive quizzes to discover personalized style recommendations that make you glow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quizzes/${quiz.id}`}
                className={`${quiz.color} rounded-xl p-8 shadow-sm hover:shadow-lg transition group`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{quiz.icon}</span>
                  <h2 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors">{quiz.title}</h2>
                </div>
                <p className="text-gray-600 mb-4">{quiz.description}</p>
                <div className="flex justify-end">
                  <span className="inline-flex items-center text-primary font-medium group-hover:underline">
                    Start Quiz
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 