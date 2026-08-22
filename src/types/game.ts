export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'expert';

export type AccessibilityCategory = 
  | 'visual' 
  | 'motor' 
  | 'cognitive' 
  | 'auditory' 
  | 'speech' 
  | 'screen-reader'
  | 'language'
  | 'keyboard';

export interface ChallengeOption {
  id: string;
  label: string;
  description: string;
  isCorrect: boolean;
  scoreBonus: number;
  feedback: string;
  transformationId?: string;
}

export interface InterfaceTransformation {
  type: string;
  cssChanges?: Record<string, string>;
  ariaLabel?: string;
  focusEnabled?: boolean;
  contrastRatio?: number;
  fontScale?: number;
}

export interface Challenge {
  id: string;
  characterId: string;
  districtId?: string;
  category: AccessibilityCategory;
  difficulty: DifficultyLevel;
  title: string;
  scenario: string;
  description: string;
  question: string;
  explanation: string;
  accessibilityPrinciple: string;
  options: ChallengeOption[];
  prerequisiteIds?: string[];
  points: number;
  rewardCredits: number;
  transformation?: InterfaceTransformation;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  avatarUrl?: string;
  nextId?: string;
  triggerChallengeId?: string;
  triggerInvestigationId?: string;
}

export interface Character {
  id: string;
  name: string;
  role: string;
  bio: string;
  storyRole: string;
  avatarColor: number;
  accessibilityNeeds: AccessibilityCategory[];
  dialogueTree: Record<string, DialogueNode>;
  initialDialogueId: string;
}

export interface District {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockRequirement: string;
  activeMissionId?: string;
}

export interface Mission {
  id: string;
  districtId: string;
  title: string;
  description: string;
  storyIntro: string;
  requiredChallengeIds: string[];
  rewardXp: number;
  rewardCredits: number;
  isCompleted: boolean;
}

export interface DesignTool {
  id: string;
  name: string;
  cost: number;
  category: AccessibilityCategory;
  description: string;
  effect: Record<string, string>;
  isPurchased: boolean;
}

export interface UserTestResult {
  challengeId: string;
  userProfile: string;
  success: boolean;
  completionTimeSeconds: number;
  hesitationTimeSeconds: number;
  failedAction?: string;
  issueDetected?: string;
  issueCategory: AccessibilityCategory;
  feedback: string;
}

export interface InvestigationCause {
  id: string;
  label: string;
  description: string;
  isCorrect: boolean;
  fixApplied: string;
}

export interface Investigation {
  id: string;
  challengeId: string;
  userProfile: string;
  detectedIssue: string;
  causes: InvestigationCause[];
  retestSuccessMessage: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  conditionType: 'challenges_solved' | 'category_mastered' | 'district_unlocked' | 'zero_exclusion';
  conditionValue: string | number;
  isUnlocked: boolean;
}

export interface PlayerSkill {
  category: AccessibilityCategory;
  score: number; // 0 to 100 competency rating
}

export interface PlayerProfile {
  name: string;
  title: string;
  avatarConfig: {
    shirt: string;
    skin: string;
  };
}

export interface FinalSimulationResult {
  citizensServed: number;
  totalCitizens: number;
  accessibilityScore: number; // %
  efficiencyScore: number; // %
  designScore: number; // %
  isCompleted: boolean;
}

export interface GameState {
  player: PlayerProfile;
  currentScene: string;
  currentCharacterId: string | null;
  currentDistrictId: string;
  currentDifficulty: DifficultyLevel;
  totalScore: number;
  totalXp: number;
  designCredits: number;
  skills: Record<AccessibilityCategory, number>;
  completedChallengeIds: string[];
  unlockedLocations: string[];
  unlockedBadgeIds: string[];
  purchasedToolIds: string[];
  websiteImprovements: Record<string, boolean>;
  isGameComplete: boolean;
}
