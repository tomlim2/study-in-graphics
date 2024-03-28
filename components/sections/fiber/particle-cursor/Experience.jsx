import { useControls } from "leva";
import { CameraControls } from "@react-three/drei";

const Experience = () => {
  const { color, opacity } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 1, min: 0, max: 1 },
  });

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />

      <points>
        <planeGeometry args={[10, 10, 32, 32]} />
        <meshBasicMaterial />
      </points>


    </>
  );
};

export default Experience;
