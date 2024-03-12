import {
  CameraControls,
} from "@react-three/drei";

import { Perf } from "r3f-perf";
import LoaderGltf from "./LoaderGltf";
import { useControls } from "leva";

const Experience = () => {
  const { backgroundColor } = useControls("halftone", {
    backgroundColor: "#622156",
    holographicFrequncy: {
      value: 20,
      min: 0,
      max: 100,
      onChange: (value) => {
        // if (materialRef.current) {
          // materialRef.current.uniforms.uHolographicFrequncy.value = value;
        // }
      }
    },
  });

  return (
    <>
      <Perf position="bottom-right" />
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <LoaderGltf />
      <color attach={'background'}  args={[backgroundColor]} />
    </>
  );
};

export default Experience;
