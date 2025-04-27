'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StyleAestheticQuizStart() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [textResponses, setTextResponses] = useState<string[]>(Array(6).fill(''));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after a short delay to ensure component is mounted
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Quiz questions with example prompts
  const questions = [
    {
      question: "Describe your ideal weekend outfit.",
      prompt: "Think about the clothes you feel most comfortable and confident in when you're relaxing or going out on weekends."
    },
    {
      question: "What kind of accessories do you prefer to wear?",
      prompt: "Consider jewelry, bags, hats, scarves, or any other accessories that complete your look."
    },
    {
      question: "What colors do you tend to wear most often?",
      prompt: "Think about your wardrobe's color palette - bright colors, neutrals, pastels, or dark tones."
    },
    {
      question: "Describe your favorite shoes or the shoes you wear most often.",
      prompt: "Consider style, height, comfort level, and when you typically wear them."
    },
    {
      question: "What's your approach to putting together an outfit?",
      prompt: "Do you prioritize comfort, trends, expressing yourself, or creating a specific look?"
    },
    {
      question: "Where do you prefer to shop for clothes?",
      prompt: "Think about your favorite stores, brands, or shopping methods (online, vintage, etc.)."
    }
  ];

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newResponses = [...textResponses];
    newResponses[currentQuestion] = e.target.value;
    setTextResponses(newResponses);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (textResponses[currentQuestion].trim().length < 10) {
      alert("Please provide a more detailed response (at least 10 characters).");
      return;
    }
      
      // Move to next question or results page if at the end
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
      // Analyze responses and determine style
      const result = analyzeResponses(textResponses);
      // Show loading state before redirecting
      setIsLoading(true);
      // Add a small delay before navigation for better user experience
      setTimeout(() => {
        router.push(`/quizzes/fashion-style/results?style=${result}`);
      }, 800);
    }
  };

  // Analyze text responses to determine style aesthetic
  const analyzeResponses = (allResponses: string[]) => {
    // Keywords associated with each style
    const styleKeywords = {
      cottagecore: ['floral', 'nature', 'vintage', 'soft', 'romantic', 'cozy', 'handmade', 'rural', 'pastoral', 'dreamy', 'cottage', 'garden', 'natural', 'earth', 'flower', 'whimsical', 'pastel', 'feminine', 'lace', 'knit'],
      streetwear: ['street', 'urban', 'casual', 'cool', 'sneaker', 'comfort', 'statement', 'oversized', 'graphic', 'bold', 'trendy', 'hip-hop', 'skate', 'hoodie', 'sporty', 'edgy', 'brand', 'relaxed', 'layered', 'athleisure'],
      'y2k': ['colorful', 'bright', 'playful', 'nostalgic', '2000s', 'y2k', 'retro', 'throwback', 'platform', 'glitter', 'shiny', 'crop', 'mini', 'low-rise', 'butterfly', 'baguette', 'velour', 'neon', 'metallic', 'futuristic'],
      'dark-academia': ['classic', 'academic', 'intellectual', 'vintage', 'dark', 'sophisticated', 'preppy', 'scholarly', 'neutral', 'tweed', 'brown', 'oxford', 'blazer', 'turtle', 'leather', 'heritage', 'literary', 'traditional', 'collegiate', 'library'],
      minimalist: ['simple', 'clean', 'minimal', 'neutral', 'basic', 'timeless', 'quality', 'essential', 'monochrome', 'versatile', 'sleek', 'modern', 'understated', 'capsule', 'tailored', 'structured', 'practical', 'elegant', 'effortless', 'streamlined']
    };
    
    // Count matches for each style
    const counts: Record<string, number> = {
      cottagecore: 0,
      streetwear: 0,
      "y2k": 0,
      "dark-academia": 0,
      minimalist: 0
    };
    
    // Analyze each response
    allResponses.forEach(response => {
      const lowerResponse = response.toLowerCase();
      
      // Count keyword matches
      for (const [style, keywords] of Object.entries(styleKeywords)) {
        keywords.forEach(keyword => {
          if (lowerResponse.includes(keyword)) {
            counts[style]++;
          }
        });
      }
    });
    
    // Find the style with the highest count
    let maxCount = 0;
    let maxAesthetic = "";
    
    for (const [aesthetic, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        maxAesthetic = aesthetic;
      }
    }
    
    return maxAesthetic || "minimalist"; // Default to minimalist if no clear match
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

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
          <div className="max-w-4xl mx-auto">
      {isLoading ? (
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 text-center">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-rose-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-4 text-gray-600">Loading quiz questions...</p>
        </div>
      ) : (
              <>
                <div className="mb-8 text-center relative z-10">
                  <div className="inline-block mb-3">
                    <span className="text-2xl">✨</span>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500">
                    Style Aesthetic Quiz
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Discover your personal style aesthetic by describing your fashion preferences in your own words.
                  </p>
                  <div className="w-32 h-1 mx-auto mt-6 bg-gradient-to-r from-violet-300 via-rose-300 to-amber-300"></div>
                </div>
                
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
                  {/* Subtle gradient top border */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500"></div>
          
                  <div className="mb-8">
            <p className="text-sm text-gray-500 mb-2 font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                        className="bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Fun animated icons based on question type */}
          <div className="flex justify-center mb-6">
                    <div className="text-4xl relative animate-pulse">
              {currentQuestion === 0 && "👗"}
              {currentQuestion === 1 && "💍"}
              {currentQuestion === 2 && "🎨"}
              {currentQuestion === 3 && "👢"}
              {currentQuestion === 4 && "🧵"}
              {currentQuestion === 5 && "🛍️"}
                      <div className="absolute -inset-3 bg-gradient-to-r from-amber-200/50 to-rose-200/50 rounded-full filter blur-md opacity-30 -z-10"></div>
            </div>
          </div>
          
                  <h2 className="text-2xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-amber-600 to-violet-600">{questions[currentQuestion].question}</h2>
                  <p className="text-gray-600 text-center mb-6">{questions[currentQuestion].prompt}</p>
          
                  <div className="mb-6">
                    <textarea
                      className="w-full h-40 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 resize-none"
                      placeholder="Tell us about your fashion preferences..."
                      value={textResponses[currentQuestion]}
                      onChange={handleTextChange}
                    ></textarea>
          </div>
          
                  <div className="mt-10 flex justify-between">
                    {currentQuestion > 0 ? (
            <button 
              onClick={handleBack} 
                        className="relative overflow-hidden border border-slate-300 text-slate-700 hover:text-slate-900 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:border-slate-400 hover:shadow hover:-translate-y-0.5 flex items-center"
            >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
                        Back
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-50"></div>
            </button>
                    ) : (
                      <div></div> /* Empty div for spacing */
                    )}
                    
                    <div className="flex space-x-3">
                      <Link 
                        href="/quizzes/fashion-style" 
                        className="relative overflow-hidden border border-slate-300 text-slate-700 hover:text-slate-900 px-6 py-2 rounded-full font-medium transition-all duration-300 hover:border-slate-400 hover:shadow hover:-translate-y-0.5 flex items-center"
                      >
                        <span>Cancel</span>
                        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent opacity-50"></div>
        </Link>
                      
                      <button 
                        onClick={handleSubmit} 
                        className="relative overflow-hidden bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 text-white px-8 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center"
                        disabled={textResponses[currentQuestion].trim().length < 10}
                      >
                        {currentQuestion < questions.length - 1 ? 'Next' : 'See Results'}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Progress indication */}
                <div className="mt-10 flex justify-center gap-2">
                  {Array.from({ length: questions.length }).map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentQuestion 
                          ? 'bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 scale-125' 
                          : index < currentQuestion 
                            ? 'bg-gradient-to-r from-rose-300 via-amber-300 to-violet-300' 
                            : 'bg-gray-300'
                      }`}
                    ></div>
                  ))}
                </div>
                
                {/* Helper text */}
                <div className="mt-8 text-center text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Be as detailed as possible for the most accurate results!</span>
                  </div>
                </div>
              </>
            )}
      </div>
    </div>
      </section>
      <Footer />
    </main>
  );
} 