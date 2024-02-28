"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva } from "leva";


const SectionCoffeeSmoke = () => {
  return (
    <>
      <Leva hidden={location.hash !== '#debug'} />
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
};

export default SectionCoffeeSmoke;
