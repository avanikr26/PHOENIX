import { describe, it, expect, beforeEach } from 'vitest';
import { contentLoader } from '../src/data/ContentLoader';
import { challengeRegistry } from '../src/data/ChallengeRegistry';
import { challengeManager } from '../src/gameplay/ChallengeManager';
import { gameStateManager } from '../src/core/GameStateManager';

describe('ChallengeManager', () => {
  beforeEach(() => {
    gameStateManager.resetState();
    const { challenges } = contentLoader.loadAll();
    challengeRegistry.registerAll(challenges);
  });

  it('selects the first available easy challenge for Rahul', () => {
    const challenge = challengeManager.getNextChallenge('rahul', 'easy');
    expect(challenge).not.toBeNull();
    expect(challenge?.id).toBe('rahul-visual-easy-01');
  });

  it('evaluates answers and updates game score correctly', () => {
    const result = challengeManager.submitAnswer('rahul-visual-easy-01', 'b'); // Option 'b' is correct for rahul-visual-easy-01
    expect(result.isCorrect).toBe(true);
    expect(result.pointsEarned).toBeGreaterThan(0);
    expect(gameStateManager.isChallengeCompleted('rahul-visual-easy-01')).toBe(true);
  });

  it('unlocks medium challenge once easy prerequisite is completed', () => {
    challengeManager.submitAnswer('rahul-visual-easy-01', 'b');
    
    // Manually set difficulty to medium for the next challenge fetch
    gameStateManager.getState().currentDifficulty = 'medium';
    
    const mediumChallenge = challengeManager.getNextChallenge('rahul', 'medium');
    expect(mediumChallenge).not.toBeNull();
    expect(mediumChallenge?.id).toBe('rahul-visual-medium-01');
  });
});
