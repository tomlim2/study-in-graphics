import MaterialSample from "./MaterialSample"

const MeshSample = () => {
    const width = 8
    const height = 6
    return (
        <mesh>
            <planeGeometry args={[width, height]} />
            <MaterialSample width={width} height={height} />
        </mesh>
    )
}

export default MeshSample