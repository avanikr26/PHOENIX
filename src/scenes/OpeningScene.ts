import Phaser from 'phaser';
import gsap from 'gsap';
import { audioService } from '../services/AudioService';

/**
 * OpeningScene — Matches requirements in GAMEPLAY_IMPLEMENTATION_GAPS.md:
 * - CINEMATIC INTRO: Black screen, ambient pause, "WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?"
 * - PROTAGONIST ROOM: Young developer at a desk, looking at a glowing laptop screen.
 * - GRANDMOTHER CALL: Grandma calls asking to book a doctor's appointment tomorrow at 4 PM.
 * - APPOINTMENT TASK: Task assigned card showing the limit of 30 seconds.
 */
export class OpeningScene extends Phaser.Scene {
  private domOverlay: HTMLDivElement | null = null;
  private playerAvatar: Phaser.GameObjects.Sprite | null = null;
  private laptopLight: Phaser.GameObjects.Graphics | null = null;

  constructor() {
    super('OpeningScene');
  }

  create() {
    const { width, height } = this.scale;
    // Set static black background
    this.add.rectangle(0, 0, width * 2, height * 2, 0x000000);
    
    // Start with the cinematic black screen intro
    this.runCinematicIntro();
  }

  private runCinematicIntro() {
    const root = document.getElementById('dom-overlay') ?? document.body;
    this.domOverlay = document.createElement('div');
    this.domOverlay.id = 'opening-overlay';
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
      <div style="max-width: 600px; text-align: center; display: flex; flex-direction: column; gap: 24px;">
        <div id="op-line-1" style="font-size: 11px; color: #64748b; opacity: 0; letter-spacing: 1.5px;">
          SYSTEM INITIALIZING...
        </div>
        <div id="op-line-2" style="font-size: 11px; color: #64748b; opacity: 0; letter-spacing: 1.5px;">
          USER PROFILE: UNKNOWN
        </div>
        <div id="op-line-3" style="
          font-size: clamp(14px, 2.4vw, 22px);
          color: #f8fafc;
          line-height: 1.6;
          opacity: 0;
          text-shadow: 0 0 15px rgba(255,255,255,0.5);
          margin-top: 20px;
        ">
          WHAT IF THE INTERFACE<br>WASN'T DESIGNED FOR YOU?
        </div>
        <div id="op-click-hint" style="font-size: 8px; color: #475569; opacity: 0; margin-top: 30px;">
          [ CLICK ANYWHERE TO CONTINUE ]
        </div>
      </div>
    `;
    root.appendChild(this.domOverlay);

    const tl = gsap.timeline();
    tl.to('#op-line-1', { opacity: 1, duration: 0.8, delay: 0.3, onStart: () => audioService.playBlip() })
      .to('#op-line-2', { opacity: 1, duration: 0.8, delay: 0.5, onStart: () => audioService.playBlip() })
      .to('#op-line-3', { opacity: 1, duration: 1.5, delay: 0.8, onStart: () => audioService.playGlitch() })
      .to('#op-click-hint', { opacity: 1, duration: 0.6, delay: 0.5 });

    const proceed = () => {
      this.domOverlay?.removeEventListener('click', proceed);
      audioService.playSelect();
      gsap.to(this.domOverlay, {
        opacity: 0,
        duration: 0.6,
        onComplete: () => {
          this.domOverlay?.remove();
          this.domOverlay = null;
          this.runProtagonistRoom();
        }
      });
    };

    this.domOverlay.addEventListener('click', proceed);
  }

  private runProtagonistRoom() {
    const { width, height } = this.scale;

    // Draw Developer Room Floor
    const roomGfx = this.add.graphics();
    roomGfx.fillStyle(0x1e1e2f, 1); // Dark blue-gray floor
    roomGfx.fillRect(100, 100, width - 200, height - 200);
    roomGfx.lineStyle(4, 0x4a4a6a, 1);
    roomGfx.strokeRect(100, 100, width - 200, height - 200);

    // Floor tile details
    roomGfx.lineStyle(1, 0x2e2e44, 0.4);
    for (let x = 100; x < width - 100; x += 40) {
      roomGfx.lineBetween(x, 100, x, height - 100);
    }
    for (let y = 100; y < height - 100; y += 40) {
      roomGfx.lineBetween(100, y, width - 100, y);
    }

    // Desk and Chair Shapes
    roomGfx.fillStyle(0x5c4033, 1); // Wood desk
    roomGfx.fillRect(width / 2 - 80, height / 2 - 20, 160, 16);
    roomGfx.fillRect(width / 2 - 70, height / 2 - 4, 12, 60); // Legs
    roomGfx.fillRect(width / 2 + 58, height / 2 - 4, 12, 60);

    // Glow pool from the laptop screen
    this.laptopLight = this.add.graphics();
    this.laptopLight.fillStyle(0x60a5fa, 0.25);
    this.laptopLight.fillTriangle(
      width / 2, height / 2 - 50,
      width / 2 - 120, height / 2 + 80,
      width / 2 + 120, height / 2 + 80
    );

    // Player sitting at desk
    this.playerAvatar = this.add.sprite(width / 2, height / 2 - 52, 'char-ava')
      .setScale(3.5);

    // Add dialog presentation overlay
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
        cursor: pointer;
      ">
        <div id="vn-speaker" style="
          font-family: var(--font-pixel);
          font-size: 10px;
          color: #fbbf24;
          letter-spacing: 1px;
        ">NARRATOR</div>
        <div id="vn-text" style="font-weight: 500;">Another night. Another screen. Another thing to build.</div>
        <div style="text-align: right; font-family: var(--font-pixel); font-size: 8px; color: #6b5c7c;">[ CLICK TO NEXT ]</div>
      </div>
    `;
    root.appendChild(this.domOverlay);

    const dialogLines = [
      { speaker: "NARRATOR", text: "Another night. Another screen. Another thing to build." },
      { speaker: "GRANDMA MIRA (Voice)", text: "\"Hey!\"" },
      { speaker: "PLAYER (Ava)", text: "\"Yeah, Grandma?\"" },
      { speaker: "GRANDMA MIRA (Voice)", text: "\"Can you help me book a doctor's appointment?\"" },
      { speaker: "PLAYER (Ava)", text: "\"Sure. For what time?\"" },
      { speaker: "GRANDMA MIRA (Voice)", text: "\"Tomorrow. Around 4 PM.\"" },
      { speaker: "PLAYER (Ava)", text: "\"Okay. Give me a minute.\"" }
    ];

    let currentLine = 0;
    const speakerEl = this.domOverlay.querySelector('#vn-speaker') as HTMLDivElement;
    const textEl = this.domOverlay.querySelector('#vn-text') as HTMLDivElement;

    const advanceDialog = () => {
      currentLine++;
      if (currentLine < dialogLines.length) {
        audioService.playBlip();
        const line = dialogLines[currentLine];
        speakerEl.textContent = line.speaker;
        textEl.textContent = line.text;

        // Change color based on speaker
        if (line.speaker.includes("GRANDMA")) {
          speakerEl.style.color = "#f59e0b";
        } else if (line.speaker.includes("PLAYER")) {
          speakerEl.style.color = "#10b981";
        } else {
          speakerEl.style.color = "#fbbf24";
        }
      } else {
        // Trigger Glitch and show Task Assignment
        this.domOverlay?.removeEventListener('click', advanceDialog);
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
      }
    };

    this.domOverlay.addEventListener('click', advanceDialog);
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
    this.domOverlay?.remove();
    this.domOverlay = null;
    this.playerAvatar?.destroy();
    this.laptopLight?.destroy();
  }
}
