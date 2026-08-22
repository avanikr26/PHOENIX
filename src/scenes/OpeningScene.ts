import Phaser from 'phaser';
import gsap from 'gsap';
import { audioService } from '../services/AudioService';
import { gameStateManager } from '../core/GameStateManager';
import { ThreeDevRoom } from '../three/ThreeDevRoom';
import { supabaseClient } from '../core/SupabaseClient';

export class OpeningScene extends Phaser.Scene {
  private domOverlay: HTMLDivElement | null = null;
  private threeDevRoom: ThreeDevRoom | null = null;

  constructor() {
    super('OpeningScene');
  }

  create() {
    const { width, height } = this.scale;
    gameStateManager.setCurrentScene('OpeningScene');

    // Solid dark backdrop
    this.add.rectangle(0, 0, width * 2, height * 2, 0x0a0a14);

    // Start with cinematic initializing screen
    this.runProfileSetup();
  }

  private runProfileSetup() {
    const root = document.getElementById('dom-overlay') ?? document.body;
    this.domOverlay = document.createElement('div');
    this.domOverlay.id = 'opening-overlay';
    this.domOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #0a0a14;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: var(--font-body);
      pointer-events: auto;
      overflow-y: auto;
    `;

    this.domOverlay.innerHTML = `
      <div style="max-width: 500px; width: 100%; display: flex; flex-direction: column; gap: 20px; background: #111827; border: 2px solid #374151; padding: 32px; border-radius: 8px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
        <!-- Title -->
        <h1 style="font-family: var(--font-pixel); font-size: 15px; color: #f8fafc; text-align: center; margin-bottom: 8px; letter-spacing: 0.5px;">
          ENTER USER PROFILE
        </h1>

        <!-- Error Alert -->
        <div id="form-error-banner" style="display: none; background: #fef2f2; border: 1.5px solid #fca5a5; color: #b91c1c; font-size: 13px; font-weight: 600; padding: 10px 14px; border-radius: 4px; line-height: 1.4;"></div>

        <!-- Name Input -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label for="profile-name" style="font-size: 14px; font-weight: bold; color: #cbd5e1;">Name *</label>
          <input id="profile-name" type="text" placeholder="Enter your name" style="width: 100%; border: 1.5px solid #4b5563; border-radius: 4px; padding: 10px 12px; background: #1f2937; color: #ffffff; font-size: 15px; outline: none; transition: border-color 0.2s;" />
        </div>

        <!-- Email Input -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label for="profile-email" style="font-size: 14px; font-weight: bold; color: #cbd5e1;">Email *</label>
          <input id="profile-email" type="email" placeholder="Enter your email" style="width: 100%; border: 1.5px solid #4b5563; border-radius: 4px; padding: 10px 12px; background: #1f2937; color: #ffffff; font-size: 15px; outline: none;" />
        </div>

        <!-- Password Input -->
        <div style="display: flex; flex-direction: column; gap: 6px; position: relative;">
          <label for="profile-password" style="font-size: 14px; font-weight: bold; color: #cbd5e1;">Password *</label>
          <input id="profile-password" type="password" placeholder="Create a strong password" style="width: 100%; border: 1.5px solid #4b5563; border-radius: 4px; padding: 10px 12px; background: #1f2937; color: #ffffff; font-size: 15px; outline: none;" />
          
          <!-- Strength Bar -->
          <div style="width: 100%; height: 6px; background: #374151; border-radius: 3px; overflow: hidden; margin-top: 4px;">
            <div id="strength-bar" style="width: 0%; height: 100%; background: #ef4444; transition: width 0.3s, background-color 0.3s;"></div>
          </div>
          <span id="strength-label" style="font-size: 11px; font-weight: bold; color: #9ca3af; text-transform: uppercase;">Weak</span>
        </div>

        <!-- Password Checklist -->
        <div style="background: #1f2937; padding: 12px; border-radius: 4px; display: flex; flex-direction: column; gap: 6px;">
          <div style="font-size: 12px; font-weight: bold; color: #9ca3af; margin-bottom: 2px;">PASSWORD REQUIREMENTS:</div>
          <div id="req-length" style="font-size: 11px; color: #ef4444; display: flex; align-items: center; gap: 6px;">❌ At least 8 characters</div>
          <div id="req-upper" style="font-size: 11px; color: #ef4444; display: flex; align-items: center; gap: 6px;">❌ At least 1 uppercase letter</div>
          <div id="req-lower" style="font-size: 11px; color: #ef4444; display: flex; align-items: center; gap: 6px;">❌ At least 1 lowercase letter</div>
          <div id="req-number" style="font-size: 11px; color: #ef4444; display: flex; align-items: center; gap: 6px;">❌ At least 1 number</div>
          <div id="req-special" style="font-size: 11px; color: #ef4444; display: flex; align-items: center; gap: 6px;">❌ At least 1 special character</div>
        </div>

        <!-- CTA Button -->
        <button id="create-profile-btn" style="
          width: 100%;
          background: #c9a84c;
          border: 2px solid #fbbf24;
          color: #111827;
          font-family: var(--font-pixel);
          font-size: 11px;
          font-weight: bold;
          padding: 14px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          box-shadow: 0 4px 12px rgba(201, 168, 76, 0.3);
          margin-top: 8px;
        ">CREATE PROFILE</button>
      </div>
    `;
    root.appendChild(this.domOverlay);

    // Input listeners for password strength validation
    const passwordInput = this.domOverlay.querySelector('#profile-password') as HTMLInputElement;
    const nameInput = this.domOverlay.querySelector('#profile-name') as HTMLInputElement;
    const emailInput = this.domOverlay.querySelector('#profile-email') as HTMLInputElement;

    const strengthBar = this.domOverlay.querySelector('#strength-bar') as HTMLDivElement;
    const strengthLabel = this.domOverlay.querySelector('#strength-label') as HTMLSpanElement;

    const checkRequirements = () => {
      const p = passwordInput.value;
      const metrics = {
        length: p.length >= 8,
        upper: /[A-Z]/.test(p),
        lower: /[a-z]/.test(p),
        number: /[0-9]/.test(p),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(p)
      };

      // Update color and text of checklists
      const updateReq = (id: string, met: boolean, text: string) => {
        const el = document.getElementById(id);
        if (el) {
          el.innerHTML = met ? `✅ ${text}` : `❌ ${text}`;
          el.style.color = met ? '#10b981' : '#ef4444';
        }
      };

      updateReq('req-length', metrics.length, 'At least 8 characters');
      updateReq('req-upper', metrics.upper, 'At least 1 uppercase letter');
      updateReq('req-lower', metrics.lower, 'At least 1 lowercase letter');
      updateReq('req-number', metrics.number, 'At least 1 number');
      updateReq('req-special', metrics.special, 'At least 1 special character');

      // Calculate score [0..5]
      const score = Object.values(metrics).filter(Boolean).length;
      const percentage = (score / 5) * 100;
      strengthBar.style.width = `${percentage}%`;

      if (score <= 2) {
        strengthBar.style.backgroundColor = '#ef4444'; // weak red
        strengthLabel.textContent = 'Weak';
        strengthLabel.style.color = '#ef4444';
      } else if (score <= 4) {
        strengthBar.style.backgroundColor = '#f59e0b'; // medium orange
        strengthLabel.textContent = 'Medium';
        strengthLabel.style.color = '#f59e0b';
      } else {
        strengthBar.style.backgroundColor = '#10b981'; // strong green
        strengthLabel.textContent = 'Strong';
        strengthLabel.style.color = '#10b981';
      }

      return score === 5;
    };

    passwordInput.addEventListener('input', checkRequirements);

    // Style effects on input focus
    [nameInput, emailInput, passwordInput].forEach(inp => {
      inp.addEventListener('focus', () => {
        inp.style.borderColor = '#fbbf24';
      });
      inp.addEventListener('blur', () => {
        inp.style.borderColor = '#4b5563';
      });
    });

    // Create Profile CTA click handler
    this.domOverlay.querySelector('#create-profile-btn')?.addEventListener('click', async () => {
      audioService.playSelect();

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const errorBanner = document.getElementById('form-error-banner') as HTMLDivElement;

      // Reset error banner
      errorBanner.style.display = 'none';

      // Validate fields
      if (!name) {
        errorBanner.style.display = 'block';
        errorBanner.textContent = 'Error: Name is required.';
        return;
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        errorBanner.style.display = 'block';
        errorBanner.textContent = 'Error: A valid email address is required.';
        return;
      }
      const isPasswordValid = checkRequirements();
      if (!isPasswordValid) {
        errorBanner.style.display = 'block';
        errorBanner.textContent = 'Error: Password must meet all strong requirements.';
        return;
      }

      // If Supabase is connected, attempt register or login
      if (supabaseClient) {
        const btn = this.domOverlay?.querySelector('#create-profile-btn') as HTMLButtonElement;
        if (btn) {
          btn.disabled = true;
          btn.textContent = 'CREATING PROFILE...';
        }

        try {
          // Attempt sign up
          const { error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: {
                display_name: name
              }
            }
          });

          if (error) {
            // Check if user is already registered. If so, attempt login with same credentials
            if (error.message.toLowerCase().includes('already') || error.message.toLowerCase().includes('exists')) {
              const { error: logError } = await supabaseClient.auth.signInWithPassword({
                email,
                password
              });

              if (logError) {
                if (btn) {
                  btn.disabled = false;
                  btn.textContent = 'CREATE PROFILE';
                }
                errorBanner.style.display = 'block';
                errorBanner.textContent = `Error: ${logError.message}`;
                return;
              }
            } else {
              if (btn) {
                btn.disabled = false;
                btn.textContent = 'CREATE PROFILE';
              }
              errorBanner.style.display = 'block';
              errorBanner.textContent = `Error: ${error.message}`;
              return;
            }
          }
        } catch (err: any) {
          if (btn) {
            btn.disabled = false;
            btn.textContent = 'CREATE PROFILE';
          }
          errorBanner.style.display = 'block';
          errorBanner.textContent = `Error: ${err.message || 'Supabase connection failed'}`;
          return;
        }
      }

      // Save profile in state (existing architecture fallback/storage)
      const state = gameStateManager.getState();
      state.player.name = name;
      state.player.email = email;
      state.player.password = '*'.repeat(password.length); // Never store/display plaintext password
      gameStateManager.saveProgress();

      // Proceed to the transition card
      this.runTransitionCard();
    });
  }

  private runTransitionCard() {
    const overlay = this.domOverlay;
    if (!overlay) return;

    overlay.innerHTML = `
      <div style="max-width: 600px; text-align: center; display: flex; flex-direction: column; gap: 24px;">
        <div id="op-line-3" style="
          font-family: var(--font-pixel);
          font-size: clamp(14px, 2.4vw, 22px);
          color: #f8fafc;
          line-height: 1.7;
          opacity: 0;
          text-shadow: 0 0 15px rgba(255,255,255,0.4);
          margin-top: 20px;
        ">
          WHAT IF THE INTERFACE<br>WASN'T DESIGNED FOR YOU?
        </div>
        <div style="font-family: var(--font-pixel); font-size: 9px; color: #6b5c7c; margin-top: 16px; opacity: 0.7;">
          [click anywhere to skip]
        </div>
      </div>
    `;

    let advanced = false;
    const advance = () => {
      if (advanced) return;
      advanced = true;
      gsap.killTweensOf('#op-line-3');
      gsap.killTweensOf(overlay);
      overlay.remove();
      this.domOverlay = null;
      this.run3DRoomCinematic();
    };

    // Click anywhere on the overlay to skip
    overlay.addEventListener('click', advance, { once: true });

    gsap.to('#op-line-3', {
      opacity: 1,
      duration: 1.8,
      onStart: () => audioService.playGlitch(),
      onComplete: () => {
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.8,
          delay: 2.0,
          onComplete: advance,
        });
      }
    });
  }


  private run3DRoomCinematic() {
    // Attempt to initialize the 3D DevRoom cinematic.
    // If it fails or takes too long, fall back immediately to Grandma dialogue.
    let cinematicDone = false;
    const proceed = () => {
      if (cinematicDone) return;
      cinematicDone = true;
      this.threeDevRoom?.destroy();
      this.threeDevRoom = null;
      this.runGrandmaDialogue();
    };

    try {
      this.threeDevRoom = new ThreeDevRoom('game-root', proceed);
    } catch (err) {
      console.warn('3D cinematic failed, skipping:', err);
      proceed();
      return;
    }

    // Safety timeout: if cinematic hasn't finished in 15s, proceed anyway
    const fallbackTimer = setTimeout(proceed, 15000);

    // Show a "SKIP CINEMATIC" overlay button so the player is never stuck
    const skipBtn = document.createElement('button');
    skipBtn.id = 'skip-cinematic-btn';
    skipBtn.textContent = '⏩ SKIP CINEMATIC';
    skipBtn.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999;
      background: rgba(30,30,50,0.85);
      color: #c9a84c;
      border: 2px solid #6b5c7c;
      border-radius: 4px;
      padding: 10px 18px;
      font-family: var(--font-pixel);
      font-size: 9px;
      cursor: pointer;
      letter-spacing: 1px;
      pointer-events: auto;
    `;
    skipBtn.addEventListener('click', () => {
      clearTimeout(fallbackTimer);
      skipBtn.remove();
      proceed();
    });
    document.getElementById('game-root')?.appendChild(skipBtn);

    // Store reference so we can clean it up
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      clearTimeout(fallbackTimer);
      skipBtn.remove();
    });
  }

  private runGrandmaDialogue() {
    const root = document.getElementById('dom-overlay') ?? document.body;
    this.domOverlay = document.createElement('div');
    this.domOverlay.id = 'room-dialogue-overlay';
    this.domOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      pointer-events: auto;
      overflow: hidden;
    `;

    this.domOverlay.innerHTML = `
      <!-- Cozy Living Room Background -->
      <div id="vn-bg" style="
        position: absolute;
        inset: 0;
        background: linear-gradient(170deg, #1a1028 0%, #2d1f3d 30%, #1e1528 60%, #0f0d18 100%);
        z-index: 0;
      ">
        <!-- Warm ambient glow (lamp light) -->
        <div style="
          position: absolute;
          top: 20%;
          left: 15%;
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(249, 168, 37, 0.12) 0%, transparent 70%);
          pointer-events: none;
        "></div>
        <div style="
          position: absolute;
          bottom: 30%;
          right: 20%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(124, 92, 191, 0.08) 0%, transparent 70%);
          pointer-events: none;
        "></div>

        <!-- Room furniture silhouettes -->
        <div style="
          position: absolute;
          bottom: 200px;
          left: 10%;
          width: 300px;
          height: 120px;
          background: rgba(20, 15, 30, 0.6);
          border-radius: 6px 6px 0 0;
          border-top: 3px solid rgba(100, 80, 60, 0.3);
        "></div>
        <!-- Window with moonlight -->
        <div style="
          position: absolute;
          top: 8%;
          right: 12%;
          width: 120px;
          height: 160px;
          border: 4px solid rgba(100, 80, 120, 0.4);
          border-radius: 4px;
          background: linear-gradient(180deg, rgba(30, 58, 95, 0.5) 0%, rgba(15, 23, 42, 0.6) 100%);
          box-shadow: 0 0 40px rgba(96, 165, 250, 0.08);
        ">
          <div style="position:absolute;top:50%;left:0;right:0;height:2px;background:rgba(100,80,120,0.3);"></div>
          <div style="position:absolute;left:50%;top:0;bottom:0;width:2px;background:rgba(100,80,120,0.3);"></div>
        </div>

        <!-- Floating dust/warmth particles -->
        <div id="vn-particles" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>
      </div>

      <!-- Character Portraits -->
      <div id="vn-portraits" style="
        position: absolute;
        bottom: 180px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 5%;
        z-index: 1;
        pointer-events: none;
      ">
        <!-- Grandma Mira Portrait (left) -->
        <div id="portrait-grandma" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.6s ease, transform 0.6s ease, filter 0.4s ease;
        ">
          <div style="
            width: 110px;
            height: 140px;
            background: linear-gradient(135deg, #2d1f3d 0%, #1a1028 100%);
            border: 3px solid #d97706;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(217, 119, 6, 0.2), inset 0 0 20px rgba(217, 119, 6, 0.05);
            position: relative;
            overflow: hidden;
          ">
            <!-- Pixel Grandma -->
            <svg viewBox="0 0 48 64" width="80" height="100" style="image-rendering: pixelated;">
              <!-- Orange Cardigan Body -->
              <rect x="14" y="28" width="20" height="22" fill="#d97706"/>
              <rect x="12" y="28" width="4" height="18" fill="#b45309"/>
              <rect x="32" y="28" width="4" height="18" fill="#b45309"/>
              <!-- Face -->
              <rect x="15" y="12" width="18" height="16" fill="#fde68a" rx="2"/>
              <!-- Silver Hair Bun -->
              <rect x="13" y="6" width="22" height="10" fill="#cbd5e1" rx="3"/>
              <circle cx="24" cy="7" r="6" fill="#94a3b8"/>
              <!-- Pink Glasses -->
              <rect x="16" y="18" width="6" height="4" fill="#ec4899" rx="1"/>
              <rect x="26" y="18" width="6" height="4" fill="#ec4899" rx="1"/>
              <rect x="22" y="19" width="4" height="2" fill="#ec4899"/>
              <!-- Warm Smile -->
              <rect x="20" y="24" width="8" height="2" fill="#92400e" rx="1"/>
              <!-- Walking Stick -->
              <rect x="38" y="30" width="3" height="28" fill="#78350f" rx="1"/>
              <!-- Legs -->
              <rect x="18" y="50" width="5" height="10" fill="#374151"/>
              <rect x="26" y="50" width="5" height="10" fill="#374151"/>
            </svg>
          </div>
          <div style="
            font-family: var(--font-pixel);
            font-size: 8px;
            color: #d97706;
            letter-spacing: 1px;
            text-shadow: 0 0 8px rgba(217, 119, 6, 0.4);
          ">GRANDMA MIRA</div>
        </div>

        <!-- Ava Portrait (right) -->
        <div id="portrait-ava" style="
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.6s ease, transform 0.6s ease, filter 0.4s ease;
        ">
          <div style="
            width: 110px;
            height: 140px;
            background: linear-gradient(135deg, #1a2e28 0%, #0f1f1a 100%);
            border: 3px solid #10b981;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(16, 185, 129, 0.2), inset 0 0 20px rgba(16, 185, 129, 0.05);
            position: relative;
            overflow: hidden;
          ">
            <!-- Pixel Ava -->
            <svg viewBox="0 0 48 64" width="80" height="100" style="image-rendering: pixelated;">
              <!-- Teal Jacket Body -->
              <rect x="14" y="28" width="20" height="22" fill="#059669"/>
              <rect x="12" y="28" width="4" height="18" fill="#047857"/>
              <rect x="32" y="28" width="4" height="18" fill="#047857"/>
              <!-- Face -->
              <rect x="15" y="12" width="18" height="16" fill="#fcd34d" rx="2"/>
              <!-- Purple Hair -->
              <rect x="12" y="4" width="24" height="12" fill="#7c3aed" rx="3"/>
              <rect x="10" y="10" width="6" height="14" fill="#7c3aed" rx="2"/>
              <rect x="32" y="10" width="6" height="14" fill="#7c3aed" rx="2"/>
              <!-- Eyes -->
              <rect x="18" y="18" width="4" height="4" fill="#1e1b4b" rx="1"/>
              <rect x="26" y="18" width="4" height="4" fill="#1e1b4b" rx="1"/>
              <!-- Confident Smile -->
              <rect x="20" y="24" width="8" height="2" fill="#92400e" rx="1"/>
              <!-- Legs -->
              <rect x="18" y="50" width="5" height="10" fill="#1e293b"/>
              <rect x="26" y="50" width="5" height="10" fill="#1e293b"/>
            </svg>
          </div>
          <div style="
            font-family: var(--font-pixel);
            font-size: 8px;
            color: #10b981;
            letter-spacing: 1px;
            text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
          ">AVA (DESIGNER)</div>
        </div>
      </div>

      <!-- Visual Novel Dialogue Box -->
      <div id="vn-box" style="
        position: relative;
        z-index: 2;
        margin: 0 auto 30px auto;
        max-width: 820px;
        width: calc(100% - 40px);
        background: rgba(45, 32, 51, 0.92);
        backdrop-filter: blur(16px);
        border: 3px solid rgba(107, 92, 124, 0.6);
        border-radius: 12px;
        padding: 20px 28px;
        color: #f5f0e8;
        font-family: var(--font-body);
        box-shadow:
          0 -4px 30px rgba(0, 0, 0, 0.5),
          0 0 60px rgba(124, 92, 191, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.05);
        display: flex;
        flex-direction: column;
        gap: 10px;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
      ">
        <!-- Speaker Name Badge -->
        <div style="display: flex; align-items: center; gap: 10px;">
          <div id="vn-speaker-badge" style="
            display: inline-block;
            font-family: var(--font-pixel);
            font-size: 9px;
            letter-spacing: 1.5px;
            padding: 5px 14px;
            border-radius: 4px;
            background: rgba(217, 119, 6, 0.15);
            border: 1.5px solid #d97706;
            color: #fbbf24;
            text-shadow: 0 0 8px rgba(251, 191, 36, 0.3);
          ">GRANDMA MIRA</div>
          <div style="flex:1;height:1px;background:linear-gradient(90deg, rgba(107,92,124,0.4) 0%, transparent 100%);"></div>
        </div>

        <!-- Dialogue Text -->
        <div id="vn-text" style="
          font-size: 17px;
          font-weight: 500;
          line-height: 1.65;
          min-height: 52px;
          color: #e8dcc8;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        "></div>

        <!-- Click/Skip Hint -->
        <div id="vn-hint" style="
          font-family: var(--font-pixel);
          font-size: 7px;
          color: rgba(168, 152, 128, 0.5);
          text-align: right;
          letter-spacing: 1px;
          opacity: 0;
          transition: opacity 0.4s ease;
        ">▼ click to skip</div>
      </div>
    `;
    root.appendChild(this.domOverlay);

    // Add floating dust particles
    const particleContainer = this.domOverlay.querySelector('#vn-particles');
    if (particleContainer) {
      for (let i = 0; i < 20; i++) {
        const p = document.createElement('div');
        const size = 2 + Math.random() * 3;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const dur = 4 + Math.random() * 6;
        const delay = Math.random() * 4;
        p.style.cssText = `
          position: absolute;
          left: ${x}%;
          top: ${y}%;
          width: ${size}px;
          height: ${size}px;
          background: rgba(249, 168, 37, ${0.1 + Math.random() * 0.15});
          border-radius: 50%;
          animation: vnDust ${dur}s ${delay}s ease-in-out infinite;
          pointer-events: none;
        `;
        particleContainer.appendChild(p);
      }
    }

    // Inject particle animation keyframes
    if (!document.getElementById('vn-dust-style')) {
      const style = document.createElement('style');
      style.id = 'vn-dust-style';
      style.textContent = `
        @keyframes vnDust {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(8px); opacity: 0.6; }
          50% { transform: translateY(-35px) translateX(-5px); opacity: 0.4; }
          75% { transform: translateY(-15px) translateX(12px); opacity: 0.5; }
        }
        @keyframes vnCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // Animate portraits and dialogue box in
    requestAnimationFrame(() => {
      const grandmaPortrait = this.domOverlay?.querySelector('#portrait-grandma') as HTMLElement;
      const avaPortrait = this.domOverlay?.querySelector('#portrait-ava') as HTMLElement;
      const vnBox = this.domOverlay?.querySelector('#vn-box') as HTMLElement;

      if (grandmaPortrait) {
        grandmaPortrait.style.opacity = '1';
        grandmaPortrait.style.transform = 'translateX(0)';
      }
      setTimeout(() => {
        if (avaPortrait) {
          avaPortrait.style.opacity = '1';
          avaPortrait.style.transform = 'translateX(0)';
        }
      }, 300);
      setTimeout(() => {
        if (vnBox) {
          vnBox.style.opacity = '1';
          vnBox.style.transform = 'translateY(0)';
        }
      }, 500);
    });

    // Dialogue data
    const dialogLines = [
      { speaker: "GRANDMA MIRA", speakerColor: "#fbbf24", badgeBg: "rgba(217, 119, 6, 0.15)", badgeBorder: "#d97706", activePortrait: "grandma", text: "Can you help me book a doctor's appointment for tomorrow at 4 PM?" },
      { speaker: "AVA (DESIGNER)", speakerColor: "#34d399", badgeBg: "rgba(16, 185, 129, 0.15)", badgeBorder: "#10b981", activePortrait: "ava", text: "Yeah, sure! I'll help you, Grandma." },
    ];

    let currentLine = 0;
    let isTyping = false;
    let typeInterval: ReturnType<typeof setInterval> | null = null;
    let autoAdvanceTimer: ReturnType<typeof setTimeout> | null = null;

    const speakerEl = this.domOverlay.querySelector('#vn-speaker-badge') as HTMLDivElement;
    const textEl = this.domOverlay.querySelector('#vn-text') as HTMLDivElement;
    const hintEl = this.domOverlay.querySelector('#vn-hint') as HTMLDivElement;
    const grandmaPortrait = this.domOverlay.querySelector('#portrait-grandma') as HTMLElement;
    const avaPortrait = this.domOverlay.querySelector('#portrait-ava') as HTMLElement;

    const playSpeechLine = () => {
      if (currentLine >= dialogLines.length) {
        // Dialogue complete → transition out
        audioService.playGlitch();
        gsap.to(this.domOverlay, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            this.domOverlay?.remove();
            this.domOverlay = null;
            // Remove injected style
            document.getElementById('vn-dust-style')?.remove();
            this.showTaskAssigned();
          }
        });
        return;
      }

      const line = dialogLines[currentLine];
      isTyping = true;
      hintEl.style.opacity = '0';

      // Update speaker badge
      speakerEl.textContent = line.speaker;
      speakerEl.style.color = line.speakerColor;
      speakerEl.style.background = line.badgeBg;
      speakerEl.style.borderColor = line.badgeBorder;
      speakerEl.style.textShadow = `0 0 8px ${line.badgeBorder}40`;

      // Highlight active portrait, dim other
      if (line.activePortrait === 'grandma') {
        grandmaPortrait.style.filter = 'brightness(1.1)';
        avaPortrait.style.filter = 'brightness(0.5)';
      } else {
        avaPortrait.style.filter = 'brightness(1.1)';
        grandmaPortrait.style.filter = 'brightness(0.5)';
      }

      // Typewriter effect with blinking cursor
      textEl.innerHTML = '<span id="vn-cursor" style="display:inline-block;width:8px;height:18px;background:#c9a84c;margin-left:2px;vertical-align:text-bottom;animation:vnCursorBlink 0.6s step-end infinite;"></span>';
      let charIdx = 0;

      audioService.speak(line.text, line.speaker);

      typeInterval = setInterval(() => {
        if (charIdx < line.text.length) {
          const cursor = textEl.querySelector('#vn-cursor');
          const textSpan = textEl.querySelector('#vn-typed') ?? (() => {
            const s = document.createElement('span');
            s.id = 'vn-typed';
            textEl.insertBefore(s, cursor);
            return s;
          })();
          (textSpan as HTMLElement).textContent += line.text[charIdx++];
        } else {
          if (typeInterval) clearInterval(typeInterval);
          typeInterval = null;
          isTyping = false;
          // Remove cursor, show hint
          const cursor = textEl.querySelector('#vn-cursor');
          if (cursor) cursor.remove();
          hintEl.style.opacity = '1';

          // Auto-advance after 3.5s
          autoAdvanceTimer = setTimeout(() => {
            currentLine++;
            playSpeechLine();
          }, 3500);
        }
      }, 28);
    };

    // Click to skip typing or advance
    this.domOverlay.addEventListener('click', () => {
      if (isTyping && typeInterval) {
        // Skip typing → show full text
        clearInterval(typeInterval);
        typeInterval = null;
        isTyping = false;
        const line = dialogLines[currentLine];
        textEl.innerHTML = line.text;
        hintEl.style.opacity = '1';

        autoAdvanceTimer = setTimeout(() => {
          currentLine++;
          playSpeechLine();
        }, 2000);
      } else if (!isTyping) {
        // Advance to next line
        if (autoAdvanceTimer) clearTimeout(autoAdvanceTimer);
        currentLine++;
        playSpeechLine();
      }
    });

    // Start first line after a beat
    setTimeout(playSpeechLine, 800);
  }

  private showTaskAssigned() {
    const root = document.getElementById('dom-overlay') ?? document.body;
    this.domOverlay = document.createElement('div');
    this.domOverlay.id = 'task-assigned-overlay';
    this.domOverlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: #000000;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: var(--font-pixel);
      pointer-events: auto;
    `;

    this.domOverlay.innerHTML = `
      <div style="max-width: 500px; width: 100%; text-align: center; display: flex; flex-direction: column; gap: 28px;">
        <div id="task-box" style="
          background: #0f172a;
          border: 2px solid #ef4444;
          border-radius: 6px;
          padding: 24px;
          box-shadow: 0 0 25px rgba(239, 68, 68, 0.3);
          transform: scale(0.9);
          opacity: 0;
        ">
          <div style="color: #ef4444; font-size: 11px; margin-bottom: 12px; font-weight: bold; letter-spacing: 1.5px;">
            ⚠️ TASK ASSIGNED
          </div>
          <div style="font-family: var(--font-body); font-size: 18px; color: #f8fafc; margin-bottom: 16px; font-weight: 600; line-height: 1.4;">
            Book a doctor's appointment for tomorrow at 4 PM.
          </div>
          <div style="color: #94a3b8; font-size: 10px; display: flex; align-items: center; justify-content: center; gap: 6px; letter-spacing: 1px;">
            ⏱ 20 SECONDS LIMIT
          </div>
        </div>

        <div id="btn-container" style="opacity: 0;">
          <button id="start-simulation-btn" style="
            background: #ef4444;
            color: #ffffff;
            border: 2px solid #f87171;
            border-radius: 4px;
            padding: 14px 36px;
            font-family: var(--font-pixel);
            font-size: 11px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);
            letter-spacing: 1px;
            transition: background 0.2s;
          ">START SIMULATION ►</button>
        </div>
      </div>
    `;
    root.appendChild(this.domOverlay);

    const tl = gsap.timeline();
    tl.to('#task-box', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' })
      .to('#btn-container', { opacity: 1, duration: 0.4 });

    this.domOverlay.querySelector('#start-simulation-btn')?.addEventListener('click', () => {
      audioService.playSelect();
      gsap.to(this.domOverlay, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          this.domOverlay?.remove();
          this.domOverlay = null;
          this.scene.start('AppointmentSimScene');
        }
      });
    });
  }

  shutdown() {
    this.threeDevRoom?.destroy();
    this.threeDevRoom = null;
    this.domOverlay?.remove();
    this.domOverlay = null;
  }
}
