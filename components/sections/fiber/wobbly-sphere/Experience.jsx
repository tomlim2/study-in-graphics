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
    intensity: { value: 30, min: 0, max: 120 },
  });

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <pointLight color={color} position={[2, 2, 2]} intensity={intensity}></pointLight>
      <ambientLight intensity={1}></ambientLight>
      <MeshSample />
    </>
  );
};

export default Experience;
