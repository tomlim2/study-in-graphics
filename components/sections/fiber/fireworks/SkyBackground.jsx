import { Sky } from "@react-three/drei"
import { useControls } from "leva";

export default function SkyBackground() {
    const { azimuth, turbidity, distance, rayleigh, mieCoefficient, mieDirectionalG, elevation } = useControls("holographic", {
        azimuth: {
            value: 180,
            step: .05,
            min: 0,
            max: 500,
            onChange: (value) => {
                console.log(value); 
            }
        },
        turbidity: {
            value: 10,
            min: 0,
            max: 100,
            onChange: (value) => {
            }
        },
        rayleigh: {
            value: 3,
            min: 0,
            max: 100,
            onChange: (value) => {
            }
        },
        mieCoefficient: {
            value: 0.005,
            step: .00001,
            min: 0,
            max: 1,
            onChange: (value) => {
            }
        },
        mieDirectionalG: {
            value: 0.7,
            step: 0.01,
            min: 0,
            max: 1,
            onChange: (value) => {
            }
        },
        elevation: {
            value: 2,
            step: 1,
            min: 0,
            max: 6,
            onChange: (value) => {
            }
        },
        distance: {
            value: 450000,
            step: 1,
            min: 0,
            max: 90000,
            onChange: (value) => {
            }
        },
    });
    return <Sky
        distance={distance}
        turbidity={turbidity}
        rayleigh={rayleigh}
        mieCoefficient={mieCoefficient}
        mieDirectionalG={mieDirectionalG}
        elevation={elevation}
        sunPosition={[0, 1, 0]}
        inclination={0}
        azimuth={azimuth} />

}