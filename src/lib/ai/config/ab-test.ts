export interface ChatVariant {
  id: string;
  name: string;
  description: string;
  features: {
    responseStyle: 'casual' | 'professional' | 'mixed';
    useEmojis: boolean;
    showTimestamp: boolean;
    showTypingIndicator: boolean;
    messageAlignment: 'left' | 'right' | 'mixed';
    bubbleStyle: 'modern' | 'classic' | 'minimal';
    animationStyle: 'fade' | 'slide' | 'bounce';
  };
}

export const CHAT_VARIANTS: ChatVariant[] = [
  {
    id: 'A',
    name: 'Casual Glam',
    description: 'Friendly, emoji-rich interface with modern styling',
    features: {
      responseStyle: 'casual',
      useEmojis: true,
      showTimestamp: true,
      showTypingIndicator: true,
      messageAlignment: 'mixed',
      bubbleStyle: 'modern',
      animationStyle: 'bounce'
    }
  },
  {
    id: 'B',
    name: 'Professional Chic',
    description: 'Clean, minimal interface with professional tone',
    features: {
      responseStyle: 'professional',
      useEmojis: false,
      showTimestamp: true,
      showTypingIndicator: false,
      messageAlignment: 'left',
      bubbleStyle: 'minimal',
      animationStyle: 'fade'
    }
  }
];

export interface ABTestMetrics {
  variantId: string;
  messageCount: number;
  averageResponseTime: number;
  userSatisfactionScore?: number;
  completedActions: number;
  sessionDuration: number;
  returnVisits: number;
}

export const getRandomVariant = (): ChatVariant => {
  const randomIndex = Math.floor(Math.random() * CHAT_VARIANTS.length);
  return CHAT_VARIANTS[randomIndex];
};

export const trackMetrics = (metrics: Partial<ABTestMetrics>) => {
  // TODO: Implement metrics tracking
  console.log('Tracking metrics:', metrics);
}; 