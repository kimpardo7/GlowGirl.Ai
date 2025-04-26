'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MakeupStyleResults() {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get('style');
  const [result, setResult] = useState<any>(null);

  // Style data
  const styles = {
    natural: {
      title: "Natural Beauty",
      description: "You prefer a fresh-faced, minimal makeup look that enhances your natural features without looking 'made up'. Your approach to makeup is effortless and understated.",
      products: [
        "Tinted moisturizer or sheer foundation",
        "Cream blush in a natural flush shade",
        "Mascara (brown or black)",
        "Tinted lip balm or sheer lipstick",
        "Neutral eyeshadow (optional)"
      ],
      techniques: [
        "Focus on skincare as the foundation",
        "Apply products with fingers for a seamless finish",
        "Stick to neutral, skin-like colors",
        "Emphasize lashes with curling and mascara",
        "Use cream products for a dewy finish"
      ],
      perfect_for: [
        "Everyday wear",
        "Work environments",
        "Casual outings",
        "Those who prefer a quick routine",
        "Enhancing youthful features"
      ],
      inspiration: ["Zoe Kravitz", "Dakota Johnson", "Hailey Bieber"]
    },
    classic: {
      title: "Timeless Elegance",
      description: "You appreciate a polished, put-together look that never goes out of style. Your makeup is refined and enhances your features in a balanced way that looks appropriate for any occasion.",
      products: [
        "Medium coverage foundation",
        "Neutral eyeshadow palette",
        "Black or brown eyeliner",
        "Mascara",
        "Blush in a natural shade",
        "Lipstick in a versatile shade (mauve, rose, or nude)"
      ],
      techniques: [
        "Create a flawless base with foundation and concealer",
        "Define eyes with subtle shadow and liner",
        "Apply blush to the apples of cheeks",
        "Use lip liner for definition",
        "Set makeup with powder for longevity"
      ],
      perfect_for: [
        "Professional settings",
        "Special occasions",
        "Photographs",
        "Those who want a versatile look",
        "Day to evening transitions"
      ],
      inspiration: ["Kate Middleton", "Jennifer Aniston", "Amal Clooney"]
    },
    glamorous: {
      title: "Full Glam",
      description: "You love a dramatic, eye-catching makeup look that makes a statement. Your approach to makeup is bold and precise, showcasing your creativity and attention to detail.",
      products: [
        "Full coverage foundation",
        "Concealer for highlighting",
        "Contour and highlight products",
        "Eyeshadow palettes with varied finishes",
        "False lashes or volumizing mascara",
        "Precise eyeliner",
        "Bold lipstick"
      ],
      techniques: [
        "Create a flawless, matte base",
        "Contour and highlight for dimension",
        "Use multiple eyeshadow shades for depth",
        "Apply winged eyeliner or smokey eye techniques",
        "Define lips with liner and bold color"
      ],
      perfect_for: [
        "Evenings out",
        "Special events",
        "Photoshoots",
        "When you want to make a statement",
        "Occasions when looking polished is essential"
      ],
      inspiration: ["Kim Kardashian", "Ariana Grande", "Jennifer Lopez"]
    },
    trendy: {
      title: "Experimental & Creative",
      description: "You enjoy staying on the cutting edge of makeup trends and expressing yourself through color and unique techniques. Your approach to makeup is playful, artistic, and ever-evolving.",
      products: [
        "Multi-use color products",
        "Colorful eyeshadow palettes",
        "Graphic liners in various colors",
        "Glitter and shimmer products",
        "Bold or unusual lip colors",
        "Highlighters in unique shades"
      ],
      techniques: [
        "Experiment with color placement",
        "Try graphic liner shapes",
        "Mix textures (matte, glossy, shimmer)",
        "Play with negative space techniques",
        "Use unexpected color combinations"
      ],
      perfect_for: [
        "Creative environments",
        "Social media content",
        "Festivals and parties",
        "Self-expression",
        "When you want to make a bold statement"
      ],
      inspiration: ["Euphoria makeup", "Rihanna", "Doja Cat", "Lisa from Blackpink"]
    }
  };

  useEffect(() => {
    // Set the result based on the URL parameter
    if (styleParam && styleParam in styles) {
      setResult(styles[styleParam as keyof typeof styles]);
    } else {
      // Default to natural if no valid parameter
      setResult(styles.natural);
    }
  }, [styleParam]);

  // Show loading state
  if (!result) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Makeup Style</h1>
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
        <div className={`py-8 px-6 text-center ${
          styleParam === 'natural' ? 'bg-gradient-to-r from-green-100 to-blue-100' :
          styleParam === 'classic' ? 'bg-gradient-to-r from-pink-100 to-purple-100' :
          styleParam === 'glamorous' ? 'bg-gradient-to-r from-red-100 to-orange-100' :
          'bg-gradient-to-r from-purple-100 to-pink-100'
        }`}>
          <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{result.description}</p>
        </div>
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">💄</span> Recommended Products
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.products.map((product: string, index: number) => (
                  <li key={index} className="text-gray-700">{product}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">✨</span> Techniques to Master
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.techniques.map((technique: string, index: number) => (
                  <li key={index} className="text-gray-700">{technique}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">👍</span> Perfect For
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.perfect_for.map((occasion: string, index: number) => (
                  <li key={index} className="text-gray-700">{occasion}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🌟</span> Celebrity Inspiration
              </h3>
              <p className="text-gray-700 mb-6">{result.inspiration.join(", ")}</p>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">Pro Tip</h3>
                <p className="text-blue-700">
                  Remember that makeup is a form of self-expression! While these recommendations match your style, always feel free to experiment and adapt them to suit your preferences.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 border-t pt-8 flex justify-center space-x-4">
            <Link
              href="/quizzes/makeup-style"
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