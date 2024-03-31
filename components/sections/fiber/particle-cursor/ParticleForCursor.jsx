import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { AdditiveBlending, BufferAttribute, TextureLoader, Uniform, Vector2 } from "three";
import particleFragmentShader from 'raw-loader!glslify-loader!shaders/particleCursor/fragment.glsl'
import particleVertexShader from 'raw-loader!glslify-loader!shaders/particleCursor/vertex.glsl'
import { useFrame, useLoader } from "@react-three/fiber";

export default function ParticleForCursor({ sizes, displacementTexture }) {
    const geometryRef = useRef()
    const shaderRef = useRef()
    const { color, opacity } = useControls("contact shadows", {
        color: "#1d8f75",
        opacity: { value: 1, min: 0, max: 1 },
    });

    sizes.resolution = new Vector2(sizes.width, sizes.height)



    const texture = useLoader(TextureLoader, '/particleCursor/picture-1.png')

    useEffect(() => {
        if (geometryRef.current) {
            geometryRef.current.setIndex(null)
            geometryRef.current.deleteAttribute('normal')
            const pCount = geometryRef.current.attributes.position.count
            const intensitiesArray = new Float32Array(pCount)
            const anglesArray = new Float32Array(pCount)

            for (let i = 0; i < pCount; i++) {
                intensitiesArray[i] = Math.random()
                anglesArray[i] = Math.random() * Math.PI * 2
            }
            geometryRef.current.setAttribute('aIntensity', new BufferAttribute(intensitiesArray, 1))
            geometryRef.current.setAttribute('aAngle', new BufferAttribute(anglesArray, 1))
        }
    }, [])

    useFrame(state => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uDisplacementTexture.value = displacementTexture
        }

    })

    return (
        <>
            <points>
                <planeGeometry ref={geometryRef} args={[10, 10, 128, 128]} />
                <shaderMaterial
                    ref={shaderRef}
                    blending= {AdditiveBlending}
                    vertexShader={particleVertexShader}
                    fragmentShader={particleFragmentShader}
                    uniforms={{
                        uPictureTexture: new Uniform(texture),
                        uResolution: new Uniform(new Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
                        uDisplacementTexture: new Uniform(displacementTexture)
                    }
                    }
                />
            </points>
        </>
    )


}