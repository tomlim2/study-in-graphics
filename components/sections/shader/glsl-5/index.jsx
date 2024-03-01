"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"

const SectionGlsl5 = () => {
  const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)
  return (
    <>
      <Leva hidden={!isDebugger} />
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 55,
          position: [0, 0, 12],
        }}
        shadows
      >
        <Experience />
      </Canvas>
    </>

  );
};

export default SectionGlsl5;
