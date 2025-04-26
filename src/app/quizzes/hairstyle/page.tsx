import Link from 'next/link';

export default function HairstyleQuiz() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Hairstyle Analysis Quiz</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Find Your Perfect Hairstyle</h2>
        <p className="mb-4">
          Considering a new hairstyle but not sure what would suit you best? This quiz will help you 
          determine which haircuts and styles will flatter your face shape, hair texture, and lifestyle.
        </p>
        <p className="mb-4">
          By answering questions about your face shape, hair type, maintenance preferences, and personal style, 
          we'll guide you to hairstyles that will enhance your best features and fit your daily routine.
        </p>
        
        <div className="mb-4">
          <h3 className="font-medium mb-2">This quiz will help you:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identify hairstyles that flatter your face shape</li>
            <li>Find cuts that work with your natural hair texture</li>
            <li>Determine styles that match your maintenance level</li>
            <li>Discover options that suit your personal style</li>
          </ul>
        </div>
        
        <p className="text-sm italic mb-4">
          The quiz takes approximately 3 minutes to complete.
        </p>
      </div>
      
      <div className="flex justify-center">
        <Link 
          href="/quizzes/hairstyle/start" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition duration-300"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );
} 