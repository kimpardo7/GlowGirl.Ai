'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AIService, ChatMessage, StyleContext } from '@/lib/ai/services/chat';
import ReactMarkdown from 'react-markdown';
import { chatIntros } from '@/lib/data/chat-intros';
import { ChatVariant, getRandomVariant, trackMetrics } from '@/lib/ai/config/ab-test';
import { useRouter } from 'next/navigation';

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
  const [isClient, setIsClient] = useState(false);
  const [variant, setVariant] = useState<ChatVariant>(getRandomVariant());
  const [sessionStartTime] = useState<number>(Date.now());
  const [metrics, setMetrics] = useState<{
    messageCount: number;
    totalResponseTime: number;
    completedActions: number;
  }>({
    messageCount: 0,
    totalResponseTime: 0,
    completedActions: 0
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const aiService = useRef(new AIService());
  const router = useRouter();
  
  // Get a random intro message on each render
  const introIndex = Math.floor(Math.random() * chatIntros.length);
  const introMessage = variant.features.useEmojis 
    ? chatIntros[introIndex].text 
    : chatIntros[introIndex].text.replace(/[^\x00-\x7F]/g, '');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Add keyframes for fade-in animation based on variant
    const style = document.createElement('style');
    const animation = variant.features.animationStyle === 'bounce' 
      ? `
        @keyframes bounceIn {
          from { opacity: 0; transform: scale(0.3) translateY(20px); }
          50% { transform: scale(1.05) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .message-animation { animation: bounceIn 0.5s ease-out forwards; }
      `
      : variant.features.animationStyle === 'slide'
      ? `
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .message-animation { animation: slideIn 0.3s ease-out forwards; }
      `
      : `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .message-animation { animation: fadeIn 0.2s ease-out forwards; }
      `;
    
    style.textContent = animation;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [variant]);

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
              content: variant.features.useEmojis 
                ? "Psst! 💡 Take our quick style quizzes to get the most personalized recommendations. [Start the quizzes here!](/quizzes) ✨"
                : "Take our quick style quizzes to get the most personalized recommendations. [Start the quizzes here!](/quizzes)",
              timestamp: new Date()
            }
          ]);
        }, 1200);
      }
    }
  }, [userProfile, variant]);

  // Track metrics when component unmounts
  useEffect(() => {
    return () => {
      const sessionDuration = (Date.now() - sessionStartTime) / 1000; // in seconds
      trackMetrics({
        variantId: variant.id,
        messageCount: metrics.messageCount,
        averageResponseTime: metrics.messageCount > 0 
          ? metrics.totalResponseTime / metrics.messageCount 
          : 0,
        completedActions: metrics.completedActions,
        sessionDuration
      });
    };
  }, [metrics, variant, sessionStartTime]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsLoading(true);
    const startTime = Date.now();

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
      const responseTime = Date.now() - startTime;
      
      // Update metrics
      setMetrics(prev => ({
        messageCount: prev.messageCount + 1,
        totalResponseTime: prev.totalResponseTime + responseTime,
        completedActions: prev.completedActions + (response.includes('[') ? 1 : 0)
      }));
      
      // Add AI response to UI
      const newAiMessage: ChatMessage = {
        role: 'assistant',
        content: variant.features.useEmojis ? response : response.replace(/[^\x00-\x7F]/g, ''),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, newAiMessage]);

      // Call onMessage callback if provided
      onMessage?.(userMessage);
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: variant.features.useEmojis 
            ? "Oops! 😅 I had a little glitch. Could you try asking that again?" 
            : "I apologize for the error. Could you please try asking that again?",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
      setMetrics(prev => ({
        ...prev,
        completedActions: prev.completedActions + 1
      }));
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      e.preventDefault();
      const href = target.getAttribute('href');
      if (href) {
        router.push(href);
      }
    }
  };

  const getBubbleStyle = (isUser: boolean) => {
    const baseStyle = "rounded-lg px-4 py-2 max-w-[80%] shadow-md text-sm whitespace-pre-line ";
    
    switch (variant.features.bubbleStyle) {
      case 'modern':
        return baseStyle + (isUser 
          ? "bg-gradient-to-r from-pink-100 to-rose-100 text-right self-end"
          : "bg-gradient-to-r from-slate-50 to-white border border-slate-100 text-left self-start");
      case 'minimal':
        return baseStyle + (isUser
          ? "bg-gray-100 text-right self-end"
          : "bg-white border border-gray-200 text-left self-start");
      default:
        return baseStyle + (isUser
          ? "bg-pink-100 text-right self-end"
          : "bg-white border border-slate-100 text-left self-start");
    }
  };

  if (!isClient) {
    return <div className="flex-1 p-4">Loading chat...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] bg-white rounded-lg">
      {/* Chat Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex w-full mb-2 ${
              message.role === 'user' 
                ? 'justify-end' 
                : variant.features.messageAlignment === 'mixed'
                ? 'justify-start'
                : `justify-${variant.features.messageAlignment}`
            }`}
          >
            <div 
              className={`message-animation ${getBubbleStyle(message.role === 'user')}`}
              onClick={handleLinkClick}
            >
              {message.role === 'assistant' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
              ) : (
                <span>{message.content}</span>
              )}
              {variant.features.showTimestamp && (
                <div className="text-xs text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && variant.features.showTypingIndicator && (
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
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={variant.features.useEmojis ? "Ask me anything! ✨" : "Ask me anything..."}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isLoading 
                ? 'bg-gray-200 text-gray-500' 
                : variant.features.bubbleStyle === 'modern'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600'
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            {variant.features.useEmojis ? "Send ✨" : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
} 