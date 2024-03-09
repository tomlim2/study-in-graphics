import {
  CameraControls,
} from "@react-three/drei";

// import Firework from "./Firework";
import Firework from "./Firework";
import { useRef } from "react";

const Experience = () => {
  const sceneRef = useRef()
  

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <pointLight position={[2, 2, 2]} intensity={30}></pointLight>
      <ambientLight intensity={1}></ambientLight>
      {/* <scene ref={sceneRef} /> */}
        <Firework />
    </>
  );
};

export default Experience;
