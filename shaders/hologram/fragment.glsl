varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;

void main()
{
     // Stripes
    float stripes = mod((vPosition.y - uTime * 0.02) * 20.0, 1.0);
    stripes = pow(stripes, 3.0);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    // float fresnel = dot(viewDirection, vNormal);
    float fresnel = dot(viewDirection, vNormal) + .4;

    // Final color
    gl_FragColor = vec4(1.0, 1.0, 1.0, stripes);
    gl_FragColor = vec4(1.0, 1.0, 1.0, fresnel);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}