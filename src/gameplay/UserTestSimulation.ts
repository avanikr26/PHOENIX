import { UserTestResult, AccessibilityCategory } from '../types/game';
import { backendService } from '../services/BackendService';
import { gameStateManager } from '../core/GameStateManager';

export class UserTestSimulation {
  private static instance: UserTestSimulation;

  private constructor() {}

  public static getInstance(): UserTestSimulation {
    if (!UserTestSimulation.instance) {
      UserTestSimulation.instance = new UserTestSimulation();
    }
    return UserTestSimulation.instance;
  }

  /**
   * Evaluates a user interaction test based on selected option and user profile (Fatima, Rahul, Grandma).
   */
  public runSimulation(
    challengeId: string,
    userProfile: string,
    isOptionCorrect: boolean,
    category: AccessibilityCategory
  ): UserTestResult {
    let result: UserTestResult;

    if (isOptionCorrect) {
      result = {
        challengeId,
        userProfile,
        success: true,
        completionTimeSeconds: 2.1,
        hesitationTimeSeconds: 0.3,
        issueCategory: category,
        feedback: `${userProfile} successfully completed the task without encountering barriers!`,
      };
    } else {
      let hesitation = 4.2;
      let failedAction = 'Button Click Interruption';
      let issueDetected = 'Ambiguous interactive hierarchy';

      if (userProfile === 'Rahul') {
        hesitation = 5.8;
        failedAction = 'Screen Reader Announcement Gap';
        issueDetected = 'Unlabeled icon button unannounced by assistive technology';
      } else if (userProfile === 'Fatima') {
        hesitation = 3.9;
        failedAction = 'Keyboard Focus Skip';
        issueDetected = 'Target skipped during Tab key navigation';
      } else if (userProfile === 'Grandma') {
        hesitation = 4.5;
        failedAction = 'Dense Technical Jargon & Low Contrast';
        issueDetected = 'Complex multi-step instructions and small text size';
      }

      result = {
        challengeId,
        userProfile,
        success: false,
        completionTimeSeconds: 12.4,
        hesitationTimeSeconds: hesitation,
        failedAction,
        issueDetected,
        issueCategory: category,
        feedback: `${userProfile} encountered a barrier: "${issueDetected}".`,
      };
    }

    // Persist to backend service repository
    const playerId = gameStateManager.getState().player.name;
    backendService.saveUserTestResult({
      playerId,
      challengeId,
      userProfile,
      success: result.success,
      hesitationTime: result.hesitationTimeSeconds,
      failedAction: result.failedAction,
      issueDetected: result.issueDetected,
      feedback: result.feedback,
    });

    return result;
  }
}

export const userTestSimulation = UserTestSimulation.getInstance();
