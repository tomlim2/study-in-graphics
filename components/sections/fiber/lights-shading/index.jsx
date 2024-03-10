"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";

import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"

const SectionLightsShading = () => {
  const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)
  
  return (
    <>
      <Leva hidden={!isDebugger} />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
};

export default SectionLightsShading;
