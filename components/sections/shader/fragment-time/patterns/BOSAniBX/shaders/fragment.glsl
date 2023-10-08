#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846
#define TWO_PI 6.28318530718

uniform float uWidth;
uniform float uHeight;

uniform float uTime;
uniform float uMouseX;
uniform float uMouseY;

uniform float uParamsA;
uniform float uParamsB;
uniform float uParamsC;
uniform float uParamsD;

uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vec2 uv = vUv;
    vec2 lines = step( 0.5,uv);

    vec3 color = vec3(lines.x);
    gl_FragColor = vec4(color, 1.);
}