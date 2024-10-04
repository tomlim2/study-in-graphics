"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionWaterColor.scss";
import Experience from "./Experience";
import { useEffect, useRef, useState } from "react";

const SectionWaterColor = () => {
  const canvasRef = useRef();

  return (
    <div className={"sectionWaterColor"}>
      <Canvas
        ref={canvasRef}
        camera={{
          fov: 30,
          near: 0.1,
          position: [0, 0, 30],
        }}
        gl={{
          alpha: false,
          antialias: true,
        }}
        >
        <Experience />
      </Canvas>
    </div>
  );
};

export default SectionWaterColor;
