import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Suggestions() {
  const suggestionCategories = [
    {
      id: "quiz-ideas",
      title: "Quiz Ideas",
      description: "Suggest new quiz types or improvements to existing quizzes.",
      icon: "🤔"
    },
    {
      id: "features",
      title: "Feature Requests",
      description: "Have an idea for a new feature that would help users glow better?",
      icon: "💡"
    },
    {
      id: "user-experience",
      title: "User Experience",
      description: "Share ideas on how we can improve the overall experience.",
      icon: "✨"
    }
  ]

  const recentSuggestions = [
    {
      id: 1,
      username: "GlowGetter",
      category: "Quiz Ideas",
      title: "Lip Shape Analysis Quiz",
      description: "It would be helpful to have a quiz that suggests lipstick styles based on lip shape!",
      status: "under review",
      date: "2 days ago"
    },
    {
      id: 2,
      username: "StyleQueen",
      category: "Feature Requests",
      title: "Outfit Planner Feature",
      description: "Could we get a feature that helps plan outfits based on our seasonal color palette?",
      status: "planned",
      date: "1 week ago"
    },
    {
      id: 3,
      username: "BeautyExplorer",
      category: "User Experience",
      title: "Save Quiz Results",
      description: "I'd love to be able to save my quiz results to my profile so I can reference them later!",
      status: "implemented",
      date: "3 weeks ago"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'under review':
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">Under Review</span>
      case 'planned':
        return <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">Planned</span>
      case 'implemented':
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Implemented</span>
      default:
        return <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">{status}</span>
    }
  }

  return (
    <main>
      <Header />
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-display font-bold text-dark mb-4">
                MAKEUP <span className="text-primary">Suggestions</span>
              </h1>
              <p className="text-lg text-gray-600">
                Help us add more glow to the app by suggesting new features, quizzes, or improvements!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {suggestionCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h2 className="text-xl font-bold text-dark">{category.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link href={`/suggestions/${category.id}`} className="text-primary font-medium hover:underline inline-flex items-center">
                    Submit suggestion
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-dark">Recent Suggestions</h2>
                <Link 
                  href="/suggestions/new" 
                  className="bg-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Suggestion
                </Link>
              </div>
              
              <div className="space-y-6">
                {recentSuggestions.map((suggestion) => (
                  <div key={suggestion.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-dark text-lg">{suggestion.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{suggestion.category} • {suggestion.date}</p>
                      </div>
                      {getStatusBadge(suggestion.status)}
                    </div>
                    <p className="text-gray-600 mb-3">{suggestion.description}</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">By {suggestion.username}</span>
                      <div className="flex space-x-2">
                        <button className="text-primary hover:underline flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905A3.61 3.61 0 018.5 7.5" />
                          </svg>
                          Support
                        </button>
                        <button className="text-primary hover:underline flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Link 
                  href="/suggestions/all" 
                  className="text-primary font-medium hover:underline inline-flex items-center"
                >
                  View all suggestions
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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