import { describe, it, expect } from 'vitest';
import { finalSimulationManager } from '../src/gameplay/FinalSimulationManager';

describe('FinalSimulationManager', () => {
  it('runs batch 10,000 citizen simulation calculations in memory', () => {
    const res = finalSimulationManager.runFinalSimulation();
    expect(res.totalCitizens).toBe(10000);
    expect(res.citizensServed).toBeGreaterThan(5000);
    expect(res.accessibilityScore).toBeGreaterThanOrEqual(60);
  });
});
