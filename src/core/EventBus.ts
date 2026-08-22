type Listener = (...args: any[]) => void;

/**
 * EventBus: Global event emitter bridging Phaser scenes with UI overlays and gameplay managers.
 */
export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Set<Listener>> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public on(event: string, fn: Listener): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(fn);
    return this;
  }

  public off(event: string, fn: Listener): this {
    const set = this.listeners.get(event);
    if (set) {
      set.delete(fn);
    }
    return this;
  }

  public emit(event: string, ...args: any[]): boolean {
    const set = this.listeners.get(event);
    if (!set || set.size === 0) return false;
    set.forEach((fn) => fn(...args));
    return true;
  }
}

export const eventBus = EventBus.getInstance();

export const GameEvents = {
  // Gameplay Events
  CHARACTER_SELECTED: 'game:character-selected',
  DIALOGUE_START: 'game:dialogue-start',
  DIALOGUE_NODE: 'game:dialogue-node',
  DIALOGUE_END: 'game:dialogue-end',
  CHALLENGE_AVAILABLE: 'game:challenge-available',
  CHALLENGE_SUBMITTED: 'game:challenge-submitted',
  CHALLENGE_COMPLETED: 'game:challenge-completed',
  TRANSFORMATION_TRIGGERED: 'game:transformation-triggered',
  STATE_UPDATED: 'game:state-updated',
  SCENE_CHANGE: 'game:scene-change',
} as const;
