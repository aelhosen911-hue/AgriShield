/**
 * AgriShield (AgroVision) - 3D Interactive Plant Anatomy & AI Scanning Engine
 * Powered by Three.js WebGL & OrbitControls
 */

class AgriShield3DScene {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();

    // Mode Flags
    this.isExploded = false;
    this.isLaserScannerActive = true;
    this.isParticlesActive = true;
    this.isSporeActive = false;
    this.isAutoRotate = false;
    this.currentMode = 'consolidated'; // 'consolidated', 'exploded', 'gallery', 'seedling'

    // Groups & Objects
    this.plantGroup = new THREE.Group();
    this.explodedGroup = new THREE.Group();
    this.galleryGroup = new THREE.Group();
    this.seedlingGroup = new THREE.Group();
    this.cardsGroup = new THREE.Group();
    this.laserGroup = new THREE.Group();
    this.particlesGroup = new THREE.Group();
    this.connectorLines = [];
    this.interactiveObjects = [];

    // Raycaster for hover/clicks
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.hoveredObject = null;

    // Camera tween targets
    this.targetCameraPos = new THREE.Vector3(0, 1.2, 5.8);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);

    // Callbacks
    this.onSelectOrgan = null;

    this.init();
  }

  init() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x020705);
    this.scene.fog = new THREE.FogExp2(0x020705, 0.08);

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 1.2, 5.8);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('three-canvas'),
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    if (this.renderer.toneMapping !== undefined) {
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;
    }

    // 4. OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxDistance = 14;
      this.controls.minDistance = 1.5;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't flip below ground
    }

    // 5. Lighting
    this.setupLights();

    // 6. Futuristic Environment Platform
    this.setupEnvironment();

    // 7. Load Plant Models / Textured Layers
    this.loadTexturedAssets();

    // 8. Setup Particles (Microclimate, Nutrient flow, Spores)
    this.setupParticles();

    // 9. Setup Holographic Laser Scanner
    this.setupLaserScanner();

    // 10. Event Listeners
    this.bindEvents();

    // 11. Start Animation Loop
    this.animate();
  }

  setupLights() {
    // Ambient light with botanical green tint
    const ambientLight = new THREE.AmbientLight(0x103a22, 1.5);
    this.scene.add(ambientLight);

    // Key sunlight matching the project photos (top left sunlight rays)
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.8);
    sunLight.position.set(-6, 8, 4);
    this.scene.add(sunLight);

    // Cyan fill light for Edge AI / cyber look
    const cyanLight = new THREE.PointLight(0x06b6d4, 2.2, 15);
    cyanLight.position.set(-3, 2, 2);
    this.scene.add(cyanLight);

    // Golden warm light for soil and rhizosphere
    const soilLight = new THREE.PointLight(0xf59e0b, 1.8, 12);
    soilLight.position.set(3, -1.5, 2);
    this.scene.add(soilLight);

    // Neon green rim light
    const rimLight = new THREE.DirectionalLight(0x00ff88, 1.2);
    rimLight.position.set(0, -4, -3);
    this.scene.add(rimLight);
  }

  setupEnvironment() {
    // Ground Grid with cyber emerald lines
    const gridHelper = new THREE.GridHelper(16, 32, 0x10b981, 0x062816);
    gridHelper.position.y = -1.8;
    this.scene.add(gridHelper);

    // Concentric Holographic Rings on the floor
    const ringGeo1 = new THREE.RingGeometry(2.4, 2.45, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4
    });
    const floorRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    floorRing1.rotation.x = Math.PI / 2;
    floorRing1.position.y = -1.78;
    this.scene.add(floorRing1);

    const ringGeo2 = new THREE.RingGeometry(4.2, 4.28, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    this.floorRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    this.floorRing2.rotation.x = Math.PI / 2;
    this.floorRing2.position.y = -1.78;
    this.scene.add(this.floorRing2);
  }

  loadTexturedAssets() {
    const textureLoader = new THREE.TextureLoader();

    // Helper to create glossy border frame
    const createFrame = (w, h, color = 0x10b981) => {
      const edges = new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, h));
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.7 })
      );
      return line;
    };

    // ==========================================
    // 1. Consolidated Full Plant Plane
    // ==========================================
    textureLoader.load('assets/plant_anatomy_clean.jpg', (tex) => {
      tex.minFilter = THREE.LinearFilter;
      const w = 4.8;
      const h = 2.7;
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1
      });
      this.fullPlantMesh = new THREE.Mesh(geo, mat);
      this.fullPlantMesh.position.set(0, 0, 0);
      this.fullPlantMesh.userData = {
        name: 'AgriShield Integrated Organism',
        tag: 'Full Plant Architecture',
        desc: 'Holistic plant model showing interconnected foliar, vascular, and rhizosphere subsystems monitored by multimodal AI.',
        metrics: { 'Organ Integrity': '98.4%', 'Foliar Index': 'Normal', 'Soil Uptake': 'Optimal' }
      };
      this.plantGroup.add(this.fullPlantMesh);
      this.fullPlantMesh.add(createFrame(w, h, 0x10b981));
      this.interactiveObjects.push(this.fullPlantMesh);
    });

    this.scene.add(this.plantGroup);

    // ==========================================
    // 2. Exploded 3D Organs (Leaves, Stem, Roots)
    // ==========================================
    // Leaves (Foliar Canopy)
    textureLoader.load('assets/part_leaves.jpg', (tex) => {
      const w = 2.4;
      const h = 1.8;
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1
      });
      this.leavesMesh = new THREE.Mesh(geo, mat);
      this.leavesMesh.position.set(-2.2, 0.4, 0.8);
      this.leavesMesh.rotation.y = 0.25;
      this.leavesMesh.userData = {
        name: 'Foliar Canopy & Epidermis',
        tag: 'Vision Diagnostic Tier',
        desc: 'Monitored by edge convolutional networks. Leaf stomata and cuticle are first line of defense against fungal spore germination.',
        metrics: { 'Chlorophyll Index': '84.2 SPAD', 'Lesion Coverage': '0.0%', 'Transpiration': 'Stable' }
      };
      this.leavesMesh.add(createFrame(w, h, 0x00ff88));
      this.explodedGroup.add(this.leavesMesh);
      this.interactiveObjects.push(this.leavesMesh);
    });

    // Stem Center & Cross Section
    textureLoader.load('assets/part_stem.jpg', (tex) => {
      const w = 1.4;
      const h = 1.8;
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1
      });
      this.stemMesh = new THREE.Mesh(geo, mat);
      this.stemMesh.position.set(0, 0, 0);
      this.stemMesh.userData = {
        name: 'Vascular Stem & Shoot Junction',
        tag: 'Transport Architecture',
        desc: 'Central vascular highway transmitting water and nutrients from roots, and photosynthesis carbohydrates to systemic sinks.',
        metrics: { 'Xylem Pressure': '-0.42 MPa', 'Sap Velocity': '2.1 cm/min', 'Vascular Health': '99.1%' }
      };
      this.stemMesh.add(createFrame(w, h, 0x06b6d4));
      this.explodedGroup.add(this.stemMesh);
      this.interactiveObjects.push(this.stemMesh);
    });

    // Roots & Rhizosphere
    textureLoader.load('assets/part_roots.jpg', (tex) => {
      const w = 2.4;
      const h = 1.8;
      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({
        map: tex,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.1
      });
      this.rootsMesh = new THREE.Mesh(geo, mat);
      this.rootsMesh.position.set(2.2, -0.4, -0.8);
      this.rootsMesh.rotation.y = -0.25;
      this.rootsMesh.userData = {
        name: 'Rhizosphere & Root System',
        tag: 'Soil Titration Tier',
        desc: 'Root hair network absorbing moisture and calibrated NPK minerals. Analyzed by the deterministic fertilizer calculation engine.',
        metrics: { 'Soil pH': '6.4 Optimal', 'Active Root Area': '14.8 m²', 'NPK Uptake': 'Calibrated' }
      };
      this.rootsMesh.add(createFrame(w, h, 0xf59e0b));
      this.explodedGroup.add(this.rootsMesh);
      this.interactiveObjects.push(this.rootsMesh);
    });

    // Start with exploded group invisible until triggered
    this.explodedGroup.visible = false;
    this.scene.add(this.explodedGroup);

    // ==========================================
    // 3. Floating 3D Microscopic Diagnostic Cards
    // ==========================================
    const cardData = [
      {
        path: 'assets/card_foliar_leaf.jpg',
        pos: [-2.5, 1.8, 1.0],
        targetPos: [-2.2, 0.4, 0.8],
        name: 'Foliar Micro-Surface',
        tag: 'Card 1 • Cellular Zoom',
        desc: 'Microscopic inspection of leaf stomata and epidermal cellular wall under AI vision scanner.',
        metrics: { 'Pathogen Ingress': 'Negative', 'Cell Turgor': 'High' }
      },
      {
        path: 'assets/card_stem_joint.jpg',
        pos: [-0.9, 1.6, 0.5],
        targetPos: [-0.3, 0.3, 0],
        name: 'Shoot Node & Branch Junction',
        tag: 'Card 2 • Morphology',
        desc: 'Structural pivot point supporting leaf expansion and bidirectional phloem transport.',
        metrics: { 'Lignin Density': 'Optimal', 'Stress Level': 'Nominal' }
      },
      {
        path: 'assets/card_stem_cross_section.jpg',
        pos: [0.0, -1.4, 1.2],
        targetPos: [0, 0, 0],
        name: 'Stem Cross-Section Rings',
        tag: 'Card 3 • Cellular Matrix',
        desc: 'Honeycomb cellular arrangement exhibiting pith parenchyma and vascular cambium integrity.',
        metrics: { 'Cellular Density': 'Uniform', 'Necrosis Risk': 'Zero' }
      },
      {
        path: 'assets/card_vascular_bundle.jpg',
        pos: [1.1, 1.6, 0.5],
        targetPos: [0.3, -0.1, 0],
        name: 'Vascular Bundles (Xylem & Phloem)',
        tag: 'Card 4 • Internal Fluidics',
        desc: 'Microscopic fluid conduits driving transpiration pull and systemic mineral assimilation.',
        metrics: { 'Flow Resistance': 'Low', 'Conductivity': '98.7%' }
      },
      {
        path: 'assets/card_roots_rhizosphere.jpg',
        pos: [2.5, -1.3, 0.8],
        targetPos: [2.2, -0.4, -0.8],
        name: 'Underground Root Hairs',
        tag: 'Card 5 • Rhizosphere',
        desc: 'Dynamic soil interface exchanging nutrients and maintaining plant drought resilience.',
        metrics: { 'Rhizosphere Moisture': '68%', 'Mycorrhizal Status': 'Active' }
      }
    ];

    cardData.forEach((item) => {
      textureLoader.load(item.path, (tex) => {
        const cardGeo = new THREE.PlaneGeometry(0.85, 0.85);
        const cardMat = new THREE.MeshStandardMaterial({
          map: tex,
          side: THREE.DoubleSide,
          roughness: 0.2,
          metalness: 0.2
        });
        const cardMesh = new THREE.Mesh(cardGeo, cardMat);
        cardMesh.position.set(...item.pos);
        cardMesh.userData = {
          name: item.name,
          tag: item.tag,
          desc: item.desc,
          metrics: item.metrics,
          targetPos: item.targetPos
        };

        // Glowing border around card
        cardMesh.add(createFrame(0.85, 0.85, 0x06b6d4));

        this.cardsGroup.add(cardMesh);
        this.interactiveObjects.push(cardMesh);

        // Create glowing 3D connector line to organ
        const lineMat = new THREE.LineDashedMaterial({
          color: 0x06b6d4,
          dashSize: 0.1,
          gapSize: 0.05,
          transparent: true,
          opacity: 0.6
        });
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...item.pos),
          new THREE.Vector3(...item.targetPos)
        ]);
        const line = new THREE.Line(lineGeo, lineMat);
        line.computeLineDistances();
        this.cardsGroup.add(line);
        this.connectorLines.push({ line, item });
      });
    });

    this.scene.add(this.cardsGroup);

    // ==========================================
    // 4. 3D Cylindrical Photo Gallery Mode
    // ==========================================
    const galleryImages = [
      { path: 'assets/plant_cards_overview.jpg', title: 'Infographic Analytical Breakdown', tag: 'Microscopic Zoom' },
      { path: 'assets/plant_seedling_hero.jpg', title: 'Seedling Germination Emergence', tag: 'Growth Stage 1' },
      { path: 'assets/plant_anatomy_clean.jpg', title: 'Organism Dissected Architecture', tag: 'Full Organ Anatomy' },
      { path: 'assets/plant_biology_quote.jpg', title: 'Botanical Living Definition', tag: 'Academic Context' }
    ];

    const radius = 3.6;
    galleryImages.forEach((g, idx) => {
      const angle = (idx / galleryImages.length) * Math.PI * 2;
      textureLoader.load(g.path, (tex) => {
        const w = 2.4;
        const h = 1.35;
        const geo = new THREE.PlaneGeometry(w, h);
        const mat = new THREE.MeshStandardMaterial({
          map: tex,
          side: THREE.DoubleSide,
          roughness: 0.3
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(Math.sin(angle) * radius, 0, Math.cos(angle) * radius);
        mesh.rotation.y = angle + Math.PI;
        mesh.userData = {
          name: g.title,
          tag: g.tag,
          desc: 'High-resolution AgriShield empirical visual asset. Click to inspect full resolution in lightbox.',
          metrics: { 'Resolution': '1600x900 UHD', 'Aspect': '16:9 Standard' }
        };
        mesh.add(createFrame(w, h, 0x10b981));
        this.galleryGroup.add(mesh);
        this.interactiveObjects.push(mesh);
      });
    });

    this.galleryGroup.visible = false;
    this.scene.add(this.galleryGroup);
  }

  setupParticles() {
    // 1. Microclimate Moisture Mist (Blue/Cyan particles floating around canopy)
    const mistCount = 800;
    const mistGeo = new THREE.BufferGeometry();
    const mistPositions = new Float32Array(mistCount * 3);
    const mistSpeeds = new Float32Array(mistCount);

    for (let i = 0; i < mistCount; i++) {
      mistPositions[i * 3] = (Math.random() - 0.5) * 8;
      mistPositions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      mistPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      mistSpeeds[i] = 0.2 + Math.random() * 0.5;
    }

    mistGeo.setAttribute('position', new THREE.BufferAttribute(mistPositions, 3));
    this.mistMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    this.mistParticles = new THREE.Points(mistGeo, this.mistMaterial);
    this.mistSpeeds = mistSpeeds;
    this.particlesGroup.add(this.mistParticles);

    // 2. Vascular Nutrient Flow Particles (Green rising from roots through stem)
    const flowCount = 300;
    const flowGeo = new THREE.BufferGeometry();
    const flowPositions = new Float32Array(flowCount * 3);
    for (let i = 0; i < flowCount; i++) {
      flowPositions[i * 3] = 2.0 - (i / flowCount) * 4.0; // from root x=2 to leaves x=-2
      flowPositions[i * 3 + 1] = -0.4 + (i / flowCount) * 0.8 + (Math.random() - 0.5) * 0.2;
      flowPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPositions, 3));
    this.flowMaterial = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    this.flowParticles = new THREE.Points(flowGeo, this.flowMaterial);
    this.particlesGroup.add(this.flowParticles);

    // 3. Spore Outbreak Cloud (Amber/Red particles)
    const sporeCount = 400;
    const sporeGeo = new THREE.BufferGeometry();
    const sporePositions = new Float32Array(sporeCount * 3);
    for (let i = 0; i < sporeCount; i++) {
      sporePositions[i * 3] = -2.0 + (Math.random() - 0.5) * 2.0;
      sporePositions[i * 3 + 1] = 0.5 + (Math.random() - 0.5) * 1.5;
      sporePositions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
    }
    sporeGeo.setAttribute('position', new THREE.BufferAttribute(sporePositions, 3));
    this.sporeMaterial = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.05,
      transparent: true,
      opacity: 0.0, // Hidden until toggled
      blending: THREE.AdditiveBlending
    });
    this.sporeParticles = new THREE.Points(sporeGeo, this.sporeMaterial);
    this.particlesGroup.add(this.sporeParticles);

    this.scene.add(this.particlesGroup);
  }

  setupLaserScanner() {
    // Vertical Glowing Laser Plane
    const laserGeo = new THREE.PlaneGeometry(0.04, 3.2);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x00ff88,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    this.laserBeam = new THREE.Mesh(laserGeo, laserMat);
    this.laserBeam.position.set(0, 0, 0.05);

    // Laser Glow Curtain
    const curtainGeo = new THREE.PlaneGeometry(0.6, 3.2);
    const curtainMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending
    });
    this.laserCurtain = new THREE.Mesh(curtainGeo, curtainMat);
    this.laserCurtain.position.set(-0.25, 0, 0.04);
    this.laserBeam.add(this.laserCurtain);

    // Target Bounding Reticles in 3D
    const reticleGeo = new THREE.RingGeometry(0.18, 0.2, 32);
    const reticleMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8
    });
    this.reticle1 = new THREE.Mesh(reticleGeo, reticleMat);
    this.reticle1.position.set(-1.8, 0.6, 0.1);

    this.reticle2 = new THREE.Mesh(reticleGeo, reticleMat);
    this.reticle2.position.set(-1.2, -0.2, 0.1);

    this.laserGroup.add(this.laserBeam);
    this.laserGroup.add(this.reticle1);
    this.laserGroup.add(this.reticle2);

    this.scene.add(this.laserGroup);
  }

  bindEvents() {
    window.addEventListener('resize', () => this.onWindowResize());

    const canvas = this.renderer.domElement;
    canvas.addEventListener('mousemove', (e) => this.onMouseMove(e));
    canvas.addEventListener('click', (e) => this.onClick(e));

    // Touch support
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
        this.triggerSelection();
      }
    });
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  onMouseMove(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast for hover cursor
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const visibleObjects = this.interactiveObjects.filter(obj => obj.parent && obj.parent.visible);
    const intersects = this.raycaster.intersectObjects(visibleObjects, false);

    if (intersects.length > 0) {
      document.body.style.cursor = 'pointer';
      this.hoveredObject = intersects[0].object;
    } else {
      document.body.style.cursor = 'default';
      this.hoveredObject = null;
    }
  }

  onClick(event) {
    this.triggerSelection();
  }

  triggerSelection() {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const visibleObjects = this.interactiveObjects.filter(obj => obj.parent && obj.parent.visible);
    const intersects = this.raycaster.intersectObjects(visibleObjects, false);

    if (intersects.length > 0) {
      const selected = intersects[0].object;
      if (selected.userData && selected.userData.name) {
        // Move camera smoothly towards selected item
        const wp = new THREE.Vector3();
        selected.getWorldPosition(wp);
        this.setCameraTarget(wp.x, wp.y, wp.z + 2.2, wp.x, wp.y, wp.z);

        if (this.onSelectOrgan) {
          this.onSelectOrgan(selected.userData);
        }
      }
    }
  }

  setCameraTarget(cx, cy, cz, tx = 0, ty = 0, tz = 0) {
    this.targetCameraPos.set(cx, cy, cz);
    this.targetLookAt.set(tx, ty, tz);
  }

  // Preset Views
  setPreset(preset) {
    switch (preset) {
      case 'overview':
        this.plantGroup.visible = true;
        this.explodedGroup.visible = false;
        this.cardsGroup.visible = true;
        this.galleryGroup.visible = false;
        this.setCameraTarget(0, 1.2, 5.8, 0, 0, 0);
        break;

      case 'exploded':
        this.plantGroup.visible = false;
        this.explodedGroup.visible = true;
        this.cardsGroup.visible = true;
        this.galleryGroup.visible = false;
        this.setCameraTarget(0, 1.4, 6.2, 0, 0, 0);
        break;

      case 'leaves':
        this.plantGroup.visible = false;
        this.explodedGroup.visible = true;
        this.cardsGroup.visible = true;
        this.galleryGroup.visible = false;
        this.setCameraTarget(-2.2, 0.6, 3.2, -2.0, 0.4, 0.8);
        break;

      case 'stem':
        this.plantGroup.visible = false;
        this.explodedGroup.visible = true;
        this.cardsGroup.visible = true;
        this.galleryGroup.visible = false;
        this.setCameraTarget(0, 0.2, 2.6, 0, 0, 0);
        break;

      case 'roots':
        this.plantGroup.visible = false;
        this.explodedGroup.visible = true;
        this.cardsGroup.visible = true;
        this.galleryGroup.visible = false;
        this.setCameraTarget(2.2, -0.3, 3.4, 2.2, -0.4, -0.8);
        break;

      case 'gallery':
        this.plantGroup.visible = false;
        this.explodedGroup.visible = false;
        this.cardsGroup.visible = false;
        this.galleryGroup.visible = true;
        this.setCameraTarget(0, 0.4, 5.2, 0, 0, 0);
        break;
    }
  }

  toggleExplode() {
    this.isExploded = !this.isExploded;
    this.setPreset(this.isExploded ? 'exploded' : 'overview');
    return this.isExploded;
  }

  toggleLaserScanner() {
    this.isLaserScannerActive = !this.isLaserScannerActive;
    this.laserGroup.visible = this.isLaserScannerActive;
    return this.isLaserScannerActive;
  }

  toggleParticles() {
    this.isParticlesActive = !this.isParticlesActive;
    this.particlesGroup.visible = this.isParticlesActive;
    return this.isParticlesActive;
  }

  toggleSporeOutbreak() {
    this.isSporeActive = !this.isSporeActive;
    this.sporeMaterial.opacity = this.isSporeActive ? 0.75 : 0.0;
    return this.isSporeActive;
  }

  toggleAutoRotate() {
    this.isAutoRotate = !this.isAutoRotate;
    if (this.controls) {
      this.controls.autoRotate = this.isAutoRotate;
      this.controls.autoRotateSpeed = 1.4;
    }
    return this.isAutoRotate;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    // Smooth Camera Transition (LERP)
    if (this.camera && this.controls) {
      this.camera.position.lerp(this.targetCameraPos, 0.05);
      this.controls.target.lerp(this.targetLookAt, 0.05);
      this.controls.update();
    }

    // 1. Gentle Floating Plant Breathing
    if (this.fullPlantMesh && this.plantGroup.visible) {
      this.fullPlantMesh.position.y = Math.sin(time * 1.5) * 0.06;
    }

    // 2. Exploded Group subtle organ hovering
    if (this.explodedGroup.visible) {
      if (this.leavesMesh) this.leavesMesh.position.y = 0.4 + Math.sin(time * 2.0) * 0.04;
      if (this.stemMesh) this.stemMesh.position.y = Math.cos(time * 1.8) * 0.03;
      if (this.rootsMesh) this.rootsMesh.position.y = -0.4 + Math.sin(time * 1.6) * 0.04;
    }

    // 3. Floating Microscopic Cards Hovering & Facing Camera
    if (this.cardsGroup.visible) {
      this.cardsGroup.children.forEach((child, i) => {
        if (child.isMesh) {
          child.position.y += Math.sin(time * 2 + i) * 0.0008;
          // Subtly face camera
          child.quaternion.copy(this.camera.quaternion);
        }
      });
    }

    // 4. Laser Scanner Sweep Animation
    if (this.isLaserScannerActive && this.laserBeam) {
      const scanX = Math.sin(time * 2.2) * 2.3;
      this.laserBeam.position.x = scanX;

      // Pulse reticles
      if (this.reticle1) {
        this.reticle1.scale.setScalar(1 + Math.sin(time * 5) * 0.15);
      }
      if (this.reticle2) {
        this.reticle2.scale.setScalar(1 + Math.cos(time * 5) * 0.15);
      }
    }

    // 5. Particles Physics Updates
    if (this.isParticlesActive) {
      // Mist floating
      if (this.mistParticles) {
        const positions = this.mistParticles.geometry.attributes.position.array;
        for (let i = 0; i < positions.length / 3; i++) {
          positions[i * 3 + 1] += Math.sin(time + i) * 0.002;
          positions[i * 3] += Math.cos(time * 0.5 + i) * 0.001;
        }
        this.mistParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Vascular Nutrient Flow upward movement (root -> leaves)
      if (this.flowParticles) {
        const fPos = this.flowParticles.geometry.attributes.position.array;
        for (let i = 0; i < fPos.length / 3; i++) {
          fPos[i * 3] -= 0.015; // Move leftwards along plant axis
          if (fPos[i * 3] < -2.4) {
            fPos[i * 3] = 2.2; // Loop back to root zone
          }
        }
        this.flowParticles.geometry.attributes.position.needsUpdate = true;
      }

      // Spore swirling (if active)
      if (this.isSporeActive && this.sporeParticles) {
        this.sporeParticles.rotation.y = time * 0.4;
      }
    }

    // 6. Environment Holographic Rings Rotation
    if (this.floorRing2) {
      this.floorRing2.rotation.z = time * 0.1;
    }

    // 7. Gallery Carousel Spin in Gallery Mode
    if (this.galleryGroup.visible && !this.controls.state) {
      this.galleryGroup.rotation.y = time * 0.12;
    }

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  }
}

// Global instantiation helper
window.initAgriShield3D = function(containerId) {
  return new AgriShield3DScene(containerId);
};
