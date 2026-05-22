"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function ParticleField({ count = 280 }) {
  const points = useRef();
  const { mouse } = useThree();

  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      // Cyan → white color range
      const t = Math.random();
      col[i * 3]     = 0.04 + t * 0.96;
      col[i * 3 + 1] = 0.70 + t * 0.30;
      col[i * 3 + 2] = 0.88 + t * 0.12;

      siz[i] = Math.random() * 0.06 + 0.02;
    }
    return [pos, col, siz];
  }, [count]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    points.current.rotation.x = t * 0.025 + mouse.y * 0.15;
    points.current.rotation.y = t * 0.04  + mouse.x * 0.15;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

function FloatingRings() {
  const group = useRef();

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    group.current.rotation.x = Math.sin(t * 0.2) * 0.3 + mouse.y * 0.05;
    group.current.rotation.y = t * 0.08 + mouse.x * 0.05;
    group.current.rotation.z = Math.cos(t * 0.15) * 0.2;
  });

  return (
    <group ref={group}>
      {[3.5, 5, 6.5].map((r, i) => (
        <mesh key={r} rotation={[Math.PI / 2 + i * 0.4, i * 0.6, 0]}>
          <torusGeometry args={[r, 0.015, 6, 80]} />
          <meshBasicMaterial color="#04b4e0" transparent opacity={0.18 - i * 0.04} />
        </mesh>
      ))}
    </group>
  );
}

export default function Background3D() {
  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 0, background: "#04b4e0" }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 65 }}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#04b4e0"]} />
        <fog attach="fog" args={["#04b4e0", 14, 26]} />
        <ParticleField />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
