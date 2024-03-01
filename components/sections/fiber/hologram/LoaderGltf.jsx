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
    console.log(suzanne);
    return (
        <>
            <group position={[0, 0, 0]}>
                <mesh geometry={suzanne.nodes['Suzanne'].geometry}>
                    
                    <meshStandardMaterial  />
                </mesh>
            </group>
        </>
    );
}


