"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"

const SectionGlsl6 = () => {
  const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)
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
    <>
      <Leva hidden={!isDebugger} />
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
    </>
  );
};

export default SectionGlsl6;
