"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionFollowMouse.scss";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import Experience from "./Experience";

const SectionFollowMouse = () => {
  const canvasRef = useRef();
  
  return (
    <div className={"sectionFollowMouse"}>
      <Canvas
        ref={canvasRef}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default SectionFollowMouse;
