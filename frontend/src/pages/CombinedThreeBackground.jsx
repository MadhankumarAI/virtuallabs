import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { AsciiEffect } from "three/examples/jsm/effects/AsciiEffect";
import { useMediaQuery } from "@mui/material";

function CombinedThreeBackground() {
  const mountRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isTablet = useMediaQuery("(min-width: 601px) and (max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    while (mount.firstChild) mount.removeChild(mount.firstChild);

    let camera, scene, renderer, effect, animationId;
    let sphere, plane;
    const start = Date.now();

    if (isDesktop) {
      // ASCII EFFECT (Based on Three.js official example)
      const width = mount.clientWidth;
      const height = mount.clientHeight;

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
        new THREE.MeshPhongMaterial({ flatShading: true })
      );
      scene.add(sphere);

      
      plane = new THREE.Mesh(
        new THREE.PlaneGeometry(400, 400),
        new THREE.MeshBasicMaterial({ color: 0xe0e0e0 })
      );
      plane.position.y = -100;
      plane.rotation.x = -Math.PI / 2;
      scene.add(plane);

      // Renderer setup
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);

      effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
      effect.setSize(width, height);
      effect.domElement.style.color = 'white';
      effect.domElement.style.backgroundColor = 'black';
      effect.domElement.style.width = '100%';
      effect.domElement.style.height = '100%';
      effect.domElement.style.display = 'block';
      effect.domElement.style.fontFamily = 'monospace';
      effect.domElement.style.fontSize = '12px';
      effect.domElement.style.lineHeight = '12px';
      

      // Append to mount
      mount.appendChild(effect.domElement);

      // Animation function 
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        
        const timer = Date.now() - start;
        
        // Sphere animations - xhabges req can be done here
        sphere.position.y = Math.abs(Math.sin(timer * 0.002)) * 200;
        sphere.rotation.x = timer * 0.0003;
        sphere.rotation.z = timer * 0.0002;
        
        
        effect.render(scene, camera);
      };
      animate();

      // Resize handler
      const handleResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
        effect.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
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
        
        if (effect.domElement && mount.contains(effect.domElement)) {
          mount.removeChild(effect.domElement);
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
  }, [isMobile, isTablet, isDesktop]);

  return (
    <div id="ascii-container" ref={mountRef} />
  );
}

export default CombinedThreeBackground;