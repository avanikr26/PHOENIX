import Phaser from 'phaser';
import { gameStateManager } from '../core/GameStateManager';
import { audioService } from '../services/AudioService';
import { ThreeTitleBG } from '../three/ThreeTitleBG';

/**
 * TitleScene — Access City title screen.
 *
 * Warm retro RPG identity. NO cyberpunk neon.
 * Colors: warm cream, muted purple accent, gold.
 *
 * RELIABILITY: The start button lives in a DOM overlay (z-index 200)
 * so it cannot be blocked by Three.js or Phaser canvas layers.
 */
export class TitleScene extends Phaser.Scene {
  private threeBg: ThreeTitleBG | null = null;
  private titleOverlay: HTMLDivElement | null = null;

  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;
    gameStateManager.setCurrentScene('TitleScene');

    // ── Attempt 3D background (silently ignore failures) ──────────────────
    try {
      this.threeBg = new ThreeTitleBG('game-root');
    } catch (err) {
      console.warn('3D Title BG unavailable:', err);
    }

    // Clean up on shutdown
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.threeBg?.destroy();
      this.threeBg = null;
      this.titleOverlay?.remove();
      this.titleOverlay = null;
    });

    // ── Phaser: dark overlay for text contrast ───────────────────────────
    const bg = this.add.graphics();
    bg.fillStyle(0x0f0f1b, 0.65);
    bg.fillRect(0, 0, width, height);

    // Subtle star field
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.45;
      const s = Math.random() < 0.3 ? 2 : 1;
      this.add.rectangle(x, y, s, s, 0xf5f0e8, Math.random() * 0.4 + 0.1).setDepth(0);
    }

    // ── Title text (Phaser) ───────────────────────────────────────────────
    const titleText = this.add.text(width / 2, height * 0.26, 'INCLUSIVE INTERFACE', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: clamp(18, width / 34, 28) + 'px',
      color: '#f5f0e8',
      stroke: '#2d2033',
      strokeThickness: 4,
      shadow: { offsetX: 2, offsetY: 2, color: '#c9a84c', blur: 0, fill: true },
    }).setOrigin(0.5).setAlpha(0).setDepth(2);

    const subtitleText = this.add.text(width / 2, height * 0.36, 'ACCESS CITY', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: clamp(10, width / 68, 14) + 'px',
      color: '#c9a84c',
      letterSpacing: 8,
      stroke: '#1a1a2e',
      strokeThickness: 3,
    }).setOrigin(0.5).setAlpha(0).setDepth(2);

    const taglineText = this.add.text(width / 2, height * 0.47,
      'Design a world where everyone belongs.', {
        fontFamily: '"VT323", monospace',
        fontSize: clamp(18, width / 44, 28) + 'px',
        color: '#a89880',
      }
    ).setOrigin(0.5).setAlpha(0).setDepth(2);

    const questionText = this.add.text(width / 2, height * 0.54,
      'What if the interface wasn\'t designed for you?', {
        fontFamily: '"VT323", monospace',
        fontSize: clamp(16, width / 52, 24) + 'px',
        color: '#7c5cbf',
      }
    ).setOrigin(0.5).setAlpha(0).setDepth(2);

    // Animate title texts in
    this.tweens.add({ targets: titleText,   alpha: 1, duration: 600, delay: 200, ease: 'Sine.easeOut' });
    this.tweens.add({ targets: subtitleText, alpha: 1, duration: 500, delay: 500, ease: 'Sine.easeOut' });
    this.tweens.add({ targets: taglineText,  alpha: 1, duration: 500, delay: 900, ease: 'Sine.easeOut' });
    this.tweens.add({ targets: questionText, alpha: 1, duration: 500, delay: 1100, ease: 'Sine.easeOut' });

    // Character sprites (if textures loaded)
    const charY = height * 0.72;
    const characters = ['char-ava', 'char-rahul', 'char-fatima', 'char-grandma'];
    const spacing = width / (characters.length + 1);
    characters.forEach((key, i) => {
      if (!this.textures.exists(key)) return;
      const sprite = this.add.sprite(spacing * (i + 1), charY, key)
        .setScale(3).setAlpha(0).setDepth(2);
      this.tweens.add({
        targets: sprite, alpha: 1, y: charY - 4,
        duration: 400, delay: 1200 + i * 200, ease: 'Back.easeOut',
        onComplete: () => {
          this.tweens.add({ targets: sprite, y: charY, duration: 1200 + i * 200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
        },
      });
    });

    // Character name labels
    const labels = [
      { name: 'Ava',     color: '#5a9e6f' },
      { name: 'Rahul',   color: '#4a7a9e' },
      { name: 'Fatima',  color: '#7c3aed' },
      { name: 'Grandma', color: '#d97706' },
    ];
    labels.forEach((l, i) => {
      this.add.text(spacing * (i + 1), charY + 28, l.name, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '7px',
        color: l.color,
        stroke: '#1a1a2e',
        strokeThickness: 3,
      }).setOrigin(0.5).setAlpha(0).setDepth(2);
    });

    // ── DOM START BUTTON (always on top, cannot be blocked) ───────────────
    this.buildDomStartButton();
  }

  /**
   * Creates a DOM-based start button that sits at z-index 200 above all
   * Three.js and Phaser canvases, ensuring it is always clickable.
   */
  private buildDomStartButton() {
    const overlay = document.createElement('div');
    overlay.id = 'title-start-overlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 200;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 6vh;
      pointer-events: none;
    `;

    overlay.innerHTML = `
      <div id="title-btn-wrapper" style="
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        opacity: 0;
        transition: opacity 0.6s ease;
        pointer-events: auto;
      ">
        <button id="title-begin-btn" style="
          background: #7c5cbf;
          color: #ffffff;
          border: 2px solid #c9a84c;
          border-radius: 4px;
          padding: 14px 36px;
          font-family: var(--font-pixel), 'Press Start 2P', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(124, 92, 191, 0.5);
          transition: background 0.15s, box-shadow 0.15s, transform 0.1s;
        ">
          BEGIN EXPERIENCE
        </button>
        <div style="
          font-family: var(--font-pixel), 'Press Start 2P', monospace;
          font-size: 7px;
          color: #6b5c7c;
          letter-spacing: 1px;
        ">[ SPACE / ENTER ] to start</div>
      </div>
    `;

    // Append directly to document.body to escape all stacking contexts
    document.body.appendChild(overlay);
    this.titleOverlay = overlay;

    // Fade in button after 1.5s
    const wrapper = overlay.querySelector('#title-btn-wrapper') as HTMLDivElement;
    const btn = overlay.querySelector('#title-begin-btn') as HTMLButtonElement;

    const showTimer = setTimeout(() => {
      if (wrapper) wrapper.style.opacity = '1';
    }, 1500);

    // Hover effects
    btn.addEventListener('mouseenter', () => {
      btn.style.background = '#8c6fd4';
      btn.style.boxShadow = '0 6px 28px rgba(140, 111, 212, 0.7)';
      btn.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.background = '#7c5cbf';
      btn.style.boxShadow = '0 4px 20px rgba(124, 92, 191, 0.5)';
      btn.style.transform = 'translateY(0)';
    });

    // ── Single guarded handler ────────────────────────────────────────────
    let started = false;
    const startGame = () => {
      if (started) return;
      started = true;
      clearTimeout(showTimer);
      console.log('[TitleScene] Starting OpeningScene...');
      try { audioService.playSelect(); } catch (_) { /* ignore */ }
      gameStateManager.resetState();
      gameStateManager.setCurrentScene('OpeningScene');
      this.titleOverlay?.remove();
      this.titleOverlay = null;
      this.scene.start('OpeningScene');
    };

    btn.addEventListener('click', startGame);

    // Keyboard shortcuts (registered on Phaser input so they clean up properly)
    this.input.keyboard?.on('keydown-SPACE', startGame);
    this.input.keyboard?.on('keydown-ENTER', startGame);
  }
}

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(val)));
}
