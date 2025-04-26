import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FeedbackForm from '@/components/FeedbackForm'

export default function NewSuggestion() {
  const suggestionCategories = [
    {
      id: "quiz-ideas",
      title: "Quiz Ideas"
    },
    {
      id: "features",
      title: "Feature Requests"
    },
    {
      id: "user-experience",
      title: "User Experience"
    },
    {
      id: "content",
      title: "Content Improvements"
    }
  ]

  const handleSubmit = (data: any) => {
    // This would connect to your backend in a real implementation
    console.log('Submitted suggestion:', data)
    // Redirect would happen here after successful submission
  }

  return (
    <main>
      <Header />
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href="/suggestions" className="text-primary hover:underline inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Suggestions
              </Link>
            </div>
            
            <FeedbackForm 
              type="suggestion"
              categories={suggestionCategories}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 