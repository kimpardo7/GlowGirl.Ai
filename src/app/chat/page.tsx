'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/AIChat/ChatInterface';

export default function ChatPage() {
  const handleMessage = (message: string) => {
    // Handle message if needed (e.g., analytics)
    console.log('User message:', message);
  };

  const handleImageUpload = (file: File) => {
    // Handle image upload if needed
    console.log('Image uploaded:', file.name);
  };

  return (
    <main className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Header />
      
      <section className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4 text-center">
            Chat with GlowGirl.AI
          </h1>
          <p className="text-xl text-gray-700 mb-6 text-center">
            Get personalized style advice and recommendations from our AI assistant.
          </p>
          
          <div className="bg-white rounded-xl shadow-lg">
            <ChatInterface
              onMessage={handleMessage}
              onImageUpload={handleImageUpload}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
} 