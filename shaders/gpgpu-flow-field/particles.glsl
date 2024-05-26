void main()
{
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particle = texture(uParticles, uv);
    gl_FragColor = particle;
    gl_FragColor = vec4(1.,1.,0.,0.);
}