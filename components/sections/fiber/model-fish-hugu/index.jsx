"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { Perf } from "r3f-perf";

const SectionModelFishHugu = () => {
  const isDebugger = useRecoilValue(isDebuggerState)

  return (
    <>
      {!isDebugger && <Leva hidden={true} />}
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [8, - 3, 8]
        }}
      >
        {isDebugger && <Perf position="bottom-right" />}
        <Experience />
      </Canvas>
    </>
  );
};

export default SectionModelFishHugu;
