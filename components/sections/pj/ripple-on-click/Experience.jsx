import * as THREE from "three";

const Experience = () => {
    // Shaders
    const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

    const fragmentShader = `
varying vec2 vUv;
uniform vec2 uMouse;
uniform float uTime;

void main() {
  float dist = distance(vUv, uMouse);
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.1;
  gl_FragColor = vec4(vec3(0.3 + ripple), 1.0);
}
`;
    const uniforms = {
        uTime: new THREE.Uniform(0),
        uMouse: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
    }
    return (
        <>
            <mesh>
                <planeGeometry args={[5, 5, 100, 100]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                />
            </mesh>
        </>
    );
}

export default Experience;  