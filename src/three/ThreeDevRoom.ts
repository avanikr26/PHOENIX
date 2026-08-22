import * as THREE from 'three';

export class ThreeDevRoom {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private upstairsGroup!: THREE.Group;
  private downstairsGroup!: THREE.Group;

  // 3D Characters
  private designer!: THREE.Group;
  private designerLeftArm!: THREE.Mesh;
  private designerRightArm!: THREE.Mesh;
  private designerLeftLeg!: THREE.Mesh;
  private designerRightLeg!: THREE.Mesh;
  private phoneMesh!: THREE.Mesh;

  private grandma!: THREE.Group;

  private animFrameId?: number;
  private clock = new THREE.Clock();
  private isDestroyed = false;

  // Timeline / State control
  private currentPhase = 0; // 0: Typing, 1: Call, 2: Stand & Walk Door, 3: Downstairs entry, 4: Walk Grandma, 5: Done
  private phaseTimer = 0;
  private onCinematicDone?: () => void;

  constructor(containerId: string, onCinematicDone?: () => void) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found.`);
    this.container = el;
    this.onCinematicDone = onCinematicDone;

    this.init();
    this.buildUpstairsRoom();
    this.buildDownstairsRoom();
    this.createDesigner();
    this.createGrandma();
    
    // Start with upstairs active
    this.upstairsGroup.visible = true;
    this.downstairsGroup.visible = false;

    this.animate();

    console.log('🚪 3D Developer Room Cinematic Active (Real Shadows & Detailed Meshes)');
  }

  private init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0f172a); // dark blue-gray background

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 7, 16);
    this.camera.lookAt(0, 2, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.domElement.id = 'devroom-three-canvas';
    this.renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;';
    this.container.appendChild(this.renderer.domElement);

    // Warm Ambient Light
    const ambientLight = new THREE.AmbientLight(0xf8fafc, 0.4);
    this.scene.add(ambientLight);

    // Directional light from window
    const dirLight = new THREE.DirectionalLight(0x60a5fa, 0.6);
    dirLight.position.set(-8, 6, 4);
    this.scene.add(dirLight);

    this.upstairsGroup = new THREE.Group();
    this.downstairsGroup = new THREE.Group();
    this.scene.add(this.upstairsGroup);
    this.scene.add(this.downstairsGroup);

    window.addEventListener('resize', this.onResize);
  }

  private buildUpstairsRoom() {
    // Floor (Upstairs)
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.2, 10),
      new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.8 }) // dark tiles
    );
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    this.upstairsGroup.add(floor);

    // Back wall
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(12, 6, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x3f3f46 })
    );
    wall.position.set(0, 3, -5);
    this.upstairsGroup.add(wall);

    // Window with sky
    const windowFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 3.5, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x18181b })
    );
    windowFrame.position.set(0, 3.5, -4.9);
    this.upstairsGroup.add(windowFrame);
    
    const windowSky = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3, 3.3),
      new THREE.MeshBasicMaterial({ color: 0x0ea5e9 }) // blue sky outside
    );
    windowSky.position.set(0, 3.5, -4.8);
    this.upstairsGroup.add(windowSky);

    // Curtains
    const curtainL = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.6, 0.15), new THREE.MeshStandardMaterial({ color: 0x9f1239 }));
    curtainL.position.set(-1.3, 3.5, -4.75);
    this.upstairsGroup.add(curtainL);
    const curtainR = new THREE.Mesh(new THREE.BoxGeometry(0.6, 3.6, 0.15), new THREE.MeshStandardMaterial({ color: 0x9f1239 }));
    curtainR.position.set(1.3, 3.5, -4.75);
    this.upstairsGroup.add(curtainR);

    // Desk (upstairs)
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(3.6, 0.1, 2.0),
      new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.4 }) // wood
    );
    deskTop.position.set(-3.5, 1.4, -3);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    this.upstairsGroup.add(deskTop);

    // Desk Legs
    const legG = new THREE.BoxGeometry(0.15, 1.4, 0.15);
    const legM = new THREE.MeshStandardMaterial({ color: 0x27272a });
    [-4.9, -2.1].forEach(x => {
      [-3.8, -2.2].forEach(z => {
        const leg = new THREE.Mesh(legG, legM);
        leg.position.set(x, 0.7, z);
        leg.castShadow = true;
        this.upstairsGroup.add(leg);
      });
    });

    // Computer / Monitor (Glowing screen)
    const monitorBase = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.6), legM);
    monitorBase.position.set(-3.5, 1.45, -3.2);
    this.upstairsGroup.add(monitorBase);

    const monitorStand = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.6, 0.15), legM);
    monitorStand.position.set(-3.5, 1.7, -3.2);
    this.upstairsGroup.add(monitorStand);

    const screen = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.0, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x0ea5e9, emissive: 0x0ea5e9, emissiveIntensity: 0.6 }) // glowing screen
    );
    screen.position.set(-3.5, 2.3, -3.2);
    this.upstairsGroup.add(screen);

    // Keyboard & Mouse
    const kb = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 0.35), new THREE.MeshStandardMaterial({ color: 0xd4d4d8 }));
    kb.position.set(-3.5, 1.46, -2.5);
    this.upstairsGroup.add(kb);

    const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.05, 0.25), new THREE.MeshStandardMaterial({ color: 0xd4d4d8 }));
    mouse.position.set(-2.8, 1.46, -2.5);
    this.upstairsGroup.add(mouse);

    // Desk Lamp
    const lampBase = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.4), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    lampBase.position.set(-4.9, 1.46, -3.5);
    this.upstairsGroup.add(lampBase);
    
    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    lampStem.position.set(-4.9, 1.86, -3.5);
    this.upstairsGroup.add(lampStem);

    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.45, 0.4), new THREE.MeshStandardMaterial({ color: 0xd97706 }));
    lampShade.position.set(-4.9, 2.26, -3.5);
    this.upstairsGroup.add(lampShade);

    const lampLight = new THREE.PointLight(0xfef08a, 1.5, 8); // Warm light source
    lampLight.position.set(-4.9, 2.1, -3.5);
    lampLight.castShadow = true;
    this.upstairsGroup.add(lampLight);

    // Bed
    const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.8, 6.5), new THREE.MeshStandardMaterial({ color: 0x451a03 }));
    bedFrame.position.set(4, 0.4, -1.5);
    this.upstairsGroup.add(bedFrame);

    const mattress = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.6, 6.3), new THREE.MeshStandardMaterial({ color: 0xf5f5f5 }));
    mattress.position.set(4, 1.0, -1.5);
    this.upstairsGroup.add(mattress);

    const blanket = new THREE.Mesh(new THREE.BoxGeometry(3.35, 0.62, 4.5), new THREE.MeshStandardMaterial({ color: 0x4f46e5 }));
    blanket.position.set(4, 1.02, -0.6);
    this.upstairsGroup.add(blanket);

    const pillow = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.3, 1.2), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    pillow.position.set(4, 1.4, -4.0);
    this.upstairsGroup.add(pillow);

    // Shelves with books
    const shelf = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.1, 0.8), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    shelf.position.set(-3.5, 4.0, -4.8);
    this.upstairsGroup.add(shelf);

    const bookColors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b];
    for (let i = 0; i < 6; i++) {
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(0.18, 0.7, 0.6),
        new THREE.MeshStandardMaterial({ color: bookColors[i % bookColors.length] })
      );
      book.position.set(-4.5 + i * 0.3, 4.4, -4.7);
      book.castShadow = true;
      this.upstairsGroup.add(book);
    }
  }

  private buildDownstairsRoom() {
    // Floor (Downstairs living room)
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(12, 0.2, 10),
      new THREE.MeshStandardMaterial({ color: 0x3f2f2f, roughness: 0.9 }) // reddish carpet/tiles
    );
    floor.position.set(0, 0, 0);
    floor.receiveShadow = true;
    this.downstairsGroup.add(floor);

    // Back wall
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(12, 6, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x52525b })
    );
    wall.position.set(0, 3, -5);
    this.downstairsGroup.add(wall);

    // Sofa/Armchair
    const sofaSeat = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.6, 1.8), new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.6 })); // Blue sofa
    sofaSeat.position.set(0.5, 0.6, 0);
    sofaSeat.castShadow = true;
    this.downstairsGroup.add(sofaSeat);

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(4.0, 1.4, 0.5), new THREE.MeshStandardMaterial({ color: 0x1e3a8a }));
    sofaBack.position.set(0.5, 1.3, -0.65);
    this.downstairsGroup.add(sofaBack);

    // Coffee table
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.1, 1.2), new THREE.MeshStandardMaterial({ color: 0x78350f }));
    tableTop.position.set(0.5, 0.6, 2.0);
    tableTop.castShadow = true;
    this.downstairsGroup.add(tableTop);
    
    // Coffee table legs
    [-0.6, 1.6].forEach(x => {
      [1.5, 2.5].forEach(z => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.1), new THREE.MeshStandardMaterial({ color: 0x27272a }));
        leg.position.set(x, 0.3, z);
        this.downstairsGroup.add(leg);
      });
    });

    const teaCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.15), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    teaCup.position.set(0.5, 0.72, 2.0);
    this.downstairsGroup.add(teaCup);

    // Cozy lamp
    const lampLight = new THREE.PointLight(0xfef08a, 1.4, 10);
    lampLight.position.set(-4.5, 3.5, -2);
    lampLight.castShadow = true;
    this.downstairsGroup.add(lampLight);
  }

  private createDesigner() {
    this.designer = new THREE.Group();

    // Body (torso)
    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 1.1, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x10b981 }) // Teal jacket
    );
    torso.position.set(0, 1.15, 0);
    torso.castShadow = true;
    this.designer.add(torso);

    // Head (avatar config)
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.7, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xfbd38d }) // Warm skin
    );
    head.position.set(0, 2.05, 0);
    head.castShadow = true;
    this.designer.add(head);

    // Hair
    const hair = new THREE.Mesh(
      new THREE.BoxGeometry(0.76, 0.4, 0.76),
      new THREE.MeshStandardMaterial({ color: 0xa855f7 }) // Purple hair
    );
    hair.position.set(0, 2.3, 0);
    this.designer.add(hair);

    // Left Arm
    this.designerLeftArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.9, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x10b981 })
    );
    this.designerLeftArm.position.set(-0.58, 1.15, 0);
    this.designerLeftArm.castShadow = true;
    this.designer.add(this.designerLeftArm);

    // Right Arm
    this.designerRightArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.9, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x10b981 })
    );
    this.designerRightArm.position.set(0.58, 1.15, 0);
    this.designerRightArm.castShadow = true;
    this.designer.add(this.designerRightArm);

    // Left Leg
    this.designerLeftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.8, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 }) // Dark pants
    );
    this.designerLeftLeg.position.set(-0.22, 0.4, 0);
    this.designerLeftLeg.castShadow = true;
    this.designer.add(this.designerLeftLeg);

    // Right Leg
    this.designerRightLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.8, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 })
    );
    this.designerRightLeg.position.set(0.22, 0.4, 0);
    this.designerRightLeg.castShadow = true;
    this.designer.add(this.designerRightLeg);

    // Phone mesh (starts invisible, attached to right arm)
    this.phoneMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.24, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6 }) // blue mobile phone
    );
    this.phoneMesh.position.set(0, -0.4, 0.1);
    this.phoneMesh.visible = false;
    this.designerRightArm.add(this.phoneMesh);

    // Set initial position (sitting at desk, facing left towards screen)
    this.designer.position.set(-3.5, 0.5, -1.8);
    this.designer.rotation.set(0, -Math.PI / 2, 0); // facing screen
    this.upstairsGroup.add(this.designer);

    // chair (sitting designer sits on it)
    const chair = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 0.9), new THREE.MeshStandardMaterial({ color: 0x374151 }));
    chair.position.set(-3.5, 0.7, -1.8);
    chair.castShadow = true;
    this.upstairsGroup.add(chair);
  }

  private createGrandma() {
    this.grandma = new THREE.Group();

    // Cardigan (Warm orange)
    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 1.0, 0.5),
      new THREE.MeshStandardMaterial({ color: 0xd97706 }) // Orange cardigan
    );
    torso.position.set(0, 1.0, 0);
    this.grandma.add(torso);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.65, 0.65),
      new THREE.MeshStandardMaterial({ color: 0xfed7aa }) // warm skin
    );
    head.position.set(0, 1.75, 0);
    this.grandma.add(head);

    // Hair bun
    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), new THREE.MeshStandardMaterial({ color: 0xcbd5e1 }));
    bun.position.set(0, 2.1, -0.1);
    this.grandma.add(bun);

    // Position sitting on sofa downstairs
    this.grandma.position.set(0.5, 0.5, 0.1);
    this.downstairsGroup.add(this.grandma);
  }

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

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    this.updateTimeline(delta, time);
    this.renderer.render(this.scene, this.camera);
  };

  private updateTimeline(delta: number, time: number) {
    this.phaseTimer += delta;

    switch (this.currentPhase) {
      case 0: // Typing phase
        // Animate designer's hands typing (rotations)
        this.designerLeftArm.rotation.x = Math.sin(time * 16) * 0.15 - Math.PI / 6;
        this.designerRightArm.rotation.x = Math.cos(time * 14) * 0.15 - Math.PI / 6;
        
        if (this.phaseTimer > 4.5) {
          // Go to call phase
          this.currentPhase = 1;
          this.phaseTimer = 0;
          this.phoneMesh.visible = true; // phone appears in hand
          (window as any).audioService?.playGlitch?.(); // buzz sound
        }
        break;

      case 1: // Call/reaction phase
        // Raise arm to head
        this.designerRightArm.rotation.x = THREE.MathUtils.lerp(this.designerRightArm.rotation.x, -Math.PI * 0.8, 5 * delta);
        this.designerRightArm.rotation.y = THREE.MathUtils.lerp(this.designerRightArm.rotation.y, -Math.PI * 0.1, 5 * delta);
        this.designerLeftArm.rotation.x = THREE.MathUtils.lerp(this.designerLeftArm.rotation.x, 0, 5 * delta);

        if (this.phaseTimer > 3.0) {
          this.currentPhase = 2;
          this.phaseTimer = 0;
        }
        break;

      case 2: // Stand & walk to door
        // Stand up & rotate to face back door/stairs (facing right)
        this.designer.rotation.y = THREE.MathUtils.lerp(this.designer.rotation.y, Math.PI / 2, 4 * delta);
        this.designer.position.y = THREE.MathUtils.lerp(this.designer.position.y, 0.7, 4 * delta); // stand up

        // Translate towards door (X: 3.5, Z: 2)
        if (this.phaseTimer > 0.8) {
          this.designer.position.x += 2.8 * delta;
          this.designer.position.z += 1.5 * delta;

          // Leg swings to represent walking
          this.designerLeftLeg.rotation.x = Math.sin(time * 12) * 0.45;
          this.designerRightLeg.rotation.x = -Math.sin(time * 12) * 0.45;
        }

        // Camera follow
        this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, this.designer.position.x * 0.5, 2 * delta);

        if (this.phaseTimer > 3.2) {
          // Transition to downstairs!
          this.currentPhase = 3;
          this.phaseTimer = 0;
          
          this.upstairsGroup.visible = false;
          this.downstairsGroup.visible = true;
          
          // Place designer at the downstairs entry point (left side, X: -4.5, Z: 2)
          this.designer.position.set(-4.5, 0.5, 2);
          this.designer.rotation.set(0, Math.PI / 2, 0); // facing right towards Grandma
          this.downstairsGroup.add(this.designer);

          // Reset legs
          this.designerLeftLeg.rotation.x = 0;
          this.designerRightLeg.rotation.x = 0;

          // Camera setup for downstairs
          this.camera.position.set(-2, 5, 12);
          this.camera.lookAt(0.5, 1, 0);
        }
        break;

      case 3: // Walk to Grandma
        // Walk towards Grandma sitting at X: 0.5, Z: 0.1 (we stop at X: -1.2, Z: 1.0)
        const targetX = -1.5;
        const targetZ = 1.0;

        if (this.designer.position.x < targetX) {
          this.designer.position.x += 2.0 * delta;
          this.designer.position.z = THREE.MathUtils.lerp(this.designer.position.z, targetZ, 2 * delta);
          
          this.designerLeftLeg.rotation.x = Math.sin(time * 10) * 0.4;
          this.designerRightLeg.rotation.x = -Math.sin(time * 10) * 0.4;
        } else {
          // Stop walking
          this.designerLeftLeg.rotation.x = 0;
          this.designerRightLeg.rotation.x = 0;
          
          // Lower phone arm
          this.designerRightArm.rotation.set(0, 0, 0);
          this.phoneMesh.visible = false;

          // Go to final dialogue trigger phase
          this.currentPhase = 4;
          this.phaseTimer = 0;

          if (this.onCinematicDone) {
            this.onCinematicDone();
          }
        }

        // Camera smooth frame
        this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, 0, 1.5 * delta);
        this.camera.lookAt(0, 1.2, 0.5);
        break;

      case 4: // Conversation state
        // Idle bobbing
        this.designer.position.y = 0.5 + Math.sin(time * 2) * 0.02;
        this.grandma.position.y = 0.5 + Math.cos(time * 1.5) * 0.01;
        break;
    }
  }

  public destroy() {
    this.isDestroyed = true;
    window.removeEventListener('resize', this.onResize);
    
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
