import { useFrame, useLoader } from "@react-three/fiber"
import { useRef } from "react"
import { useControls } from "leva"
import fragmentShader from 'raw-loader!glslify-loader!./shader/fragmentShader.glsl'
import vertexShader from 'raw-loader!glslify-loader!./shader/vertexShader.glsl'
import { TextureLoader } from "three"

const MaterialSample = (props) => {
    const colorMap = useLoader(TextureLoader, "/assets/textures/img_uv_default.png");
    const { width, height } = props
    const materialRef = useRef()
    const { color, opacity } = useControls("contact shadows", {
        color: "#1d8f75",
        opacity: { value: 1, min: 0, max: 1 },
    });
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });

    return <shaderMaterial
        ref={materialRef}
        uniforms={{
            uTexture1: { type: "t", value: colorMap },
            uTime: { value: 0 },
            uResolution: { value: { x: 1, y: 1 } }
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
    />
}

export default MaterialSample