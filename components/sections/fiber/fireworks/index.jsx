"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import { Perf } from "r3f-perf";
import { Leva } from "leva";
import Firework from "./Firework";
import { useState } from "react";

const SectionFireworks = () => {
  const [isDebugger, setIsDebugger] = useRecoilState(isDebuggerState)
  const [fireworks, setFireworks] = useState([]);

  const handleOnClick = (e) => {
    console.log('hi');
    const newFirework = <Firework key={1} />
    setFireworks((prev) => [...prev, newFirework])
  }

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
        onClick={handleOnClick}
        shadows
      >
        {isDebugger && <Perf position="bottom-right" />}
        <Experience />
        {fireworks}
      </Canvas>
    </>
  );
};

export default SectionFireworks;
