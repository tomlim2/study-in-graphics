"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const SectionDefault = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 50,
        position: [0, 0, 12],
      }}
      shadows
    >
      <Experience />
    </Canvas>
  );
};

export default SectionDefault;
