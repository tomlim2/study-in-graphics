import { Canvas } from "@react-three/fiber";
import MeshForShader from "./meshForShader";



const BOSAniR = () => {
  const created = (state) => {
    // state.gl.setClearColor("#252525");
  };

  return (
    <Canvas onCreated={created}>
      <MeshForShader />
    </Canvas>
  );
};

export default BOSAniR;
