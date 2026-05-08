"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, Html, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function TutorModel() {
  const ringPoints = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0, 1.05, 0.55, 0, Math.PI * 2, false, 0);
    const pts2 = curve.getPoints(90);
    return pts2.map((p) => new THREE.Vector3(p.x, p.y, 0));
  }, []);

  return (
    <group>
      {/* Core */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.65, 64, 64]} />
        <meshStandardMaterial
          color="#e6f4ff"
          roughness={0.28}
          metalness={0.35}
          emissive="#3b82f6"
          emissiveIntensity={0.22}
        />
      </mesh>

      {/* Face / screen */}
      <mesh position={[0, 0.06, 0.48]}>
        <circleGeometry args={[0.26, 48]} />
        <meshStandardMaterial color="#0b1220" roughness={0.2} metalness={0.15} />
      </mesh>
      <mesh position={[-0.095, 0.07, 0.53]}>
        <circleGeometry args={[0.045, 24]} />
        <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={1.25} />
      </mesh>
      <mesh position={[0.095, 0.07, 0.53]}>
        <circleGeometry args={[0.045, 24]} />
        <meshStandardMaterial color="#93c5fd" emissive="#60a5fa" emissiveIntensity={1.25} />
      </mesh>

      {/* Halo ring */}
      <mesh rotation={[Math.PI / 2.75, 0, Math.PI / 10]} position={[0, 0.18, 0]}>
        <tubeGeometry args={[new THREE.CatmullRomCurve3(ringPoints, true), 220, 0.03, 12, true]} />
        <meshStandardMaterial
          color="#c9a45c"
          emissive="#c9a45c"
          emissiveIntensity={0.55}
          roughness={0.35}
          metalness={0.75}
        />
      </mesh>

      <Html center position={[0, -1.18, 0]} transform>
        <div className="pointer-events-none select-none rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[11px] font-semibold text-white/85 backdrop-blur">
          3D AI Tutor
        </div>
      </Html>
    </group>
  );
}

export default function ThreeTutor() {
  return (
    <div className="relative h-[340px] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-black/30 dark:shadow-none md:h-[420px]">
      <Canvas
        shadows
        camera={{ position: [0.0, 0.2, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["transparent"]} />

        <ambientLight intensity={0.55} />
        <directionalLight position={[2.2, 3.2, 2.5]} intensity={1.1} castShadow />
        <pointLight position={[-2.0, 1.2, -1.8]} intensity={0.9} color="#60a5fa" />

        <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
          <TutorModel />
        </Float>

        <Environment preset="city" />
        <OrbitControls
          enablePan={false}
          minDistance={2.2}
          maxDistance={4.2}
          minPolarAngle={Math.PI / 2.75}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent dark:from-black/35" />
    </div>
  );
}

