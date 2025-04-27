'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StyleAestheticQuiz() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-white to-rose-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-40 right-0 w-full pointer-events-none">
          <div className="absolute right-0 opacity-20">
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-rose-300 to-purple-300 blur-3xl"></div>
            <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-amber-300 to-pink-300 blur-3xl ml-20 -mt-10"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <div className="absolute left-0 opacity-20">
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-amber-300 to-rose-300 blur-3xl"></div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center relative z-10">
              <div className="inline-block mb-3">
                <span className="text-2xl">✨</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500">
                Style Aesthetic Quiz
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover your personal style aesthetic—from cottagecore to y2k, minimalist to streetwear.
              </p>
              <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-violet-300 via-rose-300 to-amber-300"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] shadow-lg">
                <Image 
                  src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop"
                  alt="Fashion Styles"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span className="text-xs uppercase tracking-wider bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 py-1 px-2 rounded-full">Style Quiz</span>
                  <h2 className="text-2xl font-bold mt-2">Discover Your Style</h2>
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-violet-600">What's Your Aesthetic?</h2>
                <p className="text-gray-700 mb-6">
                  Are you drawn to the dreamy vibes of cottagecore? The edgy coolness of dark academia? 
                  The vintage charm of y2k? Or perhaps the clean lines of minimalism? 
                  This quiz will help you identify your unique style aesthetic, with personalized outfit recommendations and tips.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-rose-100 to-violet-100 flex items-center justify-center">
                      <span className="text-rose-500">✓</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Personalized Analysis</h3>
                      <p className="text-gray-600">Identify your fashion personality based on your preferences</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 flex items-center justify-center">
                      <span className="text-amber-500">✓</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Outfit Recommendations</h3>
                      <p className="text-gray-600">Get specific clothing suggestions that match your aesthetic</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-violet-100 to-amber-100 flex items-center justify-center">
                      <span className="text-violet-500">✓</span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Shopping Guidance</h3>
                      <p className="text-gray-600">Learn which brands and stores align with your style</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link 
                    href="/quizzes/fashion-style/start" 
                    className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 text-white px-8 py-3 rounded-full font-medium text-center shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  >
                    <span className="relative z-10">Start Quiz</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500"></div>
              
              <h2 className="text-2xl font-semibold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-amber-600 to-violet-600">Fashion Aesthetics Explained</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-5 rounded-lg shadow-sm border border-rose-100">
                  <div className="text-3xl mb-2">👩‍🎨</div>
                  <h3 className="text-lg font-medium mb-2">Cottagecore</h3>
                  <p className="text-gray-600">Romantic, nostalgic style inspired by rural life with floral prints, flowing dresses, and natural elements.</p>
                </div>
                
                <div className="bg-gradient-to-br from-violet-50 to-indigo-50 p-5 rounded-lg shadow-sm border border-violet-100">
                  <div className="text-3xl mb-2">🖤</div>
                  <h3 className="text-lg font-medium mb-2">Dark Academia</h3>
                  <p className="text-gray-600">Scholarly aesthetic with vintage-inspired outfits, muted colors, blazers, pleated skirts, and Oxford shoes.</p>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-pink-50 p-5 rounded-lg shadow-sm border border-amber-100">
                  <div className="text-3xl mb-2">💿</div>
                  <h3 className="text-lg font-medium mb-2">Y2K</h3>
                  <p className="text-gray-600">Nostalgic 2000s revival featuring low-rise jeans, crop tops, platform shoes, and playful accessories.</p>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-rose-50 p-5 rounded-lg shadow-sm border border-indigo-100">
                  <div className="text-3xl mb-2">🧥</div>
                  <h3 className="text-lg font-medium mb-2">Streetwear</h3>
                  <p className="text-gray-600">Urban style with oversized hoodies, graphic tees, sneakers, and statement accessories.</p>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-5 rounded-lg shadow-sm border border-slate-100">
                  <div className="text-3xl mb-2">✨</div>
                  <h3 className="text-lg font-medium mb-2">Minimalist</h3>
                  <p className="text-gray-600">Clean, simple aesthetic with neutral colors, quality basics, and thoughtful, versatile pieces.</p>
                </div>
                
                <div className="bg-gradient-to-br from-pink-50 to-violet-50 p-5 rounded-lg shadow-sm border border-pink-100">
                  <div className="text-3xl mb-2">🌙</div>
                  <h3 className="text-lg font-medium mb-2">Soft Girl</h3>
                  <p className="text-gray-600">Cute, feminine style with pastels, heart motifs, plush accessories, and playful makeup.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/quizzes" 
                className="relative overflow-hidden border border-slate-300 text-slate-700 hover:text-slate-900 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:border-slate-400 hover:shadow hover:-translate-y-0.5 flex items-center mx-auto justify-center w-fit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to All Quizzes
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-50"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 