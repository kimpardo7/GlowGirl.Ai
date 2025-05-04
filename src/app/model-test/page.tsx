'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const MODELS = [
  'facebook/blenderbot-400M-distill'
] as const;

const TEST_PROMPT = "I am going to a wedding I want to wear a formal but simple silk dress these are the 2 options, a v neckline bright fun yellow sparkle dress with a slit, and the 2nd one is a Champagne pink that has a glistening texture and has no slit, and it shows my body. Which one should I wear?";

interface ModelResponse {
  model: string;
  response: string;
  error?: string;
  latency: number;
  status: 'undecided' | 'consider' | 'reject';
}

export default function ModelTest() {
  const [responses, setResponses] = useState<ModelResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const startTest = async () => {
    setIsLoading(true);
    setResponses([]);

    const results: ModelResponse[] = [];

    for (const model of MODELS) {
      const startTime = Date.now();
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: TEST_PROMPT,
            model,
          }),
        });

        const data = await response.json();
        const latency = Date.now() - startTime;

        if (!response.ok) {
          results.push({
            model,
            response: '',
            error: data.error || 'Failed to get response',
            latency,
            status: 'undecided'
          });
        } else {
          results.push({
            model,
            response: Array.isArray(data) ? data[0].generated_text : data,
            latency,
            status: 'undecided'
          });
        }
      } catch (error) {
        results.push({
          model,
          response: '',
          error: 'Failed to connect to the model',
          latency: Date.now() - startTime,
          status: 'undecided'
        });
      }
      setResponses([...results]);
    }

    setIsLoading(false);
  };

  const updateModelStatus = (model: string, status: 'consider' | 'reject') => {
    setResponses(prev => 
      prev.map(r => 
        r.model === model 
          ? { ...r, status } 
          : r
      )
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h1 className="text-2xl font-bold mb-6">Model Testing Page</h1>
      
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="font-semibold mb-2">Test Prompt:</h2>
        <p className="text-gray-700">{TEST_PROMPT}</p>
      </div>

      <div className="mb-6">
        <Button 
          onClick={startTest}
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Testing Models...' : 'Start Test'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {responses.map((result) => (
          <Card key={result.model} className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">{result.model}</h3>
              <div className="flex gap-2">
                <Button
                  onClick={() => updateModelStatus(result.model, 'consider')}
                  className={`px-3 py-1 ${result.status === 'consider' ? 'bg-green-500' : 'bg-gray-200'}`}
                  disabled={isLoading}
                >
                  Consider
                </Button>
                <Button
                  onClick={() => updateModelStatus(result.model, 'reject')}
                  className={`px-3 py-1 ${result.status === 'reject' ? 'bg-red-500' : 'bg-gray-200'}`}
                  disabled={isLoading}
                >
                  Reject
                </Button>
              </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">
              Response Time: {result.latency}ms
            </div>

            <div className="bg-gray-50 p-4 rounded">
              {result.error ? (
                <div className="text-red-500">{result.error}</div>
              ) : (
                <div className="whitespace-pre-wrap">{result.response}</div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {responses.length > 0 && !isLoading && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-4">Test Results Summary:</h2>
          <div className="space-y-2">
            {responses.map((result) => (
              <div key={result.model} className="flex items-center justify-between">
                <div className="font-mono">{result.model}</div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Response Time: {result.latency}ms
                  </div>
                  <div className={`px-2 py-1 rounded text-white text-sm ${
                    result.status === 'consider' ? 'bg-green-500' : 
                    result.status === 'reject' ? 'bg-red-500' : 
                    'bg-gray-400'
                  }`}>
                    {result.status === 'undecided' ? 'Pending Decision' : 
                     result.status === 'consider' ? 'Under Consideration' : 
                     'Rejected'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 