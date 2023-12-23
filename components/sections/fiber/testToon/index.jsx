"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import * as THREE from "three";

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
      camera={{
        fov: 45,
        near: 0.1,
        far: 50,
        position: [0, 0, 6],
      }}
      shadows
      gl={{
        toneMapping: canvasConfig.toneMapping,
        toneMappingExposure: canvasConfig.toneMappingExposure,
      }}
    >
      <Experience />
    </Canvas>
  );
};

export default SectionDefault;
