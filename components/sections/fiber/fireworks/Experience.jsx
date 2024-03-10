import {
  CameraControls,
} from "@react-three/drei";
import FireworkWrapper from "./FireworkWrapper";
import SkyBackground from "./SkyBackground";

const Experience = () => {
  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <FireworkWrapper />
      <SkyBackground />
    </>
  );
};

export default Experience;
