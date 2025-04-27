'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MakeupStyleResults() {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get('style');
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('budget');

  // Style data
  const styles = {
    natural: {
      title: "Natural Beauty",
      description: "You prefer a fresh-faced, minimal makeup look that enhances your natural features without looking 'made up'. Your approach to makeup is effortless and understated.",
      products: {
        budget: [
          {
            name: "The Ordinary Serum Foundation",
            price: "$7.90",
            description: "Lightweight foundation with medium coverage and a natural finish",
            link: "https://theordinary.com/en-us/serum-foundation-100401.html"
          },
          {
            name: "Maybelline Fit Me Dewy + Smooth Foundation",
            price: "$7.99",
            description: "Hydrating foundation that leaves skin looking naturally luminous",
            link: "https://www.maybelline.com/face-makeup/foundation-makeup/fit-me-dewy-and-smooth-foundation"
          },
          {
            name: "e.l.f. Putty Blush",
            price: "$7.00",
            description: "Cream blush that melts into skin for a natural flush",
            link: "https://www.elfcosmetics.com/putty-blush/300171.html"
          },
          {
            name: "Covergirl Lash Blast Clean Volume Mascara",
            price: "$9.99",
            description: "Clean, volumizing formula that's perfect for everyday wear",
            link: "https://www.covergirl.com/en_us/shop-our-makeup-products/eye-makeup/mascara/lash-blast-clean-volume-mascara"
          },
          {
            name: "Neutrogena MoistureSmooth Color Stick",
            price: "$8.99",
            description: "Sheer, balmy lip color that moisturizes while providing natural color",
            link: "https://www.neutrogena.com/products/makeup/moisturesmooth-color-stick/6811718.html"
          }
        ],
        premium: [
          {
            name: "ILIA Super Serum Skin Tint SPF 40",
            price: "$48.00",
            description: "Tinted serum that provides light coverage, skincare benefits, and sun protection",
            link: "https://iliabeauty.com/products/st8-shela"
          },
          {
            name: "Tower 28 BeachPlease Lip + Cheek Cream Blush",
            price: "$22.00",
            description: "Multi-use cream blush for cheeks and lips with a dewy finish",
            link: "https://tower28beauty.com/products/beachplease"
          },
          {
            name: "Kosas The Big Clean Volumizing + Lash Care Mascara",
            price: "$26.00",
            description: "Clean mascara that's gentle yet effective for natural-looking volume",
            link: "https://kosas.com/products/the-big-clean-mascara"
          },
          {
            name: "Merit Shade Slick Tinted Lip Oil",
            price: "$24.00",
            description: "Lightweight tinted lip oil that provides a sheer wash of color",
            link: "https://www.meritbeauty.com/products/shade-slick"
          },
          {
            name: "Saie Slip Tint Dewy Hydrating Tinted Moisturizer",
            price: "$36.00",
            description: "Lightweight tinted moisturizer with SPF 35 for a natural, dewy finish",
            link: "https://saiehello.com/products/slip-tint"
          }
        ]
      },
      techniques: [
        {
          name: "Focus on skincare as the foundation",
          tutorial: "https://www.youtube.com/watch?v=CXza8Gp1lME",
          description: "Learn how to prep skin for a natural makeup look",
          products: ["Gentle cleanser", "Hydrating moisturizer", "SPF"]
        },
        {
          name: "Apply products with fingers for a seamless finish",
          tutorial: "https://www.youtube.com/watch?v=GegvaZ3VsHY",
          description: "Using your fingertips warms up the product for better blending",
          products: []
        },
        {
          name: "Stick to neutral, skin-like colors",
          tutorial: "https://www.youtube.com/watch?v=tPTl4ZcOqCQ",
          description: "How to find your perfect neutral tones",
          products: ["Neutral eyeshadow palette", "Skin-tone blush"]
        },
        {
          name: "Emphasize lashes with curling and mascara",
          tutorial: "https://www.youtube.com/watch?v=Vo-k_-Nd5Ow",
          description: "The key to opening up your eyes without heavy makeup",
          products: ["Eyelash curler", "Brown or black mascara"]
        },
        {
          name: "Use cream products for a dewy finish",
          tutorial: "https://www.youtube.com/watch?v=YfzQCBHJIKY",
          description: "How to apply cream products for the most natural effect",
          products: ["Cream blush", "Cream highlighter"]
        }
      ],
      perfect_for: [
        {
          occasion: "Everyday wear",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=natural%20everyday%20makeup%20look"
        },
        {
          occasion: "Work environments",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=professional%20natural%20makeup%20look"
        },
        {
          occasion: "Casual outings",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=casual%20natural%20makeup%20outfit"
        },
        {
          occasion: "Those who prefer a quick routine",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=5%20minute%20makeup%20look"
        },
        {
          occasion: "Enhancing youthful features",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=youthful%20natural%20makeup"
        }
      ],
      inspiration: ["Zoe Kravitz", "Dakota Johnson", "Hailey Bieber"]
    },
    classic: {
      title: "Timeless Elegance",
      description: "You appreciate a polished, put-together look that never goes out of style. Your makeup is refined and enhances your features in a balanced way that looks appropriate for any occasion.",
      products: {
        budget: [
          {
            name: "L'Oréal Paris Infallible Fresh Wear Foundation",
            price: "$15.99",
            description: "Medium to full coverage foundation with a natural finish that lasts all day",
            link: "https://www.lorealparisusa.com/makeup/face/foundation-makeup/infallible-fresh-wear-foundation-spf-25"
          },
          {
            name: "NYX Professional Makeup Ultimate Shadow Palette - Warm Neutrals",
            price: "$18.00",
            description: "Versatile neutral eyeshadow palette with 16 wearable shades",
            link: "https://www.nyxcosmetics.com/eye/eyeshadow/ultimate-shadow-palette/NYX_337.html"
          },
          {
            name: "Maybelline Fit Me Matte + Poreless Powder",
            price: "$8.99",
            description: "Setting powder that controls shine and creates a flawless finish",
            link: "https://www.maybelline.com/face-makeup/powder/fit-me-matte-poreless-powder"
          },
          {
            name: "Milani Color Statement Lip Liner",
            price: "$6.99",
            description: "Creamy lip liner that defines lips and prevents lipstick feathering",
            link: "https://milanicosmetics.com/products/color-statement-lip-liner"
          },
          {
            name: "Revlon Super Lustrous Lipstick - Pink Cognito",
            price: "$9.49",
            description: "Classic mauve-pink lipstick with a satin finish",
            link: "https://www.revlon.com/lips/lipstick/super-lustrous-lipstick"
          }
        ],
        premium: [
          {
            name: "Estée Lauder Double Wear Stay-in-Place Foundation",
            price: "$48.00",
            description: "Long-wearing foundation with a flawless, medium to full coverage",
            link: "https://www.esteelauder.com/product/643/22830/product-catalog/makeup/face/foundation/double-wear/stay-in-place-foundation"
          },
          {
            name: "Charlotte Tilbury Luxury Palette - The Sophisticate",
            price: "$55.00",
            description: "Classic quad of matte neutral eyeshadows for a sophisticated eye look",
            link: "https://www.charlottetilbury.com/us/product/luxury-palette-the-sophisticate"
          },
          {
            name: "Laura Mercier Translucent Loose Setting Powder",
            price: "$40.00",
            description: "Cult-favorite setting powder that creates a flawless, long-lasting finish",
            link: "https://www.lauramercier.com/makeup/face/setting-powder/translucent-loose-setting-powder-prod12321001.html"
          },
          {
            name: "Bobbi Brown Lip Color - Brownie",
            price: "$32.00",
            description: "Timeless, semi-matte lipstick in a versatile pinky-brown shade",
            link: "https://www.bobbibrowncosmetics.com/product/14017/7405/makeup/lips/lip-color/lip-color"
          },
          {
            name: "NARS Blush - Orgasm",
            price: "$32.00",
            description: "Iconic peachy-pink blush with a subtle gold shimmer",
            link: "https://www.narscosmetics.com/USA/orgasm-blush/0607845051404.html"
          }
        ]
      },
      techniques: [
        {
          name: "Create a flawless base with foundation and concealer",
          tutorial: "https://www.youtube.com/watch?v=ZIZ5qEQZsYI",
          description: "Learn how to apply foundation for a perfected yet natural-looking finish",
          products: ["Foundation", "Concealer", "Makeup sponge or brush"]
        },
        {
          name: "Define eyes with subtle shadow and liner",
          tutorial: "https://www.youtube.com/watch?v=W9bdkbkLQWA",
          description: "Classic eyeshadow application techniques for defined eyes",
          products: ["Neutral eyeshadow palette", "Eyeliner", "Blending brush"]
        },
        {
          name: "Apply blush to the apples of cheeks",
          tutorial: "https://www.youtube.com/watch?v=BdmPXUUlYfM",
          description: "The perfect technique for applying blush in the most flattering way",
          products: ["Powder or cream blush", "Blush brush"]
        },
        {
          name: "Use lip liner for definition",
          tutorial: "https://www.youtube.com/watch?v=LvZJxf8oz5A",
          description: "How to line lips for a polished, long-lasting lipstick application",
          products: ["Lip liner", "Lipstick", "Lip brush"]
        },
        {
          name: "Set makeup with powder for longevity",
          tutorial: "https://www.youtube.com/watch?v=_k9egfWvb7Y",
          description: "Learn how to set your makeup for all-day wear without looking cakey",
          products: ["Setting powder", "Powder brush or puff"]
        }
      ],
      perfect_for: [
        {
          occasion: "Professional settings",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=professional%20office%20makeup%20look"
        },
        {
          occasion: "Special occasions",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=elegant%20special%20occasion%20makeup"
        },
        {
          occasion: "Photographs",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=photogenic%20makeup%20look"
        },
        {
          occasion: "Those who want a versatile look",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=versatile%20classic%20makeup"
        },
        {
          occasion: "Day to evening transitions",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=day%20to%20night%20makeup%20transition"
        }
      ],
      inspiration: ["Kate Middleton", "Jennifer Aniston", "Amal Clooney"]
    },
    glamorous: {
      title: "Full Glam",
      description: "You love a dramatic, eye-catching makeup look that makes a statement. Your approach to makeup is bold and precise, showcasing your creativity and attention to detail.",
      products: {
        budget: [
          {
            name: "L'Oréal Paris Infallible 24H Fresh Wear Foundation",
            price: "$15.99",
            description: "Long-wearing, full-coverage foundation with a natural matte finish",
            link: "https://www.lorealparisusa.com/makeup/face/foundation-makeup/infallible-fresh-wear-foundation-spf-25"
          },
          {
            name: "e.l.f. Cosmetic Contour Palette",
            price: "$8.00",
            description: "Four-shade powder contour palette for sculpting and defining",
            link: "https://www.elfcosmetics.com/contour-palette/300014.html"
          },
          {
            name: "Colourpop Super Shock Highlighter - Flexitarian",
            price: "$10.00",
            description: "Intense champagne highlighter with a metallic finish",
            link: "https://colourpop.com/products/flexitarian"
          },
          {
            name: "NYX Professional Makeup Epic Ink Liner",
            price: "$9.50",
            description: "Waterproof liquid liner with a precise brush tip for perfect wings",
            link: "https://www.nyxcosmetics.com/eye/eyeliner/epic-ink-liner/NYX_409.html"
          },
          {
            name: "Wet n Wild MegaLast Liquid Catsuit Matte Lipstick",
            price: "$5.99",
            description: "Long-lasting liquid lipstick with intense color payoff",
            link: "https://www.wetnwildbeauty.com/megalast-liquid-catsuit-matte-lipstick.html"
          }
        ],
        premium: [
          {
            name: "Estée Lauder Double Wear Maximum Cover Foundation",
            price: "$48.00",
            description: "Full coverage, long-wearing foundation that stays flawless for hours",
            link: "https://www.esteelauder.com/product/643/32098/product-catalog/makeup/face/foundation/double-wear-maximum-cover"
          },
          {
            name: "Huda Beauty Obsessions Eyeshadow Palette",
            price: "$29.00",
            description: "Rich, pigmented eyeshadow palette with matte and shimmer finishes",
            link: "https://hudabeauty.com/us/en_US/shop/huda-beauty-eyeshadow-palettes-obsessions-HB00777.html"
          },
          {
            name: "Anastasia Beverly Hills Contour Kit",
            price: "$40.00",
            description: "Professional-quality contour palette with six sculpting powders",
            link: "https://www.anastasiabeverlyhills.com/contour-kit/ABH01-18150.html"
          },
          {
            name: "Fenty Beauty Killawatt Freestyle Highlighter",
            price: "$38.00",
            description: "Long-wear, light-as-air highlighter for face and eyes",
            link: "https://fentybeauty.com/products/killawatt-freestyle-highlighter-trophy-wife"
          },
          {
            name: "Pat McGrath Labs MatteTrance Lipstick",
            price: "$39.00",
            description: "Richly pigmented matte lipstick with a luxurious, opulent finish",
            link: "https://www.patmcgrath.com/products/mattetrance-lipstick"
          }
        ]
      },
      techniques: [
        {
          name: "Create a flawless, matte base",
          tutorial: "https://www.youtube.com/watch?v=j5mfEj9XD4w",
          description: "Master the full-coverage foundation application for a poreless finish",
          products: ["Primer", "Full-coverage foundation", "Concealer", "Setting powder"]
        },
        {
          name: "Contour and highlight for dimension",
          tutorial: "https://www.youtube.com/watch?v=QKz_2ScmjUs",
          description: "Learn how to sculpt and enhance your facial features like a pro",
          products: ["Contour palette", "Highlighter", "Contour brush", "Fan brush"]
        },
        {
          name: "Use multiple eyeshadow shades for depth",
          tutorial: "https://www.youtube.com/watch?v=W4W-4VL1ABU",
          description: "Create dimension and drama with a multi-tonal eyeshadow look",
          products: ["Eyeshadow palette", "Various eyeshadow brushes", "Eye primer"]
        },
        {
          name: "Apply winged eyeliner or smokey eye techniques",
          tutorial: "https://www.youtube.com/watch?v=_UeDxkWFe3E",
          description: "Master the perfect winged liner or smokey eye for dramatic looks",
          products: ["Liquid or gel eyeliner", "Kohl pencil", "Angled brush"]
        },
        {
          name: "Define lips with liner and bold color",
          tutorial: "https://www.youtube.com/watch?v=EMfTr8MNw_E",
          description: "Create the perfect statement lip that lasts all day",
          products: ["Lip liner", "Bold lipstick", "Lip brush", "Concealer for clean edges"]
        }
      ],
      perfect_for: [
        {
          occasion: "Evenings out",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=night%20out%20glam%20makeup"
        },
        {
          occasion: "Special events",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=special%20event%20glamorous%20makeup"
        },
        {
          occasion: "Photoshoots",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=photoshoot%20makeup%20glamorous"
        },
        {
          occasion: "When you want to make a statement",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=statement%20makeup%20look"
        },
        {
          occasion: "Occasions when looking polished is essential",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=polished%20glamorous%20makeup"
        }
      ],
      inspiration: ["Kim Kardashian", "Ariana Grande", "Jennifer Lopez"]
    },
    trendy: {
      title: "Experimental & Creative",
      description: "You enjoy staying on the cutting edge of makeup trends and expressing yourself through color and unique techniques. Your approach to makeup is playful, artistic, and ever-evolving.",
      products: {
        budget: [
          {
            name: "ColourPop Fade Into Hue Eyeshadow Palette",
            price: "$34.00",
            description: "Rainbow palette with 30 vibrant matte and shimmer shades",
            link: "https://colourpop.com/products/fade-into-hue-pressed-powder-palette"
          },
          {
            name: "NYX Professional Makeup Vivid Brights Liner",
            price: "$8.50",
            description: "Colorful liquid eyeliner for creative graphic designs",
            link: "https://www.nyxcosmetics.com/eye/eyeliner/vivid-brights-liner/NYX_173.html"
          },
          {
            name: "e.l.f. Cosmetics Bite Size Eyeshadow - Carnival Candy",
            price: "$3.00",
            description: "Compact, colorful eyeshadow quad with vibrant pigmentation",
            link: "https://www.elfcosmetics.com/bite-size-eyeshadow/300177.html"
          },
          {
            name: "Maybelline SuperStay Matte Ink Liquid Lipstick - Dreamer",
            price: "$9.99",
            description: "Bold, highly-pigmented liquid lipstick in a vibrant pink shade",
            link: "https://www.maybelline.com/lip-makeup/lipstick/superstay-matte-ink-liquid-lipstick"
          },
          {
            name: "Wet n Wild MegaGlo Highlighting Powder - Precious Petals",
            price: "$5.99",
            description: "Shimmering highlighter with an intense metallic finish",
            link: "https://www.wetnwildbeauty.com/megaglo-highlighting-powder.html"
          }
        ],
        premium: [
          {
            name: "Natasha Denona Triochrome Palette",
            price: "$129.00",
            description: "High-end eyeshadow palette with multi-dimensional, shifting shades",
            link: "https://www.natashadenona.com/triochrome_palette"
          },
          {
            name: "Pat McGrath Labs Mothership IX: Huetopian Dream",
            price: "$128.00",
            description: "Luxury eyeshadow palette with innovative, high-impact formulas",
            link: "https://www.patmcgrath.com/products/mothership-ix-huetopian-dream"
          },
          {
            name: "Danessa Myricks Colorfix Eye, Cheek & Lip Cream Pigment",
            price: "$18.00",
            description: "Multi-use cream color that can be used anywhere on the face",
            link: "https://danessamyricksbeauty.com/collections/colorfix-cream-colors"
          },
          {
            name: "Fenty Beauty Stunna Lip Paint - Unattached",
            price: "$26.00",
            description: "Bold, long-wearing liquid lipstick in a vibrant coral shade",
            link: "https://fentybeauty.com/products/stunna-lip-paint-longwear-fluid-lip-color-unattached"
          },
          {
            name: "Urban Decay Heavy Metal Glitter Eyeliner",
            price: "$23.00",
            description: "Sparkly glitter eyeliner for adding a touch of festival-worthy magic",
            link: "https://www.urbandecay.com/heavy-metal-glitter-eyeliner-by-urban-decay/ud803.html"
          }
        ]
      },
      techniques: [
        {
          name: "Experiment with color placement",
          tutorial: "https://www.youtube.com/watch?v=vI4E_zR1_kI",
          description: "Learn unique eyeshadow placements that break traditional rules",
          products: ["Colorful eyeshadow palette", "Various eyeshadow brushes", "Eye primer"]
        },
        {
          name: "Try graphic liner shapes",
          tutorial: "https://www.youtube.com/watch?v=PrxKL3QsU6A",
          description: "Master creative eyeliner designs beyond the basic wing",
          products: ["Liquid eyeliners in various colors", "Angled brush", "White liner"]
        },
        {
          name: "Mix textures (matte, glossy, shimmer)",
          tutorial: "https://www.youtube.com/watch?v=hFDrX8Z94eo",
          description: "Create dimension by combining different finishes in one look",
          products: ["Matte eyeshadows", "Shimmer shadows", "Clear lip gloss for eyelids"]
        },
        {
          name: "Play with negative space techniques",
          tutorial: "https://www.youtube.com/watch?v=n7VyFrPu9hA",
          description: "Learn how to create striking designs using negative space",
          products: ["Concealer", "Liquid liner", "Small precision brush"]
        },
        {
          name: "Use unexpected color combinations",
          tutorial: "https://www.youtube.com/watch?v=E0Y8UeV82P0",
          description: "Discover color theory for creating bold, unexpected makeup looks",
          products: ["Color wheel", "Colorful eyeshadow palette", "Colorful eyeliners"]
        }
      ],
      perfect_for: [
        {
          occasion: "Creative environments",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=creative%20artistic%20makeup"
        },
        {
          occasion: "Social media content",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=instagram%20makeup%20trends"
        },
        {
          occasion: "Festivals and parties",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=festival%20makeup%20colorful"
        },
        {
          occasion: "Self-expression",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=expressive%20unique%20makeup"
        },
        {
          occasion: "When you want to make a bold statement",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=bold%20statement%20makeup"
        }
      ],
      inspiration: ["Euphoria makeup", "Rihanna", "Doja Cat", "Lisa from Blackpink"]
    }
  };

  useEffect(() => {
    // Set the result based on the URL parameter
    if (styleParam && styleParam in styles) {
      setResult(styles[styleParam as keyof typeof styles]);
    } else {
      // Default to natural if no valid parameter
      setResult(styles.natural);
    }
  }, [styleParam]);

  // Show loading state
  if (!result) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Makeup Style</h1>
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
        <div className={`py-8 px-6 text-center ${
          styleParam === 'natural' ? 'bg-gradient-to-r from-green-100 to-blue-100' :
          styleParam === 'classic' ? 'bg-gradient-to-r from-pink-100 to-purple-100' :
          styleParam === 'glamorous' ? 'bg-gradient-to-r from-red-100 to-orange-100' :
          'bg-gradient-to-r from-purple-100 to-pink-100'
        }`}>
          <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{result.description}</p>
        </div>
        
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">💄</span> Recommended Products
            </h3>
            
            {/* Product Tabs */}
            <div className="flex border-b mb-4">
              <button
                onClick={() => setActiveTab('budget')}
                className={`py-2 px-4 font-medium ${
                  activeTab === 'budget'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Budget-Friendly
              </button>
              <button
                onClick={() => setActiveTab('premium')}
                className={`py-2 px-4 font-medium ${
                  activeTab === 'premium'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Premium
              </button>
            </div>
            
            {/* Budget Products */}
            {activeTab === 'budget' && (
              <div className="space-y-4">
                {result.products.budget.map((product: any, index: number) => (
                  <div key={index} className="bg-green-50 p-4 rounded-md border border-green-100">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-gray-800">
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition">
                          {product.name}
                        </a>
                      </h4>
                      <span className="font-semibold text-green-600">{product.price}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{product.description}</p>
                    <a 
                      href={product.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-sm text-white font-medium bg-green-600 hover:bg-green-700 transition px-3 py-1 rounded-md"
                    >
                      Shop Now <span className="ml-1">→</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
            
            {/* Premium Products */}
            {activeTab === 'premium' && (
              <div className="space-y-4">
                {result.products.premium.map((product: any, index: number) => (
                  <div key={index} className="bg-purple-50 p-4 rounded-md border border-purple-100">
                    <div className="flex justify-between">
                      <h4 className="font-bold text-gray-800">
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="hover:text-purple-700 transition">
                          {product.name}
                        </a>
                      </h4>
                      <span className="font-semibold text-purple-600">{product.price}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{product.description}</p>
                    <a 
                      href={product.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-sm text-white font-medium bg-purple-600 hover:bg-purple-700 transition px-3 py-1 rounded-md"
                    >
                      Shop Now <span className="ml-1">→</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">✨</span> Techniques to Master
            </h3>
            <div className="space-y-4">
              {result.techniques.map((technique: any, index: number) => (
                <div key={index} className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <h4 className="font-bold text-gray-800 mb-1">{technique.name}</h4>
                  <p className="text-sm text-gray-700 mb-2">{technique.description}</p>
                  
                  {technique.products.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs font-medium text-gray-600">Products needed:</p>
                      <p className="text-sm text-gray-700">{technique.products.join(", ")}</p>
                    </div>
                  )}
                  
                  <a 
                    href={technique.tutorial} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-white font-medium bg-blue-600 hover:bg-blue-700 transition px-3 py-1 rounded-md"
                  >
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                    </svg>
                    Watch Tutorial
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">👍</span> Perfect For
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.perfect_for.map((occasion: any, index: number) => (
                <div key={index} className="bg-amber-50 p-3 rounded-md border border-amber-100 flex justify-between items-center">
                  <p className="text-gray-700">{occasion.occasion}</p>
                  <a 
                    href={occasion.pinterestLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-xs font-medium text-red-600 hover:bg-red-50 px-2 py-1 rounded-md border border-red-200 transition"
                  >
                    <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                    See Inspiration
                  </a>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🌟</span> Celebrity Inspiration
            </h3>
            <p className="text-gray-700 mb-6">{result.inspiration.join(", ")}</p>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
              <h3 className="font-bold text-blue-800 mb-2">Pro Tip</h3>
              <p className="text-blue-700">
                Remember that makeup is a form of self-expression! While these recommendations match your style, always feel free to experiment and adapt them to suit your preferences.
              </p>
            </div>
          </div>
          
          <div className="mt-10 border-t pt-8 flex justify-center space-x-4">
            <Link
              href="/quizzes/makeup-style"
              className="px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition rounded-full font-medium"
            >
              Retake Quiz
            </Link>
            
            <Link
              href="/quizzes"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
            >
              Try Another Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 