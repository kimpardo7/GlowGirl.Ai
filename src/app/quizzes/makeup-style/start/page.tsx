'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MakeupStyleQuizStart() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // Quiz questions
  const questions = [
    {
      question: "How would you describe your typical daily makeup routine?",
      options: [
        "Minimal or no makeup (natural)",
        "Light coverage with a few products (casual)",
        "Medium coverage with defined features (classic)",
        "Full coverage with detailed techniques (glamorous)"
      ]
    },
    {
      question: "Which facial feature do you like to emphasize the most?",
      options: [
        "Eyes",
        "Lips",
        "Skin/complexion",
        "Cheeks/contour"
      ]
    },
    {
      question: "What's your personal style aesthetic?",
      options: [
        "Classic and timeless",
        "Natural and effortless",
        "Bold and dramatic",
        "Trendy and experimental"
      ]
    },
    {
      question: "How much time are you willing to spend on your makeup routine?",
      options: [
        "Under 5 minutes",
        "5-10 minutes",
        "10-20 minutes",
        "20+ minutes"
      ]
    },
    {
      question: "Which makeup look would you choose for an everyday occasion?",
      options: [
        "Clean skin, mascara, and tinted lip balm",
        "Light foundation, subtle eye, and natural lip",
        "Medium coverage, defined eye, and coordinated lip",
        "Full coverage, smokey eye or bold lip, and contour"
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
      router.push(`/quizzes/makeup-style/results?style=${result}`);
    }
  };

  // Calculate the quiz result
  const calculateResult = (allAnswers: string[]) => {
    // Track which style gets the most votes
    const styles = {
      natural: 0,
      classic: 0,
      glamorous: 0,
      trendy: 0
    };
    
    // Question 1: Makeup routine
    if (allAnswers[0]?.includes("Minimal")) styles.natural += 2;
    else if (allAnswers[0]?.includes("Light")) styles.natural += 1;
    else if (allAnswers[0]?.includes("Medium")) styles.classic += 1;
    else if (allAnswers[0]?.includes("Full")) styles.glamorous += 2;
    
    // Question 2: Featured facial feature
    if (allAnswers[1] === "Eyes") {
      styles.glamorous += 1;
      styles.trendy += 1;
    } else if (allAnswers[1] === "Lips") {
      styles.classic += 1;
      styles.trendy += 1;
    } else if (allAnswers[1] === "Skin/complexion") {
      styles.natural += 1;
    } else if (allAnswers[1] === "Cheeks/contour") {
      styles.glamorous += 1;
    }
    
    // Question 3: Personal style
    if (allAnswers[2]?.includes("Classic")) styles.classic += 2;
    else if (allAnswers[2]?.includes("Natural")) styles.natural += 2;
    else if (allAnswers[2]?.includes("Bold")) styles.glamorous += 2;
    else if (allAnswers[2]?.includes("Trendy")) styles.trendy += 2;
    
    // Question 4: Time spent
    if (allAnswers[3]?.includes("Under 5")) styles.natural += 2;
    else if (allAnswers[3]?.includes("5-10")) {
      styles.natural += 1;
      styles.classic += 1;
    }
    else if (allAnswers[3]?.includes("10-20")) styles.classic += 2;
    else if (allAnswers[3]?.includes("20+")) {
      styles.glamorous += 1;
      styles.trendy += 1;
    }
    
    // Question 5: Everyday look
    if (allAnswers[4]?.includes("Clean skin")) styles.natural += 2;
    else if (allAnswers[4]?.includes("Light foundation")) styles.classic += 1;
    else if (allAnswers[4]?.includes("Medium coverage")) styles.classic += 2;
    else if (allAnswers[4]?.includes("Full coverage")) {
      styles.glamorous += 1;
      styles.trendy += 1;
    }
    
    // Find the style with the highest score
    let maxStyle = "natural";
    let maxScore = styles.natural;
    
    if (styles.classic > maxScore) {
      maxStyle = "classic";
      maxScore = styles.classic;
    }
    if (styles.glamorous > maxScore) {
      maxStyle = "glamorous";
      maxScore = styles.glamorous;
    }
    if (styles.trendy > maxScore) {
      maxStyle = "trendy";
      maxScore = styles.trendy;
    }
    
    return maxStyle;
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Makeup Style Quiz</h1>
      
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
        <Link href="/quizzes/makeup-style" className="text-blue-600 hover:underline">
          Cancel quiz
        </Link>
      </div>
    </div>
  );
} 