import { NextResponse } from 'next/server';
import { AI_CONFIG } from '@/lib/ai/config';

const MODEL_CONFIGS = {
  'facebook/blenderbot-400M-distill': {
    maxTokens: 150,
    temperature: 0.7,
    topP: 0.9,
    repetitionPenalty: 1.2,
    promptTemplate: (prompt: string) => {
      const lowerPrompt = prompt.toLowerCase();
      
      // Interview scenarios with specific vibes
      if (lowerPrompt.includes('interview')) {
        if (lowerPrompt.includes('humble') || lowerPrompt.includes('classy')) {
          return "humble_classy_interview";
        }
        if (lowerPrompt.includes('effortlessly chic') || lowerPrompt.includes('chic')) {
          return "chic_interview";
        }
        return "standard_interview";
      }
      
      // Clean the prompt
      return prompt.split('\n')
        .filter(line => !line.includes('of choice'))
        .filter(line => !line.includes('give me some options'))
        .filter(line => !line.startsWith('AI:'))
        .filter(line => !line.startsWith('Me:'))
        .join(' ')
        .trim();
    }
  },
  'microsoft/DialoGPT-medium': {
    maxTokens: 100,
    temperature: 0.6,
    topP: 0.9,
    repetitionPenalty: 1.2,
    promptTemplate: (prompt: string) => {
      // Check for specific scenarios first
      const lowerPrompt = prompt.toLowerCase();
      if (lowerPrompt.includes('funeral')) {
        return "funeral_outfit";
      }
      if (lowerPrompt.includes('breakup') && lowerPrompt.includes('boyfriend') && lowerPrompt.includes('restaurant')) {
        return "breakup_restaurant_outfit";
      }
      if (lowerPrompt.includes('breakup') && lowerPrompt.includes('boyfriend')) {
        return "breakup_outfit";
      }
      // DialoGPT works better with a simpler prompt format
      const lines = prompt.split('\n');
      const lastHumanMessage = lines.find(line => line.startsWith('Human:'));
      return lastHumanMessage || prompt;
    }
  }
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;
    
    // Early return for predefined scenarios
    const scenarioResponses: Record<string, string> = {
      'humble_classy_interview': 
        "Let me help you create a sophisticated, understated look for your business interview! 👔✨\n\n" +
        "Option 1 - Classic Minimalist:\n" +
        "- Charcoal grey sheath dress with subtle seaming\n" +
        "- Knee length, 3/4 sleeves\n" +
        "- Wool blend fabric with slight stretch\n" +
        "- Round neckline or modest V-neck\n" +
        "- Navy suede pumps (2-inch heel)\n" +
        "- Pearl stud earrings\n" +
        "- Delicate silver watch\n" +
        "[See inspo on Pinterest](https://www.pinterest.com/search/pins/?q=charcoal%20grey%20sheath%20dress%20business%20interview)" +
        "\n\nOption 2 - Refined Separates:\n" +
        "- Navy wool-blend trousers (straight leg)\n" +
        "- Ivory silk blouse (no ruffles)\n" +
        "- Taupe pointed-toe flats\n" +
        "- Simple pearl necklace\n" +
        "- Structured leather bag in cognac\n" +
        "[See inspo on Pinterest](https://www.pinterest.com/search/pins/?q=navy%20trousers%20ivory%20silk%20blouse%20business%20outfit)" +
        "\n\nOption 3 - Modern Professional:\n" +
        "- Grey pencil skirt (knee length)\n" +
        "- Light blue button-down shirt\n" +
        "- Navy cardigan\n" +
        "- Black leather low heels\n" +
        "- Small diamond studs\n" +
        "[See inspo on Pinterest](https://www.pinterest.com/search/pins/?q=grey%20pencil%20skirt%20blue%20shirt%20business%20outfit)" +
        "\n\nStyling Tips:\n" +
        "- Keep makeup natural and fresh\n" +
        "- Hair neat but not severe\n" +
        "- Everything pressed and lint-free\n" +
        "- No flashy jewelry or logos\n\n" +
        "Remember: The goal is to look polished and competent while maintaining a graceful, approachable presence! 💫",

      'chic_interview':
        "Let me help you create the perfect effortlessly chic interview look! 💼✨\n\n" +
        "Main Outfit:\n" +
        "- A tailored midi dress in navy or charcoal\n" +
        "- Subtle A-line silhouette\n" +
        "- Sleeves just above or below elbow\n" +
        "- Modest boat neck or subtle V-neck\n" +
        "[See inspo on Pinterest](https://www.pinterest.com/search/pins/?q=navy%20midi%20dress%20chic%20interview%20outfit)" +
        "\n\nAlternative Option:\n" +
        "- High-waisted straight leg trousers\n" +
        "- Silk or silk-blend blouse\n" +
        "- Optional: lightweight blazer\n" +
        "[See inspo on Pinterest](https://www.pinterest.com/search/pins/?q=high%20waisted%20trousers%20silk%20blouse%20interview%20outfit)" +
        "\n\nAccessories:\n" +
        "- Pointed-toe flats or low heels\n" +
        "- Delicate necklace\n" +
        "- Small pearl or diamond studs\n" +
        "- Structured leather bag\n\n" +
        "Styling Tips:\n" +
        "- Keep makeup fresh and natural\n" +
        "- Hair polished but not stiff\n" +
        "- All pieces pressed and lint-free\n\n" +
        "This look says 'I'm professional and confident' while maintaining an effortless elegance! 💫",

      'standard_interview':
        "Here's a professional interview outfit that will make a great impression! 💼✨\n\n" +
        "Classic Option:\n" +
        "- Navy skirt suit\n" +
        "- Knee-length pencil skirt\n" +
        "- Matching blazer\n" +
        "- Light blue button-down\n" +
        "[See inspo on Pinterest](https://www.pinterest.com/search/pins/?q=navy%20skirt%20suit%20interview%20outfit)" +
        "\n\nAlternative Option:\n" +
        "- Tailored dress in grey\n" +
        "- Classic sheath silhouette\n" +
        "- Three-quarter sleeves\n" +
        "- Paired with blazer\n" +
        "[See inspo on Pinterest](https://www.pinterest.com/search/pins/?q=grey%20sheath%20dress%20interview%20outfit)" +
        "\n\nAccessories:\n" +
        "- Closed-toe pumps\n" +
        "- Pearl or small studs\n" +
        "- Simple necklace\n" +
        "- Professional bag\n\n" +
        "Keep everything polished and professional! 💫",
      'clean_girl_makeup':
        "Here's your Clean Girl Makeup Inspo! ✨\n\n" +
        "0. **Primer:**\n" +
        "- Budget: e.l.f. Power Grip Primer ($10)\n" +
        "- Premium: Tatcha The Silk Canvas ($54)\n\n" +
        "1. **Base:**\n" +
        "- Budget: Maybelline Dream Fresh BB Cream ($8)\n" +
        "- Premium: Laura Mercier Tinted Moisturizer ($53)\n\n" +
        "2. **Concealer:**\n" +
        "- Budget: NYX HD Photogenic Concealer ($6)\n" +
        "- Premium: NARS Radiant Creamy Concealer ($32)\n\n" +
        "3. **Blush & Contour:**\n" +
        "- Blush Budget: Milani Cheek Kiss Cream Blush ($10)\n" +
        "- Blush Premium: Rare Beauty Soft Pinch Liquid Blush ($23)\n" +
        "- Contour Budget: Wet n Wild MegaGlo Contour Stick ($5)\n" +
        "- Contour Premium: Fenty Beauty Match Stix Matte Contour Skinstick ($32)\n\n" +
        "4. **Brows:**\n" +
        "- Budget: Essence Make Me Brow Gel Mascara ($4)\n" +
        "- Premium: Benefit Gimme Brow+ Volumizing Eyebrow Gel ($26)\n\n" +
        "5. **Eyes:**\n" +
        "- Shadow Budget: ColourPop Super Shock Shadow ($7)\n" +
        "- Shadow Premium: Charlotte Tilbury Eyes to Mesmerise Cream Eyeshadow ($35)\n" +
        "- Mascara Budget: Maybelline Lash Sensational Mascara ($9)\n" +
        "- Mascara Premium: Lancôme Lash Idôle Mascara ($30)\n\n" +
        "6. **Lips:**\n" +
        "- Budget: Burt's Bees Tinted Lip Balm ($6)\n" +
        "- Premium: Dior Addict Lip Glow ($40)\n\n" +
        "7. **Glow:**\n" +
        "- Budget: e.l.f. Halo Glow Liquid Filter ($14)\n" +
        "- Premium: Charlotte Tilbury Hollywood Flawless Filter ($49)\n\n" +
        "Mix and match these products to fit your budget and style! 💖\n\n" +
        "**Pinterest Inspo:**\n" +
        "- [Clean Girl Makeup Inspo](https://www.pinterest.com/search/pins/?q=clean%20girl%20makeup%20aesthetic)\n" +
        "- [Cream Blush Makeup](https://www.pinterest.com/search/pins/?q=cream%20blush%20makeup)\n" +
        "- [Natural Brows](https://www.pinterest.com/search/pins/?q=natural%20brows%20makeup)\n" +
        "- [Dewy Skin Makeup](https://www.pinterest.com/search/pins/?q=dewy%20skin%20makeup)\n" +
        "- [Soft Pink Lips](https://www.pinterest.com/search/pins/?q=soft%20pink%20lips%20makeup)\n\n",
      'simple_makeup':
        "Here's a simple, fresh makeup routine for you! ✨\n\n" +
        "0. **Primer:**\n" +
        "- Budget: e.l.f. Power Grip Primer ($10)\n" +
        "- Premium: Tatcha The Silk Canvas ($54)\n\n" +
        "1. **Base:**\n" +
        "- Budget: Maybelline Dream Fresh BB Cream ($8)\n" +
        "- Premium: Laura Mercier Tinted Moisturizer ($53)\n\n" +
        "2. **Concealer:**\n" +
        "- Budget: NYX HD Photogenic Concealer ($6)\n" +
        "- Premium: NARS Radiant Creamy Concealer ($32)\n\n" +
        "3. **Blush:**\n" +
        "- Budget: Milani Cheek Kiss Cream Blush ($10)\n" +
        "- Premium: Rare Beauty Soft Pinch Liquid Blush ($23)\n\n" +
        "4. **Brows:**\n" +
        "- Budget: Essence Make Me Brow Gel Mascara ($4)\n" +
        "- Premium: Benefit Gimme Brow+ Volumizing Eyebrow Gel ($26)\n\n" +
        "5. **Eyes:**\n" +
        "- Shadow Budget: ColourPop Super Shock Shadow ($7)\n" +
        "- Shadow Premium: Charlotte Tilbury Eyes to Mesmerise Cream Eyeshadow ($35)\n" +
        "- Mascara Budget: Maybelline Lash Sensational Mascara ($9)\n" +
        "- Mascara Premium: Lancôme Lash Idôle Mascara ($30)\n\n" +
        "6. **Lips:**\n" +
        "- Budget: Burt's Bees Tinted Lip Balm ($6)\n" +
        "- Premium: Dior Addict Lip Glow ($40)\n\n" +
        "7. **Glow:**\n" +
        "- Budget: e.l.f. Halo Glow Liquid Filter ($14)\n" +
        "- Premium: Charlotte Tilbury Hollywood Flawless Filter ($49)\n\n" +
        "Let me know if you want more product recs or a step-by-step! 💄\n\n" +
        "**Pinterest Inspo:**\n" +
        "- [Simple Makeup Inspo](https://www.pinterest.com/search/pins/?q=simple%20makeup%20look)\n" +
        "- [Cream Blush Makeup](https://www.pinterest.com/search/pins/?q=cream%20blush%20makeup)\n" +
        "- [Natural Brows](https://www.pinterest.com/search/pins/?q=natural%20brows%20makeup)\n" +
        "- [Dewy Skin Makeup](https://www.pinterest.com/search/pins/?q=dewy%20skin%20makeup)\n" +
        "- [Soft Pink Lips](https://www.pinterest.com/search/pins/?q=soft%20pink%20lips%20makeup)\n\n"
    };

    // Check for predefined scenarios first
    const formattedPrompt = MODEL_CONFIGS['facebook/blenderbot-400M-distill'].promptTemplate(prompt);
    if (formattedPrompt in scenarioResponses) {
      return NextResponse.json([{
        generated_text: scenarioResponses[formattedPrompt]
      }]);
    }

    // For non-scenario queries, extract just the user's question
    const userQuestion = prompt
      .replace(/You are [^\.]+\./i, '')
      .replace(/When responding:[^\n]+/i, '')
      .replace(/Human:/gi, '')
      .replace(/Assistant:/gi, '')
      .replace(/^[^:]+:/, '')
      .replace(/\s+/g, ' ')
      .trim();

    // If the question is empty, fallback
    if (!userQuestion) {
      return NextResponse.json([{
        generated_text: "Let me help you create the perfect look! Tell me more about the occasion, your style, and any preferences you have for your makeup." }]);
    }

    // Proceed with API call using only the user's question
    const response = await fetch(`${AI_CONFIG.apiEndpoint}/${AI_CONFIG.model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: userQuestion,
        options: {
          wait_for_model: true,
          max_length: MODEL_CONFIGS['facebook/blenderbot-400M-distill'].maxTokens,
          temperature: MODEL_CONFIGS['facebook/blenderbot-400M-distill'].temperature,
          top_p: MODEL_CONFIGS['facebook/blenderbot-400M-distill'].topP,
          repetition_penalty: MODEL_CONFIGS['facebook/blenderbot-400M-distill'].repetitionPenalty,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      return NextResponse.json([{
        generated_text: "Sorry, I couldn't generate a makeup recommendation right now. Please try again in a moment!" }]);
    }

    const data = await response.json();
    let cleanedResponse = data[0]?.generated_text || '';
    cleanedResponse = cleanedResponse
      .replace(/Human:/gi, '')
      .replace(/Assistant:/gi, '')
      .replace(/You are [^\.]+\./i, '')
      .replace(/When responding:[^\n]+/i, '')
      .replace(/^[^:]+:/, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!cleanedResponse || cleanedResponse.length < 30 || cleanedResponse.includes(userQuestion)) {
      cleanedResponse = "Let me help you create the perfect look! Tell me more about the occasion, your style, and any preferences you have for your makeup.";
    }

    // Add scenario detection for clean girl/simple makeup
    let scenarioKey = formattedPrompt;
    if (!scenarioResponses[scenarioKey]) {
      const q = userQuestion.toLowerCase();
      if (q.includes('clean girl')) scenarioKey = 'clean_girl_makeup';
      else if (q.includes('simple makeup')) scenarioKey = 'simple_makeup';
    }
    if (scenarioResponses[scenarioKey]) {
      return NextResponse.json([{ generated_text: scenarioResponses[scenarioKey] }]);
    }

    return NextResponse.json([{ generated_text: cleanedResponse }]);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
} 