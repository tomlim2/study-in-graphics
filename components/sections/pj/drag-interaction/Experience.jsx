import { Physics, RigidBody } from "@react-three/rapier";
import RandomMeshes from "./RandomMeshes";
import DraggableMesh from "./DraggableMesh";
import { OrbitControls } from "@react-three/drei";

function Bounds() {
    const useWireframe = false;
    return (
        <>
            <RigidBody type="fixed">
                <mesh position={[0, 0, 8]}>
                    <boxGeometry args={[100, 100, 4]} />
                    <meshBasicMaterial wireframe={useWireframe} color="lightblue" visible={false} />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[0, 0, -8]}>
                    <boxGeometry args={[100, 100, 4]} />
                    <meshBasicMaterial wireframe={useWireframe} color="lightblue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[0, 30, 0]}>
                    <boxGeometry args={[100, 4, 80]} />
                    <meshBasicMaterial wireframe={useWireframe} color="blue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[-30, 0, 0]}>
                    <boxGeometry args={[4, 100, 80]} />
                    <meshBasicMaterial wireframe={useWireframe} color="blue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[30, 0, 0]}>
                    <boxGeometry args={[4, 100, 80]} />
                    <meshBasicMaterial wireframe={useWireframe} color="blue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[0, -30, 0]}>
                    <boxGeometry args={[100, 4, 80]} />
                    <meshBasicMaterial wireframe={useWireframe} color="blue" />
                </mesh>
            </RigidBody>
        </>
    )
}

const Experience = () => {
    return (
        <>
            {/* <OrbitControls /> */}
            <Physics gravity={[0, 0, 0]}>
                <Bounds />
                <RandomMeshes />
                <DraggableMesh />
            </Physics>
        </>
    );
}

export default Experience;