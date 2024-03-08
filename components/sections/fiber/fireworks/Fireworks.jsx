import { useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import fireworkFragmentShader from 'raw-loader!glslify-loader!shaders/fireworks/fragment.glsl'
import fireworkVertexShader from 'raw-loader!glslify-loader!shaders/fireworks/vertex.glsl'
import { useEffect, useRef } from "react";
import * as THREE from "three"


export default function Fireworks() {
    const materialRef = useRef()
    const count = 600
    const positionsArray = new Float32Array(count * 3);
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }
    sizes.resolution = new THREE.Vector2(sizes.width, sizes.height)
    const textures = [
        useLoader(THREE.TextureLoader, '/fireworks/particles/1.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/2.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/3.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/4.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/5.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/6.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/7.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/8.png'),
    ]
    console.log(textures);

    const { particleSize, fresnelPower } = useControls("holographic", {
        particleSize: {
            value: 0.5,
            step: 0.01,
            min: 0,
            max: 2.5,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uSize.value = value;
                }
            }
        },
        fresnelPower: {
            value: 1.25,
            step: 0.25,
            min: 0,
            max: 10,
            onChange: (value) => {
                if (materialRef.current) {
                    // materialRef.current.uniforms.uFresnelPower.value = value;
                }
            }
        },
    });

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        positionsArray[i3] = Math.random() - 0.5
        positionsArray[i3 + 1] = Math.random() - 0.5
        positionsArray[i3 + 2] = Math.random() - 0.5
    }

    useEffect(() => {
        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value = sizes.resolution;
        }
        const handleResize = () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
            sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

            if (materialRef.current) {
                materialRef.current.uniforms.uResolution.value = sizes.resolution;
            }
        };

        // Add event listener when component mounts
        window.addEventListener('resize', handleResize);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getTexture = (indexNumber = 0) => {
        textures[indexNumber].flipY = false
        return textures[indexNumber]
    }

    return <>
        <points>
            <bufferGeometry >
                <bufferAttribute
                    attach="attributes-position" //attribute parameter yang akan dikontrol
                    array={positionsArray}
                    count={count} //
                    itemSize={3} //dikeranakan telah diketahui bahwa tiap arraytype axis akan berisi 3 value pada 1d array
                />
            </bufferGeometry>
            <shaderMaterial
                ref={materialRef}
                vertexShader={fireworkVertexShader}
                fragmentShader={fireworkFragmentShader}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                uniforms={
                    {
                        uSize: new THREE.Uniform(particleSize),
                        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.resolution)),
                        uTexture: new THREE.Uniform(getTexture(7))
                    }
                }

            />
        </points>
    </>
}