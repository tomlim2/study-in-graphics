import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

const AddTexturesMaterial = shaderMaterial(
    { texture1: null, texture2: null },
    `
        varying vec2 vUv;

        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    `
        uniform sampler2D texture1;
        uniform sampler2D texture2;
        varying vec2 vUv;

        void main() {
            vec4 color1 = texture2D(texture1, vUv);
            vec4 color2 = texture2D(texture2, vUv);
            gl_FragColor = color1 + color2;
        }
    `
);

extend({ AddTexturesMaterial });

const Plane = () => {
    const material = useRef();

    // useEffect(() => {
    //     if (material.current) {
    //         material.current.texture1 = texture1;
    //         material.current.texture2 = texture2;
    //     }
    // }, [texture1, texture2]);

    return (
        <mesh>
            <planeGeometry args={[5, 5]} />
            <addTexturesMaterial ref={material} />
        </mesh>
    );
};

const Experience = () => {
    // const texture1 = new THREE.TextureLoader().load('/path/to/texture1.jpg');
    // const texture2 = new THREE.TextureLoader().load('/path/to/texture2.jpg');

    return (
            <Plane />
    );
};

export default Experience;
