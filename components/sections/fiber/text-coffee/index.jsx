"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const SectionDefault = () => {
  return (
    <Canvas
      orthographic camera={{ position: [0, 0, 100], zoom: 100 }}
    >
      <ambientLight intensity={1} />
      <directionalLight intensity={3} position={[10, 10, 10]} />
      <Experience />
      <axesHelper scale={2} position={[0, 0, 0]} onUpdate={(self) => self.setColors('#ff2080', '#20ff80', '#2080ff')} />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

export default SectionDefault;
