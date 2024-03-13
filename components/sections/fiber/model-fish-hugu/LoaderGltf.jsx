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
        "/assets/models/fish-hugu.glb"
    );
    console.log(suzanne, 'suzanne.nodes.geometry');
    // console.log(materials);
    return (
        <>
            < group ref={group} dispose={null} >
                <primitive object={suzanne.scene}/>
            </group >


        </>
    );
}


