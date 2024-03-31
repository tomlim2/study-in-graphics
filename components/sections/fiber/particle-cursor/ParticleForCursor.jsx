import { useControls } from "leva";
import { useRef } from "react";
import { TextureLoader, Uniform, Vector2 } from "three";
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