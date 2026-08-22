import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { TitleScene } from '../scenes/TitleScene';
import { OpeningScene } from '../scenes/OpeningScene';
import { AppointmentSimScene } from '../scenes/AppointmentSimScene';
import { CityScene } from '../scenes/CityScene';
import { DevRoomScene } from '../scenes/DevRoomScene';
import { UIScene } from '../scenes/UIScene';

export function createGame(containerId: string): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: containerId,
    width: 1280,
    height: 720,
    pixelArt: true,
    antialias: false,
    backgroundColor: '#1a1a2e',
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
        debug: false,
      },
    },
    scene: [BootScene, TitleScene, OpeningScene, AppointmentSimScene, CityScene, DevRoomScene, UIScene],
  };

  return new Phaser.Game(config);
}
