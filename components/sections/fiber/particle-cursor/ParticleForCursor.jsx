import { useControls } from "leva";
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import { TextureLoader, Uniform, Vector2 } from "three";
import particleFragmentShader from 'raw-loader!glslify-loader!shaders/particleCursor/fragment.glsl'
import particleVertexShader from 'raw-loader!glslify-loader!shaders/particleCursor/vertex.glsl'
import { useLoader } from "@react-three/fiber";

export default function ParticleForCursor() {
    const geometryRef = useRef()
    const { color, opacity } = useControls("contact shadows", {
        color: "#1d8f75",
        opacity: { value: 1, min: 0, max: 1 },
    });
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    sizes.resolution = new Vector2(sizes.width, sizes.height)

    const texture = useLoader(TextureLoader, '/particleCursor/picture-1.png')
    return (
        <>
            <points>
                <planeGeometry ref={geometryRef} args={[10, 10, 128, 128]} />
                <shaderMaterial
                    vertexShader={particleVertexShader}
                    fragmentShader={particleFragmentShader}
                    uniforms={{
                        uPictureTexture: new Uniform(texture),
                        uResolution: new Uniform(new Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
                    }
                    }
                />
            </points>
        </>
    )


}