'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene / Camera / Renderer ────────────────────────────────────────────
    const scene = new THREE.Scene();
    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particles ────────────────────────────────────────────────────────────
    const PARTICLE_COUNT = 220;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = [];
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 60;
      const z = (Math.random() - 0.5) * 40;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      velocities.push({
        x: (Math.random() - 0.5) * 0.018,
        y: (Math.random() - 0.5) * 0.012,
        z: 0,
      });
      sizes[i] = Math.random() > 0.85 ? 0.55 : 0.22;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Custom shader material for glow effect
    const particleMat = new THREE.ShaderMaterial({
      uniforms: {
        uColor1: { value: new THREE.Color(0x38bdf8) },
        uColor2: { value: new THREE.Color(0x22d3ee) },
        uTime:   { value: 0 },
      },
      vertexShader: `
        attribute float size;
        uniform float uTime;
        varying float vDepth;
        void main() {
          vDepth = (position.z + 20.0) / 40.0;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying float vDepth;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float d = length(uv);
          if (d > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.0, 0.5, d);
          // inner glow
          float glow = exp(-d * 6.0) * 0.8;
          vec3 col = mix(uColor1, uColor2, vDepth);
          gl_FragColor = vec4(col, (alpha + glow) * 0.75);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particleMesh);

    // ── Connection lines ──────────────────────────────────────────────────────
    const MAX_CONNECTIONS = 350;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors    = new Float32Array(MAX_CONNECTIONS * 6);

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // ── Floating roof-truss triangles ─────────────────────────────────────────
    const TRIANGLE_COUNT = 12;
    const triangles = [];
    for (let i = 0; i < TRIANGLE_COUNT; i++) {
      const size = 1.5 + Math.random() * 3.5;
      const geo = new THREE.BufferGeometry();
      const h = (size * Math.sqrt(3)) / 2;
      const pts = new Float32Array([
        0,    h * 0.66, 0,
       -size * 0.5, -h * 0.33, 0,
        size * 0.5, -h * 0.33, 0,
        0,    h * 0.66, 0,
      ]);
      geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
      const mat = new THREE.LineBasicMaterial({
        color: Math.random() > 0.5 ? 0x38bdf8 : 0x22d3ee,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Line(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 90,
        (Math.random() - 0.5) * 55,
        (Math.random() - 0.5) * 25,
      );
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.userData = {
        rotSpeed: (Math.random() - 0.5) * 0.003,
        floatSpeed: 0.0008 + Math.random() * 0.001,
        floatAmp:   3 + Math.random() * 4,
        floatOff:   Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      triangles.push(mesh);
    }

    // ── Mouse parallax ────────────────────────────────────────────────────────
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 12;
      mouseY = (e.clientY / window.innerHeight - 0.5) * -8;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Resize ────────────────────────────────────────────────────────────────
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    const CONNECT_DIST = 14;
    let animId;
    let t = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.012;

      particleMat.uniforms.uTime.value = t;

      // Move particles
      const pos = particleGeo.attributes.position.array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        if (Math.abs(pos[i * 3])     > 52) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 32) velocities[i].y *= -1;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Build connections
      let connIdx = 0;
      const lp = lineGeo.attributes.position.array;
      const lc = lineGeo.attributes.color.array;
      for (let a = 0; a < PARTICLE_COUNT && connIdx < MAX_CONNECTIONS; a++) {
        for (let b = a + 1; b < PARTICLE_COUNT && connIdx < MAX_CONNECTIONS; b++) {
          const dx = pos[a * 3]     - pos[b * 3];
          const dy = pos[a * 3 + 1] - pos[b * 3 + 1];
          const dz = pos[a * 3 + 2] - pos[b * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.6;
            const base = connIdx * 6;
            lp[base]     = pos[a * 3];     lp[base + 1] = pos[a * 3 + 1]; lp[base + 2] = pos[a * 3 + 2];
            lp[base + 3] = pos[b * 3];     lp[base + 4] = pos[b * 3 + 1]; lp[base + 5] = pos[b * 3 + 2];
            // cyan to blue gradient
            lc[base]     = 0.13; lc[base + 1] = 0.74 * alpha; lc[base + 2] = 0.98 * alpha;
            lc[base + 3] = 0.13; lc[base + 4] = 0.74 * alpha; lc[base + 5] = 0.98 * alpha;
            connIdx++;
          }
        }
      }
      lineGeo.setDrawRange(0, connIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate    = true;

      // Float triangles
      for (const tri of triangles) {
        const { rotSpeed, floatSpeed, floatAmp, floatOff } = tri.userData;
        tri.rotation.z += rotSpeed;
        tri.position.y += Math.sin(t * floatSpeed * 80 + floatOff) * floatAmp * 0.001;
      }

      // Camera parallax
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
