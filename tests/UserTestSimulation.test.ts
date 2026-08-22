import { describe, it, expect } from 'vitest';
import { userTestSimulation } from '../src/gameplay/UserTestSimulation';

describe('UserTestSimulation', () => {
  it('returns successful user test result when option is correct', () => {
    const result = userTestSimulation.runSimulation('rahul-easy-1', 'Rahul', true, 'screen-reader');
    expect(result.success).toBe(true);
    expect(result.hesitationTimeSeconds).toBeLessThan(1.0);
  });

  it('detects user barrier and hesitation when option is incorrect', () => {
    const result = userTestSimulation.runSimulation('rahul-easy-1', 'Rahul', false, 'screen-reader');
    expect(result.success).toBe(false);
    expect(result.hesitationTimeSeconds).toBeGreaterThan(3.0);
    expect(result.issueDetected).toBeDefined();
  });
});
