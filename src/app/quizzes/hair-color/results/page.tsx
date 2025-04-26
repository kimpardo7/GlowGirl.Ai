'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function HairColorResults() {
  const searchParams = useSearchParams();
  const colorParam = searchParams.get('color');
  const [result, setResult] = useState<any>(null);

  // Color data
  const colors = {
    blonde: {
      title: "Blonde Shades",
      description: "Your features harmonize beautifully with blonde hair colors. These lighter shades will brighten your face and complement your natural coloring.",
      best_shades: [
        "Platinum blonde",
        "Ash blonde",
        "Honey blonde",
        "Butter blonde",
        "Champagne blonde",
        "Beige blonde"
      ],
      avoid_shades: [
        "Yellow-toned blonde (can look brassy)",
        "Extremely warm golden blonde",
        "One-dimensional blonde (lacks depth)"
      ],
      maintenance_tips: [
        "Use purple shampoo 1-2 times a week to prevent brassiness",
        "Deep condition regularly as blonde hair can become dry",
        "Schedule touch-ups every 4-6 weeks for roots",
        "Consider shadow roots for lower maintenance",
        "Protect from sun exposure which can alter tone"
      ],
      celebrity_inspiration: ["Margot Robbie", "Jennifer Lawrence", "Taylor Swift", "Gwen Stefani"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?q=80&w=500&auto=format&fit=crop",
          alt: "Platinum blonde hair"
        },
        {
          url: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?q=80&w=500&auto=format&fit=crop",
          alt: "Honey blonde hair"
        },
        {
          url: "https://images.unsplash.com/photo-1523263685509-57c1d050d19b?q=80&w=500&auto=format&fit=crop",
          alt: "Ash blonde hair"
        }
      ]
    },
    brunette: {
      title: "Brunette Shades",
      description: "Your natural features pair wonderfully with brunette hair colors. These rich, dimensional tones will enhance your complexion and eye color.",
      best_shades: [
        "Chocolate brown",
        "Chestnut brown",
        "Mocha brown",
        "Caramel brown",
        "Hazelnut brown",
        "Espresso (for darker tones)"
      ],
      avoid_shades: [
        "Ashy brown that's too cool for your skin tone",
        "Flat, one-dimensional dark brown",
        "Extremely warm browns if you have cool undertones"
      ],
      maintenance_tips: [
        "Use color-preserving shampoo and conditioner",
        "Consider a gloss treatment every 4-6 weeks for shine",
        "Protect from sun exposure to prevent fading",
        "Use weekly hair masks to maintain shine and health",
        "Touch up roots every 6-8 weeks if covering gray"
      ],
      celebrity_inspiration: ["Anne Hathaway", "Jessica Alba", "Priyanka Chopra", "Lily Collins"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1595681242679-1b66dc786f17?q=80&w=500&auto=format&fit=crop",
          alt: "Rich chocolate brown hair"
        },
        {
          url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
          alt: "Caramel brunette with highlights"
        },
        {
          url: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?q=80&w=500&auto=format&fit=crop",
          alt: "Dark espresso brunette"
        }
      ]
    },
    red: {
      title: "Red & Auburn Shades",
      description: "Your coloring is perfect for red and auburn hair colors. These vibrant, head-turning shades will enhance your natural features and give you a striking look.",
      best_shades: [
        "Copper red",
        "Auburn",
        "Strawberry blonde",
        "Cherry red",
        "Mahogany",
        "Cinnamon"
      ],
      avoid_shades: [
        "Purple-based reds if you have warm undertones",
        "Orange-based reds if you have cool undertones",
        "Extremely bright artificial reds"
      ],
      maintenance_tips: [
        "Use color-depositing shampoo to maintain vibrancy",
        "Wash with cooler water to prevent color fading",
        "Apply UV protection as red fades fastest of all colors",
        "Schedule touch-ups every 4 weeks (red fades quickly)",
        "Use weekly color-enhancing treatments"
      ],
      celebrity_inspiration: ["Emma Stone", "Julianne Moore", "Amy Adams", "Florence Welch"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1590137303731-c4be167eefd9?q=80&w=500&auto=format&fit=crop",
          alt: "Vibrant copper red hair"
        },
        {
          url: "https://images.unsplash.com/photo-1605626908416-3c1b464cae13?q=80&w=500&auto=format&fit=crop",
          alt: "Auburn hair color"
        },
        {
          url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=500&auto=format&fit=crop",
          alt: "Natural strawberry blonde"
        }
      ]
    },
    black: {
      title: "Deep & Black Shades",
      description: "Your features complement deep, rich hair colors beautifully. These dark shades will create a striking contrast and enhance your natural coloring.",
      best_shades: [
        "Blue-black",
        "Soft black",
        "Espresso",
        "Dark chocolate",
        "Licorice",
        "Deep midnight"
      ],
      avoid_shades: [
        "Harsh, flat black without dimension",
        "Extremely warm black if you have cool undertones",
        "Colors that create too little contrast with your skin"
      ],
      maintenance_tips: [
        "Use color-protecting products to prevent fading",
        "Apply weekly glossing treatments for shine",
        "Consider adding subtle dimension with lowlights",
        "Touch up roots every 4-6 weeks",
        "Use blue or purple toning products to prevent brassiness"
      ],
      celebrity_inspiration: ["Megan Fox", "Zoe Saldana", "Dua Lipa", "Lucy Liu"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1631732037649-fea2ae184e69?q=80&w=500&auto=format&fit=crop",
          alt: "Blue-black hair color"
        },
        {
          url: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=500&auto=format&fit=crop",
          alt: "Soft black with subtle shine"
        },
        {
          url: "https://images.unsplash.com/photo-1609952542354-5c5c229a7cc2?q=80&w=500&auto=format&fit=crop",
          alt: "Dark espresso black hair"
        }
      ]
    },
    fashion: {
      title: "Fashion & Creative Colors",
      description: "Your style and personality are perfect for experimental hair colors. These bold, creative shades will help you express yourself and make a statement.",
      best_shades: [
        "Pastel tones (lavender, pink, blue)",
        "Vibrant jewel tones (emerald, sapphire, amethyst)",
        "Fun ombré and balayage combinations",
        "Rose gold",
        "Silver/platinum with tinted tones",
        "Split-dyed or color-block techniques"
      ],
      avoid_shades: [
        "Colors that clash with your skin's undertone",
        "Extremely warm colors if you have cool undertones and vice versa",
        "Shades that require bleaching if your hair is damaged"
      ],
      maintenance_tips: [
        "Use sulfate-free, color-safe shampoo and conditioner",
        "Wash hair with cold water to preserve color",
        "Apply weekly color-depositing masks",
        "Schedule touch-ups every 3-4 weeks",
        "Use heat protection and minimize heat styling",
        "Consider semi-permanent options for less commitment"
      ],
      celebrity_inspiration: ["Billie Eilish", "Lady Gaga", "Halsey", "Katy Perry"],
      images: [
        {
          url: "https://images.unsplash.com/photo-1617603618360-7696458b6390?q=80&w=500&auto=format&fit=crop",
          alt: "Pastel pink hair"
        },
        {
          url: "https://images.unsplash.com/photo-1589932767906-14b9196bb9a3?q=80&w=500&auto=format&fit=crop",
          alt: "Vibrant purple hair"
        },
        {
          url: "https://images.unsplash.com/photo-1613761395289-63682e94eb55?q=80&w=500&auto=format&fit=crop",
          alt: "Blue ombré hair"
        }
      ]
    }
  };

  useEffect(() => {
    // Set the result based on the URL parameter
    if (colorParam && colorParam in colors) {
      setResult(colors[colorParam as keyof typeof colors]);
    } else {
      // Default to brunette if no valid parameter
      setResult(colors.brunette);
    }
  }, [colorParam]);

  // Show loading state
  if (!result) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Ideal Hair Color</h1>
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
        <div className={`py-8 px-6 text-center ${
          colorParam === 'blonde' ? 'bg-gradient-to-r from-amber-50 to-yellow-100' :
          colorParam === 'brunette' ? 'bg-gradient-to-r from-amber-100 to-yellow-200' :
          colorParam === 'red' ? 'bg-gradient-to-r from-red-100 to-orange-100' :
          colorParam === 'black' ? 'bg-gradient-to-r from-gray-100 to-gray-200' :
          'bg-gradient-to-r from-purple-100 to-pink-100'
        }`}>
          <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{result.description}</p>
        </div>
        
        {/* Image Gallery */}
        <div className="p-6 bg-gray-50">
          <h3 className="text-xl font-bold mb-4 text-center">Style Inspiration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {result.images.map((image: {url: string, alt: string}, index: number) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-64 w-full">
                  <Image 
                    src={image.url}
                    alt={image.alt}
                    fill
                    style={{objectFit: 'cover'}}
                    className="transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-2 bg-white text-center text-sm text-gray-600">
                  {image.alt}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">✨</span> Best Shades For You
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.best_shades.map((shade: string, index: number) => (
                  <li key={index} className="text-gray-700">{shade}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">⚠️</span> Shades To Avoid
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.avoid_shades.map((shade: string, index: number) => (
                  <li key={index} className="text-gray-700">{shade}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">💁</span> Maintenance Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.maintenance_tips.map((tip: string, index: number) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🌟</span> Celebrity Inspiration
              </h3>
              <p className="text-gray-700 mb-6">{result.celebrity_inspiration.join(", ")}</p>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">Stylist Tip</h3>
                <p className="text-blue-700">
                  Always bring reference photos to your hair appointment! Photos communicate color ideas more effectively than words, helping your stylist understand exactly what you want.
                </p>
              </div>
            </div>
          </div>
          
          {/* Interactive Color Visualizer */}
          <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-xl font-bold mb-4 text-center">Color Match Rating</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="w-full max-w-md">
                <div className="h-4 bg-gray-200 rounded-full">
                  <div 
                    className={`h-4 rounded-full ${
                      colorParam === 'blonde' ? 'bg-amber-400' :
                      colorParam === 'brunette' ? 'bg-amber-700' :
                      colorParam === 'red' ? 'bg-red-500' :
                      colorParam === 'black' ? 'bg-gray-800' :
                      'bg-purple-500'
                    }`} 
                    style={{width: '92%'}}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-sm text-gray-600">
                  <span>Low Match</span>
                  <span className="font-bold">92% Match</span>
                  <span>Perfect</span>
                </div>
              </div>
            </div>
            <p className="text-center text-gray-600">Based on your quiz answers, this color is a strong match for your features!</p>
          </div>
          
          <div className="mt-10 border-t pt-8 flex justify-center space-x-4">
            <Link
              href="/quizzes/hair-color"
              className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-full font-medium"
            >
              Retake Quiz
            </Link>
            
            <Link
              href="/quizzes"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              Try Another Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 