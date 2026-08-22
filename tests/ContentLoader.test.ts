import { describe, it, expect } from 'vitest';
import { contentLoader } from '../src/data/ContentLoader';

describe('ContentLoader', () => {
  it('loads and validates all initial characters and challenges', () => {
    const { characters, challenges } = contentLoader.loadAll();
    expect(characters.length).toBeGreaterThan(0);
    expect(challenges.length).toBeGreaterThan(0);
  });

  it('retrieves characters by ID correctly', () => {
    contentLoader.loadAll();
    const rahul = contentLoader.getCharacter('rahul');
    expect(rahul).toBeDefined();
    expect(rahul?.name).toBe('Rahul');
  });

  it('retrieves challenges by ID correctly', () => {
    contentLoader.loadAll();
    const challenge = contentLoader.getChallenge('rahul-easy-1');
    expect(challenge).toBeDefined();
    expect(challenge?.characterId).toBe('rahul');
  });
});
