"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionFollowMouseModules.scss";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import Experience from "./Experience";

const SectionFollowMouseModules = () => {
  const canvasRef = useRef();
  
  return (
    <div className={"sectionFollowMouseModules"}>
      <Canvas
        ref={canvasRef}
        orthographic
        camera={{
          zoom: 100,
        }}
      >
        <Experience />
      </Canvas>
    </div>
  );
};

export default SectionFollowMouseModules;
