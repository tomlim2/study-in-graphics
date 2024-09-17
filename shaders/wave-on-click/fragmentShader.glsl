varying vec2 vUv;
varying vec4 vTangent;
varying float vWobble;
varying float vRadius;

uniform float uSSA;
uniform float uSSB;
uniform float uStpA;
uniform float uTime;

void main () {
    vec2 uv = vUv;
    float wobble = vWobble;
    float radius = vRadius;
    float colorMix = smoothstep(uSSA, uSSB, wobble) + radius;
    
    // colorMix = smoothstep(uSSA, uSSB, wobble) * colorMix;
    // float colorF = step(0.0, sin(vUv.x * 100.0 * vTangent.x));
    // vec3 color = vec3(colorMix);
    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}