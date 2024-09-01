import {
  CameraControls,
} from "@react-three/drei";
import { extend, useFrame, useLoader } from '@react-three/fiber'
import { Perf } from "r3f-perf";
import LoaderGltf from "./LoaderGltf";
import Stage from "./Stage";
import smoke01Fragment from 'raw-loader!glslify-loader!shaders/smokes/smoke01Fragment.glsl'
import smoke01Vertex from 'raw-loader!glslify-loader!shaders/smokes/smoke01Vertex.glsl'
import { DoubleSide, RepeatWrapping, TextureLoader } from "three";
import { useRef } from "react";

const Experience = () => {
  const materialRef = useRef()
  const perlinTexture = useLoader(TextureLoader, "/coffeeSmoke/perlin.png")
  perlinTexture.wrapS = RepeatWrapping
  perlinTexture.wrapT = RepeatWrapping
  console.log(perlinTexture);
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // console.log(materialRef.current.uniforms.uTime.value, "hi");
    }
  });
  return (
    <>
      <Perf position="bottom-right" />
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <Stage />
      <mesh position={[0, 1, 0]} scale={[1, 1, 1]}>
        <planeGeometry args={[1, 3, 16, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={smoke01Vertex}
          fragmentShader={smoke01Fragment}
          transparent={true}
          uniforms=
          {
            {
              uTime: { value: 0 },
              uPerlinTexture: { value: perlinTexture }
            }}
          // wireframe={true} 
          depthWrite={false}
          side={DoubleSide} />
      </mesh>
      <LoaderGltf />
    </>
  );
};

export default Experience;
