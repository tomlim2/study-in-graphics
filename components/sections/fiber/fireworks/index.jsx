"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { Perf } from "r3f-perf";
import { Leva } from "leva";
import FireworkWrapper from "./FireworkWrapper";

const SectionFireworks = () => {
  const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)


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
      >
        {isDebugger && <Perf position="bottom-right" />}
        <Experience />
        <FireworkWrapper />
      </Canvas>
    </>
  );
};

export default SectionFireworks;
