import Link from 'next/link';

export default function HairColorQuiz() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative">
      {/* Decorative elements */}
      <div className="absolute -top-20 right-0 w-full pointer-events-none">
        <div className="absolute right-0 opacity-20">
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-rose-300 to-orange-300 blur-3xl"></div>
          <div className="w-64 h-64 rounded-full bg-gradient-to-tr from-red-300 to-pink-300 blur-3xl ml-20 -mt-10"></div>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <div className="inline-block mb-3">
          <span className="text-2xl">💇‍♀️</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-red-500 to-rose-500">
          Hair Color Analysis Quiz
        </h1>
        <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-orange-300 via-red-300 to-rose-300"></div>
      </div>
      
      <div className="bg-gradient-to-r from-orange-50 to-rose-50 p-8 rounded-xl shadow-md border border-rose-100 mb-10 relative overflow-hidden">
        <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-200 to-rose-200 blur-xl"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-xl font-semibold mb-4 text-slate-800">Find Your Perfect Hair Color</h2>
          <p className="mb-4 text-slate-700">
            Thinking about changing your hair color but not sure which shade would look best? 
            This quiz will help you determine the most flattering hair colors based on your skin tone, eye color, and personal style.
          </p>
          <p className="mb-6 text-slate-700">
            By analyzing your natural features and preferences, we can recommend hair colors that 
            will enhance your appearance and make you look more vibrant.
          </p>
          
          <div className="mb-6 bg-white/50 p-5 rounded-lg border border-rose-100">
            <h3 className="font-medium mb-3 text-slate-800">This quiz will help you:</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <li className="flex items-center text-slate-700">
                <span className="text-rose-400 mr-2">✓</span>
                Identify hair colors that complement your skin undertone
              </li>
              <li className="flex items-center text-slate-700">
                <span className="text-rose-400 mr-2">✓</span>
                Find shades that enhance your eye color
              </li>
              <li className="flex items-center text-slate-700">
                <span className="text-rose-400 mr-2">✓</span>
                Discover colors that match your personal style
              </li>
              <li className="flex items-center text-slate-700">
                <span className="text-rose-400 mr-2">✓</span>
                Learn which hair colors to avoid
              </li>
            </ul>
          </div>
          
          <p className="text-sm text-slate-600 mb-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            The quiz takes approximately 3 minutes to complete.
          </p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link 
          href="/quizzes/hair-color/start" 
          className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
        >
          <span className="relative z-10">Start Quiz</span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
        </Link>
      </div>
    </div>
  );
} 