float  getElevation(vec2 position)
{
    float uPositionFrequency = 0.2;
    float elevation = 0.0;

    elevation += simplexNoise2d(position * uPositionFrequency      ) / 2.0;
    elevation += simplexNoise2d(position * uPositionFrequency * 2.0) / 4.0;
    elevation += simplexNoise2d(position * uPositionFrequency * 4.0) / 8.0;
    return elevation;
}

void main()
{
    // Neighbours positions
    float shift = 0.01;
    vec3 positionA = position.xyz + vec3(shift, 0.0, 0.0);
    vec3 positionB = position.xyz + vec3(0.0, 0.0, - shift);

    float elevation = getElevation(csm_Position.xz);
    csm_Position.y = elevation;
    positionA.y    += getElevation(positionA.xz);
    positionB.y    += getElevation(positionB.xz);

    // Compute normal
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);
    csm_Normal = cross(toA, toB);
}