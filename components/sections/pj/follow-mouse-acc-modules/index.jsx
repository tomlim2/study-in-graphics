"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionFollowMouseAccModules.scss";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import Experience from "./Experience";

const SectionFollowMouseAccModules = () => {
  const canvasRef = useRef();
  
  return (
    <div className={"sectionFollowMouseAccModules"}>
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

export default SectionFollowMouseAccModules;
