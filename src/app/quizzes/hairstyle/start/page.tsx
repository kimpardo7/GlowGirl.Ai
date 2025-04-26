'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HairstyleQuizStart() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  // Quiz questions
  const questions = [
    {
      question: "What is your face shape?",
      options: [
        "Oval (longer than wide, with a gently rounded jawline)",
        "Round (similar width and length, with full cheeks)",
        "Square (strong, angular jawline, similar width and length)",
        "Heart (wider forehead, narrower chin)",
        "Long (significantly longer than wide)",
        "Diamond (narrow forehead and jawline, with wide cheekbones)",
        "I'm not sure"
      ]
    },
    {
      question: "What is your hair texture?",
      options: [
        "Straight (no wave or curl pattern)",
        "Wavy (defined S-shaped pattern)",
        "Curly (springy, defined curls)",
        "Coily/Kinky (tight, dense curl pattern)",
        "Fine (thin individual hair strands)",
        "Thick (dense, coarse individual strands)"
      ]
    },
    {
      question: "What is your current hair length?",
      options: [
        "Very short (pixie, buzz cut)",
        "Short (above chin)",
        "Medium (chin to shoulders)",
        "Long (below shoulders)",
        "Very long (mid-back or longer)"
      ]
    },
    {
      question: "How much time are you willing to spend styling your hair daily?",
      options: [
        "Minimal (less than 5 minutes)",
        "Some time (5-15 minutes)",
        "Moderate (15-30 minutes)",
        "As much as needed for the right look (30+ minutes)"
      ]
    },
    {
      question: "Which of these best describes your personal style?",
      options: [
        "Classic and timeless",
        "Casual and relaxed",
        "Edgy and bold",
        "Elegant and polished",
        "Modern and trendy"
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
      router.push(`/quizzes/hairstyle/results?style=${result}`);
    }
  };

  // Calculate the quiz result
  const calculateResult = (allAnswers: string[]) => {
    // Possible result categories
    const styles = {
      bob: 0,
      pixie: 0,
      long_layers: 0,
      curly_natural: 0,
      updo: 0,
      textured_crop: 0
    };
    
    // Question 1: Face shape
    if (allAnswers[0]?.includes("Oval")) {
      // Oval faces can wear almost any style
      styles.bob += 1;
      styles.pixie += 1;
      styles.long_layers += 1;
    } else if (allAnswers[0]?.includes("Round")) {
      styles.pixie += 2;
      styles.long_layers += 2;
    } else if (allAnswers[0]?.includes("Square")) {
      styles.bob += 2;
      styles.long_layers += 1;
      styles.curly_natural += 1;
    } else if (allAnswers[0]?.includes("Heart")) {
      styles.bob += 2;
      styles.long_layers += 1;
    } else if (allAnswers[0]?.includes("Long")) {
      styles.bob += 2;
      styles.textured_crop += 1;
    } else if (allAnswers[0]?.includes("Diamond")) {
      styles.bob += 1;
      styles.pixie += 1;
      styles.long_layers += 1;
    } else {
      // If unsure, give equal points to versatile styles
      styles.bob += 1;
      styles.long_layers += 1;
    }
    
    // Question 2: Hair texture
    if (allAnswers[1]?.includes("Straight")) {
      styles.bob += 2;
      styles.pixie += 1;
      styles.long_layers += 1;
    } else if (allAnswers[1]?.includes("Wavy")) {
      styles.bob += 1;
      styles.long_layers += 2;
      styles.textured_crop += 1;
    } else if (allAnswers[1]?.includes("Curly")) {
      styles.curly_natural += 3;
      styles.long_layers += 1;
    } else if (allAnswers[1]?.includes("Coily/Kinky")) {
      styles.curly_natural += 3;
      styles.textured_crop += 1;
    } else if (allAnswers[1]?.includes("Fine")) {
      styles.bob += 2;
      styles.pixie += 1;
    } else if (allAnswers[1]?.includes("Thick")) {
      styles.long_layers += 2;
      styles.textured_crop += 1;
    }
    
    // Question 3: Current length
    if (allAnswers[2]?.includes("Very short")) {
      styles.pixie += 3;
      styles.textured_crop += 2;
    } else if (allAnswers[2]?.includes("Short")) {
      styles.bob += 3;
      styles.pixie += 1;
      styles.textured_crop += 1;
    } else if (allAnswers[2]?.includes("Medium")) {
      styles.bob += 2;
      styles.long_layers += 1;
      styles.updo += 1;
    } else if (allAnswers[2]?.includes("Long")) {
      styles.long_layers += 3;
      styles.updo += 2;
      styles.curly_natural += 1;
    } else if (allAnswers[2]?.includes("Very long")) {
      styles.long_layers += 3;
      styles.updo += 3;
    }
    
    // Question 4: Styling time
    if (allAnswers[3]?.includes("Minimal")) {
      styles.pixie += 2;
      styles.textured_crop += 2;
      styles.bob += 1;
    } else if (allAnswers[3]?.includes("Some time")) {
      styles.bob += 2;
      styles.long_layers += 1;
    } else if (allAnswers[3]?.includes("Moderate")) {
      styles.long_layers += 2;
      styles.curly_natural += 1;
      styles.updo += 1;
    } else if (allAnswers[3]?.includes("As much as needed")) {
      styles.updo += 3;
      styles.curly_natural += 2;
    }
    
    // Question 5: Personal style
    if (allAnswers[4]?.includes("Classic and timeless")) {
      styles.bob += 2;
      styles.long_layers += 2;
    } else if (allAnswers[4]?.includes("Casual and relaxed")) {
      styles.long_layers += 2;
      styles.curly_natural += 1;
      styles.textured_crop += 1;
    } else if (allAnswers[4]?.includes("Edgy and bold")) {
      styles.pixie += 3;
      styles.textured_crop += 2;
      styles.bob += 1;
    } else if (allAnswers[4]?.includes("Elegant and polished")) {
      styles.updo += 3;
      styles.long_layers += 2;
      styles.bob += 1;
    } else if (allAnswers[4]?.includes("Modern and trendy")) {
      styles.bob += 2;
      styles.textured_crop += 2;
      styles.long_layers += 1;
    }
    
    // Find the style with the highest score
    let maxStyle = "long_layers"; // Default
    let maxScore = styles.long_layers;
    
    if (styles.bob > maxScore) {
      maxStyle = "bob";
      maxScore = styles.bob;
    }
    if (styles.pixie > maxScore) {
      maxStyle = "pixie";
      maxScore = styles.pixie;
    }
    if (styles.curly_natural > maxScore) {
      maxStyle = "curly_natural";
      maxScore = styles.curly_natural;
    }
    if (styles.updo > maxScore) {
      maxStyle = "updo";
      maxScore = styles.updo;
    }
    if (styles.textured_crop > maxScore) {
      maxStyle = "textured_crop";
      maxScore = styles.textured_crop;
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
      <h1 className="text-2xl font-bold text-center mb-6">Hairstyle Analysis Quiz</h1>
      
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
        <Link href="/quizzes/hairstyle" className="text-blue-600 hover:underline">
          Cancel quiz
        </Link>
      </div>
    </div>
  );
} 