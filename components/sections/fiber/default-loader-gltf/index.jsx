"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";
import { useRecoilState } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"

const SectionLoaderGltf = () => {
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
          position: [8, - 3, 8]
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
};

export default SectionLoaderGltf;
