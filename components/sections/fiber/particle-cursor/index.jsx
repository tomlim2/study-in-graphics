"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { useEffect, useRef } from "react";
import { ACESFilmicToneMapping, CineonToneMapping, CustomToneMapping, ReinhardToneMapping } from "three";

const SectionParticleCursor = () => {
  const canvasRef = useRef();
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
    toneMappingExposure: { value: 1.5, min: 0, max: 3, step: 0.01 },
  });
  const isDebugger = useRecoilValue(isDebuggerState)
  useEffect(() => {
    /**
   * Displacement
   */
    const displacement = {}

    // 2D canvas
    displacement.canvas = document.createElement('canvas')
    displacement.canvas.width = 128
    displacement.canvas.height = 128
    displacement.canvas.style.position = 'fixed'
    displacement.canvas.style.width = '512px'
    displacement.canvas.style.height = '512px'
    displacement.canvas.style.top = '50px'
    displacement.canvas.style.left = '20px'
    displacement.canvas.style.zIndex = 10
    document.body.append(displacement.canvas)

    // Context
    displacement.context = displacement.canvas.getContext('2d')
    displacement.context.fillStyle = 'red'
    displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)

  }, [])
  return (
    <>
      {!isDebugger && <Leva hidden={true} />}
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [0, 0, 15],
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

export default SectionParticleCursor;
