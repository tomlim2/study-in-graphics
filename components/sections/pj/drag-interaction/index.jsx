"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionDragInteraction.scss";
import Experience from "./Experience";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SectionDragInteraction = () => {
  const [renderer, setRenderer] = useState(null)
  const canvasRef = useRef();
  useEffect(() => {
    if (canvasRef.current) {
      const WebGLRenderer = new THREE.WebGLRenderer({
      })
      setRenderer(WebGLRenderer)
    }
  
    return () => {
      
    }
  }, [])
  console.log('Released');
  
  return (
    <div className={"sectionDragInteraction"}>
      <>
        <Canvas
          ref={canvasRef}
          orthographic={false}
          camera={{
            fov: 15,
            near: 0.1,
            position: [0, 0, 360],
          }}>
          <Experience  />
        </Canvas>
      </>
    </div>
  );
};

export default SectionDragInteraction;
