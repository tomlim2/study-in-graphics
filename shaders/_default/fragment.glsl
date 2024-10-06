uniform float uTime;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform vec4 uResolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.14159265359793238;

void main(){
    vec4 color = vec4(vUv, 0.0,1.0);
    gl_FragColor = vec4(vUv);
}