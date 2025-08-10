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
    let vantaEffect;
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
      // --- MOBILE/TABLET: Vanta.js NET Effect ---
      
      // Load Three.js and Vanta.js scripts dynamically
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
          }
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      const initializeVanta = async () => {
        try {
          // Load required scripts
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js');
          
          // Wait a bit for scripts to fully load
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Initialize Vanta effect
          if (window.VANTA && window.VANTA.NET) {
            vantaEffect = window.VANTA.NET({
              el: mount,
              mouseControls: true,
              touchControls: true,
              gyroControls: true,
              minHeight: 1000.00,
              minWidth: 1000.00,
              scale: 2.00,
              scaleMobile: 2.00,
              // color: 0x1ABC9C,
              color:0x34495E,
              backgroundColor: 0x000000,
              points: 10,
              maxDistance: 20,
              spacing: 15
            });
          }
        } catch (error) {
          console.error('Failed to load Vanta.js:', error);
          // Fallback to a simple background
          mount.style.background = 'linear-gradient(135deg, #000428 0%, #c8cbc8ff 100%)';
        }
      };

      initializeVanta();

      return () => {
        // Clean up Vanta effect
        if (vantaEffect && typeof vantaEffect.destroy === 'function') {
          vantaEffect.destroy();
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