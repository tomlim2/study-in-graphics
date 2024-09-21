import * as THREE from "three"
import { useEffect, useRef, useState } from "react";

import fragmentShader from "raw-loader!glslify-loader!shaders/wave-on-click/fragmentShader.glsl";
import vertexShader from "raw-loader!glslify-loader!shaders/wave-on-click/vertexShader.glsl";
import simplexNoise4d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise4d.glsl'

import { useControls } from "leva";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { Bvh, CameraControls, DragControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Experience = (props) => {
    const cameraControlsRef = useRef();
    return (
        <>
            {/* <CameraControls ref={cameraControlsRef} maxDistance={35} dollySpeed={.25} /> */}
            <DragControls >
                <mesh >
                    <sphereGeometry args={[1, 32, 32]} />
                    <shaderMaterial

                        wireframe={true}
                    />
                </mesh>
            </DragControls>

        </>
    )
}

export default Experience;