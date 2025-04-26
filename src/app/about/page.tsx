import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function About() {
  const teamMembers = [
    {
      name: "Alexandra Chen",
      role: "Founder & Color Analysis Expert",
      bio: "Alexandra has 10+ years of experience in color analysis and styling. She created GlowGirl.AI to make personalized style advice accessible to everyone.",
      avatar: "👩‍💼"
    },
    {
      name: "Maya Williams",
      role: "Makeup Artist & Content Creator",
      bio: "Former celebrity makeup artist with a passion for helping people find makeup styles that enhance their natural beauty.",
      avatar: "👩‍🎨"
    },
    {
      name: "Dr. Sophia Rodriguez",
      role: "Dermatologist & Skincare Advisor",
      bio: "Board-certified dermatologist who ensures all our recommendations are skin-friendly and scientifically sound.",
      avatar: "👩‍⚕️"
    },
    {
      name: "Kai Johnson",
      role: "AI & Technology Lead",
      bio: "AI expert who develops the algorithms powering our personalized recommendations and analysis tools.",
      avatar: "👨‍💻"
    }
  ]

  const values = [
    {
      title: "Inclusivity",
      description: "We create tools and recommendations for people of all skin tones, hair types, and personal styles.",
      icon: "🌈"
    },
    {
      title: "Self-Expression",
      description: "We believe beauty is about expressing your unique self, not conforming to trends.",
      icon: "✨"
    },
    {
      title: "Empowerment",
      description: "Our goal is to empower you with knowledge about what works for you personally.",
      icon: "💪"
    },
    {
      title: "Sustainability",
      description: "We encourage building a thoughtful wardrobe of pieces that truly work for you.",
      icon: "🌱"
    }
  ]

  return (
    <main>
      <Header />
      
      <section className="py-16 md:py-24 bg-gradient-to-br from-light to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              At GlowGirl.AI, we believe everyone deserves to feel confident in their own skin. 
              Our mission is to help people discover what truly makes them glow by providing 
              personalized style guidance based on their unique natural features.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              Whether you're looking to find your perfect color palette, ideal makeup style, or most 
              flattering hairstyle, our interactive tools and expert-backed analysis will guide you 
              toward choices that enhance your natural beauty.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-dark mb-2 text-center">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center">
              The principles that guide everything we do
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-4">{value.icon}</span>
                    <h3 className="text-xl font-bold text-dark">{value.title}</h3>
                  </div>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-dark mb-2 text-center">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 mb-12 text-center">
              The experts behind GlowGirl.AI
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center text-4xl mr-4">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-dark">{member.name}</h3>
                      <p className="text-primary">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-dark mb-6">
              Ready to Discover What Makes You Glow?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Take one of our interactive quizzes and get personalized recommendations tailored to your natural features.
            </p>
            <Link 
              href="/quizzes" 
              className="inline-block bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium text-center"
            >
              Take a Quiz
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
} 