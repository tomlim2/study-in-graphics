"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"

const SectionGlsl3 = () => {
  const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)
  //-268 130 -1051
  //-1000 80 -993
  // neder -17.5 / 65 / -140
  // -2.5 / 100 / 0
  // https://www.youtube.com/watch?v=f4s1h2YETNY&t=818s
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

export default SectionGlsl3;
