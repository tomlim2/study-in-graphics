varying vec2 vUv;

uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;

void main () {
    // Day / night color
    vec3 color = vec3(0.0);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    color = dayColor;
    gl_FragColor = vec4(color, 1.0);
}