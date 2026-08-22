import { FinalSimulationResult } from '../types/game';
import { gameStateManager } from '../core/GameStateManager';

export class FinalSimulationManager {
  private static instance: FinalSimulationManager;

  private constructor() {}

  public static getInstance(): FinalSimulationManager {
    if (!FinalSimulationManager.instance) {
      FinalSimulationManager.instance = new FinalSimulationManager();
    }
    return FinalSimulationManager.instance;
  }

  /**
   * Simulates 10,000 citizens accessing the city's digital portal based on unlocked tools and completed challenges.
   * Performs calculation entirely in memory without 10,000 database requests.
   */
  public runFinalSimulation(): FinalSimulationResult {
    const state = gameStateManager.getState();
    const completedCount = state.completedChallengeIds.length;
    const toolsUnlocked = state.purchasedToolIds.length;

    // Calculate simulation performance
    const totalCitizens = 10000;
    const baseAccessibility = 60 + completedCount * 10 + toolsUnlocked * 5;
    const accessibilityScore = Math.min(98, baseAccessibility);
    const efficiencyScore = Math.min(95, 70 + completedCount * 8);
    const designScore = Math.round((accessibilityScore + efficiencyScore) / 2);

    const citizensServed = Math.round(totalCitizens * (accessibilityScore / 100));

    const result: FinalSimulationResult = {
      citizensServed,
      totalCitizens,
      accessibilityScore,
      efficiencyScore,
      designScore,
      isCompleted: true,
    };

    if (accessibilityScore >= 85) {
      gameStateManager.setGameComplete(true);
      if (!state.unlockedBadgeIds.includes('ZERO_EXCLUSION')) {
        state.unlockedBadgeIds.push('ZERO_EXCLUSION');
      }
    }

    return result;
  }
}

export const finalSimulationManager = FinalSimulationManager.getInstance();
