import { gameStateManager } from '../core/GameStateManager';
import { AccessibilityCategory } from '../types/game';

export class ScoreManager {
  public static getScoreSummary(): {
    totalScore: number;
    totalXp: number;
    skills: Record<AccessibilityCategory, number>;
  } {
    const state = gameStateManager.getState();

    return {
      totalScore: state.totalScore,
      totalXp: state.totalXp,
      skills: state.skills,
    };
  }
}
