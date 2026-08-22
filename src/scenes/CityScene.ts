import Phaser from 'phaser';
import gsap from 'gsap';
import { dialogueManager } from '../gameplay/DialogueManager';
import { gameStateManager } from '../core/GameStateManager';
import { eventBus, GameEvents } from '../core/EventBus';

interface VehicleLoop {
  sprite: Phaser.GameObjects.Sprite;
  speed: number;
  startX: number;
  endX: number;
  y: number;
}

interface PedestrianWanderer {
  sprite: Phaser.GameObjects.Sprite;
  tween: Phaser.Tweens.Tween;
}

/**
 * CityScene — Dense, populated urban city viewed from top-down / bird's-eye RPG view.
 * 
 * Features:
 * - Connected Street Grid: North Commercial Boulevard, South 4-Lane Highway, Cross Avenues
 * - Urban Building Blocks: Hospital, Metro Transit Terminal, Tech Office, Cafe, Pharmacy, Apartments, Library, Mart
 * - Multi-lane traffic loops (Buses, Taxis, Cars, Delivery Vans)
 * - Pedestrian sidewalks with tactile accessibility paving, zebra crosswalks & traffic lights
 * - Central Plaza with fountain, planters, benches & cafe seating
 * - Naturally placed key narrative NPCs (Rahul, Fatima, Grandma Mira) + wandering citizens
 */
import { ThreeCityWorld } from '../three/ThreeCityWorld';

export class CityScene extends Phaser.Scene {
  // Player
  private player!: Phaser.GameObjects.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: { up: Phaser.Input.Keyboard.Key; down: Phaser.Input.Keyboard.Key; left: Phaser.Input.Keyboard.Key; right: Phaser.Input.Keyboard.Key };

  // 3D Roblox World Instance
  private threeWorld: ThreeCityWorld | null = null;

  // Key Characters
  private rahulNPC!: Phaser.GameObjects.Sprite;
  private fatimaNPC!: Phaser.GameObjects.Sprite;
  private grandmaNPC!: Phaser.GameObjects.Sprite;
  private kofiNPC!: Phaser.GameObjects.Sprite;
  private elenaNPC!: Phaser.GameObjects.Sprite;
  private yukiNPC!: Phaser.GameObjects.Sprite;

  // Traffic & Pedestrians
  private vehicles: VehicleLoop[] = [];
  private pedestrians: PedestrianWanderer[] = [];

  // Interaction
  private speechBubbles: Map<string, Phaser.GameObjects.Container> = new Map();
  private readonly INTERACT_RADIUS = 68;
  private nearbyCharacterId: string | null = null;
  private controlsLocked = false;

  // Depth Layers
  private readonly DEPTH_BG        = 0;
  private readonly DEPTH_GROUND    = 1;
  private readonly DEPTH_ROADS     = 2;
  private readonly DEPTH_PROPS     = 3;
  private readonly DEPTH_VEHICLES  = 4;
  private readonly DEPTH_NPCS      = 5;
  private readonly DEPTH_PLAYER    = 6;
  private readonly DEPTH_HUD       = 10;

  constructor() {
    super('CityScene');
  }

  create() {
    const { width, height } = this.scale;
    gameStateManager.setCurrentScene('CityScene');

    this.vehicles = [];
    this.pedestrians = [];
    this.controlsLocked = true;

    this.buildCityInfrastructure(width, height);
    this.buildBuildingBlocks(width);
    this.buildUrbanProps(width);
    this.spawnTraffic(width);
    this.spawnPedestrians(width);
    this.placeKeyCharacters();
    this.buildMinimap(height);
    this.setupInput();

    // ── Launch 3D Roblox World ─────────────────────────────────────────────
    this.init3DRobloxWorld();

    // Welcome Overlay Banner (Image 1 top-center style)
    const root = document.getElementById('dom-overlay') ?? document.body;
    const welcome = document.createElement('div');
    welcome.id = 'welcome-city-overlay';
    welcome.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(10, 12, 22, 0.9);
      backdrop-filter: blur(8px);
      z-index: 120;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-family: var(--font-pixel);
      color: #ffffff;
      pointer-events: auto;
    `;
    welcome.innerHTML = `
      <div style="text-align: center; display:flex; flex-direction:column; gap:16px; max-width:600px; padding:20px;">
        <h1 style="font-size: clamp(18px, 3.5vw, 30px); letter-spacing: 2px; color: #fbbf24; text-shadow: 0 0 15px rgba(251, 191, 36, 0.4); margin:0;">
          WELCOME TO ACCESS CITY
        </h1>
        <p style="font-family: var(--font-body); font-size: 14px; color: #cbd5e1; font-weight: 500; line-height:1.5; margin:0;">
          Eliminate accessibility barriers to design a digital product landscape for all citizens.
        </p>
      </div>
    `;
    root.appendChild(welcome);

    // Fade out welcome overlay and unlock controls after 2.5s
    this.time.delayedCall(2500, () => {
      gsap.to(welcome, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          welcome.remove();
          this.controlsLocked = false;

          // Play standard introduction dialogue
          if (!gameStateManager.isChallengeCompleted('intro-shown')) {
            eventBus.emit(GameEvents.DIALOGUE_NODE, {
              id: 'ava-city-intro',
              speaker: 'Ava',
              text: "Welcome to 3D Access City! Use WASD to walk, Spacebar to jump, and drag the mouse to look around in 3D. Approach people to help them!",
              nextId: null,
            });
          }
        }
      });
    });
  }

  private init3DRobloxWorld() {
    const root = document.getElementById('game-root');
    if (!root) return;

    // Check if 3D canvas already exists
    if (!document.getElementById('three-canvas')) {
      try {
        this.threeWorld = new ThreeCityWorld('game-root');
      } catch (err) {
        console.warn('Three.js 3D initialization fallback to 2D:', err);
      }
    }
  }

  shutdown() {
    this.threeWorld?.destroy();
    this.threeWorld = null;
  }

  // ─── 1. City Ground & Road Network ───────────────────────────────────────

  private buildCityInfrastructure(width: number, height: number) {
    // 1. Distant skyline background
    this.add.image(width / 2, 70, 'city-skyline-bg')
      .setDisplaySize(width + 100, 140)
      .setDepth(this.DEPTH_BG);

    // 2. Base Ground: Solid Concrete Sidewalk / Urban Pavement (No empty grass!)
    for (let y = 0; y < height; y += 32) {
      for (let x = 0; x < width; x += 32) {
        this.add.image(x + 16, y + 16, 'tile-sidewalk')
          .setDepth(this.DEPTH_GROUND);
      }
    }

    // 3. North Commercial Boulevard (2 Lanes, Y: 180 to 220)
    const northRoadY = 200;
    for (let x = 0; x < width; x += 32) {
      this.add.image(x + 16, northRoadY - 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(x + 16, northRoadY + 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      // Dashed center line
      this.add.image(x + 16, northRoadY, 'tile-road-dash').setDepth(this.DEPTH_ROADS);
    }

    // 4. South 4-Lane Expressway / Major Highway (Y: 530 to 630)
    const hwyY = 570;
    for (let x = 0; x < width; x += 32) {
      // 4 Asphalt lanes
      this.add.image(x + 16, hwyY - 48, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(x + 16, hwyY - 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(x + 16, hwyY + 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(x + 16, hwyY + 48, 'tile-road').setDepth(this.DEPTH_ROADS);

      // Lane dividers & Double yellow central divider
      this.add.image(x + 16, hwyY - 32, 'tile-road-dash').setDepth(this.DEPTH_ROADS);
      this.add.image(x + 16, hwyY, 'tile-road-double-yellow').setDepth(this.DEPTH_ROADS);
      this.add.image(x + 16, hwyY + 32, 'tile-road-dash').setDepth(this.DEPTH_ROADS);

      // Highway barriers along top and bottom edges
      if (x % 32 === 0) {
        this.add.image(x + 16, hwyY - 66, 'tile-barrier').setDepth(this.DEPTH_PROPS);
        this.add.image(x + 16, hwyY + 66, 'tile-barrier').setDepth(this.DEPTH_PROPS);
      }
    }

    // 5. Vertical Cross Avenue 1 (Connecting North & Central at X: 420)
    const ave1X = 420;
    for (let y = 140; y < 510; y += 32) {
      this.add.image(ave1X - 16, y + 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(ave1X + 16, y + 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(ave1X, y + 16, 'tile-road-dash').setAngle(90).setDepth(this.DEPTH_ROADS);
    }

    // 6. Vertical Cross Avenue 2 (X: 860)
    const ave2X = 860;
    for (let y = 140; y < 510; y += 32) {
      this.add.image(ave2X - 16, y + 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(ave2X + 16, y + 16, 'tile-road').setDepth(this.DEPTH_ROADS);
      this.add.image(ave2X, y + 16, 'tile-road-dash').setAngle(90).setDepth(this.DEPTH_ROADS);
    }

    // 7. Crosswalks / Zebra Stripes at Intersections
    // North intersections
    this.add.image(ave1X - 60, northRoadY, 'tile-crosswalk').setAngle(90).setDepth(this.DEPTH_ROADS);
    this.add.image(ave1X + 60, northRoadY, 'tile-crosswalk').setAngle(90).setDepth(this.DEPTH_ROADS);
    this.add.image(ave2X - 60, northRoadY, 'tile-crosswalk').setAngle(90).setDepth(this.DEPTH_ROADS);
    this.add.image(ave2X + 60, northRoadY, 'tile-crosswalk').setAngle(90).setDepth(this.DEPTH_ROADS);

    // Highway pedestrian crossing bridge / crosswalk (with signal)
    this.add.image(640, hwyY, 'tile-crosswalk').setAngle(90).setScale(1.2).setDepth(this.DEPTH_ROADS);

    // 8. Tactile Yellow Accessibility Paving (Along sidewalk curbs & ramps)
    const tactileCoords = [
      [ave1X - 60, northRoadY - 34], [ave1X - 60, northRoadY + 34],
      [ave1X + 60, northRoadY - 34], [ave1X + 60, northRoadY + 34],
      [ave2X - 60, northRoadY - 34], [ave2X - 60, northRoadY + 34],
      [ave2X + 60, northRoadY - 34], [ave2X + 60, northRoadY + 34],
      [640, hwyY - 72], [640, hwyY + 72],
      [140, northRoadY - 34], [1080, northRoadY + 34], // Hospital & Bus Hub ramps
    ];
    tactileCoords.forEach(([tx, ty]) => {
      this.add.image(tx, ty, 'tile-tactile').setDepth(this.DEPTH_GROUND + 1);
    });

    // 9. Central Plaza Cobblestone (Pedestrian Zone X: 470 to 810, Y: 260 to 480)
    for (let py = 260; py < 480; py += 32) {
      for (let px = 460; px < 820; px += 32) {
        this.add.image(px + 16, py + 16, 'tile-pavement').setDepth(this.DEPTH_GROUND + 1);
      }
    }
  }

  // ─── 2. Dense Urban Building Blocks ──────────────────────────────────────

  private buildBuildingBlocks(width: number) {
    // ── North Commercial & Civic Row (Y: 70 to 140) ─────────────────────────

    // 1. CityCare Hospital & Clinic (North-West, X: 110)
    this.add.image(110, 115, 'bld-hospital')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(110, 20, '✚ CITYCARE HOSPITAL', '#ef4444');

    // 2. Pharmacy & Medical Supply (North, X: 245)
    this.add.image(245, 115, 'bld-pharmacy')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(245, 30, 'PHARMACY & HEALTH', '#10b981');

    // 3. City Library & Civic Center (North, X: 570)
    this.add.image(570, 115, 'bld-library')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(570, 25, 'CITY LIBRARY', '#64748b');

    // 4. Tech Office & Access Design Lab (North, X: 710)
    this.add.image(710, 115, 'bld-office')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(710, 25, 'TECH DESIGN LAB', '#6366f1');

    // 5. Corner Cafe & Bakery (North-East, X: 975)
    this.add.image(975, 115, 'bld-cafe')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(975, 35, 'URBAN BAKERY & CAFE', '#d97706');

    // 6. City Supermarket (North-East, X: 1120)
    this.add.image(1120, 115, 'bld-supermarket')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(1120, 40, 'SUPERMARKET', '#dc2626');

    // 7. Residential Apartment Complex (North-Far East, X: 1235)
    this.add.image(1235, 115, 'bld-apartment')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);

    // ── Central District Buildings (Y: 260 to 460) ─────────────────────────

    // 8. West Residential Brownstone Townhomes (X: 100, Y: 360)
    this.add.image(100, 360, 'bld-townhouse')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(100, 275, 'APARTMENTS', '#92400e');

    // 9. West Commercial Offices (X: 220, Y: 360)
    this.add.image(220, 360, 'bld-office')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);

    // 10. East Metro Central Transit Terminal (X: 1120, Y: 360)
    this.add.image(1120, 360, 'bld-transit')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);
    this.addBuildingLabel(1120, 260, 'METRO CENTRAL TRANSIT', '#0284c7');

    // 11. Bus Stop Boarding Shelter (in front of terminal X: 1010, Y: 430)
    this.add.image(1010, 430, 'prop-bus-stop')
      .setOrigin(0.5, 1)
      .setDepth(this.DEPTH_PROPS);

    // ── South District Buildings (Below Highway Y: 670) ────────────────────
    const southBuildings = [
      { x: 120, key: 'bld-apartment', label: 'METRO LIVING' },
      { x: 260, key: 'bld-townhouse', label: 'RESIDENCES' },
      { x: 420, key: 'bld-office', label: 'LOGISTICS' },
      { x: 860, key: 'bld-supermarket', label: 'MART' },
      { x: 1020, key: 'bld-apartment', label: 'URBAN FLATS' },
      { x: 1180, key: 'bld-office', label: 'WORKSPACES' },
    ];
    southBuildings.forEach(b => {
      if (b.x < width) {
        this.add.image(b.x, 710, b.key)
          .setOrigin(0.5, 1)
          .setDepth(this.DEPTH_PROPS);
      }
    });
  }

  private addBuildingLabel(x: number, y: number, text: string, color: string) {
    this.add.text(x, y, text, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '6.5px',
      color: '#ffffff',
      backgroundColor: color,
      padding: { x: 5, y: 3 },
    }).setOrigin(0.5, 1).setDepth(this.DEPTH_HUD);
  }

  // ─── 3. Urban Props & Street Furniture ───────────────────────────────────

  private buildUrbanProps(width: number) {
    // 1. Central Plaza Fountain (X: 640, Y: 370)
    this.add.image(640, 370, 'prop-fountain')
      .setDepth(this.DEPTH_PROPS);

    // 2. Cafe Bistro Seating (Outdoor umbrellas & tables near cafe at X: 910 to 950, Y: 235)
    this.add.image(910, 240, 'prop-cafe-table').setDepth(this.DEPTH_PROPS);
    this.add.image(945, 240, 'prop-cafe-table').setDepth(this.DEPTH_PROPS);

    // 3. Traffic Lights at Major Intersections
    const trafficLights = [
      [340, 160], [500, 160],
      [780, 160], [940, 160],
      [580, 500], [700, 500],
    ];
    trafficLights.forEach(([tx, ty]) => {
      this.add.image(tx, ty, 'prop-traffic-light').setDepth(this.DEPTH_PROPS);
    });

    // 4. Modern Streetlights along Sidewalks
    for (let lx = 60; lx < width; lx += 140) {
      this.add.image(lx, 165, 'prop-streetlight').setDepth(this.DEPTH_PROPS);
      this.add.image(lx, 240, 'prop-streetlight').setDepth(this.DEPTH_PROPS);
      this.add.image(lx, 495, 'prop-streetlight').setDepth(this.DEPTH_PROPS);
    }

    // 5. Urban Trees in Planters along Sidewalks & Plaza
    const trees = [
      [490, 280], [790, 280], [490, 450], [790, 450], // Plaza corners
      [50, 235], [330, 235], [520, 235], [760, 235], [1180, 235], // Sidewalks
      [60, 480], [330, 480], [1180, 480],
    ];
    trees.forEach(([tx, ty]) => {
      this.add.image(tx, ty, 'prop-tree').setDepth(this.DEPTH_PROPS);
    });

    // 6. Park & Plaza Benches
    const benches = [
      [580, 320], [700, 320], [580, 420], [700, 420],
      [270, 240], [1050, 240], [270, 480],
    ];
    benches.forEach(([bx, by]) => {
      this.add.image(bx, by, 'prop-bench').setDepth(this.DEPTH_PROPS);
    });

    // 7. Fire Hydrants
    this.add.image(190, 240, 'prop-hydrant').setDepth(this.DEPTH_PROPS);
    this.add.image(890, 240, 'prop-hydrant').setDepth(this.DEPTH_PROPS);
  }

  // ─── 4. Moving Traffic Simulation (Highway & Boulevard) ──────────────────

  private spawnTraffic(width: number) {
    const hwyY = 570;
    const northRoadY = 200;

    // 1. Eastbound Highway Traffic (Lane 1, Y: hwyY - 32)
    const bus = this.add.sprite(100, hwyY - 32, 'veh-bus').setDepth(this.DEPTH_VEHICLES);
    this.vehicles.push({ sprite: bus, speed: 2.8, startX: -80, endX: width + 80, y: hwyY - 32 });

    const sedan1 = this.add.sprite(600, hwyY - 32, 'veh-sedan').setDepth(this.DEPTH_VEHICLES);
    this.vehicles.push({ sprite: sedan1, speed: 3.5, startX: -80, endX: width + 80, y: hwyY - 32 });

    const taxi1 = this.add.sprite(1000, hwyY - 32, 'veh-taxi').setDepth(this.DEPTH_VEHICLES);
    this.vehicles.push({ sprite: taxi1, speed: 3.2, startX: -80, endX: width + 80, y: hwyY - 32 });

    // 2. Westbound Highway Traffic (Lane 2, Y: hwyY + 32)
    const van1 = this.add.sprite(width - 200, hwyY + 32, 'veh-van').setFlipX(true).setDepth(this.DEPTH_VEHICLES);
    this.vehicles.push({ sprite: van1, speed: -3.0, startX: width + 80, endX: -80, y: hwyY + 32 });

    const redCar1 = this.add.sprite(width - 700, hwyY + 32, 'veh-red-car').setFlipX(true).setDepth(this.DEPTH_VEHICLES);
    this.vehicles.push({ sprite: redCar1, speed: -3.8, startX: width + 80, endX: -80, y: hwyY + 32 });

    // 3. Boulevard Traffic (North Street)
    const taxi2 = this.add.sprite(200, northRoadY - 14, 'veh-taxi').setDepth(this.DEPTH_VEHICLES);
    this.vehicles.push({ sprite: taxi2, speed: 2.2, startX: -60, endX: width + 60, y: northRoadY - 14 });

    const redCar2 = this.add.sprite(width - 300, northRoadY + 14, 'veh-red-car').setFlipX(true).setDepth(this.DEPTH_VEHICLES);
    this.vehicles.push({ sprite: redCar2, speed: -2.4, startX: width + 60, endX: -60, y: northRoadY + 14 });

    // 4. Parked Vehicles in Side Bays
    this.add.sprite(360, northRoadY + 36, 'veh-sedan').setAngle(90).setDepth(this.DEPTH_PROPS);
    this.add.sprite(390, northRoadY + 36, 'veh-van').setAngle(90).setDepth(this.DEPTH_PROPS);
  }

  // ─── 5. Pedestrian Life & Citizens ───────────────────────────────────────

  private spawnPedestrians(width: number) {
    const wanderers = [
      { x: 500, y: 310, targetX: 620, tex: 'char-ped1', dur: 4000 },
      { x: 740, y: 440, targetX: 610, tex: 'char-ped2', dur: 3800 },
      { x: 220, y: 245, targetX: 300, tex: 'char-ped1', dur: 3200 },
      { x: 920, y: 480, targetX: 1040, tex: 'char-ped2', dur: 4200 },
      { x: 80, y: 480, targetX: 180, tex: 'char-ped1', dur: 3600 },
    ];

    wanderers.forEach(w => {
      if (w.x < width) {
        const s = this.add.sprite(w.x, w.y, w.tex).setScale(2).setDepth(this.DEPTH_NPCS);
        const t = this.tweens.add({
          targets: s,
          x: w.targetX,
          duration: w.dur,
          yoyo: true,
          repeat: -1,
          ease: 'Linear',
          onYoyo: () => s.setFlipX(!s.flipX),
          onRepeat: () => s.setFlipX(!s.flipX),
        });
        this.pedestrians.push({ sprite: s, tween: t });
      }
    });
  }

  // ─── 6. Key Narrative Characters ─────────────────────────────────────────

  private placeKeyCharacters() {
    // 1. Rahul (Hospital / Tactile Crossing zone at X: 170, Y: 245)
    this.rahulNPC = this.add.sprite(170, 245, 'char-rahul')
      .setScale(2.5)
      .setDepth(this.DEPTH_NPCS);
    this.addNPCLabel(170, 205, 'Rahul', '#38bdf8');
    this.createSpeechBubble(170, 185, 'rahul', 'Tap here!');

    // Guide Dog beside Rahul
    this.add.sprite(192, 252, 'char-guide-dog')
      .setScale(2)
      .setDepth(this.DEPTH_NPCS);

    // 2. Fatima (Metro Central Transit Terminal at X: 1010, Y: 395)
    this.fatimaNPC = this.add.sprite(1010, 395, 'char-fatima')
      .setScale(2.5)
      .setDepth(this.DEPTH_NPCS);
    this.addNPCLabel(1010, 355, 'Fatima', '#c084fc');
    this.createSpeechBubble(1010, 335, 'fatima', 'Tap here!');

    // 3. Grandma Mira (Plaza Cafe Terrace at X: 740, Y: 325)
    this.grandmaNPC = this.add.sprite(740, 325, 'char-grandma')
      .setScale(2.5)
      .setDepth(this.DEPTH_NPCS);
    this.addNPCLabel(740, 285, 'Grandma', '#fbbf24');
    this.createSpeechBubble(740, 265, 'grandma', 'Tap here!');

    // 4. Kofi (Motor - Sits near Tech Office at X: 850, Y: 420)
    this.kofiNPC = this.add.sprite(850, 420, 'char-ped1')
      .setScale(2.5)
      .setDepth(this.DEPTH_NPCS)
      .setTint(0x93c5fd);
    this.addNPCLabel(850, 380, 'Kofi', '#60a5fa');
    this.createSpeechBubble(850, 360, 'kofi', 'Tap here!');

    // 5. Elena (Cognitive - Library plaza at X: 480, Y: 240)
    this.elenaNPC = this.add.sprite(480, 240, 'char-ped2')
      .setScale(2.5)
      .setDepth(this.DEPTH_NPCS)
      .setTint(0xa7f3d0);
    this.addNPCLabel(480, 200, 'Elena', '#34d399');
    this.createSpeechBubble(480, 180, 'elena', 'Tap here!');

    // 6. Yuki (Language - Cafe plaza east at X: 1100, Y: 240)
    this.yukiNPC = this.add.sprite(1100, 240, 'char-ped1')
      .setScale(2.5)
      .setDepth(this.DEPTH_NPCS)
      .setTint(0xfacc15);
    this.addNPCLabel(1100, 200, 'Yuki', '#facc15');
    this.createSpeechBubble(1100, 180, 'yuki', 'Tap here!');

    // 7. Player (Ava — starts in Central Plaza at X: 640, Y: 440)
    this.player = this.add.sprite(640, 440, 'char-ava')
      .setScale(2.5)
      .setDepth(this.DEPTH_PLAYER);
  }

  private addNPCLabel(x: number, y: number, name: string, color: string) {
    this.add.text(x, y, name, {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '7.5px',
      color,
      stroke: '#0f172a',
      strokeThickness: 3,
    }).setOrigin(0.5).setDepth(this.DEPTH_HUD);
  }

  private createSpeechBubble(x: number, y: number, charId: string, text: string) {
    const container = this.add.container(x, y);
    container.setDepth(this.DEPTH_HUD);

    const bg = this.add.graphics();
    bg.fillStyle(0xffffff, 1);
    bg.fillRoundedRect(-32, -12, 64, 24, 4);
    bg.fillTriangle(0, 12, -4, 18, 4, 12);
    bg.lineStyle(1.5, 0x1e293b, 1);
    bg.strokeRoundedRect(-32, -12, 64, 24, 4);

    const label = this.add.text(0, 0, text, {
      fontFamily: '"VT323", monospace',
      fontSize: '14px',
      color: '#0f172a',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    container.add([bg, label]);

    // Floating bob
    this.tweens.add({
      targets: container,
      y: y - 5,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    container.setSize(64, 24);
    container.setInteractive({ useHandCursor: true });
    container.on('pointerdown', () => this.interactWith(charId));

    this.speechBubbles.set(charId, container);
  }

  // ─── 7. Mini-Map Widget (Image 1 top-left "MAP") ─────────────────────────

  private buildMinimap(screenHeight: number) {
    const mapSize = 72;
    const mapX = 16;
    const mapY = screenHeight - mapSize - 56;

    const mapBox = this.add.graphics().setDepth(this.DEPTH_HUD).setScrollFactor(0);
    mapBox.fillStyle(0x0f172a, 0.9);
    mapBox.fillRoundedRect(mapX, mapY, mapSize, mapSize, 4);
    mapBox.lineStyle(1.5, 0x3b82f6, 1);
    mapBox.strokeRoundedRect(mapX, mapY, mapSize, mapSize, 4);

    // Grid streets
    mapBox.lineStyle(1, 0x1e293b, 0.8);
    mapBox.lineBetween(mapX, mapY + 22, mapX + mapSize, mapY + 22);
    mapBox.lineBetween(mapX, mapY + 54, mapX + mapSize, mapY + 54);
    mapBox.lineBetween(mapX + 24, mapY, mapX + 24, mapY + mapSize);
    mapBox.lineBetween(mapX + 48, mapY, mapX + 48, mapY + mapSize);

    // "MAP" header
    this.add.text(mapX + mapSize / 2, mapY + 6, 'MAP', {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '6px',
      color: '#38bdf8',
    }).setOrigin(0.5).setDepth(this.DEPTH_HUD).setScrollFactor(0);

    // Key District Dots
    mapBox.fillStyle(0xef4444, 1); // Hospital
    mapBox.fillRect(mapX + 8, mapY + 12, 8, 6);
    mapBox.fillStyle(0x10b981, 1); // Pharmacy
    mapBox.fillRect(mapX + 20, mapY + 12, 6, 6);
    mapBox.fillStyle(0x3b82f6, 1); // Metro Terminal
    mapBox.fillRect(mapX + 56, mapY + 30, 8, 6);
    mapBox.fillStyle(0xf59e0b, 1); // Cafe Plaza
    mapBox.fillCircle(mapX + 36, mapY + 36, 4);

    // Blinking Player dot
    const playerDot = this.add.circle(mapX + 36, mapY + 44, 2.5, 0xfbbf24)
      .setDepth(this.DEPTH_HUD + 1)
      .setScrollFactor(0);

    this.tweens.add({
      targets: playerDot,
      alpha: 0.2,
      duration: 450,
      yoyo: true,
      repeat: -1,
    });
  }

  // ─── 8. Input & Update Loop ──────────────────────────────────────────────

  private setupInput() {
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasd = {
        up:    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        down:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        left:  this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      };
      this.input.keyboard.on('keydown-E',     () => this.tryInteract());
      this.input.keyboard.on('keydown-ENTER', () => this.tryInteract());
      this.input.keyboard.on('keydown-SPACE', () => this.tryInteract());
    }
  }

  update() {
    if (this.controlsLocked) return;

    // 1. Move Player
    const speed = 3.2;
    const { width, height } = this.scale;
    const minY = 135;
    const maxY = height - 50;

    let moved = false;

    if (this.cursors?.left?.isDown  || this.wasd?.left?.isDown) {
      this.player.x = Math.max(20, this.player.x - speed);
      this.player.setFlipX(true);
      moved = true;
    } else if (this.cursors?.right?.isDown || this.wasd?.right?.isDown) {
      this.player.x = Math.min(width - 20, this.player.x + speed);
      this.player.setFlipX(false);
      moved = true;
    }

    if (this.cursors?.up?.isDown   || this.wasd?.up?.isDown) {
      this.player.y = Math.max(minY, this.player.y - speed);
      moved = true;
    } else if (this.cursors?.down?.isDown  || this.wasd?.down?.isDown) {
      this.player.y = Math.min(maxY, this.player.y + speed);
      moved = true;
    }

    if (moved) {
      this.checkNearbyNPCs();
    }

    // 2. Animate Traffic Loops
    for (const v of this.vehicles) {
      v.sprite.x += v.speed;
      if (v.speed > 0 && v.sprite.x > v.endX) {
        v.sprite.x = v.startX;
      } else if (v.speed < 0 && v.sprite.x < v.endX) {
        v.sprite.x = v.startX;
      }
    }
  }

  private checkNearbyNPCs() {
    const npcs = [
      { id: 'rahul',   sprite: this.rahulNPC },
      { id: 'fatima',  sprite: this.fatimaNPC },
      { id: 'grandma', sprite: this.grandmaNPC },
      { id: 'kofi',    sprite: this.kofiNPC },
      { id: 'elena',   sprite: this.elenaNPC },
      { id: 'yuki',    sprite: this.yukiNPC },
    ];

    let found: string | null = null;
    for (const npc of npcs) {
      if (!npc.sprite) continue;
      const dist = Phaser.Math.Distance.Between(
        this.player.x, this.player.y,
        npc.sprite.x, npc.sprite.y
      );
      if (dist < this.INTERACT_RADIUS) {
        found = npc.id;
        break;
      }
    }

    this.nearbyCharacterId = found;
  }

  private tryInteract() {
    if (this.nearbyCharacterId) {
      this.interactWith(this.nearbyCharacterId);
    }
  }

  private interactWith(charId: string) {
    (window as any).audioService?.playSelect?.();
    gameStateManager.setCurrentCharacter(charId);
    dialogueManager.startDialogue(charId);
  }
}
