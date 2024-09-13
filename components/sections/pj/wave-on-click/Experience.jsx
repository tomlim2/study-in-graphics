import fragmentShader from "raw-loader!glslify-loader!shaders/wave-on-click/fragmentShader.glsl";
import vertexShader from "raw-loader!glslify-loader!shaders/wave-on-click/vertexShader.glsl";
import simplexNoise4d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise4d.glsl'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'

import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { CameraControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three"

const Experience = () => {
    const materialRef = useRef();
    let geometry = new THREE.IcosahedronGeometry(2.5, 50);
    geometry = mergeVertices(geometry);
    geometry.computeTangents();
    console.log(geometry);


    return (
        <>
            <CameraControls maxDistance={35} dollySpeed={.25} />
            <mesh>
                <bufferGeometry {...geometry} />
                <shaderMaterial
                    ref={materialRef}
                    vertexShader={`${simplexNoise4d}
                    ${vertexShader}
                    `}
                    fragmentShader={fragmentShader}
                    side={THREE.DoubleSide}
                    // wireframe={true}
                />
            </mesh>
        </>
    )
}

export default Experience;