import { Environment } from "@react-three/drei"

const { useControls } = require("leva")

const Stage = () => {
    const config = useControls(
        'stage',
        {
            color: '#0000ff',
        }
    )
    const environmentConfig = useControls(
        'stage.environment',
        {
            background: { value: false },
            blur: { value: 0, min: 0, max: 1, step: 0.001 },
            intensity: {
                value: 1, min: 0, max: 1, onChange: (value) => {
                }
            }
        }
    )
    const directionalLightConfig = useControls(
        'stage.directionalLight',
        {
            color: '#ffffff',
            intensity: { value: 4, min: 0, max: 10, step: 0.01 },
            bias: { value: 0.00005, min: -0.001, max: 0, step: 0.00001 },
            normalBias: { value: 0.02, min: -0.1, max: 0.1, step: 0.00001 },
        }
    )

    return (
        <>
            <directionalLight intensity={3} {...directionalLightConfig} />
            <ambientLight intensity={0.5} />
            <color attach={'background'} args={[config.color]} />
            <Environment files={'/assets/environmentMaps/blender/blender_1.hdr'} {...environmentConfig} />
           
        </>

    )
}

export default Stage