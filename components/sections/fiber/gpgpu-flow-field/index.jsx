"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import { Perf } from "r3f-perf";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { useEffect, useRef, useState } from "react";
import { ACESFilmicToneMapping, CineonToneMapping, CustomToneMapping, ReinhardToneMapping } from "three";
import * as THREE from "three";

const SectionGPGPUFlowField = () => {
  const [renderer, setRenderer] = useState(null)
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

  useEffect(() => {
    if (canvasRef.current) {
      const WebGLRenderer = new THREE.WebGLRenderer({
        canvas: canvasConfig.current
      })
      setRenderer(WebGLRenderer)
    }

    return () => {

    }
  }, [])

  const isDebugger = useRecoilValue(isDebuggerState)

  return (
    <>
      {!isDebugger && <Leva hidden={true} />}
      <Canvas
        ref={canvasRef}
        camera={{
          fov: 15,
          near: 0.1,
          position: [0, 0, 35],
        }}
        shadows
      >
        {isDebugger && <Perf position="bottom-right" />}
        <Experience canvasRef={renderer} />
      </Canvas>
    </>

  );
};

export default SectionGPGPUFlowField;
