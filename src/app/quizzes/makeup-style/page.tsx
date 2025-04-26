import Link from 'next/link';

export default function MakeupStyleQuiz() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Makeup Style Quiz</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Discover Your Perfect Makeup Look</h2>
        <p className="mb-4">
          Not sure which makeup style suits you best? This quiz will help you identify 
          the makeup look that enhances your natural features and matches your personality.
        </p>
        <p className="mb-4">
          By answering a few questions about your preferences, lifestyle, and features, 
          we'll guide you to your ideal makeup style that will make you feel confident and beautiful.
        </p>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">This quiz will help you:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Determine which makeup intensities work best for you</li>
            <li>Identify the makeup style that matches your personality</li>
            <li>Learn which features to highlight for your face shape</li>
            <li>Get product recommendations that suit your needs</li>
          </ul>
        </div>
        
        <p className="text-sm italic mb-4">
          The quiz takes approximately 3 minutes to complete.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Link 
          href="/quizzes/makeup-style/start" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
} 