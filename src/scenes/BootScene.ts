import Phaser from 'phaser';

/**
 * BootScene — Generates high-density urban pixel-art textures for Access City:
 * 
 * - Ground & Pavement: Dark asphalt, 4-lane highway, concrete sidewalks, tactile paving, crosswalks
 * - Dense Buildings:
 *   - CityCare Hospital (large multi-story medical center + ambulance bay)
 *   - Metro Transit Station & Terminal (glass canopy, route board, bus shelter)
 *   - Apartment Complex (multi-story brick with balconies & AC units)
 *   - Tech Office / Design Lab (modern glass & steel corporate block)
 *   - Corner Cafe & Bakery (striped awning, brick facade, bistro seating)
 *   - Pharmacy & Medical Supply (green cross, glass display)
 *   - Supermarket & Convenience Store (wide commercial front)
 *   - City Library & Civic Center (classic stone pillars)
 *   - Urban Townhouses / Brownstones
 * - Vehicles:
 *   - City Bus (green accessible transit bus)
 *   - Yellow Taxi
 *   - Blue Sedan & Red Hatchback
 *   - White Delivery Van
 * - Street Props:
 *   - Traffic lights (pole with lit signals)
 *   - Tactile paving blocks (yellow accessibility guide strips)
 *   - Streetlights, fire hydrants, bike racks, trash cans, mailboxes
 *   - Cafe outdoor tables with umbrellas, park benches, planters, trees, fountain
 * - Characters & Sprites:
 *   - Ava, Rahul (with cane & guide dog), Fatima (wheelchair), Grandma Mira
 *   - Commuters & pedestrians
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.createUrbanGroundTextures();
    this.createUrbanBuildingTextures();
    this.createVehicleTextures();
    this.createUrbanPropsTextures();
    this.createCharacterSprites();
    this.createCharacterPortraits();
  }

  create() {
    this.scene.start('TitleScene');
  }

  // ─── 1. Urban Ground & Road Textures ──────────────────────────────────────

  private createUrbanGroundTextures() {
    // 1. Urban Sidewalk Tile (32x32) — clean concrete paver with joints
    const swGfx = this.make.graphics({ x: 0, y: 0 }, false);
    swGfx.fillStyle(0xa3a3a3, 1);
    swGfx.fillRect(0, 0, 32, 32);
    swGfx.fillStyle(0xb5b5b5, 1);
    swGfx.fillRect(1, 1, 30, 30);
    swGfx.lineStyle(1, 0x8a8a8a, 0.7);
    swGfx.strokeRect(1, 1, 30, 30);
    // Subtle surface texture
    swGfx.fillStyle(0x949494, 0.4);
    swGfx.fillRect(4, 4, 3, 3);
    swGfx.fillRect(20, 18, 4, 3);
    swGfx.generateTexture('tile-sidewalk', 32, 32);
    swGfx.destroy();

    // 2. Tactile Paving Tile (32x32) — Bright yellow raised accessibility dots/bars
    const tacGfx = this.make.graphics({ x: 0, y: 0 }, false);
    tacGfx.fillStyle(0xeab308, 1); // yellow warning
    tacGfx.fillRect(0, 0, 32, 32);
    tacGfx.fillStyle(0xca8a04, 1);
    for (let x = 4; x < 32; x += 8) {
      for (let y = 4; y < 32; y += 8) {
        tacGfx.fillCircle(x, y, 2.5);
      }
    }
    tacGfx.lineStyle(1, 0xa16207, 0.8);
    tacGfx.strokeRect(0, 0, 32, 32);
    tacGfx.generateTexture('tile-tactile', 32, 32);
    tacGfx.destroy();

    // 3. Asphalt Road Tile (32x32) — dark urban asphalt
    const roadGfx = this.make.graphics({ x: 0, y: 0 }, false);
    roadGfx.fillStyle(0x1f242d, 1);
    roadGfx.fillRect(0, 0, 32, 32);
    roadGfx.fillStyle(0x282e3a, 0.5);
    roadGfx.fillRect(3, 6, 5, 4);
    roadGfx.fillRect(18, 20, 6, 4);
    roadGfx.generateTexture('tile-road', 32, 32);
    roadGfx.destroy();

    // 4. White Dashed Line Road Tile (32x32)
    const dashGfx = this.make.graphics({ x: 0, y: 0 }, false);
    dashGfx.fillStyle(0x1f242d, 1);
    dashGfx.fillRect(0, 0, 32, 32);
    dashGfx.fillStyle(0xf8fafc, 0.9);
    dashGfx.fillRect(14, 4, 4, 12);
    dashGfx.generateTexture('tile-road-dash', 32, 32);
    dashGfx.destroy();

    // 5. Yellow Double Center Line (32x32) — Highway divider
    const dblGfx = this.make.graphics({ x: 0, y: 0 }, false);
    dblGfx.fillStyle(0x1f242d, 1);
    dblGfx.fillRect(0, 0, 32, 32);
    dblGfx.fillStyle(0xfacc15, 0.95);
    dblGfx.fillRect(12, 0, 3, 32);
    dblGfx.fillRect(17, 0, 3, 32);
    dblGfx.generateTexture('tile-road-double-yellow', 32, 32);
    dblGfx.destroy();

    // 6. Crosswalk / Zebra Stripes Tile (64x32)
    const crossGfx = this.make.graphics({ x: 0, y: 0 }, false);
    crossGfx.fillStyle(0x1f242d, 1);
    crossGfx.fillRect(0, 0, 64, 32);
    crossGfx.fillStyle(0xffffff, 0.95);
    for (let x = 4; x < 64; x += 12) {
      crossGfx.fillRect(x, 2, 7, 28);
    }
    crossGfx.generateTexture('tile-crosswalk', 64, 32);
    crossGfx.destroy();

    // 7. Plaza Cobblestone (32x32) — decorative pedestrian stone
    const plazaGfx = this.make.graphics({ x: 0, y: 0 }, false);
    plazaGfx.fillStyle(0x64748b, 1);
    plazaGfx.fillRect(0, 0, 32, 32);
    plazaGfx.fillStyle(0x78889e, 1);
    plazaGfx.fillRect(1, 1, 14, 14);
    plazaGfx.fillRect(17, 1, 14, 14);
    plazaGfx.fillRect(1, 17, 14, 14);
    plazaGfx.fillRect(17, 17, 14, 14);
    plazaGfx.lineStyle(1, 0x475569, 0.8);
    plazaGfx.strokeRect(0, 0, 32, 32);
    plazaGfx.generateTexture('tile-pavement', 32, 32);
    plazaGfx.destroy();

    // 8. Purposeful Planter / Garden Grass (32x32)
    const grassGfx = this.make.graphics({ x: 0, y: 0 }, false);
    grassGfx.fillStyle(0x15803d, 1);
    grassGfx.fillRect(0, 0, 32, 32);
    grassGfx.fillStyle(0x16a34a, 0.8);
    grassGfx.fillRect(4, 6, 6, 6);
    grassGfx.fillRect(18, 14, 6, 6);
    grassGfx.lineStyle(1, 0x14532d, 0.5);
    grassGfx.strokeRect(0, 0, 32, 32);
    grassGfx.generateTexture('tile-grass', 32, 32);
    grassGfx.destroy();

    // 9. Concrete Highway Divider Barrier (32x16)
    const barGfx = this.make.graphics({ x: 0, y: 0 }, false);
    barGfx.fillStyle(0x64748b, 1);
    barGfx.fillRect(0, 4, 32, 8);
    barGfx.fillStyle(0x94a3b8, 1);
    barGfx.fillRect(0, 2, 32, 3);
    barGfx.fillStyle(0xfacc15, 0.8); // reflector
    barGfx.fillRect(12, 5, 8, 4);
    barGfx.generateTexture('tile-barrier', 32, 16);
    barGfx.destroy();
  }

  // ─── 2. Dense Urban Buildings ─────────────────────────────────────────────

  private createUrbanBuildingTextures() {
    // 1. CityCare Hospital Complex (140x130)
    const hosp = this.make.graphics({ x: 0, y: 0 }, false);
    // Main tower
    hosp.fillStyle(0xf1f5f9, 1);
    hosp.fillRect(0, 20, 140, 110);
    hosp.fillStyle(0xe2e8f0, 1);
    hosp.fillRect(0, 20, 10, 110); // shadow edge
    // Modern blue glass roof overhang
    hosp.fillStyle(0x0284c7, 1);
    hosp.fillRect(0, 0, 140, 24);
    // Large Red Cross Sign on roof
    hosp.fillStyle(0xffffff, 1);
    hosp.fillRoundedRect(48, 4, 44, 16, 3);
    hosp.fillStyle(0xdc2626, 1);
    hosp.fillRect(66, 6, 8, 12);
    hosp.fillRect(60, 8, 20, 8);
    // Large Grid of Windows (tinted blue with warm lights inside)
    hosp.fillStyle(0x38bdf8, 0.7);
    for (let r = 32; r <= 84; r += 18) {
      for (let c = 14; c <= 116; c += 22) {
        hosp.fillRect(c, r, 16, 12);
        hosp.lineStyle(1, 0x0284c7, 0.6);
        hosp.strokeRect(c, r, 16, 12);
      }
    }
    // Main Glass Entrance & Sliding Doors (accessible wide entrance)
    hosp.fillStyle(0x0369a1, 1);
    hosp.fillRect(45, 102, 50, 28);
    hosp.fillStyle(0x7dd3fc, 0.8);
    hosp.fillRect(48, 106, 20, 24);
    hosp.fillRect(72, 106, 20, 24);
    // Emergency Entrance Sign
    hosp.fillStyle(0xef4444, 1);
    hosp.fillRect(98, 108, 36, 22);
    hosp.fillStyle(0xffffff, 1);
    hosp.fillRect(100, 110, 32, 3);
    hosp.generateTexture('bld-hospital', 140, 130);
    hosp.destroy();

    // 2. Metro Transit Terminal & Bus Station (140x110)
    const transit = this.make.graphics({ x: 0, y: 0 }, false);
    transit.fillStyle(0x1e293b, 1);
    transit.fillRect(0, 18, 140, 92);
    // Steel & Glass Arched Canopy
    transit.fillStyle(0x0ea5e9, 0.9);
    transit.fillRect(0, 0, 140, 22);
    transit.fillStyle(0x38bdf8, 1);
    transit.fillRect(10, 4, 120, 6);
    // Large Metro "M" & Wheelchair Accessibility Sign
    transit.fillStyle(0x3b82f6, 1);
    transit.fillCircle(24, 11, 8);
    transit.fillStyle(0xffffff, 1);
    transit.fillRect(20, 6, 8, 10);
    // Digital Departure Board display
    transit.fillStyle(0x0f172a, 1);
    transit.fillRect(14, 28, 112, 28);
    transit.fillStyle(0xfacc15, 0.9); // LED yellow text lines
    transit.fillRect(18, 33, 40, 3);
    transit.fillRect(64, 33, 20, 3);
    transit.fillRect(18, 39, 45, 3);
    transit.fillRect(68, 39, 16, 3);
    transit.fillRect(18, 45, 38, 3);
    transit.fillRect(62, 45, 22, 3);
    // Open glass platforms & ticket gates
    transit.fillStyle(0x475569, 1);
    for (let c = 12; c < 130; c += 28) {
      transit.fillRect(c, 62, 22, 48);
      transit.fillStyle(0x94a3b8, 0.5);
      transit.fillRect(c + 2, 66, 18, 30);
      transit.fillStyle(0x475569, 1);
    }
    transit.generateTexture('bld-transit', 140, 110);
    transit.destroy();

    // 3. Multi-Story Apartment Complex (110x120) — Brick & Balconies
    const apt = this.make.graphics({ x: 0, y: 0 }, false);
    apt.fillStyle(0x991b1b, 1); // warm brown-red brick
    apt.fillRect(0, 16, 110, 104);
    apt.fillStyle(0x7f1d1d, 1);
    apt.fillRect(0, 16, 8, 104);
    // Dark cornice roof
    apt.fillStyle(0x334155, 1);
    apt.fillRect(0, 0, 110, 20);
    // Windows with iron balconies
    apt.fillStyle(0xfef08a, 0.85); // glowing warm windows
    for (let r = 26; r <= 80; r += 26) {
      for (let c = 12; c <= 80; c += 34) {
        apt.fillRect(c, r, 20, 18);
        apt.lineStyle(1, 0x1e293b, 0.8);
        apt.strokeRect(c, r, 20, 18);
        // Iron balcony railing
        apt.fillStyle(0x0f172a, 1);
        apt.fillRect(c - 2, r + 12, 24, 6);
        apt.fillStyle(0xfef08a, 0.85);
      }
    }
    // Main entrance door
    apt.fillStyle(0x451a03, 1);
    apt.fillRect(42, 92, 26, 28);
    apt.fillStyle(0xf59e0b, 1); // brass handle
    apt.fillRect(45, 106, 3, 4);
    apt.generateTexture('bld-apartment', 110, 120);
    apt.destroy();

    // 4. Tech Office & Design Lab (120x115) — Modern Glass & Steel
    const tech = this.make.graphics({ x: 0, y: 0 }, false);
    tech.fillStyle(0x0f172a, 1);
    tech.fillRect(0, 16, 120, 99);
    // Top blue logo banner
    tech.fillStyle(0x6366f1, 1);
    tech.fillRect(0, 0, 120, 20);
    // Reflective curtain-wall glass facade
    tech.fillStyle(0x1e1b4b, 1);
    tech.fillRect(8, 24, 104, 66);
    tech.lineStyle(1, 0x818cf8, 0.7);
    for (let x = 8; x <= 112; x += 18) {
      tech.lineBetween(x, 24, x, 90);
    }
    for (let y = 24; y <= 90; y += 16) {
      tech.lineBetween(8, y, 112, y);
    }
    // Modern glass entrance lobby
    tech.fillStyle(0x4338ca, 0.8);
    tech.fillRect(36, 90, 48, 25);
    tech.generateTexture('bld-office', 120, 115);
    tech.destroy();

    // 5. Corner Cafe & Bakery (90x90) — Striped awning & warm outdoor facade
    const cafe = this.make.graphics({ x: 0, y: 0 }, false);
    cafe.fillStyle(0xb45309, 1); // warm terracotta brick
    cafe.fillRect(0, 16, 90, 74);
    // Green and Cream striped awning
    for (let i = 0; i < 90; i += 12) {
      cafe.fillStyle(i % 24 === 0 ? 0x059669 : 0xfef3c7, 1);
      cafe.fillRect(i, 4, 12, 16);
    }
    // Large display window showing bakery items
    cafe.fillStyle(0x7dd3fc, 0.6);
    cafe.fillRect(8, 26, 46, 36);
    cafe.lineStyle(2, 0x78350f, 1);
    cafe.strokeRect(8, 26, 46, 36);
    // Menu blackboard outside
    cafe.fillStyle(0x1e293b, 1);
    cafe.fillRect(60, 32, 22, 24);
    cafe.fillStyle(0xf8fafc, 0.7);
    cafe.fillRect(63, 36, 16, 2);
    cafe.fillRect(63, 41, 12, 2);
    cafe.fillRect(63, 46, 14, 2);
    // Cafe door
    cafe.fillStyle(0x78350f, 1);
    cafe.fillRect(58, 60, 24, 30);
    cafe.generateTexture('bld-cafe', 90, 90);
    cafe.destroy();

    // 6. Pharmacy & Clinic (85x95) — Green cross
    const pharm = this.make.graphics({ x: 0, y: 0 }, false);
    pharm.fillStyle(0xf8fafc, 1);
    pharm.fillRect(0, 16, 85, 79);
    pharm.fillStyle(0x059669, 1);
    pharm.fillRect(0, 0, 85, 20);
    // Glowing Green Cross
    pharm.fillStyle(0x22c55e, 1);
    pharm.fillRect(36, 3, 13, 14);
    pharm.fillRect(31, 7, 23, 6);
    // Clean windows
    pharm.fillStyle(0x0284c7, 0.4);
    pharm.fillRect(8, 26, 32, 34);
    pharm.fillRect(45, 26, 32, 34);
    pharm.fillStyle(0x059669, 1);
    pharm.fillRect(28, 64, 29, 31);
    pharm.generateTexture('bld-pharmacy', 85, 95);
    pharm.destroy();

    // 7. City Supermarket & Convenience Store (100x85)
    const mart = this.make.graphics({ x: 0, y: 0 }, false);
    mart.fillStyle(0xe2e8f0, 1);
    mart.fillRect(0, 14, 100, 71);
    // Red & Yellow Supermarket Signboard
    mart.fillStyle(0xdc2626, 1);
    mart.fillRect(0, 0, 100, 18);
    mart.fillStyle(0xfde047, 1);
    mart.fillRect(10, 4, 80, 10);
    // Front Glass display
    mart.fillStyle(0x0284c7, 0.5);
    mart.fillRect(8, 24, 84, 34);
    mart.fillStyle(0x334155, 1);
    mart.fillRect(36, 58, 28, 27); // automatic sliding doors
    mart.generateTexture('bld-supermarket', 100, 85);
    mart.destroy();

    // 8. City Library / Civic Center (110x100) — Classical pillars
    const lib = this.make.graphics({ x: 0, y: 0 }, false);
    lib.fillStyle(0xd6d3d1, 1); // stone gray
    lib.fillRect(0, 16, 110, 84);
    lib.fillStyle(0xa8a29e, 1); // roof pediment
    lib.fillTriangle(55, 0, 0, 20, 110, 20);
    // Stone Pillars
    lib.fillStyle(0xf5f5f4, 1);
    for (let c = 12; c < 100; c += 22) {
      lib.fillRect(c, 22, 10, 56);
      lib.lineStyle(1, 0x78716c, 0.6);
      lib.strokeRect(c, 22, 10, 56);
    }
    // Grand entrance
    lib.fillStyle(0x44403c, 1);
    lib.fillRect(40, 60, 30, 40);
    lib.generateTexture('bld-library', 110, 100);
    lib.destroy();

    // 9. Urban Townhouse Block (95x95)
    const town = this.make.graphics({ x: 0, y: 0 }, false);
    town.fillStyle(0x854d0e, 1);
    town.fillRect(0, 14, 95, 81);
    town.fillStyle(0x1e293b, 1);
    town.fillRect(0, 0, 95, 18);
    // Windows
    town.fillStyle(0xfef08a, 0.8);
    for (let r = 24; r <= 52; r += 24) {
      for (let c = 10; c <= 65; c += 26) {
        town.fillRect(c, r, 16, 14);
      }
    }
    town.fillStyle(0x1c1917, 1);
    town.fillRect(36, 68, 22, 27);
    town.generateTexture('bld-townhouse', 95, 95);
    town.destroy();
  }

  // ─── 3. Vehicle Textures (Cars, Buses, Taxis, Vans) ───────────────────────

  private createVehicleTextures() {
    // 1. Green Accessible City Bus (60x24) — horizontal top-down / side-angle
    const bus = this.make.graphics({ x: 0, y: 0 }, false);
    // Shadow
    bus.fillStyle(0x000000, 0.3);
    bus.fillRoundedRect(2, 4, 58, 20, 4);
    // Main Body (Green & White)
    bus.fillStyle(0x16a34a, 1);
    bus.fillRoundedRect(0, 0, 56, 20, 3);
    bus.fillStyle(0xf8fafc, 1);
    bus.fillRect(0, 3, 56, 5);
    // Windshield & Windows
    bus.fillStyle(0x1e293b, 0.85);
    bus.fillRect(44, 2, 10, 16); // front windshield
    for (let w = 6; w <= 38; w += 8) {
      bus.fillRect(w, 2, 6, 16);
    }
    // Headlights & Taillights
    bus.fillStyle(0xfef08a, 1);
    bus.fillRect(55, 2, 2, 4);
    bus.fillRect(55, 14, 2, 4);
    bus.fillStyle(0xdc2626, 1);
    bus.fillRect(0, 2, 2, 4);
    bus.fillRect(0, 14, 2, 4);
    // Wheelchair symbol on top
    bus.fillStyle(0x2563eb, 1);
    bus.fillRect(24, 6, 8, 8);
    bus.fillStyle(0xffffff, 1);
    bus.fillRect(27, 8, 3, 4);
    bus.generateTexture('veh-bus', 60, 24);
    bus.destroy();

    // 2. Yellow Taxi (32x16)
    const taxi = this.make.graphics({ x: 0, y: 0 }, false);
    taxi.fillStyle(0x000000, 0.25);
    taxi.fillRoundedRect(2, 3, 30, 13, 3);
    taxi.fillStyle(0xeab308, 1);
    taxi.fillRoundedRect(0, 0, 30, 14, 3);
    // Black & white checker strip
    taxi.fillStyle(0x000000, 1);
    taxi.fillRect(6, 4, 18, 2);
    // Windows
    taxi.fillStyle(0x0f172a, 0.85);
    taxi.fillRect(6, 3, 18, 8);
    // Taxi roof light
    taxi.fillStyle(0xffffff, 1);
    taxi.fillRect(13, 0, 6, 3);
    // Headlights / taillights
    taxi.fillStyle(0xfef08a, 1);
    taxi.fillRect(29, 2, 2, 3);
    taxi.fillRect(29, 9, 2, 3);
    taxi.fillStyle(0xdc2626, 1);
    taxi.fillRect(0, 2, 2, 3);
    taxi.fillRect(0, 9, 2, 3);
    taxi.generateTexture('veh-taxi', 32, 16);
    taxi.destroy();

    // 3. Blue Sedan (30x14)
    const sedan = this.make.graphics({ x: 0, y: 0 }, false);
    sedan.fillStyle(0x000000, 0.25);
    sedan.fillRoundedRect(2, 3, 28, 11, 3);
    sedan.fillStyle(0x2563eb, 1);
    sedan.fillRoundedRect(0, 0, 28, 12, 3);
    sedan.fillStyle(0x0f172a, 0.85);
    sedan.fillRect(6, 2, 16, 8);
    sedan.fillStyle(0xfef08a, 1);
    sedan.fillRect(27, 1, 2, 3);
    sedan.fillRect(27, 8, 2, 3);
    sedan.fillStyle(0xdc2626, 1);
    sedan.fillRect(0, 1, 2, 3);
    sedan.fillRect(0, 8, 2, 3);
    sedan.generateTexture('veh-sedan', 30, 14);
    sedan.destroy();

    // 4. Red Hatchback (28x14)
    const redCar = this.make.graphics({ x: 0, y: 0 }, false);
    redCar.fillStyle(0x000000, 0.25);
    redCar.fillRoundedRect(2, 3, 26, 11, 3);
    redCar.fillStyle(0xdc2626, 1);
    redCar.fillRoundedRect(0, 0, 26, 12, 3);
    redCar.fillStyle(0x0f172a, 0.85);
    redCar.fillRect(5, 2, 16, 8);
    redCar.fillStyle(0xfef08a, 1);
    redCar.fillRect(25, 1, 2, 3);
    redCar.fillRect(25, 8, 2, 3);
    redCar.generateTexture('veh-red-car', 28, 14);
    redCar.destroy();

    // 5. White Delivery Van (38x18)
    const van = this.make.graphics({ x: 0, y: 0 }, false);
    van.fillStyle(0x000000, 0.3);
    van.fillRoundedRect(2, 3, 36, 15, 3);
    van.fillStyle(0xf1f5f9, 1);
    van.fillRoundedRect(0, 0, 36, 16, 3);
    van.fillStyle(0x3b82f6, 1);
    van.fillRect(0, 6, 36, 4); // logo stripe
    van.fillStyle(0x0f172a, 0.85);
    van.fillRect(24, 2, 8, 12); // windshield
    van.fillStyle(0xfef08a, 1);
    van.fillRect(35, 2, 2, 3);
    van.fillRect(35, 11, 2, 3);
    van.generateTexture('veh-van', 38, 18);
    van.destroy();
  }

  // ─── 4. Urban Street Props & Details ──────────────────────────────────────

  private createUrbanPropsTextures() {
    // 1. Traffic Light Post (16x40)
    const tl = this.make.graphics({ x: 0, y: 0 }, false);
    tl.fillStyle(0x334155, 1);
    tl.fillRect(7, 16, 2, 24); // pole
    tl.fillStyle(0x0f172a, 1);
    tl.fillRoundedRect(3, 0, 10, 20, 2);
    // Lights (Red, Yellow, Green)
    tl.fillStyle(0xef4444, 1);
    tl.fillCircle(8, 4, 2.5);
    tl.fillStyle(0xeab308, 0.4);
    tl.fillCircle(8, 10, 2.5);
    tl.fillStyle(0x22c55e, 1);
    tl.fillCircle(8, 16, 2.5);
    tl.generateTexture('prop-traffic-light', 16, 40);
    tl.destroy();

    // 2. Modern Streetlight (16x42)
    const sl = this.make.graphics({ x: 0, y: 0 }, false);
    sl.fillStyle(0x475569, 1);
    sl.fillRect(7, 12, 2, 30);
    sl.fillRect(2, 10, 12, 3);
    sl.fillStyle(0xfef08a, 1); // warm bulb
    sl.fillCircle(4, 12, 3.5);
    sl.fillCircle(12, 12, 3.5);
    sl.generateTexture('prop-streetlight', 16, 42);
    sl.destroy();

    // 3. Urban Tree in Planter Box (32x42)
    const tree = this.make.graphics({ x: 0, y: 0 }, false);
    // Concrete Planter Box
    tree.fillStyle(0x78716c, 1);
    tree.fillRect(8, 32, 16, 10);
    tree.fillStyle(0xa8a29e, 1);
    tree.fillRect(6, 30, 20, 3);
    // Trunk & Lush Canopy
    tree.fillStyle(0x573418, 1);
    tree.fillRect(14, 22, 4, 10);
    tree.fillStyle(0x166534, 1);
    tree.fillCircle(16, 14, 13);
    tree.fillStyle(0x15803d, 1);
    tree.fillCircle(14, 11, 11);
    tree.fillStyle(0x22c55e, 0.8);
    tree.fillCircle(18, 9, 8);
    tree.generateTexture('prop-tree', 32, 42);
    tree.destroy();

    // 4. Cafe Bistro Table with Parasol Umbrella (36x36)
    const table = this.make.graphics({ x: 0, y: 0 }, false);
    // Umbrella top (striped red & white)
    table.fillStyle(0xdc2626, 1);
    table.fillCircle(18, 18, 14);
    table.fillStyle(0xfef2f2, 1);
    table.fillTriangle(18, 18, 4, 18, 8, 8);
    table.fillTriangle(18, 18, 32, 18, 28, 28);
    table.fillTriangle(18, 18, 18, 4, 28, 8);
    table.fillTriangle(18, 18, 18, 32, 8, 28);
    table.fillStyle(0x7f1d1d, 1);
    table.fillCircle(18, 18, 3);
    table.generateTexture('prop-cafe-table', 36, 36);
    table.destroy();

    // 5. Urban Wooden Bench (32x14)
    const bench = this.make.graphics({ x: 0, y: 0 }, false);
    bench.fillStyle(0x000000, 0.2);
    bench.fillRect(2, 4, 28, 8);
    bench.fillStyle(0x78350f, 1);
    bench.fillRect(2, 2, 28, 4);
    bench.fillRect(2, 8, 28, 3);
    bench.fillStyle(0x334155, 1);
    bench.fillRect(4, 4, 2, 6);
    bench.fillRect(26, 4, 2, 6);
    bench.generateTexture('prop-bench', 32, 14);
    bench.destroy();

    // 6. Central Plaza Fountain (54x54)
    const ftn = this.make.graphics({ x: 0, y: 0 }, false);
    ftn.fillStyle(0x64748b, 1);
    ftn.fillCircle(27, 27, 24);
    ftn.fillStyle(0x94a3b8, 1);
    ftn.fillCircle(27, 27, 21);
    ftn.fillStyle(0x0284c7, 0.85); // Water
    ftn.fillCircle(27, 27, 18);
    ftn.fillStyle(0x7dd3fc, 0.6);
    ftn.fillCircle(25, 25, 10);
    ftn.fillStyle(0xffffff, 0.8);
    ftn.fillCircle(27, 27, 4);
    ftn.generateTexture('prop-fountain', 54, 54);
    ftn.destroy();

    // 7. Fire Hydrant (10x16)
    const hyd = this.make.graphics({ x: 0, y: 0 }, false);
    hyd.fillStyle(0xef4444, 1);
    hyd.fillRect(2, 4, 6, 12);
    hyd.fillCircle(5, 4, 4);
    hyd.fillStyle(0xfacc15, 1);
    hyd.fillRect(0, 7, 10, 3);
    hyd.generateTexture('prop-hydrant', 10, 16);
    hyd.destroy();

    // 8. Bus Stop Shelter (56x70) — Accessible shelter with glass and route map
    const busStop = this.make.graphics({ x: 0, y: 0 }, false);
    busStop.fillStyle(0x1e293b, 1);
    busStop.fillRect(4, 10, 48, 6); // canopy
    busStop.fillStyle(0x0284c7, 0.9);
    busStop.fillRect(0, 4, 56, 8);
    // Glass back panel with route timetable map
    busStop.fillStyle(0x38bdf8, 0.35);
    busStop.fillRect(6, 16, 44, 48);
    busStop.fillStyle(0xffffff, 0.8);
    busStop.fillRect(12, 22, 16, 22); // route poster
    busStop.fillStyle(0x3b82f6, 1);
    busStop.fillRect(14, 25, 12, 2);
    // Posts & Bench inside
    busStop.fillStyle(0x64748b, 1);
    busStop.fillRect(6, 14, 3, 52);
    busStop.fillRect(47, 14, 3, 52);
    busStop.fillStyle(0x78350f, 1);
    busStop.fillRect(12, 48, 32, 4);
    busStop.generateTexture('prop-bus-stop', 56, 70);
    busStop.destroy();
  }

  // ─── 5. Characters & Pedestrian Sprites ───────────────────────────────────

  private createCharacterSprites() {
    // 1. Ava (Player / Access Architect)
    const ava = this.make.graphics({ x: 0, y: 0 }, false);
    ava.fillStyle(0x000000, 0.25);
    ava.fillEllipse(9, 22, 14, 5);
    ava.fillStyle(0x059669, 1); // teal jacket
    ava.fillRect(4, 10, 10, 12);
    ava.fillStyle(0xfcd34d, 1); // face
    ava.fillRect(5, 3, 8, 8);
    ava.fillStyle(0x7c3aed, 1); // purple hair
    ava.fillRect(4, 2, 10, 5);
    ava.fillRect(3, 4, 3, 6);
    ava.fillRect(12, 4, 3, 6);
    ava.generateTexture('char-ava', 18, 24);
    ava.destroy();

    // 2. Rahul (Sunglasses, White Cane & Guide Dog companion)
    const rahul = this.make.graphics({ x: 0, y: 0 }, false);
    rahul.fillStyle(0x000000, 0.25);
    rahul.fillEllipse(10, 22, 16, 5);
    rahul.fillStyle(0x1e3a8a, 1); // navy jacket
    rahul.fillRect(5, 10, 10, 12);
    rahul.fillStyle(0xfcd34d, 1);
    rahul.fillRect(6, 3, 8, 8);
    rahul.fillStyle(0x0f172a, 1); // dark hair
    rahul.fillRect(5, 2, 10, 4);
    rahul.fillRect(6, 6, 8, 3); // sunglasses
    rahul.fillStyle(0xffffff, 1); // white cane
    rahul.fillRect(2, 8, 2, 16);
    rahul.fillStyle(0xdc2626, 1);
    rahul.fillRect(2, 8, 2, 4);
    rahul.generateTexture('char-rahul', 20, 24);
    rahul.destroy();

    // 3. Guide Dog (16x14) — Golden retriever with blue service vest
    const dog = this.make.graphics({ x: 0, y: 0 }, false);
    dog.fillStyle(0x000000, 0.2);
    dog.fillEllipse(8, 12, 12, 4);
    dog.fillStyle(0xd97706, 1); // golden body
    dog.fillRect(2, 4, 12, 7);
    dog.fillCircle(13, 4, 3); // head
    dog.fillStyle(0x2563eb, 1); // blue harness
    dog.fillRect(5, 4, 6, 6);
    dog.fillStyle(0xb45309, 1);
    dog.fillRect(3, 10, 2, 4); // legs
    dog.fillRect(11, 10, 2, 4);
    dog.generateTexture('char-guide-dog', 16, 14);
    dog.destroy();

    // 4. Fatima (Purple Hijab, seated in Accessible Wheelchair)
    const fatima = this.make.graphics({ x: 0, y: 0 }, false);
    fatima.fillStyle(0x000000, 0.25);
    fatima.fillEllipse(11, 22, 18, 6);
    // Wheelchair frame & wheels
    fatima.fillStyle(0x64748b, 1);
    fatima.strokeCircle(5, 18, 4);
    fatima.strokeCircle(17, 18, 4);
    fatima.fillRect(4, 13, 14, 4);
    // Body & Purple Hijab
    fatima.fillStyle(0x7c3aed, 1);
    fatima.fillRect(5, 8, 12, 9);
    fatima.fillRect(5, 2, 12, 8);
    fatima.fillStyle(0xfcd34d, 1); // face
    fatima.fillRect(7, 5, 8, 5);
    fatima.generateTexture('char-fatima', 22, 24);
    fatima.destroy();

    // 5. Grandma Mira (Orange Cardigan, Silver Bun, Walking Stick)
    const grandma = this.make.graphics({ x: 0, y: 0 }, false);
    grandma.fillStyle(0x000000, 0.25);
    grandma.fillEllipse(9, 22, 14, 5);
    grandma.fillStyle(0xd97706, 1);
    grandma.fillRect(4, 10, 10, 12);
    grandma.fillStyle(0xfde68a, 1);
    grandma.fillRect(5, 4, 8, 7);
    grandma.fillStyle(0xcfd8dc, 1); // silver hair
    grandma.fillRect(4, 2, 10, 4);
    grandma.fillStyle(0xec4899, 1); // pink glasses
    grandma.fillRect(5, 6, 8, 2);
    grandma.fillStyle(0x78350f, 1); // walking stick
    grandma.fillRect(15, 10, 2, 12);
    grandma.generateTexture('char-grandma', 18, 24);
    grandma.destroy();

    // 6. Ambient Pedestrians
    const p1 = this.make.graphics({ x: 0, y: 0 }, false);
    p1.fillStyle(0x000000, 0.2);
    p1.fillEllipse(9, 22, 12, 4);
    p1.fillStyle(0x3b82f6, 1); // blue shirt
    p1.fillRect(4, 10, 10, 12);
    p1.fillStyle(0xfcd34d, 1);
    p1.fillRect(5, 3, 8, 8);
    p1.fillStyle(0x374151, 1);
    p1.fillRect(4, 2, 10, 4);
    p1.generateTexture('char-ped1', 18, 24);
    p1.destroy();

    const p2 = this.make.graphics({ x: 0, y: 0 }, false);
    p2.fillStyle(0x000000, 0.2);
    p2.fillEllipse(9, 22, 12, 4);
    p2.fillStyle(0xdc2626, 1); // red jacket
    p2.fillRect(4, 10, 10, 12);
    p2.fillStyle(0xfcd34d, 1);
    p2.fillRect(5, 3, 8, 8);
    p2.fillStyle(0x111827, 1);
    p2.fillRect(4, 2, 10, 4);
    p2.generateTexture('char-ped2', 18, 24);
    p2.destroy();
  }

  // ─── 6. Character Visual Novel Portraits ─────────────────────────────────

  private createCharacterPortraits() {
    // City skyline backdrop
    const skyGfx = this.make.graphics({ x: 0, y: 0 }, false);
    skyGfx.fillGradientStyle(0x1e293b, 0x1e293b, 0x334155, 0x475569, 1);
    skyGfx.fillRect(0, 0, 1280, 160);
    // Distant building silhouettes with glowing windows
    skyGfx.fillStyle(0x0f172a, 0.85);
    for (let x = 0; x < 1280; x += 40) {
      const h = 40 + (x % 70) + ((x * 13) % 40);
      skyGfx.fillRect(x, 160 - h, 38, h);
      // Windows
      skyGfx.fillStyle(0xfde047, 0.4);
      for (let wy = 160 - h + 10; wy < 150; wy += 14) {
        skyGfx.fillRect(x + 6, wy, 6, 6);
        skyGfx.fillRect(x + 22, wy, 6, 6);
      }
      skyGfx.fillStyle(0x0f172a, 0.85);
    }
    skyGfx.generateTexture('city-skyline-bg', 1280, 160);
    skyGfx.destroy();
  }
}
