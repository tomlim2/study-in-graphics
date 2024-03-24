import earthShadingFragmentShader from 'raw-loader!glslify-loader!shaders/earth/fragment.glsl'
import earthShadingVertexShader from 'raw-loader!glslify-loader!shaders/earth/vertex.glsl'
import atmosphereShadingFragmentShader from 'raw-loader!glslify-loader!shaders/atmosphere/fragment.glsl'
import atmosphereShadingVertexShader from 'raw-loader!glslify-loader!shaders/atmosphere/vertex.glsl'
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { BackSide, Color, SRGBColorSpace, Spherical, TextureLoader, Uniform, Vector3 } from "three";
import { useRef } from 'react';

const Earth = () => {
    const earthSphereRef = useRef()
    const atmosphereShaderRef = useRef()
    const debugSunRef = useRef()
    const earthShaderRef = useRef()
    const sunDirection = new Vector3()
    const sunSpherical = new Spherical(1, Math.PI * 0.5, 0)

    const { sunTheta, sunPhi, atmosphereDayColor, uAtmosphereTwilightColor } = useControls("debug", {
        atmosphereDayColor: {
            value: "#00aaff",
            onChange: (value) => {
                if (earthShaderRef.current) {
                    earthShaderRef.current.uniforms.uAtmosphereDayColor.value.set(new Color(value))
                }
                if (atmosphereShaderRef.current) {
                    atmosphereShaderRef.current.uniforms.uAtmosphereDayColor.value.set(new Color(value))
                }
                
            }
        },
        uAtmosphereTwilightColor: {
            value: "#b15619",
            onChange: (value) => {
                if (earthShaderRef.current) {
                    earthShaderRef.current.uniforms.uAtmosphereTwilightColor.value.set(new Color(value))
                }
                if (atmosphereShaderRef.current) {
                    atmosphereShaderRef.current.uniforms.uAtmosphereTwilightColor.value.set(new Color(value))
                }
            }
        },
        sunPhi: {
            value: 1.2,
            min: 0,
            max: Math.PI * 2,
            onChange: ((value) => {
                if (debugSunRef.current) {
                    sunSpherical.phi = value
                    sunDirection.setFromSpherical(sunSpherical)
                    debugSunRef.current.position.copy(sunDirection).multiplyScalar(5)
                    if (earthShaderRef.current) {
                        earthShaderRef.current.uniforms.uSunDirection.value.copy(sunDirection)
                    }
                    if (atmosphereShaderRef.current) {
                        atmosphereShaderRef.current.uniforms.uSunDirection.value.copy(sunDirection)
                    }
                }
            })
        },
        sunTheta: {
            value: -2.3,
            min: -Math.PI * 2,
            max: Math.PI * 2,
            onChange: ((value) => {
                if (debugSunRef.current) {
                    sunSpherical.theta = value
                    sunDirection.setFromSpherical(sunSpherical)
                    debugSunRef.current.position.copy(sunDirection).multiplyScalar(5)
                    if (earthShaderRef.current) {
                        earthShaderRef.current.uniforms.uSunDirection.value.copy(sunDirection)
                    }
                    if (atmosphereShaderRef.current) {
                        atmosphereShaderRef.current.uniforms.uSunDirection.value.copy(sunDirection)
                    }
                }
            })
        }
    });

    const debugSun = <mesh>
        <icosahedronGeometry args={[0.1, 2]} />
        <meshBasicMaterial />
    </mesh>

    const earthDayTexture = useLoader(TextureLoader, "/earth/day.jpg")
    earthDayTexture.colorSpace = SRGBColorSpace
    earthDayTexture.anisotropy = 8
    const earthNightTexture = useLoader(TextureLoader, "/earth/night.jpg")
    earthNightTexture.colorSpace = SRGBColorSpace
    earthNightTexture.anisotropy = 8
    const earthCloudTexture = useLoader(TextureLoader, "/earth/specularClouds.jpg")
    earthCloudTexture.colorSpace = SRGBColorSpace
    earthCloudTexture.anisotropy = 8

    useFrame((state, delta) => {
        if (earthSphereRef.current) {
            // earthSphereRef.current.rotation.x = - state.clock.elapsedTime * 0.1
            earthSphereRef.current.rotation.y = state.clock.elapsedTime * 0.05
        }
    });


    return (
        <>
            <mesh ref={debugSunRef}>
                <icosahedronGeometry args={[0.1, 2]} />
                <meshBasicMaterial />
            </mesh>
            <group ref={earthSphereRef}>
                <mesh position={[0, 0, 0]} >
                    <sphereGeometry args={[1, 32, 32]} />
                    <shaderMaterial
                        ref={earthShaderRef}
                        vertexShader={
                            `
                            ${earthShadingVertexShader}
                            `
                        }
                        fragmentShader={
                            `
                            ${earthShadingFragmentShader}
                            `
                        }
                        uniforms={{
                            uDayTexture: new Uniform(earthDayTexture),
                            uNightTexture: new Uniform(earthNightTexture),
                            uSpecularCloudsTexture: new Uniform(earthCloudTexture),
                            uSunDirection: new Uniform(new Vector3(-1, 0, 0)),
                            uAtmosphereDayColor: new Uniform(new Color(atmosphereDayColor)),
                            uAtmosphereTwilightColor: new Uniform(new Color(uAtmosphereTwilightColor))
                        }}
                    />
                </mesh>
                <mesh position={[0, 0, 0]} scale={[1.03, 1.03, 1.03]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <shaderMaterial
                        ref={atmosphereShaderRef}
                        side={BackSide}
                        transparent={true}
                        fragmentShader={atmosphereShadingFragmentShader}
                        vertexShader={atmosphereShadingVertexShader}
                        uniforms={
                            {
                                uSunDirection: new Uniform(new Vector3(-1, 0, 0)),
                                uAtmosphereDayColor: new Uniform(new Color(atmosphereDayColor)),
                                uAtmosphereTwilightColor: new Uniform(new Color(uAtmosphereTwilightColor))
                            }
                        }
                    />
                </mesh>
            </group>
        </>
    )

}

export default Earth