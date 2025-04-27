'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MakeupStyleQuizStart() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(''));
  const [currentAnswer, setCurrentAnswer] = useState('');

  // Quiz questions
  const questions = [
    {
      question: "How would you describe your typical daily makeup routine?",
      placeholder: "Example: I typically use a light BB cream, mascara, and lip gloss daily..."
    },
    {
      question: "Which facial feature do you like to emphasize the most and why?",
      placeholder: "Example: I love emphasizing my eyes because..."
    },
    {
      question: "What's your personal style aesthetic and how does it influence your makeup choices?",
      placeholder: "Example: My style is minimalist and classic, which means I tend to..."
    },
    {
      question: "How much time are you willing to spend on your makeup routine, and what factors influence this?",
      placeholder: "Example: I usually spend about 10 minutes because..."
    },
    {
      question: "Describe your ideal everyday makeup look in detail.",
      placeholder: "Example: My ideal everyday look includes tinted moisturizer, subtle blush..."
    }
  ];

  // Handle text input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentAnswer(e.target.value);
  };

  // Handle submitting an answer
  const handleSubmitAnswer = () => {
    if (currentAnswer.trim() === '') return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;
    setAnswers(newAnswers);
    
    // Move to next question or results page if at the end
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer('');
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
    
    // Keywords to look for in responses
    const keywords = {
      natural: ['minimal', 'natural', 'light', 'simple', 'fresh', 'clean', 'barely-there', 'no-makeup', 'effortless', 'quick', 'easy', 'subtle', 'basic'],
      classic: ['polished', 'timeless', 'elegant', 'sophisticated', 'professional', 'clean', 'refined', 'neutral', 'balanced', 'work', 'office', 'traditional'],
      glamorous: ['full coverage', 'dramatic', 'glam', 'bold', 'statement', 'contour', 'highlight', 'evening', 'special occasion', 'flawless', 'perfect', 'detailed'],
      trendy: ['colorful', 'creative', 'experimental', 'unique', 'artistic', 'fun', 'playful', 'trendy', 'modern', 'graphic', 'bright', 'vibrant', 'edgy', 'instagram']
    };
    
    // Analyze each answer for keywords
    allAnswers.forEach(answer => {
      const lowerAnswer = answer.toLowerCase();
      
      // Count keyword matches for each style
      Object.keys(keywords).forEach(style => {
        keywords[style as keyof typeof keywords].forEach(keyword => {
          if (lowerAnswer.includes(keyword)) {
            styles[style as keyof typeof styles] += 1;
          }
        });
      });
      
      // Special cases based on time mentioned (Question 4)
      if (lowerAnswer.includes('5 minute') || lowerAnswer.includes('quick') || lowerAnswer.includes('fast')) {
        styles.natural += 2;
      } else if (lowerAnswer.includes('hour') || lowerAnswer.includes('30 minute') || lowerAnswer.includes('detailed')) {
        styles.glamorous += 2;
        styles.trendy += 1;
      }
      
      // Special cases for features emphasized (Question 2)
      if (lowerAnswer.includes('eye')) {
        // Eye emphasis could be any style depending on how it's done
        if (lowerAnswer.includes('dramatic') || lowerAnswer.includes('smokey')) {
          styles.glamorous += 2;
        } else if (lowerAnswer.includes('colorful') || lowerAnswer.includes('graphic')) {
          styles.trendy += 2;
        } else if (lowerAnswer.includes('subtle') || lowerAnswer.includes('natural')) {
          styles.natural += 1;
          styles.classic += 1;
        }
      } else if (lowerAnswer.includes('lip')) {
        if (lowerAnswer.includes('bold') || lowerAnswer.includes('red')) {
          styles.classic += 1;
          styles.glamorous += 1;
        } else if (lowerAnswer.includes('unusual') || lowerAnswer.includes('bright')) {
          styles.trendy += 2;
        } else if (lowerAnswer.includes('nude') || lowerAnswer.includes('natural')) {
          styles.natural += 1;
          styles.classic += 1;
        }
      } else if (lowerAnswer.includes('skin') || lowerAnswer.includes('complexion')) {
        styles.natural += 2;
      }
    });
    
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
      setCurrentAnswer(answers[currentQuestion - 1] || '');
    }
  };

  // Handle pressing Enter to submit
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmitAnswer();
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
          <textarea
            className="w-full py-3 px-4 border rounded-md min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder={questions[currentQuestion].placeholder}
            value={currentAnswer}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          
          <button 
            onClick={handleSubmitAnswer}
            disabled={currentAnswer.trim() === ''}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition ${
              currentAnswer.trim() === '' 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
          </button>
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