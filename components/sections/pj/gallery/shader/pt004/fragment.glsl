uniform sampler2D uPerlinTexture;
varying vec2 vUv;

void main () {
    // Smoke
    float smoke = texture(uPerlinTexture, vUv).r;
    // Final color
    gl_FragColor = vec4(smoke, smoke, smoke, 1.0);
}