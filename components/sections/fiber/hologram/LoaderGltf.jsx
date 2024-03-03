import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import hologramFragmentShader from 'raw-loader!glslify-loader!shaders/hologram/fragment.glsl'
import hologramVertexShader from 'raw-loader!glslify-loader!shaders/hologram/vertex.glsl'
import glslUtils from 'raw-loader!glslify-loader!shaders/libs/glslUtils.glsl'
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, DoubleSide, Uniform } from "three";


export default function LoaderGltf() {
    const materialRef = useRef()
    const suzanneRef = useRef()
    const sphereRef = useRef()
    const torusRef = useRef()
    const { holographicColor,holographicFrequncy,stripeStrength,fresnelStrength,fresnelPower } = useControls("holographic", {
        holographicColor: {
            value: "#2c6bdb",
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uHolographicColor.value = new Color(value);
                }
            }
        },
        holographicFrequncy: {
            value: 20,
            min: 0,
            max: 100,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uHolographicFrequncy.value = value;
                }
            }
        },
        stripeStrength: {
            value: 3,
            step:1,
            min: 0,
            max: 10,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uStripeStrength.value = value;
                }
            }
        },
        fresnelStrength: {
            value: 2,
            step:0.01,
            min: 0,
            max: 10,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uFresnelStrength.value = value;
                }
            }
        },
        fresnelPower: {
            value: 1.25,
            step:0.25,
            min: 0,
            max: 10,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uFresnelPower.value = value;
                }
            }
        },
    });
    const { glitchStrength,glitchFrequency } = useControls("glitch", {
        glitchStrength: {
            value: 0.25,
            min: 0,
            max: 4,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uGlitchStrength.value = value;
                }
            }
        },
        glitchFrequency: {
            value: 3,
            min: 0,
            max: 10,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uGlitchFrequency.value = value;
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
            uTime: { value: new Uniform(0) },
            uHolographicColor: new Uniform(new Color(holographicColor)),
            uGlitchStrength: new Uniform(glitchStrength),
            uGlitchFrequency: new Uniform(glitchFrequency),
            uHolographicFrequncy: new Uniform(holographicFrequncy),
            uStripeStrength: new Uniform(stripeStrength),
            uFresnelStrength: new Uniform(fresnelStrength),
            uFresnelPower: new Uniform(fresnelPower),
            
        }}
    vertexShader={
        `
        ${glslUtils}
        ${hologramVertexShader}
        `
    }
    fragmentShader={
        `
        ${glslUtils}
        ${hologramFragmentShader}
        `
    }
    transparent={true}
    side={DoubleSide}
    depthWrite={false}
    blending={AdditiveBlending}
/>

    return (
        <>
            <group position={[0, 0, 0]}>
                <mesh ref={torusRef} position={[-2.5, 0, 0]}>
                    <torusKnotGeometry args={[0.8, .2, 128,128]} />
                    {shaderMaterial}
                </mesh>
                <mesh ref={sphereRef} position={[2.5, 0, 0]}>
                    <sphereGeometry args={[1,128,128]} />
                    {shaderMaterial}
                </mesh>

                <mesh ref={suzanneRef} geometry={suzanne.nodes['Suzanne'].geometry}>
                    {shaderMaterial}
                </mesh>
            </group>
        </>
    );
}


