import { useGLTF } from "@react-three/drei"
import { Vector3 } from "three"

const MeshSample = () => {
    const grears = useGLTF('/sliced-model/gears.glb')
    let geometry = grears.scene.children[0].geometry
    return (
        <>
            {/* <mesh position={[0, 0, 0]} receiveShadow>
                <bufferGeometry {...geometry}></bufferGeometry>
                <meshStandardMaterial metalness={.5} roughness={.25} envMapIntensity={.5} color={'#858080'}></meshStandardMaterial>
            </mesh> */}
            <primitive object={grears.scene} />
            <mesh  position={[-4, -3, -4]} lookAt={new Vector3(0,0,0)} >
                <planeGeometry args={[10, 10, 10]}></planeGeometry>
                <meshStandardMaterial color={'#aaaaaa'}></meshStandardMaterial>
            </mesh>
        </>

    )
}

export default MeshSample