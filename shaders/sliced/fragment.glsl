varying vec3 vPosition;

void main()
{
    // csm_FragColor = vec4(vPosition, 1.0);
    float angle = atan(vPosition.y, vPosition.x);

    csm_FragColor = vec4(vec3(angle), 1.0);
}