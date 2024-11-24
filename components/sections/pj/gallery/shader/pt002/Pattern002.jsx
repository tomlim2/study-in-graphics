import { extend, useFrame, useLoader } from '@react-three/fiber'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'
import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import { DoubleSide, RepeatWrapping, TextureLoader } from "three";
import { useRef } from "react";

export default function Pattern002() {
    const materialRef = useRef()
    const perlinTexture = useLoader(TextureLoader, "/coffeeSmoke/perlin.png")
    perlinTexture.wrapS = RepeatWrapping
    perlinTexture.wrapT = RepeatWrapping
    console.log(perlinTexture);
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });
    return (
        <>
            <mesh position={[-1, 0, 0]} scale={[1, 1, 1]}>
                <planeGeometry args={[1, 1, 16, 32]} />
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