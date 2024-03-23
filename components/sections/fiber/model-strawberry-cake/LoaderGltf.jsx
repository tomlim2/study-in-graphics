import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useState, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { MeshBasicMaterial, SRGBColorSpace, TextureLoader } from "three";

export default function LoaderGltf() {
    const group = useRef()
    const strawberryCake = useGLTF(
        "/assets/models/strawberryCakeBaked/strawberry-cake.glb"
    );
    const texture = useLoader(TextureLoader, '/assets/models/strawberryCakeBaked/baked-v2.jpg')
    texture.flipY = false;
    texture.colorSpace = SRGBColorSpace;
    console.log(texture);
    const bakedMaterial = new MeshBasicMaterial({ map: texture })
    strawberryCake.scene.traverse((child) => {
        child.material = bakedMaterial
    })
    console.log(strawberryCake);
    return (
        <>
            <group scale={20} ref={group} dispose={null} >
                <mesh geometry={strawberryCake.nodes['Cylinder001'].geometry}>
                    <shaderMaterial uniforms={{
                        uDayTexture: new THREE.Uniform(earthDayTexture),
                        uNightTexture: new THREE.Uniform(earthNightTexture),
                        uSpecularCloudsTexture: new THREE.Uniform(earthSpecularCloudsTexture)
                    }} />
                </mesh>

            </group >


        </>
    );
}


