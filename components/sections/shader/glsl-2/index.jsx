"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const SectionGlsl2 = () => {
  //-268 130 -1051
  return (
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
  );
};

export default SectionGlsl2;
