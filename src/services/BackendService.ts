import { supabaseClient } from './SupabaseClient';
import { GameState } from '../types/game';

export interface PendingSyncItem {
  id: string;
  type: 'attempt' | 'decision' | 'user_test' | 'investigation' | 'badge' | 'progress';
  payload: any;
  timestamp: number;
}

export class BackendService {
  private static instance: BackendService;
  private syncQueue: PendingSyncItem[] = [];
  private isOnline: boolean = true;

  private constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleNetworkRestored());
      window.addEventListener('offline', () => {
        this.isOnline = false;
        console.warn('⚠️ Network offline. Backend persistence paused ("SYNC PAUSED").');
      });
    }
  }

  public static getInstance(): BackendService {
    if (!BackendService.instance) {
      BackendService.instance = new BackendService();
    }
    return BackendService.instance;
  }

  public isBackendAvailable(): boolean {
    return this.isOnline && supabaseClient.getIsConfigured();
  }

  public async getPlayerProfile(playerId: string): Promise<any | null> {
    if (!this.isBackendAvailable()) return null;
    try {
      const data = await supabaseClient.fetch(`players?id=eq.${playerId}`);
      return data && data.length > 0 ? data[0] : null;
    } catch (err) {
      console.warn('Fallback: Failed to fetch player profile from backend', err);
      return null;
    }
  }

  public async savePlayerProgress(state: GameState): Promise<boolean> {
    const payload = {
      current_difficulty: state.currentDifficulty,
      completed_challenge_ids: state.completedChallengeIds,
      unlocked_district_ids: state.unlockedLocations,
      total_score: state.totalScore,
      updated_at: new Date().toISOString(),
    };

    if (!this.isBackendAvailable()) {
      this.enqueuePendingSync('progress', payload);
      return false;
    }

    try {
      await supabaseClient.fetch('player_progress', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates' },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (err) {
      this.enqueuePendingSync('progress', payload);
      return false;
    }
  }

  public async submitChallengeAttempt(attempt: {
    playerId: string;
    challengeId: string;
    attemptNumber: number;
    selectedOptionId: string;
    isCorrect: boolean;
    pointsEarned: number;
    durationSeconds?: number;
  }): Promise<boolean> {
    const payload = {
      player_id: attempt.playerId,
      challenge_id: attempt.challengeId,
      attempt_number: attempt.attemptNumber,
      selected_option_id: attempt.selectedOptionId,
      is_correct: attempt.isCorrect,
      points_earned: attempt.pointsEarned,
      duration_seconds: attempt.durationSeconds || 0,
      created_at: new Date().toISOString(),
    };

    if (!this.isBackendAvailable()) {
      this.enqueuePendingSync('attempt', payload);
      return false;
    }

    try {
      await supabaseClient.fetch('challenge_attempts', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return true;
    } catch (err) {
      this.enqueuePendingSync('attempt', payload);
      return false;
    }
  }

  public async saveUserTestResult(result: {
    playerId: string;
    challengeId: string;
    userProfile: string;
    success: boolean;
    hesitationTime: number;
    failedAction?: string;
    issueDetected?: string;
    feedback: string;
  }): Promise<boolean> {
    const payload = {
      player_id: result.playerId,
      challenge_id: result.challengeId,
      user_profile: result.userProfile,
      success: result.success,
      hesitation_time: result.hesitationTime,
      failed_action: result.failedAction || null,
      issue_detected: result.issueDetected || null,
      feedback: result.feedback,
      created_at: new Date().toISOString(),
    };

    if (!this.isBackendAvailable()) {
      this.enqueuePendingSync('user_test', payload);
      return false;
    }

    try {
      await supabaseClient.fetch('user_test_results', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return true;
    } catch (err) {
      this.enqueuePendingSync('user_test', payload);
      return false;
    }
  }

  public async saveInvestigation(investigation: {
    playerId: string;
    challengeId: string;
    detectedIssue: string;
    selectedCause: string;
    correctCause: string;
    fixApplied: string;
    resolved: boolean;
  }): Promise<boolean> {
    const payload = {
      player_id: investigation.playerId,
      challenge_id: investigation.challengeId,
      detected_issue: investigation.detectedIssue,
      selected_cause: investigation.selectedCause,
      correct_cause: investigation.correctCause,
      fix_applied: investigation.fixApplied,
      resolved: investigation.resolved,
      created_at: new Date().toISOString(),
    };

    if (!this.isBackendAvailable()) {
      this.enqueuePendingSync('investigation', payload);
      return false;
    }

    try {
      await supabaseClient.fetch('investigation_results', {
        method: 'POST',
        body: JSON.stringify(payload),
      });
      return true;
    } catch (err) {
      this.enqueuePendingSync('investigation', payload);
      return false;
    }
  }

  public async unlockBadge(playerId: string, badgeId: string): Promise<boolean> {
    const payload = {
      player_id: playerId,
      badge_id: badgeId,
      unlocked_at: new Date().toISOString(),
    };

    if (!this.isBackendAvailable()) {
      this.enqueuePendingSync('badge', payload);
      return false;
    }

    try {
      await supabaseClient.fetch('player_badges', {
        method: 'POST',
        headers: { Prefer: 'resolution=ignore-duplicates' },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (err) {
      this.enqueuePendingSync('badge', payload);
      return false;
    }
  }

  public getSyncQueue(): ReadonlyArray<PendingSyncItem> {
    return this.syncQueue;
  }

  private enqueuePendingSync(type: PendingSyncItem['type'], payload: any): void {
    const item: PendingSyncItem = {
      id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type,
      payload,
      timestamp: Date.now(),
    };
    this.syncQueue.push(item);
    console.log(`[SYNC QUEUED] (${type}): Queue size = ${this.syncQueue.length}`);
  }

  private async handleNetworkRestored(): Promise<void> {
    this.isOnline = true;
    console.log('⚡ Network connection restored. Flushing pending sync queue...');
    if (this.syncQueue.length === 0 || !supabaseClient.getIsConfigured()) return;

    const remaining: PendingSyncItem[] = [];
    for (const item of this.syncQueue) {
      try {
        const endpoint =
          item.type === 'attempt'
            ? 'challenge_attempts'
            : item.type === 'user_test'
            ? 'user_test_results'
            : item.type === 'investigation'
            ? 'investigation_results'
            : item.type === 'badge'
            ? 'player_badges'
            : 'player_progress';

        await supabaseClient.fetch(endpoint, {
          method: 'POST',
          body: JSON.stringify(item.payload),
        });
      } catch (err) {
        remaining.push(item);
      }
    }

    this.syncQueue = remaining;
    console.log(`[SYNC COMPLETED] Remaining queued items = ${this.syncQueue.length}`);
  }
}

export const backendService = BackendService.getInstance();
