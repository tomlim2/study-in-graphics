"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { ACESFilmicToneMapping, CineonToneMapping, CustomToneMapping, ReinhardToneMapping } from "three";

const SectionDefault = () => {
  const canvasConfig = useControls("canvas", {
    toneMapping: {
      value: CustomToneMapping,
      options: {
        ACESFilmic: ACESFilmicToneMapping,
        Cineon: CineonToneMapping,
        Reinhard: ReinhardToneMapping,
        Custom: CustomToneMapping,
      },
    },
    toneMappingExposure: { value: 1, min: 0, max: 3, step: 0.01 },
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

export default SectionDefault;
