import { CameraControls} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, Uniform } from "three";
import glsl9VertexShader from 'raw-loader!glslify-loader!shaders/glsl/glsl9VertexShader.glsl'
import glsl9FragmentShader from 'raw-loader!glslify-loader!shaders/glsl/glsl9FragmentShader.glsl'

const Experience = () => {
  const materialRef = useRef();
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.2, 1]} />
        <shaderMaterial
          ref={materialRef}
          fragmentShader={glsl9FragmentShader}
          vertexShader={glsl9VertexShader}
          uniforms={{ uTime: new Uniform(0) }
        }
        />
        {/* <meshBasicMaterial color={new Color(0x00ff00)} /> */}
      </mesh>
    </>
  );
};

export default Experience;
