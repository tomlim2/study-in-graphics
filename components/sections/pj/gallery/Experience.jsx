import { Perf } from "r3f-perf";
import LoaderGltf from "./LoaderGltf";
import Stage from "./Stage";
import Pattern000 from "./shader/pt000/Pattern000";
import Pattern001 from "./shader/pt001/Pattern001";
import Pattern002 from "./shader/pt002/Pattern002";
import Pattern003 from "./shader/pt003/Pattern003";
import Pattern004 from "./shader/pt004/Pattern004";



const Experience = () => {

  return (
    <>
      <Perf position="bottom-right" />
      {/* <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} /> */}
      <Stage />
      <Pattern000 />
      <Pattern001 />
      <Pattern002 />
      <Pattern003 />
      <Pattern004 />
      <LoaderGltf />
    </>
  );
};

export default Experience;
