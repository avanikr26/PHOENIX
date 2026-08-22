import { describe, it, expect, beforeEach } from 'vitest';
import { gameStateManager } from '../src/core/GameStateManager';

describe('GameStateManager', () => {
  beforeEach(() => {
    gameStateManager.resetState();
  });

  it('starts with default initial state', () => {
    const state = gameStateManager.getState();
    expect(state.totalScore).toBe(0);
    expect(state.completedChallengeIds).toHaveLength(0);
    expect(state.currentDifficulty).toBe('easy');
  });

  it('tracks completed challenge IDs and updates total score and design skills', () => {
    gameStateManager.recordChallengeCompletion('test-chal-1', 'visual', 150, 200);
    const state = gameStateManager.getState();
    expect(state.totalScore).toBe(150);
    expect(state.completedChallengeIds).toContain('test-chal-1');
    expect(state.skills.visual).toBe(25);
  });
});
