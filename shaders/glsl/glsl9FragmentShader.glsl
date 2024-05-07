varying vec2 vUv;

void main(){
    vec2 uv = vUv;
    vec3 color = vec3(uv, 1.0);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}