import ThreeCustomShaderMaterial from "three-custom-shader-material"
import MaterialSample from "./MaterialSample"

const MeshSample = () => {
    console.log(ThreeCustomShaderMaterial);
    return (
        <mesh>
            <sphereGeometry args={[1, 16, 16]} />
            <MaterialSample />
        </mesh>
    )
}

export default MeshSample