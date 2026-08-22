import { Character, Challenge } from '../types/game';
import { INITIAL_CHARACTERS, INITIAL_CHALLENGES } from './initialContent';

export class ContentLoader {
  private characters: Map<string, Character> = new Map();
  private challenges: Map<string, Challenge> = new Map();

  public loadAll(): { characters: Character[]; challenges: Challenge[] } {
    this.characters.clear();
    this.challenges.clear();

    INITIAL_CHARACTERS.forEach((char) => {
      this.validateCharacter(char);
      this.characters.set(char.id, char);
    });

    INITIAL_CHALLENGES.forEach((chal) => {
      this.validateChallenge(chal);
      this.challenges.set(chal.id, chal);
    });

    return {
      characters: Array.from(this.characters.values()),
      challenges: Array.from(this.challenges.values()),
    };
  }

  public getCharacter(id: string): Character | undefined {
    return this.characters.get(id);
  }

  public getChallenge(id: string): Challenge | undefined {
    return this.challenges.get(id);
  }

  private validateCharacter(char: Character): void {
    if (!char.id || !char.name || !char.dialogueTree) {
      throw new Error(`Invalid character schema for ID: ${char.id}`);
    }
  }

  private validateChallenge(chal: Challenge): void {
    if (!chal.id || !chal.characterId || !chal.question || !chal.options) {
      throw new Error(`Invalid challenge schema for ID: ${chal.id}`);
    }
    if (chal.options.length < 2) {
      throw new Error(`Challenge ${chal.id} must have at least 2 options.`);
    }
    const hasCorrect = chal.options.some((opt) => opt.isCorrect);
    if (!hasCorrect) {
      throw new Error(`Challenge ${chal.id} must have at least one correct option.`);
    }
  }
}

export const contentLoader = new ContentLoader();
