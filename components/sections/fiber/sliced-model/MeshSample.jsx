import { useGLTF } from "@react-three/drei"
import { Vector3 } from "three"

const MeshSample = () => {
    const grears = useGLTF('/sliced-model/gears.glb')
    let geometry1 = grears.scene.children[0].geometry
    let geometry2 = grears.scene.children[1].geometry
    let geometry3 = grears.scene.children[2].geometry
    console.log(grears.scene);
    return (
        <>
            <mesh position={[0, 0, 0]} scale={[4,4,4]} receiveShadow castShadow>
                <bufferGeometry {...geometry1}></bufferGeometry>
                <meshStandardMaterial metalness={.5} roughness={.25} envMapIntensity={.5} color={'#858080'}></meshStandardMaterial>
            </mesh>
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <bufferGeometry {...geometry2}></bufferGeometry>
                <meshStandardMaterial metalness={.5} roughness={.25} envMapIntensity={.5} color={'#858080'}></meshStandardMaterial>
            </mesh>
            <mesh position={[0, 0, 0]} receiveShadow castShadow>
                <bufferGeometry {...geometry3}></bufferGeometry>
                <meshStandardMaterial metalness={.5} roughness={.25} envMapIntensity={.5} color={'#858080'}></meshStandardMaterial>
            </mesh>
            <mesh  position={[-4, -3, -4]} lookAt={new Vector3(0,0,0)} >
                <planeGeometry args={[10, 10, 10]}></planeGeometry>
                <meshStandardMaterial color={'#aaaaaa'}></meshStandardMaterial>
            </mesh>
        </>

    )
}

export default MeshSample