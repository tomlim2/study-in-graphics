uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform vec4 uResolution;

varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.14159265359793238;

void main(){
    vec2 uv = vUv;
    vec3 color = vec3(0.0,uv);
    float alpha = 1.0;
    gl_FragColor = vec4(color, alpha);
}