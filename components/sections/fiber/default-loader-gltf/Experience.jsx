import {
  CameraControls,
} from "@react-three/drei";
import { extend } from '@react-three/fiber'

import { Perf } from "r3f-perf";
import LoaderGltf from "./LoaderGltf";
import Stage from "./Stage";

const Experience = () => {

  return (
    <>
      <Perf position="bottom-right" />
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <Stage />
      <LoaderGltf />
    </>
  );
};

export default Experience;
