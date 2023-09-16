'use client';
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const MeshForShader = ({ shader, mousePos }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <mesh ref={meshRef}>
        <planeGeometry args={[6, 6]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={{ uTime: { value: 0 } }}
          fragmentShader={shader.fragment}
          vertexShader={shader.vertex}
        />
      </mesh>
    </>
  );
};

export default MeshForShader;
