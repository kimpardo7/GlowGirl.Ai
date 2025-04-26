import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function SeasonalColorQuiz() {
  return (
    <main>
      <Header />
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-display font-bold text-dark mb-4">
                Seasonal Color Analysis
              </h1>
              <p className="text-lg text-gray-600">
                Discover which seasonal color palette best suits your natural features and helps you glow!
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-dark mb-6">
                  How the Quiz Works
                </h2>
                <p className="text-gray-600 mb-4">
                  This quiz analyzes your natural coloring—skin tone, hair color, and eye color—to determine 
                  which seasonal color palette will most flatter your appearance.
                </p>
                <p className="text-gray-600 mb-4">
                  You'll answer a series of questions about your features, and we'll use color theory to 
                  match you with one of the four seasonal palettes:
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-500 mb-2">Winter</h3>
                    <p className="text-sm">Cool, deep colors with high contrast</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-bold text-yellow-600 mb-2">Spring</h3>
                    <p className="text-sm">Warm, bright colors with medium contrast</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-bold text-purple-500 mb-2">Summer</h3>
                    <p className="text-sm">Cool, soft colors with low contrast</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-bold text-orange-600 mb-2">Autumn</h3>
                    <p className="text-sm">Warm, muted colors with medium-low contrast</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-dark mb-6">
                  What You'll Need
                </h2>
                <ul className="list-disc pl-5 mb-6 text-gray-600 space-y-2">
                  <li>Good natural lighting (daylight is best)</li>
                  <li>No makeup (or very minimal makeup)</li>
                  <li>Your natural hair color visible (if possible)</li>
                  <li>A mirror to observe your features</li>
                  <li>15-20 minutes of uninterrupted time</li>
                </ul>
              </div>

              <div className="mt-10 flex justify-center">
                <Link 
                  href="/quizzes/seasonal-color/start" 
                  className="bg-primary hover:bg-opacity-90 text-white px-10 py-3 rounded-full font-medium text-center inline-flex items-center"
                >
                  Start Quiz
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 