import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import halftoneShadingFragmentShader from 'raw-loader!glslify-loader!shaders/halftoneShading/fragment.glsl'
import halftoneShadingVertexShader from 'raw-loader!glslify-loader!shaders/halftoneShading/vertex.glsl'
import glslUtils from 'raw-loader!glslify-loader!shaders/libs/glslUtils.glsl'
import glslAmbientLight from 'raw-loader!glslify-loader!shaders/libs/glslAmbientLight.glsl'
import glslDirectionalLight from 'raw-loader!glslify-loader!shaders/libs/glslDirectionalLight.glsl'
import glslPointLight from 'raw-loader!glslify-loader!shaders/libs/glslPointLight.glsl'
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, Color, DoubleSide, Uniform, Vector2 } from "three";


export default function LoaderGltf({position=[0,0,0]}) {
    const materialRef = useRef()
    const strawberryCake1Ref = useRef()
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    sizes.resolution = new Vector2(sizes.width, sizes.height)

    const { backgroundColor } = useControls("stage", {
        backgroundColor: "#622156",
    });

    const { color, lightColor, lightRepetitions, shadowColor, shadowRepetitions } = useControls("halftone", {
        color: {
            value: "#803562",
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uColor.value = new Color(value);
                }
            }
        },
        lightColor: {
            value: "#dcacff",
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uLightColor.value = new Color(value);
                }
            }
        },
        lightRepetitions: {
            value: 150,
            min: 1,
            max: 300,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uLightRepetitions.value = value;
                }
            }
        },
        shadowColor: {
            value: "#480733",
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uShadowColor.value = new Color(value);
                }
            }
        },
        shadowRepetitions: {
            value: 150,
            min: 1,
            max: 300,
            onChange: (value) => {
                if (materialRef.current) {
                    materialRef.current.uniforms.uShadowRepetitions.value = value;
                }
            }
        },
    });


    const strawberryCake1 = useGLTF(
        "/assets/models/strawberryCake1.glb"
    );

    useFrame((state, delta) => {
        if (strawberryCake1Ref.current) {
            // strawberryCake1Ref.current.rotation.x = - state.clock.elapsedTime * 0.1
            strawberryCake1Ref.current.rotation.y = state.clock.elapsedTime * 0.2
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });

    useEffect(() => {
        const handleResize = () => {
            // Update sizes
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight
            sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)
            sizes.resolution.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

            // Update materials
            if (materialRef.current) {
                materialRef.current.uniforms.uResolution.value = sizes.resolution;
            }
        }
        window.addEventListener('resize', handleResize())

        return () => {
            window.removeEventListener('resize', handleResize())
        }
    }, [])


    const shaderMaterial = <shaderMaterial
        ref={materialRef}
        uniforms=
        {
            {
                uColor: new Uniform(new Color(color)),
                uLightRepetitions: new Uniform(lightRepetitions),
                uLightColor: new Uniform(new Color(lightColor)),
                uShadowRepetitions: new Uniform(shadowRepetitions),
                uShadowColor: new Uniform(new Color(shadowColor)),
                uTime: { value: new Uniform(0) },
                uResolution: new Uniform(new Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
            }}
        vertexShader={
            `
        ${glslUtils}
        ${halftoneShadingVertexShader}
        `
        }
        fragmentShader={
            `
        ${glslAmbientLight}
        ${glslDirectionalLight}
        ${glslUtils}
        ${halftoneShadingFragmentShader}
        `
        }
    />
    
    const loadCake = (cakeModel) => {

        let cakeLayers = []
        for (let i = 0; i < 7; i++) {
            let mesh = (
                <mesh scale={25} position={[0, -1, 0]} key={i} geometry={cakeModel.nodes[`cakeLayer${i + 1}`].geometry}>
                    {shaderMaterial}
                </mesh>)
            cakeLayers.push(mesh)
        }

        return cakeLayers.map(mesh => mesh)
    }

    return (
        <>
            <color attach={'background'} args={[backgroundColor]} />
            <group ref={strawberryCake1Ref} position={position}>
                {
                    loadCake(strawberryCake1)
                }
            </group>
        </>
    );
}


