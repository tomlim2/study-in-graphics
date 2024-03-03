varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform float uGlitchStrength;
uniform float uGlitchFrequency;

void main()
{
     // Position
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.0);

    // Glitch
    float glitchTime = uTime - modelPosition.y;
    float glitchStrength = sin(glitchTime) + sin(glitchTime * 2.34) +  sin(glitchTime * 5.67);
    glitchStrength /= uGlitchFrequency;
    glitchStrength = smoothstep(0.3, 1.0, glitchStrength);
    glitchStrength *= uGlitchStrength;

    modelPosition.x += (random2D(modelPosition.xz + uTime) - 0.5) * glitchStrength;
    modelPosition.z += (random2D(modelPosition.zx + uTime) - 0.5) * glitchStrength;

    // Final position
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Varyings
    // vPosition = position.xyz;
    vPosition = modelPosition.xyz;
    // vNormal = normal;
    vNormal = modelNormal.xyz;
}