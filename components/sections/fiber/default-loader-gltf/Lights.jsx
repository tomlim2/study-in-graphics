const { useControls } = require("leva")

const Lights = () => {
    const directionalLightConfig = useControls(
        'stage.directionalLight',
        {
            color: '#ffffff',
            intensity: { value: 1, min: 0, max: 10, step: 0.01 },
            bias: { value: 0.00005, min: -0.001, max: 0, step: 0.00001 },
            normalBias: { value: 0.02, min: -0.1, max: 0.1, step: 0.00001 },
        }
    )
    return (
        <>
            <directionalLight
                position={[-6, 0, 2]}
                castShadow
                shadow-mapSize={[512, 512]}
                color={directionalLightConfig.color}
                intensity={directionalLightConfig.intensity / 3}
                shadow-bias={directionalLightConfig.bias}
                shadow-normalBias={directionalLightConfig.normalBias}
            />
            <directionalLight
                position={[-6, 0, 2]}
                castShadow
                shadow-mapSize={[256, 256]}
                color={directionalLightConfig.color}
                intensity={directionalLightConfig.intensity / 3}
                shadow-bias={directionalLightConfig.bias}
                shadow-normalBias={directionalLightConfig.normalBias}
            />
            <directionalLight
                position={[-6, 0, 2]}
                castShadow
                shadow-mapSize={[128, 128]}
                color={directionalLightConfig.color}
                intensity={directionalLightConfig.intensity / 3}
                shadow-bias={directionalLightConfig.bias}
                shadow-normalBias={directionalLightConfig.normalBias}
            />
        </>

    )
}

export default Lights