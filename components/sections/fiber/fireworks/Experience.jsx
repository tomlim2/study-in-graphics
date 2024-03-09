import {
  CameraControls,
} from "@react-three/drei";

const Experience = () => {
  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <pointLight position={[2, 2, 2]} intensity={30}></pointLight>
      <ambientLight intensity={1}></ambientLight>
    </>
  );
};

export default Experience;
