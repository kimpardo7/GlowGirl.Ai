'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SilverGoldQuizStart() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // Quiz questions
  const questions = [
    {
      question: "When you look at the veins on your wrist, what color do they appear?",
      options: [
        "Blue or purple (cool undertone)",
        "Green (warm undertone)",
        "Both blue and green (neutral undertone)"
      ]
    },
    {
      question: "Which jewelry color do you feel looks best against your skin?",
      options: [
        "Silver, platinum, white gold",
        "Yellow gold, rose gold, copper",
        "Both look equally good"
      ]
    },
    {
      question: "What colors of clothing tend to flatter you the most?",
      options: [
        "Blues, purples, and cool tones",
        "Oranges, yellows, and warm tones",
        "I can wear both warm and cool colors equally well"
      ]
    },
    {
      question: "When you get too much sun, does your skin:",
      options: [
        "Burn easily and rarely tan",
        "Tan easily and rarely burn",
        "Sometimes burn, then tan"
      ]
    },
    {
      question: "Which of these colors would you say best describes your natural hair color?",
      options: [
        "Ash blonde, platinum, cool brown, or blue-black",
        "Golden blonde, auburn, warm brown, or copper",
        "Mix of warm and cool tones"
      ]
    }
  ];

  // Handle selecting an answer
  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    
    // Move to next question or results page if at the end
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result based on answers and redirect
      const result = calculateResult(newAnswers);
      router.push(`/quizzes/silver-gold/results?result=${result}`);
    }
  };

  // Calculate the quiz result
  const calculateResult = (allAnswers: string[]) => {
    // Count the first option (cool), second option (warm), and third option (neutral) selections
    const counts = [0, 0, 0];
    
    allAnswers.forEach((answer, questionIndex) => {
      const questionOptions = questions[questionIndex].options;
      // Find the index of the answer in the current question's options
      for (let i = 0; i < questionOptions.length; i++) {
        if (questionOptions[i] === answer) {
          if (i === 0) counts[0]++;      // Cool tone (silver)
          else if (i === 1) counts[1]++; // Warm tone (gold)
          else counts[2]++;              // Neutral tone (both)
          break;
        }
      }
    });
    
    // Determine result based on highest count
    const maxCount = Math.max(...counts);
    if (counts[0] === maxCount) return 'silver';
    if (counts[1] === maxCount) return 'gold';
    return 'both';
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Silver or Gold Quiz</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">{questions[currentQuestion].question}</h2>
        
        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="w-full py-3 px-4 text-left border rounded-md hover:bg-gray-50 transition duration-150"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        
        {currentQuestion > 0 && (
          <button 
            onClick={handleBack} 
            className="mt-6 text-blue-600 hover:underline"
          >
            ← Back to previous question
          </button>
        )}
      </div>
      
      <div className="mt-6 text-center">
        <Link href="/quizzes/silver-gold" className="text-blue-600 hover:underline">
          Cancel quiz
        </Link>
      </div>
    </div>
  );
} 