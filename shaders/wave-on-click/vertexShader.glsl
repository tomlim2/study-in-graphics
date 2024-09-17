varying vec2 vUv;
varying vec4 vTangent;
varying float vWobble;
varying float vRadius;

attribute vec4 tangent;
attribute float aRandom;
attribute vec3 aCenter;

uniform vec3 uMouse;
uniform float uTime;
uniform float uVel;
uniform float uDeltaTime;
uniform vec3 uMouseWorldPosition;


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
        modelPosition.xyz,
        uTime
    ));

    vWobble = wobble;

    // OLD Calculate the distance between the current vertex and the mouse position
    //float distance = length(uMouse - modelPosition.xyz);
    // Define the radius of the sphere
    //float radius = 2.;

    // Raise up the vertices within the sphere when the mouse enters
    // if (distance < radius) {
    //     modelPosition.xyz += 0.3 * modifiedNormal * (radius - distance);
    //     vRadius = 0.0;
    // } else {
    //     vRadius = 0.0;
    // }
    // modelPosition.xyz += wobble * modifiedNormal; //OLD
    vec3 mousePos = vec3 (uMouseWorldPosition.x,uMouseWorldPosition.y,.5);
    float dst = length(aCenter - mousePos);
    float effect = 1.0 - smoothstep(0.0, 30., dst);
    effect = pow(effect, 120.0);

    vec3 displaceDirection = normal;
    float displaceAmount = effect * 2.5;

    modelPosition.xyz += displaceAmount * modifiedNormal;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    vUv = uv;
    vTangent = tangent;
}