varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vec3 newPosition = position;

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Varying
    // vNormal = normal;
    vNormal = modelNormal.xyz;

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
}