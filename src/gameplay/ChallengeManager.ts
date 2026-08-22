import { Challenge, DifficultyLevel } from '../types/game';
import { challengeRegistry } from '../data/ChallengeRegistry';
import { gameStateManager } from '../core/GameStateManager';

export class ChallengeManager {
  private static instance: ChallengeManager;

  private constructor() {}

  public static getInstance(): ChallengeManager {
    if (!ChallengeManager.instance) {
      ChallengeManager.instance = new ChallengeManager();
    }
    return ChallengeManager.instance;
  }

  /**
   * Dynamically gets the next challenge for a given character and difficulty level.
   * Ensures prerequisites are completed and completed challenges are filtered out.
   */
  public getNextChallenge(
    characterId: string,
    difficulty: DifficultyLevel
  ): Challenge | null {
    const state = gameStateManager.getState();
    const candidatePool = challengeRegistry.getByCharacterAndDifficulty(
      characterId,
      difficulty
    );

    // Filter out already completed challenges
    const uncompleted = candidatePool.filter(
      (c) => !state.completedChallengeIds.includes(c.id)
    );

    // Filter candidates whose prerequisites are met
    const available = uncompleted.filter((c) => {
      if (!c.prerequisiteIds || c.prerequisiteIds.length === 0) {
        return true;
      }
      return c.prerequisiteIds.every((prereqId) =>
        state.completedChallengeIds.includes(prereqId)
      );
    });

    if (available.length > 0) {
      return available[0];
    }

    // Fallback: If no challenge matches current difficulty, check all remaining challenges for character
    const allForChar = challengeRegistry.getAllForCharacter(characterId);
    const uncompletedAny = allForChar.filter(
      (c) =>
        !state.completedChallengeIds.includes(c.id) &&
        (!c.prerequisiteIds ||
          c.prerequisiteIds.every((p) => state.completedChallengeIds.includes(p)))
    );

    return uncompletedAny.length > 0 ? uncompletedAny[0] : null;
  }

  public submitAnswer(
    challengeId: string,
    selectedOptionId: string
  ): { isCorrect: boolean; pointsEarned: number; feedback: string; challenge: Challenge } {
    const challenge = challengeRegistry.getById(challengeId);
    if (!challenge) {
      throw new Error(`Challenge ${challengeId} not found.`);
    }

    const option = challenge.options.find((o) => o.id === selectedOptionId);
    if (!option) {
      throw new Error(`Option ${selectedOptionId} not found in challenge.`);
    }

    const isCorrect = option.isCorrect;
    const pointsEarned = isCorrect ? challenge.points + option.scoreBonus : 0;

    if (isCorrect) {
      gameStateManager.recordChallengeCompletion(
        challengeId,
        challenge.category,
        pointsEarned,
        challenge.points + option.scoreBonus
      );
    }

    return {
      isCorrect,
      pointsEarned,
      feedback: option.feedback,
      challenge,
    };
  }
}

export const challengeManager = ChallengeManager.getInstance();
