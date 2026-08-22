import Phaser from 'phaser';
import gsap from 'gsap';
import { eventBus, GameEvents } from '../core/EventBus';
import { dialogueManager } from '../gameplay/DialogueManager';
import { challengeManager } from '../gameplay/ChallengeManager';
import { gameStateManager } from '../core/GameStateManager';
import { Challenge, DialogueNode } from '../types/game';
import { PortraitAssets, CharacterMood } from '../ui/PortraitAssets';

export class UIScene extends Phaser.Scene {
  private overlay!: HTMLDivElement;
  private currentChallenge: Challenge | null = null;
  private challengeTimerInterval: ReturnType<typeof setInterval> | null = null;
  private challengeSecondsLeft = 28;

  // DOM containers
  private bottomBar: HTMLDivElement | null = null;
  private dialoguePanel: HTMLDivElement | null = null;
  private challengePanel: HTMLDivElement | null = null;
  private hudScoreBadge: HTMLDivElement | null = null;
  private typewriterInterval: ReturnType<typeof setInterval> | null = null;

  // Accessibility flags
  private highContrastMode = false;
  private captioningMode = true;
  private onKeyDownHandler: ((e: KeyboardEvent) => void) | null = null;
  private lastDialogueAdvanceTime = 0;

  constructor() {
    super({ key: 'UIScene', active: true });
  }

  create() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.shutdown();
    });
    this.setupOverlay();
    this.createBottomActionBar();
    this.createTopHUDScore();
    this.listenToEvents();
  }

  // ─── Setup Overlay & HUD ──────────────────────────────────────────────────

  private setupOverlay() {
    let el = document.getElementById('dom-overlay') as HTMLDivElement;
    if (!el) {
      el = document.createElement('div');
      el.id = 'dom-overlay';
      document.getElementById('game-root')?.appendChild(el);
    }
    this.overlay = el;
    this.overlay.innerHTML = '';
  }

  // ─── 1. Roblox Experience TopBar CoreGui ─────────────────────────────────

  private createTopHUDScore() {
    if (document.getElementById('roblox-topbar')) return;

    this.hudScoreBadge = document.createElement('div');
    this.hudScoreBadge.id = 'roblox-topbar';
    this.hudScoreBadge.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 48px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      z-index: 25;
      pointer-events: auto;
      font-family: Inter, system-ui, sans-serif;
    `;

    this.hudScoreBadge.innerHTML = `
      <!-- Left: Roblox Logo Menu & Chat -->
      <div style="display:flex; align-items:center; gap:12px;">
        <button id="rbx-menu-btn" title="Roblox Experience Menu (ESC)" style="
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 6px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          transition: background 0.2s;
        ">⬡</button>

        <button id="rbx-chat-btn" title="Chat" style="
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 15px;
        ">💬</button>

        <!-- Leaderstats Score Badge -->
        <div id="rbx-leaderstats" style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(251, 191, 36, 0.4);
          border-radius: 6px;
          padding: 4px 12px;
          color: #f8fafc;
          font-size: 12px;
          font-weight: 600;
        ">
          <span style="color:#fbbf24;">★</span>
          <span id="rbx-score-val">Score: 1,250</span>
        </div>
      </div>

      <!-- Center: Experience Title -->
      <div style="
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.5px;
        color: #f8fafc;
        display: flex;
        align-items: center;
        gap: 8px;
      ">
        <span style="background:#2563eb; color:#fff; font-size:10px; padding:2px 6px; border-radius:4px;">BETA</span>
        <span>ACCESS CITY [3D EXPERIENCE]</span>
      </div>

      <!-- Right: Badges, Sound & Fullscreen -->
      <div style="display:flex; align-items:center; gap:10px;">
        <button id="rbx-badges-btn" title="Badges & Achievements" style="
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          padding: 5px 10px;
          color: #facc15;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
        ">
          <span>🏆</span>
          <span style="color:#f8fafc;">Badges: 4/8</span>
        </button>

        <button id="rbx-mute-btn" title="Toggle Sound" style="
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">🔊</button>

        <button id="rbx-fullscreen-btn" title="Fullscreen" style="
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          color: #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        ">⛶</button>
      </div>
    `;

    this.overlay.appendChild(this.hudScoreBadge);
    this.updateHUDScore();

    // TopBar Event Listeners
    this.hudScoreBadge.querySelector('#rbx-menu-btn')?.addEventListener('click', () => {
      this.showRobloxEscMenu();
    });
    this.hudScoreBadge.querySelector('#rbx-badges-btn')?.addEventListener('click', () => {
      this.showBadgesModal();
    });
    this.hudScoreBadge.querySelector('#rbx-mute-btn')?.addEventListener('click', (e) => {
      const isMuted = (window as any).audioService?.toggleMute?.();
      (e.currentTarget as HTMLElement).textContent = isMuted ? '🔇' : '🔊';
    });
    this.hudScoreBadge.querySelector('#rbx-fullscreen-btn')?.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });

    // ESC key opens Roblox Experience Menu
    this.onKeyDownHandler = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        this.showRobloxEscMenu();
      }
      if (['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5'].includes(e.code)) {
        const slot = parseInt(e.code.replace('Digit', ''));
        this.activateHotbarSlot(slot);
      }
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        this.handleDialogueEnterPress();
      }
    };
    window.addEventListener('keydown', this.onKeyDownHandler);
  }

  shutdown() {
    if (this.onKeyDownHandler) {
      window.removeEventListener('keydown', this.onKeyDownHandler);
      this.onKeyDownHandler = null;
    }
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
      this.typewriterInterval = null;
    }
    if (this.challengeTimerInterval) {
      clearInterval(this.challengeTimerInterval);
      this.challengeTimerInterval = null;
    }
  }

  private updateHUDScore() {
    const scoreVal = document.getElementById('rbx-score-val');
    if (scoreVal) {
      const score = gameStateManager.getState().totalScore;
      scoreVal.textContent = `Score: ${score.toLocaleString()}`;
    }
    const badgesVal = document.getElementById('rbx-badges-btn');
    if (badgesVal) {
      const count = gameStateManager.getState().unlockedBadgeIds.length;
      badgesVal.innerHTML = `
        <span>🏆</span>
        <span id="rbx-badges-val" style="color:#f8fafc;">Badges: ${count}</span>
      `;
    }
  }

  private updateHUDVisibility() {
    const currentScene = gameStateManager.getState().currentScene;
    const hide = currentScene === 'TitleScene' || currentScene === 'BootScene';
    if (this.hudScoreBadge) {
      this.hudScoreBadge.style.display = hide ? 'none' : 'flex';
    }
    if (this.bottomBar) {
      this.bottomBar.style.display = hide ? 'none' : 'flex';
    }
  }

  private showBadgeUnlockToast(badgeId: string) {
    const badgeNames: Record<string, { name: string; desc: string; icon: string }> = {
      FIRST_FIX: { name: 'First Accessibility Fix', desc: 'Eliminated your first digital product accessibility barrier!', icon: '🏆' },
      VISUAL_ACCESSIBILITY: { name: 'Visual Accessibility Master', desc: 'Cleared all visual and screen-reader accessibility barriers!', icon: '👁️' },
      INCLUSIVE_AUDIO: { name: 'Inclusive Audio Champion', desc: 'Resolved all hearing and sound indicator barriers!', icon: '🔊' },
      COLOR_CRUSHER: { name: 'Color-Aware Designer', desc: 'Completed Grandma Mira\'s color-blind design challenges!', icon: '🎨' },
      KEYBOARD_KNIGHT: { name: 'Keyboard/Motor Knight', desc: 'Restored logical tab order and visible keyboard focus!', icon: '⌨️' },
      CLEAR_THINKER: { name: 'Cognitive Clarity Advocate', desc: 'Made forms and workflows clear for cognitive accessibility!', icon: '🧠' },
      INCLUSIVE_ARCHITECT: { name: 'Accessibility Architect', desc: 'Achieved mastery level across Access City districts!', icon: '🏛️' },
      ZERO_EXCLUSION: { name: 'Zero Exclusion Legend', desc: 'Successfully served 10,000 citizens in the final simulation!', icon: '👑' }
    };
    const info = badgeNames[badgeId] || { name: badgeId, desc: 'Achievement unlocked!', icon: '🏆' };
    this.showRobloxBadgeToast(info.name.toUpperCase(), info.desc, info.icon);
  }

  // ─── 2. Roblox Bottom Backpack / Hotbar System ───────────────────────────

  private createBottomActionBar() {
    if (document.getElementById('roblox-hotbar')) return;

    this.bottomBar = document.createElement('div');
    this.bottomBar.id = 'roblox-hotbar';
    this.bottomBar.style.cssText = `
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(15, 23, 42, 0.85);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 10px;
      padding: 6px 12px;
      z-index: 25;
      pointer-events: auto;
      font-family: Inter, system-ui, sans-serif;
      box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    `;

    this.bottomBar.innerHTML = `
      <button class="rbx-slot" id="slot-1" title="[1] Access Scanner" style="
        background: #1e293b; border: 1px solid #3b82f6; border-radius: 8px; padding: 6px 12px; color: #f8fafc; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
      ">
        <span style="background:#2563eb; color:#fff; border-radius:3px; padding:1px 5px; font-size:9px;">1</span>
        <span>📱 Access Scanner</span>
      </button>

      <button class="rbx-slot" id="slot-2" title="[2] Transit Pass" style="
        background: #1e293b; border: 1px solid #64748b; border-radius: 8px; padding: 6px 12px; color: #f8fafc; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
      ">
        <span style="background:#475569; color:#fff; border-radius:3px; padding:1px 5px; font-size:9px;">2</span>
        <span>🚌 Transit Pass</span>
      </button>

      <button class="rbx-slot" id="slot-3" title="[3] Contrast Checker" style="
        background: #1e293b; border: 1px solid #64748b; border-radius: 8px; padding: 6px 12px; color: #f8fafc; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
      ">
        <span style="background:#475569; color:#fff; border-radius:3px; padding:1px 5px; font-size:9px;">3</span>
        <span>🎨 Contrast Tool</span>
      </button>

      <button class="rbx-slot" id="slot-4" title="[4] Screen Reader" style="
        background: #1e293b; border: 1px solid #64748b; border-radius: 8px; padding: 6px 12px; color: #f8fafc; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
      ">
        <span style="background:#475569; color:#fff; border-radius:3px; padding:1px 5px; font-size:9px;">4</span>
        <span>🔊 Screen Reader</span>
      </button>

      <button class="rbx-slot" id="slot-5" title="[5] Tasks & Objectives" style="
        background: #1e293b; border: 1px solid #64748b; border-radius: 8px; padding: 6px 12px; color: #f8fafc; font-size: 11px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
      ">
        <span style="background:#475569; color:#fff; border-radius:3px; padding:1px 5px; font-size:9px;">5</span>
        <span>📋 Quests</span>
      </button>
    `;

    this.overlay.appendChild(this.bottomBar);

    // Wire hotbar clicks
    this.bottomBar.querySelector('#slot-1')?.addEventListener('click', () => this.activateHotbarSlot(1));
    this.bottomBar.querySelector('#slot-2')?.addEventListener('click', () => this.activateHotbarSlot(2));
    this.bottomBar.querySelector('#slot-3')?.addEventListener('click', () => this.activateHotbarSlot(3));
    this.bottomBar.querySelector('#slot-4')?.addEventListener('click', () => this.activateHotbarSlot(4));
    this.bottomBar.querySelector('#slot-5')?.addEventListener('click', () => this.activateHotbarSlot(5));
  }

  private activateHotbarSlot(slot: number) {
    (window as any).audioService?.playSelect?.();

    if (slot === 1) {
      this.showScannerToast();
    } else if (slot === 2) {
      this.showTransitPassModal();
    } else if (slot === 3) {
      this.toggleHighContrast();
    } else if (slot === 4) {
      this.toggleScreenReaderTool();
    } else if (slot === 5) {
      this.showTasksModal();
    }
  }

  private showScannerToast() {
    this.showRobloxBadgeToast(
      '📱 ACCESSIBILITY RADAR ACTIVE',
      'Scan complete: Found 3 barrier zones in Commercial Quarter and Central Bus Terminal!',
      '📡'
    );
  }

  private showTransitPassModal() {
    this.showRobloxBadgeToast(
      '🚌 CITY METRO PASS',
      'Valid for all urban accessible bus and rapid transit routes.',
      '🎫'
    );
  }

  private toggleScreenReaderTool() {
    this.captioningMode = !this.captioningMode;
    const text = this.captioningMode ? '🔊 Screen Reader Mode Activated' : '🔇 Screen Reader Mode Deactivated';
    this.showRobloxBadgeToast('ACCESSIBILITY TOOL', text, '🔊');
  }

  // ─── 3. Roblox In-Game ESC Experience Menu ───────────────────────────────

  public showRobloxEscMenu() {
    const existing = document.getElementById('roblox-esc-menu');
    if (existing) {
      existing.remove();
      return;
    }

    const menu = document.createElement('div');
    menu.id = 'roblox-esc-menu';
    menu.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 15, 29, 0.88);
      backdrop-filter: blur(12px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
      font-family: Inter, system-ui, sans-serif;
      color: #f8fafc;
      pointer-events: auto;
    `;

    menu.innerHTML = `
      <div style="
        background: #1e293b;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        width: 480px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        overflow: hidden;
      ">
        <!-- Header -->
        <div style="
          padding: 16px 20px;
          background: #0f172a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        ">
          <div style="display:flex; align-items:center; gap:8px; font-weight:700; font-size:15px;">
            <span style="color:#38bdf8;">⬡</span>
            <span>EXPERIENCE SETTINGS</span>
          </div>
          <button id="rbx-esc-close" style="background:transparent; border:none; color:#94a3b8; font-size:18px; cursor:pointer;">✕</button>
        </div>

        <!-- Body -->
        <div style="padding: 20px; display:flex; flex-direction:column; gap:16px;">
          <!-- Controls Summary -->
          <div style="background:#0f172a; border-radius:8px; padding:12px 16px; font-size:12px; line-height:1.6;">
            <div style="font-weight:700; color:#38bdf8; margin-bottom:4px;">⌨ KEYBOARD & MOUSE CONTROLS:</div>
            <div style="color:#cbd5e1;">• <strong>WASD / Arrow Keys</strong>: Move Character</div>
            <div style="color:#cbd5e1;">• <strong>Left Shift</strong>: Roblox Sprint (24 studs/s)</div>
            <div style="color:#cbd5e1;">• <strong>Spacebar</strong>: Jump</div>
            <div style="color:#cbd5e1;">• <strong>Mouse Drag</strong>: Orbit Camera 360°</div>
            <div style="color:#cbd5e1;">• <strong>[E] Key</strong>: ProximityPrompt / Talk to Characters</div>
          </div>

          <!-- Quick Toggles -->
          <div style="display:flex; flex-direction:column; gap:10px;">
            <button id="esc-reset-char" style="
              background: #dc2626; color: #fff; padding: 10px; border: none; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;
            ">
              🔄 Reset Character (Respawn)
            </button>

            <button id="esc-contrast-toggle" style="
              background: #334155; color: #fff; padding: 10px; border: none; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer;
            ">
              🖵 Toggle High Contrast Mode
            </button>

            <button id="esc-restart-game" style="
              background: #475569; color: #fff; padding: 10px; border: none; border-radius: 6px; font-weight: 600; font-size: 12px; cursor: pointer;
            ">
              ↺ Restart Entire Experience
            </button>
          </div>

          <button id="esc-resume" style="
            background: #2563eb; color: #fff; padding: 12px; border: none; border-radius: 6px; font-weight: 700; font-size: 13px; cursor: pointer; margin-top: 4px;
          ">
            RESUME EXPERIENCE
          </button>
        </div>
      </div>
    `;

    this.overlay.appendChild(menu);

    menu.querySelector('#rbx-esc-close')?.addEventListener('click', () => menu.remove());
    menu.querySelector('#esc-resume')?.addEventListener('click', () => menu.remove());
    menu.querySelector('#esc-contrast-toggle')?.addEventListener('click', () => {
      this.toggleHighContrast();
      menu.remove();
    });
    menu.querySelector('#esc-reset-char')?.addEventListener('click', () => {
      menu.remove();
      this.showRobloxBadgeToast('RESPAWNED', 'Character reset to Access City Plaza!', '🔄');
    });
    menu.querySelector('#esc-restart-game')?.addEventListener('click', () => {
      gameStateManager.resetState();
      window.location.reload();
    });
  }

  // ─── 4. Roblox Badge Toast Notification ──────────────────────────────────

  public showRobloxBadgeToast(title: string, desc: string, icon = '🏆') {
    const toast = document.createElement('div');
    toast.className = 'rbx-badge-toast';
    toast.style.cssText = `
      position: absolute;
      top: 60px;
      right: 20px;
      background: rgba(15, 23, 42, 0.95);
      border: 1px solid rgba(251, 191, 36, 0.6);
      border-radius: 10px;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 50;
      box-shadow: 0 10px 30px rgba(0,0,0,0.6);
      font-family: Inter, system-ui, sans-serif;
      max-width: 320px;
      animation: rbxSlideIn 0.3s ease-out;
      pointer-events: auto;
    `;

    toast.innerHTML = `
      <div style="font-size:26px;">${icon}</div>
      <div style="display:flex; flex-direction:column; gap:2px;">
        <div style="color:#fbbf24; font-size:11px; font-weight:700; letter-spacing:0.5px;">${title}</div>
        <div style="color:#e2e8f0; font-size:11px; line-height:1.4;">${desc}</div>
      </div>
    `;

    this.overlay.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.4s';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  private showBadgesModal() {
    this.showRobloxBadgeToast(
      '🏆 ACCESS BADGES',
      'Earn badges by mastering Visual, Motor, and Cognitive design challenges!',
      '🎖️'
    );
  }

  private toggleHighContrast() {
    this.highContrastMode = !this.highContrastMode;
    document.body.classList.toggle('high-contrast', this.highContrastMode);
    this.showRobloxBadgeToast(
      'DISPLAY MODE',
      this.highContrastMode ? 'High Contrast Mode Enabled (WCAG AAA)' : 'High Contrast Mode Disabled',
      '🖵'
    );
  }

  // ─── Event Listeners ─────────────────────────────────────────────────────

  private listenToEvents() {
    eventBus.on(GameEvents.DIALOGUE_NODE, (node: DialogueNode) => {
      this.showDialogue(node);
    });

    eventBus.on(GameEvents.DIALOGUE_END, () => {
      this.hideDialogue();
    });

    eventBus.on(GameEvents.CHALLENGE_AVAILABLE, ({ characterId }: { characterId: string; challengeId?: string }) => {
      const difficulty = gameStateManager.getState().currentDifficulty;
      const challenge = challengeManager.getNextChallenge(characterId, difficulty);
      if (challenge) {
        this.currentChallenge = challenge;
      }
    });

    eventBus.on(GameEvents.STATE_UPDATED, () => {
      this.updateHUDScore();
      this.updateHUDVisibility();
    });

    eventBus.on('game:badge-unlocked', (badgeId: string) => {
      this.showBadgeUnlockToast(badgeId);
      this.updateHUDScore();
    });
  }

  // ─── Visual Novel Dialogue (Image 1 top-center & Image 2 bottom) ───────────

  private showDialogue(node: DialogueNode) {
    this.clearFeedback();
    this.clearChallenge();

    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
      this.typewriterInterval = null;
    }

    if (!this.dialoguePanel) {
      this.dialoguePanel = this.createDialoguePanel();
      this.overlay.appendChild(this.dialoguePanel);
    }

    const speaker = node.speaker || 'Fatima';
    const portraitContainer = this.dialoguePanel.querySelector('#vn-portrait') as HTMLDivElement;
    const speakerTag = this.dialoguePanel.querySelector('#vn-speaker-tag') as HTMLDivElement;
    const textBox = this.dialoguePanel.querySelector('#vn-dialogue-text') as HTMLDivElement;
    const challengeBtnContainer = this.dialoguePanel.querySelector('#vn-challenge-btn-container') as HTMLDivElement;

    // Render character SVG portrait
    portraitContainer.innerHTML = this.getCharacterPortraitSVG(speaker, 'worried', 190);

    // Set Speaker Tag
    speakerTag.textContent = speaker;
    const accentColor = this.getSpeakerColor(speaker);
    speakerTag.style.background = accentColor.bg;
    speakerTag.style.borderColor = accentColor.border;

    // Trigger TTS speak (Web Speech API)
    (window as any).audioService?.speak?.(node.text, speaker);

    // Typewriter effect
    textBox.textContent = '';
    let charIdx = 0;
    const text = node.text;
    this.typewriterInterval = setInterval(() => {
      if (charIdx < text.length) {
        textBox.textContent += text[charIdx++];
        // Skip playing blips if TTS is running/active to avoid noise overlapping
      } else {
        if (this.typewriterInterval) {
          clearInterval(this.typewriterInterval);
          this.typewriterInterval = null;
        }
      }
    }, 24);

    // CHALLENGE ! Button (Matches Image 1 top-center & Image 2)
    challengeBtnContainer.innerHTML = '';
    const challengeBtn = document.createElement('button');
    challengeBtn.id = 'vn-challenge-trigger-btn';
    challengeBtn.className = 'challenge-trigger-pulse';
    challengeBtn.style.cssText = `
      background: #dc2626;
      border: 3px solid #fecaca;
      border-radius: 4px;
      color: #ffffff;
      font-family: var(--font-pixel);
      font-size: 11px;
      font-weight: bold;
      padding: 10px 18px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(220, 38, 38, 0.6);
      display: flex;
      align-items: center;
      gap: 6px;
      letter-spacing: 1px;
    `;
    challengeBtn.innerHTML = `<span>CHALLENGE</span><span style="color:#fef08a;">!</span>`;

    challengeBtn.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      const charId = speaker.toLowerCase().includes('fatima') ? 'fatima' :
                     speaker.toLowerCase().includes('rahul') ? 'rahul' :
                     speaker.toLowerCase().includes('grandma') ? 'grandma' : 'fatima';
      const difficulty = gameStateManager.getState().currentDifficulty;
      const challenge = challengeManager.getNextChallenge(charId, difficulty);
      if (challenge) {
        this.hideDialogue();
        this.openChallengePanel(challenge);
      }
    });

    challengeBtnContainer.appendChild(challengeBtn);

    // Slide up with GSAP
    gsap.fromTo(this.dialoguePanel,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'expo.out' }
    );
  }

  private hideDialogue() {
    if (!this.dialoguePanel) return;
    gsap.to(this.dialoguePanel, {
      y: 80,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        this.dialoguePanel?.remove();
        this.dialoguePanel = null;
      }
    });
  }

  private createDialoguePanel(): HTMLDivElement {
    const panel = document.createElement('div');
    panel.id = 'visual-novel-dialogue';
    panel.style.cssText = `
      position: absolute;
      bottom: 48px;
      left: 20px;
      right: 20px;
      display: flex;
      align-items: flex-end;
      gap: 16px;
      z-index: 20;
      pointer-events: auto;
    `;

    panel.innerHTML = `
      <!-- Character Portrait on left -->
      <div id="vn-portrait" style="flex-shrink:0; filter:drop-shadow(0 8px 16px rgba(0,0,0,0.6));"></div>

      <!-- Dialogue Frame (Double gold border, dark navy background) -->
      <div id="vn-dialogue-frame" style="
        flex: 1;
        background: #141726;
        border: 3px solid #d97706;
        outline: 2px solid #1e293b;
        border-radius: 6px;
        padding: 16px 20px;
        position: relative;
        box-shadow: 0 10px 25px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        min-height: 125px;
      ">
        <!-- Speaker Tag (Top Left Tab) -->
        <div id="vn-speaker-tag" style="
          position: absolute;
          top: -16px;
          left: 14px;
          background: #6b21a8;
          border: 2px solid #fbbf24;
          border-radius: 4px;
          padding: 3px 14px;
          color: #ffffff;
          font-family: var(--font-pixel);
          font-size: 10px;
          letter-spacing: 1px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        ">Fatima</div>

        <!-- Dialogue Text Body -->
        <div style="flex: 1;">
          <div id="vn-dialogue-text" style="
            font-family: 'VT323', monospace;
            font-size: 24px;
            color: #f8fafc;
            line-height: 1.35;
            min-height: 56px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
          "></div>
        </div>

        <!-- Action Button on Right (CHALLENGE!) -->
        <div id="vn-challenge-btn-container" style="flex-shrink: 0;"></div>

        <!-- Bouncing Down Arrow Indicator at bottom-right -->
        <div class="bouncing-arrow" style="
          position: absolute;
          bottom: 8px;
          right: 12px;
          color: #fbbf24;
          font-size: 14px;
          cursor: pointer;
        ">▼</div>
      </div>
    `;

    panel.querySelector('#vn-dialogue-frame')?.addEventListener('click', () => {
      this.handleDialogueEnterPress();
    });

    const frame = panel.querySelector('#vn-dialogue-frame') as HTMLElement;
    if (frame) {
      frame.style.cursor = 'pointer';
    }

    return panel;
  }

  private handleDialogueEnterPress() {
    const now = Date.now();
    if (now - this.lastDialogueAdvanceTime < 250) {
      return; // 250ms debounce/cooldown to prevent accidental multiple advances
    }

    const currentNode = dialogueManager.getCurrentNode();
    if (!currentNode) return;

    this.lastDialogueAdvanceTime = now;

    // Check if typewriter is typing
    if (this.typewriterInterval) {
      // Skip typewriter to show full text
      clearInterval(this.typewriterInterval);
      this.typewriterInterval = null;
      const textBox = this.dialoguePanel?.querySelector('#vn-dialogue-text') as HTMLDivElement;
      if (textBox) {
        textBox.textContent = currentNode.text;
      }
      // Trigger select sound
      (window as any).audioService?.playSelect?.();
    } else {
      // Check if challenge button is visible. If so, press it to start challenge
      const challengeBtn = document.getElementById('vn-challenge-trigger-btn');
      if (challengeBtn) {
        (window as any).audioService?.playSelect?.();
        challengeBtn.click();
      } else {
        (window as any).audioService?.playSelect?.();
        dialogueManager.advance();
      }
    }
  }

  // ─── Challenge Interface (Design Scenario - Image 1 top-right) ────────────

  private openChallengePanel(challenge: Challenge) {
    this.clearChallenge();
    this.clearFeedback();
    this.currentChallenge = challenge;

    this.challengePanel = document.createElement('div');
    this.challengePanel.id = 'challenge-interface-panel';
    this.challengePanel.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(15, 17, 30, 0.88);
      backdrop-filter: blur(6px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 30;
      pointer-events: auto;
    `;

    const charName = this.getCharDisplayName(challenge.characterId);
    const difficultyStr = challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1);
    this.challengeSecondsLeft = 28;

    this.challengePanel.innerHTML = `
      <div style="
        background: #f1f3f9;
        color: #1e293b;
        border: 3px solid #334155;
        border-radius: 8px;
        width: 100%;
        max-width: 860px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        overflow: hidden;
        display: flex;
        flex-direction: column;
      " role="dialog" aria-label="Accessibility Challenge">
        
        <!-- Header -->
        <div style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-bottom: 2px solid #e2e8f0;
          background: #e9ecf5;
        ">
          <div style="font-family: var(--font-pixel); font-size: 13px; font-weight: bold; color: #1e293b;">
            ${charName} – ${difficultyStr}
          </div>
          <div id="challenge-timer-pill" style="
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 16px;
            padding: 4px 12px;
            font-family: var(--font-pixel);
            font-size: 11px;
            color: #92400e;
            display: flex;
            align-items: center;
            gap: 6px;
          ">
            ⏱ <span id="timer-text">00:${String(this.challengeSecondsLeft).padStart(2, '0')}</span>
          </div>
        </div>

        <!-- Body Content -->
        <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
          
          <!-- Scenario Description -->
          <div>
            <div style="font-family: var(--font-pixel); font-size: 9px; font-weight: bold; color: #475569; margin-bottom: 4px;">Scenario</div>
            <div style="font-family: var(--font-body); font-size: 15px; color: #1e293b; font-weight: 600;">
              ${challenge.scenario}
            </div>
          </div>

          <!-- Middle Split: Graphics comparison + MCQ Choices -->
          <div style="display: flex; gap: 16px; align-items: stretch;">
            
            <!-- Left: Graphic representation -->
            <div style="
              flex: 1.2;
              display: flex;
              align-items: center;
              justify-content: space-between;
              background: #ffffff;
              border: 2px solid #cbd5e1;
              border-radius: 6px;
              padding: 12px;
              gap: 10px;
            ">
              <!-- Before state -->
              <div style="flex: 1; text-align: center;">
                <div style="font-size: 11px; font-weight: bold; color: #64748b; margin-bottom: 6px;">Current Screen</div>
                ${this.renderBeforeAfterGfx(challenge.category, challenge.characterId, false)}
              </div>

              <!-- Arrow -->
              <div style="font-size: 20px; color: #3b82f6; font-weight: bold;">→</div>

              <!-- After state -->
              <div style="flex: 1.1; text-align: center;">
                <div style="font-size: 11px; font-weight: bold; color: #047857; margin-bottom: 6px;">Target Design</div>
                ${this.renderBeforeAfterGfx(challenge.category, challenge.characterId, true)}
              </div>
            </div>

            <!-- Right: MCQ Choices -->
            <div style="
              flex: 1;
              background: #ffffff;
              border: 2px solid #cbd5e1;
              border-radius: 6px;
              padding: 12px 16px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            ">
              <div>
                <div style="font-family: var(--font-pixel); font-size: 8px; font-weight: bold; color: #1e293b; margin-bottom: 2px;">
                  What should you improve?
                </div>
                <div style="font-size: 11px; color: #64748b; margin-bottom: 8px;">Select the best design choice.</div>

                <div id="choices-container" style="display:flex; flex-direction:column; gap:8px;">
                  ${challenge.options.map(opt => `
                    <div class="choice-card" data-opt-id="${opt.id}" style="
                      background: #ffffff;
                      border: 2px solid #cbd5e1;
                      border-radius: 6px;
                      padding: 10px 14px;
                      font-family: var(--font-body);
                      font-size: 13px;
                      font-weight: 500;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                      gap: 10px;
                      transition: all 0.2s;
                    ">
                      <div style="
                        width: 22px;
                        height: 22px;
                        border-radius: 50%;
                        background: #e2e8f0;
                        color: #475569;
                        font-family: var(--font-pixel);
                        font-size: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: bold;
                        flex-shrink: 0;
                      ">${opt.id.toUpperCase()}</div>
                      <div style="flex:1; color:#1e293b; line-height: 1.3;">${opt.label}</div>
                    </div>
                  `).join('')}
                </div>
                
                <div id="select-error-banner" style="
                  display: none;
                  background: #fef2f2;
                  border: 1px solid #fca5a5;
                  border-radius: 4px;
                  padding: 8px;
                  color: #b91c1c;
                  font-size: 11px;
                  margin-top: 10px;
                  font-weight: 500;
                "></div>
              </div>

              <!-- Submit Button -->
              <div style="margin-top: 12px;">
                <button id="btn-submit-scenario" style="
                  width: 100%;
                  background: #5b21b6;
                  color: #ffffff;
                  border: none;
                  border-radius: 4px;
                  padding: 10px;
                  font-family: var(--font-pixel);
                  font-size: 9px;
                  cursor: pointer;
                  box-shadow: 0 4px 8px rgba(91, 33, 182, 0.4);
                  transition: transform 0.1s;
                ">Submit Decision</button>
              </div>
            </div>
          </div>

          <!-- Bottom Question Label -->
          <div style="
            background: #ede9fe;
            border: 1px solid #c4b5fd;
            border-radius: 4px;
            padding: 8px 12px;
            font-size: 12px;
            color: #5b21b6;
            display: flex;
            align-items: center;
            gap: 8px;
          ">
            <span>❓</span>
            <span><strong>Question:</strong> ${challenge.question}</span>
          </div>

        </div>
      </div>
    `;

    this.overlay.appendChild(this.challengePanel);

    // Option Selection Logic
    let selectedOptionId = "";
    const cards = this.challengePanel.querySelectorAll('.choice-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        (window as any).audioService?.playSelect?.();
        cards.forEach(c => {
          (c as HTMLElement).style.border = '2px solid #cbd5e1';
          (c as HTMLElement).style.background = '#ffffff';
          const badge = c.querySelector('div') as HTMLElement;
          badge.style.background = '#e2e8f0';
          badge.style.color = '#475569';
        });

        selectedOptionId = (card as HTMLElement).dataset.optId || "";
        (card as HTMLElement).style.border = '3px solid #5b21b6';
        (card as HTMLElement).style.background = '#f5f3ff';
        const activeBadge = card.querySelector('div') as HTMLElement;
        activeBadge.style.background = '#5b21b6';
        activeBadge.style.color = '#ffffff';
        
        // Hide error banner if showing
        const banner = document.getElementById('select-error-banner');
        if (banner) banner.style.display = 'none';
      });
    });

    // Timer logic
    this.startChallengeTimer();

    // Wire submit
    this.challengePanel.querySelector('#btn-submit-scenario')?.addEventListener('click', () => {
      if (!selectedOptionId) {
        const banner = document.getElementById('select-error-banner');
        if (banner) {
          banner.style.display = 'block';
          banner.textContent = '⚠️ Please select a design option first!';
        }
        (window as any).audioService?.playGlitch?.();
        return;
      }

      const selectedOption = challenge.options.find(o => o.id === selectedOptionId);
      this.stopTimer();

      if (selectedOption && selectedOption.isCorrect) {
        this.clearChallenge();
        (window as any).audioService?.playCorrect?.();
        this.showTransformationModal(challenge);
      } else {
        this.clearChallenge();
        (window as any).audioService?.playGlitch?.();
        this.showIncorrectFeedback(challenge, selectedOption);
      }
    });

    // Animate in with GSAP
    gsap.fromTo(this.challengePanel.firstElementChild,
      { scale: 0.94, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'expo.out' }
    );
  }

  private renderBeforeAfterGfx(category: string, characterId: string, isAfter: boolean): string {
    if (category === 'auditory') {
      if (!isAfter) {
        return `
          <div style="background:#1e293b; border:1px solid #475569; border-radius:4px; padding:12px; font-size:11px; text-align:center; color:#94a3b8; width: 100%; height:90px; display:flex; flex-direction:column; justify-content:center; align-items:center;">
            <div style="font-weight:bold; margin-bottom:4px; color:#ef4444; font-size:9px;">No Subtitles</div>
            <div style="font-size:20px; margin-bottom:4px;">🗣️🔇</div>
            <div style="font-size:7.5px;">Video playing with muffled voice</div>
          </div>
        `;
      } else {
        return `
          <div style="background:#0f172a; border:2px solid #22c55e; border-radius:4px; padding:8px; font-size:11px; text-align:center; color:#f8fafc; width: 100%; height:90px; display:flex; flex-direction:column; justify-content:center; align-items:center; box-sizing:border-box;">
            <div style="font-weight:bold; margin-bottom:4px; color:#22c55e; font-size:9px;">Captions ON</div>
            <div style="font-size:20px; margin-bottom:4px;">🗣️🔊</div>
            <div style="background:rgba(0,0,0,0.6); padding:2px 4px; border-radius:2px; font-size:8px; color:#facc15; line-height:1.2; width:95%; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              [Grandma: "Book doctor for 4 PM"]
            </div>
          </div>
        `;
      }
    } else if (characterId === 'grandma') {
      // Color barrier
      if (!isAfter) {
        return `
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:4px; padding:10px; font-size:11px; text-align:left; width: 100%; height:90px; display:flex; flex-direction:column; justify-content:center; box-sizing:border-box;">
            <div style="font-weight:bold; margin-bottom:6px; color:#ef4444; font-size:8.5px; text-align:center;">Color Only States</div>
            <div style="display:flex; gap:6px; align-items:center; margin-bottom:4px;">
              <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#22c55e; flex-shrink:0;"></span>
              <span style="font-size:8px; color:#94a3b8;">Green Dot Only</span>
            </div>
            <div style="display:flex; gap:6px; align-items:center;">
              <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#ef4444; flex-shrink:0;"></span>
              <span style="font-size:8px; color:#94a3b8;">Red Dot Only</span>
            </div>
          </div>
        `;
      } else {
        return `
          <div style="background:#f0fdf4; border:1.5px solid #22c55e; border-radius:4px; padding:10px; font-size:11px; text-align:left; width: 100%; height:90px; display:flex; flex-direction:column; justify-content:center; box-sizing:border-box;">
            <div style="font-weight:bold; margin-bottom:6px; color:#15803d; font-size:8.5px; text-align:center;">Icons & Text</div>
            <div style="display:flex; gap:6px; align-items:center; margin-bottom:4px;">
              <span style="display:flex; align-items:center; justify-content:center; width:12px; height:12px; border-radius:50%; background:#22c55e; color:#fff; font-size:7px; font-weight:bold; flex-shrink:0;">✓</span>
              <span style="font-size:9px; font-weight:bold; color:#166534;">Available</span>
            </div>
            <div style="display:flex; gap:6px; align-items:center;">
              <span style="display:flex; align-items:center; justify-content:center; width:12px; height:12px; border-radius:50%; background:#ef4444; color:#fff; font-size:7px; font-weight:bold; flex-shrink:0;">✕</span>
              <span style="font-size:9px; font-weight:bold; color:#991b1b;">Unavailable</span>
            </div>
          </div>
        `;
      }
    } else {
      // Screen reader/Visual/unlabeled input
      if (!isAfter) {
        return `
          <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:4px; padding:8px 10px; font-size:11px; text-align:left; width: 100%; height:90px; display:flex; flex-direction:column; justify-content:center; box-sizing:border-box;">
            <div style="font-weight:bold; margin-bottom:4px; color:#ef4444; font-size:9px; text-align:center;">Unlabeled Fields</div>
            <input type="text" placeholder=" " disabled style="width:100%; border:1px solid #cbd5e1; border-radius:3px; padding:4px; margin-bottom:4px; height:16px; background:#fafafa;"/>
            <input type="text" placeholder=" " disabled style="width:100%; border:1px solid #cbd5e1; border-radius:3px; padding:4px; height:16px; background:#fafafa;"/>
          </div>
        `;
      } else {
        return `
          <div style="background:#f0fdf4; border:1.5px solid #22c55e; border-radius:4px; padding:8px 10px; font-size:11px; text-align:left; width: 100%; height:90px; display:flex; flex-direction:column; justify-content:center; box-sizing:border-box;">
            <div style="font-weight:bold; margin-bottom:2px; color:#15803d; font-size:9px; text-align:center;">Accessible labels</div>
            <label style="display:block; font-size:7px; font-weight:bold; color:#15803d; margin-bottom:1px;">Name</label>
            <input type="text" value="John Doe" disabled style="width:100%; border:1px solid #86efac; border-radius:3px; padding:2px 4px; background:#fff; height:14px; color:#1e293b; font-size:8px;"/>
            <label style="display:block; font-size:7px; font-weight:bold; color:#15803d; margin-bottom:1px; margin-top:2px;">Email</label>
            <input type="text" value="john@email.com" disabled style="width:100%; border:1px solid #86efac; border-radius:3px; padding:2px 4px; background:#fff; height:14px; color:#1e293b; font-size:8px;"/>
          </div>
        `;
      }
    }
  }

  private startChallengeTimer() {
    this.stopTimer();
    this.challengeTimerInterval = setInterval(() => {
      this.challengeSecondsLeft--;
      const textEl = document.getElementById('timer-text');
      if (textEl) {
        textEl.textContent = `00:${String(this.challengeSecondsLeft).padStart(2, '0')}`;
      }
      if (this.challengeSecondsLeft <= 0) {
        this.stopTimer();
        this.clearChallenge();
        (window as any).audioService?.playGlitch?.();
        this.showIncorrectFeedback(this.currentChallenge!, null);
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.challengeTimerInterval) {
      clearInterval(this.challengeTimerInterval);
      this.challengeTimerInterval = null;
    }
  }

  private clearChallenge() {
    this.stopTimer();
    this.challengePanel?.remove();
    this.challengePanel = null;
  }

  // ─── Feedback Modals (Image 1 Middle Row) ─────────────────────────────────

  private showTransformationModal(challenge: Challenge) {
    this.clearFeedback();

    const modal = document.createElement('div');
    modal.className = 'feedback-overlay-modal';
    modal.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 12, 22, 0.9);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 40;
      pointer-events: auto;
    `;

    modal.innerHTML = `
      <div style="
        background: #f8fafc;
        border: 3px solid #334155;
        border-radius: 8px;
        max-width: 650px;
        width: 100%;
        padding: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      ">
        <div style="font-family: var(--font-pixel); font-size: 11px; color: #1e293b; text-align: center; margin-bottom: 16px;">
          INTERFACE TRANSFORMATION APPLIED
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:20px;">
          <!-- BEFORE -->
          <div style="flex:1; text-align:center;">
            <div style="font-size:10px; font-weight:bold; color:#64748b; margin-bottom:4px;">BEFORE</div>
            ${this.renderBeforeAfterGfx(challenge.category, challenge.characterId, false)}
          </div>

          <div style="font-size:24px; color:#2563eb; font-weight:bold;">→</div>

          <!-- AFTER -->
          <div style="flex:1.1; text-align:center;">
            <div style="font-size:10px; font-weight:bold; color:#047857; margin-bottom:4px;">AFTER</div>
            ${this.renderBeforeAfterGfx(challenge.category, challenge.characterId, true)}
          </div>
        </div>

        <button id="btn-trans-continue" style="
          width: 100%;
          background: #5b21b6;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px;
          font-family: var(--font-pixel);
          font-size: 9px;
          cursor: pointer;
        ">APPLY TRANSFORMATION & REACTION →</button>
      </div>
    `;

    this.overlay.appendChild(modal);

    modal.querySelector('#btn-trans-continue')?.addEventListener('click', () => {
      (window as any).audioService?.playCorrect?.();
      modal.remove();
      this.showSuccessFeedback(challenge);
    });
  }

  private showSuccessFeedback(challenge: Challenge) {
    this.clearFeedback();

    // Record challenge completion score
    gameStateManager.recordChallengeCompletion(challenge.id, challenge.category, challenge.points, challenge.points);

    const modal = document.createElement('div');
    modal.className = 'feedback-overlay-modal';
    modal.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 12, 22, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 40;
      pointer-events: auto;
    `;

    const sColor = this.getSpeakerColor(challenge.characterId);

    modal.innerHTML = `
      <div style="
        background: #fdfaf6;
        border: 3px solid ${sColor.border};
        border-radius: 8px;
        max-width: 580px;
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      ">
        <!-- Portrait -->
        <div style="flex-shrink:0;">
          ${this.getCharacterPortraitSVG(challenge.characterId, 'happy', 140)}
        </div>

        <!-- Speech bubble + Points -->
        <div style="flex:1; display:flex; flex-direction:column; gap:12px;">
          <div style="font-family:var(--font-pixel); font-size:10px; color:${sColor.border}; font-weight:bold;">
            SUCCESS FEEDBACK
          </div>

          <div style="
            background: #ffffff;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            padding: 12px 16px;
            font-family: var(--font-body);
            font-size: 14px;
            color: #1e293b;
            line-height: 1.4;
            font-weight: 500;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          ">
            "Correct choice! ${challenge.explanation}"
          </div>

          <!-- Score Badge & Next Button -->
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div style="
              display:flex;
              align-items:center;
              gap:6px;
              font-family:var(--font-pixel);
              font-size:11px;
              color:${sColor.border};
              font-weight:bold;
            ">
              <span style="font-size:16px;">★</span> +${challenge.points} Points
            </div>

            <button id="btn-success-continue" style="
              background: #047857;
              color: #ffffff;
              border: none;
              border-radius: 4px;
              padding: 8px 16px;
              font-family: var(--font-pixel);
              font-size: 9px;
              cursor: pointer;
            ">CONTINUE →</button>
          </div>
        </div>
      </div>
    `;

    this.overlay.appendChild(modal);

    modal.querySelector('#btn-success-continue')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
      this.showJoyousReactionModal(challenge);
    });
  }

  private showJoyousReactionModal(challenge: Challenge) {
    this.clearFeedback();

    const modal = document.createElement('div');
    modal.className = 'feedback-overlay-modal';
    modal.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 12, 22, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 40;
      pointer-events: auto;
    `;

    const sColor = this.getSpeakerColor(challenge.characterId);
    const charName = this.getCharDisplayName(challenge.characterId);

    modal.innerHTML = `
      <div style="
        background: #fdfaf6;
        border: 3px solid ${sColor.border};
        border-radius: 8px;
        max-width: 580px;
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      ">
        <div style="flex-shrink:0;">
          ${this.getCharacterPortraitSVG(challenge.characterId, 'joyous', 140)}
        </div>

        <div style="flex:1; display:flex; flex-direction:column; gap:12px;">
          <div style="font-family:var(--font-pixel); font-size:10px; color:${sColor.border}; font-weight:bold;">
            ${charName.toUpperCase()} REACTION
          </div>

          <div style="
            background: #ffffff;
            border: 2px solid #cbd5e1;
            border-radius: 8px;
            padding: 12px 16px;
            font-family: var(--font-body);
            font-size: 14px;
            color: #1e293b;
            line-height: 1.4;
            font-weight: 500;
          ">
            "Thank you so much! It's amazing how much difference a proper design makes. I can navigate this site with complete independence now!"
          </div>

          <div style="text-align:right;">
            <button id="btn-joy-done" style="
              background: ${sColor.border};
              color: #ffffff;
              border: none;
              border-radius: 4px;
              padding: 8px 18px;
              font-family: var(--font-pixel);
              font-size: 9px;
              cursor: pointer;
            ">EXPLORE CITY →</button>
          </div>
        </div>
      </div>
    `;

    this.overlay.appendChild(modal);

    modal.querySelector('#btn-joy-done')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
      
      // Update UI HUD points counter
      this.updateHUDScore();
      
      this.hideDialogue();
      dialogueManager.advance();
    });
  }

  private showIncorrectFeedback(challenge: Challenge, selectedOption: any | null) {
    this.clearFeedback();

    const modal = document.createElement('div');
    modal.className = 'feedback-overlay-modal';
    modal.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 12, 22, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 40;
      pointer-events: auto;
    `;

    const charName = this.getCharDisplayName(challenge.characterId);
    const feedbackMsg = selectedOption 
      ? selectedOption.feedback 
      : "Time ran out! Try to think about the user's specific access barriers.";

    modal.innerHTML = `
      <div style="
        background: #fff8f8;
        border: 3px solid #dc2626;
        border-radius: 8px;
        max-width: 440px;
        width: 100%;
        padding: 24px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      ">
        <div style="
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #fee2e2;
          color: #dc2626;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 12px;
          border: 2px solid #ef4444;
        ">✕</div>

        <div style="font-family:var(--font-pixel); font-size:10px; color:#dc2626; margin-bottom:8px;">
          INCORRECT / TRY AGAIN
        </div>

        <div style="font-family:var(--font-body); font-size:15px; color:#1e293b; font-weight:600; margin-bottom:16px;">
          This design might still be confusing for ${charName}.<br>
          <span style="font-size: 13px; font-weight:normal; color:#4b5563; display:block; margin-top:8px;">
            ${feedbackMsg}
          </span>
        </div>

        <div style="display:flex; gap:10px; justify-content:center;">
          <button id="btn-retry-hint" style="
            background: #475569;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            font-family: var(--font-pixel);
            font-size: 8.5px;
            cursor: pointer;
          ">💡 Show Hint</button>

          <button id="btn-retry-action" style="
            background: #5b21b6;
            color: #fff;
            border: none;
            border-radius: 4px;
            padding: 8px 20px;
            font-family: var(--font-pixel);
            font-size: 8.5px;
            cursor: pointer;
          ">Retry</button>
        </div>
      </div>
    `;

    this.overlay.appendChild(modal);

    modal.querySelector('#btn-retry-action')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
      this.openChallengePanel(challenge);
    });

    modal.querySelector('#btn-retry-hint')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
      this.showHintModal(challenge);
    });
  }

  private showHintModal(challenge: Challenge) {
    this.clearFeedback();

    const modal = document.createElement('div');
    modal.className = 'feedback-overlay-modal';
    modal.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 12, 22, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 40;
      pointer-events: auto;
    `;

    modal.innerHTML = `
      <div style="
        background: #fffbeb;
        border: 3px solid #f59e0b;
        border-radius: 8px;
        max-width: 440px;
        width: 100%;
        padding: 24px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      ">
        <div style="font-size:36px; margin-bottom:8px;">💡</div>
        <div style="font-family:var(--font-pixel); font-size:11px; color:#b45309; margin-bottom:8px;">
          WCAG Accessibility Principle
        </div>
        <div style="font-family:var(--font-body); font-size:15px; color:#1e293b; font-weight:600; margin-bottom:16px;">
          Remember: ${challenge.accessibilityPrinciple || "Design should be perceivable, operable, understandable, and robust."}<br>
          <span style="font-size: 13px; font-weight:normal; color:#78350f; display:block; margin-top:8px;">
            Target Goal: ${challenge.question}
          </span>
        </div>
        <button id="btn-hint-continue" style="
          background: #5b21b6;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 8px 20px;
          font-family: var(--font-pixel);
          font-size: 9px;
          cursor: pointer;
        ">GOT IT →</button>
      </div>
    `;

    this.overlay.appendChild(modal);

    modal.querySelector('#btn-hint-continue')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
      this.openChallengePanel(challenge);
    });
  }

  private clearFeedback() {
    document.querySelectorAll('.feedback-overlay-modal').forEach(m => m.remove());
  }

  // ─── Tasks & Menu Modals ──────────────────────────────────────────────────

  private showTasksModal() {
    this.clearFeedback();
    const modal = document.createElement('div');
    modal.className = 'feedback-overlay-modal';
    modal.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 12, 22, 0.88);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 40;
      pointer-events: auto;
    `;

    modal.innerHTML = `
      <div style="
        background: #1e293b;
        border: 3px solid #3b82f6;
        border-radius: 8px;
        max-width: 520px;
        width: 100%;
        padding: 20px;
        color: #f8fafc;
        box-shadow: 0 20px 40px rgba(0,0,0,0.8);
      ">
        <div style="font-family:var(--font-pixel); font-size:12px; color:#38bdf8; margin-bottom:12px; display:flex; justify-content:space-between;">
          <span>📋 ACCESSIBLE CITY TASKS</span>
          <span style="color:#fbbf24;">★★★</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:10px; font-size:13px; margin-bottom:16px;">
          <div style="background:#0f172a; padding:10px; border-radius:4px; border-left:4px solid #3b82f6;">
            <strong>Rahul (Hospital)</strong> — Visual & Screen Reader Accessibility
          </div>
          <div style="background:#0f172a; padding:10px; border-radius:4px; border-left:4px solid #7c3aed;">
            <strong>Fatima (Bus Stop)</strong> — Cognitive & Information Clarity
          </div>
          <div style="background:#0f172a; padding:10px; border-radius:4px; border-left:4px solid #f59e0b;">
            <strong>Grandma Mira (Pharmacy)</strong> — Motor & Large Targets
          </div>
        </div>

        <button id="btn-view-evolution" style="
          width: 100%;
          background: #10b981;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 8px;
          font-family: var(--font-pixel);
          font-size: 9px;
          cursor: pointer;
        ">🖥️ VIEW HEALTHCARE PORTAL EVOLUTION</button>

        <button id="btn-tasks-close" style="
          width: 100%;
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 8px;
          font-family: var(--font-pixel);
          font-size: 9px;
          cursor: pointer;
        ">CLOSE</button>
      </div>
    `;

    this.overlay.appendChild(modal);
    
    modal.querySelector('#btn-tasks-close')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
    });

    modal.querySelector('#btn-view-evolution')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
      this.showWebsiteEvolutionModal();
    });
  }

  private showWebsiteEvolutionModal() {
    this.clearFeedback();
    
    const state = gameStateManager.getState();
    const improvements = state.websiteImprovements || {};

    const modal = document.createElement('div');
    modal.className = 'feedback-overlay-modal';
    modal.style.cssText = `
      position: absolute;
      inset: 0;
      background: rgba(10, 12, 22, 0.95);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 45;
      pointer-events: auto;
    `;

    // Calculate accessibility percentage score
    const totalImps = 4;
    let activeImps = 0;
    
    // Normalize both camelCase and kebab-case or alternate names for improvements keys
    const hasAria = improvements.ariaLabels || improvements['aria-labels'] || improvements.semanticLabels;
    const hasCaptions = improvements.captions || improvements['captions'];
    const hasColor = improvements.colorIndicators || improvements['color-indicators'] || improvements.colorIndependentIndicators;
    const hasLarger = improvements.largerTargets || improvements['larger-targets'];

    if (hasAria) activeImps++;
    if (hasCaptions) activeImps++;
    if (hasColor) activeImps++;
    if (hasLarger) activeImps++;

    const rating = Math.round((activeImps / totalImps) * 100);

    modal.innerHTML = `
      <div style="
        background: #0f172a;
        color: #f8fafc;
        border: 3px solid #38bdf8;
        border-radius: 8px;
        max-width: 600px;
        width: 100%;
        padding: 24px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.9);
        font-family: var(--font-body);
        display: flex;
        flex-direction: column;
        gap: 16px;
      ">
        <div style="font-family:var(--font-pixel); font-size:11px; color:#38bdf8; display:flex; justify-content:space-between; border-bottom:1px solid #334155; padding-bottom:10px;">
          <span>🖥️ CITYCARE PORTAL EVOLUTION</span>
          <span style="color:#10b981;">A11Y RATING: ${rating}%</span>
        </div>

        <div style="font-size:12px; color:#94a3b8; line-height:1.4;">
          Watch the medical booking portal transform as you correct accessibility barriers in Access City.
        </div>

        <!-- Simulated Website Preview Screen -->
        <div style="
          background: #ffffff;
          border: 2px solid #cbd5e1;
          border-radius: 6px;
          padding: 16px;
          color: #1e293b;
          font-size: 13px;
          transition: all 0.3s;
          box-shadow: inset 0 2px 8px rgba(0,0,0,0.05);
          text-align: left;
        ">
          <!-- Banner -->
          <div style="
            background: #1e3a8a;
            color: #ffffff;
            padding: 8px 12px;
            font-size: 11px;
            font-weight: bold;
            border-radius: 4px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
          ">
            <span>CityCare Hospital</span>
            <span style="font-size: 9px; font-weight: normal;">
              Subtitles: ${hasCaptions ? 'ON (CC)' : 'OFF'}
            </span>
          </div>

          <!-- Labeled or Unlabeled Fields -->
          ${hasAria 
            ? `
              <div style="margin-bottom: 10px;">
                <label style="display:block; font-size:11px; font-weight:bold; color:#1e3a8a; margin-bottom:4px;">Date of Appointment *</label>
                <div style="border:1px solid #cbd5e1; padding:8px; border-radius:4px; font-size:13px; color:#1e293b; background:#fff;">23 August 2026</div>
              </div>
              `
            : `
              <div style="margin-bottom: 10px;">
                <div style="border:1px solid #cbd5e1; padding:4px; font-size:9px; color:#94a3b8; background:#f8fafc;">23 Aug 2026 (Date Field)</div>
              </div>
              `
          }

          <!-- Labeled or Unlabeled Time Selection -->
          ${hasAria 
            ? `
              <div style="margin-bottom: 12px;">
                <label style="display:block; font-size:11px; font-weight:bold; color:#1e3a8a; margin-bottom:4px;">Time Slot *</label>
                <div style="border:1px solid #cbd5e1; padding:8px; border-radius:4px; font-size:13px; color:#1e293b; background:#fff;">04:00 PM</div>
              </div>
              `
            : `
              <div style="margin-bottom: 12px;">
                <div style="border:1px solid #cbd5e1; padding:4px; font-size:9px; color:#94a3b8; background:#f8fafc;">04:00 PM (Time Field)</div>
              </div>
              `
          }

          <!-- Status Indicator -->
          <div style="margin-bottom: 14px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:10px; font-weight:bold;">Status:</span>
            ${hasColor 
              ? `<span style="background:#bbf7d0; color:#14532d; padding:2px 8px; border-radius:3px; font-size:10px; font-weight:bold; display:flex; align-items:center; gap:4px;">✓ Available</span>`
              : `<span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#22c55e;" title="Green dot status"></span>`
            }
          </div>

          <!-- Confirm button -->
          <div>
            <button style="
              width: 100%;
              background: #047857;
              color: #ffffff;
              border: none;
              border-radius: 4px;
              padding: ${hasLarger ? '10px' : '4px'};
              font-family: var(--font-pixel);
              font-size: ${hasLarger ? '10px' : '7.5px'};
              cursor: pointer;
            ">CONFIRM APPOINTMENT</button>
          </div>
        </div>

        <!-- Improvements List checklist -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; font-size:11px; background:#0f172a; padding:10px; border-radius:4px; border:1px solid #334155;">
          <div style="color: ${improvements.ariaLabels ? '#34d399' : '#64748b'};">
            ${improvements.ariaLabels ? '✓' : '✗'} Semantic Input Labels
          </div>
          <div style="color: ${improvements.captions ? '#34d399' : '#64748b'};">
            ${improvements.captions ? '✓' : '✗'} Subtitles & Audio Captions
          </div>
          <div style="color: ${improvements.colorIndicators ? '#34d399' : '#64748b'};">
            ${improvements.colorIndicators ? '✓' : '✗'} Shape/Icon Indicators
          </div>
          <div style="color: ${improvements.largerTargets ? '#34d399' : '#64748b'};">
            ${improvements.largerTargets ? '✓' : '✗'} Large Tap/Click Targets
          </div>
        </div>

        <button id="btn-evolution-close" style="
          width: 100%;
          background: #38bdf8;
          color: #0f172a;
          border: none;
          border-radius: 4px;
          padding: 10px;
          font-family: var(--font-pixel);
          font-size: 9.5px;
          font-weight: bold;
          cursor: pointer;
        ">BACK TO QUESTS</button>
      </div>
    `;

    this.overlay.appendChild(modal);

    modal.querySelector('#btn-evolution-close')?.addEventListener('click', () => {
      (window as any).audioService?.playSelect?.();
      modal.remove();
      this.showTasksModal();
    });
  }



  // ─── Helpers ─────────────────────────────────────────────────────────────

  private getCharacterPortraitSVG(speaker: string, mood: CharacterMood, size: number): string {
    const s = speaker.toLowerCase();
    if (s.includes('fatima')) return PortraitAssets.getFatimaSVG(mood, size);
    if (s.includes('ava') || s.includes('player')) return PortraitAssets.getAvaSVG(size);
    if (s.includes('rahul')) return PortraitAssets.getRahulSVG(size);
    if (s.includes('grandma') || s.includes('mira')) return PortraitAssets.getGrandmaSVG(size);
    if (s.includes('kofi')) return PortraitAssets.getKofiSVG(size);
    if (s.includes('elena')) return PortraitAssets.getElenaSVG(size);
    if (s.includes('yuki')) return PortraitAssets.getYukiSVG(size);
    return PortraitAssets.getAvaSVG(size);
  }

  private getSpeakerColor(speaker: string): { bg: string; border: string } {
    const s = speaker.toLowerCase();
    if (s.includes('fatima')) return { bg: '#6b21a8', border: '#fbbf24' };
    if (s.includes('ava')) return { bg: '#065f46', border: '#10b981' };
    if (s.includes('rahul')) return { bg: '#1e3a8a', border: '#60a5fa' };
    if (s.includes('grandma') || s.includes('mira')) return { bg: '#b45309', border: '#f59e0b' };
    if (s.includes('kofi')) return { bg: '#1e40af', border: '#60a5fa' };
    if (s.includes('elena')) return { bg: '#065f46', border: '#34d399' };
    if (s.includes('yuki')) return { bg: '#854d0e', border: '#facc15' };
    return { bg: '#1e293b', border: '#64748b' };
  }

  private getCharDisplayName(characterId: string): string {
    const map: Record<string, string> = {
      rahul: 'Rahul',
      fatima: 'Fatima',
      grandma: 'Grandma Mira',
      ava: 'Ava',
      kofi: 'Kofi',
      elena: 'Elena',
      yuki: 'Yuki',
    };
    return map[characterId] ?? (characterId.charAt(0).toUpperCase() + characterId.slice(1));
  }
}
