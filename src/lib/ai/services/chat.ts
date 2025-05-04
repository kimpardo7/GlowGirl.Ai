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
  accessories: string[];
  shoes: string[];
  layers: string[];
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
    if (lowerMessage.includes('y2k') || lowerMessage.includes('2000s') || lowerMessage.includes('retro')) {
      aesthetic = 'y2k';
    } else if (lowerMessage.includes('baddie')) {
      aesthetic = 'baddie';
    } else if (lowerMessage.includes('cottagecore')) {
      aesthetic = 'cottagecore';
    } else if (lowerMessage.includes('dark academia')) {
      aesthetic = 'dark-academia';
    } else if (lowerMessage.includes('minimalist')) {
      aesthetic = 'minimalist';
    } else if (stylePreferences.length > 0) {
      aesthetic = stylePreferences[0];
    }

    // Get Y2K-specific hairstyles
    if (aesthetic === 'y2k') {
      return `Hey girly! 💁‍♀️ Let's give you some totally Y2K hair inspo!\n\n` +
        `### Y2K Hairstyle Ideas:\n` +
        `• Space Buns with Face-Framing Pieces\n` +
        `• Butterfly Clips Galore\n` +
        `• Zigzag Part with Spiky Buns\n` +
        `• Crimped Hair\n` +
        `• Chunky Highlights\n` +
        `• Flipped Out Ends\n` +
        `• Mini Braids Throughout\n` +
        `• High Pigtails\n` +
        `• Bandana Headband Style\n` +
        `• Colored Hair Extensions\n\n` +
        `### Must-Have Hair Accessories:\n` +
        `• Butterfly Clips in Various Colors\n` +
        `• Colorful Snap Clips\n` +
        `• Scrunchies (especially metallic ones)\n` +
        `• Bandanas\n` +
        `• Mini Claw Clips\n` +
        `• Plastic Headbands\n` +
        `• Hair Gems and Glitter\n\n` +
        `### Styling Products You'll Need:\n` +
        `• Crimping Iron\n` +
        `• Hair Glitter Gel\n` +
        `• Strong Hold Hair Spray\n` +
        `• Shine Serum\n` +
        `• Colorful Hair Extensions\n` +
        `• Heat Protectant Spray\n\n` +
        `### Where to Shop:\n` +
        `• [Shop at Claire's](https://www.claires.com/hair-accessories/)\n` +
        `• [Shop at Ulta](https://www.ulta.com/hair-accessories/)\n` +
        `• [Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/f21/acc_hair-accessories)\n\n` +
        `### Styling Tips:\n` +
        `✨ Don't be afraid to mix multiple butterfly clips\n` +
        `✨ Try face-framing pieces with any updo\n` +
        `✨ Experiment with zigzag parts\n` +
        `✨ Add pops of color with clip-in extensions\n` +
        `✨ Layer different accessories together\n\n` +
        `### Get More Inspiration:\n` +
        `• [Pinterest Y2K Hair](https://www.pinterest.com/search/pins/?q=y2k%20hairstyles)\n` +
        `• [Instagram Y2K Hair](https://www.instagram.com/explore/tags/y2khairstyle/)\n\n` +
        `💡 **Pro Tip:** Y2K hair is all about fun and experimentation! Don't be afraid to mix different elements and make it your own. Just remember to use heat protection when styling!`;
    }

    // Get hair color recommendations based on seasonal color
    const getHairColorsBySeasonalColor = (season: string): string[] => {
      switch(season.toLowerCase()) {
        case 'winter':
          return ['Deep Black', 'Cool Brown', 'Platinum Blonde', 'Blue-Black', 'Ash Brown'];
        case 'summer':
          return ['Light Ash Brown', 'Cool Blonde', 'Silver Blonde', 'Medium Ash Brown', 'Pearl Blonde'];
        case 'spring':
          return ['Golden Blonde', 'Warm Brown', 'Strawberry Blonde', 'Honey Blonde', 'Light Copper'];
        case 'autumn':
          return ['Auburn', 'Copper Red', 'Golden Brown', 'Chestnut Brown', 'Rich Chocolate'];
        default:
          return ['Natural Brown', 'Soft Black', 'Medium Blonde', 'Caramel Brown', 'Dark Brown'];
      }
    };

    // Get hairstyle recommendations based on face shape
    const getHairstylesByFaceShape = (shape: string): string[] => {
      switch(shape.toLowerCase()) {
        case 'oval':
          return ['Long Layers', 'Blunt Bob', 'Side-Swept Bangs', 'Textured Pixie', 'Beach Waves'];
        case 'round':
          return ['Long Layered Cut', 'Side Part', 'Asymmetrical Bob', 'Long Side-Swept Bangs', 'Volume at Crown'];
        case 'square':
          return ['Soft Layers', 'Long Waves', 'Side-Swept Bangs', 'Textured Lob', 'Wispy Ends'];
        case 'heart':
          return ['Side-Swept Bangs', 'Chin-Length Bob', 'Long Layers', 'Textured Pixie', 'Medium Layered Cut'];
        case 'diamond':
          return ['Side-Swept Bangs', 'Chin-Length Styles', 'Textured Pixie', 'Medium Layered Cut', 'Wispy Bangs'];
        case 'rectangle':
          return ['Long Layers with Face-Framing', 'Shoulder-Length Cut', 'Side-Swept Bangs', 'Textured Waves', 'Volume at Sides'];
        default:
          return ['Medium-Length Layers', 'Classic Bob', 'Side-Swept Bangs', 'Long Layers', 'Beach Waves'];
      }
    };

    // Get aesthetic-specific hairstyles
    const getHairstylesByAesthetic = (aesthetic: string): {
      styles: string[];
      products: string[];
      inspiration: string;
      tips: string[];
    } => {
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
            inspiration: 'baddie%20hairstyles',
            tips: [
              'Master your baby hairs',
              'Invest in quality extensions',
              'Perfect the sleek look',
              'Learn to do intricate braids'
            ]
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
              'Floral Hair Accessories',
              'Light Hold Cream',
              'Natural Bristle Brush',
              'Silk Hair Ribbons'
            ],
            inspiration: 'cottagecore%20hair',
            tips: [
              'Master different braid styles',
              'Use natural styling methods',
              'Incorporate flowers and ribbons',
              'Embrace your natural texture'
            ]
          };
        case 'y2k':
          return {
            styles: [
              'Butterfly Clips Galore',
              'Spiky Buns',
              'Crimped Sections',
              'Face-Framing Pieces',
              'Colorful Hair Extensions'
            ],
            products: [
              'Hair Gems and Clips',
              'Crimping Iron',
              'Colorful Hair Extensions',
              'Glitter Hair Gel',
              'Fun Hair Accessories'
            ],
            inspiration: 'y2k%20hairstyles',
            tips: [
              'Mix different hair accessories',
              'Don\'t be afraid of color',
              'Try fun updos',
              'Experiment with temporary dyes'
            ]
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
            inspiration: 'dark%20academia%20hair',
            tips: [
              'Keep styles polished and neat',
              'Use classic accessories',
              'Focus on timeless looks',
              'Master elegant updos'
            ]
          };
        case 'minimalist':
          return {
            tops: [
              'Basic White Tee',
              'Black Turtleneck',
              'Silk Button-Down',
              'Fitted Tank Top',
              'Crew Neck Sweater'
            ],
            bottoms: [
              'Straight Leg Jeans',
              'Black Trousers',
              'Midi Slip Skirt',
              'Wide Leg Pants',
              'Tailored Shorts'
            ],
            accessories: [
              'Simple Gold Necklace',
              'Leather Tote',
              'Classic Watch',
              'Minimal Earrings',
              'Leather Belt'
            ],
            shoes: [
              'White Sneakers',
              'Black Loafers',
              'Ankle Boots',
              'Leather Slides',
              'Ballet Flats'
            ],
            layers: [
              'Classic Blazer',
              'Camel Coat',
              'Denim Jacket',
              'Black Cardigan',
              'Trench Coat'
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
        default:
          return {
            tops: [
              'Classic White Tee',
              'Fitted Tank Top',
              'Button-Down Shirt',
              'Knit Sweater',
              'Basic Crop Top'
            ],
            bottoms: [
              'High-Waisted Jeans',
              'Black Leggings',
              'Midi Skirt',
              'Tailored Pants',
              'Denim Shorts'
            ],
            accessories: [
              'Versatile Tote Bag',
              'Simple Necklace',
              'Classic Watch',
              'Leather Belt',
              'Stud Earrings'
            ],
            shoes: [
              'White Sneakers',
              'Ankle Boots',
              'Ballet Flats',
              'Sandals',
              'Loafers'
            ],
            layers: [
              'Denim Jacket',
              'Cardigan',
              'Blazer',
              'Light Sweater',
              'Trench Coat'
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
    };

    const recommendedColors = getHairColorsBySeasonalColor(seasonalColor);
    const recommendedStyles = getHairstylesByFaceShape(faceShape);

    const outfitRecs = this.getOutfitsByAesthetic(aesthetic);

    return `Hey girly! 👗 Let me help you create the perfect ${aesthetic} look!\n\n` +
      `Here's a curated ${aesthetic} outfit guide with shopping links:\n\n` +
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
      `[Pinterest ${aesthetic} Style](https://www.pinterest.com/search/pins/?q=${outfitRecs.inspiration})\n` +
      `[Instagram ${aesthetic} Fashion](https://www.instagram.com/explore/tags/${aesthetic.replace('-', '')}style/)\n\n` +
      `💡 Pro Tip: Mix and match these pieces to create multiple ${aesthetic} outfits! The key is to have versatile pieces that capture the ${aesthetic} vibe while staying true to your personal style.`;
  }

  private formatPrompt(messages: ChatMessage[]): string {
    // Keep only the last message for context to reduce complexity
    const lastMessage = messages[messages.length - 1];
    const lowerMessage = lastMessage.content.toLowerCase();
    
    // Check for jewelry-related queries first
    if (lowerMessage.includes('jewelry') || lowerMessage.includes('jewellery') || 
        lowerMessage.includes('necklace') || lowerMessage.includes('bracelet') || 
        lowerMessage.includes('earrings') || lowerMessage.includes('rings') ||
        lowerMessage.includes('accessories')) {
      return this.getFallbackJewelryResponse(lastMessage.content);
    }
    
    // Check for outfit-related queries
    if (lowerMessage.includes('outfit') || lowerMessage.includes('clothes') || lowerMessage.includes('wear') || 
        lowerMessage.includes('dress') || lowerMessage.includes('style') || lowerMessage.includes('fashion') ||
        lowerMessage.includes('mall') || lowerMessage.includes('shopping') || lowerMessage.includes('baddie') ||
        lowerMessage.includes('going to') || lowerMessage.includes('what to wear')) {
      return this.getFallbackOutfitResponse(lastMessage.content);
    }
    
    // Then check for makeup queries
    if (lowerMessage.includes('makeup') || lowerMessage.includes('glam') || lowerMessage.includes('beauty')) {
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
    
    // Check for hair-related keywords first
    if (lowerMessage.includes('hair') || lowerMessage.includes('hairstyle') || 
        lowerMessage.includes('haircut') || lowerMessage.includes('bangs') ||
        lowerMessage.includes('color') || lowerMessage.includes('dye') ||
        lowerMessage.includes('style my hair') || lowerMessage.includes('cut')) {
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
    if (lowerMessage.includes('baddie')) aesthetic = 'baddie';
    else if (lowerMessage.includes('y2k') || lowerMessage.includes('retro')) aesthetic = 'y2k';
    else if (lowerMessage.includes('cottagecore')) aesthetic = 'cottagecore';
    else if (lowerMessage.includes('dark academia')) aesthetic = 'dark-academia';
    else if (lowerMessage.includes('minimalist')) aesthetic = 'minimalist';
    else if (stylePreferences.length > 0) aesthetic = stylePreferences[0];

    const outfitRecs = this.getOutfitsByAesthetic(aesthetic);

    return `Hey girly! 👗 Let me help you create the perfect ${aesthetic} look!\n\n` +
      `Here's a curated ${aesthetic} outfit guide with shopping links:\n\n` +
      `### Style Options:\n` +
      outfitRecs.styles.map(style => `• ${style}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/)\n\n` +
      `### Must-Have Products:\n` +
      outfitRecs.products.map(product => `• ${product}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/)\n\n` +
      `### Accessories:\n` +
      outfitRecs.accessories.map(acc => `• ${acc}\n`).join('') +
      `[Shop at H&M](https://www.hm.com/us/products/ladies/accessories/)\n` +
      `[Shop at Zara](https://www.zara.com/us/en/woman/accessories-l1066.html)\n` +
      `[Shop at Forever 21](https://www.forever21.com/us/shop/catalog/category/21women/accessories)\n\n` +
      `### Style Tips:\n` +
      outfitRecs.tips.map(tip => `✨ ${tip}\n`).join('') + '\n' +
      `### Get More Inspiration:\n` +
      `[Pinterest ${aesthetic} Style](https://www.pinterest.com/search/pins/?q=${outfitRecs.inspiration})\n` +
      `[Instagram ${aesthetic} Fashion](https://www.instagram.com/explore/tags/${aesthetic.replace('-', '')}style/)\n\n` +
      `💡 Pro Tip: Mix and match these pieces to create multiple ${aesthetic} outfits! The key is to have versatile pieces that capture the ${aesthetic} vibe while staying true to your personal style.`;
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
    
    // Check for hair-related keywords first with more variations
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
        lowerMessage.includes('jewel') || lowerMessage.includes('inspo')) {
      console.log('Jewelry query detected, returning jewelry response');
      return this.getFallbackJewelryResponse(userMessage);
    }
    
    // Check for outfit-related keywords with more variations
    if (lowerMessage.includes('outfit') || lowerMessage.includes('clothes') || 
        lowerMessage.includes('wear') || lowerMessage.includes('dress') || 
        lowerMessage.includes('style') || lowerMessage.includes('fashion') ||
        lowerMessage.includes('mall') || lowerMessage.includes('shopping') || 
        lowerMessage.includes('baddie') || lowerMessage.includes('going to') || 
        lowerMessage.includes('what to wear') || lowerMessage.includes('y2k') ||
        lowerMessage.includes('cottagecore') || lowerMessage.includes('retro') ||
        lowerMessage.includes('dark academia') || lowerMessage.includes('minimalist')) {
      console.log('Outfit query detected, returning outfit response');
      return this.getFallbackOutfitResponse(userMessage);
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
      default:
        return {
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
            'Build a versatile wardrobe',
            'Focus on fit and quality',
            'Mix and match basics',
            'Invest in classic pieces',
            'Keep it simple'
          ],
          inspiration: 'classic%20fashion%20style'
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
}