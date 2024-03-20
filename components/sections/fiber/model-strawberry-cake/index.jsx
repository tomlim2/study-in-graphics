"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { Perf } from "r3f-perf";

const SectionModelStrawberryCake = () => {
  const isDebugger = useRecoilValue(isDebuggerState)

  return (
    <>
      {!isDebugger && <Leva hidden={true} />}
      <Canvas
        camera={{
          fov: 35,
          position: [8, 3, 8]
        }}
      >
        {isDebugger && <Perf position="bottom-right" />}
        <Experience />
      </Canvas>
    </>
  );
};

export default SectionModelStrawberryCake;
