'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function HairColorQuizStart() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Quiz questions
  const questions = [
    {
      question: "What is your natural skin tone?",
      options: [
        {
          text: "Fair with pink or cool undertones",
          image: "https://images.unsplash.com/photo-1508186225823-0963cf9ab0de?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Fair to medium with warm, golden undertones",
          image: "https://images.unsplash.com/photo-1569124589354-615739ae007b?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Medium to olive with neutral undertones",
          image: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Deep with warm undertones",
          image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Deep with cool undertones",
          image: "https://images.unsplash.com/photo-1518481852452-9415bed6d894?q=80&w=250&auto=format&fit=crop"
        }
      ]
    },
    {
      question: "What color are your eyes?",
      options: [
        {
          text: "Blue or light gray",
          image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Green or hazel",
          image: "https://images.unsplash.com/photo-1528307463556-cf2fa4a6b5bc?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Amber or light brown",
          image: "https://images.unsplash.com/photo-1495427513693-3f40da04b3fd?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Dark brown or black",
          image: "https://images.unsplash.com/photo-1605725657435-95ebce7ca3b6?q=80&w=250&auto=format&fit=crop"
        }
      ]
    },
    {
      question: "What color is your natural hair?",
      options: [
        {
          text: "Light blonde",
          image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Dark blonde or light brown",
          image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Medium to dark brown",
          image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Black",
          image: "https://images.unsplash.com/photo-1593953096158-7a180919ff5a?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Red or auburn",
          image: "https://images.unsplash.com/photo-1590137303731-c4be167eefd9?q=80&w=250&auto=format&fit=crop"
        }
      ]
    },
    {
      question: "How would you describe your personal style?",
      options: [
        {
          text: "Classic and traditional",
          image: "https://images.unsplash.com/photo-1599687145744-cfdcef114e6a?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Natural and understated",
          image: "https://images.unsplash.com/photo-1533973860717-d49dfd14cf64?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Bold and dramatic",
          image: "https://images.unsplash.com/photo-1529421308418-eab98863cee4?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Trendy and fashion-forward",
          image: "https://images.unsplash.com/photo-1589344532311-5d99d8108ef5?q=80&w=250&auto=format&fit=crop"
        }
      ]
    },
    {
      question: "How much hair maintenance are you willing to do?",
      options: [
        {
          text: "Minimal - I want something low-maintenance",
          image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "Moderate - I can commit to regular salon visits",
          image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=250&auto=format&fit=crop"
        },
        {
          text: "High - I'm willing to put in the effort for the right look",
          image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=250&auto=format&fit=crop"
        }
      ]
    }
  ];

  // Handle selecting an answer
  const handleAnswerSelect = (option: { text: string; image: string }, index: number) => {
    setSelectedOption(index);
    
    // Short delay for visual feedback of selection
    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = option.text;
      setAnswers(newAnswers);
      
      // Move to next question or results page if at the end
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Calculate result based on answers and redirect
        const result = calculateResult(newAnswers);
        router.push(`/quizzes/hair-color/results?color=${result}`);
      }
    }, 300);
  };

  // Calculate the quiz result
  const calculateResult = (allAnswers: string[]) => {
    // Possible result categories
    const colors = {
      blonde: 0,
      brunette: 0,
      red: 0,
      black: 0,
      fashion: 0
    };
    
    // Question 1: Skin tone
    if (allAnswers[0]?.includes("Fair with pink")) {
      colors.blonde += 2;
      colors.red += 1;
    } else if (allAnswers[0]?.includes("Fair to medium with warm")) {
      colors.blonde += 1;
      colors.brunette += 1;
      colors.red += 2;
    } else if (allAnswers[0]?.includes("Medium to olive")) {
      colors.brunette += 2;
      colors.black += 1;
    } else if (allAnswers[0]?.includes("Deep with warm")) {
      colors.brunette += 1;
      colors.black += 2;
    } else if (allAnswers[0]?.includes("Deep with cool")) {
      colors.black += 2;
      colors.fashion += 1;
    }
    
    // Question 2: Eye color
    if (allAnswers[1]?.includes("Blue or light gray")) {
      colors.blonde += 2;
      colors.red += 1;
    } else if (allAnswers[1]?.includes("Green or hazel")) {
      colors.red += 2;
      colors.brunette += 1;
    } else if (allAnswers[1]?.includes("Amber or light brown")) {
      colors.brunette += 2;
      colors.red += 1;
    } else if (allAnswers[1]?.includes("Dark brown or black")) {
      colors.brunette += 1;
      colors.black += 2;
    }
    
    // Question 3: Natural hair
    if (allAnswers[2]?.includes("Light blonde")) {
      colors.blonde += 3;
    } else if (allAnswers[2]?.includes("Dark blonde or light brown")) {
      colors.blonde += 1;
      colors.brunette += 2;
    } else if (allAnswers[2]?.includes("Medium to dark brown")) {
      colors.brunette += 3;
    } else if (allAnswers[2]?.includes("Black")) {
      colors.black += 3;
    } else if (allAnswers[2]?.includes("Red or auburn")) {
      colors.red += 3;
    }
    
    // Question 4: Personal style
    if (allAnswers[3]?.includes("Classic and traditional")) {
      colors.blonde += 1;
      colors.brunette += 1;
    } else if (allAnswers[3]?.includes("Natural and understated")) {
      colors.brunette += 2;
    } else if (allAnswers[3]?.includes("Bold and dramatic")) {
      colors.black += 1;
      colors.red += 1;
      colors.fashion += 1;
    } else if (allAnswers[3]?.includes("Trendy and fashion-forward")) {
      colors.fashion += 3;
    }
    
    // Question 5: Maintenance
    if (allAnswers[4]?.includes("Minimal")) {
      // Stay close to natural color
      if (allAnswers[2]?.includes("Light blonde")) colors.blonde += 2;
      else if (allAnswers[2]?.includes("Dark blonde or light brown")) colors.brunette += 2;
      else if (allAnswers[2]?.includes("Medium to dark brown")) colors.brunette += 2;
      else if (allAnswers[2]?.includes("Black")) colors.black += 2;
      else if (allAnswers[2]?.includes("Red or auburn")) colors.red += 2;
    } else if (allAnswers[4]?.includes("Moderate")) {
      // Slight change is okay
      colors.fashion += 1;
    } else if (allAnswers[4]?.includes("High")) {
      // Significant change is fine
      colors.fashion += 2;
    }
    
    // Find the color with the highest score
    let maxColor = "brunette"; // Default
    let maxScore = colors.brunette;
    
    if (colors.blonde > maxScore) {
      maxColor = "blonde";
      maxScore = colors.blonde;
    }
    if (colors.red > maxScore) {
      maxColor = "red";
      maxScore = colors.red;
    }
    if (colors.black > maxScore) {
      maxColor = "black";
      maxScore = colors.black;
    }
    if (colors.fashion > maxScore) {
      maxColor = "fashion";
      maxScore = colors.fashion;
    }
    
    return maxColor;
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Hair Color Analysis Quiz</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Fun animated icons based on question type */}
        <div className="flex justify-center mb-4">
          <div className="text-4xl">
            {currentQuestion === 0 && "👩🏻‍🦰👩🏽‍🦱👩🏿‍🦰"}
            {currentQuestion === 1 && "👁️✨"}
            {currentQuestion === 2 && "💇‍♀️💇‍♂️"}
            {currentQuestion === 3 && "👗👔👚"}
            {currentQuestion === 4 && "⏰💈"}
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-6 text-center">{questions[currentQuestion].question}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`group relative overflow-hidden rounded-lg transition duration-300 ${
                selectedOption === index 
                  ? 'ring-2 ring-blue-500 ring-offset-2' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => handleAnswerSelect(option, index)}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image 
                  src={option.image} 
                  alt={option.text}
                  fill
                  style={{objectFit: 'cover'}}
                  className={`transition-transform duration-500 ${
                    selectedOption === index ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-left">
                <p className="font-medium">{option.text}</p>
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-8 flex justify-between">
          {currentQuestion > 0 ? (
            <button 
              onClick={handleBack} 
              className="text-blue-600 hover:text-blue-800 transition flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div></div> {/* Empty div for spacing */}
          )}
          
          <Link href="/quizzes/hair-color" className="text-blue-600 hover:text-blue-800 transition">
            Cancel quiz
          </Link>
        </div>
      </div>
      
      {/* Progress indication */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: questions.length }).map((_, index) => (
          <div 
            key={index} 
            className={`w-3 h-3 rounded-full ${
              index === currentQuestion 
                ? 'bg-blue-600' 
                : index < currentQuestion 
                  ? 'bg-blue-300' 
                  : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
} 