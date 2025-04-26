'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SilverGoldResults() {
  const searchParams = useSearchParams();
  const result = searchParams.get('result');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Set content based on result
    if (result === 'silver') {
      setTitle('You Look Best in Silver Tones!');
      setDescription('Your skin has cool undertones that naturally complement silver, platinum, and white gold. These metals enhance your natural coloring and give you a harmonious, polished appearance.');
      setRecommendations([
        'Silver, platinum, and white gold jewelry',
        'Cool-toned gemstones like blue sapphires, amethysts, and emeralds',
        'Accessories with cool metallic finishes',
        'Watches with silver-toned cases and bracelets'
      ]);
    } else if (result === 'gold') {
      setTitle('You Look Best in Gold Tones!');
      setDescription('Your skin has warm undertones that naturally complement yellow gold, rose gold, and copper. These metals bring out the warmth in your complexion and give you a radiant, glowing appearance.');
      setRecommendations([
        'Yellow gold, rose gold, and copper jewelry',
        'Warm-toned gemstones like citrine, ruby, and amber',
        'Accessories with warm metallic finishes',
        'Watches with gold-toned cases and bracelets'
      ]);
    } else {
      setTitle('You Look Great in Both Silver and Gold!');
      setDescription('You have neutral undertones that complement both cool and warm metals. This versatility allows you to wear silver, gold, or mixed metals depending on your outfit or mood.');
      setRecommendations([
        'Mix and match silver and gold pieces',
        'Two-tone jewelry that combines both metals',
        'A variety of gemstones across the color spectrum',
        'Accessories in either metal tone based on your outfit'
      ]);
    }
  }, [result]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Results</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">{title}</h2>
        
        <p className="mb-6 text-lg">
          {description}
        </p>
        
        <div className="mb-6">
          <h3 className="font-medium mb-3 text-lg">Recommendations for you:</h3>
          <ul className="list-disc pl-5 space-y-2">
            {recommendations.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-100">
          <h3 className="font-medium mb-2">Style Tip</h3>
          <p>
            Remember that these are guidelines, not strict rules. Your personal style and preferences should always come first!
            If you love a piece of jewelry that doesn't match your "recommended" metal tone, wear it with confidence.
          </p>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Link 
          href="/quizzes/silver-gold" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Retake Quiz
        </Link>
        <Link 
          href="/quizzes" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Try Other Quizzes
        </Link>
      </div>
    </div>
  );
} 