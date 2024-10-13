"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionRippleOnClick.scss";
import Experience from "./Experience";
import { useEffect, useRef, useState } from "react";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const DisplacementCanvas = () => {
  const canvasWrapRef = useRef();

  useEffect(() => {
    if (!canvasWrapRef.current) return;

    const displacement = {};
    displacement.canvas = document.createElement("canvas");

    displacement.canvas.style.position = 'fixed'
    displacement.canvas.style.width = '512px'
    displacement.canvas.style.height = '512px'
    displacement.canvas.style.top = 0
    displacement.canvas.style.left = 0
    displacement.canvas.style.zIndex = 10

    // Context
    displacement.context = displacement.canvas.getContext('2d')
    displacement.context.fillStyle = 'red'
    displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)

    const existingCanvas = canvasWrapRef.current.querySelector("canvas:not([data-reactroot])");
    if (existingCanvas && existingCanvas.parentNode === canvasWrapRef.current) {
      canvasWrapRef.current.removeChild(existingCanvas);
    }
    canvasWrapRef.current.appendChild(displacement.canvas);

    const currentCanvasWrapRef = canvasWrapRef.current;

    return () => {
      if (displacement.canvas && displacement.canvas.parentNode === canvasWrapRef.current) {
        currentCanvasWrapRef.removeChild(displacement.canvas);
      }
    };
  }, []);
  return (
    <div ref={canvasWrapRef} className={"displacementCanvas"}></div>
  )
}

const SectionRippleOnClick = () => {
  const canvasRef = useRef();

  return (
    <div className={"sectionRippleOnClick"}>
      <DisplacementCanvas />
      <Canvas
        ref={canvasRef}
        camera={{
          fov: 30,
          near: 0.1,
          position: [0, 0, 30],
        }}>
        <Environment
          background={false}
          files={[
            "/assets/environmentMaps/2/px.jpg",
            "/assets/environmentMaps/2/nx.jpg",
            "/assets/environmentMaps/2/py.jpg",
            "/assets/environmentMaps/2/ny.jpg",
            "/assets/environmentMaps/2/pz.jpg",
            "/assets/environmentMaps/2/nz.jpg",
          ]}
        />
        <Experience />
      </Canvas>
    </div>
  );
};

export default SectionRippleOnClick;
