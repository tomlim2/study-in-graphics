import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";



const BOSAniZ = () => {
  const created = (state) => {
    // state.gl.setClearColor("#252525");
  };

  const eventHandler = (event, eventType) => {
    console.log(eventType);
  };

  return (
    <Canvas
      onCreated={created}
      onPointerMissed={(event) => eventHandler(event, "onPointerMissed")}
    >
      <Experience />
    </Canvas>
  );
};

export default BOSAniZ;
