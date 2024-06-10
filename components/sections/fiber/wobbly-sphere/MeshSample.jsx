import ThreeCustomShaderMaterial from "three-custom-shader-material"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import wobbleFragmentShader from 'raw-loader!glslify-loader!shaders/wobbe/fragment.glsl'
import wobbleVertexShader from 'raw-loader!glslify-loader!shaders/wobbe/vertex.glsl'
import simplexNoise4d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise4d.glsl'

import { useControls } from "leva"
import { Color } from "three"
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import * as THREE from 'three'

const MeshSample = () => {
    const materialRef = useRef();
    const meshRef = useRef();
    console.log(ThreeCustomShaderMaterial);

    const { fresnelColor } = useControls("fresnel", {
        uPositionFrequency: {
            value: 1,
            max: 2,
            min: 0,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uPositionFrequency.value = value;
                }
            }
        },
        uTimeFrequency: {
            value: 1,
            max: 2,
            min: 0,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uTimeFrequency.value = value;
                }
            }
        },
        uStrength: {
            value: 1,
            max: 2,
            min: 0,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uStrength.value = value;
                }
            }
        },
    });
    const uniforms = {
        uTime: new THREE.Uniform(0),
        uPositionFrequency: new THREE.Uniform(0.5),
        uTimeFrequency: new THREE.Uniform(0.4),
        uStrength: new THREE.Uniform(0.3),
    }

    useFrame((state, delta) => {
        if (materialRef.current) {
            uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.onBeforeCompile((shader)=>{
            //   console.log(shader);
            // }));
            // materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 2;
        }
    });



    const material = new CustomShaderMaterial({
        // CSM
        baseMaterial: THREE.MeshPhysicalMaterial,
        vertexShader:
            `${simplexNoise4d}
        ${wobbleVertexShader}
        `,
        fragmentShader: wobbleFragmentShader,
        uniforms: uniforms,
        silent: true,


        // MeshPhysicalMaterial
        metalness: 0,
        roughness: 0.5,
        color: '#ffffff',
        transmission: 0,
        ior: 1.5,
        thickness: 1.5,
        transparent: true,
        wireframe: false
    })

    const depthMaterial = new CustomShaderMaterial({
        // CSM
        baseMaterial: THREE.MeshDepthMaterial,
        vertexShader:
            `${simplexNoise4d}
        ${wobbleVertexShader}
        `,
        uniforms: uniforms,
        silent: true,

        // MeshDepthMaterial
        depthPacking: THREE.RGBADepthPacking
    })

    let geometry = new THREE.IcosahedronGeometry(1.5, 64)
    geometry = mergeVertices(geometry)
    geometry.computeTangents()

    return (
        <>
            <mesh castShadow customDepthMaterial={depthMaterial} >
                <bufferGeometry {...geometry}></bufferGeometry>
                <meshPhysicalMaterial
                    ref={materialRef}
                    {...material}
                />
            </mesh>
            <mesh position={[-1, 0, -3]} receiveShadow>
                <planeGeometry args={[7, 7]}></planeGeometry>
                <meshPhysicalMaterial></meshPhysicalMaterial>
            </mesh>
        </>

    )
}

export default MeshSample