import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function CombinedThreeBackground() {
  const mountRef = useRef(null);
  const isMobile = window.innerWidth <= 600;
  const isTablet = window.innerWidth > 600 && window.innerWidth <= 1024;
  const isDesktop = window.innerWidth > 1024;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    let camera, scene, renderer, effect, animationId;
    let sphere, plane;
    let raycaster, mouse;
    const start = Date.now();

    // Color palette for sphere hover effects
    const colorPalette = [
      0x3498DB, /* Professional Blue (trust, reliability) */
      0x2ECC71, /* Success Green (growth, positive action) */
      0xE67E22, /* Professional Orange (energy, creativity) */
      0x9B59B6, /* Corporate Purple (innovation, luxury) */
      0x1ABC9C, /* Teal (modern, sophisticated) */
      0xF1C40F, /* Gold Amber (warm attention, premium feel) */
      0xE74C3C, /* Alert Red (urgency, important actions) */
      0x34495E, /* Steel Blue (stability, trust) */
      0x16A085, /* Dark Turquoise (fresh, professional) */
      0x8E44AD, /* Deep Purple (premium, creative) */
      0x27AE60, /* Forest Green (natural, growth) */
      0xD35400  /* Dark Orange (confident, energetic) */

    ];
    
    let currentColorIndex = 0;
    let isHovering = false;

    if (isDesktop) {
      // ASCII EFFECT (Based on Three.js official example)
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      
      // Initialize raycaster and mouse
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      
      // Camera setup
      camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
      camera.position.y = 150;
      camera.position.z = 500;

      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0, 0, 0);

      const pointLight1 = new THREE.PointLight(0xffffff, 3, 0, 0);
      pointLight1.position.set(500, 500, 500);
      scene.add(pointLight1);

      const pointLight2 = new THREE.PointLight(0xffffff, 1, 0, 0);
      pointLight2.position.set(-500, -500, -500);
      scene.add(pointLight2);

      sphere = new THREE.Mesh(
        new THREE.SphereGeometry(200, 20, 10),
        new THREE.MeshPhongMaterial({ 
          flatShading: true,
          color: 0xffffff // Start with white
        })
      );
      scene.add(sphere);

      plane = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 400),
        new THREE.MeshBasicMaterial({ color: 0x000000})
      );
      plane.position.y = -100;
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);

      // Renderer setup
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);


      const canvas = renderer.domElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.display = 'block';
      canvas.style.filter = 'contrast(200%) brightness(150%)';
      
      mount.appendChild(canvas);

      // Mouse event handlers
      const onMouseMove = (event) => {
        const rect = mount.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(sphere);

        if (intersects.length > 0) {
          if (!isHovering) {
            isHovering = true;
            // Change to next color in palette
            currentColorIndex = (currentColorIndex + 1) % colorPalette.length;
            sphere.material.color.setHex(colorPalette[currentColorIndex]);
            mount.style.cursor = 'pointer';
          }
        } else {
          if (isHovering) {
            isHovering = false;
            // Reset to white when not hovering
            sphere.material.color.setHex(0x7F8C8D);
            mount.style.cursor = 'default';
          }
        }
      };

      mount.addEventListener('mousemove', onMouseMove);

      // Animation function 
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        const timer = Date.now() - start;
        
        // Sphere animations
        sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 200;
        sphere.rotation.x = timer * 0.0003;
        sphere.rotation.z = timer * 0.0002;
        
        renderer.render(scene, camera);
      };
      animate();

      // Resize handler
      const handleResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        mount.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        
        // Clean up geometries and materials
        if (sphere) {
          sphere.geometry.dispose();
          sphere.material.dispose();
        }
        if (plane) {
          plane.geometry.dispose();
          plane.material.dispose();
        }
        
        if (canvas && mount.contains(canvas)) {
          mount.removeChild(canvas);
        }
      };
    } else {
      // --- MOBILE/TABLET: Enhanced Particle System ---
      const width = mount.clientWidth;
      const height = mount.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
      camera.position.z = 60;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // Enhanced particle system
      const particles = [];
      const particleCount = 300;

      for (let i = 0; i < particleCount; i++) {
        // Create different particle types
        const particleType = Math.random();
        let sprite;
        
        if (particleType < 0.7) {
          // Regular particles
          const particleMaterial = new THREE.SpriteMaterial({
            color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.7, 0.8),
            opacity: 0.3 + Math.random() * 0.4,
            transparent: true
          });
          sprite = new THREE.Sprite(particleMaterial);
        } else {
          // Larger accent particles
          const particleMaterial = new THREE.SpriteMaterial({
            color: 0x00ff88,
            opacity: 0.6,
            transparent: true
          });
          sprite = new THREE.Sprite(particleMaterial);
          sprite.scale.setScalar(2);
        }

        // Position particles
        sprite.position.x = (Math.random() - 0.5) * 160;
        sprite.position.y = (Math.random() - 0.5) * 120;
        sprite.position.z = (Math.random() - 0.5) * 100;
        
        // Add movement properties
        sprite.userData = {
          velocityX: (Math.random() - 0.5) * 0.02,
          velocityY: (Math.random() - 0.5) * 0.02,
          velocityZ: (Math.random() - 0.5) * 0.01,
          originalOpacity: sprite.material.opacity,
          pulseSpeed: 0.001 + Math.random() * 0.003
        };

        scene.add(sprite);
        particles.push(sprite);
      }

      // Add some geometric shapes
      const shapes = [];
      for (let i = 0; i < 5; i++) {
        const geometry = new THREE.RingGeometry(2, 4, 8);
        const material = new THREE.MeshBasicMaterial({
          color: 0x00ff88,
          transparent: true,
          opacity: 0.1,
          side: THREE.DoubleSide
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 50
        );
        ring.userData = {
          rotationSpeed: 0.001 + Math.random() * 0.002
        };
        scene.add(ring);
        shapes.push(ring);
      }

      // Enhanced animation
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        const time = Date.now() * 0.001;

        particles.forEach((sprite, i) => {
          // Move particles
          sprite.position.x += sprite.userData.velocityX;
          sprite.position.y += sprite.userData.velocityY;
          sprite.position.z += sprite.userData.velocityZ;

          // Wrap around screen
          if (sprite.position.x > 80) sprite.position.x = -80;
          if (sprite.position.x < -80) sprite.position.x = 80;
          if (sprite.position.y > 60) sprite.position.y = -60;
          if (sprite.position.y < -60) sprite.position.y = 60;

          // Pulse opacity
          sprite.material.opacity = sprite.userData.originalOpacity + 
            Math.sin(time * sprite.userData.pulseSpeed + i) * 0.3;
        });

        shapes.forEach((shape) => {
          shape.rotation.z += shape.userData.rotationSpeed;
          shape.rotation.x += shape.userData.rotationSpeed * 0.5;
        });

        renderer.render(scene, camera);
      };
      animate();

      // Resize handler
      const handleResize = () => {
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        
        // Clean up particles
        particles.forEach(sprite => {
          if (sprite.material) sprite.material.dispose();
          if (scene && sprite) scene.remove(sprite);
        });
        
        // Clean up shapes
        shapes.forEach(shape => {
          if (shape.geometry) shape.geometry.dispose();
          if (shape.material) shape.material.dispose();
          if (scene && shape) scene.remove(shape);
        });
        
        if (mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return (
    <div 
      id="ascii-container" 
      ref={mountRef} 
      style={{
        width: '100%',
        height: '100vh',
        background: '#000',
        overflow: 'hidden'
      }}
    />
  );
}

export default CombinedThreeBackground;
