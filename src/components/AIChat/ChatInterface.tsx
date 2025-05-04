'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AIService, ChatMessage, StyleContext } from '@/lib/ai/services/chat';
import ReactMarkdown from 'react-markdown';
import { chatIntros } from '@/lib/data/chat-intros';

type ExtendedUserProfile = StyleContext['userProfile'] & {
  hasCompletedQuizzes?: boolean;
};

interface ChatInterfaceProps {
  userProfile?: ExtendedUserProfile;
  onMessage?: (message: string) => void;
  onImageUpload?: (file: File) => void;
}

export default function ChatInterface({ userProfile, onMessage, onImageUpload }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = useRef(new AIService());
  
  // Get a random intro message on each render
  const introIndex = Math.floor(Math.random() * chatIntros.length);
  const introMessage = chatIntros[introIndex].text;

  useEffect(() => {
    // Add keyframes for fade-in animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .welcome-fade-in {
        animation: slideIn 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (userProfile) {
      aiService.current.updateContext({ userProfile });
    }
  }, [userProfile]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessages: ChatMessage[] = [
        {
          role: 'assistant',
          content: introMessage,
          timestamp: new Date()
        }
      ];
      setMessages(initialMessages);
      if (userProfile && userProfile.hasCompletedQuizzes === false) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              role: 'assistant',
              content: "Psst! 💡 Take our quick style quizzes to get the most personalized recommendations. [Start the quizzes here!](/quizzes) ✨",
              timestamp: new Date()
            }
          ]);
        }, 1200);
      }
    }
  }, [userProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);

    // Add user message to UI
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newUserMessage]);

    try {
      // Get AI response
      const response = await aiService.current.generateResponse(userMessage);
      
      // Add AI response to UI
      const newAiMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newAiMessage]);

      // Call onMessage callback if provided
      onMessage?.(userMessage);
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] bg-white rounded-lg">
      {/* Chat Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full mb-2 ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] shadow-md text-sm whitespace-pre-line ${
                message.role === 'user'
                  ? 'bg-pink-100 text-right self-end'
                  : 'bg-white border border-slate-100 text-left self-start'
              }`}
            >
              {message.role === 'assistant' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <span>{message.content}</span>
              )}
              <div className="text-xs text-gray-400 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-slate-200 p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your style..."
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="rounded-full bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
          >
            Send
          </button>
          {onImageUpload && (
            <label className="rounded-full bg-slate-100 px-4 py-2 text-slate-700 hover:bg-slate-200 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              📷
            </label>
          )}
        </div>
      </form>
    </div>
  );
} 