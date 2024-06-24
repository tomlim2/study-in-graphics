import {
  CameraControls,
  Environment,
  EnvironmentMap,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import MeshSample from "./MeshSample";
import { useEffect } from "react";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { useControls } from "leva";
import { Vector2 } from "three";
const Experience = () => {
  const { color, intensity } = useControls("pointLight", {
    color: "#ffffff",
    intensity: { value: 1, min: 0, max: 120 },
  });


  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <Environment background={true} backgroundIntensity={.5} backgroundBlurriness={.5} environmentIntensity={.01} files={'/sliced-model/aerodynamics_workshop.hdr'}></Environment>
      <directionalLight castShadow color={'#ffffff'} intensity={4} position={[6.25, 3, 4]} />
      <MeshSample />
    </>
  );
};

export default Experience;
