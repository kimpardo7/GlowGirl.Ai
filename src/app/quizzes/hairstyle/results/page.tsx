'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HairstyleResults() {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get('style');
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('variations');

  // Hairstyle data
  const styles = {
    bob: {
      title: "Bob & Lob Styles",
      description: "The bob hairstyle is versatile, classic and flattering for your features. This timeless cut offers the perfect balance of sophistication and ease.",
      best_variations: [
        {
          text: "Classic bob (chin-length with clean lines)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=classic%20bob%20haircut"
        },
        {
          text: "Graduated bob (shorter in back, longer in front for added dimension)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=graduated%20bob%20haircut"
        },
        {
          text: "Asymmetrical bob (longer on one side for a modern edge)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=asymmetrical%20bob%20haircut"
        },
        {
          text: "Long bob/Lob (falls between chin and shoulders, flattering for most face shapes)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=long%20bob%20lob%20haircut"
        },
        {
          text: "Blunt bob with or without bangs (creates the illusion of thickness)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=blunt%20bob%20with%20bangs%20haircut"
        },
        {
          text: "Textured, choppy bob (adds movement and reduces weight in thick hair)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=textured%20choppy%20bob%20haircut"
        }
      ],
      styling_tips: [
        "Use a round brush while blow-drying for volume and shape",
        "Try beach waves with a flat iron or curling wand for texture",
        "Add side-swept bangs to soften angular face shapes",
        "Use texturizing spray for added movement",
        "Try sleek, straight styling for a more polished look"
      ],
      products: {
        budget: [
          {
            name: "Garnier Fructis Sleek & Shine Anti-Frizz Serum",
            price: "$7.99",
            benefits: "Affordable, controls frizz for up to 72 hours, works in high humidity, adds shine",
            cons: "Can feel greasy if over-applied, contains fragrance which may not suit everyone",
            link: "https://www.garnierusa.com/about-our-brands/fructis/sleek-and-shine/sleek-and-shine-anti-frizz-serum"
          },
          {
            name: "L'Oreal Paris Elvive Total Repair 5 Protein Recharge Leave-In Conditioner",
            price: "$6.99",
            benefits: "Strengthens hair, heat protection, reduces breakage",
            cons: "Heavier formula may not work for fine hair, contains some harsh ingredients",
            link: "https://www.lorealparisusa.com/hair-care-hair-style/hair-treatments/elvive-total-repair-5-protein-recharge-treatment"
          },
          {
            name: "Herbal Essences Curl Boosting Mousse",
            price: "$5.99",
            benefits: "Creates soft waves without crunchiness, budget-friendly, 24-hour frizz protection",
            cons: "Limited hold for very thick or coarse hair, contains some fragrance",
            link: "https://herbalessences.com/en-us/our-products/curl-boosting-mousse/"
          }
        ],
        premium: [
          {
            name: "OGX Renewing Argan Oil of Morocco Weightless Healing Dry Oil",
            price: "$10.99",
            benefits: "Affordable, reduces frizz, adds shine without heaviness",
            cons: "Contains silicones which can build up over time, moderate longevity",
            link: "https://www.target.com/p/ogx-renewing-argan-oil-of-morocco-weightless-healing-dry-oil-lightweight-hair-oil-mist-4-fl-oz/-/A-14462800"
          },
          {
            name: "Garnier Fructis Sleek & Shine Anti-Frizz Serum",
            price: "$7.99",
            benefits: "Affordable, controls frizz for up to 72 hours, works in high humidity, adds shine",
            cons: "Can feel greasy if over-applied, contains fragrance which may not suit everyone",
            link: "https://www.garnierusa.com/about-our-brands/fructis/sleek-and-shine/sleek-and-shine-anti-frizz-serum"
          },
          {
            name: "L'Oreal Paris Elvive Total Repair 5 Protein Recharge Leave-In Conditioner",
            price: "$6.99",
            benefits: "Strengthens hair, heat protection, reduces breakage",
            cons: "Heavier formula may not work for fine hair, contains some harsh ingredients",
            link: "https://www.lorealparisusa.com/hair-care-hair-style/hair-treatments/elvive-total-repair-5-protein-recharge-treatment"
          },
          {
            name: "Herbal Essences Tousle Me Softly Mousse",
            price: "$4.99",
            benefits: "Creates soft waves without crunchiness, budget-friendly",
            cons: "Limited hold for thick or coarse hair, contains some drying alcohols",
            link: "https://www.walmart.com/ip/Herbal-Essences-Tousle-Me-Softly-Mousse-6-8-oz/15724908"
          }
        ]
      },
      celebrity_inspiration: ["Victoria Beckham", "Lucy Hale", "Kaia Gerber", "Hailey Bieber"]
    },
    pixie: {
      title: "Pixie & Short Cuts",
      description: "A pixie cut will highlight your features beautifully while offering incredible ease and versatility. This bold, confident style is perfect for your look.",
      best_variations: [
        {
          text: "Classic pixie with longer top (versatile for styling)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=classic%20pixie%20cut%20longer%20top"
        },
        {
          text: "Textured pixie with choppy layers (adds dimension to fine hair)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=textured%20pixie%20choppy%20layers"
        },
        {
          text: "Undercut pixie (shaved sides with longer top for edgy contrast)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=undercut%20pixie%20cut"
        },
        {
          text: "Asymmetrical pixie (longer on one side for a dramatic statement)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=asymmetrical%20pixie%20cut"
        },
        {
          text: "Pixie with long, side-swept bangs (softens jawline and frames eyes)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=pixie%20cut%20side%20swept%20bangs"
        },
        {
          text: "Soft, feminine pixie with subtle layers (gentle transition for first-time short cuts)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=soft%20feminine%20pixie%20cut"
        }
      ],
      styling_tips: [
        "Use pomade or wax for piece-y texture and definition",
        "Try a root lifting product for added height and volume",
        "Blow dry with a small round brush for volume on top",
        "Use a flat iron for sleek looks or to create texture",
        "Embrace your natural texture with a bit of styling cream"
      ],
      products: {
        budget: [
          {
            name: "Got2b Phenomenal Thickening Styling Cream",
            price: "$6.99",
            benefits: "Adds thickness and texture, easy to work with, affordable",
            cons: "Can feel heavy on very fine hair, moderate hold may need reapplication",
            link: "https://www.walmart.com/ip/Got2b-Phenomenal-Thickening-Styling-Cream-6oz/15724893"
          },
          {
            name: "TIGI Bed Head Manipulator Texture Paste",
            price: "$11.99",
            benefits: "Strong flexible hold, matte finish, adds definition to short styles",
            cons: "Can be difficult to wash out, may be too heavy for very fine hair",
            link: "https://www.ulta.com/p/bed-head-manipulator-texture-paste-xlsImpprod4460033"
          },
          {
            name: "Not Your Mother's Beach Babe Texturizing Dry Shampoo",
            price: "$8.99",
            benefits: "Adds texture and freshness, lightweight, pleasant scent",
            cons: "Can leave white residue on dark hair, moderate texture effect",
            link: "https://www.ulta.com/p/beach-babe-texturizing-dry-shampoo-pimprod2007175"
          }
        ],
        premium: [
          {
            name: "Bumble and Bumble Sumotech",
            price: "$32.00",
            benefits: "Hybrid wax-paste-cream, flexible hold with matte finish, a little goes a long way",
            cons: "Expensive for amount, can be too heavy if overapplied",
            link: "https://www.sephora.com/product/sumotech-P280526"
          },
          {
            name: "Kevin Murphy Rough Rider Clay Pomade",
            price: "$42.00",
            benefits: "Strong hold with matte finish, reworkable throughout the day, paraben-free",
            cons: "High price point, can be difficult to wash out completely",
            link: "https://www.amazon.com/KEVIN-MURPHY-Rough-Rider-Ounce/dp/B00BSTIDQY"
          },
          {
            name: "Aveda Control Paste",
            price: "$31.00",
            benefits: "Flexible hold, environmentally conscious packaging, natural ingredients",
            cons: "May not provide enough hold for some styles, pricey",
            link: "https://www.aveda.com/product/17769/16790/styling/finish/control-paste"
          }
        ]
      },
      celebrity_inspiration: ["Emma Watson", "Zoë Kravitz", "Audrey Hepburn", "Michelle Williams"]
    },
    long_layers: {
      title: "Long Layered Styles",
      description: "Long, layered hair complements your features beautifully. This versatile style offers endless styling options while enhancing your natural beauty.",
      best_variations: [
        {
          text: "Face-framing layers (highlights cheekbones and softens jawline)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=face%20framing%20layers%20long%20hair"
        },
        {
          text: "Long layers with curtain bangs (adds volume while framing the face)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=long%20layers%20curtain%20bangs"
        },
        {
          text: "Beachy waves with subtle layers (creates natural movement and dimension)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=beachy%20waves%20subtle%20layers"
        },
        {
          text: "Long shag with textured ends (reduces weight in thick hair)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=long%20shag%20haircut%20textured%20ends"
        },
        {
          text: "U-shaped layers for added volume (creates fullness while maintaining length)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=u%20shaped%20layers%20long%20hair"
        },
        {
          text: "Long layers with side-swept bangs (versatile option for all face shapes)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=long%20layers%20side%20swept%20bangs"
        }
      ],
      styling_tips: [
        "Use a large barrel curling iron for loose, flowing waves",
        "Try braiding damp hair overnight for heatless waves",
        "Apply volumizing product at the roots when blow-drying",
        "Use a round brush when blow-drying for bounce and movement",
        "Try half-up styles to show off layers while keeping hair off the face"
      ],
      products: {
        budget: [
          {
            name: "Garnier Fructis Sleek & Shine Anti-Frizz Serum",
            price: "$7.99",
            benefits: "Affordable, controls frizz for up to 72 hours, works in high humidity, adds shine",
            cons: "Can feel greasy if over-applied, contains fragrance which may not suit everyone",
            link: "https://www.garnierusa.com/about-our-brands/fructis/sleek-and-shine/sleek-and-shine-anti-frizz-serum"
          },
          {
            name: "L'Oreal Paris Elvive Total Repair 5 Protein Recharge Leave-In Conditioner",
            price: "$6.99",
            benefits: "Strengthens hair, heat protection, reduces breakage",
            cons: "Heavier formula may not work for fine hair, contains some harsh ingredients",
            link: "https://www.lorealparisusa.com/hair-care-hair-style/hair-treatments/elvive-total-repair-5-protein-recharge-treatment"
          },
          {
            name: "Herbal Essences Curl Boosting Mousse",
            price: "$5.99",
            benefits: "Creates soft waves without crunchiness, budget-friendly, 24-hour frizz protection",
            cons: "Limited hold for very thick or coarse hair, contains some fragrance",
            link: "https://herbalessences.com/en-us/our-products/curl-boosting-mousse/"
          }
        ],
        premium: [
          {
            name: "Olaplex No. 7 Bonding Oil",
            price: "$30.00",
            benefits: "Repairs damaged bonds, heat protection up to 450°F, reduces frizz, lightweight",
            cons: "Expensive, small bottle size, may be too light for very thick hair",
            link: "https://www.sephora.com/product/no-7-bonding-oil-P447376"
          },
          {
            name: "Moroccanoil Treatment",
            price: "$35.00",
            benefits: "Provides intense conditioning, speeds up drying time, iconic scent",
            cons: "Contains silicones which may build up, can be heavy on fine hair",
            link: "https://www.sephora.com/product/moroccanoil-treatment-P412090"
          },
          {
            name: "Kerastase Discipline Fluidissime Anti-Frizz Spray",
            price: "$37.00",
            benefits: "Professional-grade, heat protection, lasting smoothness, works on all hair types",
            cons: "Very expensive, may need salon guidance for proper use",
            link: "https://www.kerastase.com/products/discipline/fluidissime-anti-frizz-spray"
          }
        ]
      },
      celebrity_inspiration: ["Jennifer Aniston", "Kate Middleton", "Priyanka Chopra", "Jessica Alba"]
    },
    curly_natural: {
      title: "Curly & Natural Styles",
      description: "Your natural texture is beautiful and deserves to be embraced! These styles will enhance your curls while keeping them healthy and defined.",
      best_variations: [
        {
          text: "Layered curly cut for shape and volume (reduces weight while maintaining shape)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=layered%20curly%20cut%20volume"
        },
        {
          text: "Curly shag with curtain bangs (frames face while showcasing texture)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=curly%20shag%20curtain%20bangs"
        },
        {
          text: "Shoulder-length curly bob (low-maintenance yet stylish option)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=shoulder%20length%20curly%20bob"
        },
        {
          text: "Natural curls with undercut (reduces bulk and heat in warmer climates)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=natural%20curls%20undercut"
        },
        {
          text: "Curly pixie or short cut (highlights facial features while embracing texture)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=curly%20pixie%20cut"
        },
        {
          text: "Long curly layers with face-framing pieces (versatile option for styling)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=long%20curly%20layers%20face%20framing"
        }
      ],
      styling_tips: [
        "Use the 'plopping' technique after washing for defined curls",
        "Apply styling products to soaking wet hair",
        "Try finger-coiling for more defined curls",
        "Refresh second-day curls with a water and conditioner mix",
        "Use a diffuser attachment when blow-drying to maintain curl pattern"
      ],
      products: {
        budget: [
          {
            name: "Cantu Shea Butter for Natural Hair Curl Activator Cream",
            price: "$6.49",
            benefits: "Defines curls, affordable, moisturizing, no sulfates or silicones",
            cons: "Can be too heavy for fine curls, contains some allergens like fragrance",
            link: "https://www.target.com/p/cantu-moisturizing-curl-activator-cream-12oz/-/A-16970519"
          },
          {
            name: "Aussie Instant Freeze Gel",
            price: "$3.99",
            benefits: "Strong hold without crunchiness, budget-friendly, helps define curls without weighing them down",
            cons: "Contains some drying alcohols, scent may be strong for some users",
            link: "https://www.aussie.com/en-us/instant-freeze-gel"
          },
          {
            name: "Not Your Mother's Curl Talk Defining Cream",
            price: "$8.99",
            benefits: "Affordable, defines and enhances natural curl pattern, rice protein strengthens hair",
            cons: "May not provide enough hold for very coarse hair, contains some fragrance",
            link: "https://www.notyourmothers.com/products/curl-talk-defining-cream"
          }
        ],
        premium: [
          {
            name: "Curlsmith Curl Conditioning Oil-In-Cream",
            price: "$28.00",
            benefits: "Professional-grade definition, hydrating, reduces frizz, clean ingredients",
            cons: "Expensive, may be too heavy for fine hair types",
            link: "https://www.ulta.com/p/curl-conditioning-oil-in-cream-pimprod2008125"
          },
          {
            name: "Pattern Beauty Leave-In Conditioner",
            price: "$12.00",
            benefits: "Created specifically for curly hair, hydrating, detangling, provides 7x more moisture and 2x less breakage",
            cons: "May be heavy for very fine curls, contains some fragrance",
            link: "https://patternbeauty.com/products/leave-in"
          },
          {
            name: "Ouidad Advanced Climate Control Heat & Humidity Gel",
            price: "$26.00",
            benefits: "Anti-frizz technology, prevents shrinkage, seals cuticle for moisture retention, suitable for all curl types",
            cons: "Expensive, needs specific application technique for best results",
            link: "https://www.ouidad.com/products/advanced-climate-control-heat-humidity-gel"
          }
        ]
      },
      celebrity_inspiration: ["Zendaya", "Tracee Ellis Ross", "Yara Shahidi", "Viola Davis"]
    },
    updo: {
      title: "Updo & Elegant Styles",
      description: "Your features and hair type are perfect for elegant updos and sophisticated styles. These versatile looks can be dressed up or down for any occasion.",
      best_variations: [
        {
          text: "Classic French twist (timeless elegance for formal events)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=classic%20french%20twist%20hairstyle"
        },
        {
          text: "Low textured bun or chignon (versatile for both casual and formal settings)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=low%20textured%20bun%20chignon"
        },
        {
          text: "Half-up, half-down styles (balances sophistication with softness)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=elegant%20half%20up%20half%20down%20hairstyle"
        },
        {
          text: "Braided updo variations (adds texture and interest)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=braided%20updo%20hairstyle"
        },
        {
          text: "High ponytail with volume (modern, youthful take on updos)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=high%20ponytail%20with%20volume"
        },
        {
          text: "Twisted crown or halo styles (romantic option for special occasions)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=twisted%20crown%20halo%20hairstyle"
        }
      ],
      styling_tips: [
        "Prep with texturizing spray for better grip and hold",
        "Use dry shampoo at the roots for volume and texture",
        "Try curling or waving hair before styling for added dimension",
        "Master the art of bobby pin placement for secure styles",
        "Gently pull out small pieces around the face for a softer look"
      ],
      products: {
        budget: [
          {
            name: "L'Oreal Paris Elnett Satin Extra Strong Hold Hairspray",
            price: "$14.99",
            benefits: "Legendary hold, brushes out easily, fine mist application",
            cons: "Strong fragrance, can be sticky if overapplied",
            link: "https://www.ulta.com/p/elnett-satin-extra-strong-hold-hair-spray-xlsImpprod13731083"
          },
          {
            name: "Got2b Glued Blasting Freeze Spray",
            price: "$5.99",
            benefits: "Extremely strong hold, affordable, keeps styles in place all day",
            cons: "Can be difficult to brush out, very stiff finish",
            link: "https://www.walmart.com/ip/Got2b-Glued-Blasting-Freeze-Spray-12-oz/10312577"
          },
          {
            name: "Conair Topsy Tail Hair Tool Kit",
            price: "$7.99",
            benefits: "Creates professional-looking twisted styles easily, affordable",
            cons: "Plastic construction may break with heavy use, limited to certain styles",
            link: "https://www.amazon.com/Conair-55707Z-Styling-Essentials-Bun-Maker/dp/B00DVOZQFU"
          }
        ],
        premium: [
          {
            name: "Oribe Superfine Strong Hair Spray",
            price: "$42.00",
            benefits: "Invisible hold, brushable, humidity resistant, luxurious",
            cons: "Very expensive, may be too light for very thick or coarse hair",
            link: "https://www.oribe.com/oribestorefront/oribe/en/Collections/Superfine-Strong-Hair-Spray/p/400"
          },
          {
            name: "R+Co VICIOUS Strong Hold Flexible Hairspray",
            price: "$32.00",
            benefits: "Buildable hold, workable finish, UV protection, paraben-free",
            cons: "Expensive, can build up with heavy use",
            link: "https://www.randco.com/vicious-strong-hold-flexible-hairspray"
          },
          {
            name: "Bumble and Bumble Thickening Dryspun Texture Spray",
            price: "$32.00",
            benefits: "Creates instant grip and volume for updos, invisible finish",
            cons: "High price point, can leave residue if overused",
            link: "https://www.sephora.com/product/thickening-dryspun-texture-spray-P383166"
          }
        ]
      },
      celebrity_inspiration: ["Blake Lively", "Jennifer Lopez", "Lupita Nyong'o", "Ariana Grande"]
    },
    textured_crop: {
      title: "Textured Crop Styles",
      description: "A textured crop will highlight your features beautifully, offering a modern, low-maintenance style with plenty of personality and edge.",
      best_variations: [
        {
          text: "French crop with textured top (classic yet modern styling)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=french%20crop%20textured%20top"
        },
        {
          text: "Short sides with longer, textured top (versatile for styling options)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=short%20sides%20longer%20textured%20top"
        },
        {
          text: "Layered crop with soft fringe (frames face beautifully)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=layered%20crop%20soft%20fringe"
        },
        {
          text: "Tapered crop with natural texture (embraces natural hair pattern)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=tapered%20crop%20natural%20texture"
        },
        {
          text: "Disconnected undercut with textured top (bold contrast for statement look)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=disconnected%20undercut%20textured%20top"
        },
        {
          text: "Short textured crop with subtle highlights (adds dimension and brightness)",
          pinterestLink: "https://www.pinterest.com/search/pins/?q=short%20textured%20crop%20highlights"
        }
      ],
      styling_tips: [
        "Apply styling product to damp hair and air dry for natural texture",
        "Use fingers instead of a comb for a more relaxed finish",
        "Try a small amount of pomade or clay for definition without stiffness",
        "Work product through from roots to ends for consistent texture",
        "Use a blow dryer on low heat with fingers for directed, natural-looking volume"
      ],
      products: {
        budget: [
          {
            name: "AXE Messy Look Matte Wax",
            price: "$6.99",
            benefits: "Matte finish, strong but pliable hold, affordable",
            cons: "Strong fragrance, can feel waxy if overapplied",
            link: "https://www.target.com/p/axe-messy-look-matte-wax-2-64oz/-/A-51239898"
          },
          {
            name: "Dove Men+Care Controlling Gel",
            price: "$4.99",
            benefits: "Non-greasy formula, medium hold, accessible in most stores",
            cons: "Limited versatility, may flake if layered",
            link: "https://www.target.com/p/dove-men-care-control-gel-7oz/-/A-14898132"
          },
          {
            name: "OGX Flexible + Beeswax Texture Hair Spray Wax",
            price: "$8.99",
            benefits: "Unique spray application, natural ingredients, easy to apply",
            cons: "Limited hold for very thick hair, can be difficult to distribute evenly",
            link: "https://www.target.com/p/ogx-flexible-beeswax-texture-spray-wax-6oz/-/A-16689816"
          }
        ],
        premium: [
          {
            name: "Baxter of California Clay Pomade",
            price: "$23.00",
            benefits: "Matte finish, strong hold, reworkable throughout day, natural ingredients",
            cons: "Expensive, can be difficult to wash out, small jar size",
            link: "https://www.baxterofcalifornia.com/hair/clay-pomade/PPDBOC838364006831.html"
          },
          {
            name: "Hanz de Fuko Quicksand",
            price: "$23.00",
            benefits: "Unique dry shampoo/wax hybrid, creates texture and volume",
            cons: "Learning curve for application, can feel gritty",
            link: "https://www.hanzdefuko.com/products/quicksand"
          },
          {
            name: "American Crew Fiber",
            price: "$18.50",
            benefits: "Industry standard for a reason, versatile matte finish, reliable hold",
            cons: "Can be difficult to work with when hair is too dry, pulls if not applied correctly",
            link: "https://www.americancrew.com/products/style/fiber"
          }
        ]
      },
      celebrity_inspiration: ["Scarlett Johansson", "Ruby Rose", "Katy Perry", "Charlize Theron"],
      texturedCrop: {
        name: "Textured Crop",
        description: "The textured crop is a modern, versatile style featuring short sides and textured hair on top. It's popular for its low-maintenance appeal and stylish look that works for multiple hair types.",
        image: "/images/hairstyles/textured-crop.jpg",
        best_variations: [
          "Classic Textured Crop - Simple and classy with evenly trimmed sides and textured top",
          "Textured Crop Fade - Modern variation with faded sides for stronger contrast",
          "Curly Textured Crop - Perfect for naturally curly hair, embracing your curls with a cropped style",
          "Textured Fringe - Features a longer front section that creates a fringe across the forehead",
          "Short Textured Crop - Extra low-maintenance version with shorter length on top"
        ],
        styling_tips: [
          "Use texturizing products like matte clay or wax to enhance definition",
          "Apply product to slightly damp hair and work through with fingers",
          "For more volume, blow dry hair upward at the roots before styling",
          "Keep sides trimmed regularly (every 2-3 weeks) to maintain the shape",
          "Work product from back to front for the most natural-looking finish"
        ],
        products_to_try: [
          {
            name: "Baxter of California Clay Pomade",
            price: "$23.00",
            benefits: "Strong hold with matte finish, perfect for creating texture without shine",
            cons: "Higher price point, can be difficult to wash out completely",
            link: "https://www.amazon.com/Baxter-California-Clay-Pomade-ounce/dp/B006YZCARNE/"
          },
          {
            name: "Hanz de Fuko Claymation",
            price: "$23.50",
            benefits: "Super high hold with natural matte finish, works well for various hair types",
            cons: "Premium pricing, small container for the cost",
            link: "https://www.amazon.com/Hanz-Fuko-Claymation-Strong-Natural/dp/B00OTF0AEC/"
          },
          {
            name: "TIGI Bed Head Manipulator",
            price: "$10.99",
            benefits: "Budget-friendly texturizer that provides good hold without stiffness",
            cons: "Can feel slightly sticky if too much is applied",
            link: "https://www.amazon.com/TIGI-Bed-Head-Manipulator-Ounce/dp/B002N5MI2S/"
          },
          {
            name: "BluMaan Original Styling Meraki",
            price: "$24.00",
            benefits: "Versatile product that works for multiple hairstyles, natural finish",
            cons: "Slightly higher price point, may not provide enough hold for thicker hair",
            link: "https://blumaan.com/collections/styling-products/products/original-styling-meraki"
          }
        ],
        example_images: [
          {
            url: "https://mendeserve.com/cdn/shop/articles/Textured_Crop_Haircut_for_Curly_Hair_1024x1024.jpg?v=1668678353",
            description: "Textured crop for curly hair - showcases natural texture with tapered sides"
          },
          {
            url: "https://www.menshairstylestoday.com/wp-content/uploads/2020/02/Textured-Crop-Top-Fade-Haircut.jpg",
            description: "Modern textured crop with fade - clean lines with textured top"
          },
          {
            url: "https://i.pinimg.com/originals/25/bd/15/25bd15747b5178f013f58723f24b68ea.jpg",
            description: "Classic textured crop - versatile everyday style"
          },
          {
            url: "https://haircutinspiration.com/wp-content/uploads/Textured-Crop-with-Shaved-Sides.jpg",
            description: "Bold textured crop with shaved sides - dramatic contrast style"
          }
        ]
      }
    }
  };

  useEffect(() => {
    // Set the result based on the URL parameter
    if (styleParam && styleParam in styles) {
      setResult(styles[styleParam as keyof typeof styles]);
    } else {
      // Default to long_layers if no valid parameter
      setResult(styles.long_layers);
    }
  }, [styleParam]);

  // Show loading state
  if (!result) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Your Perfect Hairstyle</h1>
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-8">
        <div className={`py-8 px-6 text-center ${
          styleParam === 'bob' ? 'bg-gradient-to-r from-blue-100 to-purple-100' :
          styleParam === 'pixie' ? 'bg-gradient-to-r from-pink-100 to-red-100' :
          styleParam === 'long_layers' ? 'bg-gradient-to-r from-amber-100 to-yellow-100' :
          styleParam === 'curly_natural' ? 'bg-gradient-to-r from-green-100 to-teal-100' :
          styleParam === 'updo' ? 'bg-gradient-to-r from-purple-100 to-indigo-100' :
          'bg-gradient-to-r from-gray-100 to-blue-100'
        }`}>
          <h2 className="text-2xl font-bold mb-2">{result.title}</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">{result.description}</p>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap -mb-px">
            <button 
              onClick={() => setActiveTab('variations')}
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === 'variations'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Best Variations
            </button>
            <button 
              onClick={() => setActiveTab('styling')}
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === 'styling'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Styling Tips
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === 'products'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Products
            </button>
            <button 
              onClick={() => setActiveTab('inspiration')}
              className={`py-3 px-4 text-sm font-medium ${
                activeTab === 'inspiration'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inspiration
            </button>
          </div>
        </div>
        
        <div className="p-8">
          {/* Variations Tab */}
          {activeTab === 'variations' && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">✂️</span> Best Variations For You
              </h3>
              <ul className="list-none pl-0 space-y-3 mb-6">
                {result.best_variations.map((variation: any, index: number) => (
                  <li key={index} className="bg-white border border-gray-200 rounded-lg p-4 transition hover:shadow-md">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700">{variation.text}</p>
                      <a 
                        href={variation.pinterestLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md border border-red-200 transition"
                      >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                        </svg>
                        See Examples
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
              
          {/* Styling Tips Tab */}
          {activeTab === 'styling' && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">💫</span> Styling Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.styling_tips.map((tip: string, index: number) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100 mt-6">
                <h3 className="font-bold text-blue-800 mb-2">Stylist Tip</h3>
                <p className="text-blue-700">
                  Always bring reference photos to your hair appointment! This helps your stylist understand exactly what you're looking for. Remember that your hair texture and density may affect how a style looks on you compared to celebrity examples.
                </p>
              </div>
            </div>
          )}
            
          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="text-2xl mr-2">🧴</span> Recommended Products
              </h3>
              
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3 text-green-600">Budget-Friendly Options</h4>
                <div className="space-y-4">
                  {result.products.budget.map((product: any, index: number) => (
                    <div key={index} className="bg-green-50 p-4 rounded-md border border-green-100">
                      <div className="flex justify-between">
                        <h5 className="font-bold text-gray-800">
                          <a href={product.link} target="_blank" rel="noopener noreferrer" className="hover:text-green-700 transition">
                            {product.name}
                          </a>
                        </h5>
                        <span className="font-semibold text-green-600">{product.price}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm"><span className="font-semibold text-green-700">Benefits:</span> {product.benefits}</p>
                        <p className="text-sm mt-1"><span className="font-semibold text-red-700">Cons:</span> {product.cons}</p>
                      </div>
                      <div className="mt-3">
                        <a 
                          href={product.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white bg-green-600 px-4 py-1.5 rounded-md hover:bg-green-700 transition inline-flex items-center"
                        >
                          Shop Now <span className="ml-1">→</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-600">Premium Options</h4>
                <div className="space-y-4">
                  {result.products.premium.map((product: any, index: number) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-md border border-purple-100">
                      <div className="flex justify-between">
                        <h5 className="font-bold text-gray-800">
                          <a href={product.link} target="_blank" rel="noopener noreferrer" className="hover:text-purple-700 transition">
                            {product.name}
                          </a>
                        </h5>
                        <span className="font-semibold text-purple-600">{product.price}</span>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm"><span className="font-semibold text-green-700">Benefits:</span> {product.benefits}</p>
                        <p className="text-sm mt-1"><span className="font-semibold text-red-700">Cons:</span> {product.cons}</p>
                      </div>
                      <div className="mt-3">
                        <a 
                          href={product.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-white bg-purple-600 px-4 py-1.5 rounded-md hover:bg-purple-700 transition inline-flex items-center"
                        >
                          Shop Now <span className="ml-1">→</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Inspiration Tab */}
          {activeTab === 'inspiration' && (
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🌟</span> Celebrity Inspiration
              </h3>
              <p className="text-gray-700 mb-6">{result.celebrity_inspiration.join(", ")}</p>
              
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                <h3 className="font-bold text-amber-800 mb-2">Finding Your Style</h3>
                <p className="text-amber-700">
                  Save photos of celebrities with your hair type and face shape for inspiration. Remember that lighting, professional styling, and photo editing can make celebrity hair look different in pictures than in real life.
                </p>
              </div>
            </div>
          )}
          </div>
          
        <div className="mt-6 border-t pt-8 flex justify-center space-x-4 px-8 pb-8">
            <Link
              href="/quizzes/hairstyle"
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition"
            >
              Retake Quiz
            </Link>
            <Link
              href="/quizzes"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium transition"
            >
            Try Other Quizzes
            </Link>
        </div>
      </div>

      {/* Example Images Section */}
      {styleParam === 'textured_crop' && result.texturedCrop && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Style Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.texturedCrop.example_images.map((example: { url: string; description: string }, index: number) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 relative">
                  <Image 
                    src={example.url} 
                    alt={example.description}
                    fill
                    style={{objectFit: 'cover'}}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{example.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 