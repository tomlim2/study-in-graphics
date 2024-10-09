uniform float time;
uniform float progress;
uniform sampler2D uTDiffuse;
uniform sampler2D uTPrev;
uniform vec4 uResolution;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.14159265359793238;

void main(){
    vec4 color = texture2D(uTDiffuse, vUv);
    vec4 prev = texture2D(uTPrev, vUv);
    gl_FragColor = vec4(vUv, 1.0,1.0);
    gl_FragColor = color *.1;
}