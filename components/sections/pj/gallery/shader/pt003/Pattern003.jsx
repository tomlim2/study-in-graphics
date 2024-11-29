import { extend, useFrame, useLoader } from '@react-three/fiber'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'
import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import { useRef } from "react";
import * as THREE from 'three';

export default function Pattern003() {
    const materialRef = useRef()
    const debugSunRef = useRef()
    const perlinTexture = useLoader(THREE.TextureLoader, "/coffeeSmoke/perlin.png")
    perlinTexture.wrapS = THREE.RepeatWrapping
    perlinTexture.wrapT = THREE.RepeatWrapping

    // Coordinates
    const sunSpherical = new THREE.Spherical(1, Math.PI * 0.5, 0.5)
    const sunDirection = new THREE.Vector3()

    const updateSun = () => {
        // Sun direction
        sunDirection.setFromSpherical(sunSpherical)

        // Debug
        if (debugSunRef.current) { debugSunRef.current.position.copy(sunDirection).multiplyScalar(5) }
    }



    useFrame((state, delta) => {
        updateSun()
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });

    const earthDayTexture = useLoader(THREE.TextureLoader, "/earth/day.jpg")
    earthDayTexture.colorSpace = THREE.SRGBColorSpace
    earthDayTexture.anisotropy = 8
    const earthNightTexture = useLoader(THREE.TextureLoader, "/earth/night.jpg")
    earthNightTexture.colorSpace = THREE.SRGBColorSpace
    earthNightTexture.anisotropy = 8
    const earthCloudTexture = useLoader(THREE.TextureLoader, "/earth/specularClouds.jpg")
    earthCloudTexture.colorSpace = THREE.SRGBColorSpace
    earthCloudTexture.anisotropy = 8

    return (
        <>
            <mesh ref={debugSunRef}>
                <icosahedronGeometry args={[0.1, 2]} />
                <meshBasicMaterial />
            </mesh>
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
                    side={THREE.DoubleSide} />
            </mesh>
        </>
    )
}