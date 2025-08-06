import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const particlesRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    // Initialize Three.js
    const initThreeJS = () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      
      // Ensure canvas fills the container
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      
      canvasRef.current.appendChild(renderer.domElement);

      // Create particle system with more particles and better distribution
      const geometry = new THREE.BufferGeometry();
      const particleCount = 800; // Increased particle count
      const positions = new Float32Array(particleCount * 3);

      // Better distribution to cover entire screen
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 200; // Increased spread
        positions[i + 1] = (Math.random() - 0.5) * 150; // Increased spread
        positions[i + 2] = (Math.random() - 0.5) * 100;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.5, // Slightly larger particles
        transparent: true,
        opacity: 0.6
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 50;

      // Store references
      sceneRef.current = scene;
      rendererRef.current = renderer;
      particlesRef.current = particles;
      cameraRef.current = camera;
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (particlesRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
        particlesRef.current.rotation.x += 0.0005;
        particlesRef.current.rotation.y += 0.001;

        // Pulse effect
        const time = Date.now() * 0.005;
        particlesRef.current.material.opacity = 0.3 + 0.3 * Math.sin(time);

        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    // Window resize handler
    const onWindowResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    // Initialize and start animation
    initThreeJS();
    animate();

    // Add event listener for window resize
    window.addEventListener('resize', onWindowResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (rendererRef.current && canvasRef.current) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div id="canvas-container" ref={canvasRef}></div>;
};

export default ThreeBackground;