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
        "/assets/models/hamburger.glb"
    );
    console.log(suzanne);
    return (
        <>
            <group position={[0,-2.3,0]} scale={[.35,.35,.35]}>
                <primitive object={suzanne.scene} />
            </group>
        </>
    );
}


