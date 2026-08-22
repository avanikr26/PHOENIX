/**
 * AudioService — Howler.js wrapper for Access City audio.
 *
 * Generates chiptune-style sounds using Web Audio API oscillators.
 * No external audio files needed for MVP.
 *
 * Audio identity: soft chiptune, lo-fi RPG ambience — NOT cyberpunk synthwave.
 */

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.08,
  delay = 0
): void {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0, ctx.currentTime + delay);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + delay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration + 0.05);
  } catch {
    // Silently fail if audio not permitted
  }
}

class AudioService {
  private _enabled = true;
  private _bgmActive = false;

  /** Speak text using SpeechSynthesis (Web Speech API) */
  speak(text: string, speaker?: string): void {
    if (!this._enabled) return;
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech

      // Remove markdown/quotes for speech synthesis reading
      const cleanText = text.replace(/["'“”«»]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Setup pitches and rates for speaker character voices
      if (speaker) {
        const lowerSpeaker = speaker.toLowerCase();
        if (lowerSpeaker.includes('grandma') || lowerSpeaker.includes('mira')) {
          utterance.pitch = 0.75;
          utterance.rate = 0.85;
        } else if (lowerSpeaker.includes('rahul')) {
          utterance.pitch = 0.95;
          utterance.rate = 0.95;
        } else if (lowerSpeaker.includes('fatima')) {
          utterance.pitch = 1.25;
          utterance.rate = 0.95;
        } else if (lowerSpeaker.includes('ava') || lowerSpeaker.includes('player')) {
          utterance.pitch = 1.1;
          utterance.rate = 1.0;
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
    }
  }

  toggleMute(): boolean {
    this._enabled = !this._enabled;
    if (!this._enabled) {
      this.stopCityAmbience();
      try {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {}
    }
    return !this._enabled; // returns isMuted
  }

  /** Short typewriter blip for each character in dialogue */
  playBlip(): void {
    if (!this._enabled) return;
    // Very quiet, brief click — like old RPG dialogue sound
    playTone(440 + Math.random() * 120, 0.04, 'square', 0.03);
  }

  /** Correct answer chime — warm ascending arpeggio */
  playCorrect(): void {
    if (!this._enabled) return;
    [523, 659, 784, 1047].forEach((f, i) => {
      playTone(f, 0.12, 'triangle', 0.1, i * 0.08);
    });
  }

  /** Incorrect answer — descending two-note dip */
  playIncorrect(): void {
    if (!this._enabled) return;
    playTone(330, 0.12, 'square', 0.08);
    playTone(247, 0.18, 'square', 0.07, 0.12);
  }

  /** Glitch — brief noise burst (narrative transition moment) */
  playGlitch(): void {
    if (!this._enabled) return;
    [880, 440, 220, 110].forEach((f, i) => {
      playTone(f + Math.random() * 200, 0.06, 'sawtooth', 0.06, i * 0.03);
    });
  }

  /** UI select/confirm */
  playSelect(): void {
    if (!this._enabled) return;
    playTone(392, 0.08, 'triangle', 0.07);
  }

  /** Score pop */
  playScore(): void {
    if (!this._enabled) return;
    playTone(523, 0.08, 'triangle', 0.1);
    playTone(659, 0.12, 'triangle', 0.1, 0.08);
  }

  /** Soft city ambient loop — generated with oscillator */
  startCityAmbience(): void {
    if (!this._enabled || this._bgmActive) return;
    this._bgmActive = true;
    // Soft lo-fi pad — very quiet, in the background
    this.playSoftPad();
  }

  private playSoftPad(): void {
    if (!this._enabled || !this._bgmActive) return;
    const notes = [261, 329, 392, 523, 440, 349];
    const note = notes[Math.floor(Math.random() * notes.length)];
    playTone(note, 2.5, 'sine', 0.02);
    // Schedule next note
    setTimeout(() => this.playSoftPad(), 2000 + Math.random() * 1500);
  }

  stopCityAmbience(): void {
    this._bgmActive = false;
  }

  setEnabled(value: boolean): void {
    this._enabled = value;
    if (!value) {
      this._bgmActive = false;
      try {
        if (window.speechSynthesis) window.speechSynthesis.cancel();
      } catch {}
    }
  }

  isEnabled(): boolean {
    return this._enabled;
  }

  /** Resume AudioContext on first user interaction (browser policy) */
  resume(): void {
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }
}

export const audioService = new AudioService();

// Expose to window for UIScene access without circular imports
(window as any).audioService = audioService;

// Resume audio on first user interaction
document.addEventListener('click', () => audioService.resume(), { once: true });
document.addEventListener('keydown', () => audioService.resume(), { once: true });
