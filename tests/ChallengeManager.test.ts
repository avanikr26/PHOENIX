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
    expect(challenge?.id).toBe('rahul-easy-1');
  });

  it('evaluates answers and updates game score correctly', () => {
    const result = challengeManager.submitAnswer('rahul-easy-1', 'opt-1');
    expect(result.isCorrect).toBe(true);
    expect(result.pointsEarned).toBeGreaterThan(0);
    expect(gameStateManager.isChallengeCompleted('rahul-easy-1')).toBe(true);
  });

  it('unlocks medium challenge once easy prerequisite is completed', () => {
    challengeManager.submitAnswer('rahul-easy-1', 'opt-1');
    const mediumChallenge = challengeManager.getNextChallenge('rahul', 'medium');
    expect(mediumChallenge).not.toBeNull();
    expect(mediumChallenge?.id).toBe('rahul-medium-1');
  });
});
