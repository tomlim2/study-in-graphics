varying vec3 vPosition;
varying vec3 vNormal;

uniform float uTime;
uniform vec3 uHolographicColor;
uniform float uHolographicFrequncy;
uniform float uStripeStrength;
uniform float uFresnelStrength;
uniform float uFresnelPower;

void main()
{
    // Normal
    vec3 normal = normalize(vNormal);
    if(!gl_FrontFacing)
        normal *= - 1.0;

     // Stripes
    float stripes = mod((vPosition.y - uTime * 0.02) * uHolographicFrequncy, 1.0);
    stripes = pow(stripes, uStripeStrength);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    // float fresnel = dot(viewDirection, vNormal);
    float fresnel = dot(viewDirection, normal) + 1.0;
    fresnel = pow(fresnel, uFresnelStrength);

    // Falloff
    float falloff = smoothstep(0.9, 0.0, fresnel);

    // Holographic
    float holographic = stripes * fresnel;
    holographic += fresnel * uFresnelPower;
    holographic *= falloff;

    // Final color
    // gl_FragColor = vec4(1.0, 1.0, 1.0, stripes);
    gl_FragColor = vec4(uHolographicColor, holographic);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}