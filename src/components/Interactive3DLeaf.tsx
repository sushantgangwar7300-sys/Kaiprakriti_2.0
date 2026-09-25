import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Eye, RotateCcw, Zap, Layers, Compass, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

interface Interactive3DLeafProps {
  onInspectNode?: (nodeName: string) => void;
}

export const Interactive3DLeaf: React.FC<Interactive3DLeafProps> = ({
  onInspectNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [activeNode, setActiveNode] = useState<string>('Prakriti Core (प्रकृति)');
  const [pulseActive, setPulseActive] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = false; // Lightweight optimization
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Sovereign Electric Palette
    const primaryEmerald = 0x10e7b2;
    const deepForest = 0x054d37;
    const electricCyan = 0x06b6d4;
    const statutoryGold = 0xf59e0b;

    // 2. Procedural Sovereign Leaf Geometry
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, -2.5);
    leafShape.bezierCurveTo(1.7, -1.5, 2.3, 0.5, 0, 2.7);
    leafShape.bezierCurveTo(-2.3, 0.5, -1.7, -1.5, 0, -2.5);

    const extrudeSettings = {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };

    const leafGeometry = new THREE.ExtrudeGeometry(leafShape, extrudeSettings);
    // Add subtle curvature along Z
    const posAttr = leafGeometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      const arch = Math.sin((y + 2.5) / 5.2 * Math.PI) * (1 - Math.abs(x) / 2.6) * 0.4;
      posAttr.setZ(i, posAttr.getZ(i) + arch);
    }
    leafGeometry.computeVertexNormals();

    const leafMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x0a3b2a,
      emissive: 0x04281c,
      roughness: 0.28,
      metalness: 0.25,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      wireframe: wireframeMode,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.94,
    });

    const leafMesh = new THREE.Mesh(leafGeometry, leafMaterial);
    rootGroup.add(leafMesh);

    // 3. Central Glowing Energy Vein
    const veinCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.5, 0.12),
      new THREE.Vector3(0.04, -1.0, 0.28),
      new THREE.Vector3(-0.04, 0.6, 0.32),
      new THREE.Vector3(0, 2.6, 0.12),
    ]);
    const veinGeo = new THREE.TubeGeometry(veinCurve, 28, 0.05, 6, false);
    const veinMat = new THREE.MeshStandardMaterial({
      color: primaryEmerald,
      emissive: primaryEmerald,
      emissiveIntensity: 0.8,
      roughness: 0.1,
      metalness: 0.9,
    });
    const mainVein = new THREE.Mesh(veinGeo, veinMat);
    rootGroup.add(mainVein);

    // 4. Orbiting Carbon Regulatory Rings (Dual Ring System)
    const ringGeo1 = new THREE.TorusGeometry(3.1, 0.018, 12, 80);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: electricCyan,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.3;
    ring1.rotation.y = Math.PI / 6;
    rootGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(3.35, 0.015, 12, 80);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: statutoryGold,
      transparent: true,
      opacity: 0.4,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.2;
    ring2.rotation.z = Math.PI / 5;
    rootGroup.add(ring2);

    // 5. Four Empirical Measurement Data Nodes
    const nodeLabels = [
      { name: 'Scope 1 (Direct)', angle: 0, color: statutoryGold },
      { name: 'Scope 2 (Grid CEA)', angle: Math.PI / 2, color: electricCyan },
      { name: 'Scope 3 (Supply Chain)', angle: Math.PI, color: primaryEmerald },
      { name: 'Verification Gate (BEE / ISO)', angle: Math.PI * 1.5, color: 0x38bdf8 },
    ];

    nodeLabels.forEach((item) => {
      const nodeGeo = new THREE.SphereGeometry(0.15, 12, 12);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: item.color,
        emissive: item.color,
        emissiveIntensity: 0.8,
        roughness: 0.1,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      const radius = 3.1;
      nodeMesh.position.set(
        Math.cos(item.angle) * radius,
        Math.sin(item.angle) * radius * 0.4,
        Math.sin(item.angle) * radius * 0.7
      );
      rootGroup.add(nodeMesh);
    });

    // 6. Lightweight Photosynthetic / Carbon Particle Swarm (Reduced count for instant performance)
    const particleCount = 80;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(primaryEmerald);
    const c2 = new THREE.Color(electricCyan);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * 2.4;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const mixed = c1.clone().lerp(c2, Math.random());
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    rootGroup.add(particles);

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(primaryEmerald, 2.0, 10);
    pointLight.position.set(0, 0, 2.5);
    scene.add(pointLight);

    // Mouse Interaction (Dampened)
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (!isDragging) {
        targetRotationY = x * 0.55;
        targetRotationX = -y * 0.35;
      } else {
        const deltaMove = {
          x: e.clientX - previousMousePosition.x,
          y: e.clientY - previousMousePosition.y,
        };
        rootGroup.rotation.y += deltaMove.x * 0.008;
        rootGroup.rotation.x += deltaMove.y * 0.008;
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        rootGroup.rotation.y += (targetRotationY - rootGroup.rotation.y) * 0.05;
        rootGroup.rotation.x += (targetRotationX - rootGroup.rotation.x) * 0.05;
      }

      // Gentle floating
      leafMesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.1;
      leafMesh.position.y = Math.sin(elapsedTime * 1.3) * 0.08;

      // Orbiting rings
      ring1.rotation.z = elapsedTime * 0.3;
      ring2.rotation.z = -elapsedTime * 0.25;

      // Swirl particles
      particles.rotation.y = elapsedTime * 0.06;

      if (pulseActive) {
        const pulse = 1 + Math.sin(elapsedTime * 14) * 0.07;
        leafMesh.scale.set(pulse, pulse, pulse);
        pointLight.intensity = 2.8 + Math.sin(elapsedTime * 14) * 1.2;
      } else {
        leafMesh.scale.set(1, 1, 1);
        pointLight.intensity = 1.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
        }
      }
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      resizeObserver.disconnect();
      renderer.dispose();
      leafGeometry.dispose();
      leafMaterial.dispose();
      veinGeo.dispose();
      veinMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [wireframeMode, pulseActive]);

  const triggerPulse = () => {
    setPulseActive(true);
    setTimeout(() => setPulseActive(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      
      {/* 3D WebGL Canvas Card */}
      <div className="relative w-full h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl border border-slate-800 bg-gradient-to-b from-[#0B132B] to-[#060A14] overflow-hidden flex items-center justify-center shadow-2xl">
        
        {/* Ambient radial glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(circle at center, rgba(16, 231, 178, 0.14) 0%, rgba(6, 10, 20, 0) 70%)',
          }}
        />

        {/* 3D Canvas */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing"
          title="Drag to rotate 3D Prakriti Leaf & Orbiting Carbon Rings"
        />

        {/* Minimal Non-Intrusive Canvas Header Badge (Top-Left) */}
        <div className="absolute top-3.5 left-3.5 pointer-events-none">
          <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-slate-900/80 backdrop-blur-md text-[11px] font-mono font-medium text-emerald-300 flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>3D Carbon Flow Engine</span>
          </div>
        </div>

        {/* Subtle Canvas Interaction Hint (Top-Right) */}
        <div className="absolute top-3.5 right-3.5 pointer-events-none">
          <div className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur-md text-[10px] font-mono text-slate-400">
            <span>Drag to rotate</span>
          </div>
        </div>

        {/* Interactive Controls Pill at Bottom of Canvas */}
        <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setWireframeMode(!wireframeMode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                wireframeMode
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Toggle mathematical wireframe"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{wireframeMode ? 'Solid' : 'Mesh'}</span>
            </button>

            <button
              onClick={triggerPulse}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                pulseActive
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
              title="Trigger carbon absorption pulse"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Pulse</span>
            </button>
          </div>

          <div className="pointer-events-none hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Prakriti Core (प्रकृति)</span>
          </div>
        </div>

      </div>

      {/* Responsive Scope Milestones Grid - Placed cleanly BELOW the canvas so they NEVER overlap on mobile or tablet! */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
        <button
          onClick={() => onInspectNode?.('Scope 1 & 2 Metering')}
          className="p-3 rounded-2xl border border-slate-800 bg-[#0B1120] hover:border-emerald-500/50 hover:bg-slate-900 transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-emerald-400 text-[11px]">01. SCOPE 1 & 2</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 opacity-60 group-hover:opacity-100" />
          </div>
          <span className="text-slate-400 text-[10px] block mt-0.5">Fuel & CEA Grid baseline</span>
        </button>

        <button
          onClick={() => onInspectNode?.('Scope 3 Supply Chain')}
          className="p-3 rounded-2xl border border-slate-800 bg-[#0B1120] hover:border-cyan-500/50 hover:bg-slate-900 transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-400 text-[11px]">02. SCOPE 3 (15 CATS)</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 opacity-60 group-hover:opacity-100" />
          </div>
          <span className="text-slate-400 text-[10px] block mt-0.5">Tier-1 MSME primary data</span>
        </button>

        <button
          onClick={() => onInspectNode?.('Independent Verification')}
          className="p-3 rounded-2xl border border-slate-800 bg-[#0B1120] hover:border-amber-500/50 hover:bg-slate-900 transition-all text-left group"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-400 text-[11px]">03. VERIFIER FIREWALL</span>
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 opacity-60 group-hover:opacity-100" />
          </div>
          <span className="text-slate-400 text-[10px] block mt-0.5">Zero self-audit conflict</span>
        </button>
      </div>

    </div>
  );
};
