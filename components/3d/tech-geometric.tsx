"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function TechGeometricCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const currentMount = mountRef.current;
    if (!currentMount) return;

    try {
      // 1. Scene, Camera, Renderer
      const width = currentMount.clientWidth || 300;
      const height = currentMount.clientHeight || 300;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.z = 4.2;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      currentMount.appendChild(renderer.domElement);

      // 2. Geometry: Elegant Icosahedron with Wireframe outer cage
      const innerGeom = new THREE.IcosahedronGeometry(1.2, 0);
      const innerMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.2,
        metalness: 0.9,
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      scene.add(innerMesh);

      // Outer Wireframe Cage
      const outerGeom = new THREE.IcosahedronGeometry(1.5, 1);
      const outerMat = new THREE.MeshBasicMaterial({
        color: 0x3b82f6,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const outerMesh = new THREE.Mesh(outerGeom, outerMat);
      scene.add(outerMesh);

      // Ring Orbit
      const ringGeom = new THREE.TorusGeometry(1.9, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x60a5fa,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      scene.add(ringMesh);

      // 3. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const blueLight = new THREE.PointLight(0x3b82f6, 4, 10);
      blueLight.position.set(2, 3, 4);
      scene.add(blueLight);

      const purpleLight = new THREE.PointLight(0x8b5cf6, 3, 10);
      purpleLight.position.set(-3, -2, 2);
      scene.add(purpleLight);

      // 4. Pointer Interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        const rect = currentMount.getBoundingClientRect();
        const x = event.clientX - rect.left - width / 2;
        const y = event.clientY - rect.top - height / 2;
        targetX = (x / width) * 1.5;
        targetY = (y / height) * 1.5;
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 5. Animation Loop
      let animationFrameId: number;
      const animate = () => {
        if (!prefersReducedMotion) {
          innerMesh.rotation.x += 0.003;
          innerMesh.rotation.y += 0.005;

          outerMesh.rotation.x -= 0.004;
          outerMesh.rotation.y -= 0.003;

          ringMesh.rotation.z += 0.002;

          // Smooth mouse follow
          mouseX += (targetX - mouseX) * 0.05;
          mouseY += (targetY - mouseY) * 0.05;

          scene.rotation.y = mouseX;
          scene.rotation.x = mouseY;
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      // Resize observer
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newW = entry.contentRect.width;
          const newH = entry.contentRect.height;
          if (newW > 0 && newH > 0) {
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
          }
        }
      });
      resizeObserver.observe(currentMount);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("mousemove", handleMouseMove);
        resizeObserver.disconnect();
        if (currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
        innerGeom.dispose();
        innerMat.dispose();
        outerGeom.dispose();
        outerMat.dispose();
        ringGeom.dispose();
        ringMat.dispose();
        renderer.dispose();
      };
    } catch (e) {
      console.warn("WebGL not available, fallback used:", e);
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-40 h-40 rounded-full border-2 border-dashed border-blue-500/40 animate-spin flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl border border-blue-500/60 rotate-45 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[280px] flex items-center justify-center relative cursor-grab active:cursor-grabbing"
      aria-hidden="true"
    />
  );
}

