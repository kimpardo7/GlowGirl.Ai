import { AI_CONFIG, STYLE_CONTEXT } from '../config';
import { glamMakeupGuide } from '@/lib/data/glam-makeup-guide';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface StyleContext {
  userProfile?: {
    seasonalColor?: string;
    stylePreferences?: string[];
    faceShape?: string;
    metalPreference?: 'Silver' | 'Gold' | 'Rose Gold' | 'Platinum' | 'White Gold' | 'Copper';
    aesthetic?: 'baddie' | 'y2k' | 'cottagecore' | 'dark-academia' | 'minimalist' | 'classic';
  };
  chatHistory: ChatMessage[];
  currentQuiz?: string;
  glamGuide?: typeof glamMakeupGuide;
}

interface OutfitRecommendations {
  tops: string[];
  bottoms: string[];
  shoes: string[];
  layers: string[];
  accessories: string[];
  tips: string[];
  inspiration: string;
}

interface StyleRecommendations {
  styles: string[];
  products: {
    budget: Array<{
      name: string;
      price: string;
      benefits: string;
      cons: string;
      link: string;
    }>;
    premium: Array<{
      name: string;
      price: string;
      benefits: string;
      cons: string;
      link: string;
    }>;
  };
  accessories: string[];
  tips: string[];
  inspiration: string;
}

interface HairRecommendations {
  styles: string[];
  products: string[];
  accessories: string[];
  tips: string[];
  inspiration: string;
}

export class AIService {
  private context: StyleContext;
  private retryCount: number = 0;
  private readonly MAX_RETRIES: number = 3;
  private readonly RETRY_DELAY: number = 1000; // 1 second delay between retries
  private readonly REQUEST_TIMEOUT: number = 30000; // 30 seconds timeout
  private lastRequestId: string | null = null;
  private isProcessing: boolean = false;
  private lastProcessedTime: number = 0;
  private currentRequestId: string | null = null;

  constructor() {
    this.context = {
      chatHistory: [],
      glamGuide: glamMakeupGuide
    };
    this.lastProcessedTime = Date.now();
  }

  // Add force reset method
  forceReset(): void {
    console.log('Force resetting chat service state');
    this.isProcessing = false;
    this.lastRequestId = null;
    this.currentRequestId = null;
    this.retryCount = 0;
    this.lastProcessedTime = Date.now();
    this.context.chatHistory = [];
  }

  private checkAndClearStuckState(): boolean {
    const currentTime = Date.now();
    const timeSinceLastProcess = currentTime - this.lastProcessedTime;
    
    if (this.isProcessing && timeSinceLastProcess > 30000) {
      console.log('Detected stuck state:', {
        isProcessing: this.isProcessing,
        timeSinceLastProcess,
        lastProcessedTime: new Date(this.lastProcessedTime),
        currentTime: new Date(currentTime),
        currentRequestId: this.currentRequestId
      });
      
      this.forceReset();
      return true;
    }
    return false;
  }

  private getFallbackJewelryResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    const seasonalPreference = this.context.userProfile?.seasonalColor || '';
    const metalPreference = this.context.userProfile?.metalPreference || '';
    const stylePreferences = this.context.userProfile?.stylePreferences || [];

    let determinedAesthetic = 'classic'; // Default

    // Define a comprehensive list of aesthetic keywords for jewelry context
    const aestheticKeywords = [
      'dark academia', 'dark cottagecore', 'dark coquette', 'rockstar girlfriend style',
      'preppy (old fashioned)', 'preppy (new fashion)', 'coastal granddaughter', 'coquette core',
      'grunge core', 'mob wife', 'old money', 'boho aesthetic', 'light feminine', 'dark feminine',
      'baddie', 'y2k', '2000s', 'cottagecore', 'minimalist', 'streetwear', 'stockholm', 
      'espresso', 'bloquette', 'acubi', 'stargirl', 'balletcore', 'mermaid core', 'gyaru', 
      'arizona style', 'indie', 
      '80s', "80's", '90s', "90's", '60s', "60's", '70s', "70's",
      '50s', "50's", '30s', "30's", '20s', "20's",
      'clean girl', 'retro', 'classic'
    ];

    // Try to determine aesthetic from message content
    for (const keyword of aestheticKeywords) {
      if (lowerMessage.includes(keyword)) {
        determinedAesthetic = keyword;
        // Normalize variants if necessary for future specific jewelry responses
        if (keyword === "80's") determinedAesthetic = '80s';
        if (keyword === "90's") determinedAesthetic = '90s';
        // ... (add other normalizations as needed)
        if (keyword === "2000s") determinedAesthetic = 'y2k';
        break;
      }
    }
     // Fallback to stylePreferences if no keyword matched and determinedAesthetic is still 'classic'
    if (determinedAesthetic === 'classic' && stylePreferences.length > 0) {
      const userPref = stylePreferences[0].toLowerCase();
      if (aestheticKeywords.includes(userPref)) { 
          determinedAesthetic = userPref;
      }
    }
    
    // Get metal recommendations based on seasonal color
    const getMetalsBySeasonalColor = (season: string): string[] => {
      switch(season.toLowerCase()) {
        case 'winter':
        case 'summer':
          return ['Silver', 'Platinum', 'White Gold'];
        case 'spring':
        case 'autumn':
          return ['Gold', 'Rose Gold', 'Copper'];
        default:
          return ['Silver', 'Gold', 'Rose Gold'];
      }
    };

    // Get recommended metals
    const recommendedMetals = metalPreference ? 
      [metalPreference] : 
      getMetalsBySeasonalColor(seasonalPreference);
    
    // Check for specific aesthetic jewelry responses
    switch (determinedAesthetic) {
      case 'baddie':
        return `Hey baddie! ✨ Let me hook you up with some statement jewelry that'll make you shine!\n\n` +
          `Here's your perfect jewelry stack in ${recommendedMetals.join('/')}:\n\n` +
          `### 1. Necklaces (Layer these!)\n` +
          `• Chunky Chain\n` +
          `• Butterfly Pendant Necklace\n` +
          `• Pearl and Chain Choker\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/cat/?cid=4175)\n\n` +
          `### 2. Earrings\n` +
          `• XL Hoops (must-have!)\n` +
          `• Crystal Drop Earrings\n` +
          `• Mixed Metal Studs Set\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry/earrings.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry/earrings)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/earrings/cat/?cid=4174)\n\n` +
          `### 3. Bracelets & Anklets\n` +
          `• Chunky Chain Bracelet\n` +
          `• Crystal Tennis Bracelet\n` +
          `• Anklet Set\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry/bracelets.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry/bracelets)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/bracelets/cat/?cid=4176)\n\n` +
          `### 4. Rings\n` +
          `• Chunky Statement Rings\n` +
          `• Butterfly Ring Set\n` +
          `• Mixed Metal Stackable Rings\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry/rings.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry/rings)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/rings/cat/?cid=4177)\n\n` +
          `### Styling Tips:\n` +
          `✨ Mix metals for an edgy look\n` +
          `✨ Layer 2-3 necklaces at different lengths\n` +
          `✨ Stack rings on multiple fingers\n` +
          `✨ Don't be afraid to mix luxury and budget pieces\n\n` +
          `### Get More Inspiration:\n` +
          `• [Pinterest Baddie Jewelry](https://www.pinterest.com/search/pins/?q=baddie%20jewelry%20aesthetic)\n` +
          `• [Instagram Jewelry Trends](https://www.instagram.com/explore/tags/stackedjewelry/)\n\n` +
          `💡 **Pro Tip:** Start with statement pieces in ${recommendedMetals[0]} - these will be your go-to pieces for that baddie vibe!`;
      
      case '30s':
      case "30's":
      case '1930s':
        return `Step into 1930s glamour! 🎞️ Let's find some Art Deco inspired jewelry for you, focusing on ${recommendedMetals.join('/')}.\n\n` +
          `### 1. Necklaces & Pendants\n` +
          `• **Geometric Pendants:** Look for sunbursts, chevrons, or angular designs.
` +
          `• **Longer Chains:** Necklaces often draped elegantly, sometimes with a single statement piece.
` +
          `• **Dress Clips (often worn on necklaces):** These were iconic and could be single or in pairs.

` +
          `### 2. Earrings\n` +
          `• **Drop Earrings:** Often featuring geometric shapes, crystals, or colored stones.
` +
          `• **Clip-ons or Screw-backs:** As pierced ears weren't as universal.
` +
          `• **Bakelite or Galalith:** These early plastics were popular for colorful, chunky pieces.

` +
          `### 3. Bracelets\n` +
          `• **Wide Bangles:** Often in Bakelite, celluloid, or metal with geometric patterns.
` +
          `• **Link Bracelets:** Featuring intricate Art Deco links.
` +
          `• **Charm Bracelets:** Gaining popularity, though simpler than later versions.

` +
          `### 4. Brooches & Clips\n` +
          `• **Dress Clips:** The quintessential 30s accessory! Worn on necklines, lapels, belts, or even hats.
` +
          `• **Geometric Brooches:** Reflecting Art Deco motifs.
` +
          `• **Initial Brooches:** Personalized pieces were chic.

` +
          `**Where to Shop (Hint: Vintage & Inspired Pieces):**\n` +
          `• [Etsy for Vintage 1930s Jewelry](https://www.etsy.com/search?q=vintage%201930s%20jewelry)
` +
          `• [Search for Art Deco Jewelry on Ruby Lane](https://www.rubylane.com/search?q=art%20deco%20jewelry)
` +
          `• [Look for 1930s Inspired Pieces on Unique Vintage](https://www.unique-vintage.com/collections/jewelry)

` +
          `### Styling Tips for 1930s Jewelry:
` +
          `✨ **Symmetry & Geometry:** Embrace the clean lines and bold shapes of Art Deco.
` +
          `✨ **Statement Pieces:** Often one or two bold pieces were favored over many small ones (except for layered long necklaces sometimes).
` +
          `✨ **Function Meets Fashion:** Dress clips were beautiful and practical for adjusting necklines.
` +
          `✨ **Materials:** Don't shy away from early plastics like Bakelite, alongside chrome, silver, and costume gems.

` +
          `### Get More Inspiration:
` +
          `• [Pinterest 1930s Jewelry](https://www.pinterest.com/search/pins/?q=1930s%20art%20deco%20jewelry)
` +
          `• [Instagram #1930sJewelry](https://www.instagram.com/explore/tags/1930sjewelry/)

` +
          `💡 **Pro Tip:** Look for pieces with strong geometric patterns, and don't forget the iconic dress clip if you want true 30s flair!`;

      default:
        // Default jewelry response (could be tailored by determinedAesthetic in the future)
        return `Hey girly! 💎 Let me help you build the perfect jewelry collection in ${recommendedMetals.join('/')}! (Hinting towards ${determinedAesthetic} style)\n\n` +
          `Here's a curated selection of versatile pieces:\n\n` +
          `### 1. Everyday Necklaces\n` +
          `• Dainty Chain\n` +
          `• Pearl Pendant\n` +
          `• Layered Chain Set\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry/necklaces.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry/necklaces)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/necklaces/cat/?cid=4172)\n\n` +
          `### 2. Mix & Match Earrings\n` +
          `• Classic Small Hoops\n` +
          `• Pearl Studs\n` +
          `• Minimalist Bar Earrings\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry/earrings.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry/earrings)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/earrings/cat/?cid=4174)\n\n` +
          `### 3. Delicate Bracelets\n` +
          `• Thin Chain Bracelet\n` +
          `• Charm Bracelet\n` +
          `• Beaded Stack Set\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry/bracelets.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry/bracelets)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/bracelets/cat/?cid=4176)\n\n` +
          `### 4. Dainty Rings\n` +
          `• Simple Band Ring\n` +
          `• Crystal Accent Ring\n` +
          `• Stacking Ring Set\n\n` +
          `**Where to Shop:**\n` +
          `• [Shop at H&M](https://www2.hm.com/en_us/women/products/jewelry/rings.html)\n` +
          `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_jewelry/rings)\n` +
          `• [Shop at ASOS](https://www.asos.com/us/women/jewelry/rings/cat/?cid=4177)\n\n` +
          `### Styling Tips:\n` +
          `✨ Choose ${recommendedMetals[0]} as your base metal\n` +
          `✨ Layer delicate pieces for an elegant look\n` +
          `✨ Mix textures (smooth, textured, sparkly)\n` +
          `✨ Keep proportions in mind - delicate necklaces pair well with small earrings\n\n` +
          `### Get More Inspiration:\n` +
          `• [Pinterest Jewelry Ideas](https://www.pinterest.com/search/pins/?q=minimal%20${recommendedMetals[0].toLowerCase()}%20jewelry%20styling)\n` +
          `• [Instagram Jewelry Trends](https://www.instagram.com/explore/tags/${recommendedMetals[0].toLowerCase()}jewelry/)\n\n` +
          `💡 **Pro Tip:** Start with versatile pieces in ${recommendedMetals[0]}. These will be the foundation of your jewelry collection!`;
    }
  }

  private getFallbackHairResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    const seasonalColor = this.context.userProfile?.seasonalColor || '';
    const faceShape = this.context.userProfile?.faceShape || '';
    const stylePreferences = this.context.userProfile?.stylePreferences || [];
    
    let determinedAesthetic = 'classic'; // Default

    // Define a comprehensive list of aesthetic keywords for hair context
    const aestheticKeywords = [
      // Order matters: more specific or longer phrases first
      'dark academia', 'dark cottagecore', 'dark coquette', 'rockstar girlfriend style',
      'preppy (old fashioned)', 'preppy (new fashion)', 'coastal granddaughter', 'coquette core',
      'grunge core', 'mob wife', 'old money', 'boho aesthetic', 'light feminine', 'dark feminine',
      'baddie', 'y2k', '2000s', 'cottagecore', 'minimalist', 'streetwear', 'stockholm', 
      'espresso', 'bloquette', 'acubi', 'stargirl', 'balletcore', 'mermaid core', 'gyaru', 
      'arizona style', 'indie', 
      '80s', "80's", '90s', "90's", '60s', "60's", '70s', "70's",
      '50s', "50's", '30s', "30's", '20s', "20's",
      'clean girl', 'retro', 'classic' // 'classic' as last resort before stylePreferences
    ];

    // Try to determine aesthetic from message content by iterating through keywords
    for (const keyword of aestheticKeywords) {
      if (lowerMessage.includes(keyword)) {
        // Special handling for Y2K/Retro to avoid conflict if outfit is also mentioned, prioritize hair
        if ((keyword === 'y2k' || keyword === '2000s' || keyword === 'retro') && lowerMessage.includes('outfit')) {
          // If outfit is also mentioned with y2k/retro, this hair fallback might be too aggressive.
          // However, generateResponse should handle this. If we reach here, it implies hair was primary.
        } 
        determinedAesthetic = keyword;
        // Map variants to a consistent key for getHairstylesByAesthetic
        if (keyword === "80's") determinedAesthetic = '80s';
        if (keyword === "90's") determinedAesthetic = '90s';
        if (keyword === "60's") determinedAesthetic = '60s';
        if (keyword === "70's") determinedAesthetic = '70s';
        if (keyword === "50's") determinedAesthetic = '50s';
        if (keyword === "30's") determinedAesthetic = '30s';
        if (keyword === "20's") determinedAesthetic = '20s';
        if (keyword === "2000s") determinedAesthetic = 'y2k';
        break; // Found the first, most prominent aesthetic
      }
    }

    // Fallback to stylePreferences if no keyword matched and determinedAesthetic is still 'classic'
    if (determinedAesthetic === 'classic' && stylePreferences.length > 0) {
      const userPref = stylePreferences[0].toLowerCase();
      if (aestheticKeywords.includes(userPref)) { // Check if the preference is a known aesthetic
          determinedAesthetic = userPref;
      }
    }

    const hairRecs = this.getHairstylesByAesthetic(determinedAesthetic);

    // Personalization based on profile (if available and aesthetic is general enough)
    let profileNotes = '';
    if (seasonalColor) {
      profileNotes += `Based on your ${seasonalColor} seasonal color, you might look great with hair colors that have [appropriate undertones, e.g., cool for Winter/Summer, warm for Spring/Autumn].\n`;
    }
    if (faceShape) {
      profileNotes += `For your ${faceShape} face shape, styles like [mention flattering styles, e.g., layers for square, volume on sides for long] can be very flattering.\n`;
    }

    return `Hey there! 💁‍♀️ Let me help you with some ${determinedAesthetic} hairstyle ideas!\n\n` +
      (profileNotes ? `A few personalized tips for you:\n${profileNotes}\n` : '') +
      `### ${determinedAesthetic.charAt(0).toUpperCase() + determinedAesthetic.slice(1)} Hairstyle Ideas:\n` +
      hairRecs.styles.map(style => `• ${style}\n`).join('') + '\n' +
      `### Must-Have Hair Accessories:\n` +
      hairRecs.accessories.map(acc => `• ${acc}\n`).join('') + '\n' +
      `### Styling Products You'll Need:\n` +
      hairRecs.products.map(product => `• ${product}\n`).join('') + '\n' +
      `### Where to Shop:\n` +
      `• [Shop Hair Accessories at Free People](https://www.freepeople.com/accessories-hair/)\n` +
      `• [Shop Vintage Hair Pieces on Etsy](https://www.etsy.com/market/vintage_hair_accessories)\n` +
      `• [Shop Hair Products at Ulta](https://www.ulta.com/hair/)\n\n` +
      `### Styling Tips:\n` +
      hairRecs.tips.map(tip => `✨ ${tip}\n`).join('') + '\n' +
      `### Get More Inspiration:\n` +
      `• [Pinterest ${determinedAesthetic} Hair](https://www.pinterest.com/search/pins/?q=${hairRecs.inspiration})\n` +
      `• [Instagram ${determinedAesthetic} Hair](https://www.instagram.com/explore/tags/${determinedAesthetic.replace('-', '')}hair/)\n\n` +
      `💡 **Pro Tip:** The key to ${determinedAesthetic} hairstyles is embracing the aesthetic's unique charm. Have fun experimenting with different styles and accessories!`;
  }

  private formatPrompt(messages: ChatMessage[]): string {
    const currentUserMessage = messages[messages.length - 1];
    const lowerUserMessage = currentUserMessage.content.toLowerCase();

    // Define aestheticKeywords at the top of the function scope
    const aestheticKeywords = [
      'baddie', 'y2k', '2000s', 'cottagecore', 'dark academia', 'minimalist', 'coquette core',
      'grunge core', 'streetwear', 'mob wife', 'old money', 'alt', 'boho aesthetic',
      'stockholm', 'costal granddaughter', 'espresso', 'bloquette', 'dark feminine',
      'light feminine', 'acubi', 'stargirl', 'balletcore', 'mermaid core', 'gyaru',
      'arizona style', 'dark cottagecore', 'dark coquette', 'rockstar girlfriend style',
      'indie', 'preppy (old fashioned)', 'preppy (new fashion)',
      '80s', "80's", '90s', "90's", '60s', "60's", '70s', "70's",
      '50s', "50's", '30s', "30's", '20s', "20's",
      'clean girl', 'retro', 'classic'
    ];

    // If the current user message triggers a specific fallback directly, 
    // this function might not be called if generateResponse handles it first.
    // However, this logic can remain for robustness or if generateResponse changes.

    // Priority 1: Makeup + Specific Aesthetic (handled by generateResponse, but good to be robust)
    if (lowerUserMessage.includes('makeup')) {
      // aestheticKeywords is now defined above, so no need for local definition here
      for (const aesthetic of aestheticKeywords) {
        if (lowerUserMessage.includes(aesthetic)) {
          // This indicates a specific makeup style fallback should have been triggered earlier.
          // If we reach here, it implies generateResponse might have missed it, or this is a direct call.
          // For formatting an AI prompt, we'd want the AI to know about this context.
          // However, direct fallback is usually better here.
        }
      }
    }

    // Build the prompt string for the AI
    let promptString = '';
    const systemMessage = messages.find(msg => msg.role === 'system');
    if (systemMessage) {
      promptString += `${systemMessage.content}\n\n`;
    }

    messages.slice(1).forEach(msg => { // Skip system message as it's already added
      const role = msg.role === 'user' ? 'Human' : 'Assistant';
      promptString += `${role}: ${msg.content}\n`;
    });

    // Specific context additions based on current user message, if not a direct fallback query
    if (lowerUserMessage.includes('makeup') || lowerUserMessage.includes('glam') || lowerUserMessage.includes('beauty')) {
      const isSpecificMakeupAesthetic = aestheticKeywords.some((aes: string) => lowerUserMessage.includes('makeup') && lowerUserMessage.includes(aes));
      if (!isSpecificMakeupAesthetic && this.context.glamGuide) {
        promptString += '\nConsider the following Glam Guide for makeup advice:\n';
        promptString += `Title: ${this.context.glamGuide.title}\nDescription: ${this.context.glamGuide.description}\n`;
        if (lowerUserMessage.includes('natural')) {
          promptString += `Focus on Prep Steps: ${JSON.stringify(this.context.glamGuide.steps.prep)}\n`;
          promptString += `And Base Steps: ${JSON.stringify(this.context.glamGuide.steps.base)}\n`;
        } else {
          Object.entries(this.context.glamGuide.steps).forEach(([section, content]) => {
            promptString += `${section.charAt(0).toUpperCase() + section.slice(1)}: ${JSON.stringify(content)}\n`;
          });
        }
        promptString += `Inspiration: ${JSON.stringify(this.context.glamGuide.inspiration.links)}\n`;
      }
    }
    
    if (!promptString.endsWith('Assistant: ')) {
       if (!promptString.endsWith('\n')) {
           promptString += '\n';
       }
       promptString += 'Assistant: ';
    }

    return promptString.trim();
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private generateRequestId(userMessage: string): string {
    return `${Date.now()}-${userMessage.substring(0, 20)}`;
  }

  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

    console.log('Attempting API connection:', {
      url,
      method: options.method,
      headers: {
        ...options.headers,
        'Authorization': 'Bearer [REDACTED]' // Don't log the actual API key
      },
      timeout: this.REQUEST_TIMEOUT
    });

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      console.log('API connection response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      return response;
    } catch (error: unknown) {
      clearTimeout(timeoutId);
      if (error instanceof Error) {
        console.error('API connection error:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  private getFallbackOutfitResponse(userMessage: string, explicitAesthetic?: string): string {
    const lowerMessage = userMessage.toLowerCase();
    const stylePreferences = this.context.userProfile?.stylePreferences || [];
    
    let determinedAesthetic = 'classic'; // Default

    // Prioritize explicitAesthetic if valid
    if (explicitAesthetic) {
      const keyList = [
        'baddie', 'y2k', '2000s', 'cottagecore', 'dark academia', 'minimalist', 'coquette core',
        'grunge core', 'streetwear', 'mob wife', 'old money', 'alt', 'boho aesthetic',
        'stockholm', 'costal granddaughter', 'espresso', 'bloquette', 'dark feminine',
        'light feminine', 'acubi', 'stargirl', 'balletcore', 'mermaid core', 'gyaru',
        'arizona style', 'dark cottagecore', 'dark coquette', 'rockstar girlfriend style',
        'indie', 'preppy (old fashioned)', 'preppy (new fashion)',
        '80s', "80's", '90s', "90's", '60s', "60's", '70s', "70's",
        '50s', "50's", '30s', "30's", '20s', "20's",
        'clean girl', 'retro', 'classic'
      ];
      if (keyList.includes(explicitAesthetic.toLowerCase())) {
        determinedAesthetic = explicitAesthetic.toLowerCase();
      }
    } else {
      // If no explicit aesthetic, try to determine from message content
      const aestheticKeywords = [
        // Order matters: more specific or longer phrases first, or handle overlaps carefully
        'dark academia', 'dark cottagecore', 'dark coquette', 'rockstar girlfriend style',
        'preppy (old fashioned)', 'preppy (new fashion)', 'coastal granddaughter', // Multi-word first
        'baddie', 'y2k', '2000s', 'cottagecore', 'minimalist', 'coquette core', 'grunge core', 
        'streetwear', 'mob wife', 'old money', 'alt', 'boho aesthetic', 'stockholm', 
        'espresso', 'bloquette', 'dark feminine', 'light feminine', 'acubi', 'stargirl', 
        'balletcore', 'mermaid core', 'gyaru', 'arizona style', 'indie', 
        '80s', "80's", '90s', "90's", '60s', "60's", '70s', "70's",
        '50s', "50's", '30s', "30's", '20s', "20's",
        'clean girl', 'retro', 'classic' // 'classic' as last resort before stylePreferences
      ];

      for (const keyword of aestheticKeywords) {
        if (lowerMessage.includes(keyword)) {
          determinedAesthetic = keyword;
          // Map variants to a consistent key for getOutfitsByAesthetic if needed
          if (keyword === "80's") determinedAesthetic = '80s';
          if (keyword === "90's") determinedAesthetic = '90s';
          if (keyword === "60's") determinedAesthetic = '60s';
          if (keyword === "70's") determinedAesthetic = '70s';
          if (keyword === "50's") determinedAesthetic = '50s';
          if (keyword === "30's") determinedAesthetic = '30s';
          if (keyword === "20's") determinedAesthetic = '20s';
          if (keyword === "2000s") determinedAesthetic = 'y2k';
          break; // Found the first, most prominent aesthetic
        }
      }

      // Fallback to stylePreferences if no keyword matched and determinedAesthetic is still 'classic'
      if (determinedAesthetic === 'classic' && stylePreferences.length > 0) {
        // Potentially check if stylePreferences[0] is a valid/known aesthetic too
        const userPref = stylePreferences[0].toLowerCase();
        if (aestheticKeywords.includes(userPref)) { // Check if the preference is a known aesthetic
            determinedAesthetic = userPref;
        }
      }
    }

    const outfitRecs = this.getOutfitsByAesthetic(determinedAesthetic);

    return `Hey girly! 👗 Let me help you create the perfect ${determinedAesthetic} look!\n\n` +
      `Here's a curated ${determinedAesthetic} outfit guide with shopping links:\n\n` +
      `### Top Options:\n` +
      outfitRecs.tops.map(top => `• ${top}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/tops/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/t-shirts-l1066.html)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/tops)\n\n` +
      `### Bottom Options:\n` +
      outfitRecs.bottoms.map(bottom => `• ${bottom}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/bottoms/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/jeans-l1066.html)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/bottoms)\n\n` +
      `### Accessories:\n` +
      outfitRecs.accessories.map(acc => `• ${acc}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/accessories/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/accessories-l1066.html)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/accessories)\n\n` +
      `### Shoes:\n` +
      outfitRecs.shoes.map(shoe => `• ${shoe}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/shoes/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/shoes-l1066.html)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/shoes)\n\n` +
      `### Optional Layers:\n` +
      outfitRecs.layers.map(layer => `• ${layer}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/jackets-and-coats/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/jackets-l1066.html)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/jackets)\n\n` +
      `### Style Tips:\n` +
      outfitRecs.tips.map(tip => `✨ ${tip}\n`).join('') + '\n' +
      `### Get More Inspiration:\n` +
      `[Pinterest ${determinedAesthetic} Style](https://www.pinterest.com/search/pins/?q=${outfitRecs.inspiration})\n` +
      `[Instagram ${determinedAesthetic} Fashion](https://www.instagram.com/explore/tags/${determinedAesthetic.replace('-', '')}style/)\n\n` +
      `💡 Pro Tip: Mix and match these pieces to create multiple ${determinedAesthetic} outfits! The key is to have versatile pieces that capture the ${determinedAesthetic} vibe while staying true to your personal style.`;
  }

  private getFallbackMakeupStyleResponse(aesthetic: string): string {
    const lowerAesthetic = aesthetic.toLowerCase();
    let response = `Okay, let\'s talk about ${lowerAesthetic} makeup! 💄\n\n`;

    switch (lowerAesthetic) {
      case '1930s': // Keep for programmatic use if needed
      case '30s':
      case "30's":
        response += `The 1930s makeup look was all about Hollywood glamour, sculpted features, and a touch of drama. Here's how to get the look:\n\n` +
          `### Face:
` +
          `• **Foundation:** A flawless, matte finish was key. Opt for a full-coverage foundation one shade lighter than your natural skin tone.
` +
          `• **Powder:** Set everything generously with translucent powder for that porcelain doll effect.
` +
          `• **Blush:** Apply a soft rose or raspberry blush high on the cheekbones, blending delicately.

` +
          `### Eyes:
` +
          `• **Eyebrows:** Thin, arched, and elongated eyebrows were the signature. Pencil them in meticulously, extending them slightly downwards at the ends.
` +
          `• **Eyeshadow:** Shimmery, jewel-toned eyeshadows like blues, greens, violets, or silvers were popular. Apply over the lid and blend up towards the brow bone. A touch of Vaseline or brilliantine on the lids could add a glossy look.
` +
          `• **Eyeliner:** A thin line of black or dark brown eyeliner along the upper lash line. Sometimes a kohl pencil was used on the lower waterline too.
` +
          `• **Mascara:** Lots of black mascara on the upper lashes, focusing on length and curl. Lower lashes were often left bare or very lightly coated.

` +
          `### Lips:
` +
          `• **Lipstick:** Deep reds, raspberry, and maroon shades were iconic. Lips were precisely lined and often overdrawn into a "rosebud" or "Cupid's bow" shape, emphasizing the peaks of the upper lip and rounding the lower lip.

` +
          `### Key Characteristics:
` +
          `✨ Thin, highly arched eyebrows
` +
          `✨ Shimmery eyeshadows
` +
          `✨ Precisely defined, darker lips (often in a "Cupid's bow")
` +
          `✨ Matte, flawless skin

` +
          `Get More Inspiration:
` +
          `• [Pinterest 1930s Makeup](https://www.pinterest.com/search/pins/?q=1930s%20makeup)
` +
          `• [YouTube 1930s Makeup Tutorials](https://www.youtube.com/results?search_query=1930s+makeup+tutorial)\n\n` +
          `💡 Pro Tip: Watch movies from the 1930s starring actresses like Greta Garbo, Marlene Dietrich, or Jean Harlow for ultimate inspiration!`;
        break;
      case '1920s':
      case '20s':
      case "20's":
        response += `The 1920s (Flapper era) makeup was dramatic! Key features: very thin, downward-sloping eyebrows, dark kohl-rimmed eyes (smoky), bee-stung lips in deep reds/burgundy, and a pale complexion.\n\n` +
          `### Key Characteristics:
` +
          `✨ Thin, downward-sloping or straight eyebrows
` +
          `✨ Dark, kohl-rimmed smoky eyes
` +
          `✨ "Cupid's bow" lips in deep red, burgundy, or plum
` +
          `✨ Pale, matte skin

` +
          `Get More Inspiration:
` +
          `• [Pinterest 1920s Makeup](https://www.pinterest.com/search/pins/?q=1920s%20flapper%20makeup)
` +
          `• [YouTube 1920s Makeup Tutorials](https://www.youtube.com/results?search_query=1920s+flapper+makeup+tutorial)\n\n` +
          `💡 Pro Tip: Think Louise Brooks or Clara Bow! The look was bold and theatrical.`;
        break;
      case '1950s':
      case '50s':
      case "50's":
        response += `1950s makeup featured winged eyeliner, defined arched brows, red or pink lips, and a polished, matte complexion. Think Marilyn Monroe or Audrey Hepburn!\n\n` +
          `### Key Characteristics:
` +
          `✨ Arched, well-defined eyebrows
` +
          `✨ Winged eyeliner (cat eye)
` +
          `✨ Red or bright pink lipstick
` +
          `✨ Peachy or pink blush on the apples of the cheeks
` +
          `✨ Matte or demi-matte foundation

` +
          `Get More Inspiration:
` +
          `• [Pinterest 1950s Makeup](https://www.pinterest.com/search/pins/?q=1950s%20pinup%20makeup)
` +
          `• [YouTube 1950s Makeup Tutorials](https://www.youtube.com/results?search_query=1950s+pinup+makeup+tutorial)\n\n` +
          `💡 Pro Tip: Perfecting the winged liner and choosing the right shade of red lipstick are key to this iconic look!`;
        break;
      // Add other aesthetic makeup cases here later
      default:
        response += `I can give you general makeup tips, or you can ask about a specific makeup look like 'smokey eye' or 'natural makeup'! You can also check out the Glam Guide for a full makeup routine.`;
        break;
    }
    return response;
  }

  private async handleApiError(error: any, userMessage: string, requestId: string): Promise<string> {
    console.error('Detailed API error:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error,
      requestId,
      userMessage
    });

    // Check if this is a duplicate request
    if (this.lastRequestId === requestId) {
      console.log('Duplicate request detected, skipping retry');
      return 'Sorry, girly! I\'m still processing your previous message. Please wait a moment!';
    }

    // Check for specific error types that shouldn't be retried
    if (error.message?.includes('401') || error.message?.includes('403')) {
      console.error('Authentication error:', {
        message: error.message,
        requestId
      });
      return 'Sorry, girly! The AI service is not properly authenticated. Please check your API key.';
    }

    // Handle 404 specifically
    if (error.message?.includes('404')) {
      console.error('API endpoint not found:', {
        message: error.message,
        requestId
      });
      // Provide a fallback response based on the query type
      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes('outfit') || lowerMessage.includes('clothes') || lowerMessage.includes('wear') || 
          lowerMessage.includes('dress') || lowerMessage.includes('style') || lowerMessage.includes('fashion') ||
          lowerMessage.includes('mall') || lowerMessage.includes('shopping') || lowerMessage.includes('baddie') ||
          lowerMessage.includes('going to') || lowerMessage.includes('what to wear')) {
        return this.getFallbackOutfitResponse(userMessage);
      } else if (lowerMessage.includes('makeup')) {
        // Check if it's makeup + specific aesthetic for style response
        const aestheticKeywords = [
          'baddie', 'y2k', 'cottagecore', 'dark academia', 'minimalist', 'coquette core',
          'grunge core', 'streetwear', 'mob wife', 'old money', 'alt', 'boho aesthetic',
          'stockholm', 'costal granddaughter', 'espresso', 'bloquette', 'dark feminine',
          'light feminine', 'acubi', 'stargirl', 'balletcore', 'mermaid core', 'gyaru',
          'arizona style', 'dark cottagecore', 'dark coquette', 'rockstar girlfriend style',
          'indie', 'preppy (old fashioned)', 'preppy (new fashion)', '80s', '90s', '60s',
          '70s', '50s', '30s', '20s', 'clean girl', 'retro', 'classic'
        ];
        for (const aesthetic of aestheticKeywords) {
          if (lowerMessage.includes(aesthetic)) {
            return this.getFallbackMakeupStyleResponse(aesthetic);
          }
        }
        // Otherwise, return the general makeup fallback for a 404 error on a makeup query
        return this.getFallbackMakeupResponse(userMessage);
      }
      return 'Sorry, girly! I\'m having trouble connecting to my style knowledge base. Please try again in a moment!';
    }

    // Handle timeout specifically
    if (error.message === 'Request timeout') {
      console.error('Request timeout:', {
        requestId,
        timeout: this.REQUEST_TIMEOUT
      });
      return 'Sorry, girly! The AI service is taking too long to respond. Please try again!';
    }

    // If we haven't exceeded retry limit, try again with delay
    if (this.retryCount < this.MAX_RETRIES) {
      this.retryCount++;
      console.log(`Retrying request (attempt ${this.retryCount}/${this.MAX_RETRIES})...`, {
        requestId,
        delay: this.RETRY_DELAY * this.retryCount
      });
      await this.delay(this.RETRY_DELAY * this.retryCount); // Exponential backoff
      return this.generateResponse(userMessage);
    }

    // Reset retry count for next time
    this.retryCount = 0;
    this.isProcessing = false;
    this.lastRequestId = null;

    // Return appropriate error message based on the error type
    if (error.message?.includes('429')) {
      console.error('Rate limit exceeded:', {
        requestId,
        message: error.message
      });
      return 'Sorry, girly! The AI service is a bit busy right now. Please try again in a moment!';
    }
    if (error.message?.includes('500')) {
      console.error('Server error:', {
        requestId,
        message: error.message
      });
      return 'Sorry, girly! The AI service is having some technical difficulties. Please try again later!';
    }

    console.error('Unknown error:', {
      requestId,
      message: error.message
    });
    return 'Sorry, girly! I\'m having trouble connecting to the AI service. Please try again in a few minutes!';
  }

  private getFallbackMakeupResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    const guideContent = this.context.glamGuide;
    
    if (!guideContent) {
      return 'Sorry, girly! I\'m having trouble accessing my makeup guide right now. Please try again in a moment!';
    }

    // For casual outfit makeup (baggy jeans + tight shirt)
    return `Hey girly! 💅 Let me help you create a perfect makeup look for your casual-chic outfit!\n\n` +
      `Here's a step-by-step guide with product links:\n\n` +
      `1. Prep Your Skin:\n` +
      `   - Cleanse with ${guideContent.steps.prep.steps[0].budget.name} (${guideContent.steps.prep.steps[0].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.prep.steps[0].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.prep.steps[0].budget.name)})\n` +
      `   - Apply ${guideContent.steps.prep.steps[1].budget.name} (${guideContent.steps.prep.steps[1].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.prep.steps[1].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.prep.steps[1].budget.name)})\n\n` +
      `2. Create a Flawless Base:\n` +
      `   - Use ${guideContent.steps.base.steps[0].budget.name} (${guideContent.steps.base.steps[0].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.base.steps[0].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.base.steps[0].budget.name)})\n` +
      `   - Spot conceal with ${guideContent.steps.base.steps[2].budget.name} (${guideContent.steps.base.steps[2].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.base.steps[2].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.base.steps[2].budget.name)})\n\n` +
      `3. Add Definition:\n` +
      `   - Light contour with ${guideContent.steps.contour.steps[0].budget.name} (${guideContent.steps.contour.steps[0].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.contour.steps[0].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.contour.steps[0].budget.name)})\n` +
      `   - Add a natural flush with ${guideContent.steps.contour.steps[2].budget.name} (${guideContent.steps.contour.steps[2].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.contour.steps[2].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.contour.steps[2].budget.name)})\n\n` +
      `4. Eye Makeup:\n` +
      `   - Apply ${guideContent.steps.eyes.steps[0].budget.name} (${guideContent.steps.eyes.steps[0].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.eyes.steps[0].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.eyes.steps[0].budget.name)})\n` +
      `   - Add subtle shimmer with ${guideContent.steps.eyes.steps[2].budget.name} (${guideContent.steps.eyes.steps[2].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.eyes.steps[2].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.eyes.steps[2].budget.name)})\n` +
      `   - Define eyes with ${guideContent.steps.eyes.steps[3].budget.name} (${guideContent.steps.eyes.steps[3].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.eyes.steps[3].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.eyes.steps[3].budget.name)})\n\n` +
      `5. Finishing Touches:\n` +
      `   - Add mascara: ${guideContent.steps.eyes.steps[5].budget.name} (${guideContent.steps.eyes.steps[5].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.eyes.steps[5].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.eyes.steps[5].budget.name)})\n` +
      `   - Set everything with ${guideContent.steps.finishing.steps[2].budget.name} (${guideContent.steps.finishing.steps[2].budget.price})\n` +
      `     [Buy on Sephora](https://www.sephora.com/search?keyword=${encodeURIComponent(guideContent.steps.finishing.steps[2].budget.name)})\n` +
      `     [Buy on Ulta](https://www.ulta.com/search?q=${encodeURIComponent(guideContent.steps.finishing.steps[2].budget.name)})\n\n` +
      `This look will complement your casual-chic outfit perfectly! The focus is on enhancing your natural features while keeping it effortless and stylish. ✨\n\n` +
      `For inspiration, check out these looks:\n` +
      guideContent.inspiration.links.map((link, i) => `[Look ${i + 1}](${link})`).join('\n') + '\n\n' +
      `💡 Pro Tip: Click the links above to shop these products on Sephora or Ulta. You can also check your local drugstore for budget-friendly alternatives!`;
  }

  private async validateApiConnection(): Promise<{ isValid: boolean; error?: string }> {
    // For outfit queries, skip complex validation
    if (!AI_CONFIG.apiKey || !AI_CONFIG.apiEndpoint) {
      console.log('API configuration missing, defaulting to outfit response');
      return { isValid: false, error: 'API configuration missing' };
    }

    try {
      // Simplified validation
      const testResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: "Test connection",
          model: AI_CONFIG.model
        })
      });

      if (!testResponse.ok) {
        return { isValid: false, error: `API error: ${testResponse.status}` };
      }

      return { isValid: true };
    } catch (error) {
      console.error('API validation failed:', error);
      return { isValid: false, error: 'Connection error' };
    }
  }

  private async testModel(modelId: string): Promise<{ success: boolean; error?: string }> {
    console.log(`Testing model: ${modelId}`);
    
    try {
      const testPrompt = "Hello, how are you?";
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: testPrompt,
          model: modelId
        })
      });

      console.log(`Model ${modelId} test response:`, {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error(`Model ${modelId} test failed:`, {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        return { 
          success: false, 
          error: `Model test failed: ${response.status} ${response.statusText}` 
        };
      }

      const data = await response.json();
      console.log(`Model ${modelId} test successful:`, {
        response: data
      });
      return { success: true };
    } catch (error) {
      console.error(`Model ${modelId} test error:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  }

  private async findWorkingModel(): Promise<string | null> {
    // List of models to try in order of preference
    const modelsToTry = [
      'google/flan-t5-base',
      'facebook/blenderbot-400M-distill',
      'microsoft/DialoGPT-medium',
      'EleutherAI/gpt-neo-2.7B'
    ];

    console.log('Starting model testing sequence');
    
    for (const model of modelsToTry) {
      console.log(`Attempting to use model: ${model}`);
      const result = await this.testModel(model);
      
      if (result.success) {
        console.log(`Found working model: ${model}`);
        return model;
      }
      
      console.log(`Model ${model} failed:`, result.error);
      // Wait a bit before trying the next model
      await this.delay(1000);
    }

    console.error('No working models found');
    return null;
  }

  async generateResponse(userMessage: string): Promise<string> {
    const newRequestId = this.generateRequestId(userMessage);
    const lowerMessage = userMessage.toLowerCase();

    // Keywords for different aesthetics/decades
    const aestheticKeywords = [
      'baddie', 'y2k', '2000s', 'cottagecore', 'dark academia', 'minimalist', 'coquette core',
      'grunge core', 'streetwear', 'mob wife', 'old money', 'alt', 'boho aesthetic',
      'stockholm', 'costal granddaughter', 'espresso', 'bloquette', 'dark feminine',
      'light feminine', 'acubi', 'stargirl', 'balletcore', 'mermaid core', 'gyaru',
      'arizona style', 'dark cottagecore', 'dark coquette', 'rockstar girlfriend style',
      'indie', 'preppy (old fashioned)', 'preppy (new fashion)',
      '80s', "80's", '90s', "90's", '60s', "60's", '70s', "70's",
      '50s', "50's", '30s', "30's", '20s', "20's",
      'clean girl', 'retro', 'classic'
    ];

    // Check for makeup + aesthetic queries first
    if (lowerMessage.includes('makeup')) {
      for (const aesthetic of aestheticKeywords) {
        if (lowerMessage.includes(aesthetic)) {
          console.log(`Makeup query with aesthetic (${aesthetic}) detected, returning makeup style response`);
          return this.getFallbackMakeupStyleResponse(aesthetic); // Pass the detected aesthetic
        }
      }
      // If makeup is mentioned but no specific aesthetic, use the general makeup fallback or prompt for AI
      // This part will be handled by the later checks or the AI prompt formatting
    }
    
    // Check for outfit-related keywords first with more variations
    if (lowerMessage.includes('outfit') || lowerMessage.includes('clothes') || 
        lowerMessage.includes('wear') || lowerMessage.includes('dress') || 
        lowerMessage.includes('style') || lowerMessage.includes('fashion') ||
        lowerMessage.includes('mall') || lowerMessage.includes('shopping') || 
        lowerMessage.includes('baddie') || lowerMessage.includes('going to') || 
        lowerMessage.includes('what to wear') || lowerMessage.includes('y2k') ||
        lowerMessage.includes('cottagecore') || lowerMessage.includes('retro') ||
        lowerMessage.includes('dark academia') || lowerMessage.includes('minimalist') ||
        lowerMessage.includes('inspo')) {
      console.log('Outfit query detected, returning outfit response');
      return this.getFallbackOutfitResponse(userMessage);
    }
    
    // Check for hair-related keywords with more variations
    if (lowerMessage.includes('hair') || lowerMessage.includes('hairstyle') || 
        lowerMessage.includes('haircut') || lowerMessage.includes('bangs') ||
        lowerMessage.includes('color') || lowerMessage.includes('dye') ||
        lowerMessage.includes('style my hair') || lowerMessage.includes('cut') ||
        lowerMessage.includes('retro hair') || lowerMessage.includes('y2k hair') ||
        (lowerMessage.includes('y2k') && !lowerMessage.includes('outfit')) ||
        (lowerMessage.includes('retro') && !lowerMessage.includes('outfit'))) {
      console.log('Hair query detected, returning hair response');
      return this.getFallbackHairResponse(userMessage);
    }
    
    // Check for jewelry-related keywords with more variations
    if (lowerMessage.includes('jewelry') || lowerMessage.includes('jewellery') || 
        lowerMessage.includes('necklace') || lowerMessage.includes('bracelet') || 
        lowerMessage.includes('earrings') || lowerMessage.includes('rings') ||
        lowerMessage.includes('accessories') || lowerMessage.includes('jewels') ||
        lowerMessage.includes('bling') || lowerMessage.includes('chain') ||
        lowerMessage.includes('pendant') || lowerMessage.includes('gems') ||
        lowerMessage.includes('jewel')) {
      console.log('Jewelry query detected, returning jewelry response');
      return this.getFallbackJewelryResponse(userMessage);
    }

    // Check for duplicate messages
    const lastMessage = this.context.chatHistory[this.context.chatHistory.length - 1];
    if (lastMessage && lastMessage.content === userMessage) {
      console.log('Duplicate message detected');
      // Determine which type of response to return based on the message content
      if (lowerMessage.includes('hair')) {
        return this.getFallbackHairResponse(userMessage);
      } else if (lowerMessage.includes('jewelry')) {
        return this.getFallbackJewelryResponse(userMessage);
      } else {
        return this.getFallbackOutfitResponse(userMessage);
      }
    }
    
    // Log incoming request
    console.log('Chat Service Debug:', {
      userMessage,
      messageType: 'outfit query detected',
      timestamp: new Date().toISOString(),
      requestId: newRequestId
    });

    // If we're already processing a request, return outfit response for shopping/mall queries
    if (this.isProcessing) {
      console.log('Already processing a request, returning outfit response');
      return this.getFallbackOutfitResponse(userMessage);
    }

    // Validate API connection first
    const validation = await this.validateApiConnection();
    if (!validation.isValid) {
      console.error('API validation failed:', validation.error);
      return this.getFallbackOutfitResponse(userMessage);
    }

    this.isProcessing = true;
    this.currentRequestId = newRequestId;
    this.lastRequestId = newRequestId;
    this.lastProcessedTime = Date.now();

    try {
      // Add user message to context
      this.context.chatHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      });

      // Prepare the messages for the model
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: STYLE_CONTEXT.defaultSystemPrompt,
          timestamp: new Date()
        },
        ...this.context.chatHistory.slice(-5) // Keep last 5 messages for context
      ];

      const prompt = this.formatPrompt(messages);

      console.log('Sending request to AI API:', {
        model: AI_CONFIG.model,
        prompt: prompt,
        requestId: newRequestId,
        messageCount: messages.length
      });

      // Call AI API with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT);

      const response = await fetch(AI_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AI_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_length: AI_CONFIG.maxTokens,
            temperature: AI_CONFIG.temperature,
            top_p: AI_CONFIG.topP,
            repetition_penalty: AI_CONFIG.repetitionPenalty
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Extract response text
      let aiResponse: string;
      if (Array.isArray(data) && data.length > 0) {
        aiResponse = data[0].generated_text;
      } else if (typeof data === 'string') {
        aiResponse = data;
      } else {
        throw new Error('Unexpected API response format');
      }

      // Clean the response
      aiResponse = aiResponse
        .replace(/<s>|<\/s>/g, '')
        .replace(/Human:|Assistant:/g, '')
        .trim();

      // Add AI response to context
      this.context.chatHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      });

      // Update state on success
      this.lastProcessedTime = Date.now();
      this.isProcessing = false;
      this.currentRequestId = null;
      this.lastRequestId = null;
      this.retryCount = 0;

      return aiResponse;
    } catch (error) {
      // Update state on error
      this.lastProcessedTime = Date.now();
      this.isProcessing = false;
      this.currentRequestId = null;
      this.lastRequestId = null;
      
      console.error('Request failed:', {
        requestId: newRequestId,
        error: error instanceof Error ? error.message : 'Unknown error',
        failureTime: new Date().toISOString()
      });

      // Return fallback response for any error
      return this.getFallbackOutfitResponse(userMessage);
    }
  }

  updateContext(newContext: Partial<StyleContext>) {
    this.context = {
      ...this.context,
      ...newContext,
    };
  }

  getContext(): StyleContext {
    return this.context;
  }

  clearChatHistory(): void {
    this.context.chatHistory = [];
    this.isProcessing = false;
    this.lastRequestId = null;
    this.retryCount = 0;
  }

  // Get outfit recommendations based on aesthetic
  private getOutfitsByAesthetic(aesthetic: string): OutfitRecommendations {
    switch(aesthetic.toLowerCase()) {
      case 'baddie':
        return {
          tops: [
            'Fitted Crop Top',
            'Corset Top',
            'Cut-out Bodysuit'
          ],
          bottoms: [
            'High-Waisted Cargo Pants',
            'Leather Pants',
            'Baggy Jeans'
          ],
          shoes: [
            'Platform Sneakers',
            'Chunky Boots',
            'Strappy Heels'
          ],
          layers: [
            'Cropped Leather Jacket',
            'Oversized Bomber',
            'Puffer Jacket'
          ],
          accessories: [
            'Chunky Gold Chains',
            'Large Hoop Earrings',
            'Designer Mini Bag',
            'Statement Sunglasses',
            'Chunky Rings'
          ],
          tips: [
            'Layer your gold jewelry',
            'Show some skin strategically',
            'Mix fitted and oversized pieces',
            'Add designer accessories',
            'Keep makeup bold and glossy'
          ],
          inspiration: 'baddie%20outfit%20aesthetic'
        };
      case 'y2k':
        return {
          tops: [
            'Baby Tee',
            'Halter Top',
            'Butterfly Print Crop'
          ],
          bottoms: [
            'Low-Rise Jeans',
            'Cargo Pants',
            'Pleated Mini Skirt'
          ],
          shoes: [
            'Platform Sandals',
            'Chunky Sneakers',
            'Combat Boots'
          ],
          layers: [
            'Fuzzy Cardigan',
            'Track Jacket',
            'Cropped Denim Jacket'
          ],
          accessories: [
            'Butterfly Hair Clips',
            'Tinted Sunglasses',
            'Mini Shoulder Bag',
            'Chunky Plastic Rings',
            'Platform Flip Flops'
          ],
          tips: [
            'Mix prints and colors',
            'Layer with mesh tops',
            'Add fun hair accessories',
            'Don\'t fear crop tops',
            'Embrace platform shoes'
          ],
          inspiration: 'y2k%20fashion%20outfit'
        };
      case 'cottagecore':
        return {
          tops: [
            'Puff Sleeve Blouse',
            'Floral Print Top',
            'Peasant Top'
          ],
          bottoms: [
            'Flowy Maxi Skirt',
            'Prairie Dress',
            'Linen Shorts'
          ],
          shoes: [
            'Mary Janes',
            'Lace-up Boots',
            'Ballet Flats'
          ],
          layers: [
            'Knit Cardigan',
            'Linen Blazer',
            'Floral Kimono'
          ],
          accessories: [
            'Straw Hat',
            'Floral Hair Clips',
            'Woven Basket Bag',
            'Lace Socks',
            'Pearl Hair Pins'
          ],
          tips: [
            'Layer with delicate pieces',
            'Mix florals and lace',
            'Add natural accessories',
            'Choose soft, muted colors',
            'Incorporate vintage pieces'
          ],
          inspiration: 'cottagecore%20outfit'
        };
      case 'dark-academia':
        return {
          tops: [
            'Oxford Button-Down',
            'Turtleneck Sweater',
            'Wool Vest'
          ],
          bottoms: [
            'Plaid Trousers',
            'Pleated Skirt',
            'Wool Pants'
          ],
          shoes: [
            'Oxford Shoes',
            'Loafers',
            'Chelsea Boots'
          ],
          layers: [
            'Tweed Blazer',
            'Wool Coat',
            'Trench Coat'
          ],
          accessories: [
            'Leather Satchel',
            'Wire Frame Glasses',
            'Silk Neck Scarf',
            'Leather Watch',
            'Vintage Brooch'
          ],
          tips: [
            'Layer with academic pieces',
            'Stick to neutral colors',
            'Mix textures like wool and leather',
            'Add vintage accessories',
            'Keep it polished and preppy'
          ],
          inspiration: 'dark%20academia%20fashion'
        };
      case 'minimalist':
        return {
          tops: [
            'Basic White Tee',
            'Black Turtleneck',
            'Silk Button-Down'
          ],
          bottoms: [
            'Straight Leg Jeans',
            'Black Trousers',
            'Midi Slip Skirt'
          ],
          shoes: [
            'White Sneakers',
            'Ankle Boots',
            'Ballet Flats'
          ],
          layers: [
            'Classic Blazer',
            'Camel Coat',
            'Trench Coat'
          ],
          accessories: [
            'Simple Gold Necklace',
            'Leather Tote',
            'Classic Watch',
            'Minimal Earrings',
            'Leather Belt'
          ],
          tips: [
            'Focus on quality basics',
            'Keep color palette neutral',
            'Choose clean lines',
            'Invest in timeless pieces',
            'Less is more'
          ],
          inspiration: 'minimal%20fashion%20style'
        };
      case 'coquette core':
        return {
          tops: ['Lace camisole', 'Peter Pan collar blouse', 'Cardigan with pearl buttons'],
          bottoms: ['Pleated mini skirt (pastel)', 'Bloomers (as outerwear)', 'High-waisted shorts with ruffles'],
          shoes: ['Mary Janes', 'Ballet flats with ribbons', 'Heeled loafers with socks'],
          layers: ['Pointelle knit cardigan', 'Sheer lace robe', 'Faux fur stole (light color)'],
          accessories: ['Pearl necklaces (layered)', 'Lace gloves', 'Heart-shaped sunglasses', 'Mini top-handle bag', 'Bows (for hair and clothes)'],
          tips: ['Embrace pastel colors, lace, and ruffles', 'Think hyper-feminine and doll-like', 'Incorporate vintage-inspired pieces'],
          inspiration: 'coquette%20core%20outfit'
        };
      case 'grunge core':
        return {
          tops: ['Band t-shirt (oversized)', 'Flannel shirt (worn open or tied)', 'Distressed knit sweater'],
          bottoms: ['Ripped jeans (baggy or skinny)', 'Plaid mini skirt', 'Black cargo pants'],
          shoes: ['Combat boots (e.g., Dr. Martens)', 'Platform sneakers (worn-in)', 'Converse (classic black)'],
          layers: ['Oversized denim jacket', 'Leather biker jacket', 'Longline cardigan (distressed)'],
          accessories: ['Beanie', 'Choker necklace (simple black or silver)', 'Fishnet stockings or tights', 'Silver chain wallet'],
          tips: ['Layering is key', 'Embrace distressed and oversized pieces', 'Darker color palette with pops of plaid'],
          inspiration: 'grunge%20core%20outfit'
        };
      case 'streetwear':
        return {
          tops: ['Graphic hoodie or sweatshirt', 'Oversized t-shirt', 'Boxy crop top'],
          bottoms: ['Cargo pants', 'Baggy jeans or track pants', 'Utility skirt'],
          shoes: ['Sneakers (Jordans, Dunks, Yeezys, etc.)', 'Chunky trainers', 'Slides with socks'],
          layers: ['Bomber jacket', 'Windbreaker', 'Puffer vest'],
          accessories: ['Crossbody bag or belt bag', 'Baseball cap or beanie', 'Chain necklaces', 'Statement socks'],
          tips: ['Focus on comfort and brand recognition (optional)', 'Mix high-low fashion elements', 'Logos and graphics are prominent'],
          inspiration: 'streetwear%20outfit'
        };
      case 'mob wife':
        return {
          tops: ['Silk blouse (animal print or jewel tones)', 'Fitted black turtleneck', 'Cashmere sweater'],
          bottoms: ['Leather pencil skirt or pants', 'Tailored trousers (black)', 'Dark wash skinny jeans'],
          shoes: ['Stiletto heels (black, pointed)', 'Designer pumps', 'Knee-high leather boots'],
          layers: ['Faux fur coat (leopard print or black)', 'Long wool coat', 'Leather jacket with fur collar'],
          accessories: ['Large designer handbag (structured)', 'Gold hoop earrings or statement gold jewelry', 'Oversized sunglasses', 'Silk scarf'],
          tips: ['Think power dressing with a glamorous, expensive edge', 'Animal prints, leather, and fur (faux) are staples', 'Confidence is the main accessory'],
          inspiration: 'mob%20wife%20outfit'
        };
      case 'old money':
        return {
          tops: ['Crisp button-down shirt (white, light blue)', 'Cashmere or merino wool sweater', 'Silk blouse', 'Polo shirt'],
          bottoms: ['Tailored trousers (wool, linen)', 'Chino pants or shorts', 'A-line skirt', 'Well-fitting dark wash jeans (no rips)'],
          shoes: ['Loafers (leather, suede)', 'Riding boots', 'Classic pumps or ballet flats', 'Clean white sneakers (e.g., Veja, Common Projects)'],
          layers: ['Blazer (navy, tweed)', 'Trench coat', 'Barbour jacket', 'Cable-knit cardigan'],
          accessories: ['Leather belt', 'Silk scarf (Hermes-esque)', 'Classic watch', 'Understated jewelry (pearls, simple gold)', 'Leather tote bag'],
          tips: ['Focus on timeless, high-quality pieces', 'Neutral and classic color palette', 'Impeccable tailoring and fit', 'Avoid flashy logos'],
          inspiration: 'old%20money%20outfit'
        };
      case 'alt':
        return {
          tops: ['Band merch t-shirt', 'Fishnet top (layered)', 'Corset top (goth/punk style)', 'Oversized hoodie with graphics'],
          bottoms: ['Ripped skinny jeans (black)', 'Plaid pants or skirt', 'Cargo pants with chains', 'Leather or PVC pants/skirt'],
          shoes: ['Platform boots (combat, goth style)', 'Skate shoes (e.g., Vans, Converse)', 'Creepers'],
          layers: ['Denim vest with patches', 'Leather biker jacket', 'Oversized flannel shirt'],
          accessories: ['Chains (wallet, necklace)', 'Studded belts', 'Chokers', 'Fingerless gloves', 'Multiple piercings', 'Bandanas'],
          tips: ['Expresses individuality and non-conformity', 'Often incorporates elements of punk, goth, emo, or scene', 'Dark colors mixed with bright accents'],
          inspiration: 'alt%20outfit'
        };
      case 'boho aesthetic':
        return {
          tops: ['Embroidered peasant blouse', 'Crochet crop top', 'Flowy floral print tunic'],
          bottoms: ['Maxi skirt (tiered, patterned)', 'Wide-leg palazzo pants', 'Distressed denim shorts with lace trim'],
          shoes: ['Suede ankle boots', 'Gladiator sandals', 'Espadrilles'],
          layers: ['Fringed kimono or vest', 'Sheer lace duster', 'Denim jacket (light wash)'],
          accessories: ['Layered necklaces (natural stones, silver)', 'Wide-brimmed hat (felt or straw)', 'Fringe bag', 'Multiple rings', 'Anklets'],
          tips: ['Focus on flowing silhouettes, natural fabrics, and earthy tones', 'Mix prints and textures', 'Incorporate handmade or artisanal pieces'],
          inspiration: 'boho%20outfit'
        };
      case 'stockholm':
        return {
          tops: ['Oversized knit sweater (neutral color)', 'Crisp white shirt', 'Striped breton top', 'Silk camisole (layered)'],
          bottoms: ['Straight-leg jeans (light or dark wash)', 'Tailored wide-leg trousers', 'Midi skirt (silk or knit)'],
          shoes: ['Chunky loafers', 'Minimalist white sneakers', 'Sleek ankle boots', 'Ballet flats (modern style)'],
          layers: ['Oversized wool coat or trench coat', 'Relaxed-fit blazer', 'Cardigan (worn as a top or layer)'],
          accessories: ['Understated gold jewelry', 'Leather crossbody bag', 'Sunglasses (classic shape)', 'Cashmere scarf'],
          tips: ['Effortless chic with a focus on quality basics and good fit', 'Neutral color palette with occasional subtle pops of color', 'Mix of relaxed and tailored pieces'],
          inspiration: 'stockholm%20style%20outfit'
        };
      case 'costal granddaughter': // Note: "Coastal" spelling
        return {
          tops: ['Linen button-down shirt (oversized)', 'Striped knit sweater (cotton)', 'Simple white t-shirt or tank'],
          bottoms: ['White linen pants or shorts', 'Light-wash denim shorts', 'Flowy midi skirt (light blue or white)'],
          shoes: ['Espadrilles', 'Canvas sneakers (e.g., Superga)', 'Birkenstock-style sandals', 'Boat shoes'],
          layers: ['Chunky knit cardigan (cream or navy)', 'Lightweight windbreaker', 'Denim jacket'],
          accessories: ['Canvas tote bag', 'Baseball cap', 'Simple gold jewelry', 'Woven straw hat', 'Sunglasses'],
          tips: ['Relaxed, comfortable, and timeless coastal vibe', 'Natural fabrics like linen and cotton', 'Nautical influences (stripes, navy, white)'],
          inspiration: 'coastal%20granddaughter%20outfit'
        };
      case 'espresso':
        return {
          tops: ['Chocolate brown silk blouse', 'Fitted knit top in deep brown', 'Cream or beige turtleneck (to contrast)'],
          bottoms: ['Brown tailored trousers', 'Dark denim jeans', 'Leather skirt in a coffee tone'],
          shoes: ['Brown leather boots or loafers', 'Nude heels', 'Suede ankle boots in a warm tone'],
          layers: ['Camel or brown wool coat', 'Beige trench coat', 'Dark brown blazer'],
          accessories: ['Gold jewelry', 'Brown leather handbag', 'Tortoiseshell sunglasses', 'Silk scarf in earthy tones'],
          tips: ['Focus on rich, warm brown tones, like espresso, chocolate, and caramel', 'Monochromatic brown looks or pairing with cream/beige', 'Luxurious textures like silk, cashmere, leather'],
          inspiration: 'espresso%20aesthetic%20outfit'
        };
      case 'bloquette':
        return {
          tops: ['Vintage-style football jersey or oversized sports tee', 'Cropped baby tee with sporty graphics', 'Girly blouse layered under a jersey'],
          bottoms: ['Pleated mini skirt', 'Track pants or shorts (worn with feminine top)', 'Low-rise jeans with a ribbon belt'],
          shoes: ['Adidas Samba or Gazelle sneakers', 'Chunky sneakers', 'Mary Janes with socks'],
          layers: ['Sporty zip-up jacket', 'Delicate cardigan over a sports tee'],
          accessories: ['Ribbons in hair or tied to bag', 'Leg warmers or frilly socks with sneakers', 'Sporty headband with bows', 'Dainty jewelry mixed with sporty elements'],
          tips: ['Combines sporty tomboy (Blokecore) with hyper-feminine (Coquette)', 'Mix athletic wear with delicate details like lace and ribbons', 'Playful juxtaposition of styles'],
          inspiration: 'bloquette%20outfit'
        };
      case 'dark feminine':
        return {
          tops: ['Black lace blouse', 'Velvet corset top', 'Silk camisole in jewel tones (burgundy, emerald)', 'Fitted turtleneck'],
          bottoms: ['Long satin slip skirt (black or deep red)', 'Tailored black trousers', 'Leather pencil skirt'],
          shoes: ['Pointed-toe heels or boots', 'Velvet pumps', 'Strappy sandals (dark colors)'],
          layers: ['Long black coat (wool or faux fur)', 'Sheer lace robe or kimono', 'Fitted leather jacket'],
          accessories: ['Statement jewelry (dark gemstones, antique silver/gold)', 'Lace gloves or choker', 'Structured handbag in dark leather', 'Dark lipstick as an accessory'],
          tips: ['Embrace sensuality, power, and mystery', 'Luxurious fabrics like silk, satin, velvet, lace', 'Dark color palette (black, burgundy, forest green, deep purple)', 'Fitted silhouettes and dramatic details'],
          inspiration: 'dark%20feminine%20outfit'
        };
      case 'light feminine':
        return {
          tops: ['White eyelet blouse', 'Pastel cashmere sweater', 'Silk camisole with lace trim (light colors)', 'Puff-sleeve top'],
          bottoms: ['Flowy midi or maxi skirt (floral, pastel)', 'White linen trousers', 'Pleated skirt in a light color'],
          shoes: ['Ballet flats', 'Slingback heels (nude or pastel)', 'Delicate sandals', 'White sneakers with a feminine touch'],
          layers: ['Light knit cardigan (pearl buttons)', 'Sheer duster or kimono', 'Tweed jacket in a light color'],
          accessories: ['Pearl jewelry', 'Delicate gold or silver necklaces', 'Silk scarf (floral or pastel)', 'Hair bows or ribbons', 'Straw bag or light-colored handbag'],
          tips: ['Focus on softness, romance, and elegance', 'Light and airy fabrics (cotton, linen, silk, chiffon)', 'Pastel and neutral color palette', 'Floral prints and delicate details'],
          inspiration: 'light%20feminine%20outfit'
        };
      case 'acubi':
        return {
          tops: ['Minimalist fitted long-sleeve top', 'Asymmetrical crop top', 'Sheer mesh top (layered)', 'Basic tank top (black, white, grey)'],
          bottoms: ['Low-rise cargo pants or wide-leg trousers (neutral colors)', 'Mini skirt (utility or pleated)', 'Baggy jeans'],
          shoes: ['Chunky platform sneakers or boots', 'Pointed-toe heels (for a dressier look)', 'Simple slides'],
          layers: ['Cropped zip-up hoodie', 'Bolero shrug', 'Oversized faux leather jacket'],
          accessories: ['Silver chain jewelry', 'Minimalist shoulder bag', 'Arm warmers', 'Headphones (as an accessory)', 'Futuristic sunglasses'],
          tips: ['Combines Y2K elements with minimalism and a futuristic edge', 'Often features a muted color palette with occasional pops of color', 'Focus on interesting silhouettes and cut-outs'],
          inspiration: 'acubi%20fashion%20outfit'
        };
      case 'stargirl':
        return {
          tops: ['Anything sparkly or iridescent', 'Mesh top with star print', 'Halter top with sequins', 'Fuzzy crop top (pastel)'],
          bottoms: ['Metallic mini skirt', 'Sheer pants with glitter', 'Flared pants with star details', 'Denim shorts with rhinestone accents'],
          shoes: ['Platform boots with glitter or holographic details', 'Sparkly sneakers', 'Jelly sandals with glitter'],
          layers: ['Faux fur jacket (pastel or metallic)', 'Sheer organza bomber jacket', 'Cropped sparkly cardigan'],
          accessories: ['Star and moon themed jewelry', 'Hair tinsel or glitter', 'Body glitter', 'Mini backpack (holographic or sparkly)', 'Chokers with charms'],
          tips: ['Embrace all things shiny, sparkly, and celestial', 'Pastel colors, metallics, and iridescent fabrics are key', 'Playful and whimsical, think pop star meets alien princess'],
          inspiration: 'stargirl%20aesthetic%20outfit'
        };
      case 'balletcore':
        return {
          tops: ['Wrap top (ballet style)', 'Fitted leotard or bodysuit (worn as a top)', 'Cashmere cardigan (soft, fitted)', 'Simple tank top'],
          bottoms: ['Tulle skirt (midi or mini)', 'Leggings or ballet tights', 'Flowy wrap skirt', 'Soft knit shorts'],
          shoes: ['Ballet flats (actual or inspired)', 'Pointed-toe flats', 'Delicate heels with ankle straps'],
          layers: ['Bolero shrug or knit wrap sweater', 'Sheer long-sleeve top (layered)', 'Leg warmers (worn over leggings or on arms)'],
          accessories: ['Satin ribbons (for hair, around waist, or on shoes)', 'Delicate jewelry (pearls, simple chains)', 'Headbands (thin, satin)', 'Tote bag (for dance essentials, even if not dancing)'],
          tips: ['Focus on soft, comfortable fabrics and graceful silhouettes', 'Light, neutral, and pastel color palettes', 'Channel the elegance and discipline of ballet dancers'],
          inspiration: 'balletcore%20outfit'
        };
      case 'mermaid core':
        return {
          tops: ['Crochet or net top', 'Scalloped edge camisole', 'Seashell-shaped bikini top (as a festival top)', 'Iridescent sequin top'],
          bottoms: ['Maxi skirt with a fishtail hem', 'Scale-patterned leggings or pants', 'Flowy sheer pants or skirt', 'Distressed denim shorts with shell details'],
          shoes: ['Barefoot sandals (for beachy vibes)', 'Espadrilles with shell details', 'Clear heels or sandals', 'Gladiator sandals with pearl accents'],
          layers: ['Sheer kimono with ocean prints', 'Net or crochet cardigan', 'Lightweight duster in seafoam green or blue'],
          accessories: ['Seashell and pearl jewelry (necklaces, earrings, bracelets)', 'Starfish hair clips', 'Net bag or shell-shaped clutch', 'Body chains with pearls or shells'],
          tips: ['Embrace ocean-inspired colors (blues, greens, purples, iridescent)', 'Incorporate textures like netting, crochet, and sequins', 'Flowing silhouettes and ethereal details'],
          inspiration: 'mermaidcore%20outfit'
        };
      case 'gyaru':
        return {
          tops: ['Brightly colored or animal print crop tops', 'Off-the-shoulder blouses', 'Schoolgirl-inspired tops (sometimes)', 'Tops with lots of embellishments (lace, ruffles, bows)'],
          bottoms: ['Mini skirts (plaid, denim, or bright colors)', 'Short shorts', 'Tiered skirts'],
          shoes: ['Platform boots or heels (often very high)', 'Decorated sneakers', 'Over-the-knee socks or leg warmers with shoes'],
          layers: ['Faux fur trimmed cardigans or jackets', 'Bolero jackets', 'Schoolgirl blazers (customized)'],
          accessories: ['Lots of jewelry (chunky, colorful, charms)', 'Large bows and hair accessories', 'Decorated nails (long, elaborate)', 'Circle lenses (for eye-enlarging effect)', 'Brand name bags (often)', 'Phone charms'],
          tips: ['A Japanese street style known for its bold and glamorous look', 'Emphasis on tanned skin (often), dramatic eye makeup, and voluminous hair', 'Many subgenres, but generally very decorated and attention-grabbing'],
          inspiration: 'gyaru%20fashion%20outfit'
        };
      case 'arizona style':
        return {
          tops: ['Graphic tee with desert or band print', 'Embroidered peasant blouse', 'Chambray shirt', 'Crochet tank top'],
          bottoms: ['Distressed denim jeans or shorts', 'Suede or faux leather mini skirt', 'Flowy printed maxi skirt'],
          shoes: ['Western ankle boots (cowboy boots)', 'Leather sandals with woven details', 'Moccasins or suede loafers'],
          layers: ['Fringed suede or denim jacket', 'Oversized knit cardigan with geometric patterns', 'Poncho'],
          accessories: ['Turquoise and silver jewelry (statement necklaces, rings, cuffs)', 'Wide-brimmed felt hat (fedora or western style)', 'Leather belt with a statement buckle', 'Concho belt', 'Bandana', 'Crossbody bag with tooled leather or fringe'],
          tips: ['Mixes Western, bohemian, and desert influences', 'Earthy tones, denim, suede, and leather are common', 'Focus on statement accessories, especially turquoise and silver'],
          inspiration: 'arizona%20style%20outfit'
        };
      case 'dark cottagecore':
        return {
          tops: ['Black or deep jewel-toned peasant blouse', 'Lace top in dark colors', 'Embroidered top with nature motifs (e.g., mushrooms, moths)', 'Turtleneck under a pinafore dress'],
          bottoms: ['Long, flowing skirt in dark floral or plaid', 'Corduroy trousers or skirt (dark brown, forest green)', 'High-waisted wool shorts with tights'],
          shoes: ['Lace-up boots (combat or Victorian style)', 'Dark Mary Janes or loafers', 'Clogs'],
          layers: ['Chunky knit cardigan in dark, earthy tones', 'Velvet or corduroy blazer/jacket', 'Wool cloak or capelet'],
          accessories: ['Antique-style jewelry (silver, pewter, dark stones)', 'Leather satchel or crossbody bag', 'Beret or wide-brimmed hat in dark colors', 'Dried flower or herb bundles as accessories', 'Dark academia elements can overlap'],
          tips: ['A moodier, more mysterious take on cottagecore', 'Earthy tones mixed with darks (black, deep browns, forest greens, burgundy)', 'Natural fabrics, vintage-inspired pieces, and occult or nature-inspired motifs'],
          inspiration: 'dark%20cottagecore%20outfit'
        };
      case 'dark coquette':
        return {
          tops: ['Black lace camisole or bustier', 'Velvet top with puff sleeves', 'Sheer black blouse with ruffles', 'Deep red or burgundy silk top'],
          bottoms: ['Black pleated mini skirt', 'Satin slip skirt in a dark jewel tone', 'High-waisted shorts with lace trim (dark)', 'Bloomers in black or deep red'],
          shoes: ['Black Mary Janes or platform heels', 'Velvet heels with ribbon ties', 'Lace-up heeled boots'],
          layers: ['Short faux fur jacket in black or deep red', 'Sheer black lace robe or cardigan', 'Bolero in velvet or satin'],
          accessories: ['Black or dark red velvet ribbons/bows', 'Pearl necklaces with a dark pendant', 'Lace choker', 'Heart-shaped bag in black', 'Dark academia or gothic jewelry elements'],
          tips: ['Combines the hyper-femininity of coquette with a darker, more sultry palette', 'Fabrics like lace, velvet, satin in black, burgundy, deep purples', 'Romantic but with an edge of mystery or vampiness'],
          inspiration: 'dark%20coquette%20outfit'
        };
      case 'rockstar girlfriend style':
        return {
          tops: ['Vintage band t-shirt (slightly oversized or cropped)', 'Sheer or mesh top', 'Leather or faux leather bustier/corset', 'Distressed knit sweater'],
          bottoms: ['Black skinny jeans (ripped or plain)', 'Leather pants or mini skirt', 'Low-rise flared jeans', 'Fishnet tights under shorts or ripped jeans'],
          shoes: ['Combat boots or platform boots', 'Pointed-toe ankle boots', 'Vintage sneakers (e.g., Converse)', 'Sometimes heels for a night out look'],
          layers: ['Leather biker jacket (essential)', 'Oversized denim jacket', 'Faux fur coat (leopard print or black for glam rock vibe)', 'Flannel shirt tied around waist'],
          accessories: ['Layered silver chain necklaces', 'Chokers', 'Studded belt', 'Bandana', 'Aviator sunglasses', 'Crossbody bag with edgy details'],
          tips: ['Effortlessly cool, edgy, and a bit rebellious', 'Lots of black, leather, denim, and band merch', 'A mix of fitted and oversized pieces', 'Looks like you just stepped off a tour bus'],
          inspiration: 'rockstar%20girlfriend%20outfit'
        };
      case 'indie':
        return {
          tops: ['Vintage graphic tee (obscure band, quirky print)', 'Oversized knit cardigan', 'Patterned button-down shirt (worn open or tied)', 'Striped long-sleeve top'],
          bottoms: ['High-waisted mom jeans or straight-leg jeans (often light wash)', 'Corduroy pants or skirt', 'Patterned or colorful trousers', 'Denim overalls'],
          shoes: ['Classic sneakers (Converse, Vans, Keds)', 'Doc Martens or similar combat boots', 'Clogs or Birkenstocks', 'Mary Janes or loafers (often with socks)'],
          layers: ['Denim jacket with pins/patches', 'Utility jacket', 'Chunky knit sweater'],
          accessories: ['Tote bag with a quirky print or band logo', 'Beanie or beret', 'Round or unique-shaped glasses', 'Enamel pins', 'Layered delicate necklaces or statement pendants', 'Colorful socks'],
          tips: ['Focuses on individuality, creativity, and often a vintage or thrifted feel', 'Comfortable and practical with an artistic flair', 'Mixes patterns, textures, and colors in unexpected ways'],
          inspiration: 'indie%20aesthetic%20outfit'
        };
      case 'preppy (old fashioned)': // Classic Preppy
        return {
          tops: ['Oxford cloth button-down shirt (OCBD)', 'Polo shirt (Lacoste, Ralph Lauren)', 'Cable-knit sweater (crewneck or v-neck)', 'Peter Pan collar blouse'],
          bottoms: ['Khaki pants or shorts', 'Plaid or madras shorts/skirts', 'Corduroy pants (in fall/winter)', 'A-line skirt'],
          shoes: ['Loafers (penny loafers, tassel loafers)', 'Boat shoes (Sperry Top-Siders)', 'White canvas sneakers (Keds, Tretorns)', 'Riding boots'],
          layers: ['Navy blazer with gold buttons', 'Letterman jacket or cardigan', 'Barbour jacket', 'Trench coat'],
          accessories: ['Ribbon belts or belts with nautical motifs', 'Pearls (necklace, earrings)', 'Headbands (often fabric with bows)', 'Monogrammed items', 'Argyle socks'],
          tips: ['Timeless, traditional, and often associated with Ivy League style', 'Quality, durable clothing in classic colors and patterns', 'Neat and put-together appearance'],
          inspiration: 'classic%20preppy%20outfit'
        };
      case 'preppy (new fashion)': // Modern Preppy
        return {
          tops: ['Oversized button-down shirt (worn loosely)', 'Fitted knit polo', 'Sweater vest (layered over a shirt)', 'Striped tee'],
          bottoms: ['Pleated mini skirt (tennis skirt style)', 'Tailored shorts', 'Straight-leg or wide-leg trousers (not too baggy)', 'Dark wash slim jeans'],
          shoes: ['Chunky loafers with socks', 'Clean white sneakers (designer or minimalist)', 'Sleek ankle boots', 'Modern ballet flats'],
          layers: ['Oversized blazer', 'Short trench coat or car coat', 'Varsity-inspired bomber jacket', 'Quilted jacket'],
          accessories: ['Statement headbands (knotted, embellished)', 'Gold hoop earrings or layered delicate necklaces', 'Structured mini bag or crossbody', 'Baseball cap (plain or with a subtle logo)', 'Retro sunglasses'],
          tips: ['A fresh take on preppy classics with modern silhouettes and styling', 'Mixes traditional preppy elements with trendier pieces', 'Play with proportions (e.g., oversized blazer with mini skirt)'],
          inspiration: 'modern%20preppy%20outfit'
        };
      case "80s":
      case "80's":
        return {
          tops: ['Oversized sweatshirt (off-the-shoulder)', 'Neon tank top', 'Power suit blouse with shoulder pads', 'Acid wash denim shirt'],
          bottoms: ['Stirrup pants or leggings', 'High-waisted jeans (mom jeans, acid wash)', 'Mini skirts (denim, leather, rah-rah skirts)', 'Parachute pants'],
          shoes: ['White high-top sneakers (Reebok Freestyles, Nike Air Jordans)', 'Pumps (neon or bold colors)', 'Jelly shoes', 'Doc Martens (punk influence)'],
          layers: ['Denim jacket (acid wash, oversized, embellished)', 'Bomber jacket (nylon)', 'Blazer with shoulder pads', 'Windbreaker (bright colors)'],
          accessories: ['Leg warmers', 'Fingerless lace gloves', 'Chunky plastic jewelry (neon, geometric)', 'Swatch watches', 'Wayfarer sunglasses', 'Scrunchies', 'Headbands (sweatbands or wide plastic)'],
          tips: ['Bold colors, power dressing, and athletic influences were huge', 'Don\'t be afraid to mix patterns and bright colors', 'Big hair, shoulder pads, and statement accessories defined the era'],
          inspiration: '80s%20fashion%20outfit'
        };
      case "90s":
      case "90's":
        return {
          tops: ['Baby tee or cropped top', 'Slip dress (worn as a top or dress)', 'Oversized band t-shirt', 'Halter neck top', 'Cardigan (fitted or grunge-style oversized)'],
          bottoms: ['Baggy jeans or mom jeans', 'Plaid mini skirt', 'Cargo pants', 'Bike shorts (as fashion)', 'Slip skirt'],
          shoes: ['Chunky platform sneakers (Spice Girls style)', 'Combat boots (Dr. Martens)', 'Jelly sandals', 'Birkenstocks', 'Platform flip-flops'],
          layers: ['Flannel shirt (tied around waist or worn open)', 'Denim jacket', 'Leather jacket', 'Windbreaker'],
          accessories: ['Choker necklaces (tattoo, velvet, charm)', 'Butterfly clips', 'Mini backpacks', 'Bucket hats', 'Round sunglasses or tiny sunglasses', 'Mood rings'],
          tips: ['A diverse decade with influences from grunge, hip-hop, rave culture, and minimalism', 'Layering was popular (e.g., slip dress over a t-shirt)', 'Comfortable and casual styles mixed with edgier looks'],
          inspiration: '90s%20fashion%20outfit'
        };
      case "60s":
      case "60's":
        return {
          tops: ['Shift top', 'Turtleneck (often ribbed)', 'Peter Pan collar blouse', 'Breton striped top'],
          bottoms: ['A-line mini skirt', 'Bell-bottom pants (late 60s)', 'Culottes', 'Shift dress (worn as a tunic over pants sometimes)'],
          shoes: ['Go-go boots (white, block heel)', 'Mary Janes', 'Loafers', 'Ballet flats', 'Pointed-toe flats or low heels'],
          layers: ['Boxy jacket or coat (often collarless)', 'Pea coat', 'Cardigan sets'],
          accessories: ['Large, geometric earrings (plastic)', 'Wide headbands or hair scarves', 'Oversized sunglasses (round or cat-eye)', 'White gloves (early 60s)', 'Chain belts', 'Colorful tights'],
          tips: ['The Mod look (geometric, bold, youthful) and the Hippie look (flowing, natural, psychedelic) were major trends', 'Mini skirts and shift dresses were iconic', 'Bold colors and graphic prints (color blocking, Op Art)'],
          inspiration: '60s%20fashion%20outfit'
        };
      case "70s":
      case "70's":
        return {
          tops: ['Peasant blouse (embroidered, billowy sleeves)', 'Halter neck top', 'Crochet top', 'T-shirt with ironic slogans or band logos', 'Wrap top'],
          bottoms: ['Bell-bottom jeans or corduroy pants', 'High-waisted wide-leg trousers', 'Maxi skirts (floral, prairie style)', 'Denim shorts (hot pants)', 'Jumpsuits'],
          shoes: ['Platform shoes and boots', 'Clogs', 'Espadrilles', 'Wedges', 'Earth shoes or moccasins'],
          layers: ['Fringed vest (suede or crochet)', 'Denim jacket', 'Duster coat or kimono', 'Shearling coat'],
          accessories: ['Large sunglasses (round or square)', 'Floppy hats or wide-brimmed hats', 'Headscarves or bandanas', 'Layered necklaces (natural stones, peace signs)', 'Macrame belts', 'Platform bags'],
          tips: ['Diverse styles including disco, punk, bohemian, and glam rock', 'Natural fabrics, earthy tones, and bold psychedelic prints were popular', 'Silhouettes were often long and lean or flared and flowing'],
          inspiration: '70s%20fashion%20outfit'
        };
      case "50s":
      case "50's":
        return {
          tops: ['Fitted twinset cardigan', 'Button-down blouse (often with a scarf)', 'Halter neck top (for summer)', 'Boat neck top'],
          bottoms: ['Full circle skirt or poodle skirt (worn with petticoats)', 'Pencil skirt', 'Capri pants', 'High-waisted jeans (cuffed)'],
          shoes: ['Saddle shoes', 'Pointed-toe pumps (stiletto or kitten heel)', 'Ballet flats', 'Canvas sneakers (Keds)'],
          layers: ['Letterman jacket or cardigan', 'Bolero jacket', 'Fitted blazer'],
          accessories: ['Cat-eye glasses', 'Silk scarf (tied around neck or ponytail)', 'Gloves (wrist-length or elbow-length)', 'Structured handbag', 'Waist-cinching belt', 'Pearl or costume jewelry'],
          tips: ['Feminine, structured silhouettes were key (e.g., the New Look)', 'Emphasis on a nipped-in waist', 'Matching sets and coordinated accessories were popular', 'Youth culture (rock and roll, greasers) also influenced fashion'],
          inspiration: '50s%20fashion%20outfit'
        };
      case "30s":
      case "30's":
        return {
          tops: ['Blouses with interesting necklines (bows, ruffles, jabots)', 'Softly tailored knit tops', 'Evening tops with beading or sequins'],
          bottoms: ['Bias-cut long skirts or dresses that hugged the figure', 'Wide-leg trousers (for casual or resort wear)', 'Culottes for sportswear'],
          shoes: ['Heeled pumps with T-straps or ankle straps', 'Oxfords or spectator shoes (for daywear)', 'Slingbacks'],
          layers: ['Tailored jackets with nipped-in waists and defined shoulders', 'Fur stoles or capes (for evening)', 'Cardigans that matched dresses'],
          accessories: ['Cloche hats evolving into wider brims and tilted styles', 'Gloves (essential)', 'Small, structured clutch bags', 'Art Deco jewelry (geometric, bold)', 'Bakelite bangles'],
          tips: ['A return to a more elongated, feminine silhouette after the boyish 20s', 'Bias cut fabric was revolutionary, creating clinging, flowing garments', 'Hollywood glamour had a huge influence on fashion'],
          inspiration: '30s%20fashion%20outfit'
        };
      case "20s":
      case "20's":
        return {
          tops: ['Beaded or sequined camisoles/tunics (often sleeveless)', 'Simple blouses worn under dresses', 'Knitwear (cardigans, sweaters for sportswear)'],
          bottoms: ['Dropped-waist dresses were the main garment (skirts weren\\\'t separate as much for the iconic look)', 'Some wider trousers for very casual/sporty occasions (beach pyjamas)'],
          shoes: ['Mary Janes with a T-strap or single strap', 'Low-heeled pumps', 'Satin dancing shoes'],
          layers: ['Long strings of pearls or beads (worn as necklaces)', 'Feather boas', 'Embroidered or beaded shawls and capes', 'Kimono-style robes'],
          accessories: ['Cloche hats (worn low over the forehead)', 'Flapper headbands (beaded, feathered)', 'Long gloves (for evening)', 'Cigarette holders (iconic accessory)', 'Art Deco jewelry', 'Small, ornate clutch bags'],
          tips: ['The iconic "flapper" look featured a straight, boyish silhouette with a dropped waistline', 'Dresses were often sleeveless and shorter (knee-length or just below)', 'Heavy embellishment (beading, sequins, fringe) was common for eveningwear'],
          inspiration: '20s%20flapper%20fashion%20outfit'
        };
      case 'clean girl':
        return {
          tops: ['Fitted ribbed tank top or bodysuit (neutral colors)', 'Crisp oversized button-down shirt (white, beige, light blue)', 'Cashmere crewneck or v-neck sweater', 'Simple high-quality t-shirt'],
          bottoms: ['Tailored wide-leg trousers or straight-leg pants (cream, beige, black)', 'Well-fitting jeans (straight or classic cut, no rips)', 'Satin slip skirt (midi length)', 'Linen shorts (summer)'],
          shoes: ['Minimalist white sneakers (e.g., Veja, Axel Arigato)', 'Loafers (classic or chunky with socks)', 'Sleek ankle boots or mules', 'Delicate sandals or ballet flats'],
          layers: ['Oversized blazer (neutral colors)', 'Classic trench coat', 'Lightweight cardigan (fine knit)', 'Neutral shacket (shirt jacket)'],
          accessories: ['Delicate gold jewelry (layered necklaces, small hoops)', 'Claw clip for hair', 'Structured leather tote bag or minimalist shoulder bag', 'Classic sunglasses (e.g., Ray-Ban Wayfarers, cat-eye)', 'Simple leather belt'],
          tips: ['Effortless, polished, and put-together with an emphasis on high-quality basics', 'Neutral color palette (beige, cream, white, black, grey, olive)', 'Focus on good fit and luxurious-feeling fabrics (even if not expensive)', 'Minimal makeup, glowing skin, and neat hair are part of the look'],
          inspiration: 'clean%20girl%20aesthetic%20outfit'
        };
      default:
        return { // Classic Outfit Recommendations
          tops: [
            'Classic White Tee',
            'Fitted Tank Top',
            'Button-Down Shirt'
          ],
          bottoms: [
            'High-Waisted Jeans',
            'Black Leggings',
            'Midi Skirt'
          ],
          shoes: [
            'White Sneakers',
            'Ankle Boots',
            'Ballet Flats'
          ],
          layers: [
            'Denim Jacket',
            'Cardigan',
            'Blazer'
          ],
          accessories: [
            'Versatile Tote Bag',
            'Simple Necklace',
            'Classic Watch',
            'Leather Belt',
            'Stud Earrings'
          ],
          tips: [
            'Mix and match basics',
            'Layer strategically',
            'Choose versatile pieces',
            'Focus on fit',
            'Keep it balanced'
          ],
          inspiration: 'classic%20outfit%20ideas'
        };
    }
  }

  private getHairstylesByAesthetic(aesthetic: string): HairRecommendations {
    switch(aesthetic.toLowerCase()) {
      case 'baddie':
        return {
          styles: [
            'Sleek High Ponytail with Baby Hairs',
            'Long Layered Extensions',
            'Wet Look Bob',
            'Braided Space Buns',
            'Slicked Back Bun with Face-Framing Pieces'
          ],
          products: [
            'Edge Control',
            'Heat Protectant Spray',
            'Shine Serum',
            'Strong Hold Gel',
            'Quality Hair Extensions'
          ],
          accessories: [
            'Silk Scrunchies',
            'Edge Brush',
            'Hair Ties',
            'Bobby Pins',
            'Hair Clips'
          ],
          tips: [
            'Master your baby hairs',
            'Invest in quality extensions',
            'Perfect the sleek look',
            'Learn to do intricate braids'
          ],
          inspiration: 'baddie%20hairstyles'
        };
      case 'cottagecore':
        return {
          styles: [
            'Romantic Braided Crown',
            'Soft Loose Waves',
            'Floral-Adorned Braids',
            'Natural Curls with Accessories',
            'Vintage-Inspired Pin Curls'
          ],
          products: [
            'Sea Salt Spray',
            'Light Hold Cream',
            'Natural Bristle Brush',
            'Heat Protectant',
            'Shine Serum'
          ],
          accessories: [
            'Fresh or Silk Flowers',
            'Delicate Hair Ribbons',
            'Pearl Hair Pins',
            'Vintage Hair Combs',
            'Lace Hair Bows'
          ],
          tips: [
            'Master different braid styles',
            'Use natural styling methods',
            'Incorporate flowers and ribbons',
            'Embrace your natural texture'
          ],
          inspiration: 'cottagecore%20hair'
        };
      case 'y2k':
        return {
          styles: [
            'Space Buns with Face-Framing Pieces',
            'Butterfly Clips Galore',
            'Spiky Buns',
            'Crimped Sections',
            'Colorful Hair Extensions'
          ],
          products: [
            'Hair Gems and Clips',
            'Crimping Iron',
            'Colorful Hair Extensions',
            'Glitter Hair Gel',
            'Fun Hair Accessories'
          ],
          accessories: [
            'Butterfly Hair Clips',
            'Colorful Snap Clips',
            'Scrunchies',
            'Mini Claw Clips',
            'Hair Gems'
          ],
          tips: [
            'Mix different hair accessories',
            'Don\'t be afraid of color',
            'Try fun updos',
            'Experiment with temporary dyes'
          ],
          inspiration: 'y2k%20hairstyles'
        };
      case 'dark-academia':
        return {
          styles: [
            'Low Chignon',
            'Vintage-Inspired Waves',
            'Sleek Low Bun',
            'Classic French Twist',
            'Sophisticated Ponytail'
          ],
          products: [
            'Matte Pomade',
            'Bobby Pins',
            'Light Hold Hairspray',
            'Silk Scrunchies',
            'Classic Hair Clips'
          ],
          accessories: [
            'Vintage Hair Combs',
            'Silk Hair Ribbons',
            'Classic Barrettes',
            'Pearl Hair Pins',
            'Velvet Hair Bows'
          ],
          tips: [
            'Keep styles polished and neat',
            'Use classic accessories',
            'Focus on timeless looks',
            'Master elegant updos'
          ],
          inspiration: 'dark%20academia%20hair'
        };
      case 'minimalist':
        return {
          styles: [
            'Sleek Straight Bob',
            'Clean Center Part',
            'Simple Low Ponytail',
            'Minimal Layers',
            'Classic Blunt Cut'
          ],
          products: [
            'Smoothing Serum',
            'Light Hold Hairspray',
            'Heat Protectant',
            'Dry Shampoo',
            'Shine Spray'
          ],
          accessories: [
            'Simple Hair Clips',
            'Basic Hair Ties',
            'Minimal Barrettes',
            'Thin Headbands',
            'Classic Bobby Pins'
          ],
          tips: [
            'Focus on healthy hair',
            'Keep styling minimal',
            'Use neutral accessories',
            'Maintain clean lines'
          ],
          inspiration: 'minimal%20hairstyles'
        };
      case 'coquette core':
        return {
          styles: [
            'Soft waves with bows',
            'Half-up half-down with ribbons',
            'Braided pigtails',
            'Vintage curls'
          ],
          products: [
            'Light hold hairspray',
            'Curl cream',
            'Shine serum'
          ],
          accessories: [
            'Silk ribbons',
            'Pearl hairpins',
            'Lace bows',
            'Velvet headbands'
          ],
          tips: [
            'Emphasize softness and femininity',
            'Use bows and ribbons generously',
            'Keep it delicate and romantic'
          ],
          inspiration: 'coquette%20core%20hair'
        };
      case 'grunge core':
        return {
          styles: [
            'Messy, textured shag',
            'Unkempt long layers',
            'Dark, moody colors (temporary or permanent)',
            'Choppy bob'
          ],
          products: [
            'Texturizing spray',
            'Matte pomade',
            'Dry shampoo (for volume and texture)'
          ],
          accessories: [
            'Beanies',
            'Bandanas',
            'Silver hair clips (minimal)'
          ],
          tips: [
            'Embrace imperfections and a lived-in look',
            'Darker hair colors often fit the aesthetic',
            'Focus on texture over polish'
          ],
          inspiration: 'grunge%20core%20hair'
        };
      case 'streetwear':
        return {
          styles: [
            'Sleek bun or ponytail',
            'Braids (cornrows, box braids)',
            'Fresh fade (for shorter hair)',
            'Bucket hat or cap hair'
          ],
          products: [
            'Strong hold gel',
            'Edge control',
            'Hair oil for shine (for braids)'
          ],
          accessories: [
            'Caps',
            'Bucket hats',
            'Headbands',
            'Statement hair ties'
          ],
          tips: [
            'Keep it clean and sharp or effortlessly cool',
            'Hats are a key accessory',
            'Protective styles like braids are common'
          ],
          inspiration: 'streetwear%20hair'
        };
      case 'mob wife':
        return {
          styles: [
            'Voluminous blowout',
            'Big, bouncy curls',
            'Sleek, dark bob',
            'Glamorous updo'
          ],
          products: [
            'Volumizing mousse',
            'Strong hold hairspray',
            'Large barrel curling iron',
            'Shine spray'
          ],
          accessories: [
            'Statement hair clips (gold, animal print)',
            'Silk headscarf (worn tied)',
            'Few, but impactful accessories'
          ],
          tips: [
            'More is more with volume',
            'Think expensive and luxurious',
            'Darker hair colors (brunette, black) are typical'
          ],
          inspiration: 'mob%20wife%20hair'
        };
      case 'old money':
        return {
          styles: [
            'Classic blowout (smooth and bouncy)',
            'Polished low ponytail or bun',
            'Timeless lob or bob',
            'Subtle layers'
          ],
          products: [
            'Smoothing cream',
            'Light hold hairspray',
            'Shine serum',
            'Quality hairbrush'
          ],
          accessories: [
            'Simple headbands (tortoiseshell, velvet)',
            'Understated hair clips',
            'Silk scrunchies (for at home)'
          ],
          tips: [
            'Focus on healthy, well-maintained hair',
            'Timeless and elegant styles',
            'Avoid overly trendy looks'
          ],
          inspiration: 'old%20money%20hair'
        };
      case 'alt': // Alternative
        return {
          styles: [
            'Brightly colored hair (neons, pastels)',
            'Split dye',
            'Shag mullets',
            'Experimental cuts'
          ],
          products: [
            'Color-safe shampoo and conditioner',
            'Temporary hair color sprays/chalks',
            'Texturizing products'
          ],
          accessories: [
            'Chain hair accessories',
            'Statement clips',
            'Bandanas'
          ],
          tips: [
            'Express individuality',
            'Bold colors and cuts are key',
            'Often overlaps with punk, goth, or emo elements'
          ],
          inspiration: 'alt%20hair'
        };
      case 'boho aesthetic': // Boho
        return {
          styles: [
            'Loose, beachy waves',
            'Messy braids with flowers or beads',
            'Half-up with twists',
            'Long, flowing hair'
          ],
          products: [
            'Sea salt spray',
            'Light leave-in conditioner',
            'Texturizing cream'
          ],
          accessories: [
            'Flower crowns',
            'Feather extensions (clip-in)',
            'Beaded hair ties',
            'Printed headscarves'
          ],
          tips: [
            'Effortless and natural-looking',
            'Incorporate natural elements',
            'Embrace texture'
          ],
          inspiration: 'boho%20hair'
        };
      case 'stockholm':
        return {
          styles: [
            'Effortless waves',
            'Sleek low bun',
            'Middle part, healthy-looking hair',
            'Minimalist short cuts'
          ],
          products: [
            'Nourishing hair oil',
            'Light texturizing spray',
            'Smoothing serum'
          ],
          accessories: [
            'Claw clips (minimalist design)',
            'Simple barrettes',
            'Understated headbands'
          ],
          tips: [
            'Focus on healthy, shiny hair',
            'Chic and effortless',
            'Neutral and natural hair colors'
          ],
          inspiration: 'stockholm%20hair'
        };
      case 'costal granddaughter': // Note: "Coastal" spelling
        return {
          styles: [
            'Natural waves (air-dried look)',
            'Easy low ponytail',
            'Slightly messy bun with a claw clip',
            'Hair tucked into a baseball cap'
          ],
          products: [
            'Leave-in conditioner',
            'Light hold mousse',
            'Sun protection spray for hair'
          ],
          accessories: [
            'Baseball caps',
            'Simple claw clips',
            'Canvas tote (as a general vibe accessory)'
          ],
          tips: [
            'Effortless, "just off the beach" look',
            'Comfort and practicality',
            'Natural hair texture is key'
          ],
          inspiration: 'coastal%20granddaughter%20hair'
        };
      case 'espresso':
        return {
          styles: [
            'Rich dark brown hair color',
            'Sleek and shiny straight hair',
            'Voluminous dark waves',
            'Deep side part'
          ],
          products: [
            'Color-enhancing shampoo for dark hair',
            'Shine serum',
            'Heat protectant',
            'Smoothing balm'
          ],
          accessories: [
            'Minimalist gold or silver clips',
            'Dark tortoiseshell accessories'
          ],
          tips: [
            'Focus on deep, rich brown tones',
            'Keep hair looking healthy and glossy',
            'Sophisticated and polished styles'
          ],
          inspiration: 'espresso%20hair%20color'
        };
      case 'bloquette':
        return {
          styles: [
            'Pigtails with ribbons',
            'Sporty ponytail with bows',
            'Half-up with athletic headband and bows',
            'Braids with ribbon woven in'
          ],
          products: [
            'Texturizing spray',
            'Light hold hairspray',
            'Shine spray'
          ],
          accessories: [
            'Ribbons (team colors or delicate)',
            'Athletic headbands',
            'Soccer-style hair ties',
            'Bows'
          ],
          tips: [
            'Mixes sporty elements (Blokecore) with feminine (Coquette)',
            'Think football jersey with bows in hair',
            'Playful and youthful'
          ],
          inspiration: 'bloquette%20hair'
        };
      case 'dark feminine':
        return {
          styles: [
            'Long, dark, flowing waves',
            'Sleek, sharp bob (often dark)',
            'Vintage-inspired updos with a mysterious touch',
            'Deep side parts'
          ],
          products: [
            'Shine serum',
            'Volumizing mousse for dark hair',
            'Smoothing cream'
          ],
          accessories: [
            'Dark velvet ribbons',
            'Antique-looking hair combs or pins',
            'Subtle dark floral accessories'
          ],
          tips: [
            'Embrace dark, rich hair colors',
            'Styles that are alluring and mysterious',
            'Can have vintage or gothic undertones'
          ],
          inspiration: 'dark%20feminine%20hair'
        };
      case 'light feminine':
        return {
          styles: [
            'Soft, angelic waves',
            'Flowy updos with pearls or delicate flowers',
            'Pastel hair highlights or full color',
            'Braids adorned with light ribbons'
          ],
          products: [
            'Light hold hairspray',
            'Shine-enhancing mist',
            'Curl cream for soft curls'
          ],
          accessories: [
            'Pearl hairpins',
            'Light silk or organza ribbons',
            'Delicate floral clips',
            'Baby\'s breath in hair'
          ],
          tips: [
            'Focus on soft textures and light colors',
            'Ethereal and dreamy feel',
            'Styles that are gentle and romantic'
          ],
          inspiration: 'light%20feminine%20hair'
        };
      case 'acubi':
        return {
          styles: [
            'Sleek, straight hair with minimal layers',
            'Blunt bob or lob',
            'Subtle face-framing pieces',
            'Often dark hair colors like black or deep brown'
          ],
          products: [
            'Smoothing serum',
            'Heat protectant spray',
            'Light hold hairspray for flyaways'
          ],
          accessories: [
            'Minimalist hair clips (silver or black)',
            'Thin headbands',
            'Claw clips for an effortless updo'
          ],
          tips: [
            'Focus on clean lines and a polished finish',
            'Understated and chic',
            'Healthy, glossy hair is key'
          ],
          inspiration: 'acubi%20hair'
        };
      case 'stargirl':
        return {
          styles: [
            'Sparkly hair tinsel',
            'Glitter roots or partings',
            'Space buns with glitter',
            'Pastel or brightly colored hair with shimmer'
          ],
          products: [
            'Hair glitter spray or gel',
            'Hair tinsel extensions',
            'Shine spray'
          ],
          accessories: [
            'Star-shaped hair clips',
            'Sparkly headbands',
            'Hair gems'
          ],
          tips: [
            'Embrace glitter and sparkle',
            'Whimsical and dreamy',
            'Can be colorful or metallic'
          ],
          inspiration: 'stargirl%20hair%20aesthetic'
        };
      case 'balletcore':
        return {
          styles: [
            'Sleek high bun or low bun',
            'Braided bun',
            'Hair pulled back tightly with a headband',
            'Soft, wispy tendrils around the face'
          ],
          products: [
            'Strong hold gel or hairspray',
            'Bobby pins',
            'Hair nets for buns',
            'Smoothing cream'
          ],
          accessories: [
            'Thin satin headbands',
            'Delicate hairpins (pearls, small bows)',
            'Ribbons to wrap buns'
          ],
          tips: [
            'Neatness and polish are essential',
            'Focus on elegant, classic ballet-inspired updos',
            'Keep it graceful and understated'
          ],
          inspiration: 'balletcore%20hair'
        };
      case 'mermaid core':
        return {
          styles: [
            'Long, flowing beach waves',
            'Fishtail braids',
            'Hair adorned with shells or pearls',
            'Subtle blue or green temporary highlights'
          ],
          products: [
            'Sea salt spray for texture',
            'Shine serum for a wet look',
            'Leave-in conditioner for soft waves'
          ],
          accessories: [
            'Seashell hair clips',
            'Pearl headbands or pins',
            'Starfish accessories',
            'Delicate chains woven into braids'
          ],
          tips: [
            'Emphasize long, flowing, and wavy hair',
            'Incorporate ocean-themed accessories',
            'Think ethereal and aquatic'
          ],
          inspiration: 'mermaidcore%20hair'
        };
      case 'gyaru':
        return {
          styles: [
            'Voluminous, often bleached or brightly colored hair',
            'Elaborate updos and curls (Sujimori)',
            'Extensions for length and volume',
            'Teased hair for height'
          ],
          products: [
            'Strong hold hairspray',
            'Volumizing mousse',
            'Hair bleach and vibrant dyes (professional help recommended)',
            'Hair extensions'
          ],
          accessories: [
            'Large, colorful bows and flowers',
            'Statement hair clips',
            'Hair accessories with glitter and charms'
          ],
          tips: [
            'Volume is key; don\'t be afraid to tease',
            'Bright and bold colors are common',
            'Often involves elaborate styling and accessories'
          ],
          inspiration: 'gyaru%20hair'
        };
      case 'arizona style': // Assuming a desert/boho/western mix
        return {
          styles: [
            'Loose, sun-kissed waves',
            'Braids with turquoise or silver accessories',
            'Hair worn under a wide-brimmed hat',
            'Messy bun with bandana'
          ],
          products: [
            'Texturizing spray',
            'Dry shampoo for volume',
            'UV protection spray for hair'
          ],
          accessories: [
            'Wide-brimmed felt or straw hats',
            'Bandanas',
            'Turquoise or silver hair clips/pins',
            'Leather hair ties'
          ],
          tips: [
            'Effortless, slightly rugged but chic',
            'Incorporate Southwestern-inspired accessories',
            'Protect hair from the sun'
          ],
          inspiration: 'arizona%20western%20hair'
        };
      case 'dark cottagecore':
        return {
          styles: [
            'Messy braids with dark ribbons or dried flowers',
            'Loose, textured waves with a slightly unkempt look',
            'Half-up styles with antique-looking clips',
            'Darker natural hair colors, or deep jewel tones'
          ],
          products: [
            'Texturizing spray',
            'Matte pomade',
            'Dry shampoo'
          ],
          accessories: [
            'Dark velvet or lace ribbons',
            'Dried flowers or herbs woven into hair',
            'Antique or vintage-style hair combs and pins',
            'Twig or branch-like accessories (subtly)'
          ],
          tips: [
            'Similar to cottagecore but with a moodier, more mysterious vibe',
            'Embrace natural textures with a slightly wild feel',
            'Darker color palettes for accessories'
          ],
          inspiration: 'dark%20cottagecore%20hair'
        };
      case 'dark coquette':
        return {
          styles: [
            'Soft waves with black or deep red velvet bows',
            'Vintage-inspired curls with a darker twist',
            'Sleek hair with a single, impactful dark bow',
            'Braided details with dark ribbons'
          ],
          products: [
            'Shine serum',
            'Light hold hairspray',
            'Curl cream'
          ],
          accessories: [
            'Black or burgundy velvet/satin ribbons',
            'Dark pearl hairpins',
            'Lace bows in dark colors',
            'Cameo hair clips'
          ],
          tips: [
            'Combines the femininity of coquette with darker, more mysterious elements',
            'Focus on rich textures like velvet and satin',
            'Elegant but with a hint of drama'
          ],
          inspiration: 'dark%20coquette%20hair'
        };
      case 'rockstar girlfriend style':
        return {
          styles: [
            'Effortlessly messy, textured hair (bedhead look)',
            'Shag cuts with layers',
            'Lived-in waves or curls',
            'Sometimes darker or slightly faded/unconventional colors'
          ],
          products: [
            'Texturizing spray or sea salt spray',
            'Dry shampoo for volume and grit',
            'Light hold mousse or pomade'
          ],
          accessories: [
            'Bandanas',
            '(Optional) A beanie or fedora',
            'Minimal, edgy hair clips if any'
          ],
          tips: [
            'The key is to look effortlessly cool and slightly undone',
            'Layers and texture are important',
            'Avoid overly polished or perfect styles'
          ],
          inspiration: 'rockstar%20girlfriend%20hair'
        };
      case 'indie':
        return {
          styles: [
            'Natural texture, often air-dried',
            'Shag haircuts or curtain bangs',
            'Messy buns or loose ponytails',
            'Subtle, natural-looking highlights or unique color accents'
          ],
          products: [
            'Light leave-in conditioner',
            'Texturizing spray (optional)',
            'Dry shampoo'
          ],
          accessories: [
            'Headbands (fabric, often patterned)',
            'Unique hair clips or barrettes (vintage, handmade)',
            'Beanies'
          ],
          tips: [
            'Focus on individuality and a less mainstream look',
            'Embrace natural hair texture',
            'Often incorporates vintage or quirky elements'
          ],
          inspiration: 'indie%20hair'
        };
      case 'preppy (old fashioned)':
        return {
          styles: [
            'Polished blowout with a flip or curl at the ends',
            'Headband with hair smoothed back',
            'Classic ponytail with a ribbon',
            'Pageboy or bouffant styles (for a retro take)'
          ],
          products: [
            'Setting lotion or mousse',
            'Hairspray for hold',
            'Round brush for blowouts'
          ],
          accessories: [
            'Wide headbands (fabric, plastic, often with bows)',
            'Ribbons for ponytails',
            'Barrettes with classic designs (e.g., tortoiseshell)'
          ],
          tips: [
            'Neat, tidy, and classic',
            'Often involves coiffed or set styles',
            'Think mid-20th century collegiate'
          ],
          inspiration: 'classic%20preppy%20hair'
        };
      case 'preppy (new fashion)':
        return {
          styles: [
            'Sleek, straight hair or soft, polished waves',
            'Low ponytail or bun with a center part',
            'Hair tucked behind ears with a statement headband',
            'Healthy, glossy finish'
          ],
          products: [
            'Smoothing serum',
            'Light hold hairspray',
            'Heat protectant'
          ],
          accessories: [
            'Statement headbands (knotted, embellished)',
            'Claw clips for an effortless but chic updo',
            'Silk scrunchies',
            'Simple, elegant barrettes'
          ],
          tips: [
            'Modern take on preppy: clean, polished, and sophisticated',
            'Focus on healthy hair and subtle styling',
            'Accessories are often key to the modern preppy look'
          ],
          inspiration: 'modern%20preppy%20hair'
        };
      case "80s": 
      case "80's":
        return {
          styles: [
            'Big, teased hair (perms were popular)',
            'Side ponytails',
            'Crimped hair',
            'Mullets (for the bold)',
            'Banana clips'
          ],
          products: [
            'Strong hold hairspray (lots of it!)',
            'Mousse for volume',
            'Teasing comb',
            'Crimping iron'
          ],
          accessories: [
            'Scrunchies (neon, velvet)',
            'Banana clips',
            'Large plastic earrings that match hair accessories'
          ],
          tips: [
            'Volume is the goal: tease, tease, tease!',
            'Don\'t be afraid of bold, even asymmetrical styles',
            'Bright colors were in for makeup and clothes, hair often matched this energy'
          ],
          inspiration: '80s%20hair'
        };
      case "90s":
      case "90's":
        return {
          styles: [
            '"The Rachel" haircut',
            'Sleek, straight hair (use a flat iron)',
            'Butterfly clips',
            'Space buns or pigtails',
            'Chunky highlights'
          ],
          products: [
            'Flat iron',
            'Shine serum',
            'Light hairspray',
            'Temporary color hair mascara'
          ],
          accessories: [
            'Butterfly clips',
            'Snap clips',
            'Scrunchies',
            'Bandanas',
            'Claw clips'
          ],
          tips: [
            'Mix of sleek styles and playful accessories',
            'Center parts were common',
            'Frosted tips or chunky highlights were trendy'
          ],
          inspiration: '90s%20hair'
        };
      case "60s":
      case "60's":
        return {
          styles: [
            'Beehive updo',
            'Flipped bob (Jackie Kennedy style)',
            'Long, straight hair with a center part (hippie influence)',
            'Mod short haircuts (e.g., Twiggy)'
          ],
          products: [
            'Hairspray for hold (especially for beehives)',
            'Teasing comb',
            'Setting lotion',
            'Hair rollers'
          ],
          accessories: [
            'Wide headbands',
            'Hair scarves',
            'Ribbons',
            'Bobby pins to secure updos'
          ],
          tips: [
            'Volume on the crown was very popular',
            'Geometric shapes for mod looks',
            'Smooth and polished or long and natural, depending on the sub-style'
          ],
          inspiration: '60s%20hair'
        };
      case "70s":
      case "70's":
        return {
          styles: [
            'Farrah Fawcett feathered layers',
            'Long, straight hair with a center part',
            'Shag haircuts',
            'Afros'
          ],
          products: [
            'Volumizing mousse',
            'Large barrel curling iron or hot rollers (for feathered look)',
            'Hairspray'
          ],
          accessories: [
            'Hair scarves (worn as headbands or tied around ponytails)',
            'Natural/minimal accessories'
          ],
          tips: [
            'Embrace natural texture or create soft, flowing layers',
            'Movement and volume were key',
            'Center parts remained popular'
          ],
          inspiration: '70s%20hair'
        };
      case "50s":
      case "50's":
        return {
          styles: [
            'Pin curls and victory rolls',
            'Poodle cuts (short, curly)',
            'Ponytails (often curled and worn high)',
            'Rolled bangs'
          ],
          products: [
            'Setting lotion',
            'Pomade or hair wax for hold and shine',
            'Hairspray',
            'Curlers (pin curls or rollers)'
          ],
          accessories: [
            'Hair scarves (tied around head or ponytail)',
            'Decorative hair combs',
            'Flowers (e.g., a single gardenia)'
          ],
          tips: [
            'Structured, set hairstyles were the norm',
            'Curls were very popular, from soft waves to tight poodle curls',
            'Accessorizing was common'
          ],
          inspiration: '50s%20hair'
        };
      case "30s":
      case "30's":
        return {
          styles: [
            'Marcel waves',
            'Soft, sculpted waves close to the head',
            'Elegant updos with waves and curls',
            'Often shorter (chin to shoulder length)'
          ],
          products: [
            'Setting lotion',
            'Wave clamps or finger waving techniques',
            'Pomade for shine and hold'
          ],
          accessories: [
            'Art Deco style hair clips and combs',
            'Jeweled barrettes',
            'Elegant headbands'
          ],
          tips: [
            'Glamorous and sophisticated waves were iconic',
            'Hair was generally kept neat and close to the head',
            'Shine was important'
          ],
          inspiration: '30s%20hair'
        };
      case "20s":
      case "20's":
        return {
          styles: [
            'Sharp bob (Eton crop, shingle bob)',
            'Finger waves',
            'Headbands worn across the forehead',
            'Kiss curls'
          ],
          products: [
            'Setting lotion or gel for finger waves',
            'Pomade for sleekness',
            'Bobby pins'
          ],
          accessories: [
            'Flapper headbands (beaded, feathered)',
            'Jeweled hair clips and barrettes',
            'Cloche hats (which dictated shorter hairstyles)'
          ],
          tips: [
            'Short, boyish cuts were revolutionary and very fashionable',
            'Sleek, close-to-the-head styles were popular',
            'Decorative headbands were a signature accessory'
          ],
          inspiration: '20s%20flapper%20hair'
        };
      case 'clean girl':
        return {
          styles: [
            'Sleek low bun or ponytail (middle or side part)',
            'Hair smoothed back with no flyaways',
            'Claw clip updo (neat and tidy)',
            'Healthy, shiny, straight or softly waved hair'
          ],
          products: [
            'Smoothing serum or oil',
            'Light hold gel or hair wax stick for flyaways',
            'Deep conditioner for healthy hair',
            'Heat protectant'
          ],
          accessories: [
            'Minimalist claw clips (neutral colors)',
            'Simple hair ties',
            'Understated headbands if any'
          ],
          tips: [
            'Emphasis on healthy, well-maintained hair',
            'Effortless but polished look',
            'Minimalism and simplicity are key',
            'No flyaways - very sleek and put-together'
          ],
          inspiration: 'clean%20girl%20hair'
        };
      default: // Classic Hair Recommendations
        return {
          styles: [
            'Classic Bob',
            'Long Layers',
            'Side-Swept Bangs',
            'Sleek Straight',
            'Natural Waves'
          ],
          products: [
            'Heat Protectant',
            'Volumizing Mousse',
            'Light Hold Hairspray',
            'Shine Serum',
            'Dry Shampoo'
          ],
          accessories: [
            'Classic Hair Clips',
            'Simple Hair Ties',
            'Basic Bobby Pins',
            'Neutral Headbands',
            'Minimal Scrunchies'
          ],
          tips: [
            'Focus on healthy hair care',
            'Keep styles polished',
            'Use heat protection',
            'Regular trims'
          ],
          inspiration: 'classic%20hairstyles'
        };
    }
  }
}