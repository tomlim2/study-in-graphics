import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useState, useRef } from "react";

export default function LoaderGltf() {
    const { color } = useControls("standard material", {
        color: "#ffffff",
    });
    const part6 = useRef()
    const group = useRef()
    const suzanne = useGLTF(
        "/assets/models/monkeyHead.glb"
    );
    console.log(suzanne.nodes['Suzanne'].geometry, 'suzanne.nodes.geometry');
    // console.log(materials);
    return (
        <>
            < group ref={group} dispose={null} >
                <mesh
                    ref={part6}
                    castShadow
                    receiveShadow
                    geometry={suzanne.nodes['Suzanne'].geometry}
                    scale={2}
                >
                    <meshStandardMaterial color={color} />
                </mesh>
            </group >


        </>
    );
}


