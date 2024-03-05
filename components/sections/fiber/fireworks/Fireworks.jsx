import { useLoader } from "@react-three/fiber";
import fireworkFragmentShader from 'raw-loader!glslify-loader!shaders/fireworks/fragment.glsl'
import fireworkVertexShader from 'raw-loader!glslify-loader!shaders/fireworks/vertex.glsl'
import { useEffect } from "react";
import * as THREE from "three"


export default function Fireworks() {
    const heyMap = useLoader(THREE.TextureLoader, '/assets/images/thumbnails/test-glsl-1.png')
    const count = 600
    const positionsArray = new Float32Array(count * 3);
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }
    sizes.resolution = new THREE.Vector2(sizes.width, sizes.height)

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        positionsArray[i3] = Math.random() - 0.5
        positionsArray[i3 + 1] = Math.random() - 0.5
        positionsArray[i3 + 2] = Math.random() - 0.5
    }

    console.log(positionsArray);

    useEffect(() => {
        const handleResize = () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            sizes.resolution.set(sizes.width, sizes.height)
        };

        // Add event listener when component mounts
        window.addEventListener('resize', handleResize);

        // Clean up event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
                vertexShader={fireworkVertexShader}
                fragmentShader={fireworkFragmentShader}
                uniforms={
                    {
                        uSize: new THREE.Uniform(50),
                        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.resolution))
                    }
                }

            />
        </points>
    </>
}