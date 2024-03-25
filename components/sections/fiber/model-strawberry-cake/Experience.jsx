import { CameraControls } from "@react-three/drei";
import LoaderGltf from "./LoaderGltf";

const Experience = () => {

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <LoaderGltf />
    </>
  );
};

export default Experience;
