import { useLoader } from '@react-three/fiber';
import gsap from 'gsap';
import { useControls } from 'leva';
import fireworkFragmentShader from 'raw-loader!glslify-loader!shaders/fireworks/fragment.glsl'
import fireworkVertexShader from 'raw-loader!glslify-loader!shaders/fireworks/vertex.glsl'
import { useEffect, useRef } from "react";
import * as THREE from "three"
import { Color, AdditiveBlending } from 'three';


export default function Firework() {
    const materialRef = useRef()
    const geometryRef = useRef()
    const pointsRef = useRef()

    const count = 60
    const positionsArray = new Float32Array(count * 3);
    const sizesArray = new Float32Array(count);
    const timeMultipliersArray = new Float32Array(count)
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

    const { particleSize, progress, color } = useControls("holographic", {
        color: {
            value: "#2c6bdb",
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uColor.value = new Color(value);
                }
            }
        },
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
        progress: {
            value: 0,
            min: 0,
            max: 1,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uProgress.value = value;
                }
            }
        },
    });

    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        const spherical = new THREE.Spherical(
            1 * (0.75 + Math.random() * 0.25),
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
            // scene.remove(firework)
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

    const getTexture = (indexNumber = 0) => {
        textures[indexNumber].flipY = false
        return textures[indexNumber]
    }

    return <>
        <points ref={pointsRef}>
            <bufferGeometry ref={geometryRef} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={fireworkVertexShader}
                fragmentShader={fireworkFragmentShader}
                transparent={true}
                depthWrite={false}
                blending={AdditiveBlending}
                uniforms={
                    {
                        uSize: new THREE.Uniform(particleSize),
                        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.resolution)),
                        uTexture: new THREE.Uniform(getTexture(7)),
                        uColor: new THREE.Uniform(color),
                        uProgress: new THREE.Uniform(0)
                    }
                }

            />
        </points>
    </>
}