import {
  CameraControls,
} from "@react-three/drei";

import { Perf } from "r3f-perf";
import LoaderGltf from "./LoaderGltf";

const Experience = () => {

  return (
    <>
      <Perf position="bottom-right" />
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <LoaderGltf />
      <color attach={'background'} args={['#000000']} />
    </>
  );
};

export default Experience;
