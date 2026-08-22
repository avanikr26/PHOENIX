import './style.css';
import { createGame } from './core/Game';
import { contentLoader } from './data/ContentLoader';
import { challengeRegistry } from './data/ChallengeRegistry';
import './services/AudioService'; // registers window.audioService

console.log('⚡ Initializing Inclusive Interface — Access City');

// 1. Load & Validate Content Data
const { challenges } = contentLoader.loadAll();

// 2. Register Challenges into Registry
challengeRegistry.registerAll(challenges);

// 3. Launch Phaser Game Instance
function initGame() {
  const container = document.getElementById('game-canvas-container');
  if (container) {
    createGame('game-canvas-container');
    console.log('✅ Phaser 3 Game Instance Connected and Running.');
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
