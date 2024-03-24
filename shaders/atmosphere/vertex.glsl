varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 newPosition = position;

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Varying
    // vNormal = normal;
    vNormal = modelNormal.xyz;
    vPosition = modelPosition.xyz;

    // Position

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    vUv = uv;
}