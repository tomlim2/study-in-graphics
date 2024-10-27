import { useFrame } from "@react-three/fiber";
import {
  useHelper,
  OrbitControls,
  TorusKnot,
  useTexture,
  Sphere,
} from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

const Experience = () => {
  const { color, gradientMaps } = useControls("toon material", {
    color: "#1d8f75",
    gradientMaps: {
      value: '3',
      options: {
        threeTone: '3',
        fiveTone: '5',
      }
    }
  });


  return (
    <>
      <PointLight />
      <OrbitControls attach="orbitControls" />
      <ToonTorusKnot textureName={gradientMaps} color={color} position={[0, 0, 0]} />
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
  const toneMap = useTexture(`/assets/textures/toonGradientMaps/${textureName}.jpg`)
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