import { extend, useFrame, useLoader } from '@react-three/fiber'
import fragmentShader from 'raw-loader!glslify-loader!./fragment.glsl'
import vertexShader from 'raw-loader!glslify-loader!./vertex.glsl'
import { DoubleSide, RepeatWrapping, TextureLoader } from "three";
import { useRef } from "react";
import * as THREE from 'three';
import { Text3D } from '@react-three/drei';

export default function Pattern005() {
    const materialRef = useRef()
    const coneRef = useRef()
    const perlinTexture = useLoader(TextureLoader, "/coffeeSmoke/perlin.png")
    perlinTexture.wrapS = RepeatWrapping
    perlinTexture.wrapT = RepeatWrapping
    console.log(perlinTexture);

    return (
        <>
            <Text3D
                font="/assets/fonts/helvetiker_regular.typeface.json"
                size={0.75}
                height={0.2}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.02}
                bevelOffset={0}
                bevelSegments={5}
            >
                HELLO R3F
            </Text3D>
        </>
    )
}