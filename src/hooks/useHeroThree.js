import { useEffect } from 'react';
import * as THREE from 'three';

/**
 * Subtle particle field driven by mouse position.
 * GPU instanced via BufferGeometry — cheap on main thread.
 * Wrapped in try/catch so any WebGL/shader failure degrades silently
 * (canvas stays transparent, rest of UI renders normally).
 */
export function useHeroThree(canvasRef, accentRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer, scene, camera, geom, mat, pts, ro, raf, onMove;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 6;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (err) {
      console.warn('[hero-three] WebGL init failed, skipping particle layer:', err);
      return;
    }

    // Particles
    const COUNT = 1200;
    const positions = new Float32Array(COUNT * 3);
    const offsets = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const r = 2 + Math.random() * 5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(p) * Math.cos(t);
      positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t);
      positions[i * 3 + 2] = r * Math.cos(p) * 0.6;
      offsets[i] = Math.random() * Math.PI * 2;
    }
    geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('aOff', new THREE.BufferAttribute(offsets, 1));

    const accentColor = accentRef?.current || '#E8743C';
    mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(accentColor) },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aOff;
        uniform float uTime;
        uniform vec2 uMouse;
        varying float vAlpha;
        void main() {
          vec3 p = position;
          float wave = sin(uTime * 0.7 + aOff) * 0.18;
          p.x += wave * 0.6;
          p.y += cos(uTime * 0.5 + aOff * 1.3) * 0.18;
          p.xy += uMouse * 0.4 * (1.0 - smoothstep(0.0, 6.0, length(p.xy)));
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = 2.2 * (300.0 / -mv.z);
          gl_Position = projectionMatrix * mv;
          vAlpha = 0.45 + 0.55 * smoothstep(6.0, 2.0, -mv.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float d = length(c);
          float a = smoothstep(0.5, 0.0, d) * vAlpha;
          gl_FragColor = vec4(uColor, a * 0.55);
        }
      `,
    });

    pts = new THREE.Points(geom, mat);
    scene.add(pts);

    // Mouse
    const mouse = new THREE.Vector2(0, 0);
    onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove);

    // Resize
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Animate
    const start = performance.now();
    const tick = () => {
      try {
        const t = (performance.now() - start) / 1000;
        mat.uniforms.uTime.value = t;
        mat.uniforms.uMouse.value.lerp(mouse, 0.08);
        pts.rotation.z = t * 0.02;
        renderer.render(scene, camera);
      } catch (err) {
        console.warn('[hero-three] render error:', err);
        cancelAnimationFrame(raf);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    if (!reduceMotion) tick();
    else {
      try { renderer.render(scene, camera); } catch (err) { console.warn(err); }
    }

    return () => {
      cancelAnimationFrame(raf);
      if (onMove) window.removeEventListener('pointermove', onMove);
      if (ro) ro.disconnect();
      if (geom) geom.dispose();
      if (mat) mat.dispose();
      if (renderer) renderer.dispose();
    };
  }, [canvasRef, accentRef]);
}
