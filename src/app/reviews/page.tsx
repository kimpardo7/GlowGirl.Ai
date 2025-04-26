import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Reviews() {
  const reviewCategories = [
    {
      id: "quizzes",
      title: "Quiz Reviews",
      description: "Share your experience with our quizzes and how accurate the results were for you.",
      icon: "📝"
    },
    {
      id: "results",
      title: "Analysis Results",
      description: "Discuss how well the recommendations matched your personal style and preferences.",
      icon: "📊"
    },
    {
      id: "community",
      title: "Community Experience",
      description: "Tell us about your overall experience with the GlowGirl.AI community.",
      icon: "👭"
    }
  ]

  const recentReviews = [
    {
      id: 1,
      username: "SophiaGlow",
      quizType: "Seasonal Color Analysis",
      rating: 5,
      comment: "The seasonal color analysis was spot on! I've always gravitated toward autumn colors without realizing why, and now I understand my warm undertones make these colors pop. My wardrobe choices are so much more intentional now.",
      date: "3 days ago"
    },
    {
      id: 2,
      username: "MakeupMaven",
      quizType: "Makeup Style Quiz",
      rating: 4,
      comment: "The makeup style recommendations really worked for my face shape. I've been doing my makeup the same way for years and this gave me new techniques to try that actually enhance my features better!",
      date: "1 week ago"
    },
    {
      id: 3,
      username: "StyleSeeker22",
      quizType: "Silver vs. Gold Quiz",
      rating: 5,
      comment: "I never knew why some jewelry looked better on me than others until this quiz. Turns out I'm definitely a silver person! Saved me from buying more gold accessories that just don't suit me.",
      date: "2 weeks ago"
    }
  ]

  return (
    <main>
      <Header />
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-display font-bold text-dark mb-4">
                MAKEUP REMOVER <span className="text-primary">Reviews</span>
              </h1>
              <p className="text-lg text-gray-600">
                Share honest feedback about your experiences to help our community glow better!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {reviewCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl mr-3">{category.icon}</span>
                    <h2 className="text-xl font-bold text-dark">{category.title}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <Link href={`/reviews/${category.id}`} className="text-primary font-medium hover:underline inline-flex items-center">
                    Write a review
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-dark mb-6">Recent Community Reviews</h2>
              
              <div className="space-y-8">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b pb-8 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-dark">{review.quizType}</h3>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{review.comment}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{review.username}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Link 
                  href="/reviews/all" 
                  className="text-primary font-medium hover:underline inline-flex items-center"
                >
                  See all reviews
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