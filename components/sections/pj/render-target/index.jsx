"use client";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import "./SectionRenderTarget.scss";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { PerspectiveCamera, OrbitControls, TorusKnot, Box, Environment } from "@react-three/drei";
import vertexShader from 'raw-loader!glslify-loader!shaders/water-color/vertex.glsl';
import fragmentShader from 'raw-loader!glslify-loader!shaders/water-color/fragment.glsl';
import fbo from 'raw-loader!glslify-loader!shaders/water-color/fbo.glsl';

function SpinningThing() {
  const mesh = useRef()
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.01))
  return (
    <>
      <Environment
        background={true}
        files={[
          "/assets/environmentMaps/2/px.jpg",
          "/assets/environmentMaps/2/nx.jpg",
          "/assets/environmentMaps/2/py.jpg",
          "/assets/environmentMaps/2/ny.jpg",
          "/assets/environmentMaps/2/pz.jpg",
          "/assets/environmentMaps/2/nz.jpg",
        ]}
      />
      <mesh ref={mesh}>
        <torusKnotGeometry args={[1, 0.4, 100, 64]} />
        <meshNormalMaterial />
      </mesh>
    </>
  )
}

function Cube() {
  const cam = useRef()
  const [scene, target] = useMemo(() => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('orange')
    const target = new THREE.RenderTarget(1024, 1024, {
      format: THREE.RGBAFormat,
      stencilBuffer: false
    })
    target.samples = 8
    return [scene, target]
  }, [])

  useFrame((state) => {
    cam.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
    state.gl.setRenderTarget(target)
    state.gl.render(scene, cam.current)
    state.gl.setRenderTarget(null)
  })

  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
      {createPortal(<SpinningThing />, scene)}
      <Box args={[2, 2, 2]}>
        <meshBasicMaterial attach="material" map={target.texture} />
      </Box>
    </>
  )
}


const SectionRenderTarget = () => {
  const canvasRef = useRef();

  return (
    <div className={"sectionRenderTarget"}>
      <Canvas>
        <Cube />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default SectionRenderTarget;
