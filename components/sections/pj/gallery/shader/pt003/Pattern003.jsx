import { extend, useFrame, useLoader } from '@react-three/fiber'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'
import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import { DoubleSide, RepeatWrapping, SRGBColorSpace, TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from 'three';

export default function Pattern003() {
    const materialRef = useRef()
    const perlinTexture = useLoader(TextureLoader, "/coffeeSmoke/perlin.png")
    perlinTexture.wrapS = RepeatWrapping
    perlinTexture.wrapT = RepeatWrapping
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });

    const earthDayTexture = useLoader(TextureLoader, "/earth/day.jpg")
    earthDayTexture.colorSpace = SRGBColorSpace
    earthDayTexture.anisotropy = 8
    const earthNightTexture = useLoader(TextureLoader, "/earth/night.jpg")
    earthNightTexture.colorSpace = SRGBColorSpace
    earthNightTexture.anisotropy = 8
    const earthCloudTexture = useLoader(TextureLoader, "/earth/specularClouds.jpg")
    earthCloudTexture.colorSpace = SRGBColorSpace
    earthCloudTexture.anisotropy = 8

    return (
        <>
            <mesh position={[-1, 1, 0]} scale={[1, 1, 1]}>
                <sphereGeometry args={[.5, 16, 32]} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fragmentShader}
                    transparent={true}
                    uniforms=
                    {
                        {
                            uDayTexture: new THREE.Uniform(earthDayTexture),
                            uNightTexture: new THREE.Uniform(earthNightTexture),
                            uSpecularCloudsTexture: new THREE.Uniform(earthCloudTexture),
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