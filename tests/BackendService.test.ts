import { describe, it, expect } from 'vitest';
import { backendService } from '../src/services/BackendService';

describe('BackendService', () => {
  it('buffers attempts in offline queue when backend is unconfigured', async () => {
    const queueBefore = backendService.getSyncQueue().length;
    await backendService.submitChallengeAttempt({
      playerId: 'test-player',
      challengeId: 'rahul-easy-1',
      attemptNumber: 1,
      selectedOptionId: 'opt-1',
      isCorrect: true,
      pointsEarned: 100,
    });
    const queueAfter = backendService.getSyncQueue().length;
    expect(queueAfter).toBe(queueBefore + 1);
  });

  it('buffers user test results without breaking gameplay flow', async () => {
    const queueBefore = backendService.getSyncQueue().length;
    await backendService.saveUserTestResult({
      playerId: 'test-player',
      challengeId: 'rahul-easy-1',
      userProfile: 'Rahul',
      success: true,
      hesitationTime: 0.5,
      feedback: 'Test success',
    });
    expect(backendService.getSyncQueue().length).toBe(queueBefore + 1);
  });
});
