import Phaser from 'phaser';
import gsap from 'gsap';
import { audioService } from '../services/AudioService';

/**
 * AppointmentSimScene — Matches Image 1 bottom row:
 * 1. APPOINTMENT SIMULATION (30 SECOND CHALLENGE)
 *    CityCare Hospital, timer 00:12, confusing date/time form, [CONFIRM]
 * 2. REALIZATION SEQUENCE
 *    YOU DIDN'T FAIL.
 *    BUT THE INTERFACE DID.
 *    DESIGNED FOR SOME.
 *    NOT FOR ALL.
 *    LET'S CHANGE THAT.
 */
export class AppointmentSimScene extends Phaser.Scene {
  private timeLeft = 30;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private domOverlay: HTMLDivElement | null = null;

  constructor() {
    super('AppointmentSimScene');
  }

  create() {
    this.timeLeft = 30;
    this.add.rectangle(0, 0, this.scale.width * 2, this.scale.height * 2, 0x111827);
    this.renderAppointmentSimulation();
  }

  private renderAppointmentSimulation() {
    const root = document.getElementById('dom-overlay') ?? document.body;

    const container = document.createElement('div');
    container.id = 'appointment-sim-overlay';
    container.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.95);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      font-family: var(--font-body);
      pointer-events: auto;
    `;
    this.domOverlay = container;

    container.innerHTML = `
      <!-- Inaccessible Portal Card (Image 1 bottom-left) -->
      <div id="app-card" style="
        background: #fbfbfd;
        border: 2px solid #cbd5e1;
        border-radius: 8px;
        width: 100%;
        max-width: 380px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        overflow: hidden;
      ">
        <!-- Header -->
        <div style="
          background: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        ">
          <div style="font-weight:bold; font-size:14px; color:#1e3a8a;">
            CityCare Hospital
          </div>
          <div id="sim-timer-badge" style="
            background: #fee2e2;
            border: 1px solid #f87171;
            border-radius: 12px;
            padding: 2px 8px;
            font-family: var(--font-pixel);
            font-size: 9px;
            color: #dc2626;
            display: flex;
            align-items: center;
            gap: 4px;
          ">
            ⏱ <span id="sim-time">00:30</span>
          </div>
        </div>

        <!-- Form Body -->
        <div style="padding: 16px 20px; display: flex; flex-direction: column; gap: 14px;">
          <div style="font-weight: 700; font-size: 13px; color: #334155;">
            Book Appointment
          </div>

          <!-- Date field with low affordance -->
          <div>
            <label style="display:block; font-size: 11px; color: #64748b; margin-bottom: 4px;">Select Date</label>
            <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid #cbd5e1;
              border-radius: 4px;
              padding: 6px 10px;
              background: #f8fafc;
              font-size: 13px;
              color: #334155;
            ">
              <span>22 May 2025</span>
              <span>📅</span>
            </div>
          </div>

          <!-- Time field -->
          <div>
            <label style="display:block; font-size: 11px; color: #64748b; margin-bottom: 4px;">Select Time</label>
            <div style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid #cbd5e1;
              border-radius: 4px;
              padding: 6px 10px;
              background: #f8fafc;
              font-size: 13px;
              color: #334155;
            ">
              <span>04:00 PM</span>
              <span style="font-size:10px;">⌄</span>
            </div>
          </div>

          <!-- Confirm button -->
          <div style="margin-top: 6px;">
            <button id="sim-confirm-btn" style="
              width: 100%;
              background: #047857;
              color: #ffffff;
              border: none;
              border-radius: 4px;
              padding: 10px;
              font-family: var(--font-pixel);
              font-size: 9px;
              cursor: pointer;
              letter-spacing: 1px;
            ">CONFIRM</button>
          </div>
        </div>
      </div>
    `;

    root.appendChild(container);

    // Timer
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      const timeEl = document.getElementById('sim-time');
      if (timeEl) {
        timeEl.textContent = `00:${String(this.timeLeft).padStart(2, '0')}`;
      }
      if (this.timeLeft <= 0) {
        this.triggerRealizationSequence();
      }
    }, 1000);

    // Early trigger on click
    container.querySelector('#sim-confirm-btn')?.addEventListener('click', () => {
      audioService.playGlitch();
      this.triggerRealizationSequence();
    });
  }

  private triggerRealizationSequence() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (!this.domOverlay) return;

    audioService.playGlitch();

    // Fade to Black & show REALIZATION SEQUENCE (Image 1 bottom-center)
    this.domOverlay.innerHTML = `
      <div id="realization-box" style="
        max-width: 620px;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: column;
        gap: 20px;
        font-family: var(--font-pixel);
      ">
        
        <div id="rz-1" style="font-size: clamp(16px, 2.5vw, 24px); color: #ffffff; opacity: 0; line-height: 1.5;">
          YOU DIDN'T FAIL.
        </div>

        <div id="rz-2" style="font-size: clamp(18px, 2.8vw, 26px); color: #ef4444; opacity: 0; line-height: 1.5;">
          BUT THE INTERFACE DID.
        </div>

        <div id="rz-3" style="font-size: 12px; color: #94a3b8; opacity: 0; line-height: 1.8; margin: 10px 0;">
          DESIGNED FOR SOME.<br>NOT FOR ALL.
        </div>

        <div id="rz-4" style="font-size: 14px; color: #10b981; opacity: 0; letter-spacing: 2px;">
          LET'S CHANGE THAT.
        </div>

        <div id="rz-5" style="opacity: 0; margin-top: 14px;">
          <button id="rz-enter-btn" style="
            background: #059669;
            color: #ffffff;
            border: 2px solid #34d399;
            border-radius: 4px;
            padding: 12px 28px;
            font-family: var(--font-pixel);
            font-size: 11px;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(5, 150, 105, 0.6);
            letter-spacing: 1px;
          ">ENTER ACCESS CITY ►</button>
        </div>

      </div>
    `;

    const tl = gsap.timeline();
    tl.to('#rz-1', { opacity: 1, duration: 0.8, delay: 0.2, onStart: () => audioService.playBlip() })
      .to('#rz-2', { opacity: 1, duration: 0.8, delay: 0.6, onStart: () => audioService.playGlitch() })
      .to('#rz-3', { opacity: 1, duration: 0.8, delay: 0.6 })
      .to('#rz-4', { opacity: 1, duration: 0.8, delay: 0.6, onStart: () => audioService.playCorrect() })
      .to('#rz-5', { opacity: 1, duration: 0.6, delay: 0.4 });

    this.domOverlay.querySelector('#rz-enter-btn')?.addEventListener('click', () => {
      audioService.playSelect();
      if (this.domOverlay) {
        gsap.to(this.domOverlay, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            this.domOverlay?.remove();
            this.domOverlay = null;
            this.scene.start('CityScene');
            this.scene.start('UIScene');
          }
        });
      }
    });
  }

  shutdown() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.domOverlay?.remove();
    this.domOverlay = null;
  }
}
