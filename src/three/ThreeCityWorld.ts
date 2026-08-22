import * as THREE from 'three';
import { gameStateManager } from '../core/GameStateManager';
import { dialogueManager } from '../gameplay/DialogueManager';

/**
 * ThreeCityWorld — Authoritative 3D Low-Poly Stylized City (CITY_3D_VISUAL_DIRECTION.md)
 * 
 * - Camera: Bird's-eye / Top-down angled RPG camera with smooth player following
 * - Style: 3D low-poly stylized realism with natural materials (brick, concrete, stone, asphalt, glass, wood)
 * - Lighting: Warm natural daylight, soft directional sunlight, and grounded shadows (NO NEON / NO CYBERPUNK)
 * - Density: Dense urban blocks (Hospital, Transit Terminal, Cafe, Pharmacy, Apartments, Offices, Plaza, Fountain)
 * - Traffic: 3D City Buses, Taxis, Sedans, Vans cruising in realistic traffic loops
 * - Characters: Ava (Player with walk/jump cycle), Rahul + Guide Dog, Fatima (Wheelchair), Grandma Mira, Citizens
 */
export class ThreeCityWorld {
  private container: HTMLElement;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private clock = new THREE.Clock();

  // Player Meshes
  private playerGroup!: THREE.Group;
  private playerHead!: THREE.Mesh;
  private playerTorso!: THREE.Mesh;
  private playerLeftArm!: THREE.Mesh;
  private playerRightArm!: THREE.Mesh;
  private playerLeftLeg!: THREE.Mesh;
  private playerRightLeg!: THREE.Mesh;

  // Traffic
  private vehicles: { mesh: THREE.Group; speed: number; startX: number; endX: number }[] = [];
  private pedestrians: { mesh: THREE.Group; speed: number; minX: number; maxX: number; dir: number }[] = [];

  // Fountain particles
  private fountainParticles!: THREE.Points;

  // Controls & Physics
  private keys: Record<string, boolean> = {};
  private playerVelocity = new THREE.Vector3();
  private isGrounded = true;
  private playerRotation = 0;
  
  // Bird's-Eye Camera configuration (48° elevation angle)
  private cameraAngle = { pitch: 0.78, yaw: 0, distance: 22 };
  private isMouseDown = false;
  private prevMousePos = { x: 0, y: 0 };

  // Lifecycle
  private isDestroyed = false;
  private animFrameId: number | null = null;
  private promptElement: HTMLDivElement | null = null;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found.`);
    this.container = el;

    this.initScene();
    this.setupDaylight();
    this.buildDenseCityLayout();
    this.createStylizedCharacters();
    this.createUrbanTraffic();
    this.createPedestrians();
    this.setupInput();
    this.animate();

    console.log('🏙️ 3D Bird\'s-Eye Urban City World Active (Natural Daylight & Stylized Realism)');
  }

  // ─── 1. Scene, Camera, Renderer ──────────────────────────────────────────

  private initScene() {
    this.scene = new THREE.Scene();
    
    // Natural Daytime Sky Blue (Soft atmospheric haze, NO NEON)
    this.scene.background = new THREE.Color(0xdbeafe);
    this.scene.fog = new THREE.FogExp2(0xdbeafe, 0.006);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    // Bird's-Eye Perspective Camera
    this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    this.camera.position.set(0, 20, 22);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.domElement.id = 'three-canvas';
    this.renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;';
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onResize);
  }

  private onResize = () => {
    if (this.isDestroyed || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  // ─── 2. Natural Daylight & Atmospheric Lighting ──────────────────────────

  private setupDaylight() {
    // Soft Ambient Light (Natural daylight reflection)
    const ambientLight = new THREE.AmbientLight(0xf1f5f9, 0.75);
    this.scene.add(ambientLight);

    // Warm Sun Light (Direct sunlight with soft shadows)
    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.3);
    sunLight.position.set(50, 75, 40);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 250;
    const d = 75;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    this.scene.add(sunLight);

    // Hemisphere sky bounce
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x94a3b8, 0.4);
    this.scene.add(hemiLight);
  }

  // ─── 3. Dense Urban City Layout (Roads, Sidewalks, Buildings) ────────────

  private buildDenseCityLayout() {
    // 1. Ground Base (Sidewalk concrete everywhere as default, NO empty grass)
    const groundGeo = new THREE.PlaneGeometry(280, 280);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // 2. North Commercial Boulevard (2-Lane Asphalt Road at Z: 18)
    const asphaltMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const northRoadGeo = new THREE.PlaneGeometry(280, 14);
    const northRoad = new THREE.Mesh(northRoadGeo, asphaltMat);
    northRoad.rotation.x = -Math.PI / 2;
    northRoad.position.set(0, 0.02, 18);
    northRoad.receiveShadow = true;
    this.scene.add(northRoad);

    // White dashed lane divider
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
    const northDashGeo = new THREE.PlaneGeometry(280, 0.35);
    const northDash = new THREE.Mesh(northDashGeo, whiteMat);
    northDash.rotation.x = -Math.PI / 2;
    northDash.position.set(0, 0.03, 18);
    this.scene.add(northDash);

    // 3. South 4-Lane Major Expressway / Highway (Z: -50)
    const hwyGeo = new THREE.PlaneGeometry(280, 24);
    const hwy = new THREE.Mesh(hwyGeo, asphaltMat);
    hwy.rotation.x = -Math.PI / 2;
    hwy.position.set(0, 0.02, -50);
    hwy.receiveShadow = true;
    this.scene.add(hwy);

    // Yellow double central divider line
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });
    const dblLineGeo = new THREE.PlaneGeometry(280, 0.45);
    const dblLine = new THREE.Mesh(dblLineGeo, yellowMat);
    dblLine.rotation.x = -Math.PI / 2;
    dblLine.position.set(0, 0.03, -50);
    this.scene.add(dblLine);

    // Highway crash safety barriers
    const barrierMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 });
    for (let x = -130; x <= 130; x += 12) {
      const b1 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 0.6), barrierMat);
      b1.position.set(x, 0.4, -62.5);
      const b2 = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 0.6), barrierMat);
      b2.position.set(x, 0.4, -37.5);
      this.scene.add(b1, b2);
    }

    // 4. North-South Connecting Cross Avenues (X: -45, X: 45)
    [-45, 45].forEach(ax => {
      const ave = new THREE.Mesh(new THREE.PlaneGeometry(12, 90), asphaltMat);
      ave.rotation.x = -Math.PI / 2;
      ave.position.set(ax, 0.025, -16);
      ave.receiveShadow = true;
      this.scene.add(ave);

      // Zebra Crosswalks at Intersections
      for (let z = 9; z <= 27; z += 18) {
        for (let sx = -4; sx <= 4; sx += 1.4) {
          const cross = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 4), whiteMat);
          cross.rotation.x = -Math.PI / 2;
          cross.position.set(ax + sx, 0.035, z);
          this.scene.add(cross);
        }
      }
    });

    // 5. Tactile Yellow Accessibility Paving (Raised safety strips along sidewalk ramps)
    const tactileMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 });
    const tacPositions = [
      [-45, 9], [-45, 27], [45, 9], [45, 27],
      [-25, 10], [25, 10], // Near Hospital & Metro Station
    ];
    tacPositions.forEach(([tx, tz]) => {
      const tac = new THREE.Mesh(new THREE.BoxGeometry(10, 0.08, 1.2), tactileMat);
      tac.position.set(tx, 0.04, tz);
      this.scene.add(tac);
    });

    // ── Build Dense Urban Building Blocks ──────────────────────────────────

    // 1. CityCare Hospital & Clinic (North-West Block: X: -30, Z: 0)
    this.buildHospital(-30, 0);

    // 2. Metro Central Transit Terminal (North-East Block: X: 30, Z: 0)
    this.buildMetroTerminal(30, 0);

    // 3. Corner Cafe & Bakery (Central-East: X: 25, Z: 32)
    this.buildCafe(25, 32);

    // 4. Pharmacy & Medical Supply (Central-West: X: -25, Z: 32)
    this.buildPharmacy(-25, 32);

    // 5. Tech Design Lab & Offices (North Central: X: 0, Z: -20)
    this.buildOffice(0, -20);

    // 6. Multi-Story Residential Apartments (Far West: X: -70, Z: 0)
    this.buildApartments(-70, 0);

    // 7. City Library & Civic Center (Far East: X: 70, Z: 0)
    this.buildLibrary(70, 0);

    // 8. Central Cobblestone Plaza & Fountain (X: 0, Z: 0)
    this.buildPlazaFountain(0, 0);

    // 9. Street Furniture & Tree Landscaping
    this.buildStreetProps();
  }

  // ─── 4. Architectural Building Constructors (Natural Materials) ──────────

  private buildHospital(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Main Clinical Tower (Off-white / clean architectural facade)
    const towerMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const tower = new THREE.Mesh(new THREE.BoxGeometry(24, 18, 18), towerMat);
    tower.position.y = 9;
    tower.castShadow = true;
    tower.receiveShadow = true;
    group.add(tower);

    // Architectural cornice roof
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });
    const roof = new THREE.Mesh(new THREE.BoxGeometry(25, 1.2, 19), roofMat);
    roof.position.y = 18.6;
    group.add(roof);

    // Tinted Blue Glass Ribbon Windows
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, metalness: 0.4 });
    for (let wy = 5; wy <= 15; wy += 3.5) {
      const winFront = new THREE.Mesh(new THREE.BoxGeometry(20, 1.4, 0.2), glassMat);
      winFront.position.set(0, wy, 9.1);
      group.add(winFront);
    }

    // 3D Red Cross Sign (Clean non-neon medical insignia)
    const redCrossMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 });
    const crV = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.5, 0.4), redCrossMat);
    crV.position.set(0, 20.5, 8.8);
    const crH = new THREE.Mesh(new THREE.BoxGeometry(4.5, 1.4, 0.4), redCrossMat);
    crH.position.set(0, 20.5, 8.8);
    group.add(crV, crH);

    // Accessible Entrance Ramp with Handrails
    const rampMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.6 });
    const ramp = new THREE.Mesh(new THREE.BoxGeometry(8, 0.3, 5), rampMat);
    ramp.position.set(0, 0.15, 11);
    group.add(ramp);

    this.scene.add(group);
  }

  private buildMetroTerminal(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Dark Steel Architectural Pillars
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.3 });
    for (let px of [-10, 10]) {
      for (let pz of [-8, 8]) {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.8, 11, 0.8), steelMat);
        pillar.position.set(px, 5.5, pz);
        pillar.castShadow = true;
        group.add(pillar);
      }
    }

    // Modern Cyan Glass Station Canopy
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.75, roughness: 0.1 });
    const canopy = new THREE.Mesh(new THREE.BoxGeometry(24, 0.8, 20), canopyMat);
    canopy.position.y = 11;
    canopy.castShadow = true;
    group.add(canopy);

    // LED Arrival Board (Warm yellow digital readout)
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
    const board = new THREE.Mesh(new THREE.BoxGeometry(14, 3.2, 0.6), boardMat);
    board.position.set(0, 8.5, 0);
    group.add(board);

    const ledMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    for (let ly of [9.2, 8.4, 7.6]) {
      const line = new THREE.Mesh(new THREE.BoxGeometry(11, 0.3, 0.7), ledMat);
      line.position.set(0, ly, 0);
      group.add(line);
    }

    this.scene.add(group);
  }

  private buildCafe(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Terracotta Brick Wall Facade
    const brickMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85 });
    const bld = new THREE.Mesh(new THREE.BoxGeometry(18, 11, 14), brickMat);
    bld.position.y = 5.5;
    bld.castShadow = true;
    group.add(bld);

    // Green-and-Cream Striped Awning
    const awningMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 });
    const awning = new THREE.Mesh(new THREE.BoxGeometry(14, 0.6, 3.5), awningMat);
    awning.position.set(0, 5, 8.2);
    awning.rotation.x = 0.2;
    group.add(awning);

    // Outdoor Bistro Tables & Parasols
    const tableMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
    const umbrellaMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.4 });
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 });

    [-4.5, 4.5].forEach(tx => {
      const table = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 1, 12), tableMat);
      table.position.set(tx, 0.5, 12.5);
      group.add(table);

      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 3.8), poleMat);
      pole.position.set(tx, 1.9, 12.5);
      const umbrella = new THREE.Mesh(new THREE.ConeGeometry(2.4, 1.2, 8), umbrellaMat);
      umbrella.position.set(tx, 3.5, 12.5);
      group.add(pole, umbrella);
    });

    this.scene.add(group);
  }

  private buildPharmacy(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Clean White Medical Clinic Facade
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
    const bld = new THREE.Mesh(new THREE.BoxGeometry(18, 11, 14), whiteMat);
    bld.position.y = 5.5;
    bld.castShadow = true;
    group.add(bld);

    // 3D Green Pharmacy Cross
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.3 });
    const crV = new THREE.Mesh(new THREE.BoxGeometry(1.2, 3.6, 0.4), greenMat);
    crV.position.set(0, 8, 7.2);
    const crH = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.2, 0.4), greenMat);
    crH.position.set(0, 8, 7.2);
    group.add(crV, crH);

    this.scene.add(group);
  }

  private buildOffice(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Modern Curtain-wall Tech Office (Deep Slate & Glass)
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3, metalness: 0.6 });
    const bld = new THREE.Mesh(new THREE.BoxGeometry(26, 24, 20), steelMat);
    bld.position.y = 12;
    bld.castShadow = true;
    group.add(bld);

    // Logo Banner (Indigo)
    const indigoMat = new THREE.MeshStandardMaterial({ color: 0x4f46e5, roughness: 0.4 });
    const banner = new THREE.Mesh(new THREE.BoxGeometry(20, 2.2, 0.4), indigoMat);
    banner.position.set(0, 21, 10.2);
    group.add(banner);

    this.scene.add(group);
  }

  private buildApartments(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Multi-Story Brick Residential Flats (Dark Red Brick)
    const brickMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.8 });
    const bld = new THREE.Mesh(new THREE.BoxGeometry(22, 20, 18), brickMat);
    bld.position.y = 10;
    bld.castShadow = true;
    group.add(bld);

    // Warm lit windows
    const warmMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.3 });
    for (let r = 4; r <= 16; r += 3.5) {
      for (let c = -7; c <= 7; c += 5) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.2), warmMat);
        win.position.set(c, r, 9.1);
        group.add(win);
      }
    }

    this.scene.add(group);
  }

  private buildLibrary(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Classical Stone Civic Center with Columns
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xd6d3d1, roughness: 0.7 });
    const bld = new THREE.Mesh(new THREE.BoxGeometry(22, 14, 18), stoneMat);
    bld.position.y = 7;
    bld.castShadow = true;
    group.add(bld);

    // Columns
    for (let cx of [-8, -4, 0, 4, 8]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.6, 9, 12), stoneMat);
      col.position.set(cx, 4.5, 9.5);
      group.add(col);
    }

    this.scene.add(group);
  }

  private buildPlazaFountain(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Raised Circular Plaza Basin
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7 });
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(6.5, 7, 0.9, 24), stoneMat);
    basin.position.y = 0.45;
    basin.receiveShadow = true;
    group.add(basin);

    // Water Surface (Natural clear blue)
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, transparent: true, opacity: 0.85, roughness: 0.1 });
    const water = new THREE.Mesh(new THREE.CylinderGeometry(5.8, 5.8, 0.75, 24), waterMat);
    water.position.y = 0.5;
    group.add(water);

    // Center Stone Pillar
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 2.8, 16), stoneMat);
    pillar.position.y = 1.8;
    group.add(pillar);

    // Animated Fountain Spray Particles
    const particleCount = 70;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 2.2;
      pPos[i + 1] = 2.8 + Math.random() * 2.2;
      pPos[i + 2] = (Math.random() - 0.5) * 2.2;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0xe0f2fe, size: 0.28, transparent: true, opacity: 0.85 });
    this.fountainParticles = new THREE.Points(pGeo, pMat);
    group.add(this.fountainParticles);

    this.scene.add(group);
  }

  private buildStreetProps() {
    // 3D Lush Green Trees in Concrete Planters
    const treeCoords = [
      [-16, 12], [16, 12], [-16, -10], [16, -10],
      [-36, 12], [36, 12], [-58, 12], [58, 12]
    ];
    treeCoords.forEach(([tx, tz]) => {
      this.createTree(tx, tz);
    });

    // 3D Modern Streetlamps (Warm daytime steel posts)
    const lampCoords = [
      [-22, 11], [22, 11], [-22, 25], [22, 25],
      [-12, -4], [12, -4]
    ];
    lampCoords.forEach(([lx, lz]) => {
      this.createStreetlamp(lx, lz);
    });
  }

  private createTree(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // Planter Box
    const planMat = new THREE.MeshStandardMaterial({ color: 0x78716c, roughness: 0.8 });
    const plan = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 2.4), planMat);
    plan.position.y = 0.3;
    group.add(plan);

    // Wood Trunk
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x573418, roughness: 0.9 });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 3.2, 8), trunkMat);
    trunk.position.y = 1.6;
    trunk.castShadow = true;
    group.add(trunk);

    // Natural Forest Green Foliage
    const leavesMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.7 });
    const foliage1 = new THREE.Mesh(new THREE.DodecahedronGeometry(2.2), leavesMat);
    foliage1.position.y = 4;
    foliage1.castShadow = true;
    group.add(foliage1);

    this.scene.add(group);
  }

  private createStreetlamp(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    const poleMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 5.2, 8), poleMat);
    pole.position.y = 2.6;
    group.add(pole);

    const arm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.15, 0.15), poleMat);
    arm.position.set(0.6, 5.2, 0);
    group.add(arm);

    const bulbMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfef08a, emissiveIntensity: 0.7 });
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 8, 8), bulbMat);
    bulb.position.set(1.3, 5, 0);
    group.add(bulb);

    this.scene.add(group);
  }

  // ─── 5. Stylized 3D Characters (Ava, Rahul, Fatima, Grandma Mira) ────────

  private createStylizedCharacters() {
    // 1. Player (Ava — Access Architect in 3D)
    this.playerGroup = new THREE.Group();
    this.playerGroup.position.set(0, 0, 6); // Start in central walkway

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d, roughness: 0.5 });
    this.playerHead = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), skinMat);
    this.playerHead.position.y = 3.1;
    this.playerHead.castShadow = true;
    this.playerGroup.add(this.playerHead);

    const hairMat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.4 });
    const hair = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.55, 1.3), hairMat);
    hair.position.set(0, 0.42, 0);
    this.playerHead.add(hair);

    const tealMat = new THREE.MeshStandardMaterial({ color: 0x059669, roughness: 0.6 });
    this.playerTorso = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 0.9), tealMat);
    this.playerTorso.position.y = 1.85;
    this.playerTorso.castShadow = true;
    this.playerGroup.add(this.playerTorso);

    this.playerLeftArm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.6), tealMat);
    this.playerLeftArm.position.set(-1.15, 1.85, 0);
    this.playerLeftArm.castShadow = true;
    this.playerGroup.add(this.playerLeftArm);

    this.playerRightArm = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.6), tealMat);
    this.playerRightArm.position.set(1.15, 1.85, 0);
    this.playerRightArm.castShadow = true;
    this.playerGroup.add(this.playerRightArm);

    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.7 });
    this.playerLeftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.4, 0.7), pantsMat);
    this.playerLeftLeg.position.set(-0.4, 0.7, 0);
    this.playerLeftLeg.castShadow = true;
    this.playerGroup.add(this.playerLeftLeg);

    this.playerRightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.4, 0.7), pantsMat);
    this.playerRightLeg.position.set(0.4, 0.7, 0);
    this.playerRightLeg.castShadow = true;
    this.playerGroup.add(this.playerRightLeg);

    // Player 3D Overhead Nametag
    const playerNametag = this.createNametagSprite('Ava', 'Access Architect');
    playerNametag.position.set(0, 4.6, 0);
    this.playerGroup.add(playerNametag);

    this.scene.add(this.playerGroup);

    // 2. Rahul (At Hospital / Tactile Crossing at X: -26, Z: 10 with Guide Dog)
    this.createCharacterNPC({
      x: -26, z: 10,
      shirtColor: 0x1e3a8a, pantsColor: 0x0f172a, hairColor: 0x1e1b18,
      name: 'Rahul', role: 'Accessibility Advocate', hasGlasses: true, hasCane: true, hasGuideDog: true
    });

    // 3. Fatima (At Far East Library Crossing in 3D Wheelchair at X: 66, Z: 10)
    this.createFatimaWheelchair(66, 10);

    // 4. Grandma Mira (At Cafe Patio Terrace at X: 20, Z: 26)
    this.createCharacterNPC({
      x: 20, z: 26,
      shirtColor: 0xd97706, pantsColor: 0x78350f, hairColor: 0xcfd8dc,
      name: 'Grandma Mira', role: 'Senior Citizen', hasGlasses: true, hasCane: true
    });

    // 5. Kofi (At Office District in 3D Wheelchair at X: 15, Z: -20)
    this.createKofiWheelchair(15, -20);

    // 6. Elena (At Library Plaza at X: -15, Z: 26)
    this.createCharacterNPC({
      x: -15, z: 26,
      shirtColor: 0x10b981, pantsColor: 0x374151, hairColor: 0x4b5563,
      name: 'Elena', role: 'Citizen advocate', hasGlasses: false, hasCane: false
    });

    // 7. Yuki (At East Cafe Plaza at X: 52, Z: 26)
    this.createCharacterNPC({
      x: 52, z: 26,
      shirtColor: 0xf59e0b, pantsColor: 0x1e293b, hairColor: 0x171717,
      name: 'Yuki', role: 'Global Tourist', hasGlasses: false, hasCane: false
    });
  }

  private createNametagSprite(name: string, role: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Rounded background box
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(10, 8, 236, 64, 12);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Name Text
      ctx.font = 'bold 22px Inter, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.fillText(name, 128, 38);

      // Role Text
      ctx.font = '14px Inter, sans-serif';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(role, 128, 58);
    }

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(4.5, 1.4, 1);
    return sprite;
  }

  private createCharacterNPC(opts: {
    x: number; z: number; shirtColor: number; pantsColor: number; hairColor: number;
    name: string; role?: string; hasGlasses?: boolean; hasCane?: boolean; hasGuideDog?: boolean;
  }) {
    const group = new THREE.Group();
    group.position.set(opts.x, 0, opts.z);

    // 3D Nametag
    const nametag = this.createNametagSprite(opts.name, opts.role || 'Citizen');
    nametag.position.set(0, 4.6, 0);
    group.add(nametag);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d });
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), skinMat);
    head.position.y = 3.1;
    head.castShadow = true;
    group.add(head);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, 1.3), new THREE.MeshStandardMaterial({ color: opts.hairColor }));
    hair.position.y = 0.45;
    head.add(hair);

    if (opts.hasGlasses) {
      const glasses = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 0.1), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
      glasses.position.set(0, 0, 0.65);
      head.add(glasses);
    }

    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.5, 0.9), new THREE.MeshStandardMaterial({ color: opts.shirtColor }));
    torso.position.y = 1.85;
    torso.castShadow = true;
    group.add(torso);

    const armL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.6), new THREE.MeshStandardMaterial({ color: opts.shirtColor }));
    armL.position.set(-1.15, 1.85, 0);
    group.add(armL);

    const armR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.5, 0.6), new THREE.MeshStandardMaterial({ color: opts.shirtColor }));
    armR.position.set(1.15, 1.85, 0);
    group.add(armR);

    if (opts.hasCane) {
      const cane = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4), new THREE.MeshStandardMaterial({ color: 0xffffff }));
      cane.position.set(1.3, 1.2, 0.4);
      group.add(cane);
    }

    const legL = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.4, 0.7), new THREE.MeshStandardMaterial({ color: opts.pantsColor }));
    legL.position.set(-0.4, 0.7, 0);
    group.add(legL);

    const legR = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.4, 0.7), new THREE.MeshStandardMaterial({ color: opts.pantsColor }));
    legR.position.set(0.4, 0.7, 0);
    group.add(legR);

    // Guide Dog
    if (opts.hasGuideDog) {
      const dog = this.createGuideDogMesh();
      dog.position.set(1.8, 0, 0.2);
      group.add(dog);
    }

    this.scene.add(group);
  }

  private createGuideDogMesh(): THREE.Group {
    const dog = new THREE.Group();
    const goldenMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x2563eb });

    const body = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.8, 0.7), goldenMat);
    body.position.y = 0.6;
    dog.add(body);

    const harness = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.85, 0.75), blueMat);
    harness.position.set(0, 0.6, 0);
    dog.add(harness);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), goldenMat);
    head.position.set(0.8, 0.9, 0);
    dog.add(head);

    return dog;
  }

  private createFatimaWheelchair(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // 3D Nametag
    const nametag = this.createNametagSprite('Fatima', 'Transit Rider');
    nametag.position.set(0, 4.4, 0);
    group.add(nametag);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d });
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), skinMat);
    head.position.y = 2.6;
    group.add(head);

    const hijabMat = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.4 });
    const hijab = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.5, 1.4), hijabMat);
    hijab.position.y = 0.1;
    head.add(hijab);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 0.9), hijabMat);
    torso.position.set(0, 1.5, -0.1);
    group.add(torso);

    // 3D Wheelchair Structure
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.7 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.3, 1.8), frameMat);
    seat.position.set(0, 0.9, 0);
    group.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.6, 0.3), frameMat);
    back.position.set(0, 1.7, -0.8);
    group.add(back);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    [-1.05, 1.05].forEach(wx => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.2, 16), wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, 0.9, 0);
      group.add(wheel);
    });

    this.scene.add(group);
  }

  private createKofiWheelchair(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // 3D Nametag
    const nametag = this.createNametagSprite('Kofi', 'Adaptive Commuter');
    nametag.position.set(0, 4.4, 0);
    group.add(nametag);

    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d });
    const head = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2), skinMat);
    head.position.y = 2.6;
    group.add(head);

    const hair = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.4, 1.3), new THREE.MeshStandardMaterial({ color: 0x171717 }));
    hair.position.y = 0.5;
    head.add(hair);

    const torsoMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 0.9), torsoMat);
    torso.position.set(0, 1.5, -0.1);
    group.add(torso);

    // 3D Wheelchair Structure
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.7 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.3, 1.8), frameMat);
    seat.position.set(0, 0.9, 0);
    group.add(seat);

    const back = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.6, 0.3), frameMat);
    back.position.set(0, 1.7, -0.8);
    group.add(back);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a });
    [-1.05, 1.05].forEach(wx => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.2, 16), wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, 0.9, 0);
      group.add(wheel);
    });

    this.scene.add(group);
  }

  // ─── 6. 3D Moving Traffic (Buses, Taxis, Sedans, Vans) ───────────────────

  private createUrbanTraffic() {
    // 1. Green Transit City Bus (Main Road, Eastbound, Z: 20)
    const bus = this.buildVehicle(0x16a34a, 11, 3.4, 3.2);
    bus.position.set(-60, 1.6, 20);
    this.vehicles.push({ mesh: bus, speed: 0.26, startX: -130, endX: 130 });
    this.scene.add(bus);

    // 2. Yellow Taxi (Main Road, Westbound, Z: 16)
    const taxi = this.buildVehicle(0xeab308, 4.8, 2.2, 1.8);
    taxi.position.set(50, 0.9, 16);
    this.vehicles.push({ mesh: taxi, speed: -0.38, startX: 130, endX: -130 });
    this.scene.add(taxi);

    // 3. Blue Sedan (Highway, Eastbound, Z: -46)
    const sedan = this.buildVehicle(0x2563eb, 5.2, 2.2, 1.8);
    sedan.position.set(-20, 0.9, -46);
    this.vehicles.push({ mesh: sedan, speed: 0.55, startX: -130, endX: 130 });
    this.scene.add(sedan);

    // 4. White Delivery Van (Highway, Westbound, Z: -54)
    const van = this.buildVehicle(0xf1f5f9, 6.8, 2.6, 2.8);
    van.position.set(40, 1.4, -54);
    this.vehicles.push({ mesh: van, speed: -0.5, startX: 130, endX: -130 });
    this.scene.add(van);
  }

  private buildVehicle(color: number, len: number, wid: number, hei: number): THREE.Group {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color, roughness: 0.4 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(len, hei * 0.6, wid), bodyMat);
    body.position.y = hei * 0.3 + 0.3;
    body.castShadow = true;
    group.add(body);

    const cabinMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1 });
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(len * 0.6, hei * 0.5, wid * 0.85), cabinMat);
    cabin.position.set(0, hei * 0.75 + 0.3, 0);
    group.add(cabin);

    // Wheels
    const wMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    [-len * 0.3, len * 0.3].forEach(wx => {
      [-wid * 0.45, wid * 0.45].forEach(wz => {
        const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.28, 12), wMat);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(wx, 0.38, wz);
        group.add(wheel);
      });
    });

    // Headlights
    const lightMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const h1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.6), lightMat);
    h1.position.set(len * 0.51, hei * 0.3, wid * 0.3);
    const h2 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, 0.6), lightMat);
    h2.position.set(len * 0.51, hei * 0.3, -wid * 0.3);
    group.add(h1, h2);

    return group;
  }

  // ─── 7. Pedestrian Citizens ──────────────────────────────────────────────

  private createPedestrians() {
    const citizens = [
      { x: -10, z: 8, minX: -20, maxX: 0, color: 0x3b82f6, speed: 0.04 },
      { x: 10, z: 24, minX: 5, maxX: 22, color: 0xdc2626, speed: 0.035 },
      { x: -35, z: 24, minX: -45, maxX: -25, color: 0x475569, speed: 0.045 },
    ];

    citizens.forEach(c => {
      const g = new THREE.Group();
      g.position.set(c.x, 0, c.z);

      const skinMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d });
      const head = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), skinMat);
      head.position.y = 2.6;
      g.add(head);

      const torso = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.3, 0.8), new THREE.MeshStandardMaterial({ color: c.color }));
      torso.position.y = 1.5;
      g.add(torso);

      const legL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 0.6), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
      legL.position.set(-0.35, 0.6, 0);
      g.add(legL);

      const legR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 1.2, 0.6), new THREE.MeshStandardMaterial({ color: 0x1e293b }));
      legR.position.set(0.35, 0.6, 0);
      g.add(legR);

      this.scene.add(g);
      this.pedestrians.push({ mesh: g, speed: c.speed, minX: c.minX, maxX: c.maxX, dir: 1 });
    });
  }

  // ─── 8. Input & Physics Controls ─────────────────────────────────────────

  private setupInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      if (e.code === 'KeyE') this.checkProximityInteraction();
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Mouse Drag for Camera Orbiting
    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousedown', (e) => {
      this.isMouseDown = true;
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      this.isMouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isMouseDown) return;
      const dx = e.clientX - this.prevMousePos.x;
      const dy = e.clientY - this.prevMousePos.y;
      this.cameraAngle.yaw -= dx * 0.005;
      this.cameraAngle.pitch = Math.max(0.35, Math.min(1.1, this.cameraAngle.pitch + dy * 0.005));
      this.prevMousePos = { x: e.clientX, y: e.clientY };
    });

    canvas.addEventListener('wheel', (e) => {
      this.cameraAngle.distance = Math.max(14, Math.min(38, this.cameraAngle.distance + e.deltaY * 0.02));
    });
  }

  // ─── 9. Main Game Loop & Bird's-Eye Camera Following ─────────────────────

  private animate = () => {
    if (this.isDestroyed) return;
    this.animFrameId = requestAnimationFrame(this.animate);

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    this.updatePlayer(delta, time);
    this.updateTraffic();
    this.updatePedestrians();
    this.updateFountain(time);
    this.updateBirdsEyeCamera();
    this.updateProximityPrompt();

    this.renderer.render(this.scene, this.camera);
  };

  // ─── 8. Roblox Humanoid Physics Engine (Real Motion, Collisions & Forces) ───

  // Roblox Physics Constants
  private readonly ROBLOX_GRAVITY = 34.0;
  private readonly ROBLOX_WALK_SPEED = 16.0;
  private readonly ROBLOX_SPRINT_SPEED = 24.0;
  private readonly ROBLOX_ACCELERATION = 65.0;
  private readonly ROBLOX_FRICTION = 14.0;
  private readonly ROBLOX_JUMP_POWER = 13.5;

  // Solid Collision Obstacles (AABB Boxes for Buildings & Walls)
  private readonly SOLID_OBSTACLES = [
    // Hospital [-44..-16, -10..10]
    { minX: -43, maxX: -17, minZ: -10, maxZ: 10 },
    // Metro Terminal [17..43, -10..10]
    { minX: 17, maxX: 43, minZ: -10, maxZ: 10 },
    // Cafe [15..35, 24..40]
    { minX: 15, maxX: 35, minZ: 24, maxZ: 40 },
    // Pharmacy [-35..-15, 24..40]
    { minX: -35, maxX: -15, minZ: 24, maxZ: 40 },
    // Tech Office [-14..14, -31..-9]
    { minX: -14, maxX: 14, minZ: -31, maxZ: -9 },
    // Apartments [-82..-58, -10..10]
    { minX: -82, maxX: -58, minZ: -10, maxZ: 10 },
    // Library [58..82, -10..10]
    { minX: 58, maxX: 82, minZ: -10, maxZ: 10 },
    // South Highway Crash Barriers (Outer borders)
    { minX: -140, maxX: 140, minZ: -63.5, maxZ: -61.5 },
    { minX: -140, maxX: 140, minZ: -38.5, maxZ: -36.5 },
  ];

  private updatePlayer(delta: number, time: number) {
    if (!this.playerGroup) return;

    // Cap delta for frame spikes
    const dt = Math.min(delta, 0.05);

    // Sprinting (Shift key)
    const isSprinting = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
    const targetSpeed = isSprinting ? this.ROBLOX_SPRINT_SPEED : this.ROBLOX_WALK_SPEED;

    // Input direction relative to camera yaw
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.cameraAngle.yaw);
    const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), this.cameraAngle.yaw);
    const wishDir = new THREE.Vector3(0, 0, 0);

    if (this.keys['KeyW'] || this.keys['ArrowUp']) wishDir.add(forward);
    if (this.keys['KeyS'] || this.keys['ArrowDown']) wishDir.add(forward.clone().negate());
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) wishDir.add(right.clone().negate());
    if (this.keys['KeyD'] || this.keys['ArrowRight']) wishDir.add(right);

    const hasInput = wishDir.lengthSq() > 0.001;
    if (hasInput) wishDir.normalize();

    // Horizontal velocity acceleration & friction (Roblox Humanoid ground physics)
    if (this.isGrounded) {
      if (hasInput) {
        // Accelerate toward wishDir * targetSpeed
        const targetVel = wishDir.clone().multiplyScalar(targetSpeed);
        this.playerVelocity.x = THREE.MathUtils.lerp(this.playerVelocity.x, targetVel.x, this.ROBLOX_ACCELERATION * dt * 0.15);
        this.playerVelocity.z = THREE.MathUtils.lerp(this.playerVelocity.z, targetVel.z, this.ROBLOX_ACCELERATION * dt * 0.15);
      } else {
        // Apply ground friction damping (snappy stop)
        const speed = Math.hypot(this.playerVelocity.x, this.playerVelocity.z);
        if (speed > 0.05) {
          const drop = speed * this.ROBLOX_FRICTION * dt;
          const newSpeed = Math.max(0, speed - drop);
          const factor = newSpeed / speed;
          this.playerVelocity.x *= factor;
          this.playerVelocity.z *= factor;
        } else {
          this.playerVelocity.x = 0;
          this.playerVelocity.z = 0;
        }
      }
    } else {
      // In-air control (slight directional nudge with air resistance)
      if (hasInput) {
        this.playerVelocity.x += wishDir.x * targetSpeed * 0.25 * dt;
        this.playerVelocity.z += wishDir.z * targetSpeed * 0.25 * dt;
      }
    }

    // Jumping physics (Spacebar impulse)
    if (this.keys['Space'] && this.isGrounded) {
      this.playerVelocity.y = this.ROBLOX_JUMP_POWER;
      this.isGrounded = false;
      (window as any).audioService?.playSelect?.();
    }

    // Apply gravity
    if (!this.isGrounded) {
      this.playerVelocity.y -= this.ROBLOX_GRAVITY * dt;
    }

    // ── Collision Resolution & Stepping (X and Z axis sliding) ─────────────
    const nextPos = this.playerGroup.position.clone();
    const radius = 1.0; // player cylinder radius

    // Move X with collision check
    nextPos.x += this.playerVelocity.x * dt;
    if (this.checkSolidCollision(nextPos.x, this.playerGroup.position.z, radius)) {
      this.playerVelocity.x = 0; // stop X velocity on obstacle impact
      nextPos.x = this.playerGroup.position.x;
    }

    // Move Z with collision check
    nextPos.z += this.playerVelocity.z * dt;
    if (this.checkSolidCollision(nextPos.x, nextPos.z, radius)) {
      this.playerVelocity.z = 0; // stop Z velocity on obstacle impact
      nextPos.z = this.playerGroup.position.z;
    }

    // Check Central Fountain Collider (Radius: 6.8)
    const distToFountain = Math.hypot(nextPos.x, nextPos.z);
    if (distToFountain < 7.0) {
      const angle = Math.atan2(nextPos.z, nextPos.x);
      nextPos.x = Math.cos(angle) * 7.0;
      nextPos.z = Math.sin(angle) * 7.0;
    }

    // Check Vehicle Impacts (Safety impulse push back to sidewalk)
    this.checkVehicleCollisions(nextPos);

    // Apply resolved horizontal position
    this.playerGroup.position.x = nextPos.x;
    this.playerGroup.position.z = nextPos.z;

    // Apply vertical position & Ground Floor detection
    this.playerGroup.position.y += this.playerVelocity.y * dt;
    const floorY = 0.0;
    if (this.playerGroup.position.y <= floorY) {
      this.playerGroup.position.y = floorY;
      this.playerVelocity.y = 0;
      this.isGrounded = true;
    }

    // ── Character Mesh Animations (Walk cycle & jump pose) ──────────────────
    const horizSpeed = Math.hypot(this.playerVelocity.x, this.playerVelocity.z);
    if (horizSpeed > 0.4) {
      // Rotate body smoothly toward movement direction
      const targetAngle = Math.atan2(this.playerVelocity.x, this.playerVelocity.z);
      this.playerRotation = THREE.MathUtils.lerp(this.playerRotation, targetAngle, 14 * dt);
      this.playerGroup.rotation.y = this.playerRotation;

      // Limb swing synchronized to speed
      const strideFreq = (horizSpeed / this.ROBLOX_WALK_SPEED) * 14;
      const swing = Math.sin(time * strideFreq) * 0.75;
      this.playerLeftArm.rotation.x = swing;
      this.playerRightArm.rotation.x = -swing;
      this.playerLeftLeg.rotation.x = -swing;
      this.playerRightLeg.rotation.x = swing;

      // Subtle body bob
      this.playerTorso.position.y = 1.85 + Math.abs(Math.sin(time * strideFreq * 2)) * 0.08;
    } else {
      // Idle return
      this.playerLeftArm.rotation.x = THREE.MathUtils.lerp(this.playerLeftArm.rotation.x, 0, 12 * dt);
      this.playerRightArm.rotation.x = THREE.MathUtils.lerp(this.playerRightArm.rotation.x, 0, 12 * dt);
      this.playerLeftLeg.rotation.x = THREE.MathUtils.lerp(this.playerLeftLeg.rotation.x, 0, 12 * dt);
      this.playerRightLeg.rotation.x = THREE.MathUtils.lerp(this.playerRightLeg.rotation.x, 0, 12 * dt);
      this.playerTorso.position.y = THREE.MathUtils.lerp(this.playerTorso.position.y, 1.85, 12 * dt);
    }

    // Jumping tuck pose in air
    if (!this.isGrounded) {
      this.playerLeftArm.rotation.x = -0.6;
      this.playerRightArm.rotation.x = -0.6;
      this.playerLeftLeg.rotation.x = 0.4;
      this.playerRightLeg.rotation.x = 0.4;
    }
  }

  private checkSolidCollision(x: number, z: number, r: number): boolean {
    for (const obs of this.SOLID_OBSTACLES) {
      if (
        x + r > obs.minX &&
        x - r < obs.maxX &&
        z + r > obs.minZ &&
        z - r < obs.maxZ
      ) {
        return true;
      }
    }
    return false;
  }

  private checkVehicleCollisions(playerPos: THREE.Vector3) {
    for (const v of this.vehicles) {
      const dx = Math.abs(playerPos.x - v.mesh.position.x);
      const dz = Math.abs(playerPos.z - v.mesh.position.z);
      if (dx < 3.8 && dz < 2.0) {
        // Vehicle bump impulse — safely push player back to sidewalk
        const pushDir = playerPos.z > v.mesh.position.z ? 1 : -1;
        this.playerVelocity.z = pushDir * 12;
        this.playerVelocity.y = 4;
        this.isGrounded = false;
        (window as any).audioService?.playGlitch?.();
      }
    }
  }

  private updateTraffic() {
    this.vehicles.forEach(v => {
      v.mesh.position.x += v.speed;
      if (v.speed > 0 && v.mesh.position.x > v.endX) {
        v.mesh.position.x = v.startX;
      } else if (v.speed < 0 && v.mesh.position.x < v.endX) {
        v.mesh.position.x = v.startX;
      }
    });
  }

  private updatePedestrians() {
    this.pedestrians.forEach(p => {
      p.mesh.position.x += p.speed * p.dir;
      if (p.mesh.position.x > p.maxX) {
        p.dir = -1;
        p.mesh.rotation.y = Math.PI;
      } else if (p.mesh.position.x < p.minX) {
        p.dir = 1;
        p.mesh.rotation.y = 0;
      }
    });
  }

  private updateFountain(time: number) {
    if (!this.fountainParticles) return;
    const pos = this.fountainParticles.geometry.attributes['position'].array as Float32Array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] = 2.4 + Math.sin(time * 6 + i) * 1.6;
    }
    this.fountainParticles.geometry.attributes['position'].needsUpdate = true;
  }

  private updateBirdsEyeCamera() {
    if (!this.playerGroup) return;

    // Bird's-Eye Following Position
    const dist = this.cameraAngle.distance;
    const cx = this.playerGroup.position.x + dist * Math.sin(this.cameraAngle.yaw) * Math.cos(this.cameraAngle.pitch);
    const cy = this.playerGroup.position.y + dist * Math.sin(this.cameraAngle.pitch) + 4;
    const cz = this.playerGroup.position.z + dist * Math.cos(this.cameraAngle.yaw) * Math.cos(this.cameraAngle.pitch);

    this.camera.position.set(cx, cy, cz);
    this.camera.lookAt(
      this.playerGroup.position.x,
      this.playerGroup.position.y + 2,
      this.playerGroup.position.z
    );
  }

  // ─── 10. Proximity NPC Interaction ───────────────────────────────────────

  private checkProximityInteraction() {
    if (!this.playerGroup) return;
    const p = this.playerGroup.position;
    const npcs = [
      { id: 'rahul',   pos: new THREE.Vector3(-26, 0, 10) },
      { id: 'fatima',  pos: new THREE.Vector3(66, 0, 10) },
      { id: 'grandma', pos: new THREE.Vector3(20, 0, 26) },
      { id: 'kofi',    pos: new THREE.Vector3(15, 0, -20) },
      { id: 'elena',   pos: new THREE.Vector3(-15, 0, 26) },
      { id: 'yuki',    pos: new THREE.Vector3(52, 0, 26) }
    ];

    for (const npc of npcs) {
      if (p.distanceTo(npc.pos) < 6.0) {
        (window as any).audioService?.playSelect?.();
        gameStateManager.setCurrentCharacter(npc.id);
        dialogueManager.startDialogue(npc.id);
        return;
      }
    }
  }

  private updateProximityPrompt() {
    if (this.isDestroyed || !this.playerGroup) return;
    const p = this.playerGroup.position;
    const npcs = [
      { id: 'rahul',   name: 'Rahul',        pos: new THREE.Vector3(-26, 0, 10) },
      { id: 'fatima',  name: 'Fatima',       pos: new THREE.Vector3(66, 0, 10) },
      { id: 'grandma', name: 'Grandma Mira', pos: new THREE.Vector3(20, 0, 26) },
      { id: 'kofi',    name: 'Kofi',         pos: new THREE.Vector3(15, 0, -20) },
      { id: 'elena',   name: 'Elena',        pos: new THREE.Vector3(-15, 0, 26) },
      { id: 'yuki',    name: 'Yuki',         pos: new THREE.Vector3(52, 0, 26) }
    ];

    let nearNpc: typeof npcs[0] | null = null;
    for (const npc of npcs) {
      if (p.distanceTo(npc.pos) < 6.0) {
        nearNpc = npc;
        break;
      }
    }

    if (nearNpc) {
      if (!this.promptElement) {
        this.promptElement = document.createElement('div');
        this.promptElement.id = 'three-proximity-prompt';
        this.promptElement.style.cssText = `
          position: absolute;
          bottom: 120px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(15, 23, 42, 0.95);
          border: 2px solid #fbbf24;
          border-radius: 4px;
          padding: 8px 16px;
          color: #ffffff;
          font-family: var(--font-pixel);
          font-size: 11px;
          z-index: 50;
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
          pointer-events: none;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        `;
        this.container.appendChild(this.promptElement);
      }
      this.promptElement.innerHTML = `<span style="color:#fbbf24; background:#2d2033; padding:2px 6px; border-radius:3px; border:1px solid #fbbf24;">E</span> TALK TO ${nearNpc.name.toUpperCase()}`;
    } else {
      if (this.promptElement) {
        this.promptElement.remove();
        this.promptElement = null;
      }
    }
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
    this.promptElement?.remove();
    this.promptElement = null;
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
