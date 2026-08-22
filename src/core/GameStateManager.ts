import { GameState, DifficultyLevel, AccessibilityCategory } from '../types/game';
import { eventBus, GameEvents } from './EventBus';
import { challengeRegistry } from '../data/ChallengeRegistry';
import localforage from 'localforage';
import { getAuthToken } from './SupabaseClient';

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
      websiteImprovements: {
        semanticLabels: false,
        captions: false,
        colorIndependentIndicators: false,
        largerTargets: false,
        simplifiedLayout: false,
        readableTypography: false,
        keyboardAlternative: false,
      },
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

    // Apply persistent website transformation status
    const challenge = challengeRegistry.getById(challengeId);
    if (challenge && challenge.transformation) {
      this.state.websiteImprovements[challenge.transformation.type] = true;
    }

    // Check progression
    const allChallenges = challengeRegistry.getAll();
    if (allChallenges.length > 0) {
      const easyChals = allChallenges.filter(c => c.difficulty === 'easy');
      const medChals = allChallenges.filter(c => c.difficulty === 'medium');
      const hardChals = allChallenges.filter(c => c.difficulty === 'hard');

      const allEasyDone = easyChals.length > 0 && easyChals.every(c => this.state.completedChallengeIds.includes(c.id));
      const allMedDone = medChals.length > 0 && medChals.every(c => this.state.completedChallengeIds.includes(c.id));
      const allHardDone = hardChals.length > 0 && hardChals.every(c => this.state.completedChallengeIds.includes(c.id));

      if (this.state.currentDifficulty === 'easy' && allEasyDone) {
        this.state.currentDifficulty = 'medium';
      } else if (this.state.currentDifficulty === 'medium' && allMedDone) {
        this.state.currentDifficulty = 'hard';
      } else if (this.state.currentDifficulty === 'hard' && allHardDone) {
        this.state.isGameComplete = true;
      }

      // --- Badge Milestones Unlocks ---
      const completedCount = this.state.completedChallengeIds.length;
      
      const unlockBadge = (badgeId: string) => {
        if (!this.state.unlockedBadgeIds.includes(badgeId)) {
          this.state.unlockedBadgeIds.push(badgeId);
          eventBus.emit('game:badge-unlocked', badgeId);
        }
      };

      // 1. FIRST_FIX
      if (completedCount >= 1) {
        unlockBadge('FIRST_FIX');
      }

      // Filter challenges by category
      const visualChals = allChallenges.filter(c => c.category === 'visual');
      const auditoryChals = allChallenges.filter(c => c.category === 'auditory' || c.category === 'speech' || c.category === 'screen-reader');
      const motorChals = allChallenges.filter(c => c.category === 'motor' || c.category === 'keyboard');
      const cognitiveChals = allChallenges.filter(c => c.category === 'cognitive');

      // 2. VISUAL_ACCESSIBILITY
      const visualDone = visualChals.length > 0 && visualChals.every(c => this.state.completedChallengeIds.includes(c.id));
      if (visualDone) {
        unlockBadge('VISUAL_ACCESSIBILITY');
      }

      // 3. INCLUSIVE_AUDIO
      const auditoryDone = auditoryChals.length > 0 && auditoryChals.every(c => this.state.completedChallengeIds.includes(c.id));
      if (auditoryDone) {
        unlockBadge('INCLUSIVE_AUDIO');
      }

      // 4. COLOR_CRUSHER
      const grandmaDone = this.state.completedChallengeIds.some(id => id.includes('grandma') || id.includes('mira-color'));
      if (grandmaDone) {
        unlockBadge('COLOR_CRUSHER');
      }

      // 5. KEYBOARD_KNIGHT
      const motorDone = motorChals.length > 0 && motorChals.every(c => this.state.completedChallengeIds.includes(c.id));
      if (motorDone) {
        unlockBadge('KEYBOARD_KNIGHT');
      }

      // 6. CLEAR_THINKER
      const cognitiveDone = cognitiveChals.length > 0 && cognitiveChals.every(c => this.state.completedChallengeIds.includes(c.id));
      if (cognitiveDone) {
        unlockBadge('CLEAR_THINKER');
      }

      // 7. INCLUSIVE_ARCHITECT
      if (completedCount >= allChallenges.length * 0.8) {
        unlockBadge('INCLUSIVE_ARCHITECT');
      }
    }

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

    // Backend sync (asynchronous, non-blocking)
    const username = this.state.player?.name || 'Designer';
    getAuthToken().then(token => {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      fetch(`/api/state/${encodeURIComponent(username)}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(this.state)
      }).catch(err => {
        console.warn('Backend sync failed:', err);
      });
    }).catch(() => {});
  }

  public async loadProgress(): Promise<boolean> {
    // Try to load from backend first
    try {
      const username = this.state.player?.name || 'Designer';
      const token = await getAuthToken();
      const headers: Record<string, string> = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      const response = await fetch(`/api/state/${encodeURIComponent(username)}`, { headers });
      if (response.ok) {
        const saved = await response.json();
        if (saved) {
          this.state = { ...this.getInitialState(), ...saved };
          eventBus.emit(GameEvents.STATE_UPDATED, this.getState());
          return true;
        }
      }
    } catch (err) {
      console.warn('Failed to load from backend, falling back to local storage', err);
    }

    // Local fallback
    try {
      const saved = await localforage.getItem<GameState>(SAVE_KEY);
      if (saved) {
        this.state = { ...this.getInitialState(), ...saved };
        eventBus.emit(GameEvents.STATE_UPDATED, this.getState());
        return true;
      }
    } catch {
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (raw) {
          this.state = { ...this.getInitialState(), ...JSON.parse(raw) };
          eventBus.emit(GameEvents.STATE_UPDATED, this.getState());
          return true;
        }
      } catch { /* ignore */ }
    }
    return false;
  }
}

export const gameStateManager = GameStateManager.getInstance();
