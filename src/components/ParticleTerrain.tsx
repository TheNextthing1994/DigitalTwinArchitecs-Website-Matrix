import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleTerrain: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 2000);
    camera.position.set(0, 150, 400);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles setup
    const SEPARATION = 5;
    const AMOUNTX = 120;
    const AMOUNTY = 120;

    const numParticles = AMOUNTX * AMOUNTY;
    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    // Lines setup
    const lineIndices: number[] = [];
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const current = ix * AMOUNTY + iy;
        if (ix < AMOUNTX - 1) lineIndices.push(current, (ix + 1) * AMOUNTY + iy);
        if (iy < AMOUNTY - 1) lineIndices.push(current, ix * AMOUNTY + (iy + 1));
      }
    }

    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    // Points
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const pointsMaterial = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        attribute float scale;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = scale * ( 450.0 / - mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        void main() {
          if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
          gl_FragColor = vec4( color, 0.8 );
        }
      `,
      transparent: true,
    });

    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);

    // Lines
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    linesGeometry.setIndex(lineIndices);

    const linesMaterial = new THREE.LineBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.12,
      depthWrite: false 
    });

    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);

    // Animation
    let count = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      
      const posAttr = points.geometry.attributes.position;
      const scaleAttr = points.geometry.attributes.scale;
      const posArray = posAttr.array as Float32Array;
      const scaleArray = scaleAttr.array as Float32Array;

      let i = 0, j = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const xFactor = ix * 0.06;
          const yFactor = iy * 0.06;
          
          // Ultra-sharp ridges using multiple absolute sine layers
          const base = Math.sin(xFactor + count * 0.3) * 15 + Math.cos(yFactor + count * 0.2) * 15;
          const ridge1 = Math.abs(Math.sin(xFactor * 0.4 + count * 0.1)) * 45;
          const ridge2 = Math.abs(Math.cos(yFactor * 0.4 + count * 0.15)) * 45;
          const noise = Math.sin(xFactor * 3 + count) * 2 + Math.cos(yFactor * 3 + count) * 2;
          
          const y = (base + ridge1 + ridge2 + noise) * 0.75 - 35;
          posArray[i + 1] = y;
          
          // Brightness/Scale based on height for that glowing ridge effect
          scaleArray[j] = Math.max(0.2, (y + 45) / 12);
          
          i += 3;
          j++;
        }
      }

      posAttr.needsUpdate = true;
      scaleAttr.needsUpdate = true;
      lines.geometry.attributes.position.needsUpdate = true;

      // Cinematic camera movement
      camera.position.x += (Math.sin(count * 0.08) * 180 - camera.position.x) * 0.015;
      camera.position.y += (Math.cos(count * 0.04) * 20 + 100 - camera.position.y) * 0.015;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      count += 0.008;
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};
