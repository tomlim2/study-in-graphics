varying vec2 vUv;
varying vec4 vTangent;
varying float vWobble;

void main () {
    vec2 uv = vUv;
    float wobble = vWobble;
    float colorMix = smoothstep(1.,-1.,wobble);
    
    // float colorF = step(0.0, sin(vUv.x * 100.0 * vTangent.x));
    vec3 color = vec3(colorMix);

    gl_FragColor = vec4(color, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}