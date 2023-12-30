"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";


const SectionLoaderGltf = () => {
  return (
    <>
      <Leva hidden={location.hash !== '#debug'} />
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
