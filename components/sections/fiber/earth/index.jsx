"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"

const SectionEarth = () => {
  const canvasConfig = useControls("canvas", {
    toneMapping: {
      value: THREE.ACESFilmicToneMapping,
      options: {
        ACESFilmic: THREE.ACESFilmicToneMapping,
        Cineon: THREE.CineonToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Custom: THREE.CustomToneMapping,
      },
    },
    toneMappingExposure: { value: 0.26, min: 0, max: 3, step: 0.01 },
  });
  const isDebugger = useRecoilValue(isDebuggerState)
  return (
    <>
      {!isDebugger && <Leva hidden={true} />}
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
        {isDebugger && <Perf position="bottom-right" />}
        <Experience />
      </Canvas>
    </>

  );
};

export default SectionEarth;
