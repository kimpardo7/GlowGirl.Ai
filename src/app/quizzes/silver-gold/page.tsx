import Link from 'next/link';

export default function SilverGoldQuiz() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Silver or Gold Quiz</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Discover Your Metal Preference</h2>
        <p className="mb-4">
          Not sure whether silver or gold jewelry looks better on you? This quiz will help you determine 
          which metal tone complements your skin undertone the best.
        </p>
        <p className="mb-4">
          By answering a few simple questions about your natural coloring and preferences, 
          we can help guide you to your ideal metal tone that will make you look and feel your best.
        </p>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">This quiz will help you:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identify whether you have warm or cool skin undertones</li>
            <li>Determine if silver, gold, or both complement your natural coloring</li>
            <li>Make better decisions when purchasing jewelry</li>
            <li>Enhance your overall look with the right metal accessories</li>
          </ul>
        </div>
        
        <p className="text-sm italic mb-4">
          The quiz takes approximately 3 minutes to complete.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Link 
          href="/quizzes/silver-gold/start" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
} 