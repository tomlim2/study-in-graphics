"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Perf } from "r3f-perf";
import { Leva } from "leva";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"

const SectionSlicedModel = () => {
  const isDebugger = useRecoilValue(isDebuggerState)
  return (
    <>
      {!isDebugger && <Leva hidden={true} />}
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [0, 0, 12],
        }}
        shadows
      >
        {isDebugger && <Perf position="bottom-right" />}
        <Experience />
      </Canvas>
    </>

  );
};


//to do: keep fix up on debugger hash
export default SectionSlicedModel;
