import { GameState, DifficultyLevel, AccessibilityCategory } from '../types/game';
import { eventBus, GameEvents } from './EventBus';
import localforage from 'localforage';

// Configure localforage store
localforage.config({
  name: 'InclusiveInterface',
  storeName: 'game_state',
  description: 'Access City player progress',
});

const SAVE_KEY = 'access-city-state-v1';

export class GameStateManager {
  private static instance: GameStateManager;

  private state: GameState;

  private constructor() {
    this.state = this.getInitialState();
  }

  public static getInstance(): GameStateManager {
    if (!GameStateManager.instance) {
      GameStateManager.instance = new GameStateManager();
    }
    return GameStateManager.instance;
  }

  public getInitialState(): GameState {
    const categories: AccessibilityCategory[] = [
      'visual',
      'motor',
      'cognitive',
      'auditory',
      'speech',
      'screen-reader',
      'language',
      'keyboard',
    ];

    const initialSkills = categories.reduce((acc, cat) => {
      acc[cat] = 0;
      return acc;
    }, {} as Record<AccessibilityCategory, number>);

    return {
      player: {
        name: 'Designer',
        title: 'Access Architect',
        avatarConfig: {
          shirt: '#2a9d8f',
          skin: '#f5c079',
        },
      },
      currentScene: 'BootScene',
      currentCharacterId: null,
      currentDistrictId: 'medicity',
      currentDifficulty: 'easy',
      totalScore: 0,
      totalXp: 0,
      designCredits: 100,
      skills: initialSkills,
      completedChallengeIds: [],
      unlockedLocations: ['medicity'],
      unlockedBadgeIds: [],
      purchasedToolIds: [],
      isGameComplete: false,
    };
  }

  public getState(): GameState {
    return this.state;
  }

  public setCurrentCharacter(characterId: string | null): void {
    this.state.currentCharacterId = characterId;
    this.notifyStateUpdate();
  }

  public setDifficulty(difficulty: DifficultyLevel): void {
    this.state.currentDifficulty = difficulty;
    this.notifyStateUpdate();
  }

  public setCurrentScene(sceneName: string): void {
    this.state.currentScene = sceneName;
    this.notifyStateUpdate();
  }

  public deductDesignCredits(amount: number): boolean {
    if (this.state.designCredits >= amount) {
      this.state.designCredits -= amount;
      this.notifyStateUpdate();
      return true;
    }
    return false;
  }

  public addPurchasedTool(toolId: string): void {
    if (!this.state.purchasedToolIds.includes(toolId)) {
      this.state.purchasedToolIds.push(toolId);
      this.notifyStateUpdate();
    }
  }

  public setGameComplete(complete: boolean): void {
    this.state.isGameComplete = complete;
    this.notifyStateUpdate();
  }

  public recordChallengeCompletion(
    challengeId: string,
    category: AccessibilityCategory,
    earnedPoints: number,
    _maxPoints: number
  ): void {
    if (!this.state.completedChallengeIds.includes(challengeId)) {
      this.state.completedChallengeIds.push(challengeId);
    }

    this.state.totalScore += earnedPoints;
    this.state.totalXp += earnedPoints * 2;
    this.state.skills[category] = Math.min(100, (this.state.skills[category] || 0) + 25);

    this.notifyStateUpdate();
  }

  public isChallengeCompleted(challengeId: string): boolean {
    return this.state.completedChallengeIds.includes(challengeId);
  }

  public resetState(): void {
    this.state = this.getInitialState();
    this.notifyStateUpdate();
  }

  private notifyStateUpdate(): void {
    eventBus.emit(GameEvents.STATE_UPDATED, this.getState());
    this.saveProgress();
  }

  public async saveProgress(): Promise<void> {
    try {
      await localforage.setItem(SAVE_KEY, this.state);
    } catch (e) {
      // localStorage fallback
      try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.state)); } catch { /* ignore */ }
    }
  }

  public async loadProgress(): Promise<boolean> {
    try {
      const saved = await localforage.getItem<GameState>(SAVE_KEY);
      if (saved) {
        this.state = { ...this.getInitialState(), ...saved };
        this.notifyStateUpdate();
        return true;
      }
    } catch {
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) {
          this.state = { ...this.getInitialState(), ...JSON.parse(raw) };
          this.notifyStateUpdate();
          return true;
        }
      } catch { /* ignore */ }
    }
    return false;
  }
}

export const gameStateManager = GameStateManager.getInstance();
