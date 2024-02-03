varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;

vec3 palette(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 st = vUv;
    st -= 0.5;
    st *= 2.0;
    st.x *= uResolution.x / uResolution.y;

    vec2 st0 = st;
    vec3 finalColor = vec3(0.0);

    for(float i = 0.0 ; i < 4.0 ; i++) {
        st = fract(st * 1.5) - 0.5;

        float d = length(st) * exp(-length(st0));
        vec3 col = palette(length(st0) + i * 0.4 + uTime * 0.4);

        // d = sin(d);
        // d = abs(d);

        // d = smoothstep(0.0, 0.1, d);

        d = sin(d * 8.0 + uTime) / 8.0;
        // d -= 0.5;
        d = abs(d);
        // d = step(0.1, d);

        // d = smoothstep(0.0,0.1, d);
        d = pow(0.01 / d, 1.2);
        finalColor += col * d;
    }

    gl_FragColor = vec4(finalColor, 1.0);
}