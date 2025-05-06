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
    
    // Check if it's a baddie-style request
    if (lowerMessage.includes('baddie')) {
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
    }
    
    // Default jewelry response
    return `Hey girly! 💎 Let me help you build the perfect jewelry collection in ${recommendedMetals.join('/')}!\n\n` +
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

  private getFallbackHairResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    const seasonalColor = this.context.userProfile?.seasonalColor || '';
    const faceShape = this.context.userProfile?.faceShape || '';
    const stylePreferences = this.context.userProfile?.stylePreferences || [];
    
    // Determine aesthetic from message or preferences
    let aesthetic = 'classic';
    if (lowerMessage.includes('1930') || lowerMessage.includes('30s')) {
      aesthetic = '30s';
    } else if (lowerMessage.includes('cottagecore')) {
      aesthetic = 'cottagecore';
    } else if (lowerMessage.includes('y2k') || lowerMessage.includes('2000s') || lowerMessage.includes('retro')) {
      aesthetic = 'y2k';
    } else if (lowerMessage.includes('baddie')) {
      aesthetic = 'baddie';
    } else if (lowerMessage.includes('dark academia')) {
      aesthetic = 'dark-academia';
    } else if (lowerMessage.includes('minimalist')) {
      aesthetic = 'minimalist';
    } else if (stylePreferences.length > 0) {
      aesthetic = stylePreferences[0];
    }

    const hairRecs = this.getHairstylesByAesthetic(aesthetic);

    return `Hey there! 💁‍♀️ Let me help you create some amazing ${aesthetic} hairstyles!\n\n` +
      `### ${aesthetic.charAt(0).toUpperCase() + aesthetic.slice(1)} Hairstyle Ideas:\n` +
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
      `• [Pinterest ${aesthetic} Hair](https://www.pinterest.com/search/pins/?q=${hairRecs.inspiration})\n` +
      `• [Instagram ${aesthetic} Hair](https://www.instagram.com/explore/tags/${aesthetic.replace('-', '')}hair/)\n\n` +
      `💡 **Pro Tip:** The key to ${aesthetic} hairstyles is embracing the aesthetic's unique charm. Have fun experimenting with different styles and accessories!`;
  }

  private formatPrompt(messages: ChatMessage[]): string {
    // Keep only the last message for context to reduce complexity
    const lastMessage = messages[messages.length - 1];
    const lowerMessage = lastMessage.content.toLowerCase();
    
    // Check for outfit-related queries first
    if (lowerMessage.includes('outfit') || lowerMessage.includes('clothes') || 
        lowerMessage.includes('wear') || lowerMessage.includes('dress') || 
        lowerMessage.includes('style') || lowerMessage.includes('fashion') ||
        lowerMessage.includes('mall') || lowerMessage.includes('shopping') || 
        lowerMessage.includes('baddie') || lowerMessage.includes('going to') || 
        lowerMessage.includes('what to wear') || lowerMessage.includes('y2k') ||
        lowerMessage.includes('cottagecore') || lowerMessage.includes('retro') ||
        lowerMessage.includes('dark academia') || lowerMessage.includes('minimalist') ||
        lowerMessage.includes('inspo') || lowerMessage.includes('1930') ||
        lowerMessage.includes('30s')) {
      
      // Determine aesthetic from message
      let aesthetic = 'classic';
      if (lowerMessage.includes('1930') || lowerMessage.includes('30s')) {
        aesthetic = '30s';
      } else if (lowerMessage.includes('baddie')) {
        aesthetic = 'baddie';
      } else if (lowerMessage.includes('y2k')) {
        aesthetic = 'y2k';
      } else if (lowerMessage.includes('cottagecore')) {
        aesthetic = 'cottagecore';
      } else if (lowerMessage.includes('dark academia')) {
        aesthetic = 'dark-academia';
      } else if (lowerMessage.includes('minimalist')) {
        aesthetic = 'minimalist';
      }
      
      return this.getFallbackOutfitResponse(lastMessage.content);
    }
    
    // Then check for jewelry-related queries
    if (lowerMessage.includes('jewelry') || lowerMessage.includes('jewellery') || 
        lowerMessage.includes('necklace') || lowerMessage.includes('bracelet') || 
        lowerMessage.includes('earrings') || lowerMessage.includes('rings') ||
        lowerMessage.includes('accessories')) {
      return this.getFallbackJewelryResponse(lastMessage.content);
    }
    
    // Then check for makeup queries
    if (lowerMessage.includes('makeup') || lowerMessage.includes('glam') || lowerMessage.includes('beauty')) {
      if (lowerMessage.includes('30s') || lowerMessage.includes('1930')) {
        return `Hey girly! 💄 Let me help you create an authentic 1930s makeup look!\n\n` +
          `The 1930s were all about Hollywood glamour and sophisticated beauty. Here's your step-by-step guide:\n\n` +
          `### 1. Face Base\n` +
          `• Start with a matte powder foundation for that signature porcelain finish\n` +
          `• Apply subtle rosy cream blush to the apples of cheeks\n` +
          `• Keep the complexion matte and velvety\n` +
          `• Use powder to set everything in place\n\n` +
          `### 2. Eyes\n` +
          `• Create thin, rounded eyebrows (the defining feature of 1930s makeup!)\n` +
          `• Apply grey or brown cream eyeshadow, blending upward\n` +
          `• Use Vaseline or cream-based products for authentic shine\n` +
          `• Apply mascara to both top and bottom lashes\n` +
          `• Optional: thin line of eyeliner close to lashes\n\n` +
          `### 3. Lips\n` +
          `• Line lips in a rounded, rosebud shape\n` +
          `• Create a defined cupid's bow (very important for 1930s!)\n` +
          `• Fill with dark red or burgundy lipstick\n` +
          `• Keep the finish matte\n\n` +
          `### Essential Products\n` +
          `• Matte powder foundation\n` +
          `• Cream-based eyeshadows\n` +
          `• Dark red/burgundy lipstick\n` +
          `• Natural-bristle makeup brushes\n` +
          `• Setting powder\n\n` +
          `### Pro Tips\n` +
          `✨ The thin, rounded brows were THE defining feature of 1930s makeup\n` +
          `✨ Focus on creating a matte, porcelain-like complexion\n` +
          `✨ The cupid's bow lip shape is crucial for authenticity\n` +
          `✨ Use cream-based products for that genuine 1930s look\n\n` +
          `### Get Inspired\n` +
          `Take inspiration from 1930s beauty icons:\n` +
          `• Jean Harlow\n` +
          `• Greta Garbo\n` +
          `• Marlene Dietrich\n` +
          `• Joan Crawford\n\n` +
          `Check out these vintage beauty resources:\n` +
          `[1930s Makeup Tutorials](https://www.youtube.com/results?search_query=1930s+vintage+makeup+tutorial)\n` +
          `[Old Hollywood Glamour](https://www.youtube.com/results?search_query=old+hollywood+glamour+makeup)\n\n` +
          `Remember, 1930s makeup was all about creating a sophisticated, glamorous look with a focus on thin brows, defined lips, and a flawless complexion! 💋✨`;
      }
      
      const guideContent = this.context.glamGuide;
      if (guideContent) {
    let prompt = '';
    
    // Add minimal system context
    const systemMessage = messages.find(msg => msg.role === 'system');
    if (systemMessage) {
      prompt += `You are a fashion advisor. ${systemMessage.content.split('\n')[0]}\n\n`;
        }

        // Add context based on the message type
        if (lowerMessage.includes('natural')) {
          prompt += `For a natural glam look, focus on these sections:\n`;
          prompt += `1. Prep Steps (1-4): ${JSON.stringify(guideContent.steps.prep)}\n`;
          prompt += `2. Base Steps (5-9): ${JSON.stringify(guideContent.steps.base)}\n`;
        } else {
          // Include all sections for full glam
          Object.entries(guideContent.steps).forEach(([section, content]) => {
            prompt += `${section}: ${JSON.stringify(content)}\n`;
          });
        }
        
        prompt += `\nInspiration Links: ${JSON.stringify(guideContent.inspiration)}\n\n`;
      }
    }
    
    // Check for hair-related keywords with more variations
    if (lowerMessage.includes('hair') || lowerMessage.includes('hairstyle') || 
        lowerMessage.includes('haircut') || lowerMessage.includes('bangs') ||
        lowerMessage.includes('color') || lowerMessage.includes('dye') ||
        lowerMessage.includes('style my hair') || lowerMessage.includes('cut') ||
        lowerMessage.includes('retro hair') || lowerMessage.includes('y2k hair') ||
        (lowerMessage.includes('y2k') && !lowerMessage.includes('outfit')) ||
        (lowerMessage.includes('retro') && !lowerMessage.includes('outfit')) ||
        (lowerMessage.includes('1930') && !lowerMessage.includes('outfit')) ||
        (lowerMessage.includes('30s') && !lowerMessage.includes('outfit'))) {
      console.log('Hair query detected, returning hair response');
      return this.getFallbackHairResponse(lastMessage.content);
    }
    
    // Add just the last message, removing any role prefixes
    if (lastMessage) {
      const content = lastMessage.content.replace(/^(Human:|Assistant:)\s*/i, '');
      return `Human: ${content}\n`;
    }
    
    return '';
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

  private getFallbackOutfitResponse(userMessage: string): string {
    const lowerMessage = userMessage.toLowerCase();
    const stylePreferences = this.context.userProfile?.stylePreferences || [];
    
    // Determine aesthetic from message or preferences
    let aesthetic = 'classic';
    if (lowerMessage.includes('1930') || lowerMessage.includes('30s')) aesthetic = '30s';
    else if (lowerMessage.includes('baddie')) aesthetic = 'baddie';
    else if (lowerMessage.includes('y2k') || lowerMessage.includes('retro')) aesthetic = 'y2k';
    else if (lowerMessage.includes('cottagecore')) aesthetic = 'cottagecore';
    else if (lowerMessage.includes('dark academia')) aesthetic = 'dark-academia';
    else if (lowerMessage.includes('minimalist')) aesthetic = 'minimalist';
    else if (stylePreferences.length > 0) aesthetic = stylePreferences[0];

    const outfitRecs = this.getOutfitsByAesthetic(aesthetic);

    return `Hey girly! 👗 Let me help you create the perfect ${aesthetic === '30s' ? '1930s' : aesthetic} look!\n\n` +
      `Here's a curated guide to achieve that perfect ${aesthetic === '30s' ? '1930s glamour' : aesthetic} style:\n\n` +
      `### Signature Pieces:\n\n` +
      `#### Tops:\n` +
      outfitRecs.tops.map(top => `• ${top}\n`).join('') +
      `\n#### Bottoms:\n` +
      outfitRecs.bottoms.map(bottom => `• ${bottom}\n`).join('') +
      `\n#### Shoes:\n` +
      outfitRecs.shoes.map(shoe => `• ${shoe}\n`).join('') +
      `\n#### Layers:\n` +
      outfitRecs.layers.map(layer => `• ${layer}\n`).join('') +
      `\n#### Essential Accessories:\n` +
      outfitRecs.accessories.map(acc => `• ${acc}\n`).join('') +
      `\n### Styling Tips:\n` +
      outfitRecs.tips.map(tip => `✨ ${tip}\n`).join('') +
      `\n### Get More Inspiration:\n` +
      `• [Pinterest ${aesthetic === '30s' ? '1930s Fashion' : outfitRecs.inspiration.replace(/%20/g, ' ')}](https://www.pinterest.com/search/pins/?q=${outfitRecs.inspiration})\n` +
      `• [Instagram ${aesthetic === '30s' ? '1930s Fashion' : outfitRecs.inspiration.replace(/%20/g, ' ')}](https://www.instagram.com/explore/tags/${outfitRecs.inspiration.replace(/%20/g, '')})\n\n` +
      `💡 Pro Tip: ${aesthetic === '30s' ? 'The 1930s were all about feminine elegance and Hollywood glamour. Focus on bias-cut pieces, elegant draping, and sophisticated accessories!' : 'Mix and match these pieces to create multiple outfits! The key is to have versatile pieces that capture the vibe while staying true to your personal style.'}`;
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
    
    // Check for outfit-related keywords first with more variations
    if (lowerMessage.includes('outfit') || lowerMessage.includes('clothes') || 
        lowerMessage.includes('wear') || lowerMessage.includes('dress') || 
        lowerMessage.includes('style') || lowerMessage.includes('fashion') ||
        lowerMessage.includes('mall') || lowerMessage.includes('shopping') || 
        lowerMessage.includes('baddie') || lowerMessage.includes('going to') || 
        lowerMessage.includes('what to wear') || lowerMessage.includes('y2k') ||
        lowerMessage.includes('cottagecore') || lowerMessage.includes('retro') ||
        lowerMessage.includes('dark academia') || lowerMessage.includes('minimalist') ||
        lowerMessage.includes('inspo') || lowerMessage.includes('1930') ||
        lowerMessage.includes('30s')) {
      console.log('Outfit query detected, returning outfit response');
      
      // Determine aesthetic from message
      let aesthetic = 'classic';
      if (lowerMessage.includes('1930') || lowerMessage.includes('30s')) {
        aesthetic = '30s';
      } else if (lowerMessage.includes('baddie')) {
        aesthetic = 'baddie';
      } else if (lowerMessage.includes('y2k')) {
        aesthetic = 'y2k';
      } else if (lowerMessage.includes('cottagecore')) {
        aesthetic = 'cottagecore';
      } else if (lowerMessage.includes('dark academia')) {
        aesthetic = 'dark-academia';
      } else if (lowerMessage.includes('minimalist')) {
        aesthetic = 'minimalist';
      }
      
      return this.getFallbackOutfitResponse(userMessage);
    }
    
    // Check for hair-related keywords with more variations
    if (lowerMessage.includes('hair') || lowerMessage.includes('hairstyle') || 
        lowerMessage.includes('haircut') || lowerMessage.includes('bangs') ||
        lowerMessage.includes('color') || lowerMessage.includes('dye') ||
        lowerMessage.includes('style my hair') || lowerMessage.includes('cut') ||
        lowerMessage.includes('retro hair') || lowerMessage.includes('y2k hair') ||
        (lowerMessage.includes('y2k') && !lowerMessage.includes('outfit')) ||
        (lowerMessage.includes('retro') && !lowerMessage.includes('outfit')) ||
        (lowerMessage.includes('1930') && !lowerMessage.includes('outfit')) ||
        (lowerMessage.includes('30s') && !lowerMessage.includes('outfit'))) {
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
      case 'coquette':
        return {
          tops: [
            'Bow-adorned blouses',
            'Lace-trim tops',
            'Peter Pan collar shirts',
            'Heart motif sweaters',
            'Ruffle detail tops'
          ],
          bottoms: [
            'Pleated mini skirts',
            'Tennis skirts',
            'High-waisted shorts',
            'A-line skirts',
            'Lace-trim skirts'
          ],
          shoes: [
            'Mary Jane shoes',
            'Platform mary janes',
            'Ballet flats',
            'Bow detail heels',
            'Lace-up boots'
          ],
          layers: [
            'Bow cardigans',
            'Lace trim jackets',
            'Heart pattern coats',
            'Ruffle detail blazers',
            'Cropped cardigans'
          ],
          accessories: [
            'Pearl hair clips',
            'Ribbon headbands',
            'Heart-shaped bags',
            'Lace socks',
            'Bow chokers'
          ],
          tips: [
            'Layer delicate pieces',
            'Mix different bow details',
            'Add pearl accessories',
            'Incorporate heart motifs',
            'Use pastel colors'
          ],
          inspiration: 'coquette%20fashion'
        };

      case 'grunge':
        return {
          tops: [
            'Band t-shirts',
            'Oversized flannels',
            'Distressed sweaters',
            'Mesh tops',
            'Graphic tees'
          ],
          bottoms: [
            'Ripped jeans',
            'Plaid skirts',
            'Cargo pants',
            'Distressed denim',
            'Leather pants'
          ],
          shoes: [
            'Combat boots',
            'Platform boots',
            'Chunky sneakers',
            'Doc Martens',
            'Platform creepers'
          ],
          layers: [
            'Leather jackets',
            'Oversized denim jackets',
            'Flannel shirts',
            'Distressed cardigans',
            'Band hoodies'
          ],
          accessories: [
            'Chokers',
            'Chain necklaces',
            'Studded belts',
            'Fishnet tights',
            'Beanie hats'
          ],
          tips: [
            'Mix patterns and textures',
            'Layer oversized pieces',
            'Add edgy accessories',
            'Incorporate dark elements',
            'Don\'t be too polished'
          ],
          inspiration: 'grunge%20style'
        };

      case 'mob-wife':
        return {
          tops: [
            'Silk blouses',
            'Fitted bodysuits',
            'Animal print tops',
            'Off-shoulder tops',
            'Designer logo shirts'
          ],
          bottoms: [
            'Leather pants',
            'Fitted skirts',
            'Animal print pants',
            'High-slit dresses',
            'Bodycon dresses'
          ],
          shoes: [
            'Stiletto heels',
            'Designer boots',
            'Platform pumps',
            'Thigh-high boots',
            'Animal print heels'
          ],
          layers: [
            'Fur coats',
            'Leather jackets',
            'Animal print coats',
            'Designer blazers',
            'Sequin jackets'
          ],
          accessories: [
            'Gold chains',
            'Statement rings',
            'Designer bags',
            'Large sunglasses',
            'Diamond jewelry'
          ],
          tips: [
            'Layer gold jewelry',
            'Mix animal prints',
            'Add statement pieces',
            'Choose luxe fabrics',
            'Don\'t be subtle'
          ],
          inspiration: 'mob%20wife%20aesthetic'
        };

      case 'old-money':
        return {
          tops: [
            'Cashmere sweaters',
            'Oxford shirts',
            'Tennis polos',
            'Silk blouses',
            'Turtlenecks'
          ],
          bottoms: [
            'Tailored trousers',
            'Tennis skirts',
            'Wool skirts',
            'Khaki pants',
            'Pleated skirts'
          ],
          shoes: [
            'Loafers',
            'Tennis shoes',
            'Riding boots',
            'Ballet flats',
            'Classic pumps'
          ],
          layers: [
            'Tweed blazers',
            'Cashmere coats',
            'Tennis sweaters',
            'Equestrian jackets',
            'Wool coats'
          ],
          accessories: [
            'Pearl necklaces',
            'Tennis bracelets',
            'Silk scarves',
            'Leather bags',
            'Gold watches'
          ],
          tips: [
            'Invest in quality basics',
            'Choose classic patterns',
            'Stick to neutral colors',
            'Focus on tailoring',
            'Keep jewelry minimal'
          ],
          inspiration: 'old%20money%20style'
        };

      // Add more cases for other aesthetics...
      case 'alt':
        return {
          tops: [
            'Band tees',
            'Mesh tops',
            'Crop tops',
            'Graphic tanks',
            'Corsets'
          ],
          bottoms: [
            'Ripped jeans',
            'Cargo pants',
            'Chain pants',
            'Pleated skirts',
            'Platform boots'
          ],
          shoes: [
            'Platform boots',
            'Chunky sneakers',
            'Combat boots',
            'Creepers',
            'Platform sandals'
          ],
          layers: [
            'Leather jackets',
            'Mesh overlays',
            'Oversized hoodies',
            'Studded vests',
            'Fishnet tops'
          ],
          accessories: [
            'Chain necklaces',
            'Spiked chokers',
            'Platform boots',
            'Fingerless gloves',
            'Statement belts'
          ],
          tips: [
            'Mix textures',
            'Layer chains',
            'Add edgy details',
            'Incorporate platforms',
            'Be bold with accessories'
          ],
          inspiration: 'alternative%20fashion'
        };

      // Continue with more aesthetics...
      case 'boho':
        return {
          tops: [
            'Flowy blouses',
            'Crochet tops',
            'Off-shoulder tops',
            'Embroidered tunics',
            'Peasant tops'
          ],
          bottoms: [
            'Maxi skirts',
            'Flared jeans',
            'Palazzo pants',
            'Printed shorts',
            'Wrap skirts'
          ],
          shoes: [
            'Ankle boots',
            'Gladiator sandals',
            'Espadrilles',
            'Moccasins',
            'Fringe boots'
          ],
          layers: [
            'Kimono jackets',
            'Fringe vests',
            'Crochet cardigans',
            'Embroidered jackets',
            'Poncho wraps'
          ],
          accessories: [
            'Statement necklaces',
            'Layered bracelets',
            'Fringe bags',
            'Wide-brim hats',
            'Feather earrings'
          ],
          tips: [
            'Layer mixed prints',
            'Add natural textures',
            'Mix earthy tones',
            'Include handcrafted pieces',
            'Layer jewelry'
          ],
          inspiration: 'bohemian%20style'
        };

      case '30s':
        return {
          tops: [
            'Bias-cut blouses',
            'Puff sleeve tops',
            'Fitted knit sweaters',
            'Ruched detail tops',
            'High-neck blouses'
          ],
          bottoms: [
            'High-waisted wide-leg trousers',
            'Midi skirts with pleats',
            'Bias-cut silk skirts',
            'A-line tea-length skirts',
            'Evening gowns with draping'
          ],
          shoes: [
            'T-strap heels',
            'Oxford pumps',
            'Round-toe leather shoes',
            'Mary Jane heels',
            'Evening dance shoes'
          ],
          layers: [
            'Fur-trimmed coats',
            'Fitted suit jackets',
            'Long evening coats',
            'Bolero jackets',
            'Structured wool coats'
          ],
          accessories: [
            'Long pearl necklaces',
            'Art deco brooches',
            'Cloche hats',
            'Long evening gloves',
            'Small structured handbags'
          ],
          tips: [
            'Focus on feminine silhouettes',
            'Embrace bias-cut fabrics',
            'Add art deco accessories',
            'Choose rich, luxurious materials',
            'Layer delicate jewelry'
          ],
          inspiration: '1930s%20fashion'
        };

      // Keep the existing cases (baddie, y2k, cottagecore, etc.)
      
      default:
        return {
          tops: [
            'Classic white tee',
            'Button-down shirt',
            'Basic tank top',
            'Fitted sweater',
            'Simple blouse'
          ],
          bottoms: [
            'Well-fitted jeans',
            'Black trousers',
            'Pencil skirt',
            'Tailored shorts',
            'A-line skirt'
          ],
          shoes: [
            'Classic sneakers',
            'Black pumps',
            'Ankle boots',
            'Ballet flats',
            'Loafers'
          ],
          layers: [
            'Blazer',
            'Cardigan',
            'Denim jacket',
            'Trench coat',
            'Light sweater'
          ],
          accessories: [
            'Leather bag',
            'Simple necklace',
            'Classic watch',
            'Leather belt',
            'Stud earrings'
          ],
          tips: [
            'Invest in quality basics',
            'Focus on fit',
            'Keep it simple',
            'Choose versatile pieces',
            'Build a capsule wardrobe'
          ],
          inspiration: 'classic%20style'
        };
    }
  }

  private formatStyleRecommendations(recommendations: OutfitRecommendations): string {
    let response = '### Outfit Recommendations:\n\n';

    response += '#### Tops:\n';
    recommendations.tops.forEach(top => {
      response += `• ${top}\n`;
    });

    response += '\n#### Bottoms:\n';
    recommendations.bottoms.forEach(bottom => {
      response += `• ${bottom}\n`;
    });

    response += '\n#### Accessories:\n';
    recommendations.accessories.forEach(accessory => {
      response += `• ${accessory}\n`;
    });

    response += '\n#### Shoes:\n';
    recommendations.shoes.forEach(shoe => {
      response += `• ${shoe}\n`;
    });

    response += '\n#### Layers:\n';
    recommendations.layers.forEach(layer => {
      response += `• ${layer}\n`;
    });

    response += '\n#### Styling Tips:\n';
    recommendations.tips.forEach(tip => {
      response += `• ${tip}\n`;
    });

    response += `\n### Get More Inspiration:\n`;
    response += `[Pinterest ${recommendations.inspiration}](https://www.pinterest.com/search/pins/?q=${recommendations.inspiration})\n`;
    response += `[Instagram ${recommendations.inspiration}](https://www.instagram.com/explore/tags/${recommendations.inspiration.replace(/%20/g, '')}/)\n`;

    return response;
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
      case '30s':
        return {
          styles: [
            'Finger waves',
            'Pin curls',
            'Marcel waves',
            'Hollywood waves',
            'Sleek bob with soft curls'
          ],
          products: [
            'Setting lotion',
            'Pin curl clips',
            'Wave clips',
            'Pomade',
            'Heat protectant'
          ],
          accessories: [
            'Art deco hair clips',
            'Decorative combs',
            'Feather accessories',
            'Jeweled pins',
            'Small elegant hats'
          ],
          tips: [
            'Master the finger wave technique',
            'Use pin curls for overnight styling',
            'Keep waves close to the head',
            'Focus on shine and sleekness'
          ],
          inspiration: '1930s%20hairstyles'
        };
      default:
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