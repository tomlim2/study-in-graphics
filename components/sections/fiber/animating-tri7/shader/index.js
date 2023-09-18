import Common from "raw-loader!glslify-loader!./common.glsl";
import Vertex from "raw-loader!glslify-loader!./vertex.glsl";

export const shaders = [{ common: Common, vertex: Vertex }];
