varying vec2 vUv;
varying vec4 vTangent;
varying float vWobble;
attribute vec4 tangent;

void main () {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelNormal.x * 4.0) * 1.0;
    // modelPosition.z += cos(modelNormal.y * 4.0) * 1.0;
    vec3 biTangent = cross(normal, tangent.xyz);
    float shift = 0.01;
    // vec3 vTangent = tangent.xyz;

    vec3 positionA = modelPosition.xyz + tangent.xyz * shift;
    vec3 positionB = modelPosition.xyz + biTangent * shift;

    vec3 toA = normalize(positionA - modelPosition.xyz);
    vec3 toB = normalize(positionB - modelPosition.xyz);

    vec3 modifiedNormal = cross(toA, toB);

    // Wobble
    float wobble = simplexNoise4d(vec4(
        modelPosition.xyz, // XYZ
        0.0           // W
    ));

    modelPosition.xyz += wobble * modifiedNormal;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    vUv = uv;
    vTangent = tangent;
    vWobble = wobble;
}