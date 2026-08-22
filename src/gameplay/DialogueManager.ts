import { Character, DialogueNode } from '../types/game';
import { contentLoader } from '../data/ContentLoader';
import { eventBus, GameEvents } from '../core/EventBus';

export class DialogueManager {
  private static instance: DialogueManager;
  private currentCharacter: Character | null = null;
  private currentNode: DialogueNode | null = null;

  private constructor() {}

  public static getInstance(): DialogueManager {
    if (!DialogueManager.instance) {
      DialogueManager.instance = new DialogueManager();
    }
    return DialogueManager.instance;
  }

  public startDialogue(characterId: string, startNodeId?: string): void {
    const character = contentLoader.getCharacter(characterId);
    if (!character) {
      throw new Error(`Character ${characterId} not found`);
    }

    this.currentCharacter = character;
    const nodeId = startNodeId || character.initialDialogueId;
    const node = character.dialogueTree[nodeId];

    if (!node) {
      throw new Error(`Dialogue node ${nodeId} not found for character ${characterId}`);
    }

    this.currentNode = node;
    eventBus.emit(GameEvents.DIALOGUE_START, { character, node });
    eventBus.emit(GameEvents.DIALOGUE_NODE, node);
  }

  public advance(): DialogueNode | null {
    if (!this.currentCharacter || !this.currentNode) {
      return null;
    }

    if (this.currentNode.triggerChallengeId) {
      eventBus.emit(GameEvents.CHALLENGE_AVAILABLE, {
        characterId: this.currentCharacter.id,
        challengeId: this.currentNode.triggerChallengeId,
      });
    }

    if (this.currentNode.nextId) {
      const nextNode = this.currentCharacter.dialogueTree[this.currentNode.nextId];
      if (nextNode) {
        this.currentNode = nextNode;
        eventBus.emit(GameEvents.DIALOGUE_NODE, nextNode);
        return nextNode;
      }
    }

    // End of dialogue branch
    eventBus.emit(GameEvents.DIALOGUE_END, { character: this.currentCharacter });
    this.currentNode = null;
    return null;
  }

  public getCurrentNode(): DialogueNode | null {
    return this.currentNode;
  }
}

export const dialogueManager = DialogueManager.getInstance();
