varying vec2 vUv;
varying vec3 vNormal;

uniform float uTime;
uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;


void main() {
    vec3 normal = vNormal;
    vec3 color = vec3(0.0);

    // Sun orientation
    vec3 uSunDirection = vec3(-1.0, 0.0, 0.0);
    float sunOrientation = dot(uSunDirection, normal);

    // Day / night color
    float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    color = mix(nightColor, dayColor, dayMix);
    // color = nightColor;


    // Final color
    gl_FragColor = vec4(color, 1.0);
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}