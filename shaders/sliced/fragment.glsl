varying vec3 vPosition;

void main()
{
    // csm_FragColor = vec4(vPosition, 1.0);
    float angle = atan(vPosition.y, vPosition.x);
    float uSliceStart = 1.0;
    float uSliceArc = 1.5;

    if(angle > uSliceStart && angle < uSliceStart + uSliceArc)
        discard;

    csm_FragColor = vec4(vec3(angle), 1.0);
}