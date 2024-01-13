
varying vec2 vUv;
uniform float uTime;

void main() {
    vec2 st = vUv;

    st = st - 0.5;
    st = ceil(st);

    vec3 color = vec3(st, 0.0);

	gl_FragColor = vec4(color,1.0);
}