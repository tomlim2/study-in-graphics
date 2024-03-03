import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import Fireworks from "./Fireworks";

const Experience = () => {
  const { color, opacity } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 1, min: 0, max: 1 },
  });

  return (
    <>
      <Perf position="bottom-right" />

      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <pointLight position={[2, 2, 2]} intensity={30}></pointLight>
      <ambientLight intensity={1}></ambientLight>
      <Fireworks />
    </>
  );
};

export default Experience;
