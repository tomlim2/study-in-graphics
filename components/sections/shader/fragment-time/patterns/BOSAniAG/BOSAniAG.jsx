import { Canvas } from "@react-three/fiber";
import MeshForShader from "./meshForShader";



const BOSAniAG = () => {
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
      <MeshForShader />
    </Canvas>
  );
};

export default BOSAniAG;
