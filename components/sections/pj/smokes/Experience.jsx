import { Perf } from "r3f-perf";
import LoaderGltf from "./LoaderGltf";
import Stage from "./Stage";
import Pattern000 from "./shader/pt0/Pattern000";


const Experience = () => {

  return (
    <>
      <Perf position="bottom-right" />
      {/* <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} /> */}
      <Stage />
      <Pattern000 />
      <LoaderGltf />
    </>
  );
};

export default Experience;
