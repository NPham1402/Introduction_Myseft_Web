"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Distant star field ─────────────────────────────────────────── */
function Stars({ count = 1800 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 22 + Math.random() * 28;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#cce8ff" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

/* ── 3-arm spiral galaxy ────────────────────────────────────────── */
function Galaxy({ count = 5500 }) {
  const ref = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const arms = 3;
    const coreColor  = new THREE.Color("#ffffff");
    const midColor   = new THREE.Color("#04b4e0");
    const outerColor = new THREE.Color("#0a3a6e");

    for (let i = 0; i < count; i++) {
      const radius      = 0.25 + Math.random() * 8.5;
      const arm         = i % arms;
      const branchAngle = (arm / arms) * Math.PI * 2;
      const spinAngle   = radius * 0.55;
      const scatter     = Math.pow(Math.random(), 2.5);

      pos[i * 3]     = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * scatter * 1.4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * scatter * 0.35;
      pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * scatter * 1.4;

      const t = Math.min(radius / 8.5, 1);
      const mixed = new THREE.Color();
      if (t < 0.35) mixed.lerpColors(coreColor, midColor, t / 0.35);
      else           mixed.lerpColors(midColor, outerColor, (t - 0.35) / 0.65);

      col[i * 3]     = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock, mouse }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.035 + mouse.x * 0.18;
    ref.current.rotation.x = mouse.y * 0.10;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.038}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Pulsing core glow ──────────────────────────────────────────── */
function CoreGlow() {
  const inner = useRef();
  const outer = useRef();

  useFrame(({ clock }) => {
    const t  = clock.elapsedTime;
    const s1 = 1 + Math.sin(t * 1.8) * 0.12;
    const s2 = 1 + Math.sin(t * 1.2 + 1) * 0.18;
    inner.current.scale.setScalar(s1);
    outer.current.scale.setScalar(s2);
    outer.current.material.opacity = 0.06 + Math.sin(t * 1.2) * 0.02;
  });

  return (
    <group>
      {/* Hard bright core */}
      <mesh ref={inner}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.95} />
      </mesh>
      {/* Soft glow halo */}
      <mesh ref={outer}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#04b4e0" transparent opacity={0.07} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

/* ── Floating nebula dust orbs ──────────────────────────────────── */
const ORBS = [
  { pos: [ 3.8,  0.4, -0.5], color: "#04b4e0", r: 1.4, op: 0.045 },
  { pos: [-4.2, -0.3,  1.2], color: "#0055aa", r: 1.8, op: 0.030 },
  { pos: [ 1.2,  2.5, -2.5], color: "#00aaff", r: 1.1, op: 0.055 },
  { pos: [-1.8, -2.2,  0.8], color: "#04b4e0", r: 1.0, op: 0.060 },
  { pos: [ 0.5, -1.5, -3.5], color: "#0077cc", r: 1.3, op: 0.035 },
];

function NebulaOrbs() {
  const group = useRef();

  useFrame(({ clock, mouse }) => {
    const t = clock.elapsedTime;
    group.current.rotation.y = t * 0.018 + mouse.x * 0.05;
    group.current.rotation.x = Math.sin(t * 0.25) * 0.06 + mouse.y * 0.04;
  });

  return (
    <group ref={group}>
      {ORBS.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <sphereGeometry args={[o.r, 10, 10]} />
          <meshBasicMaterial
            color={o.color}
            transparent
            opacity={o.op}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ── Slow-drifting camera ───────────────────────────────────────── */
function CameraDrift() {
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    camera.position.y  = 2 + Math.sin(t * 0.18) * 0.4;
    camera.position.x  = Math.sin(t * 0.12) * 0.3;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Main export ────────────────────────────────────────────────── */
export default function Background3D() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2, 10], fov: 62 }}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#03061a"]} />
        <fog attach="fog" args={["#03061a", 18, 32]} />
        <CameraDrift />
        <Stars />
        <Galaxy />
        <CoreGlow />
        <NebulaOrbs />
      </Canvas>
    </div>
  );
}
