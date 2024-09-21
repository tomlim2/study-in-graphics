"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionDragAndDrop.scss";
import Experience from "./Experience";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SectionDragAndDrop = () => {
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
  
  return (
    <div className={"sectionDragAndDrop"}>
      <>
        <Canvas
          ref={canvasRef}
          camera={{
            fov: 30,
            near: 0.1,
            position: [0, 0, 30],
          }}>
          <Experience renderer={renderer} />
        </Canvas>
      </>
    </div>
  );
};

export default SectionDragAndDrop;
