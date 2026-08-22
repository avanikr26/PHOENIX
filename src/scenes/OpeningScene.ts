import Phaser from 'phaser';
import gsap from 'gsap';
import { audioService } from '../services/AudioService';

/**
 * OpeningScene — Matches Image 1 bottom row (OPENING SEQUENCE):
 *   SYSTEM INITIALIZING...
 *   USER PROFILE: UNKNOWN
 *   WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?
 *   TASK ASSIGNED:
 *   Book a doctor's appointment for tomorrow at 4 PM.
 *   ⏱ 30 SECONDS
 */
export class OpeningScene extends Phaser.Scene {
  private domOverlay: HTMLDivElement | null = null;

  constructor() {
    super('OpeningScene');
  }

  create() {
    this.add.rectangle(0, 0, this.scale.width * 2, this.scale.height * 2, 0x000000);
    this.buildOpeningDOM();
  }

  private buildOpeningDOM() {
    const root = document.getElementById('dom-overlay') ?? document.body;

    const container = document.createElement('div');
    container.id = 'opening-overlay';
    container.style.cssText = `
      position: fixed;
      inset: 0;
      background: #000000;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      font-family: var(--font-pixel);
      pointer-events: auto;
    `;
    this.domOverlay = container;

    container.innerHTML = `
      <div style="max-width: 600px; width: 100%; text-align: center; display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Terminal Lines -->
        <div id="op-line-1" style="font-size: 11px; color: #64748b; opacity: 0; letter-spacing: 1px;">
          SYSTEM INITIALIZING...
        </div>

        <div id="op-line-2" style="font-size: 11px; color: #64748b; opacity: 0; letter-spacing: 1px;">
          USER PROFILE: UNKNOWN
        </div>

        <!-- Hero Question -->
        <div id="op-line-3" style="
          font-size: clamp(14px, 2.4vw, 20px);
          color: #f8fafc;
          line-height: 1.6;
          opacity: 0;
          text-shadow: 0 0 12px rgba(255,255,255,0.4);
          margin: 10px 0;
        ">
          WHAT IF THE INTERFACE<br>WASN'T DESIGNED FOR YOU?
        </div>

        <!-- Task Assigned Box (Exact from Image 1 bottom-left) -->
        <div id="op-task-box" style="
          background: #0f172a;
          border: 2px solid #059669;
          border-radius: 6px;
          padding: 18px 24px;
          opacity: 0;
          box-shadow: 0 0 20px rgba(5, 150, 105, 0.25);
        ">
          <div style="color: #10b981; font-size: 10px; margin-bottom: 8px; font-weight: bold; letter-spacing: 1px;">
            TASK ASSIGNED
          </div>
          <div style="font-family: var(--font-body); font-size: 16px; color: #f8fafc; margin-bottom: 12px; font-weight: 500;">
            Book a doctor's appointment for tomorrow at 4 PM.
          </div>
          <div style="color: #cbd5e1; font-size: 10px; display: flex; align-items: center; justify-content: center; gap: 6px;">
            ⏱ 30 SECONDS
          </div>
        </div>

        <!-- Action Button -->
        <div id="op-btn-box" style="opacity: 0;">
          <button id="op-start-btn" style="
            background: #059669;
            color: #ffffff;
            border: 2px solid #34d399;
            border-radius: 4px;
            padding: 12px 28px;
            font-family: var(--font-pixel);
            font-size: 11px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(5, 150, 105, 0.5);
            letter-spacing: 1px;
          ">START SIMULATION ►</button>
        </div>

      </div>
    `;

    root.appendChild(container);

    // GSAP Sequence
    const tl = gsap.timeline();

    tl.to('#op-line-1', { opacity: 1, duration: 0.6, delay: 0.3, onStart: () => audioService.playBlip() })
      .to('#op-line-2', { opacity: 1, duration: 0.6, delay: 0.5, onStart: () => audioService.playBlip() })
      .to('#op-line-3', { opacity: 1, duration: 1.0, delay: 0.6, onStart: () => audioService.playGlitch() })
      .to('#op-task-box', { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'expo.out' })
      .to('#op-btn-box', { opacity: 1, duration: 0.5, delay: 0.2 });

    container.querySelector('#op-start-btn')?.addEventListener('click', () => {
      audioService.playSelect();
      gsap.to(container, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          container.remove();
          this.domOverlay = null;
          this.scene.start('AppointmentSimScene');
        }
      });
    });
  }

  shutdown() {
    this.domOverlay?.remove();
    this.domOverlay = null;
  }
}
