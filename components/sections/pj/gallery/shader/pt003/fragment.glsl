varying vec2 vUv;
varying vec3 vNormal;

uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;

void main () {
    vec3 color = vec3(0.0);

    // Sun orientation
    vec3 sunLightDirection = vec3(1.0, 0.0, 0.0);
    float sunOrientation = dot(sunLightDirection, vNormal);

    // Day / night color
    float dayMix = smoothstep(- 0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    color = mix(nightColor, dayColor, dayMix);

    gl_FragColor = vec4(color, 1.0);
}