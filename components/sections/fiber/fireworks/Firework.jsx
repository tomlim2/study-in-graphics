import gsap from 'gsap';

import fireworkFragmentShader from 'raw-loader!glslify-loader!shaders/fireworks/fragment.glsl'
import fireworkVertexShader from 'raw-loader!glslify-loader!shaders/fireworks/vertex.glsl'
import glslUtils from 'raw-loader!glslify-loader!shaders/libs/glslUtils.glsl'
import { useEffect, useRef } from "react";
import * as THREE from "three"
import { AdditiveBlending } from 'three';


export default function Firework({ count, particleSize, particleColor, radius, position, texture }) {
    const materialRef = useRef()
    const geometryRef = useRef()
    const pointsRef = useRef()

    const positionsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);
    const timeMultipliersArray = new Float32Array(count)
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    sizes.resolution = new THREE.Vector2(sizes.width, sizes.height)

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        const spherical = new THREE.Spherical(
            radius,
            Math.random() * Math.PI,
            Math.random() * Math.PI * 2
        )

        const position = new THREE.Vector3()
        position.setFromSpherical(spherical)

        positionsArray[i3] = position.x
        positionsArray[i3 + 1] = position.y
        positionsArray[i3 + 2] = position.z

        sizesArray[i] = Math.random()
        timeMultipliersArray[i] = 1 + Math.random()
    }

    useEffect(() => {
        const geometry = geometryRef.current;

        const destroy = () => {
            geometryRef.current.dispose()
            materialRef.current.dispose()
            pointsRef.current.destroy
        }

        if (materialRef.current) {
            materialRef.current.uniforms.uResolution.value = sizes.resolution;
            gsap.to(
                materialRef.current.uniforms.uProgress,
                { value: 1, duration: 3, ease: 'linear', onComplete: destroy },
            )
        }
        if (geometry) {
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
            geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizesArray, 1))
            geometry.setAttribute('aTimeMultiplier', new THREE.Float32BufferAttribute(timeMultipliersArray, 1))
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

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <>
        <points ref={pointsRef} position={position}>
            <bufferGeometry ref={geometryRef} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={`
                ${glslUtils}
                ${fireworkVertexShader}
                `}
                fragmentShader={fireworkFragmentShader}
                transparent={true}
                depthWrite={false}
                blending={AdditiveBlending}
                uniforms={
                    {
                        uSize: new THREE.Uniform(particleSize),
                        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.resolution)),
                        uTexture: new THREE.Uniform(texture),
                        uColor: new THREE.Uniform(particleColor),
                        uProgress: new THREE.Uniform(0)
                    }
                }

            />
        </points>
    </>
}