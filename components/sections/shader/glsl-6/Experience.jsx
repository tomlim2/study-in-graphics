import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Experience = () => {
  const materialRef = useRef();
  const { color, opacity } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 1, min: 0, max: 1 },
  });

  useFrame((state, delta) => {
    if (materialRef.current) {
      customUniforms.uTime.value = state.clock.elapsedTime;
      // console.log(materialRef.current.onBeforeCompile((shader)=>{
      //   console.log(shader);
      // }));
      // materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // console.log(materialRef.current.uniforms.uTime.value, "hi");
    }
  });

  const customUniforms = {
    uTime: {
      value: 0
    }
  }

  const onUpdateShader = (shader) => {
    // glslTestMaterial.userData.shader = shader;
    shader.uniforms.uTime = customUniforms.uTime;
    // console.log(shader.fragmentShader)
    shader.fragmentShader = shader.fragmentShader.replace(
      /*glsl*/`#include <color_pars_fragment>`,
      /*glsl*/`#include <color_pars_fragment>
        uniform float uTime;
      `)
    shader.fragmentShader = shader.fragmentShader.replace(
      /*glsl*/`#include <color_fragment>`,
      /*glsl*/`#include <color_fragment>
        diffuseColor = vec4(1,sin(uTime),0,1);
      `)
    // console.log(shader.fragmentShader)
  }



  const glslTestMaterial = <meshStandardMaterial ref={materialRef} opacity={opacity} color={color} transparent
    onBeforeCompile={(shader) => onUpdateShader(shader)} />

  return (
    <>
      <Perf position="bottom-right" />

      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <pointLight position={[2, 2, 2]} intensity={30}></pointLight>
      <ambientLight intensity={1}></ambientLight>

      <mesh visible userData={{ hello: 'world' }} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        {glslTestMaterial}
      </mesh>


    </>
  );
};

export default Experience;
