import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import fragmentShader from 'raw-loader!glslify-loader!./shader/fragmentShader.glsl'
import vertexShader from 'raw-loader!glslify-loader!./shader/vertexShader.glsl'
import { useControls } from "leva"

const MaterialSample = (props) => {
    const { width, height, materialRef } = props;

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
            uTime: { value: 0 },
            uResolution: { value: { x: width, y: height } },
            uMouse: {
                value: {
                    x: 0.5, y: 0.5
                }
            }
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
    />
}

export default MaterialSample