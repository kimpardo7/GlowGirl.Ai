import React from 'react'
import Link from 'next/link'

const FeatureSection = () => {
  const features = [
    {
      title: "MAKEUP REMOVER",
      subtitle: "Reviews & Feedback",
      description: "Share honest feedback on quizzes, suggestions, and analysis results. Help our community glow better!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      link: "/reviews"
    },
    {
      title: "MAKEUP",
      subtitle: "Suggestions & Feature Requests",
      description: "Suggest new features, quizzes, or improvements. Help us add more glow to the app!",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      link: "/suggestions"
    },
    {
      title: "SKINCARE",
      subtitle: "Issues & Bug Reports",
      description: "Report anything that's not working right. Help keep everything smooth and healthy behind the scenes.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      link: "/issues"
    }
  ]

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">
            Core Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers several ways to interact and help each other glow better.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md p-8 transition-transform hover:scale-105"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-primary mb-1">{feature.title}</h3>
              <h4 className="text-lg text-dark mb-4">{feature.subtitle}</h4>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Link 
                href={feature.link} 
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection 