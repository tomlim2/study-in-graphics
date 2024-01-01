import { MeshTransmissionMaterial, useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { Color, MeshBasicMaterial, meshToonMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

export default function LoaderGltf() {
    const { color } = useControls("standard material", {
        color: "#1d8f75",
    });
    const part6 = useRef()
    const group = useRef()
    const suzanne = useGLTF(
        "/assets/models/monkeyHead.glb"
    );
    console.log(suzanne.nodes.Scene);
    console.log(suzanne, 'suzanne');
    // console.log(materials);
    return (
        <>
            < group ref={group} dispose={null} >
                <mesh
                    ref={part6}
                    castShadow
                    receiveShadow
                    geometry={suzanne.nodes.geometry}
                    scale={300}
                >
                    <meshStandardMaterial color={color} />
                </mesh>
            </group >


        </>
    );
}
