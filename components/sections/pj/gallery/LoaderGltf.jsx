import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

export default function LoaderGltf() {
    const { color } = useControls("standard material", {
        color: "#ffffff",
    });
    const part6 = useRef()
    const group = useRef()
    const suzanne = useGLTF(
        "/coffeeSmoke/bakedModel.glb"
    );
    return (
        <>
            <group position={[0,-1,0]} scale={[.35,.35,.35]}>
                <primitive object={suzanne.scene} />
                {suzanne.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshToonMaterial({ color:"orange" });
                    }
                })}
            </group>
        </>
    );
}


