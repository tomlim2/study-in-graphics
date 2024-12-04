"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionFollowMouseAcc.scss";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import Experience from "./Experience";

const SectionFollowMouseAcc = () => {
  const canvasRef = useRef();
  
  return (
    <div className={"sectionFollowMouseAcc"}>
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

export default SectionFollowMouseAcc;
