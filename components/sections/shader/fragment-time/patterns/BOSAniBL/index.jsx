import { Canvas } from "@react-three/fiber";
import MeshForShader from "./meshForShader";
import { StrictMode } from "react";



const FiberCanvas = () => {
  const created = (state) => {
    // state.gl.setClearColor("#252525");
  };

  const eventHandler = (event, message) => {};

  return (
    <>
      <StrictMode>
        <Canvas
          onCreated={created}
          onPointerMissed={(event) => eventHandler(event, "onPointerMissed")}
        >
          <MeshForShader />
        </Canvas>
      </StrictMode>
    </>
  );
};

export default FiberCanvas;
