import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

const Experience = () => {
  // const { color, opacity } = useControls("contact shadows", {
  //   color: "#1d8f75",
  //   opacity: { value: 1, min: 0, max: 1 },
  // });

  return (
    <>
      <Perf position="bottom-right" />

      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <pointLight position={[2, 2, 2]} intensity={30}></pointLight>
      <ambientLight intensity={1}></ambientLight>

      <mesh visible userData={{ hello: 'world' }} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <meshStandardMaterial opacity={1} color={0x000000} transparent />
      </mesh>


    </>
  );
};

export default Experience;
