import { Canvas } from "@react-three/fiber";
import MeshForShader from "./meshForShader";
// import MeshForShader from "components/sections/shader/fragnent-time/patterns/BOSAniA/meshForShader";

const BookOfShadersAnimationA = () => {
  const created = (state) => {
    // state.gl.setClearColor("#252525");
  };

  return (
    <Canvas onCreated={created}>
      <MeshForShader />
    </Canvas>
  );
};

export default BookOfShadersAnimationA;
