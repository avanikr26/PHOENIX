import Phaser from 'phaser';
import gsap from 'gsap';
import { audioService } from '../services/AudioService';
import { gameStateManager } from '../core/GameStateManager';
import { ThreeDevRoom } from '../three/ThreeDevRoom';

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
    this.domOverlay.querySelector('#create-profile-btn')?.addEventListener('click', () => {
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
      background: transparent;
      z-index: 100;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 30px;
      pointer-events: auto;
    `;

    this.domOverlay.innerHTML = `
      <div id="vn-box" style="
        background: #2d2033;
        border: 3px solid #6b5c7c;
        border-radius: 8px;
        padding: 16px 24px;
        color: #f5f0e8;
        font-family: var(--font-body);
        font-size: 16px;
        line-height: 1.5;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        max-width: 800px;
        margin: 0 auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
      ">
        <div id="vn-speaker" style="
          font-family: var(--font-pixel);
          font-size: 10px;
          color: #f59e0b;
          letter-spacing: 1px;
        ">GRANDMA MIRA</div>
        <div id="vn-text" style="font-weight: 500;"></div>
      </div>
    `;
    root.appendChild(this.domOverlay);

    const dialogLines = [
      { speaker: "GRANDMA MIRA", text: "Can you help me book a doctor's appointment for tomorrow at 4 PM?" },
      { speaker: "DESIGNER (Ava)", text: "Yeah, sure. I'll help you." }
    ];

    let currentLine = 0;
    const speakerEl = this.domOverlay.querySelector('#vn-speaker') as HTMLDivElement;
    const textEl = this.domOverlay.querySelector('#vn-text') as HTMLDivElement;

    const playSpeechLine = () => {
      if (currentLine >= dialogLines.length) {
        // Conversation complete. Trigger Glitch and show Task Assignment
        audioService.playGlitch();
        gsap.to(this.domOverlay, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            this.domOverlay?.remove();
            this.domOverlay = null;
            this.showTaskAssigned();
          }
        });
        return;
      }

      const line = dialogLines[currentLine];
      speakerEl.textContent = line.speaker;
      
      // Color speaker tag
      if (line.speaker.includes("GRANDMA")) {
        speakerEl.style.color = "#f59e0b";
      } else {
        speakerEl.style.color = "#10b981";
      }

      // Typewriter print effect
      textEl.textContent = "";
      let charIdx = 0;
      
      // Trigger Web Speech API voice synthesis
      audioService.speak(line.text, line.speaker);

      const typeInterval = setInterval(() => {
        if (charIdx < line.text.length) {
          textEl.textContent += line.text[charIdx++];
        } else {
          clearInterval(typeInterval);
          
          // Wait 3.5 seconds, then advance automatically to next line!
          // No user clicks required for this story cinematic section.
          setTimeout(() => {
            currentLine++;
            playSpeechLine();
          }, 3500);
        }
      }, 20);
    };

    // Begin dialogue playback
    playSpeechLine();
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
            ⏱ 30 SECONDS LIMIT
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
