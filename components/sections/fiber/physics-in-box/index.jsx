"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { OrbitControls } from "@react-three/drei";

const SectionPhysicsInBox = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 50,
        position: [0, 0, 6],
      }}
      shadows
    >
      <Experience />
      <OrbitControls />
    </Canvas>
  );
};

export default SectionPhysicsInBox;
