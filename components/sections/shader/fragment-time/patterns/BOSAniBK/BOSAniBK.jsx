import { StrictMode, useState } from "react";
import { Canvas } from "@react-three/fiber";
import MeshForShader from "./meshForShader";



const BOSAniBK = () => {
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

export default BOSAniBK;
