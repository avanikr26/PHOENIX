import { Challenge, DifficultyLevel } from '../types/game';

export class ChallengeRegistry {
  private static instance: ChallengeRegistry;

  private registry: Map<string, Challenge> = new Map();

  private constructor() {}

  public static getInstance(): ChallengeRegistry {
    if (!ChallengeRegistry.instance) {
      ChallengeRegistry.instance = new ChallengeRegistry();
    }
    return ChallengeRegistry.instance;
  }

  public registerAll(challenges: Challenge[]): void {
    this.registry.clear();
    challenges.forEach((c) => this.registry.set(c.id, c));
  }

  public getById(id: string): Challenge | undefined {
    return this.registry.get(id);
  }

  public getByCharacterAndDifficulty(
    characterId: string,
    difficulty: DifficultyLevel
  ): Challenge[] {
    return Array.from(this.registry.values()).filter(
      (c) => c.characterId === characterId && c.difficulty === difficulty
    );
  }

  public getAllForCharacter(characterId: string): Challenge[] {
    return Array.from(this.registry.values()).filter(
      (c) => c.characterId === characterId
    );
  }

  public getAll(): Challenge[] {
    return Array.from(this.registry.values());
  }
}

export const challengeRegistry = ChallengeRegistry.getInstance();
