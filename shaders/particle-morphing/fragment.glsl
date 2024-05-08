uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec3 vColor;

void main()
{
    vec3 colorA = uColorA;
    vec3 colorB = uColorB;
    vec3 noise = vColor;
    vec3 color = mix(colorA, colorB, vColor);
    vec2 uv = gl_PointCoord;
    float distanceToCenter = length(uv - vec2(0.5));
    float alpha = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}