import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import fragmentShader from 'raw-loader!glslify-loader!./shader/fragmentShader.glsl'
import vertexShader from 'raw-loader!glslify-loader!./shader/vertexShader.glsl'

const MaterialSample = () => {
    const materialRef = useRef()
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });

    return <shaderMaterial
        ref={materialRef}
        uniforms={{ uTime: { value: 0 } }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
    />
}

export default MaterialSample