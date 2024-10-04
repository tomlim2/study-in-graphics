"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionWaveOnClick.scss";
import Experience from "./Experience";
import { useEffect, useRef, useState } from "react";
import {  Environment } from "@react-three/drei";
import * as THREE from "three";

const SectionWaveOnClick = () => {
  const [renderer, setRenderer] = useState(null)
  const canvasRef = useRef();
  useEffect(() => {
    if (canvasRef.current) {
      const WebGLRenderer = new THREE.WebGLRenderer({
      })
      setRenderer(WebGLRenderer)
    }

    return () => {
      setRenderer(null)
    }
  }, [])

  return (
    <div className={"sectionWaveOnClick"}>
      <>
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
          ></Environment>
          <Experience renderer={renderer} />
        </Canvas>
      </>
    </div>
  );
};

export default SectionWaveOnClick;
