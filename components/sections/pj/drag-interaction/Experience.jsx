import { Physics } from "@react-three/rapier";
import RandomMeshes from "./RandomMeshes";
import DraggableMesh from "./DraggableMesh";

const Experience = () => {
    return (
        <>
            <Physics gravity={[0, 0, 0]}>
                <RandomMeshes />
                <DraggableMesh />
            </Physics>
        </>
    );
}

export default Experience;