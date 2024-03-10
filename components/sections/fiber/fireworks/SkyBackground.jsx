import { Sky } from 'three/addons/objects/Sky.js'
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

export default function SkyBackground() {
    const sceneRef = useRef()
    useEffect(() => {
        const scene = sceneRef.current
        if (scene) {
            const sky = new Sky()
            sky.scale.setScalar(450000)
            scene.add(sky)
            // const sun = new Vector3();

            // const skyParameters = {
            //     turbidity: 10,
            //     rayleigh: 3,
            //     mieCoefficient: 0.005,
            //     mieDirectionalG: 0.7,
            //     elevation: 2,
            //     azimuth: 180,
            //     // exposure: renderer.toneMappingExposure
            // }

            // const updateSky = () => {
            //     const uniforms = sky.material.uniforms
            //     uniforms['turbidity'].value = skyParameters.turbidity
            //     uniforms['rayleigh'].value = skyParameters.rayleigh
            //     uniforms['mieCoefficient'].value = skyParameters.mieCoefficient
            //     uniforms['mieDirectionalG'].value = skyParameters.mieDirectionalG

            //     const phi = THREE.MathUtils.degToRad(90 - skyParameters.elevation)
            //     const theta = THREE.MathUtils.degToRad(skyParameters.azimuth)

            //     sun.setFromSphericalCoords(1, phi, theta)

            //     uniforms['sunPosition'].value.copy(sun)

            //     // renderer.toneMappingExposure = skyParameters.exposure
            //     // renderer.render(scene, camera)
            // }

            // gui.add(skyParameters, 'turbidity', 0.0, 20.0, 0.1).onChange(updateSky)
            // gui.add(skyParameters, 'rayleigh', 0.0, 4, 0.001).onChange(updateSky)
            // gui.add(skyParameters, 'mieCoefficient', 0.0, 0.1, 0.001).onChange(updateSky)
            // gui.add(skyParameters, 'mieDirectionalG', 0.0, 1, 0.001).onChange(updateSky)
            // gui.add(skyParameters, 'elevation', 0, 90, 0.1).onChange(updateSky)
            // gui.add(skyParameters, 'azimuth', - 180, 180, 0.1).onChange(updateSky)
            // gui.add(skyParameters, 'exposure', 0, 1, 0.0001).onChange(updateSky)

            // updateSky()
        }


        return () => {

        }
    }, [])


    const { azimuth, sunPosition, turbidity, distance, rayleigh, mieCoefficient, mieDirectionalG, elevation } = useControls("holographic", {
        // azimuth: {
        //     value: 180,
        //     step: .05,
        //     min: 0,
        //     max: 500,
        //     onChange: (value) => {
        //         if (skyRef.current) {
        //             skyRef.current.azimuth = value
        //         }

        //     }
        // },
        // turbidity: {
        //     value: 10,
        //     min: 0,
        //     max: 100,
        //     onChange: (value) => {
        //         if (skyRef.current) {
        //             skyRef.current.turbidity = value
        //         }
        //     }
        // },
        // rayleigh: {
        //     value: 3,
        //     min: 0,
        //     max: 100,
        //     onChange: (value) => {
        //     }
        // },
        // mieCoefficient: {
        //     value: 0.005,
        //     step: .00001,
        //     min: 0,
        //     max: 1,
        //     onChange: (value) => {
        //     }
        // },
        // mieDirectionalG: {
        //     value: 0.7,
        //     step: 0.01,
        //     min: 0,
        //     max: 1,
        //     onChange: (value) => {
        //     }
        // },
        // elevation: {
        //     value: 2,
        //     step: 1,
        //     min: 0,
        //     max: 6,
        //     onChange: (value) => {
        //     }
        // },
        // distance: {
        //     value: 450000,
        //     step: 1,
        //     min: 0,
        //     max: 900000,
        //     onChange: (value) => {
        //         if (skyRef.current) {
        //             skyRef.current.distance = value
        //         }
        //     }
        // },
        // sunPosition: {
        //     value: new Vector3(0,  10,  0),
        //     step: 0.05,
        //     min: 0,
        //     max: 20,
        //     onChange: (value) => {
        //         if (skyRef.current) {
        //             skyRef.current.sunPosition = value
        //             console.log(value);
        //         }
        //     }
        // }
    });
    return <scene ref={sceneRef} />

}