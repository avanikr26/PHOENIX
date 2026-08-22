import Phaser from 'phaser';
import { gameStateManager } from '../core/GameStateManager';
import { audioService } from '../services/AudioService';

/**
 * TitleScene — Access City title screen.
 *
 * Warm retro RPG identity. NO cyberpunk neon.
 * Colors: warm cream, muted purple accent, gold.
 */
export class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  create() {
    const { width, height } = this.scale;

    // ── Background — warm dark night city ───────────────────────────────
    const bg = this.add.graphics();
    bg.fillGradientStyle(0x1a1a2e, 0x1a1a2e, 0x2d2033, 0x2d2033, 1);
    bg.fillRect(0, 0, width, height);

    // Distant city silhouette at top (warm, not neon)
    if (this.textures.exists('city-skyline-bg')) {
      this.add.image(width / 2, 90, 'city-skyline-bg')
        .setDisplaySize(width, 180)
        .setAlpha(0.5)
        .setDepth(0);
    }

    // Subtle warm star field
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.45;
      const s = Math.random() < 0.3 ? 2 : 1;
      this.add.rectangle(x, y, s, s, 0xf5f0e8, Math.random() * 0.4 + 0.1).setDepth(0);
    }

    // ── Title text ──────────────────────────────────────────────────────
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

    // Animate them in sequentially
    this.tweens.add({ targets: titleText,   alpha: 1, duration: 600, delay: 200, ease: 'Sine.easeOut' });
    this.tweens.add({ targets: subtitleText, alpha: 1, duration: 500, delay: 500, ease: 'Sine.easeOut' });
    this.tweens.add({ targets: taglineText,  alpha: 1, duration: 500, delay: 900, ease: 'Sine.easeOut' });
    this.tweens.add({ targets: questionText, alpha: 1, duration: 500, delay: 1100, ease: 'Sine.easeOut' });

    // ── Warm pixel-art character parade (small sprites) ─────────────────
    const charY = height * 0.72;
    const characters = ['char-ava', 'char-rahul', 'char-fatima', 'char-grandma'];
    const spacing = width / (characters.length + 1);

    characters.forEach((key, i) => {
      if (!this.textures.exists(key)) return;
      const sprite = this.add.sprite(
        spacing * (i + 1), charY, key
      ).setScale(3).setAlpha(0).setDepth(2);

      this.tweens.add({
        targets: sprite,
        alpha: 1,
        y: charY - 4,
        duration: 400,
        delay: 1200 + i * 200,
        ease: 'Back.easeOut',
        onComplete: () => {
          // gentle idle bob
          this.tweens.add({
            targets: sprite,
            y: charY,
            duration: 1200 + i * 200,
            yoyo: true, repeat: -1,
            ease: 'Sine.easeInOut',
          });
        },
      });
    });

    // ── Character name labels ────────────────────────────────────────────
    const labels = [
      { name: 'Ava',    color: '#5a9e6f' },
      { name: 'Rahul',  color: '#4a7a9e' },
      { name: 'Fatima', color: '#7c3aed' },
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

    // ── START button ─────────────────────────────────────────────────────
    const btnY = height * 0.87;
    const btnBg = this.add.graphics().setDepth(2).setAlpha(0);
    const drawBtn = (hover = false) => {
      btnBg.clear();
      btnBg.fillStyle(hover ? 0x8c6fd4 : 0x7c5cbf, 1);
      btnBg.fillRect(width / 2 - 130, btnY - 20, 260, 40);
      btnBg.lineStyle(2, hover ? 0xc9a84c : 0x6b5c7c, 1);
      btnBg.strokeRect(width / 2 - 130, btnY - 20, 260, 40);
    };
    drawBtn();

    const btnText = this.add.text(width / 2, btnY, 'BEGIN EXPERIENCE', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '10px',
      color: '#ffffff',
      stroke: '#2d2033',
      strokeThickness: 2,
    }).setOrigin(0.5).setAlpha(0).setDepth(3);

    this.tweens.add({ targets: [btnBg, btnText], alpha: 1, duration: 400, delay: 2000 });

    // Interactive zone
    const btnZone = this.add.zone(width / 2, btnY, 260, 40)
      .setInteractive({ useHandCursor: true });
    btnZone.on('pointerover', () => drawBtn(true));
    btnZone.on('pointerout',  () => drawBtn(false));

    const startGame = () => {
      audioService.playSelect();
      gameStateManager.setCurrentScene('OpeningScene');
      this.scene.start('OpeningScene');
    };
    btnZone.on('pointerdown', startGame);
    this.input.keyboard?.on('keydown-SPACE', startGame);
    this.input.keyboard?.on('keydown-ENTER', startGame);

    // Space prompt
    this.add.text(width / 2, height * 0.95, '[SPACE] to start', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '6px',
      color: '#6b5c7c',
    }).setOrigin(0.5).setAlpha(0).setDepth(2);
  }
}

function clamp(min: number, val: number, max: number) {
  return Math.min(max, Math.max(min, Math.round(val)));
}
