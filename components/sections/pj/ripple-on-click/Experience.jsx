import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const Experience = () => {
    // Shaders
    const raycast = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    const { camera, render } = useThree();
    const meshRef = useRef();
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
    vec2 mouse = (uMouse / vec2(2.5) + vec2(2.))/2. - vec2(.5,.5);
  float dist = distance(vUv, mouse);
  float ripple = sin(dist * 20.0 - uTime * 5.0) * 0.1;
  gl_FragColor = vec4(vec3(0.3 + ripple), 1.0);
}
`;
    const uniforms = {
        uTime: new THREE.Uniform(0),
        uMouse: new THREE.Uniform(new THREE.Vector2(0.5, 0.5)),
    }

    const castDotOnObject = (event) => {

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycast.setFromCamera(mouse, camera);
        const intersects = raycast.intersectObject(meshRef.current);
        if (intersects.length > 0) {
            const { point } = intersects[0];
            console.log(point);
            
            uniforms.uMouse.value.copy(point);
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', castDotOnObject)

        return () => {
            window.removeEventListener('mousemove', castDotOnObject);
        }
    }, [])



    useFrame((state, delta) => {
        const { mouse, clock } = state;
        uniforms.uTime.value = clock.elapsedTime;
        // const vector = new THREE.Vector2(mouse.x, mouse.y);
        // uniforms.uMouse.value = vector;
    })
    return (
        <>
            <mesh ref={meshRef}>
                <planeGeometry args={[5, 5, 100, 100]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    uniforms={uniforms}
                />
            </mesh>
        </>
    );
}

export default Experience;  