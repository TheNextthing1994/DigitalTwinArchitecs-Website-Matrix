import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Particles = ({ isExploded, isHovered }: { isExploded: boolean; isHovered: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const { mouse } = useThree();

  const count = 100; // 100x100 grid
  const sep = 0.5;

  const [positions, initialPositions, randomDirections] = useMemo(() => {
    const pos = new Float32Array(count * count * 3);
    const initPos = new Float32Array(count * count * 3);
    const dirs = new Float32Array(count * count * 3);
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const x = (i - count / 2) * sep;
        const z = (j - count / 2) * sep;
        const y = 0;
        const idx = (i * count + j) * 3;
        pos[idx] = x;
        pos[idx + 1] = y;
        pos[idx + 2] = z;
        initPos[idx] = x;
        initPos[idx + 1] = y;
        initPos[idx + 2] = z;
        
        // Random directions for explosion
        dirs[idx] = (Math.random() - 0.5) * 40;
        dirs[idx + 1] = (Math.random() - 0.5) * 40;
        dirs[idx + 2] = (Math.random() - 0.5) * 40;
      }
    }
    return [pos, initPos, dirs];
  }, []);

  const explosionFactor = useRef(0);
  const returnFactor = useRef(1);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const positionsAttr = pointsRef.current.geometry.attributes.position;

    // Smoothly transition explosion factor
    explosionFactor.current = THREE.MathUtils.lerp(
      explosionFactor.current, 
      isExploded ? 1 : 0, 
      0.1 * (delta * 60)
    );

    // Smoothly transition return factor based on hover
    returnFactor.current = THREE.MathUtils.lerp(
      returnFactor.current,
      isHovered ? 1 : 0,
      0.05 * (delta * 60)
    );

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const idx = (i * count + j) * 3;
        
        const x = initialPositions[idx];
        const z = initialPositions[idx + 2];
        const dist = Math.sqrt(x * x + z * z);

        // Base wave motion
        const wave1 = Math.sin(x * 0.5 + time * 1.5) * 0.5;
        const wave2 = Math.cos(z * 0.3 + time * 1.2) * 0.5;
        const wave3 = Math.sin(dist * 0.2 - time * 2) * 0.3;
        
        const targetY = wave1 + wave2 + wave3;
        
        // Explosion offset
        const explodeX = randomDirections[idx] * explosionFactor.current;
        const explodeY = randomDirections[idx + 1] * explosionFactor.current;
        const explodeZ = randomDirections[idx + 2] * explosionFactor.current;

        // Calculate current position
        const currentTargetX = x;
        const currentTargetY = targetY;
        const currentTargetZ = z;

        // Apply explosion and return interpolation
        positionsAttr.array[idx] = THREE.MathUtils.lerp(positionsAttr.array[idx], currentTargetX + explodeX, 0.1 * (delta * 60));
        positionsAttr.array[idx + 1] = THREE.MathUtils.lerp(positionsAttr.array[idx + 1], currentTargetY + explodeY, 0.1 * (delta * 60));
        positionsAttr.array[idx + 2] = THREE.MathUtils.lerp(positionsAttr.array[idx + 2], currentTargetZ + explodeZ, 0.1 * (delta * 60));
      }
    }
    
    // Parallax rotation
    pointsRef.current.rotation.y = THREE.MathUtils.lerp(pointsRef.current.rotation.y, mouse.x * 0.2, 0.05 * (delta * 60));
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(pointsRef.current.rotation.x, -mouse.y * 0.1, 0.05 * (delta * 60));

    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#10b981"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const ParticleWave = () => {
  const [isExploded, setIsExploded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="absolute inset-0 w-full h-full z-[1] pointer-events-auto cursor-pointer"
      onMouseDown={() => setIsExploded(true)}
      onMouseUp={() => setIsExploded(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsExploded(false);
      }}
    >
      <Canvas 
        camera={{ position: [0, 15, 30], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Particles isExploded={isExploded} isHovered={isHovered} />
      </Canvas>
    </div>
  );
};
