varying vec2 vUv;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uTime;

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

float map(vec3 p) {
    vec3 spherePos = vec3(sin(uTime) * 3.0, 0.0, 0.0);
    float sphere = sdSphere(p - spherePos, 1.0);

    vec3 q = p; // input copy
    q = fract(p) - 0.5;
    // q.xz *= rot2D(uTime);

    float boxScale = 10.0; // box scale

    float box = sdBox(
        // p * boxScale, 
    q * boxScale, vec3(0.75)) / boxScale;

    float ground = p.y + 0.75;

    // Closest distance to the scene
    // return min(sphere, box);
    return smin(ground, smin(sphere, box, 0.5), 1.0);
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
    
    // camera vertical
    float my = m.y;
    if(my > 0.){
        my = 0.;
    }
    ro.yz *= rot2D(-my);
    rd.yz *= rot2D(-my);

    // camera horizontal
    ro.xz *= rot2D(-m.x);
    rd.xz *= rot2D(-m.x);

    // raymarching
    for(int i = 0 ; i < 80 ; i++) {
        vec3 p = ro + rd * t; // position along the ray

        float d = map(p); // cyrrent distance to the scene

        t += d; // "march" the ray

        // col = vec3(i) / 80.0;

        if(d < .001 || t > 100.)
            break;
    }

    col = vec3(t * 0.2);

    gl_FragColor = vec4(col, 1.0);
}