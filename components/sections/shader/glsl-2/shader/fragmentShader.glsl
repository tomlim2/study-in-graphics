varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec2 st = vUv;
    st = st - 0.5;
    st = st * 2.0;
    float d = length(st);
    d = sin(d);
    d = abs(d);

    d = smoothstep(0.0, 0.1, d);

    vec3 color = vec3(d,d,d);

    gl_FragColor = vec4(color, 1.0);
}