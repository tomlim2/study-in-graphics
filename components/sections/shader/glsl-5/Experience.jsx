import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import MeshSample from "./MeshSample";
import LoaderGltf from "./LoaderGltf";
import Stage from "./Stage";

const Experience = () => {

  return (
    <>
      <color attach={'background'} args={['#000000']} />
      <Perf position="bottom-right" />

      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <LoaderGltf />
      <Stage />
    </>
  );
};

export default Experience;
