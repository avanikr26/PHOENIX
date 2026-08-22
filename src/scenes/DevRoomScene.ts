import Phaser from 'phaser';
import { dialogueManager } from '../gameplay/DialogueManager';
import { gameStateManager } from '../core/GameStateManager';

export class DevRoomScene extends Phaser.Scene {
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private rahulNPC!: Phaser.GameObjects.Sprite;
  private fatimaNPC!: Phaser.GameObjects.Sprite;
  private activePromptText!: Phaser.GameObjects.Text;

  constructor() {
    super('DevRoomScene');
  }

  create() {
    const { width, height } = this.scale;

    // Room Floor & Walls
    const room = this.add.graphics();
    room.fillStyle(0x16192b, 1);
    room.fillRect(40, 40, width - 80, height - 80);
    room.lineStyle(4, 0x3b4269, 1);
    room.strokeRect(40, 40, width - 80, height - 80);

    // Floor Tile Grid
    room.lineStyle(1, 0x222744, 0.4);
    for (let x = 40; x < width - 40; x += 32) {
      room.lineBetween(x, 40, x, height - 40);
    }
    for (let y = 40; y < height - 40; y += 32) {
      room.lineBetween(40, y, width - 40, y);
    }

    // Add Workstations
    this.add.sprite(120, 100, 'workstation').setScale(1.5);
    this.add.sprite(width - 120, 100, 'workstation').setScale(1.5);

    this.add
      .text(120, 140, 'Workstation 1', {
        fontFamily: '"VT323", monospace',
        fontSize: '18px',
        color: '#8b95c9',
      })
      .setOrigin(0.5);

    // Add NPCs
    this.rahulNPC = this.add.sprite(200, 220, 'npc-rahul').setScale(1.5);
    this.add
      .text(200, 190, 'Rahul [Screen Reader]', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        color: '#3a86ef',
      })
      .setOrigin(0.5);

    this.fatimaNPC = this.add.sprite(width - 200, 220, 'npc-fatima').setScale(1.5);
    this.add
      .text(width - 200, 190, 'Fatima [Keyboard]', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        color: '#ff007f',
      })
      .setOrigin(0.5);

    // Add Player Avatar
    this.player = this.add.sprite(width / 2, height / 2 + 50, 'player-avatar').setScale(1.5);

    // Interaction Hint Text
    this.activePromptText = this.add
      .text(width / 2, height - 60, 'Use ARROW KEYS to move. Approach Rahul or Fatima to talk.', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '9px',
        color: '#ffb703',
      })
      .setOrigin(0.5);

    // Controls
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.input.keyboard.on('keydown-E', () => this.checkInteractions());
      this.input.keyboard.on('keydown-SPACE', () => this.checkInteractions());
    }
  }

  update() {
    const speed = 3;

    if (this.cursors?.left?.isDown) {
      this.player.x = Math.max(70, this.player.x - speed);
    } else if (this.cursors?.right?.isDown) {
      this.player.x = Math.min(this.scale.width - 70, this.player.x + speed);
    }

    if (this.cursors?.up?.isDown) {
      this.player.y = Math.max(70, this.player.y - speed);
    } else if (this.cursors?.down?.isDown) {
      this.player.y = Math.min(this.scale.height - 70, this.player.y - speed ? this.player.y + speed : this.player.y);
    }

    // Proximity checks
    const distRahul = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.rahulNPC.x,
      this.rahulNPC.y
    );

    const distFatima = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.fatimaNPC.x,
      this.fatimaNPC.y
    );

    if (distRahul < 60) {
      this.activePromptText.setText('Press SPACE or E to talk to Rahul');
    } else if (distFatima < 60) {
      this.activePromptText.setText('Press SPACE or E to talk to Fatima');
    } else {
      this.activePromptText.setText('Use ARROW KEYS to move around the Dev Room');
    }
  }

  private checkInteractions() {
    const distRahul = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.rahulNPC.x,
      this.rahulNPC.y
    );

    const distFatima = Phaser.Math.Distance.Between(
      this.player.x,
      this.player.y,
      this.fatimaNPC.x,
      this.fatimaNPC.y
    );

    if (distRahul < 60) {
      gameStateManager.setCurrentCharacter('rahul');
      dialogueManager.startDialogue('rahul');
    } else if (distFatima < 60) {
      gameStateManager.setCurrentCharacter('fatima');
      dialogueManager.startDialogue('fatima');
    }
  }
}
