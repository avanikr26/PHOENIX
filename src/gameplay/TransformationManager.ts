import { InterfaceTransformation } from '../types/game';
import { eventBus, GameEvents } from '../core/EventBus';

export class TransformationManager {
  private static instance: TransformationManager;
  private activeTransformations: InterfaceTransformation[] = [];

  private constructor() {}

  public static getInstance(): TransformationManager {
    if (!TransformationManager.instance) {
      TransformationManager.instance = new TransformationManager();
    }
    return TransformationManager.instance;
  }

  public applyTransformation(transformation: InterfaceTransformation): void {
    this.activeTransformations.push(transformation);

    if (transformation.cssChanges) {
      const root = document.documentElement;
      Object.entries(transformation.cssChanges).forEach(([key, val]) => {
        root.style.setProperty(`--trans-${key}`, val);
      });
    }

    eventBus.emit(GameEvents.TRANSFORMATION_TRIGGERED, transformation);
  }

  public getActiveTransformations(): ReadonlyArray<InterfaceTransformation> {
    return this.activeTransformations;
  }
}

export const transformationManager = TransformationManager.getInstance();
