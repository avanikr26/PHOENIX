import { Investigation, InvestigationCause } from '../types/game';
import { backendService } from '../services/BackendService';
import { gameStateManager } from '../core/GameStateManager';

export class InvestigationManager {
  private static instance: InvestigationManager;
  private investigations: Map<string, Investigation> = new Map();

  private constructor() {
    this.seedInvestigations();
  }

  public static getInstance(): InvestigationManager {
    if (!InvestigationManager.instance) {
      InvestigationManager.instance = new InvestigationManager();
    }
    return InvestigationManager.instance;
  }

  public getInvestigation(challengeId: string): Investigation | undefined {
    return this.investigations.get(challengeId);
  }

  public submitDiagnosis(
    challengeId: string,
    selectedCauseId: string
  ): { isCorrect: boolean; cause: InvestigationCause; retestMessage: string } {
    const inv = this.investigations.get(challengeId);
    if (!inv) {
      throw new Error(`Investigation for challenge ${challengeId} not found.`);
    }

    const cause = inv.causes.find((c) => c.id === selectedCauseId);
    if (!cause) {
      throw new Error(`Cause ${selectedCauseId} not found.`);
    }

    const isCorrect = cause.isCorrect;

    // Save to backend service
    const playerId = gameStateManager.getState().player.name;
    backendService.saveInvestigation({
      playerId,
      challengeId,
      detectedIssue: inv.detectedIssue,
      selectedCause: cause.label,
      correctCause: inv.causes.find((c) => c.isCorrect)?.label || '',
      fixApplied: cause.fixApplied,
      resolved: isCorrect,
    });

    return {
      isCorrect,
      cause,
      retestMessage: isCorrect
        ? inv.retestSuccessMessage
        : 'The barrier persists. Re-examine user replay data to identify the true root cause.',
    };
  }

  private seedInvestigations() {
    this.investigations.set('rahul-easy-1', {
      id: 'inv-rahul-1',
      challengeId: 'rahul-easy-1',
      userProfile: 'Rahul',
      detectedIssue: 'Screen reader announces "Button, Button, Button" without context.',
      causes: [
        {
          id: 'c1',
          label: 'Icon buttons lack programmatically accessible text labels (aria-label)',
          description: 'Screen reader cannot infer the visual intent of graphic icons.',
          isCorrect: true,
          fixApplied: 'Add clear aria-label attributes to all icon controls.',
        },
        {
          id: 'c2',
          label: 'The screen reader software version is outdated',
          description: 'Attributing the failure to user technology instead of design.',
          isCorrect: false,
          fixApplied: 'Ask user to upgrade screen reader software.',
        },
        {
          id: 'c3',
          label: 'The page background color is too dark',
          description: 'Background color has no impact on screen reader speech output.',
          isCorrect: false,
          fixApplied: 'Lighten the page background.',
        },
      ],
      retestSuccessMessage: 'Rahul retests: "Submit Appointment Request! Now I know exactly what this button does!"',
    });

    this.investigations.set('fatima-easy-1', {
      id: 'inv-fatima-1',
      challengeId: 'fatima-easy-1',
      userProfile: 'Fatima',
      detectedIssue: 'Focus outline vanishes during Tab key traversal.',
      causes: [
        {
          id: 'fc1',
          label: 'CSS reset stylesheet applied `outline: none` on interactive focus',
          description: 'Removes native browser focus rings without providing accessible styling.',
          isCorrect: true,
          fixApplied: 'Implement high-contrast :focus-visible custom focus indicators.',
        },
        {
          id: 'fc2',
          label: 'Fatima is pressing the wrong keyboard key',
          description: 'Tab key is standard for keyboard focus movement.',
          isCorrect: false,
          fixApplied: 'Instruct user to use mouse instead of keyboard.',
        },
      ],
      retestSuccessMessage: 'Fatima retests: "I can clearly see where my cursor focus is positioned!"',
    });
  }
}

export const investigationManager = InvestigationManager.getInstance();
