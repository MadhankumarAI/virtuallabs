import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useMediaQuery } from '@mui/material';

function CombinedThreeBackground() {
  const mountRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:1024px)');
  const isDesktop = useMediaQuery('(min-width:1025px)');

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Clear previous content if any (in case of resizing and re-rendering)
    while (mount.firstChild) {
      mount.removeChild(mount.firstChild);
    }

    // Scene, camera, renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    camera.position.z = 5;

    // If mobile or tablet, show particle system, else show solid color background
    if (isMobile || isTablet) {
      // Particle system setup (from ThreeBackground.jsx)

      const particleCount = 800;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200;
        positions[i + 1] = (Math.random() - 0.5) * 150;
        positions[i + 2] = (Math.random() - 0.5) * 100;
      }
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5,
        transparent: true,
        opacity: 0.6,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // Animation loop for particles
      let animationId;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.001;
        const time = Date.now() * 0.005;
        particles.material.opacity = 0.3 + 0.3 * Math.sin(time);
        renderer.render(scene, camera);
      };
      animate();

      // Resize handler
      const handleResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    } else {
      // Desktop: solid color background from ResponsiveThreeJsBackground.jsx
      scene.background = new THREE.Color(0x0000ff); // blue background for desktop

      // Minimal animation loop
      let animationId;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    }
  }, [isMobile, isTablet, isDesktop]);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1, // behind all content
      }}
    />
  );
}

export default CombinedThreeBackground;
