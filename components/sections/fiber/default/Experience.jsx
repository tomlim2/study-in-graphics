import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";

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

      <mesh visible userData={{ hello: 'world' }} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial opacity={opacity} color={color} transparent />
      </mesh>


    </>
  );
};

export default Experience;
