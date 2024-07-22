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
      
      
    </>
  );
};

export default Experience;
