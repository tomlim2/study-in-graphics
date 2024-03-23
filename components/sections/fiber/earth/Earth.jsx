import earthShadingFragmentShader from 'raw-loader!glslify-loader!shaders/earth/fragment.glsl'
import earthShadingVertexShader from 'raw-loader!glslify-loader!shaders/earth/vertex.glsl'
import { useFrame, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { SRGBColorSpace, Spherical, TextureLoader, Uniform, Vector3 } from "three";
import { useRef } from 'react';

const Earth = () => {
    const sphereRef = useRef()
    const { color, opacity } = useControls("contact shadows", {
        color: "#1d8f75",
        opacity: { value: 1, min: 0, max: 1 },
    });

    // Coordinates
    const sunSpherical = new Spherical(1, Math.PI * 0.5, 0.5)
    const sunDirection = new Vector3()

    // const updateSun = () => {
    //     // Sun direction
    //     sunDirection.setFromSpherical(sunSpherical)

    //     // Debug
    //     debugSun.position.copy(sunDirection).multiplyScalar(5)
    // }

    // updateSun()

    // Debug
    const debugSun = <mesh>
        <icosahedronGeometry args={[0.1, 2]} />
        <meshBasicMaterial />
    </mesh>

    const earthDayTexture = useLoader(TextureLoader, "/earth/day.jpg")
    // earthDayTexture.colorSpace = SRGBColorSpace
    const earthNightTexture = useLoader(TextureLoader, "/earth/night.jpg")
    // earthDayTexture.colorSpace = SRGBColorSpace
    const earthCloudTexture = useLoader(TextureLoader, "/earth/specularClouds.jpg")
    // earthDayTexture.colorSpace = SRGBColorSpace


    useFrame((state, delta) => {
        if (sphereRef.current) {
            // sphereRef.current.rotation.x = - state.clock.elapsedTime * 0.1
            sphereRef.current.rotation.y = state.clock.elapsedTime * 0.2
        }
    });


    return (
        <mesh ref={sphereRef} visible userData={{ hello: 'world' }} position={[0, 0, 0]} >
            <sphereGeometry args={[1, 16, 16]} />
            <shaderMaterial
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
                    uSpecularCloudsTexture: new Uniform(earthCloudTexture)
                }}
            />
        </mesh>
    )

}

export default Earth