"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const SectionDefault = () => {
  const canvasConfig = useControls("canvas", {
    toneMapping: {
      value: THREE.CustomToneMapping,
      options: {
        ACESFilmic: THREE.ACESFilmicToneMapping,
        Cineon: THREE.CineonToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Custom: THREE.CustomToneMapping,
      },
    },
    toneMappingExposure: { value: 1.5, min: 0, max: 3, step: 0.01 },
  });
  return (
    <Canvas
      orthographic camera={{ position: [0, 0, 100], zoom: 100 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Experience />
      <axesHelper scale={2} position={[0, 0, 0]} onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

export default SectionDefault;
