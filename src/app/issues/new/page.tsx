import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FeedbackForm from '@/components/FeedbackForm'

export default function NewIssue() {
  const issueCategories = [
    {
      id: "technical",
      title: "Technical Issues"
    },
    {
      id: "content",
      title: "Content Issues"
    },
    {
      id: "accessibility",
      title: "Accessibility"
    },
    {
      id: "user-interface",
      title: "User Interface"
    },
    {
      id: "other",
      title: "Other Issues"
    }
  ]

  const handleSubmit = (data: any) => {
    // This would connect to your backend in a real implementation
    console.log('Submitted issue:', data)
    // Redirect would happen here after successful submission
  }

  return (
    <main>
      <Header />
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href="/issues" className="text-primary hover:underline inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Issues
              </Link>
            </div>
            
            <FeedbackForm 
              type="issue"
              categories={issueCategories}
              onSubmit={handleSubmit}
            />
            
            <div className="mt-8 bg-blue-50 p-4 rounded-md">
              <h3 className="font-bold text-blue-700 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tips for Reporting Issues
              </h3>
              <ul className="list-disc pl-5 text-blue-700 space-y-1">
                <li>Be as specific as possible about what went wrong</li>
                <li>Include which device and browser you were using</li>
                <li>Mention if the issue can be reproduced consistently</li>
                <li>Screenshots or screen recordings are very helpful if possible</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 