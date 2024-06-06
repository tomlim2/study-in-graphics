import ThreeCustomShaderMaterial from "three-custom-shader-material"
import MaterialSample from "./MaterialSample"

const MeshSample = () => {
    console.log(ThreeCustomShaderMaterial);
    return (
        <mesh>
            <planeGeometry args={[6, 6]} />
            <MaterialSample />
        </mesh>
    )
}

export default MeshSample