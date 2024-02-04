import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import MaterialSample from "./MaterialSample";

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
                <instancedMesh
                    geometry={suzanne.nodes['Suzanne'].geometry}
                    scale={2}
                    count={1}
                >
                    <MaterialSample />
                </instancedMesh>
                {/* <mesh
                    ref={part6}
                    castShadow
                    receiveShadow
                    geometry={suzanne.nodes['Suzanne'].geometry}
                    scale={2}
                >
                </mesh> */}
            </group >
            <mesh position={[3, 0, 0]}>
                <planeGeometry />
                <MaterialSample />
            </mesh>


        </>
    );
}


