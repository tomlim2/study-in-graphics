varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec2 st = vUv;
    st -= 0.5;
    st *= 2.0;
    st.x *= uResolution.x / uResolution.y;

    gl_FragColor = vec4(st,0.0, 1.0);
}