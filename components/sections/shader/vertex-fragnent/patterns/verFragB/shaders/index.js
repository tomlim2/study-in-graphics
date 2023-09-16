import FragmentShader from "raw-loader!glslify-loader!./fragment.glsl";
import VertexShader from "raw-loader!glslify-loader!./vertex.glsl";

export const shaderMap = [
  { fragment: FragmentShader, vertex: VertexShader },
];
