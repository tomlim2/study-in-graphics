"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionTowardsCenter.scss";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import Experience from "./Experience";

const SectionTowardsCenter = () => {
  const canvasRef = useRef();
  
  return (
    <div className={"sectionTowardsCenter"}>
      <Canvas
        ref={canvasRef}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default SectionTowardsCenter;
