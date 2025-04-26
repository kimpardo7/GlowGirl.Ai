'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SeasonalColorQuizStart() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const questions = [
    {
      id: 1,
      question: "What color are the veins on your wrist?",
      options: [
        { id: "blue", text: "Blue or purple", seasonHint: "cool" },
        { id: "green", text: "Green", seasonHint: "warm" },
        { id: "both", text: "Both blue and green", seasonHint: "neutral" }
      ],
      explanation: "Blue or purple veins typically indicate cool undertones, while green veins suggest warm undertones. If you see both, you might have neutral undertones."
    },
    {
      id: 2,
      question: "How does your skin react to sun exposure?",
      options: [
        { id: "burn", text: "Burns easily, rarely tans", seasonHint: "winter" },
        { id: "burn-tan", text: "Burns first, then tans", seasonHint: "summer" },
        { id: "tan", text: "Tans easily, rarely burns", seasonHint: "autumn" },
        { id: "golden", text: "Develops a golden tan quickly", seasonHint: "spring" }
      ],
      explanation: "Your skin's reaction to the sun can indicate which seasonal color palette might suit you best."
    }
    // More questions would be added here for a complete quiz
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    // Save the answer
    setAnswers({
      ...answers,
      [currentQuestion.id]: optionId
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate result and navigate to results page
      const result = calculateResult();
      router.push(`/quizzes/seasonal-color/results?season=${result}`);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResult = () => {
    // Simple example result calculation - in a real app this would be more sophisticated
    if (answers[1] === 'blue') {
      return answers[2] === 'burn' ? 'winter' : 'summer';
    } else {
      return answers[2] === 'tan' ? 'autumn' : 'spring';
    }
  };

  return (
    <main>
      <Header />
      <section className="py-16 bg-light min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <Link href="/quizzes/seasonal-color" className="text-primary hover:underline inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Quiz Info
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-primary/10 py-4 px-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-dark">Seasonal Color Analysis</h1>
                  <span className="text-sm font-medium text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-dark mb-6">{currentQuestion.question}</h2>
                
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((option) => (
                    <label key={option.id} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-primary/5 transition">
                      <input 
                        type="radio" 
                        name={`question-${currentQuestion.id}`} 
                        value={option.id}
                        checked={answers[currentQuestion.id] === option.id}
                        onChange={() => handleOptionSelect(option.id)}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                      />
                      <span className="ml-3">{option.text}</span>
                    </label>
                  ))}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md mb-6">
                  <p className="text-blue-700 text-sm">
                    <span className="font-bold">Tip:</span> {currentQuestion.explanation}
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    className="px-6 py-2.5 border border-gray-300 rounded-full text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={currentQuestionIndex === 0}
                    onClick={goToPreviousQuestion}
                  >
                    Previous
                  </button>
                  <button 
                    className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!answers[currentQuestion.id]}
                    onClick={goToNextQuestion}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'See Results'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
} 