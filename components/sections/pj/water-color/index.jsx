"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionWaterColor.scss";
import Experience from "./Experience";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

const SectionWaterColor = () => {
  const canvasRef = useRef();
  
  return (
    <div className={"sectionWaterColor"}>
      <Canvas
        ref={canvasRef}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default SectionWaterColor;
