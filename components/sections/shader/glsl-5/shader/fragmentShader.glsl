varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uTexture1;

vec3 palette(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

float boxes(in vec2 _st, in vec2 _size) {
    _size = vec2(0.5) - _size * 0.5;

    vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
    uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);

    return clamp(uv.x * uv.y, 0.0, 1.0);
}

vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

void main() {
    vec2 st = vUv;
    vec3 fc = vec3(1.0, 0.0, 1.0);
    vec4 textureColor = texture2D(uTexture1, st);
    textureColor = sRGBToLinear(textureColor); 
    vec3 box = (vec3(boxes(st, vec2(0.5))));
    fc *= box;
    fc += (1.0-box)*textureColor.xyz;
    gl_FragColor = vec4(fc, 1.0);
}