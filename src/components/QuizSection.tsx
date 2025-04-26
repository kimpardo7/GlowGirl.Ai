import React from 'react'
import Link from 'next/link'

const QuizSection = () => {
  const quizzes = [
    {
      title: "Seasonal Color Analysis",
      description: "Identify your correct seasonal color palette—Spring, Summer, Autumn, or Winter—based on undertones and natural features.",
      icon: "🎨",
      link: "/quizzes/seasonal-color",
      color: "bg-gradient-to-r from-blue-100 to-purple-100"
    },
    {
      title: "Silver vs. Gold Quiz",
      description: "Determine whether you look better in silver or gold jewelry based on your skin undertones and wardrobe tones.",
      icon: "✨",
      link: "/quizzes/silver-gold",
      color: "bg-gradient-to-r from-yellow-100 to-amber-100"
    },
    {
      title: "Makeup Style Quiz",
      description: "Match with the makeup style that best suits your features and personality—natural, soft glam, bold, and more.",
      icon: "💄",
      link: "/quizzes/makeup-style",
      color: "bg-gradient-to-r from-pink-100 to-rose-100"
    },
    {
      title: "Hair Color Analysis",
      description: "Get suggestions for the most flattering hair colors based on skin tone, eye color, and personal vibe.",
      icon: "💇‍♀️",
      link: "/quizzes/hair-color",
      color: "bg-gradient-to-r from-orange-100 to-red-100"
    },
    {
      title: "Hairstyle Analysis",
      description: "Find hairstyles that go best with both your face shape and current outfit or occasion.",
      icon: "💁‍♀️",
      link: "/quizzes/hairstyle",
      color: "bg-gradient-to-r from-green-100 to-teal-100"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">
            Style & Beauty Analysis Quizzes
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take our interactive quizzes to discover personalized style recommendations that make you glow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <Link 
              key={index}
              href={quiz.link}
              className={`${quiz.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group`}
            >
              <div className="flex items-start">
                <span className="text-4xl mr-4">{quiz.icon}</span>
                <div>
                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">{quiz.title}</h3>
                  <p className="text-gray-600">{quiz.description}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <span className="text-primary font-medium inline-flex items-center group-hover:underline">
                  Take Quiz
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuizSection 