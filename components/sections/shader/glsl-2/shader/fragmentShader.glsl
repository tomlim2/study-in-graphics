varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

void main() {
    vec2 st = vUv;
    
    st -= 0.5;
    st *= 2.0;

    st.x *= uResolution.x / uResolution.y;
    float d = length(st);
    // d = sin(d);
    // d = abs(d);

    // d = smoothstep(0.0, 0.1, d);

    d = sin(d*8.0+uTime)/8.0;
    // d -= 0.5;
    d = abs(d);
    // d = step(0.1, d);

    d = smoothstep(0.0,0.1, d);
    vec3 color = vec3(d,d,d);

    gl_FragColor = vec4(color, 1.0);
}