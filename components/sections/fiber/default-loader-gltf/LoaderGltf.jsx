import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { Color, MeshBasicMaterial, meshToonMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

export default function LoaderGltf() {
    /**
     * Configs
     */
    const config = useControls(
        'cartridge.material',
        {
            transmissionSampler: false,
            backside: true,
            samples: { value: 10, min: 1, max: 32, step: 1 },
            resolution: { value: 2048, min: 256, max: 2048, step: 256 },
            transmission: { value: 1, min: 0, max: 1 },
            roughness: { value: 0.35, min: 0, max: 1, step: 0.01 },
            thickness: { value: 0.25, min: 0, max: 10, step: 0.01 },
            ior: { value: 1.46, min: 1, max: 5, step: 0.01 },
            chromaticAberration: { value: 1, min: 0, max: 2 },
            anisotropy: { value: 0.1, min: 0, max: 1, step: 0.01 },
            distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
            distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
            temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
            clearcoat: { value: 0, min: 0, max: 1 },
            attenuationDistance: { value: 0.28, min: 0, max: 10, step: 0.01 },
            attenuationColor: '#ea59ff',
            color: '#ffffff',
            bg: '#000000'
        }
    )
    const part1 = useRef()
    const part2 = useRef()
    const part3 = useRef()
    const part4 = useRef()
    const part5Group = useRef()
    const part6 = useRef()
    const group = useRef()
    const { nodes, materials } = useGLTF(
        "/assets/models/emojis/emoji01B.glb"
    );
    const meshScale = 300;
    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        const timeOffset = .5
        const aniSpeed = .1;
        part5Group.current.rotation.z = time * -1.5;
        group.current.position.y = Math.sin(time * 0.5 + timeOffset) * aniSpeed;
    })
    return (
        <>
            < group ref={group} dispose={null} >
                <mesh
                    ref={part6}
                    castShadow
                    receiveShadow
                    geometry={nodes.part6.geometry}
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={meshScale}
                >
                    <MeshTransmissionMaterial
                        background={new THREE.Color(config.bg)}
                        {...config}
                    />
                </mesh>
                <mesh
                    ref={part1}
                    castShadow
                    receiveShadow
                    geometry={nodes.part1.geometry}

                    rotation={[Math.PI / 2, 0, 0]}
                    scale={meshScale}
                >
                    <MeshTransmissionMaterial
                        background={new THREE.Color(config.bg)}
                        {...config}
                    />
                </mesh>
                <mesh
                    ref={part2}
                    castShadow
                    receiveShadow
                    geometry={nodes.part2.geometry}

                    rotation={[Math.PI / 2, 0, 0]}
                    scale={meshScale}
                ><MeshTransmissionMaterial
                        background={new THREE.Color(config.bg)}
                        {...config}
                    /></mesh>
                <mesh
                    ref={part3}
                    castShadow
                    receiveShadow
                    geometry={nodes.part3.geometry}

                    rotation={[Math.PI / 2, 0, 0]}
                    scale={meshScale}
                ><MeshTransmissionMaterial
                        background={new THREE.Color(config.bg)}
                        {...config}
                    /></mesh>
                <mesh
                    ref={part4}
                    castShadow
                    receiveShadow
                    geometry={nodes.part4.geometry}

                    rotation={[Math.PI / 2, 0, 0]}
                    scale={meshScale}
                ><MeshTransmissionMaterial
                        background={new THREE.Color(config.bg)}
                        {...config}
                    /></mesh>
                <group ref={part5Group}
                    position={[1.87, 0.333, 0]}
                    rotation={[0, 0, 0]} >
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.part5.geometry}

                        rotation={[Math.PI / 2, 0, 0]}
                        position={[-1.87, -0.333, 0]}
                        scale={meshScale}
                    ><MeshTransmissionMaterial
                            background={new THREE.Color(config.bg)}
                            {...config}
                        /></mesh>
                </group>
            </group >


        </>
    );
}
