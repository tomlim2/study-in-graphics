varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;

    vec3 ro = vec3(0.0,0.0,-3.0); // ray origin
    vec3 rd = normalize(vec3(uv,1.0)); // ray direction

    gl_FragColor = vec4(uv, 0.0, 1.0);
}