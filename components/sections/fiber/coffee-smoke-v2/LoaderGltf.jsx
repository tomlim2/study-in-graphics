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
        "/coffeeSmoke/bakedModel.glb"
    );
    console.log(suzanne);
    return (
        <>
            <group position={[0,-2.3,0]}>
                <primitive object={suzanne.scene} />
            </group>
        </>
    );
}


