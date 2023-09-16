import ShaderFragment from "raw-loader!glslify-loader!./fragment.glsl";
import ShaderVertex from "raw-loader!glslify-loader!./vertex.glsl";


export const shaderMap = [
  { fragment: ShaderFragment, vertex: ShaderVertex },
];
