varying vec2 vUv;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

vec3 palette(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.5);
    vec3 c = vec3(1.0, 0.7,0.4);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
}

float sdSphere(vec3 p, float s) {
    return length(p) - s;
}

float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k * (1.0 / 6.0);
}

mat2 rot2D(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}
/*
// old map
float map(vec3 p) {
    vec3 spherePos = vec3(sin(uTime) * 3.0, 0.0, 0.0);
    float sphere = sdSphere(p - spherePos, 1.0);

    vec3 q = p; // input copy
    q.y -= uTime * 0.5;
    q = fract(q) - 0.5; // space repetition
    q.xz *= rot2D(uTime);

    float boxScale = 2.0; // box scale

    float box = sdBox(
        // p * boxScale, 
    q * boxScale, vec3(0.1)) / boxScale;

    float ground = p.y + 0.75;

    // Closest distance to the scene
    // return min(sphere, box);
    return smin(ground, smin(sphere, box, 0.5), 1.0);
}
*/

float sdOctahedron(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
}

float map(vec3 p) {
    p.z += uTime * 0.4;
    p.xy = fract(p.xy) - 0.5; // space repetition
    p.z = mod(p.z, 0.25) - 0.125;
    // p.xz *= rot2D(uTime);

    float box = sdOctahedron(p, 0.15);
    return box;
}

void main() {
    vec2 uv = (vUv - 0.5) * 2.0;
    uv.x *= uResolution.x / uResolution.y;
    vec2 m = (uMouse.xy - vec2(0.5)) * 2.0;
    m.x *= uResolution.x / uResolution.y;
    // Initialization
    vec3 ro = vec3(0.0, 0.0, -3.0); // ray origin
    vec3 rd = normalize(vec3(uv, 1.0)); // ray direction
    vec3 col = vec3(0.0); // final pixel color

    float t = 0.0; // total distance travelled

    // raymarching
    m = vec2(cos(uTime*.2), sin(uTime*0.2));

    int i;
    for(i = 0 ; i < 80 ; i++) {
        vec3 p = ro + rd * t * cos(uTime * 0.02); // position along the ray
        p.xy *= rot2D(t * .2 * m.x);
        p.y += sin(t * (m.y) * 0.5) * 0.75;

        float d = map(p); // cyrrent distance to the scene

        t += d; // "march" the ray

        if(d < .001 || t > 100.)
            break;
    }

    col = palette(t * 0.04 * sin(uTime * 0.02) + float(i) * 0.005);

    gl_FragColor = vec4(col, 1.0);
}