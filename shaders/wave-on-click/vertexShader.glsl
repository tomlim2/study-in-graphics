varying vec2 vUv;
varying float vWobble;
varying float vRadius;
varying vec3 vTriangleCenter;

attribute float aRandom;
attribute vec3 aCenter;

uniform vec3 uMouse;
uniform float uTime;

uniform vec3 uMouseWorldPosition;
uniform float uTriangleCount;
uniform float uCollisionRaius;
uniform sampler2D uTriangleDataTexture;

vec3 calculateRepulse(vec3 mouse, vec3 center, float strength, float radius) {
    vec3 direction = center - mouse;
    // direction.z = 0.0;
    float distance = length(direction);
    float falloff = smoothstep(radius, 0.0, distance);

    vec3 repulsionDir = normalize(direction);
    // repulsionDir.z = 0.0;

    return repulsionDir * falloff * strength;
}

void main () {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z += sin(modelNormal.x * 4.0) * 1.0;
    // modelPosition.z += cos(modelNormal.y * 4.0) * 1.0;
    vec3 biTangent = cross(normal, tangent.xyz);
    float shift = 0.05;
    // vec3 vTangent = tangent.xyz;

    vec3 positionA = csm_Position.xyz + tangent.xyz * shift;
    vec3 positionB = csm_Position.xyz + biTangent * shift;

    vec3 toA = normalize(positionA - csm_Position.xyz);
    vec3 toB = normalize(positionB - csm_Position.xyz);

    vec3 modifiedNormal = cross(toA, toB);

    // Wobble
    float wobble = simplexNoise4d(vec4(
        csm_Position.xyz,
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
    
    // Old
    vec3 repulsionNormal = normalize(aCenter - uMouseWorldPosition);
    float dst = length(aCenter - uMouseWorldPosition);
    float effect = 1.0 - smoothstep(0.0, uCollisionRaius*2.0, dst);


    // NEW Calculate the distance between the current vertex and the mouse position
    // float triangleID = floor(float(gl_VertexID) / 3.0);
    // vec4 triangleData = texture2D(uTriangleDataTexture, vec2(triangleID / uTriangleCount, 0.0));
    // vec3 triangleCenter = triangleData.xyz;
    // float idVariation = fract(triangleData.w*1234.5678) * 0.3;
    effect = pow(effect, 16.0);

    vec3 repulsion = calculateRepulse(uMouseWorldPosition, aCenter, uCollisionRaius, uCollisionRaius);
    // float dstnc = length(triangleCenter - uMouseWorldPosition);
    // float effect = 1.0 - smoothstep(0.0, uCollisionRaius, dstnc);

    float pulseFrequncy = 5.0 + aRandom * 10.0;
    float pulseAmplitude = .05 * effect;
    float pulse = sin(uTime * pulseFrequncy) * pulseAmplitude;
    float displaceAmount = effect * 10.0;
    displaceAmount =+  pulse;

    
    vec3 normalDisplacement = repulsionNormal * displaceAmount;

    vec3 displacement = normalDisplacement + repulsion * (1.0 + effect);

    csm_Position.xyz +=  displacement;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;

    vUv = uv;
    // vTangent = triangleData;
}