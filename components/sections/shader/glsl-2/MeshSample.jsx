import MaterialSample from "./MaterialSample"

const MeshSample = () => {
    return (
        <mesh>
            <planeGeometry args={[8, 6]} />
            <MaterialSample />
        </mesh>
    )
}

export default MeshSample