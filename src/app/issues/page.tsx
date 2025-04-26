import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Issues() {
  const issueCategories = [
    {
      id: "technical",
      title: "Technical Issues",
      description: "Report bugs, crashes, or other technical problems with the app.",
      icon: "🐞"
    },
    {
      id: "content",
      title: "Content Issues",
      description: "Report incorrect information, typos, or content that needs improvement.",
      icon: "📝"
    },
    {
      id: "accessibility",
      title: "Accessibility",
      description: "Help us make GlowGirl.AI more accessible for everyone.",
      icon: "♿"
    }
  ]

  const recentIssues = [
    {
      id: 1,
      username: "GlowFinder",
      category: "Technical Issues",
      title: "Quiz results not saving",
      description: "After completing the seasonal color analysis quiz, my results disappeared when I navigated to another page.",
      status: "investigating",
      date: "1 day ago"
    },
    {
      id: 2,
      username: "BeautyTech",
      category: "Accessibility",
      title: "Color contrast in quiz results",
      description: "The text on some of the quiz result cards is hard to read due to low contrast with background colors.",
      status: "fixed",
      date: "5 days ago"
    },
    {
      id: 3,
      username: "StyleExpert",
      category: "Content Issues",
      title: "Incorrect description for winter palette",
      description: "The winter color palette description mentions 'warm tones' but winter is a cool palette.",
      status: "fixed",
      date: "1 week ago"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'investigating':
        return <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">Investigating</span>
      case 'in progress':
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">In Progress</span>
      case 'fixed':
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Fixed</span>
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
                SKINCARE <span className="text-primary">Issues</span>
              </h1>
              <p className="text-lg text-gray-600">
                Help keep everything smooth and healthy behind the scenes by reporting issues you encounter.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {issueCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h2 className="text-xl font-bold text-dark">{category.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link href={`/issues/${category.id}`} className="text-primary font-medium hover:underline inline-flex items-center">
                    Report issue
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-dark">Recent Issues</h2>
                <Link 
                  href="/issues/new" 
                  className="bg-secondary hover:bg-opacity-90 text-white px-4 py-2 rounded-full text-sm font-medium inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Report New Issue
                </Link>
              </div>
              
              <div className="space-y-6">
                {recentIssues.map((issue) => (
                  <div key={issue.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-dark text-lg">{issue.title}</h3>
                        <p className="text-sm text-gray-500 mb-1">{issue.category} • {issue.date}</p>
                      </div>
                      {getStatusBadge(issue.status)}
                    </div>
                    <p className="text-gray-600 mb-3">{issue.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">Reported by {issue.username}</span>
                      <div className="flex space-x-2">
                        <button className="text-primary hover:underline flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          View details
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
                  href="/issues/all" 
                  className="text-primary font-medium hover:underline inline-flex items-center"
                >
                  View all issues
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="mt-12 bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-dark mb-4">Known Issues</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium mr-3 mt-1">In Progress</div>
                  <div>
                    <h3 className="font-bold text-dark">Mobile responsiveness on quiz pages</h3>
                    <p className="text-gray-600">We're working on improving the mobile experience for all quiz pages. Expected fix: 2 weeks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium mr-3 mt-1">Investigating</div>
                  <div>
                    <h3 className="font-bold text-dark">Account sync issues</h3>
                    <p className="text-gray-600">Some users are experiencing issues with syncing their preferences across devices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
} 