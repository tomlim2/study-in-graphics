import { Vector3 } from "three"

const MeshSample = () => {

    return (
        <>
            <mesh position={[0, 0, 0]} receiveShadow>
                <icosahedronGeometry args={[1.5, 64]} />
                <meshStandardMaterial metalness={.5} roughness={.25} envMapIntensity={.5} color={'#858080'}></meshStandardMaterial>
            </mesh>
            <mesh lookAt={new Vector3(0, 0, 0)} position={[-4, -3, -4]} >
                <planeGeometry args={[10, 10, 10]}></planeGeometry>
                <meshStandardMaterial color={'#aaaaaa'}></meshStandardMaterial>
            </mesh>
        </>

    )
}

export default MeshSample