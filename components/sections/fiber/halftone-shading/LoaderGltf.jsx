import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import halftoneShadingFragmentShader from 'raw-loader!glslify-loader!shaders/halftoneShading/fragment.glsl'
import halftoneShadingVertexShader from 'raw-loader!glslify-loader!shaders/halftoneShading/vertex.glsl'
import glslUtils from 'raw-loader!glslify-loader!shaders/libs/glslUtils.glsl'
import glslAmbientLight from 'raw-loader!glslify-loader!shaders/libs/glslAmbientLight.glsl'
import glslDirectionalLight from 'raw-loader!glslify-loader!shaders/libs/glslDirectionalLight.glsl'
import glslPointLight from 'raw-loader!glslify-loader!shaders/libs/glslPointLight.glsl'
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, DoubleSide, Uniform } from "three";


export default function LoaderGltf() {
    const materialRef = useRef()
    const suzanneRef = useRef()
    const sphereRef = useRef()
    const torusRef = useRef()
    const { color, holographicFrequncy } = useControls("halftone", {
        color: {
            value: "#ffe600",
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uColor.value = new Color(value);
                }
            }
        },
        holographicFrequncy: {
            value: 20,
            min: 0,
            max: 100,
            onChange: (value) => {
                if (materialRef.current) {
                    // materialRef.current.uniforms.uHolographicFrequncy.value = value;
                }
            }
        },
    });


    const suzanne = useGLTF(
        "/assets/models/monkeyHead.glb"
    );


    useFrame((state, delta) => {
        if (torusRef.current) {
            torusRef.current.rotation.x = - state.clock.elapsedTime * 0.1
            torusRef.current.rotation.y = state.clock.elapsedTime * 0.2
        }
        if (sphereRef.current) {

            sphereRef.current.rotation.x = - state.clock.elapsedTime * 0.1
            sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2
        }


        if (suzanneRef.current) {
            suzanneRef.current.rotation.x = - state.clock.elapsedTime * 0.1
            suzanneRef.current.rotation.y = state.clock.elapsedTime * 0.2
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });

    const shaderMaterial = <shaderMaterial
        ref={materialRef}
        uniforms=
        {
            {
                uColor: new Uniform(new Color(color)),
                uTime: { value: new Uniform(0) },
            }}
        vertexShader={
            `
        ${glslUtils}
        ${halftoneShadingVertexShader}
        `
        }
        fragmentShader={
            `
        ${glslUtils}
        ${halftoneShadingFragmentShader}
        `
        }
    />

    return (
        <>
            <group position={[0, 0, 0]}>
                <mesh ref={torusRef} position={[-2.5, 0, 0]}>
                    <torusKnotGeometry args={[0.8, .2, 128, 128]} />
                    {shaderMaterial}
                </mesh>
                <mesh ref={sphereRef} position={[2.5, 0, 0]}>
                    <sphereGeometry args={[1, 128, 128]} />
                    {shaderMaterial}
                </mesh>

                <mesh ref={suzanneRef} geometry={suzanne.nodes['Suzanne'].geometry}>
                    {shaderMaterial}
                </mesh>
            </group>
        </>
    );
}


