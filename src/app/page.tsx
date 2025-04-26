import React from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import FeatureSection from '@/components/FeatureSection'
import QuizSection from '@/components/QuizSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <FeatureSection />
      <QuizSection />
      <Footer />
    </main>
  )
} 