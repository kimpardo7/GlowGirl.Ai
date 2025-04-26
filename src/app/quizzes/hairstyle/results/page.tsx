'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HairstyleResults() {
  const searchParams = useSearchParams();
  const styleParam = searchParams.get('style');
  const [result, setResult] = useState<any>(null);

  // Hairstyle data
  const styles = {
    bob: {
      title: "Bob & Lob Styles",
      description: "The bob hairstyle is versatile, classic and flattering for your features. This timeless cut offers the perfect balance of sophistication and ease.",
      best_variations: [
        "Classic bob (chin-length)",
        "Graduated bob (shorter in back, longer in front)",
        "Asymmetrical bob (longer on one side)",
        "Long bob/Lob (falls between chin and shoulders)",
        "Blunt bob with or without bangs",
        "Textured, choppy bob"
      ],
      styling_tips: [
        "Use a round brush while blow-drying for volume and shape",
        "Try beach waves with a flat iron or curling wand for texture",
        "Add side-swept bangs to soften angular face shapes",
        "Use texturizing spray for added movement",
        "Try sleek, straight styling for a more polished look"
      ],
      products_to_try: [
        "Volumizing mousse for fine hair",
        "Smoothing cream for frizz control",
        "Texturizing spray for movement and body",
        "Medium-hold hairspray for style longevity"
      ],
      celebrity_inspiration: ["Victoria Beckham", "Lucy Hale", "Kaia Gerber", "Hailey Bieber"]
    },
    pixie: {
      title: "Pixie & Short Cuts",
      description: "A pixie cut will highlight your features beautifully while offering incredible ease and versatility. This bold, confident style is perfect for your look.",
      best_variations: [
        "Classic pixie with longer top",
        "Textured pixie with choppy layers",
        "Undercut pixie (shaved sides with longer top)",
        "Asymmetrical pixie (longer on one side)",
        "Pixie with long, side-swept bangs",
        "Soft, feminine pixie with subtle layers"
      ],
      styling_tips: [
        "Use pomade or wax for piece-y texture and definition",
        "Try a root lifting product for added height and volume",
        "Blow dry with a small round brush for volume on top",
        "Use a flat iron for sleek looks or to create texture",
        "Embrace your natural texture with a bit of styling cream"
      ],
      products_to_try: [
        "Strong-hold styling wax or pomade",
        "Texturizing paste for definition",
        "Dry shampoo for volume and texture",
        "Root lifting spray for added height"
      ],
      celebrity_inspiration: ["Emma Watson", "Zoë Kravitz", "Audrey Hepburn", "Michelle Williams"]
    },
    long_layers: {
      title: "Long Layered Styles",
      description: "Long, layered hair complements your features beautifully. This versatile style offers endless styling options while enhancing your natural beauty.",
      best_variations: [
        "Face-framing layers",
        "Long layers with curtain bangs",
        "Beachy waves with subtle layers",
        "Long shag with textured ends",
        "U-shaped layers for added volume",
        "Long layers with side-swept bangs"
      ],
      styling_tips: [
        "Use a large barrel curling iron for loose, flowing waves",
        "Try braiding damp hair overnight for heatless waves",
        "Apply volumizing product at the roots when blow-drying",
        "Use a round brush when blow-drying for bounce and movement",
        "Try half-up styles to show off layers while keeping hair off the face"
      ],
      products_to_try: [
        "Lightweight styling oil for shine and frizz control",
        "Heat protectant spray for frequent styling",
        "Texturizing spray for beachy waves",
        "Volumizing mousse for added body"
      ],
      celebrity_inspiration: ["Jennifer Aniston", "Kate Middleton", "Priyanka Chopra", "Jessica Alba"]
    },
    curly_natural: {
      title: "Curly & Natural Styles",
      description: "Your natural texture is beautiful and deserves to be embraced! These styles will enhance your curls while keeping them healthy and defined.",
      best_variations: [
        "Layered curly cut for shape and volume",
        "Curly shag with curtain bangs",
        "Shoulder-length curly bob",
        "Natural curls with undercut",
        "Curly pixie or short cut",
        "Long curly layers with face-framing pieces"
      ],
      styling_tips: [
        "Use the 'plopping' technique after washing for defined curls",
        "Apply styling products to soaking wet hair",
        "Try finger-coiling for more defined curls",
        "Refresh second-day curls with a water and conditioner mix",
        "Use a diffuser attachment when blow-drying to maintain curl pattern"
      ],
      products_to_try: [
        "Curl-enhancing cream or leave-in conditioner",
        "Gel or mousse for curl definition",
        "Lightweight oil for shine and moisture",
        "Deep conditioning mask for weekly treatments"
      ],
      celebrity_inspiration: ["Zendaya", "Tracee Ellis Ross", "Yara Shahidi", "Viola Davis"]
    },
    updo: {
      title: "Updo & Elegant Styles",
      description: "Your features and hair type are perfect for elegant updos and sophisticated styles. These versatile looks can be dressed up or down for any occasion.",
      best_variations: [
        "Classic French twist",
        "Low textured bun or chignon",
        "Half-up, half-down styles",
        "Braided updo variations",
        "High ponytail with volume",
        "Twisted crown or halo styles"
      ],
      styling_tips: [
        "Prep with texturizing spray for better grip and hold",
        "Use dry shampoo at the roots for volume and texture",
        "Try curling or waving hair before styling for added dimension",
        "Master the art of bobby pin placement for secure styles",
        "Gently pull out small pieces around the face for a softer look"
      ],
      products_to_try: [
        "Strong-hold hairspray for lasting styles",
        "Texturizing powder for grip and volume",
        "Edge control or smoothing cream for sleekness",
        "Hair donut or padding for fuller buns"
      ],
      celebrity_inspiration: ["Blake Lively", "Jennifer Lopez", "Lupita Nyong'o", "Ariana Grande"]
    },
    textured_crop: {
      title: "Textured Crop Styles",
      description: "A textured crop will highlight your features beautifully, offering a modern, low-maintenance style with plenty of personality and edge.",
      best_variations: [
        "French crop with textured top",
        "Short sides with longer, textured top",
        "Layered crop with soft fringe",
        "Tapered crop with natural texture",
        "Disconnected undercut with textured top",
        "Short textured crop with subtle highlights"
      ],
      styling_tips: [
        "Apply styling product to damp hair and air dry for natural texture",
        "Use fingers instead of a comb for a more relaxed finish",
        "Try a small amount of pomade or clay for definition without stiffness",
        "Work product through from roots to ends for consistent texture",
        "Use a blow dryer on low heat with fingers for directed, natural-looking volume"
      ],
      products_to_try: [
        "Matte clay or paste for definition without shine",
        "Sea salt spray for natural-looking texture",
        "Light hold styling cream for softer looks",
        "Dry shampoo for added volume and texture"
      ],
      celebrity_inspiration: ["Scarlett Johansson", "Ruby Rose", "Katy Perry", "Charlize Theron"]
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
        
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">✂️</span> Best Variations For You
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.best_variations.map((variation: string, index: number) => (
                  <li key={index} className="text-gray-700">{variation}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">💫</span> Styling Tips
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.styling_tips.map((tip: string, index: number) => (
                  <li key={index} className="text-gray-700">{tip}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🧴</span> Products To Try
              </h3>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                {result.products_to_try.map((product: string, index: number) => (
                  <li key={index} className="text-gray-700">{product}</li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-2xl mr-2">🌟</span> Celebrity Inspiration
              </h3>
              <p className="text-gray-700 mb-6">{result.celebrity_inspiration.join(", ")}</p>
              
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2">Stylist Tip</h3>
                <p className="text-blue-700">
                  Always bring reference photos to your hair appointment! This helps your stylist understand exactly what you're looking for. Remember that your hair texture and density may affect how a style looks on you compared to celebrity examples.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 border-t pt-8 flex justify-center space-x-4">
            <Link
              href="/quizzes/hairstyle"
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