import Fragment from "raw-loader!glslify-loader!./fragment.glsl";
import Vertex from "raw-loader!glslify-loader!./vertex.glsl";


export const shaders = [
  { fragment: Fragment, vertex: Vertex },
];
