
import { Canvas } from "@react-three/fiber";
import MeshForShader from "./meshForShader";
import { StrictMode, useState } from "react";

const BOSAniBE = () => {
  const [ctloffsetX, setCtloffsetX] = useState(0);
  const created = (state) => {
    // state.gl.setClearColor("#252525");
  };

  const eventHandler = (event, message) => {};

  const onClick = () => {
    setCtloffsetX((prev) => prev + 1);
    console.log("ctloffsetX");
  };

  return (
    <>
      <StrictMode>
        <Canvas
          onCreated={created}
          onPointerMissed={(event) => eventHandler(event, "onPointerMissed")}
        >
          <MeshForShader ctloffsetX={ctloffsetX} />
        </Canvas>
        
      </StrictMode>
    </>
  );
};

export default BOSAniBE;
