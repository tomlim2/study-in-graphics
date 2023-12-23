import { useFrame } from "@react-three/fiber";
import {
  Stage,
  useHelper,
  OrbitControls,
  CameraControls,
  ContactShadows,
  Environment,
  TorusKnot,
  useTexture,
  Sphere,
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";

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
      <PointLight />
      <OrbitControls attach="orbitControls" />
      <ToonTorusKnot textureName="threeTone" color="#22cefa" position={[0, 0, 0]} />
    </>
  );
};

export default Experience;

const PointLight = () => {
  const lightRef = useRef()

  useHelper(lightRef, THREE.PointLightHelper, [0.5])

  return (
    <group position={[0, 5, 0]}>
      <Sphere scale={0.2}>
        <meshBasicMaterial color="#f3f3f3" />
      </Sphere>
      <pointLight
        ref={lightRef}
        intensity={30}

      />
    </group>
  )
}


const ToonTorusKnot = props => {
  const { textureName, color, position } = props
  const ref = useRef(null)
  console.log('hi');

  const toneMap = useTexture(`/assets/textures/toonGradientMaps/5.jpg`)
  toneMap.minFilter = THREE.NearestFilter
  toneMap.magFilter = THREE.NearestFilter

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x += 0.005
      ref.current.rotation.y += 0.005
    }
  })

  return (
    <TorusKnot ref={ref} args={[0.5, 0.2, 128, 128]} position={position}>
      <meshToonMaterial color={color} gradientMap={toneMap} />
    </TorusKnot>
  )
}