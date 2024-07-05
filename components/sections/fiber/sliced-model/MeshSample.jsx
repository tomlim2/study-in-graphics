import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { useGLTF } from "@react-three/drei"
import { MeshPhysicalMaterial, Vector3 } from "three"
import fragmentShader from 'raw-loader!glslify-loader!shaders/sliced/fragment.glsl'
import vertexShader from 'raw-loader!glslify-loader!shaders/sliced/vertex.glsl'

const MeshSample = () => {
    const grears = useGLTF('/sliced-model/gears.glb')
    let geometry1 = grears.scene.children[0].geometry
    let geometry2 = grears.scene.children[1].geometry
    let geometry3 = grears.scene.children[2].geometry

    const slicedMaterial = new CustomShaderMaterial({
        // CSM
        baseMaterial: MeshPhysicalMaterial,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,

        metalness: 0.5,
        roughness: 0.25,
        envMapIntensity: 0.5,
        color: '#858080',
        silent: true,
    })
    return (
        <>
            <mesh position={[0, 0, 0]} scale={[4, 4, 4]} receiveShadow castShadow>
                <bufferGeometry {...geometry1}></bufferGeometry>
                <meshStandardMaterial {...slicedMaterial} />
            </mesh>
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <bufferGeometry {...geometry2}></bufferGeometry>
                <meshStandardMaterial {...slicedMaterial} />
            </mesh>
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <bufferGeometry {...geometry3}></bufferGeometry>
                <meshStandardMaterial {...slicedMaterial} />
            </mesh>
            <mesh position={[-4, -3, -4]} lookAt={new Vector3(0, 0, 0)} >
                <planeGeometry args={[10, 10, 10]}></planeGeometry>
                <meshStandardMaterial color={'#aaaaaa'}></meshStandardMaterial>
            </mesh>
        </>

    )
}

export default MeshSample