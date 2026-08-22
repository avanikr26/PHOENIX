import { DesignTool } from '../types/game';
import { gameStateManager } from '../core/GameStateManager';

export class ToolManager {
  private static instance: ToolManager;
  private tools: Map<string, DesignTool> = new Map();

  private constructor() {
    this.seedTools();
  }

  public static getInstance(): ToolManager {
    if (!ToolManager.instance) {
      ToolManager.instance = new ToolManager();
    }
    return ToolManager.instance;
  }

  public getAllTools(): DesignTool[] {
    const state = gameStateManager.getState();
    return Array.from(this.tools.values()).map((t) => ({
      ...t,
      isPurchased: state.purchasedToolIds.includes(t.id),
    }));
  }

  public purchaseTool(toolId: string): { success: boolean; message: string; tool?: DesignTool } {
    const tool = this.tools.get(toolId);
    if (!tool) {
      return { success: false, message: 'Tool not found.' };
    }

    const state = gameStateManager.getState();
    if (state.purchasedToolIds.includes(toolId)) {
      return { success: false, message: 'Tool already unlocked.' };
    }

    if (state.designCredits < tool.cost) {
      return {
        success: false,
        message: `Insufficient Design Credits! Cost: ${tool.cost} CR, Available: ${state.designCredits} CR.`,
      };
    }

    // Deduct credits & unlock
    gameStateManager.deductDesignCredits(tool.cost);
    gameStateManager.addPurchasedTool(toolId);

    return {
      success: true,
      message: `Unlocked design tool: "${tool.name}"!`,
      tool: { ...tool, isPurchased: true },
    };
  }

  private seedTools() {
    const defaultTools: DesignTool[] = [
      {
        id: 'contrast-booster',
        name: 'High-Contrast Contrast Engine',
        cost: 10,
        category: 'visual',
        description: 'Boosts text-to-background contrast ratio to 7:1 for optimal AAA legibility.',
        effect: { contrastRatio: '7.0' },
        isPurchased: false,
      },
      {
        id: 'target-enlarger',
        name: '48px Touch Target Enlarger',
        cost: 15,
        category: 'motor',
        description: 'Expands click & touch targets to minimum 48x48px boundaries for motor accessibility.',
        effect: { minTargetSize: '48px' },
        isPurchased: false,
      },
      {
        id: 'label-sanitizer',
        name: 'Plain Language & Label Sanitizer',
        cost: 20,
        category: 'cognitive',
        description: 'Replaces complex technical jargon with plain concise step-by-step instructions.',
        effect: { readabilityLevel: 'Grade 6' },
        isPurchased: false,
      },
      {
        id: 'focus-navigator',
        name: 'Keyboard Focus Manager',
        cost: 25,
        category: 'keyboard',
        description: 'Enforces logical focus traps in modal windows and visible :focus-visible indicators.',
        effect: { focusIndicator: '3px solid #ffb703' },
        isPurchased: false,
      },
    ];

    defaultTools.forEach((t) => this.tools.set(t.id, t));
  }
}

export const toolManager = ToolManager.getInstance();
