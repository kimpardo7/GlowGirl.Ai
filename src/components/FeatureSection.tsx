import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const FeatureSection = () => {
  const features = [
    {
      title: "MAKEUP REMOVER",
      subtitle: "Reviews & Feedback",
      description: "Share honest feedback on quizzes, suggestions, and analysis results. Help our community glow better!",
      icon: "✨",
      emoji: "💎",
      color: "bg-gradient-to-br from-rose-50 to-pink-100",
      borderColor: "border-rose-200",
      iconColor: "text-rose-400",
      hoverEffect: "hover:shadow-rose-200/50",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=120&auto=format&fit=crop",
      link: "/reviews"
    },
    {
      title: "MAKEUP",
      subtitle: "Suggestions & Feature Requests",
      description: "Suggest new features, quizzes, or improvements. Help us add more glow to the app!",
      icon: "✨",
      emoji: "💫",
      color: "bg-gradient-to-br from-amber-50 to-yellow-100",
      borderColor: "border-amber-200",
      iconColor: "text-amber-400",
      hoverEffect: "hover:shadow-amber-200/50",
      image: "https://images.unsplash.com/photo-1631214548558-c93459a9b01e?q=80&w=120&auto=format&fit=crop",
      link: "/suggestions"
    },
    {
      title: "SKINCARE",
      subtitle: "Issues & Bug Reports",
      description: "Report anything that's not working right. Help keep everything smooth and healthy behind the scenes.",
      icon: "✨",
      emoji: "✨",
      color: "bg-gradient-to-br from-violet-50 to-purple-100",
      borderColor: "border-violet-200",
      iconColor: "text-violet-400",
      hoverEffect: "hover:shadow-violet-200/50",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=120&auto=format&fit=crop",
      link: "/issues"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-full">
            <div className="flex justify-center opacity-20">
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-rose-300 to-purple-300 blur-3xl"></div>
              <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-amber-300 to-pink-300 blur-3xl -ml-10"></div>
            </div>
          </div>
          
          <div className="inline-block mb-3">
            <span className="text-2xl">✨</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500">
            Glow Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers brilliantly crafted ways to interact and help each other glow better.
          </p>
          <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${feature.color} rounded-lg border ${feature.borderColor} p-8 transition-all duration-500 
                          shadow-sm ${feature.hoverEffect} hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="relative overflow-hidden rounded-full w-16 h-16 mb-8 mx-auto p-3 bg-white/70 backdrop-blur-sm border border-white shadow-sm">
                <div className={`text-2xl absolute inset-0 flex items-center justify-center ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white opacity-50 animate-pulse"></div>
              </div>

              <h3 className="text-xl font-bold text-slate-700 mb-1 text-center">{feature.title}</h3>
              <h4 className="text-lg text-slate-600 mb-4 text-center">{feature.subtitle}</h4>
              
              <div className="relative h-24 w-full mb-4 overflow-hidden rounded">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-2 right-2 text-2xl">
                  {feature.emoji}
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <Link 
                href={feature.link} 
                className="group text-slate-700 font-medium inline-flex items-center border-b border-slate-300 pb-1 transition-all hover:border-slate-700"
              >
                Discover more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
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

export default FeatureSection 