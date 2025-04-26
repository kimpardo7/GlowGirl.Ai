import React, { useState } from 'react'

interface FeedbackFormProps {
  type: 'suggestion' | 'issue'
  categories: Array<{
    id: string
    title: string
  }>
  onSubmit: (data: any) => void
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ type, categories, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    email: '',
    name: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const formTitle = type === 'suggestion' ? 'Submit a Suggestion' : 'Report an Issue'
  const formDescription = type === 'suggestion' 
    ? 'Share your ideas for new features or improvements to help us make GlowGirl.AI even better!'
    : 'Let us know about any problems or bugs you\'ve encountered so we can fix them quickly.'
  const buttonText = type === 'suggestion' ? 'Submit Suggestion' : 'Report Issue'
  const categoryLabel = type === 'suggestion' ? 'Suggestion Type' : 'Issue Type'
  
  const gradientColors = type === 'suggestion' 
    ? 'from-amber-500 via-orange-500 to-rose-500' 
    : 'from-rose-500 via-violet-500 to-indigo-500'
  
  const lightGradient = type === 'suggestion'
    ? 'from-amber-100 to-rose-100'
    : 'from-rose-100 to-violet-100'
  
  const formIcon = type === 'suggestion' ? '💫' : '✨'

  return (
    <div className={`bg-white rounded-xl shadow-md p-8 border border-slate-100 relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 opacity-10 pointer-events-none">
        <div className={`w-40 h-40 rounded-full bg-gradient-to-br ${lightGradient} blur-2xl`}></div>
      </div>
      
      <div className="relative">
        <div className="inline-block mb-3">
          <span className="text-2xl">{formIcon}</span>
        </div>
        
        <h2 className={`text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r ${gradientColors}`}>
          {formTitle}
        </h2>
        <p className="text-gray-600 mb-8">{formDescription}</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-transparent transition-all shadow-sm"
                placeholder="Jane Doe"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-transparent transition-all shadow-sm"
                placeholder="jane@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">{categoryLabel}</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-transparent transition-all shadow-sm"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-transparent transition-all shadow-sm"
              placeholder={type === 'suggestion' ? "E.g., Add a skin tone matching feature" : "E.g., Quiz results not saving"}
              required
            />
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-200 focus:border-transparent transition-all shadow-sm"
              placeholder="Please provide as much detail as possible..."
              required
            ></textarea>
          </div>
          
          {type === 'issue' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Steps to Reproduce (if applicable)</label>
              <div className="bg-gradient-to-r from-rose-50 to-violet-50 p-4 rounded-lg border border-slate-100">
                <ol className="list-decimal pl-4 space-y-2 text-slate-600">
                  <li>First, I...</li>
                  <li>Then, I...</li>
                  <li>After that, I...</li>
                  <li>Finally, I observed...</li>
                </ol>
                <p className="text-xs text-slate-500 mt-2">Please replace with your actual steps</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              className={`relative overflow-hidden px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r ${gradientColors} hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group`}
            >
              <span className="relative z-10">{buttonText}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FeedbackForm 