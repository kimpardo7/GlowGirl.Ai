'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SeasonalColorResults() {
  const searchParams = useSearchParams();
  const seasonParam = searchParams.get('season');
  const [result, setResult] = useState<any>(null);

  // Season data
  const seasons = {
    winter: {
      season: "Winter",
      description: "People with Winter coloring have cool undertones with high contrast between their hair, skin, and eyes. Your coloring is crisp, clear, and dramatic.",
      colors: {
        best: ["Pure White", "Black", "Navy Blue", "Royal Blue", "Emerald Green", "True Red", "Bright Pink"],
        avoid: ["Orange", "Yellow-Green", "Warm Brown", "Camel", "Beige"]
      },
      metals: ["Silver", "Platinum", "White Gold"],
      makeup: {
        lips: ["True Red", "Fuchsia", "Berry", "Pink"],
        eyes: ["Silver", "Charcoal", "Navy", "Plum"],
        cheeks: ["Cool Pink", "Raspberry", "Plum"]
      },
      celebrities: ["Anne Hathaway", "Courteney Cox", "Lupita Nyong'o", "Zooey Deschanel", "Lily Collins"],
      perfectOutfit: "A white blouse, navy pants, and silver accessories would be perfect for your Winter coloring."
    },
    spring: {
      season: "Spring",
      description: "People with Spring coloring have warm undertones with low to medium contrast between their hair, skin, and eyes. Your coloring is light, bright, and clear.",
      colors: {
        best: ["Peach", "Coral", "Light Turquoise", "Warm Yellow", "Light Green", "Warm Pink", "Sky Blue"],
        avoid: ["Black", "Dark Brown", "Burgundy", "Charcoal Gray", "Dark Purple"]
      },
      metals: ["Gold", "Rose Gold", "Copper"],
      makeup: {
        lips: ["Coral", "Peachy Pink", "Light Warm Red", "Warm Pink"],
        eyes: ["Light Gold", "Peach", "Warm Green", "Coral"],
        cheeks: ["Peach", "Apricot", "Coral"]
      },
      celebrities: ["Nicole Kidman", "Emma Stone", "Amy Adams", "Drew Barrymore", "Taylor Swift"],
      perfectOutfit: "A peach blouse, turquoise accessories, and light blue jeans would highlight your Spring coloring."
    },
    summer: {
      season: "Summer",
      description: "People with Summer coloring have cool undertones with low contrast between their hair, skin, and eyes. Your coloring is soft, muted, and delicate.",
      colors: {
        best: ["Soft Pink", "Lavender", "Powder Blue", "Slate Blue", "Sage Green", "Mauve", "Soft Navy"],
        avoid: ["Bright Orange", "Bright Yellow", "Tomato Red", "Black", "Bright White"]
      },
      metals: ["Silver", "Platinum", "White Gold"],
      makeup: {
        lips: ["Rose", "Soft Pink", "Mauve", "Plum"],
        eyes: ["Taupe", "Soft Gray", "Lavender", "Slate Blue"],
        cheeks: ["Soft Rose", "Cool Pink", "Plum"]
      },
      celebrities: ["Kate Middleton", "Jodie Foster", "Cate Blanchett", "Selena Gomez", "Jennifer Aniston"],
      perfectOutfit: "A lavender top, soft navy pants, and silver jewelry would complement your Summer coloring."
    },
    autumn: {
      season: "Autumn",
      description: "People with Autumn coloring have warm undertones with medium to low contrast between their hair, skin, and eyes. Your coloring is rich, warm, and earthy.",
      colors: {
        best: ["Terracotta", "Olive Green", "Mustard Yellow", "Burnt Orange", "Teal", "Burgundy", "Warm Brown"],
        avoid: ["Black", "Pure White", "Pastel Pink", "Icy Blue", "Bright Fuchsia"]
      },
      metals: ["Gold", "Bronze", "Copper"],
      makeup: {
        lips: ["Terracotta", "Brick Red", "Warm Nude", "Peach"],
        eyes: ["Bronze", "Copper", "Forest Green", "Warm Browns"],
        cheeks: ["Peach", "Warm Coral", "Terracotta"]
      },
      celebrities: ["Jennifer Lopez", "Jessica Alba", "Beyoncé", "Blake Lively", "Gisele Bündchen"],
      perfectOutfit: "A mustard yellow sweater, dark olive pants, and gold accessories would be perfect for your Autumn coloring."
    }
  };

  useEffect(() => {
    // Set the result based on the URL parameter
    if (seasonParam && seasonParam in seasons) {
      setResult(seasons[seasonParam as keyof typeof seasons]);
    } else {
      // Default to autumn if no valid parameter
      setResult(seasons.autumn);
    }
  }, [seasonParam]);

  // Show loading state
  if (!result) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <main>
      <Header />
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/quizzes/seasonal-color" className="text-primary hover:underline inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Quiz
              </Link>
            </div>
            
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className={`py-8 px-6 text-center bg-gradient-to-r ${
                result.season === 'Winter' ? 'from-blue-100 to-purple-100' :
                result.season === 'Spring' ? 'from-yellow-100 to-green-100' :
                result.season === 'Summer' ? 'from-pink-100 to-blue-100' :
                'from-orange-100 to-amber-100'
              }`}>
                <h1 className="text-4xl font-display font-bold text-dark mb-2">You're a {result.season} Type!</h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">{result.description}</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                      <span className="text-2xl mr-2">✨</span> Best Colors
                    </h2>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.colors.best.map((color: string, index: number) => (
                          <span key={index} className="bg-orange-50 text-orange-800 px-3 py-1 rounded-full text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600">These colors complement your natural coloring and will make you glow!</p>
                    </div>
                    
                    <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                      <span className="text-2xl mr-2">⚠️</span> Colors to Avoid
                    </h2>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {result.colors.avoid.map((color: string, index: number) => (
                          <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {color}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600">These colors may wash you out or clash with your natural coloring.</p>
                    </div>
                    
                    <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                      <span className="text-2xl mr-2">💄</span> Makeup Recommendations
                    </h2>
                    <div className="space-y-3 mb-6">
                      <div>
                        <h3 className="font-bold text-gray-700">Lips:</h3>
                        <p className="text-gray-600">{result.makeup.lips.join(", ")}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700">Eyes:</h3>
                        <p className="text-gray-600">{result.makeup.eyes.join(", ")}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-700">Cheeks:</h3>
                        <p className="text-gray-600">{result.makeup.cheeks.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                      <span className="text-2xl mr-2">💍</span> Best Metals
                    </h2>
                    <div className="mb-6">
                      <p className="text-gray-600">{result.metals.join(", ")}</p>
                    </div>
                    
                    <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                      <span className="text-2xl mr-2">👗</span> Perfect Outfit Example
                    </h2>
                    <div className="mb-6">
                      <p className="text-gray-600">{result.perfectOutfit}</p>
                    </div>
                    
                    <h2 className="text-xl font-bold text-dark mb-4 flex items-center">
                      <span className="text-2xl mr-2">🌟</span> Celebrity Color Twins
                    </h2>
                    <div className="mb-6">
                      <p className="text-gray-600">{result.celebrities.join(", ")}</p>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-6 mt-8">
                      <h3 className="font-bold text-orange-800 mb-2">Shopping Tip</h3>
                      <p className="text-orange-700">Save your color palette to your phone and reference it when shopping for clothes, accessories, or makeup. This will help you build a wardrobe that makes you look your best!</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 border-t pt-8 flex justify-center space-x-4">
                  <Link
                    href="/quizzes"
                    className="px-6 py-3 border border-primary text-primary hover:bg-primary hover:text-white transition rounded-full font-medium"
                  >
                    Try Another Quiz
                  </Link>
                  
                  <button
                    className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-opacity-90 transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Results
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