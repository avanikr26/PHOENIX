/**
 * PortraitAssets.ts — High-fidelity SVG Character Portraits
 * 
 * Pixel-art / Visual Novel anime style matching the reference images:
 * - Fatima (purple hijab, expressive eyes, worried/sad, smiling, joyous clasping hands)
 * - Ava (purple hair, green gamer headset, teal jacket)
 * - Rahul (dark hair, sunglasses, navy jacket, cane)
 * - Grandma Mira (silver hair, glasses, warm orange cardigan)
 */

export type CharacterMood = 'neutral' | 'worried' | 'happy' | 'joyous';

export class PortraitAssets {
  /**
   * Generates crisp, high-detail SVG for Fatima matching Image 1
   */
  public static getFatimaSVG(mood: CharacterMood = 'worried', size = 180): string {
    const isHappy = mood === 'happy' || mood === 'joyous';
    const isJoyous = mood === 'joyous';

    // Eyes: worried (tilted eyebrows, sad pupils) vs happy (curved closed arcs or glowing eyes)
    const eyes = isHappy ? `
      <!-- Happy closed smiling eyes -->
      <path d="M 52 75 Q 62 65 72 75" fill="none" stroke="#2d1537" stroke-width="4" stroke-linecap="round" />
      <path d="M 108 75 Q 118 65 128 75" fill="none" stroke="#2d1537" stroke-width="4" stroke-linecap="round" />
      <!-- Cheeks blush -->
      <ellipse cx="50" cy="85" rx="10" ry="6" fill="#f472b6" opacity="0.6" />
      <ellipse cx="130" cy="85" rx="10" ry="6" fill="#f472b6" opacity="0.6" />
    ` : `
      <!-- Worried expressive anime eyes -->
      <ellipse cx="62" cy="74" rx="10" ry="12" fill="#2d1537" />
      <ellipse cx="118" cy="74" rx="10" ry="12" fill="#2d1537" />
      <circle cx="64" cy="70" r="4" fill="#ffffff" />
      <circle cx="120" cy="70" r="4" fill="#ffffff" />
      <circle cx="59" cy="78" r="2" fill="#e9d5ff" />
      <circle cx="115" cy="78" r="2" fill="#e9d5ff" />
      <!-- Worried tilted eyebrows -->
      <path d="M 50 58 Q 62 52 74 60" fill="none" stroke="#3b1d4a" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 106 60 Q 118 52 130 58" fill="none" stroke="#3b1d4a" stroke-width="3.5" stroke-linecap="round" />
      <!-- Soft subtle blush -->
      <ellipse cx="52" cy="86" rx="8" ry="4" fill="#f472b6" opacity="0.35" />
      <ellipse cx="128" cy="86" rx="8" ry="4" fill="#f472b6" opacity="0.35" />
    `;

    // Mouth
    const mouth = isJoyous ? `
      <!-- Joyful open smile -->
      <path d="M 80 94 Q 90 108 100 94 Z" fill="#dc2626" />
      <path d="M 83 95 Q 90 98 97 95" fill="none" stroke="#ffffff" stroke-width="2" />
    ` : isHappy ? `
      <!-- Happy gentle smile -->
      <path d="M 80 94 Q 90 104 100 94" fill="none" stroke="#6b21a8" stroke-width="3.5" stroke-linecap="round" />
    ` : `
      <!-- Worried small mouth -->
      <path d="M 82 96 Q 90 92 98 96" fill="none" stroke="#6b21a8" stroke-width="3" stroke-linecap="round" />
    `;

    // Clasping hands for Joyous/Reaction state
    const hands = isJoyous ? `
      <!-- Clasping hands in prayer/gratitude pose -->
      <g transform="translate(68, 128)">
        <path d="M 10 25 Q 12 5 22 2 Q 32 5 34 25 Z" fill="#e6a86c" stroke="#582a0b" stroke-width="2" />
        <!-- Sleeves -->
        <path d="M 0 35 L 14 20 L 22 35 Z" fill="#5b21b6" />
        <path d="M 44 35 L 30 20 L 22 35 Z" fill="#5b21b6" />
      </g>
    ` : `
      <!-- Hand on chest (worried/thoughtful pose) -->
      <g transform="translate(75, 135)">
        <path d="M 5 15 Q 15 5 25 15 Q 20 28 5 25 Z" fill="#e6a86c" stroke="#582a0b" stroke-width="2" />
      </g>
    `;

    return `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 180 225" xmlns="http://www.w3.org/2000/svg" style="display:block; image-rendering: crisp-edges;">
        <defs>
          <radialGradient id="fatima-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="hijab-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7c3aed"/>
            <stop offset="60%" stop-color="#5b21b6"/>
            <stop offset="100%" stop-color="#3b0764"/>
          </linearGradient>
          <linearGradient id="jacket-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d97706"/>
            <stop offset="100%" stop-color="#92400e"/>
          </linearGradient>
        </defs>

        <!-- Glow backdrop -->
        <circle cx="90" cy="100" r="85" fill="url(#fatima-glow)" />

        <!-- Base Body / Jacket (Warm mustard/tan jacket from Image 1) -->
        <path d="M 30 150 Q 90 135 150 150 L 170 225 L 10 225 Z" fill="url(#jacket-grad)" stroke="#451a03" stroke-width="3" />

        <!-- Hijab Back Fold -->
        <path d="M 30 80 Q 20 130 45 180 Q 90 195 135 180 Q 160 130 150 80 Q 140 20 90 20 Q 40 20 30 80 Z" fill="url(#hijab-grad)" stroke="#2e1065" stroke-width="3" />

        <!-- Hijab Inner Shadow -->
        <ellipse cx="90" cy="85" rx="52" ry="58" fill="#4c1d95" />

        <!-- Face Base (Warm skin) -->
        <path d="M 46 72 Q 42 110 90 118 Q 138 110 134 72 Q 130 45 90 45 Q 50 45 46 72 Z" fill="#fbd38d" stroke="#582a0b" stroke-width="2.5" />

        <!-- Hijab Forehead wrap & gentle folds -->
        <path d="M 44 60 Q 90 40 136 60 Q 120 42 90 42 Q 60 42 44 60 Z" fill="#6d28d9" />
        <path d="M 46 72 Q 40 100 52 112 Q 46 90 52 70 Z" fill="#5b21b6" opacity="0.7" />
        <path d="M 134 72 Q 140 100 128 112 Q 134 90 128 70 Z" fill="#5b21b6" opacity="0.7" />

        <!-- Hijab Chest Wrap -->
        <path d="M 48 115 Q 90 145 132 115 Q 145 155 125 185 Q 90 195 55 185 Q 35 155 48 115 Z" fill="url(#hijab-grad)" stroke="#2e1065" stroke-width="3" />
        <path d="M 65 130 Q 90 155 115 130" fill="none" stroke="#9333ea" stroke-width="2.5" />

        <!-- Nose -->
        <path d="M 88 84 Q 90 89 94 88" fill="none" stroke="#c05621" stroke-width="2" stroke-linecap="round" />

        <!-- Dynamic Eyes -->
        ${eyes}

        <!-- Dynamic Mouth -->
        ${mouth}

        <!-- Dynamic Hands Pose -->
        ${hands}
      </svg>
    `;
  }

  /**
   * Generates crisp Ava SVG (Guide with purple hair & headset matching Image 2)
   */
  public static getAvaSVG(size = 180): string {
    return `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 180 225" xmlns="http://www.w3.org/2000/svg" style="display:block; image-rendering: crisp-edges;">
        <defs>
          <radialGradient id="ava-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#064e3b" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="jacket-teal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#059669"/>
            <stop offset="100%" stop-color="#065f46"/>
          </linearGradient>
          <linearGradient id="hair-purple" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#a855f7"/>
            <stop offset="100%" stop-color="#6b21a8"/>
          </linearGradient>
        </defs>

        <circle cx="90" cy="100" r="85" fill="url(#ava-glow)" />

        <!-- Body / Jacket -->
        <path d="M 25 150 Q 90 135 155 150 L 175 225 L 5 225 Z" fill="url(#jacket-teal)" stroke="#064e3b" stroke-width="3" />
        <!-- Pink inner shirt -->
        <path d="M 70 145 L 90 175 L 110 145 Z" fill="#f472b6" stroke="#9d174d" stroke-width="2" />

        <!-- Neck -->
        <rect x="78" y="110" width="24" height="30" fill="#fbd38d" stroke="#582a0b" stroke-width="2" />

        <!-- Hair Back -->
        <path d="M 35 60 Q 20 120 40 140 Q 90 150 140 140 Q 160 120 145 60 Z" fill="url(#hair-purple)" />

        <!-- Head / Face -->
        <path d="M 48 65 Q 45 110 90 118 Q 135 110 132 65 Q 128 35 90 35 Q 52 35 48 65 Z" fill="#fbd38d" stroke="#582a0b" stroke-width="2.5" />

        <!-- Purple Bangs / Bob Hair -->
        <path d="M 40 55 Q 60 25 90 25 Q 130 25 142 55 Q 135 75 125 55 Q 105 85 90 50 Q 75 85 55 55 Q 45 75 40 55 Z" fill="url(#hair-purple)" stroke="#3b0764" stroke-width="2.5" />

        <!-- Gaming Headset (Green & Black from Image 2) -->
        <path d="M 32 60 Q 90 10 148 60" fill="none" stroke="#10b981" stroke-width="8" stroke-linecap="round" />
        <path d="M 32 60 Q 90 10 148 60" fill="none" stroke="#047857" stroke-width="4" stroke-linecap="round" />
        <!-- Earcups -->
        <rect x="22" y="55" width="16" height="32" rx="8" fill="#10b981" stroke="#064e3b" stroke-width="2.5" />
        <circle cx="30" cy="71" r="5" fill="#047857" />
        <rect x="142" y="55" width="16" height="32" rx="8" fill="#10b981" stroke="#064e3b" stroke-width="2.5" />
        <circle cx="150" cy="71" r="5" fill="#047857" />
        <!-- Headset Mic -->
        <path d="M 30 75 Q 45 105 70 100" fill="none" stroke="#1f2937" stroke-width="3.5" stroke-linecap="round" />
        <circle cx="70" cy="100" r="4" fill="#10b981" />

        <!-- Big Expressive Anime Eyes -->
        <ellipse cx="65" cy="74" rx="10" ry="13" fill="#1e3a8a" />
        <ellipse cx="115" cy="74" rx="10" ry="13" fill="#1e3a8a" />
        <circle cx="67" cy="70" r="4.5" fill="#ffffff" />
        <circle cx="117" cy="70" r="4.5" fill="#ffffff" />
        <circle cx="63" cy="78" r="2.5" fill="#60a5fa" />
        <circle cx="113" cy="78" r="2.5" fill="#60a5fa" />

        <!-- Eyebrows -->
        <path d="M 52 58 Q 65 52 76 57" fill="none" stroke="#3b0764" stroke-width="3" stroke-linecap="round" />
        <path d="M 104 57 Q 115 52 128 58" fill="none" stroke="#3b0764" stroke-width="3" stroke-linecap="round" />

        <!-- Cheeks -->
        <ellipse cx="54" cy="85" rx="8" ry="4" fill="#f472b6" opacity="0.6" />
        <ellipse cx="126" cy="85" rx="8" ry="4" fill="#f472b6" opacity="0.6" />

        <!-- Smile -->
        <path d="M 80 94 Q 90 106 100 94" fill="none" stroke="#9d174d" stroke-width="3.5" stroke-linecap="round" />
      </svg>
    `;
  }

  /**
   * Generates Rahul SVG (with sunglasses and white cane)
   */
  public static getRahulSVG(size = 180): string {
    return `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 180 225" xmlns="http://www.w3.org/2000/svg" style="display:block; image-rendering: crisp-edges;">
        <defs>
          <radialGradient id="rahul-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#172554" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="rahul-jacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1e3a8a"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
        </defs>

        <circle cx="90" cy="100" r="85" fill="url(#rahul-glow)" />

        <!-- Jacket & Shirt -->
        <path d="M 25 150 Q 90 135 155 150 L 175 225 L 5 225 Z" fill="url(#rahul-jacket)" stroke="#0f172a" stroke-width="3" />
        <!-- White Cane resting on shoulder -->
        <line x1="25" y1="90" x2="15" y2="225" stroke="#ffffff" stroke-width="6" stroke-linecap="round" />
        <line x1="25" y1="90" x2="21" y2="130" stroke="#dc2626" stroke-width="6" stroke-linecap="round" />

        <!-- Neck -->
        <rect x="78" y="110" width="24" height="30" fill="#fbd38d" stroke="#582a0b" stroke-width="2" />

        <!-- Head / Face -->
        <path d="M 48 65 Q 45 110 90 118 Q 135 110 132 65 Q 128 35 90 35 Q 52 35 48 65 Z" fill="#fbd38d" stroke="#582a0b" stroke-width="2.5" />

        <!-- Short Dark Hair -->
        <path d="M 44 58 Q 50 25 90 25 Q 130 25 136 58 Q 125 40 90 40 Q 55 40 44 58 Z" fill="#1e1b18" stroke="#000000" stroke-width="2" />

        <!-- Stylish Dark Sunglasses -->
        <rect x="46" y="62" width="38" height="24" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2" />
        <rect x="96" y="62" width="38" height="24" rx="4" fill="#0f172a" stroke="#334155" stroke-width="2" />
        <line x1="84" y1="72" x2="96" y2="72" stroke="#334155" stroke-width="3" />
        <!-- Glasses reflection -->
        <path d="M 50 66 L 70 82" stroke="#60a5fa" stroke-width="2" opacity="0.7" stroke-linecap="round" />
        <path d="M 100 66 L 120 82" stroke="#60a5fa" stroke-width="2" opacity="0.7" stroke-linecap="round" />

        <!-- Confident Smile -->
        <path d="M 78 96 Q 90 106 102 96" fill="none" stroke="#92400e" stroke-width="3" stroke-linecap="round" />
      </svg>
    `;
  }

  /**
   * Generates Grandma Mira SVG
   */
  public static getGrandmaSVG(size = 180): string {
    return `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 180 225" xmlns="http://www.w3.org/2000/svg" style="display:block; image-rendering: crisp-edges;">
        <defs>
          <radialGradient id="grandma-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#78350f" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <circle cx="90" cy="100" r="85" fill="url(#grandma-glow)" />

        <!-- Cardigan (Warm orange) -->
        <path d="M 25 150 Q 90 135 155 150 L 175 225 L 5 225 Z" fill="#d97706" stroke="#78350f" stroke-width="3" />
        <path d="M 75 145 L 90 175 L 105 145 Z" fill="#fef3c7" stroke="#b45309" stroke-width="2" />

        <!-- Neck -->
        <rect x="78" y="110" width="24" height="30" fill="#fed7aa" stroke="#582a0b" stroke-width="2" />

        <!-- Silver Hair Bun -->
        <circle cx="90" cy="30" r="22" fill="#cbd5e1" stroke="#64748b" stroke-width="2" />
        <!-- Head -->
        <path d="M 48 65 Q 45 110 90 118 Q 135 110 132 65 Q 128 35 90 35 Q 52 35 48 65 Z" fill="#fed7aa" stroke="#582a0b" stroke-width="2.5" />
        <path d="M 44 58 Q 50 32 90 32 Q 130 32 136 58 Q 120 40 90 40 Q 60 40 44 58 Z" fill="#cbd5e1" stroke="#64748b" stroke-width="2" />

        <!-- Glasses Frames (Pinkish/Gold) -->
        <circle cx="66" cy="72" r="14" fill="rgba(255,255,255,0.4)" stroke="#ec4899" stroke-width="3" />
        <circle cx="114" cy="72" r="14" fill="rgba(255,255,255,0.4)" stroke="#ec4899" stroke-width="3" />
        <line x1="80" y1="72" x2="100" y2="72" stroke="#ec4899" stroke-width="3" />

        <!-- Kind Eyes -->
        <path d="M 58 73 Q 66 67 74 73" fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round" />
        <path d="M 106 73 Q 114 67 122 73" fill="none" stroke="#334155" stroke-width="3" stroke-linecap="round" />

        <!-- Rosy Cheeks -->
        <ellipse cx="52" cy="86" rx="9" ry="5" fill="#f43f5e" opacity="0.45" />
        <ellipse cx="128" cy="86" rx="9" ry="5" fill="#f43f5e" opacity="0.45" />

        <!-- Warm Grannie Smile -->
        <path d="M 76 96 Q 90 106 104 96" fill="none" stroke="#b45309" stroke-width="3.5" stroke-linecap="round" />
      </svg>
    `;
  }

  /**
   * Generates Kofi SVG (Motor Accessibility Advocate)
   */
  public static getKofiSVG(size = 180): string {
    return `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 180 225" xmlns="http://www.w3.org/2000/svg" style="display:block; image-rendering: crisp-edges;">
        <defs>
          <radialGradient id="kofi-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#1e3a8a" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="kofi-jacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563eb"/>
            <stop offset="100%" stop-color="#1d4ed8"/>
          </linearGradient>
        </defs>

        <circle cx="90" cy="100" r="85" fill="url(#kofi-glow)" />

        <!-- Hoodie / Jacket -->
        <path d="M 25 150 Q 90 135 155 150 L 175 225 L 5 225 Z" fill="url(#kofi-jacket)" stroke="#1e3a8a" stroke-width="3" />
        <path d="M 75 145 L 90 180 L 105 145 Z" fill="#93c5fd" stroke="#1e40af" stroke-width="2" />

        <!-- Neck -->
        <rect x="78" y="110" width="24" height="30" fill="#fcd34d" stroke="#582a0b" stroke-width="2" />

        <!-- Head / Face -->
        <path d="M 48 65 Q 45 110 90 118 Q 135 110 132 65 Q 128 35 90 35 Q 52 35 48 65 Z" fill="#fcd34d" stroke="#582a0b" stroke-width="2.5" />

        <!-- Short Dark Textured Hair -->
        <path d="M 44 55 Q 50 22 90 22 Q 130 22 136 55 Q 120 32 90 32 Q 60 32 44 55 Z" fill="#171717" stroke="#000000" stroke-width="2" />

        <!-- Focused Expressive Eyes -->
        <ellipse cx="65" cy="74" rx="9" ry="11" fill="#1e293b" />
        <ellipse cx="115" cy="74" rx="9" ry="11" fill="#1e293b" />
        <circle cx="67" cy="71" r="3.5" fill="#ffffff" />
        <circle cx="117" cy="71" r="3.5" fill="#ffffff" />

        <!-- Confident Eyebrows -->
        <path d="M 52 60 Q 64 54 76 60" fill="none" stroke="#171717" stroke-width="3" stroke-linecap="round" />
        <path d="M 104 60 Q 116 54 128 60" fill="none" stroke="#171717" stroke-width="3" stroke-linecap="round" />

        <!-- Smile -->
        <path d="M 78 96 Q 90 106 102 96" fill="none" stroke="#92400e" stroke-width="3" stroke-linecap="round" />
      </svg>
    `;
  }

  /**
   * Generates Elena SVG (Cognitive Clarity Advocate)
   */
  public static getElenaSVG(size = 180): string {
    return `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 180 225" xmlns="http://www.w3.org/2000/svg" style="display:block; image-rendering: crisp-edges;">
        <defs>
          <radialGradient id="elena-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#064e3b" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="elena-jacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#059669"/>
            <stop offset="100%" stop-color="#047857"/>
          </linearGradient>
        </defs>

        <circle cx="90" cy="100" r="85" fill="url(#elena-glow)" />

        <!-- Cardigan / Top -->
        <path d="M 25 150 Q 90 135 155 150 L 175 225 L 5 225 Z" fill="url(#elena-jacket)" stroke="#064e3b" stroke-width="3" />
        <path d="M 75 145 L 90 175 L 105 145 Z" fill="#d1fae5" stroke="#047857" stroke-width="2" />

        <!-- Neck -->
        <rect x="78" y="110" width="24" height="30" fill="#fed7aa" stroke="#582a0b" stroke-width="2" />

        <!-- Medium Auburn Bob Hair Back -->
        <path d="M 38 60 Q 25 120 45 135 Q 90 145 135 135 Q 155 120 142 60 Z" fill="#573418" />

        <!-- Head / Face -->
        <path d="M 48 65 Q 45 110 90 118 Q 135 110 132 65 Q 128 35 90 35 Q 52 35 48 65 Z" fill="#fed7aa" stroke="#582a0b" stroke-width="2.5" />

        <!-- Hair Bangs -->
        <path d="M 42 55 Q 60 28 90 28 Q 125 28 138 55 Q 115 48 90 42 Q 65 48 42 55 Z" fill="#573418" stroke="#3b1d0c" stroke-width="2" />

        <!-- Warm Gentle Eyes -->
        <ellipse cx="65" cy="74" rx="9" ry="12" fill="#1e3a8a" />
        <ellipse cx="115" cy="74" rx="9" ry="12" fill="#1e3a8a" />
        <circle cx="67" cy="70" r="4" fill="#ffffff" />
        <circle cx="117" cy="70" r="4" fill="#ffffff" />

        <!-- Round Glasses -->
        <circle cx="65" cy="74" r="15" fill="rgba(255,255,255,0.3)" stroke="#059669" stroke-width="2.5" />
        <circle cx="115" cy="74" r="15" fill="rgba(255,255,255,0.3)" stroke="#059669" stroke-width="2.5" />
        <line x1="80" y1="74" x2="100" y2="74" stroke="#059669" stroke-width="2.5" />

        <!-- Gentle Smile -->
        <path d="M 80 96 Q 90 105 100 96" fill="none" stroke="#92400e" stroke-width="3" stroke-linecap="round" />
      </svg>
    `;
  }

  /**
   * Generates Yuki SVG (Language / Plain Language Advocate)
   */
  public static getYukiSVG(size = 180): string {
    return `
      <svg width="${size}" height="${size * 1.25}" viewBox="0 0 180 225" xmlns="http://www.w3.org/2000/svg" style="display:block; image-rendering: crisp-edges;">
        <defs>
          <radialGradient id="yuki-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="#78350f" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="yuki-jacket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d97706"/>
            <stop offset="100%" stop-color="#b45309"/>
          </linearGradient>
        </defs>

        <circle cx="90" cy="100" r="85" fill="url(#yuki-glow)" />

        <!-- Cardigan / Coat -->
        <path d="M 25 150 Q 90 135 155 150 L 175 225 L 5 225 Z" fill="url(#yuki-jacket)" stroke="#78350f" stroke-width="3" />
        <path d="M 75 145 L 90 175 L 105 145 Z" fill="#fef3c7" stroke="#92400e" stroke-width="2" />

        <!-- Neck -->
        <rect x="78" y="110" width="24" height="30" fill="#fcd34d" stroke="#582a0b" stroke-width="2" />

        <!-- Straight Black Hair Back -->
        <path d="M 36 55 L 36 140 Q 90 150 144 140 L 144 55 Z" fill="#18181b" />

        <!-- Head / Face -->
        <path d="M 48 65 Q 45 110 90 118 Q 135 110 132 65 Q 128 35 90 35 Q 52 35 48 65 Z" fill="#fcd34d" stroke="#582a0b" stroke-width="2.5" />

        <!-- Straight Dark Fringe Bangs -->
        <path d="M 42 52 Q 60 25 90 25 Q 125 25 138 52 Q 115 56 90 56 Q 65 56 42 52 Z" fill="#18181b" stroke="#000000" stroke-width="2" />

        <!-- Amber / Yellow Hairband -->
        <path d="M 44 48 Q 90 22 136 48" fill="none" stroke="#fbbf24" stroke-width="5" stroke-linecap="round" />

        <!-- Expressive Dark Eyes -->
        <ellipse cx="65" cy="74" rx="9" ry="12" fill="#18181b" />
        <ellipse cx="115" cy="74" rx="9" ry="12" fill="#18181b" />
        <circle cx="67" cy="70" r="4" fill="#ffffff" />
        <circle cx="117" cy="70" r="4" fill="#ffffff" />

        <!-- Cheeks -->
        <ellipse cx="54" cy="86" rx="8" ry="4" fill="#f472b6" opacity="0.5" />
        <ellipse cx="126" cy="86" rx="8" ry="4" fill="#f472b6" opacity="0.5" />

        <!-- Warm Inquisitive Smile -->
        <path d="M 80 96 Q 90 106 100 96" fill="none" stroke="#92400e" stroke-width="3" stroke-linecap="round" />
      </svg>
    `;
  }
}
