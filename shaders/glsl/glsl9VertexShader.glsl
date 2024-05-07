varying vec3 vUv;
void main(){
    vec3 newPosition = position;
    gl_Posiriont = projectionMatrix * modelViewMatrix * vec3(position, 1.0);
    vUv = uv;
}