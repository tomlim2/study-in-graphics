import { extend, useFrame, useLoader } from '@react-three/fiber'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'
import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import { DoubleSide, RepeatWrapping, TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from 'three';

export default function Pattern004 () {
    const materialRef = useRef()
    const coneRef = useRef()
    const perlinTexture = useLoader(TextureLoader, "/coffeeSmoke/perlin.png")
    perlinTexture.wrapS = RepeatWrapping
    perlinTexture.wrapT = RepeatWrapping
    console.log(perlinTexture);
    useFrame((state, delta) => {
         
        let target = new THREE.Vector3(state.pointer.x, state.pointer.y, 0);
        if(coneRef.current) {
            coneRef.current.rotation;
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });
    return (
        <>
            <mesh ref={coneRef} position={[3, 0, 0]} scale={[1, 1, 1]}>
                <coneGeometry args={[1, 2, 32]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent={true}
                    uniforms=
                    {
                        {
                            uTime: { value: 0 },
                            uPerlinTexture: { value: perlinTexture }
                        }}
                    // wireframe={true} 
                    depthWrite={false}
                    side={DoubleSide} />
            </mesh>
        </>
    )
}