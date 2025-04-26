import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-light to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-dark mb-6">
              Discover What Makes You <span className="text-primary">Glow</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Personalized style guidance through interactive tools and expert-backed analysis.
              Find clothing, hairstyles, and makeup that suit your natural features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quizzes" className="bg-primary hover:bg-opacity-90 text-white px-8 py-3 rounded-full font-medium text-center">
                Take a Quiz
              </Link>
              <Link href="/about" className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium text-center transition">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <div className="relative w-full h-[400px] md:h-[500px]">
              {/* This would be replaced with an actual image in production */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl flex items-center justify-center">
                <span className="text-xl text-gray-500">Hero Image Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 