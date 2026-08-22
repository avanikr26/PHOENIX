import Phaser from 'phaser';
import gsap from 'gsap';
import { audioService } from '../services/AudioService';
import { gameStateManager } from '../core/GameStateManager';

/**
 * AppointmentSimScene — Inaccessible healthcare booking portal simulation:
 * - Start task instructions briefing screen before timer.
 * - Interactive date picker with tiny 8px targets and low-contrast light gray.
 * - Time selector dropdown with dozens of scrolling items.
 * - Distorted CAPTCHA check.
 * - Timer (30s) starts ONLY when "START CHALLENGE" is clicked.
 * - Success Path: booking confirmed dialogue -> realization sequence.
 * - Failure Path: timer runs out -> realization sequence.
 */
export class AppointmentSimScene extends Phaser.Scene {
  private timeLeft = 30;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private domOverlay: HTMLDivElement | null = null;
  private selectedDate = "";
  private selectedTime = "";
  private captchaCode = "";
  private realizationTimeline: gsap.core.Timeline | null = null;

  constructor() {
    super('AppointmentSimScene');
  }

  create() {
    gameStateManager.setCurrentScene('AppointmentSimScene');
    this.timeLeft = 30;
    this.selectedDate = "";
    this.selectedTime = "";
    this.generateCaptcha();
    
    // Clean up timer and overlay when leaving the scene
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.shutdown();
    });
    
    this.add.rectangle(0, 0, this.scale.width * 2, this.scale.height * 2, 0x0a0c16);
    this.renderStartOverlay();
  }

  private generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    this.captchaCode = code;
  }

  private renderStartOverlay() {
    const root = document.getElementById('dom-overlay') ?? document.body;

    const overlay = document.createElement('div');
    overlay.id = 'sim-intro-overlay';
    overlay.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(10, 12, 22, 0.9);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      font-family: var(--font-body);
      pointer-events: auto;
    `;
    this.domOverlay = overlay;

    overlay.innerHTML = `
      <div style="
        background: #1e293b;
        border: 2px solid #ef4444;
        border-radius: 8px;
        padding: 24px;
        text-align: center;
        max-width: 440px;
        width: 100%;
        color: #f8fafc;
        box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      ">
        <div style="font-family: var(--font-pixel); font-size: 11px; color: #ef4444; margin-bottom: 12px; letter-spacing: 1.5px;">
          MISSION BRIEFING
        </div>
        <div style="font-size: 16px; font-weight: bold; margin-bottom: 14px; line-height: 1.4;">
          Your grandmother needs to book an appointment for tomorrow (Aug 23, 2026) at 4:00 PM.
        </div>
        <div style="font-size: 13px; color: #94a3b8; margin-bottom: 24px; line-height: 1.5;">
          The booking site is notoriously poorly designed. Work fast—the server resets in 30 seconds.
        </div>
        <button id="sim-start-challenge-btn" style="
          background: #ef4444;
          color: #fff;
          border: 2px solid #f87171;
          border-radius: 4px;
          padding: 12px 28px;
          font-family: var(--font-pixel);
          font-size: 10px;
          cursor: pointer;
          letter-spacing: 1px;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        ">START CHALLENGE</button>
      </div>
    `;
    root.appendChild(overlay);

    overlay.querySelector('#sim-start-challenge-btn')?.addEventListener('click', () => {
      audioService.playSelect();
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          overlay.remove();
          this.domOverlay = null;
          this.renderSimulationPortal();
        }
      });
    });
  }

  private renderSimulationPortal() {
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
      <div id="app-card" style="
        background: #fbfbfd;
        border: 2px solid #cbd5e1;
        border-radius: 8px;
        width: 100%;
        max-width: 400px;
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
            CityCare Hospital Scheduling
          </div>
          <div id="sim-timer-badge" style="
            background: #dc2626;
            border: 1.5px solid #991b1b;
            border-radius: 4px;
            padding: 4px 8px;
            font-family: var(--font-pixel);
            font-size: 9.5px;
            color: #ffffff;
            display: flex;
            align-items: center;
            gap: 4px;
            box-shadow: 0 0 10px rgba(220, 38, 38, 0.4);
            font-weight: bold;
          ">
            ⏱ <span id="sim-time">TIME LEFT: 30s</span>
          </div>
        </div>

        <!-- Form Body -->
        <div style="padding: 20px; display: flex; flex-direction: column; gap: 14px; position: relative;">
          
          <div style="font-weight: 700; font-size: 13px; color: #334155; display: flex; justify-content: space-between;">
            <span>Book Appointment</span>
            <span style="font-size: 10px; font-weight: normal; color: #ef4444;">* required</span>
          </div>

          <!-- Date field with low affordance -->
          <div style="position: relative;">
            <label style="display:block; font-size: 10px; color: #94a3b8; margin-bottom: 2px;">Select Date *</label>
            <div id="date-picker-trigger" style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              border: 1px solid #e2e8f0;
              border-radius: 4px;
              padding: 8px 10px;
              background: #f8fafc;
              font-size: 12px;
              color: #475569;
              cursor: pointer;
            ">
              <span id="selected-date-text">Choose a date...</span>
              <span>📅</span>
            </div>
            <!-- Inaccessible tiny calendar dropdown -->
            <div id="calendar-dropdown" style="
              display: none;
              position: absolute;
              top: 56px;
              left: 0;
              right: 0;
              background: #fff;
              border: 1px solid #cbd5e1;
              border-radius: 4px;
              z-index: 10;
              padding: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ">
              <div style="display:grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center; font-size: 8px; color: #94a3b8; margin-bottom: 4px;">
                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
              </div>
              <div style="display:grid; grid-template-columns: repeat(7, 1fr); gap: 2px; text-align: center;">
                <!-- Generate days in August 2026 -->
                ${this.generateCalendarDays()}
              </div>
            </div>
          </div>

          <!-- Time field -->
          <div style="position: relative;">
            <label style="display:block; font-size: 10px; color: #94a3b8; margin-bottom: 2px;">Select Time Slot *</label>
            <select id="time-selector" style="
              width: 100%;
              border: 1px solid #e2e8f0;
              border-radius: 4px;
              padding: 8px;
              background: #f8fafc;
              font-size: 12px;
              color: #475569;
              outline: none;
            ">
              <option value="">Choose a time...</option>
              ${this.generateTimeOptions()}
            </select>
          </div>

          <!-- CAPTCHA -->
          <div>
            <label style="display:block; font-size: 10px; color: #94a3b8; margin-bottom: 2px;">Verification *</label>
            <div style="display:flex; gap:10px; align-items:center;">
              <!-- Distorted Captcha Text Visual -->
              <div id="captcha-visual" style="
                background: #f1f5f9;
                border: 1px dashed #94a3b8;
                border-radius: 4px;
                padding: 6px 12px;
                font-family: 'Courier New', Courier, monospace;
                font-size: 16px;
                font-weight: bold;
                letter-spacing: 4px;
                color: #64748b;
                text-shadow: 2px 2px 2px #cbd5e1, -1px -1px 2px #fff;
                user-select: none;
                font-style: italic;
              ">
                ${this.captchaCode}
              </div>
              <input id="captcha-input" type="text" placeholder="Type letters..." style="
                flex: 1;
                border: 1px solid #e2e8f0;
                border-radius: 4px;
                padding: 8px;
                font-size: 12px;
                color: #334155;
              "/>
            </div>
          </div>

          <!-- Error Alert Banner -->
          <div id="error-banner" style="
            display: none;
            background: #fef2f2;
            border: 1px solid #fca5a5;
            border-radius: 4px;
            padding: 8px 10px;
            font-size: 9px;
            color: #b91c1c;
            font-family: var(--font-pixel);
            line-height: 1.3;
          "></div>

          <!-- Confirm button -->
          <div style="margin-top: 6px;">
            <button id="sim-confirm-btn" style="
              width: 100%;
              background: #047857;
              color: #ffffff;
              border: none;
              border-radius: 4px;
              padding: 12px;
              font-family: var(--font-pixel);
              font-size: 9px;
              cursor: pointer;
              letter-spacing: 1px;
              box-shadow: 0 4px 10px rgba(4, 120, 87, 0.2);
            ">CONFIRM REQUEST</button>
          </div>
        </div>
      </div>
    `;

    root.appendChild(container);

    // Date trigger click event
    const trigger = container.querySelector('#date-picker-trigger') as HTMLElement;
    const dropdown = container.querySelector('#calendar-dropdown') as HTMLElement;
    trigger.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Calendar selection event
    dropdown.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.cal-day') as HTMLElement;
      if (target && target.dataset.date) {
        this.selectedDate = target.dataset.date;
        const textEl = container.querySelector('#selected-date-text') as HTMLElement;
        textEl.textContent = this.selectedDate;
        textEl.style.color = '#334155';
        dropdown.style.display = 'none';
        audioService.playBlip();
      }
    });

    // Start timer interval
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      const timeEl = document.getElementById('sim-time');
      if (timeEl) {
        timeEl.textContent = `TIME LEFT: ${this.timeLeft}s`;
      }
      if (this.timeLeft <= 0) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
        }
        this.triggerRealizationSequence();
      }
    }, 1000);

    // Confirm button event
    container.querySelector('#sim-confirm-btn')?.addEventListener('click', () => {
      const timeSelect = container.querySelector('#time-selector') as HTMLSelectElement;
      this.selectedTime = timeSelect.value;
      const captchaInput = container.querySelector('#captcha-input') as HTMLInputElement;
      const enteredCaptcha = captchaInput.value.trim();

      const errorEl = container.querySelector('#error-banner') as HTMLElement;

      // Validation check
      if (this.selectedDate === "23 Aug 2026" && this.selectedTime === "04:00 PM" && enteredCaptcha === this.captchaCode) {
        // Success Path!
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
          this.timerInterval = null;
        }
        audioService.playCorrect();
        this.triggerSuccessRealization();
      } else {
        // Failed input error feedback
        audioService.playGlitch();
        errorEl.style.display = 'block';
        if (this.selectedDate !== "23 Aug 2026") {
          errorEl.textContent = "Error: Appointment must be booked for tomorrow (August 23, 2026).";
        } else if (this.selectedTime !== "04:00 PM") {
          errorEl.textContent = "Error: Appointment time must be selected for 4:00 PM.";
        } else {
          errorEl.textContent = "Error: Verification CAPTCHA is incorrect. Refreshed captcha.";
        }
        // Refresh Captcha
        this.generateCaptcha();
        const capVisual = container.querySelector('#captcha-visual') as HTMLElement;
        if (capVisual) capVisual.textContent = this.captchaCode;
        captchaInput.value = "";
      }
    });
  }

  private generateCalendarDays(): string {
    let days = '';
    // Empty cells before August 1 (Saturday in 2026)
    for (let i = 0; i < 6; i++) {
      days += `<span style="padding:4px; font-size:8px; color:#cbd5e1;"></span>`;
    }
    // Days of August (1 to 31)
    for (let day = 1; day <= 31; day++) {
      const dateString = `${day} Aug 2026`;
      // Tomorrow is Aug 23, 2026
      const isTomorrow = day === 23;
      days += `
        <span class="cal-day" data-date="${dateString}" style="
          padding: 4px;
          font-size: 8px;
          font-weight: ${isTomorrow ? 'bold' : 'normal'};
          color: ${isTomorrow ? '#64748b' : '#cbd5e1'};
          cursor: pointer;
          border-radius: 2px;
          background: ${isTomorrow ? '#fee2e2' : 'transparent'};
          transition: background 0.1s;
        ">${day}</span>
      `;
    }
    return days;
  }

  private generateTimeOptions(): string {
    let options = '';
    const hours = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
    const minutes = ['00', '15', '30', '45'];
    const periods = ['AM', 'PM'];

    // Generate dozens of options to create scroll stress
    for (const p of periods) {
      for (const h of hours) {
        for (const m of minutes) {
          const timeVal = `${h}:${m} ${p}`;
          options += `<option value="${timeVal}">${timeVal}</option>`;
        }
      }
    }
    return options;
  }

  private triggerSuccessRealization() {
    if (!this.domOverlay) return;

    this.domOverlay.innerHTML = `
      <div style="
        background: #1e293b;
        border: 3px solid #10b981;
        border-radius: 8px;
        max-width: 460px;
        width: 100%;
        padding: 24px;
        color: #f8fafc;
        box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      ">
        <div style="font-family: var(--font-pixel); font-size: 11px; color: #10b981; margin-bottom: 12px; letter-spacing: 1.5px;">
          ✓ APPOINTMENT CONFIRMED
        </div>
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 16px; line-height: 1.4; color: #34d399;">
          Confirmation Code: CITY-CARE-402
        </div>
        <div style="font-family: var(--font-body); font-size: 15px; color: #cbd5e1; line-height: 1.5; margin-bottom: 24px;">
          <strong>Ava:</strong> "There... booked. But that took almost all my concentration. The text was tiny, calendar was unreadable, and the scroll was a mess. If I struggled this much... what must it feel like for Grandma?"
        </div>
        <button id="success-next-btn" style="
          width: 100%;
          background: #10b981;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 12px;
          font-family: var(--font-pixel);
          font-size: 10px;
          cursor: pointer;
          letter-spacing: 1px;
        ">Next</button>
      </div>
    `;

    this.domOverlay.querySelector('#success-next-btn')?.addEventListener('click', () => {
      audioService.playSelect();
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

    this.realizationTimeline = gsap.timeline();
    this.realizationTimeline
      .to('#rz-1', { opacity: 1, duration: 0.8, delay: 0.2, onStart: () => audioService.playBlip() })
      .to('#rz-2', { opacity: 1, duration: 0.8, delay: 0.6, onStart: () => audioService.playGlitch() })
      .to('#rz-3', { opacity: 1, duration: 0.8, delay: 0.6 })
      .to('#rz-4', { opacity: 1, duration: 0.8, delay: 0.6, onStart: () => audioService.playCorrect() })
      .to('#rz-5', { opacity: 1, duration: 0.6, delay: 0.4 });

    this.domOverlay.querySelector('#rz-enter-btn')?.addEventListener('click', () => {
      audioService.playSelect();
      this.realizationTimeline?.kill();
      if (this.domOverlay) {
        gsap.to(this.domOverlay, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            this.shutdown();
            this.scene.start('CityScene');
            if (!this.scene.isActive('UIScene')) {
              this.scene.launch('UIScene');
            }
          }
        });
      }
    });
  }

  shutdown() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    if (this.realizationTimeline) {
      this.realizationTimeline.kill();
      this.realizationTimeline = null;
    }
    this.domOverlay?.remove();
    this.domOverlay = null;
  }
}
