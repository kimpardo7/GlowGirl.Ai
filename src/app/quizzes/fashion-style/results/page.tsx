'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function FashionStyleResults() {
  const searchParams = useSearchParams();
  const style = searchParams?.get('style') || '';
  const validStyles = ['cottagecore', 'streetwear', 'y2k', 'dark-academia', 'minimalist'];
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [keyItems, setKeyItems] = useState<string[]>([]);
  const [outfitIdeas, setOutfitIdeas] = useState<string[]>([]);
  const [brandRecommendations, setBrandRecommendations] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Safety check for missing or invalid parameters
    if (!searchParams) {
      setError(true);
      setLoading(false);
      return;
    }
    
    // Check if style is valid
    const validStyle = validStyles.includes(style) || style === '';
    if (!validStyle) {
      // If invalid style, just show the default case
      setLoading(true);
      setImageLoading(true);
      // Set default content
      setTitle('Your Fashion Style Results');
      setSubtitle('Unique and Evolving');
      setDescription('Your style is uniquely yours, drawing inspiration from various aesthetics! Fashion is about self-expression, so feel free to mix elements from different styles to create a look that feels authentically you.');
      setKeyItems([
        'Pieces that make you feel confident and comfortable',
        'Items that reflect your personality',
        'Versatile basics that can be styled in multiple ways',
        'Statement accessories that express your unique taste',
        'Quality over quantity - invest in pieces you truly love'
      ]);
      setOutfitIdeas([
        'Try mixing elements from different styles you\'re drawn to',
        'Experiment with combining unexpected pieces together',
        'Use accessories to add personality to simple outfits',
        'Play with layering to create dimension in your looks',
        'Don\'t be afraid to break fashion "rules" - wear what makes you happy'
      ]);
      setBrandRecommendations([
        '<a href="https://hm.com/women" target="_blank" class="text-violet-600 hover:underline">H&M</a> - Affordable women\'s fashion with various style options',
        '<a href="https://oldnavy.gap.com/womens" target="_blank" class="text-violet-600 hover:underline">Old Navy</a> - Budget-friendly basics for women of all sizes',
        '<a href="https://zara.com/women" target="_blank" class="text-violet-600 hover:underline">Zara</a> - Trendy women\'s fashion at moderate prices',
        '<a href="https://nordstrom.com/women" target="_blank" class="text-violet-600 hover:underline">Nordstrom</a> - Department store with women\'s fashion from affordable to high-end',
        '<a href="https://net-a-porter.com" target="_blank" class="text-violet-600 hover:underline">Net-a-Porter</a> - Luxury designer women\'s fashion marketplace'
      ]);
      setImageUrl('/images/fashion-default.jpg');
      setColor('from-violet-200 to-cyan-200');
      
      // Add a small delay to ensure state updates have time to process
      setTimeout(() => {
        setLoading(false);
      }, 300);
      
      return;
    }
    
    setLoading(true);
    setImageLoading(true);
    // Set content based on result
    if (style === 'cottagecore') {
      setTitle('Your Style Aesthetic: Cottagecore');
      setSubtitle('Romantic, Dreamy, and Nature-Inspired');
      setDescription('You\'re drawn to the romantic and nostalgic aesthetic that celebrates a simpler, more rural lifestyle. Your style embraces natural fabrics, vintage-inspired designs, and soft silhouettes that evoke a sense of whimsy and connection to nature.');
      setKeyItems([
        'Flowy dresses with floral or gingham prints',
        'High-waisted skirts that hit below the knee',
        'Puff-sleeve blouses and peasant tops',
        'Knitted cardigans and cozy sweaters',
        'Lace details, ruffles, and embroidery',
        'Natural fabrics like cotton, linen, and wool'
      ]);
      setOutfitIdeas([
        'Floral midi dress + woven cardigan + lace-up boots + straw hat',
        'High-waisted trousers + puff-sleeve blouse + Mary Jane shoes + woven bag',
        'Gingham skirt + white blouse with embroidery + ribbon hair accessories',
        'Linen jumpsuit + handcrafted jewelry + woven basket bag + ballet flats',
        'Tiered maxi dress + knit shawl + vintage-inspired boots'
      ]);
      setBrandRecommendations([
        '<a href="https://hm.com/women" target="_blank" class="text-rose-600 hover:underline">H&M</a> - Affordable women\'s cottagecore-inspired dresses and blouses',
        '<a href="https://asos.com/women/dresses" target="_blank" class="text-rose-600 hover:underline">ASOS</a> - Budget-friendly romantic women\'s dresses and tops',
        '<a href="https://freepeople.com/dresses" target="_blank" class="text-rose-600 hover:underline">Free People</a> - Mid-range bohemian women\'s clothing with cottagecore elements',
        '<a href="https://zimmermann.com/collections/ready-to-wear" target="_blank" class="text-rose-600 hover:underline">Zimmermann</a> - Luxury women\'s floral dresses and romantic pieces',
        '<a href="https://loveshackfancy.com/collections/dresses" target="_blank" class="text-rose-600 hover:underline">LoveShackFancy</a> - High-end women\'s cottagecore aesthetic with feminine details'
      ]);
      setImageUrl('/images/cottagecore.jpg');
      setColor('from-rose-100 to-emerald-100');
    } 
    else if (style === 'streetwear') {
      setTitle('Your Style Aesthetic: Streetwear');
      setSubtitle('Urban, Bold, and Effortlessly Cool');
      setDescription('Your style is all about self-expression, comfort, and statement pieces. You appreciate urban culture, sneaker culture, and aren\'t afraid to mix high and low fashion for a bold, contemporary look that stands out in a crowd.');
      setKeyItems([
        'Graphic tees and hoodies with bold prints or logos',
        'Oversized silhouettes and baggy fits',
        'Statement sneakers and chunky boots',
        'Technical/utility elements like cargo pockets and zippers',
        'Layered outfits with mix of high-end and casual pieces',
        'Statement accessories like caps, chains, and crossbody bags'
      ]);
      setOutfitIdeas([
        'Oversized graphic hoodie + wide-leg cargo pants + chunky sneakers + beanie',
        'Vintage tee + baggy jeans + limited edition sneakers + chain accessories',
        'Tech jacket + crop top + high-waisted track pants + platform boots',
        'Oversized button-up + biker shorts + basketball sneakers + bucket hat',
        'Graphic sweatshirt + utility pants + chunky boots + crossbody bag'
      ]);
      setBrandRecommendations([
        '<a href="https://hm.com/women/products/hoodies-sweatshirts" target="_blank" class="text-indigo-600 hover:underline">H&M Divided</a> - Affordable women\'s streetwear basics and graphic tees',
        '<a href="https://zara.com/women/sweatshirts" target="_blank" class="text-indigo-600 hover:underline">Zara</a> - Budget-friendly women\'s contemporary streetwear',
        '<a href="https://adidaswomen.com" target="_blank" class="text-indigo-600 hover:underline">Adidas</a> - Mid-range women\'s athleisure and urban sportswear',
        '<a href="https://off---white.com/en-us/collections/women-collection" target="_blank" class="text-indigo-600 hover:underline">Off-White</a> - Luxury women\'s streetwear with designer appeal',
        '<a href="https://us.balmain.com/women" target="_blank" class="text-indigo-600 hover:underline">Balmain</a> - High-end luxury women\'s urban fashion with premium pricing'
      ]);
      setImageUrl('/images/streetwear.jpg');
      setColor('from-gray-900 to-indigo-900');
    }
    else if (style === 'y2k') {
      setTitle('Your Style Aesthetic: Y2K');
      setSubtitle('Playful, Nostalgic, and Unapologetically Bold');
      setDescription('Your style celebrates the fun, colorful aesthetic of the late 90s and early 2000s. You love attention-grabbing pieces with a nostalgic twist, mixing bright colors, fun textures, and statement accessories for a look that\'s both retro and fresh.');
      setKeyItems([
        'Low-rise jeans and mini skirts',
        'Baby tees and crop tops with playful graphics',
        'Platform shoes and colorful sneakers',
        'Baguette bags and mini purses',
        'Butterfly clips, scrunchies, and colorful accessories',
        'Velour tracksuits and matching sets'
      ]);
      setOutfitIdeas([
        'Baby tee + low-rise jeans + platform sandals + mini shoulder bag',
        'Pleated mini skirt + cropped cardigan + knee-high boots + hair clips',
        'Velour tracksuit + platform sneakers + tiny sunglasses + baguette bag',
        'Halter top + cargo pants + chunky colorful sneakers + bucket hat',
        'Slip dress over baby tee + platform flip flops + mini backpack'
      ]);
      setBrandRecommendations([
        '<a href="https://forever21.com/women" target="_blank" class="text-pink-600 hover:underline">Forever 21</a> - Affordable women\'s Y2K-inspired fashion and accessories',
        '<a href="https://urbanoutfitters.com/womens-clothing" target="_blank" class="text-pink-600 hover:underline">Urban Outfitters</a> - Budget to mid-range women\'s Y2K revival pieces',
        '<a href="https://dollskill.com/collections/womens" target="_blank" class="text-pink-600 hover:underline">Dolls Kill</a> - Mid-range playful, nostalgic women\'s fashion',
        '<a href="https://moschino.com/collections/women" target="_blank" class="text-pink-600 hover:underline">Moschino</a> - Luxury women\'s designer with playful Y2K elements',
        '<a href="https://versace.com/women" target="_blank" class="text-pink-600 hover:underline">Versace</a> - High-end luxury women\'s fashion with bold Y2K aesthetics'
      ]);
      setImageUrl('/images/y2k.jpg');
      setColor('from-pink-400 to-blue-300');
    }
    else if (style === 'dark-academia') {
      setTitle('Your Style Aesthetic: Dark Academia');
      setSubtitle('Intellectual, Vintage, and Sophisticated');
      setDescription('Your style embodies the scholarly, intellectual aesthetic inspired by classic literature and prestigious institutions of learning. You gravitate toward vintage-inspired pieces in muted, earthy tones and appreciate quality fabrics with a touch of preppy sophistication.');
      setKeyItems([
        'Tweed blazers and wool coats',
        'Oxford button-downs and turtlenecks',
        'Pleated skirts and tailored trousers',
        'Loafers, Oxford shoes, and lace-up boots',
        'Leather satchels and vintage-inspired bags',
        'Knit vests and cardigans'
      ]);
      setOutfitIdeas([
        'Turtleneck + plaid pleated skirt + knee-high socks + loafers + leather satchel',
        'White button-up + knit vest + tailored pants + Oxford shoes',
        'Tweed blazer + slim turtleneck + straight leg jeans + leather boots',
        'Oversized sweater + pleated midi skirt + tights + ankle boots',
        'Button-up + tie + trousers + loafers + vintage watch'
      ]);
      setBrandRecommendations([
        '<a href="https://uniqlo.com/women/outerwear" target="_blank" class="text-amber-600 hover:underline">Uniqlo</a> - Affordable quality women\'s basics with academic appeal',
        '<a href="https://hm.com/women/cardigans-sweaters" target="_blank" class="text-amber-600 hover:underline">H&M</a> - Budget-friendly women\'s classic pieces',
        '<a href="https://massimodutti.com/women" target="_blank" class="text-amber-600 hover:underline">Massimo Dutti</a> - Mid-range sophisticated women\'s classics',
        '<a href="https://ralphlauren.com/women" target="_blank" class="text-amber-600 hover:underline">Ralph Lauren</a> - Higher-end women\'s pieces with collegiate heritage',
        '<a href="https://burberry.com/womens" target="_blank" class="text-amber-600 hover:underline">Burberry</a> - Luxury women\'s academic-inspired heritage pieces'
      ]);
      setImageUrl('/images/dark-academia.jpg');
      setColor('from-amber-900 to-slate-800');
    }
    else if (style === 'minimalist') {
      setTitle('Your Style Aesthetic: Minimalist');
      setSubtitle('Clean, Timeless, and Intentional');
      setDescription('Your style embodies the "less is more" philosophy, focusing on clean lines, quality fabrics, and a neutral color palette. You value versatility and timelessness over trends, with a carefully curated wardrobe of pieces that can be mixed and matched effortlessly.');
      setKeyItems([
        'High-quality basics in neutral colors',
        'Well-tailored blazers and structured outerwear',
        'Straight-leg or wide-leg pants with clean lines',
        'Simple, elegant dresses with minimal details',
        'Clean-lined shoes like loafers, white sneakers, and ankle boots',
        'Subtle, delicate jewelry and accessories'
      ]);
      setOutfitIdeas([
        'White button-up + high-waisted straight leg pants + loafers + structured tote',
        'Black turtleneck + camel coat + straight leg jeans + ankle boots',
        'Simple slip dress + oversized blazer + minimal sandals + delicate necklace',
        'White t-shirt + black trousers + white sneakers + simple watch',
        'Monochrome matching set + clean sneakers + structured crossbody bag'
      ]);
      setBrandRecommendations([
        '<a href="https://uniqlo.com/women/t-shirts" target="_blank" class="text-stone-600 hover:underline">Uniqlo</a> - Affordable, quality women\'s minimalist basics',
        '<a href="https://cosstores.com/women" target="_blank" class="text-stone-600 hover:underline">COS</a> - Mid-range women\'s clean, architectural designs',
        '<a href="https://aritzia.com/us/en/clothing" target="_blank" class="text-stone-600 hover:underline">Aritzia</a> - Contemporary women\'s minimal wardrobe staples',
        '<a href="https://toteme-studio.com/collections/ready-to-wear" target="_blank" class="text-stone-600 hover:underline">Totême</a> - Higher-end women\'s minimalist essentials',
        '<a href="https://therow.com/collections/womenswear" target="_blank" class="text-stone-600 hover:underline">The Row</a> - Luxury women\'s minimalist fashion at premium prices'
      ]);
      setImageUrl('/images/minimalist.jpg');
      setColor('from-stone-100 to-slate-200');
    }
    
    // Add a small delay to ensure state updates have time to process
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [style, searchParams]);

  const isDark = style === 'dark-academia' || style === 'streetwear';

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 flex justify-center items-center h-96">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading your style results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-8 text-center">
          <div className="text-4xl mb-4">😕</div>
          <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We couldn't find your style results. Let's try taking the quiz again.
          </p>
          <Link 
            href="/quizzes/fashion-style" 
            className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
          >
            Retake Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className={`absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r ${color} rounded-full filter blur-3xl opacity-20 animate-pulse-slow`}></div>
        <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r ${color} rounded-full filter blur-3xl opacity-20 animate-pulse-slow delay-700`}></div>
      </div>
    
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-72 md:h-auto">
            <div className={`absolute inset-0 bg-gradient-to-r ${color} ${imageLoading ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500 flex items-center justify-center`}>
              <div className="animate-pulse text-4xl">{style === 'cottagecore' ? '🌸' : style === 'streetwear' ? '👟' : style === 'y2k' ? '✨' : style === 'dark-academia' ? '📚' : style === 'minimalist' ? '🤍' : '👗'}</div>
            </div>
            {imageUrl && (
              <Image 
                src={imageUrl}
                alt={title}
                fill
                className={`object-cover ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                onLoadingComplete={() => setImageLoading(false)}
                onError={() => {
                  // Use a different fallback image for each style
                  const fallbacks = {
                    'cottagecore': '/images/fallback-cottagecore.jpg',
                    'streetwear': '/images/fallback-streetwear.jpg',
                    'y2k': '/images/fallback-y2k.jpg',
                    'dark-academia': '/images/fallback-academic.jpg',
                    'minimalist': '/images/fallback-minimalist.jpg',
                    'default': '/images/fallback-fashion.jpg'
                  };
                  
                  // Set a default fallback
                  setImageUrl(fallbacks[style as keyof typeof fallbacks] || fallbacks.default);
                  setImageLoading(false);
                }}
              />
            )}
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="mb-4">
              <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${color} ${isDark ? 'text-white' : 'text-gray-800'} mb-3`}>
                Fashion Style Quiz Result
              </div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              <p className="text-lg text-gray-600 font-medium">{subtitle}</p>
            </div>
            <p className="text-gray-700 mb-6">
              {description}
            </p>
            <div className="mt-auto">
              <div className="flex flex-wrap gap-2">
                {style === 'cottagecore' && (
                  <>
                    <span className="px-2 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-medium">Romantic</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Whimsical</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Nature-Inspired</span>
                  </>
                )}
                {style === 'streetwear' && (
                  <>
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">Urban</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Bold</span>
                    <span className="px-2 py-1 bg-violet-100 text-violet-800 rounded-full text-xs font-medium">Innovative</span>
                  </>
                )}
                {style === 'y2k' && (
                  <>
                    <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">Playful</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Nostalgic</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Bold</span>
                  </>
                )}
                {style === 'dark-academia' && (
                  <>
                    <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Intellectual</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">Vintage</span>
                    <span className="px-2 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-medium">Sophisticated</span>
                  </>
                )}
                {style === 'minimalist' && (
                  <>
                    <span className="px-2 py-1 bg-stone-100 text-stone-800 rounded-full text-xs font-medium">Clean</span>
                    <span className="px-2 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-medium">Timeless</span>
                    <span className="px-2 py-1 bg-zinc-100 text-zinc-800 rounded-full text-xs font-medium">Intentional</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="text-2xl mb-3">👗</div>
          <h2 className="text-xl font-semibold mb-4">Key Wardrobe Pieces</h2>
          <ul className="space-y-3">
            {keyItems.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="text-2xl mb-3">✨</div>
          <h2 className="text-xl font-semibold mb-4">Outfit Combinations</h2>
          <ul className="space-y-3">
            {outfitIdeas.map((idea, index) => (
              <li key={index} className="flex items-start">
                <span className="bg-indigo-100 text-indigo-800 font-medium h-5 w-5 rounded-full flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">{index + 1}</span>
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <div className="text-2xl mb-3">🛍️</div>
          <h2 className="text-xl font-semibold mb-4">Where to Shop</h2>
          <ul className="space-y-3">
            {brandRecommendations.map((brand, index) => (
              <li key={index} className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span dangerouslySetInnerHTML={{ __html: brand }}></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-xl mb-12 border border-blue-100">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">Style Tip</h3>
            <p className="text-blue-700">
              Fashion is about self-expression! While this quiz identifies your primary aesthetic, don't be afraid to borrow elements from other styles. The most authentic and interesting looks often come from blending different influences that resonate with you personally.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Link 
          href="/quizzes/fashion-style" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-6 rounded-full transition duration-300"
        >
          Retake Quiz
        </Link>
        <Link 
          href="/quizzes" 
          className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-full transition duration-300 shadow-md hover:shadow-lg"
        >
          Try Other Quizzes
        </Link>
      </div>
    </div>
  );
} 