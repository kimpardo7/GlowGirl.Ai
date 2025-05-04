"use client";
import React, { useState } from 'react';
import { glamMakeupGuide } from '@/lib/data/glam-makeup-guide';
import Link from 'next/link';

type SectionKey = keyof typeof glamMakeupGuide.steps;

interface Step {
  number: number;
  name: string;
  budget: {
    name: string;
    price: string;
  };
  premium: {
    name: string;
    price: string;
  };
}

export default function GlamMakeupGuide() {
  const [activeSection, setActiveSection] = useState<SectionKey>('prep');
  const [showBudget, setShowBudget] = useState(true);
  const [search, setSearch] = useState('');

  const sections = Object.keys(glamMakeupGuide.steps) as SectionKey[];

  // Gather all steps with section info for searching
  const allSteps: { section: SectionKey; sectionTitle: string; step: Step }[] = [];
  sections.forEach(section => {
    glamMakeupGuide.steps[section].steps.forEach((step: Step) => {
      allSteps.push({ section, sectionTitle: glamMakeupGuide.steps[section].title, step });
    });
  });

  const filteredSteps = search.trim()
    ? allSteps.filter(({ step }) =>
        step.name.toLowerCase().includes(search.toLowerCase()) ||
        step.budget.name.toLowerCase().includes(search.toLowerCase()) ||
        step.premium.name.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">{glamMakeupGuide.title}</h1>
      <p className="text-gray-600 text-center mb-8">{glamMakeupGuide.description}</p>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for a makeup step or product..."
          className="w-full max-w-md px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </div>

      {/* If searching, show filtered steps */}
      {search.trim() ? (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          {filteredSteps.length === 0 ? (
            <p className="text-gray-500">No steps or products found for "{search}".</p>
          ) : (
            <div className="space-y-6">
              {filteredSteps.map(({ section, sectionTitle, step }) => (
                <div key={section + '-' + step.number} className="border-b pb-4">
                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-2">{step.name}</h3>
                      <p className="text-xs text-gray-400 mb-1">{sectionTitle}</p>
                      <div className="text-gray-600">
                        {showBudget ? (
                          <div>
                            <p className="font-medium">Budget Option:</p>
                            <p>{step.budget.name}</p>
                            <p className="text-sm text-gray-500">{step.budget.price}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">Premium Option:</p>
                            <p>{step.premium.name}</p>
                            <p className="text-sm text-gray-500">{step.premium.price}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Price Range Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setShowBudget(true)}
                className={`px-4 py-2 rounded-full ${
                  showBudget ? 'bg-white shadow' : 'text-gray-600'
                }`}
              >
                Budget Options
              </button>
              <button
                onClick={() => setShowBudget(false)}
                className={`px-4 py-2 rounded-full ${
                  !showBudget ? 'bg-white shadow' : 'text-gray-600'
                }`}
              >
                Premium Options
              </button>
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-full ${
                  activeSection === section
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {glamMakeupGuide.steps[section].title}
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {glamMakeupGuide.steps[activeSection].title}
            </h2>
            <div className="space-y-6">
              {glamMakeupGuide.steps[activeSection].steps.map((step: Step) => (
                <div key={step.number} className="border-b pb-4">
                  <div className="flex items-start">
                    <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-semibold mb-2">{step.name}</h3>
                      <div className="text-gray-600">
                        {showBudget ? (
                          <div>
                            <p className="font-medium">Budget Option:</p>
                            <p>{step.budget.name}</p>
                            <p className="text-sm text-gray-500">{step.budget.price}</p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">Premium Option:</p>
                            <p>{step.premium.name}</p>
                            <p className="text-sm text-gray-500">{step.premium.price}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pinterest Links */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Inspiration Links:</h3>
              <div className="flex flex-wrap gap-4">
                {glamMakeupGuide.steps[activeSection].pinterestLinks.map((link: string, index: number) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full hover:bg-pink-200 transition-colors"
                  >
                    Pinterest Inspiration {index + 1}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Complete Look Inspiration */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{glamMakeupGuide.inspiration.title}</h2>
        <div className="flex flex-wrap gap-4">
          {glamMakeupGuide.inspiration.links.map((link: string, index: number) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors"
            >
              Complete Look {index + 1}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 