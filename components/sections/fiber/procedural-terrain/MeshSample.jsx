import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { useGLTF } from "@react-three/drei"
import { MeshPhysicalMaterial, Vector3 } from "three"
import fragmentShader from 'raw-loader!glslify-loader!shaders/sliced/fragment.glsl'
import vertexShader from 'raw-loader!glslify-loader!shaders/sliced/vertex.glsl'
import { useControls } from "leva"
import * as THREE from 'three'
import { useRef } from 'react'
import { Brush } from 'three-bvh-csg'

const MeshSample = () => {
    const materialRef = useRef();
    const grears = useGLTF('/sliced-model/gears.glb')
    let geometry1 = grears.scene.children[0].geometry
    let geometry2 = grears.scene.children[1].geometry
    let geometry3 = grears.scene.children[2].geometry

    const patchMap = {
        csm_Slice:
        {
            '#include <colorspace_fragment>':
                `
                #include <colorspace_fragment>
    
                if(!gl_FrontFacing)
                    gl_FragColor = vec4(0.75, 0.15, 0.3, 1.0);
            `
        }
    }

    const uniforms = {
        uSliceStart: new THREE.Uniform(1.75),
        uSliceArc: new THREE.Uniform(1.25),
    }

    const { uSliceStart, uSliceArc } = useControls("sliced material", {
        uSliceStart: {
            value: uniforms.uSliceStart.value,
            max: 2,
            min: 0,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uSliceStart.value = value;
                }
            }
        },
        uSliceArc: {
            value: uniforms.uSliceArc.value,
            max: 2,
            min: 0,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uSliceArc.value = value;
                }
            }
        },
    })

    const slicedMaterial = new CustomShaderMaterial({
        // CSM
        baseMaterial: MeshPhysicalMaterial,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        patchMap: patchMap,
        metalness: 0.5,
        roughness: 0.25,
        envMapIntensity: 0.5,
        color: '#858080',
        silent: true,
        side: THREE.DoubleSide
    })

    const slicedDepthMaterial = new CustomShaderMaterial({
        // CSM
        baseMaterial: THREE.MeshDepthMaterial,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: uniforms,
        patchMap: patchMap,
        silent: true,

        // MeshDepthMaterial
        depthPacking: THREE.RGBADepthPacking
    })

    const gearMaterial = new MeshPhysicalMaterial({
        metalness: 0.5,
        roughness: 0.25,
        envMapIntensity: 0.5,
        color: '#858080',
    })
    return (
        <>
            <mesh position={[0, 0, 0]} scale={[4, 4, 4]} receiveShadow castShadow customDepthMaterial={slicedDepthMaterial}>
                <bufferGeometry {...geometry1}></bufferGeometry>
                <meshStandardMaterial ref={materialRef} {...slicedMaterial} />
            </mesh>
            
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <bufferGeometry {...geometry2}></bufferGeometry>
                <meshStandardMaterial {...gearMaterial} />
            </mesh>
            <mesh position={[0, 0, 0]} scale={[.6, .6, .6]} receiveShadow castShadow>
                <bufferGeometry {...geometry3}></bufferGeometry>
                <meshStandardMaterial {...gearMaterial} />
            </mesh>
            <mesh position={[-2, -3, -2]} rotation={[0,0.75,0]} receiveShadow>
                <planeGeometry args={[20, 20, 20]}></planeGeometry>
                <meshStandardMaterial color={'#fefefe'}></meshStandardMaterial>
            </mesh>
        </>

    )
}

export default MeshSample