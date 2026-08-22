import * as THREE from 'three';

export class ThreeTitleBG {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  
  private floatingObjects: THREE.Group[] = [];
  private gridHelper!: THREE.GridHelper;
  private animFrameId?: number;
  private isDestroyed = false;

  private mouse = { x: 0, y: 0 };
  private targetCameraPos = new THREE.Vector3(0, 5, 20);
  private currentCameraPos = new THREE.Vector3(0, 5, 20);

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found.`);
    this.container = el;

    this.init();
    this.createBackgroundObjects();
    this.setupInput();
    this.animate();

    console.log('🎨 3D Title Landing Page Background Active');
  }

  private init() {
    this.scene = new THREE.Scene();
    
    // Muted deep blue-purple background representing digital canvas
    this.scene.background = new THREE.Color(0x111122);
    this.scene.fog = new THREE.FogExp2(0x111122, 0.04);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(0, 2, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.domElement.id = 'title-three-canvas';
    this.renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
    this.container.appendChild(this.renderer.domElement);

    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0x7c5cbf, 0.5); // soft purple ambient
    this.scene.add(ambientLight);

    // Warm Accent Spotlight
    const spotLight = new THREE.SpotLight(0xf5f0e8, 2.5);
    spotLight.position.set(10, 20, 10);
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    this.scene.add(spotLight);

    const dirLight = new THREE.DirectionalLight(0xc9a84c, 1.2); // Warm gold keylight
    dirLight.position.set(-10, 10, 5);
    this.scene.add(dirLight);

    window.addEventListener('resize', this.onResize);
  }

  private createBackgroundObjects() {
    // 1. Bottom wireframe grid represent design canvas
    this.gridHelper = new THREE.GridHelper(50, 40, 0xc9a84c, 0x2e2033);
    this.gridHelper.position.y = -4;
    this.scene.add(this.gridHelper);

    // 2. Spawn floating UI elements (cards, form inputs, buttons)
    const cardGeom = new THREE.BoxGeometry(4.5, 3.0, 0.1);
    const inputGeom = new THREE.BoxGeometry(3.5, 0.6, 0.1);
    const btnGeom = new THREE.BoxGeometry(1.2, 0.5, 0.15);
    
    // Curated design card materials
    const materials = [
      new THREE.MeshStandardMaterial({ color: 0x2d2033, roughness: 0.2, metalness: 0.1 }), // Warm purple-gray
      new THREE.MeshStandardMaterial({ color: 0x3b2f4a, roughness: 0.3, metalness: 0.15 }), // Lighter purple
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.1, metalness: 0.2 }), // Dark slate blue
      new THREE.MeshStandardMaterial({ color: 0x7c5cbf, roughness: 0.4, metalness: 0.05 }), // Soft violet accent
      new THREE.MeshStandardMaterial({ color: 0x4a7a9e, roughness: 0.2, metalness: 0.3 })  // Blue card
    ];

    // Card 1: Large UI Container card
    const card1 = new THREE.Group();
    const bgMesh = new THREE.Mesh(cardGeom, materials[0]);
    card1.add(bgMesh);
    // Add two inputs on top of the card
    const inp1 = new THREE.Mesh(inputGeom, materials[2]);
    inp1.position.set(0, 0.5, 0.08);
    card1.add(inp1);
    const inp2 = new THREE.Mesh(inputGeom, materials[2]);
    inp2.position.set(0, -0.5, 0.08);
    card1.add(inp2);
    // Add a button on the card
    const btn = new THREE.Mesh(btnGeom, new THREE.MeshStandardMaterial({ color: 0xc9a84c, emissive: 0xc9a84c, emissiveIntensity: 0.1 }));
    btn.position.set(1.1, -1.1, 0.1);
    card1.add(btn);

    card1.position.set(-5, 4, -4);
    card1.rotation.set(0.1, 0.3, -0.05);
    this.scene.add(card1);
    this.floatingObjects.push(card1);

    // Card 2: Medium Sidebar card
    const card2 = new THREE.Group();
    const bgMesh2 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 4.5, 0.1), materials[1]);
    card2.add(bgMesh2);
    const tag1 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.1), materials[3]);
    tag1.position.set(0, 1.4, 0.08);
    card2.add(tag1);
    const tag2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.1), materials[4]);
    tag2.position.set(0, 0.6, 0.08);
    card2.add(tag2);

    card2.position.set(6, 3, -6);
    card2.rotation.set(-0.15, -0.3, 0.1);
    this.scene.add(card2);
    this.floatingObjects.push(card2);

    // Card 3: Floating dialog card
    const card3 = new THREE.Group();
    const bgMesh3 = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.0, 0.1), materials[4]);
    card3.add(bgMesh3);
    const check1 = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.3, 0.08), materials[2]);
    check1.position.set(0, 0.2, 0.08);
    card3.add(check1);

    card3.position.set(0, 7, -10);
    card3.rotation.set(0.2, -0.1, 0.0);
    this.scene.add(card3);
    this.floatingObjects.push(card3);

    // 3. Floating abstract wireframe shapes (Representing UI grids/elements)
    const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x6b5c7c, wireframe: true });
    
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.3, 8, 24), wireframeMat);
    ring.position.set(-8, 8, -12);
    this.scene.add(ring);
    const ringGroup = new THREE.Group().add(ring);
    this.floatingObjects.push(ringGroup);

    const sphere = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), wireframeMat);
    sphere.position.set(9, 9, -14);
    this.scene.add(sphere);
    const sphereGroup = new THREE.Group().add(sphere);
    this.floatingObjects.push(sphereGroup);

    // 4. Procedural pointing cursor arrow
    const cursor = new THREE.Group();
    const cursorMat = new THREE.MeshStandardMaterial({ color: 0xf5f0e8, roughness: 0.1 });
    const pointer = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.2, 3), cursorMat);
    pointer.rotation.set(0, 0, Math.PI / 6);
    cursor.add(pointer);
    cursor.position.set(-1, 3, -1);
    this.scene.add(cursor);
    this.floatingObjects.push(cursor);
  }

  private setupInput() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  private onMouseMove = (e: MouseEvent) => {
    // Range: [-1, 1]
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Shift camera position target
    this.targetCameraPos.x = this.mouse.x * 3.5;
    this.targetCameraPos.y = 5 + this.mouse.y * 2.0;
    this.targetCameraPos.z = 20 - Math.abs(this.mouse.x) * 2.0;
  };

  private onResize = () => {
    if (this.isDestroyed || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private animate = () => {
    if (this.isDestroyed) return;
    this.animFrameId = requestAnimationFrame(this.animate);

    const time = Date.now() * 0.001;

    // Smooth camera lerp for parallax
    this.currentCameraPos.lerp(this.targetCameraPos, 0.04);
    this.camera.position.copy(this.currentCameraPos);
    this.camera.lookAt(0, 4, -4);

    // Floating objects sine-wave movement
    this.floatingObjects.forEach((obj, idx) => {
      const offset = idx * 1.5;
      obj.position.y += Math.sin(time * 0.8 + offset) * 0.004;
      obj.rotation.x += Math.sin(time * 0.2 + offset) * 0.0005;
      obj.rotation.y += Math.cos(time * 0.3 + offset) * 0.0008;
    });

    this.renderer.render(this.scene, this.camera);
  };

  public destroy() {
    this.isDestroyed = true;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('resize', this.onResize);
    
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
