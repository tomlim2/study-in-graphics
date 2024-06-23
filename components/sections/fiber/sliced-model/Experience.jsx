import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import MeshSample from "./MeshSample";
import { useEffect } from "react";
import CustomShaderMaterial from "three-custom-shader-material/vanilla";
import { useControls } from "leva";
const Experience = () => {
  const { color, intensity } = useControls("pointLight", {
    color: "#ffffff",
    intensity: { value: 1, min: 0, max: 120 },
  });

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      {/* <pointLight color={color} position={[7, 7, 7]} intensity={30} castShadow></pointLight> */}
      <directionalLight color={color} intensity={intensity} castShadow position={[-0.25,2,25]}></directionalLight>
      <ambientLight intensity={1}></ambientLight>
      <MeshSample />
    </>
  );
};

export default Experience;
