import Link from 'next/link';

export default function HairColorQuiz() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Hair Color Analysis Quiz</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Find Your Perfect Hair Color</h2>
        <p className="mb-4">
          Thinking about changing your hair color but not sure which shade would look best? 
          This quiz will help you determine the most flattering hair colors based on your skin tone, eye color, and personal style.
        </p>
        <p className="mb-4">
          By analyzing your natural features and preferences, we can recommend hair colors that 
          will enhance your appearance and make you look more vibrant.
        </p>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">This quiz will help you:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identify hair colors that complement your skin undertone</li>
            <li>Find shades that enhance your eye color</li>
            <li>Discover colors that match your personal style</li>
            <li>Learn which hair colors to avoid</li>
          </ul>
        </div>
        
        <p className="text-sm italic mb-4">
          The quiz takes approximately 3 minutes to complete.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Link 
          href="/quizzes/hair-color/start" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
} 