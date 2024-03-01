import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import hologramFragmentShader from 'raw-loader!glslify-loader!shaders/hologram/fragment.glsl'
import hologramVertexShader from 'raw-loader!glslify-loader!shaders/hologram/vertex.glsl'
import { useFrame } from "@react-three/fiber";
import { Uniform } from "three";

export default function LoaderGltf() {
    const materialRef = useRef()
    const { color } = useControls("standard material", {
        color: "#ffffff",
    });
    const part6 = useRef()
    const group = useRef()
    const suzanne = useGLTF(
        "/assets/models/monkeyHead.glb"
    );

    console.log(suzanne);
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });

    return (
        <>
            <group position={[0, 0, 0]}>
                <mesh geometry={suzanne.nodes['Suzanne'].geometry}>
                    <shaderMaterial
                        ref={materialRef}
                        uniforms=
                        {
                            {
                                uTime: { value: new Uniform(0) },
                            }}
                        vertexShader={hologramVertexShader}
                        fragmentShader={hologramFragmentShader}
                        transparent={true} 
                    />
                </mesh>
            </group>
        </>
    );
}


