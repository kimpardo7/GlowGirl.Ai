import React from 'react'
import Link from 'next/link'

const FeatureSection = () => {
  const features = [
    {
      title: "MAKEUP REMOVER",
      subtitle: "Reviews & Feedback",
      description: "Share honest feedback on quizzes, suggestions, and analysis results. Help our community glow better!",
      icon: "✨",
      emoji: "💁‍♀️",
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-400",
      link: "/reviews"
    },
    {
      title: "MAKEUP",
      subtitle: "Suggestions & Feature Requests",
      description: "Suggest new features, quizzes, or improvements. Help us add more glow to the app!",
      icon: "💫",
      emoji: "💄",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-400",
      link: "/suggestions"
    },
    {
      title: "SKINCARE",
      subtitle: "Issues & Bug Reports",
      description: "Report anything that's not working right. Help keep everything smooth and healthy behind the scenes.",
      icon: "🌟",
      emoji: "🧴",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-400",
      link: "/issues"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="text-3xl">✨</span>
            <span className="text-3xl mx-2">💖</span>
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-pink-500 mb-4 animate-bounce">
            Cutie Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers several adorable ways to interact and help each other glow better!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.color} rounded-2xl border-2 p-8 transition-all hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className={`text-4xl ${feature.iconColor} animate-pulse`}>
                  {feature.icon}
                </div>
                <div className="text-4xl">
                  {feature.emoji}
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">{feature.title}</h3>
              <h4 className="text-lg text-dark mb-4">{feature.subtitle}</h4>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Link 
                href={feature.link} 
                className="text-primary font-medium rounded-full px-4 py-2 bg-white shadow hover:shadow-md transition-shadow inline-flex items-center"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-block animate-bounce">
            <span className="text-2xl">💅</span>
            <span className="text-2xl mx-2">👄</span>
            <span className="text-2xl">👸</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeatureSection 