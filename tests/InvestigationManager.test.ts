import { describe, it, expect } from 'vitest';
import { investigationManager } from '../src/gameplay/InvestigationManager';

describe('InvestigationManager', () => {
  it('retrieves investigation data for a challenge ID', () => {
    const inv = investigationManager.getInvestigation('rahul-easy-1');
    expect(inv).toBeDefined();
    expect(inv?.userProfile).toBe('Rahul');
  });

  it('validates correct diagnosis and returns fix application feedback', () => {
    const result = investigationManager.submitDiagnosis('rahul-easy-1', 'c1');
    expect(result.isCorrect).toBe(true);
    expect(result.cause.fixApplied).toContain('aria-label');
  });

  it('handles incorrect cause diagnosis gracefully', () => {
    const result = investigationManager.submitDiagnosis('rahul-easy-1', 'c2');
    expect(result.isCorrect).toBe(false);
  });
});
