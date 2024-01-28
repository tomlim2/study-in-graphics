import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import MeshSample from "./MeshSample";

const Experience = () => {

  return (
    <>
      <color attach={'background'} args={['#ff00d9']} />
      <Perf position="bottom-right" />

      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />

      <MeshSample />


    </>
  );
};

export default Experience;
