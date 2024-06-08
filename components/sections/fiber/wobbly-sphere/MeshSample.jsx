import ThreeCustomShaderMaterial from "three-custom-shader-material"
import MaterialSample from "./MaterialSample"

const MeshSample = () => {
    console.log(ThreeCustomShaderMaterial);
    return (
        <mesh>
            <sphereGeometry args={[2, 64, 64]} />
            <MaterialSample />
        </mesh>
    )
}

export default MeshSample