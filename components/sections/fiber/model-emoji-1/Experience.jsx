import { useFrame } from "@react-three/fiber";
import {
  Stage,
  useHelper,
  OrbitControls,
  CameraControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";
import ModelEmoji from "./ModelEmoji";

const Experience = () => {
  const cube = useRef();
  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);
  const { color, opacity, blur } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 0.4, min: 0, max: 1 },
    blur: { value: 2.8, min: 0, max: 10 },
  });

  return (
    <>
      <Perf position="bottom-right" />

      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />

      <ambientLight intensity={1} />
      <pointLight intensity={30} position={[2, 2, 2]} />

      <Suspense
        fallback={
          <mesh position-y={0.5} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color="red" />
          </mesh>
        }
      >
        <ContactShadows
          position={[0, -0.99, 0]}
          scale={10}
          resolution={512}
          far={5}
          color={color}
          opacity={opacity}
          blur={blur}
          frames={1}
        />
        <ModelEmoji />
      </Suspense>
    </>
  );
};

export default Experience;
