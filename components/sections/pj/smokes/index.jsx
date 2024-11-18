"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";

import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { Stage } from "@react-three/drei";


const SectionSmokes = () => {
  const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)

  return (
    <>
      <Leva hidden={!isDebugger} />
      <Canvas
        shadows
        orthographic
        camera={{
          fov: 35,
          near: 0.1,
          far: 50,
          zoom: 100,
        }}
      >
        <Experience />
        <Stage />
      </Canvas>
    </>
  );
};

export default SectionSmokes;
