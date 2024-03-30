import { CameraControls } from "@react-three/drei";
import ParticleForCursor from "./ParticleForCursor";

const Experience = () => {

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <ParticleForCursor />
    </>
  );
};

export default Experience;
