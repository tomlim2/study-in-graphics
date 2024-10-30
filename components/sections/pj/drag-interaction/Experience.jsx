import { Physics, RigidBody } from "@react-three/rapier";
import RandomMeshes from "./RandomMeshes";
import DraggableMesh from "./DraggableMesh";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";

function Bounds() {
    const useWireframe = false;
    const [boundsPos, setBoundsPos] = useState({ x: window.innerWidth / 100, y: window.innerHeight / 100, z: 0 });
    const { camera } = useThree();
    useEffect(() => {
        const handleResize = () => {
            console.log("Window resized to", window.innerWidth, window.innerHeight);
            const dir = camera.position;
            const distance = -camera.position.z / dir.z;
            setBoundsPos({ x: window.innerWidth / 100*distance, y: window.innerHeight / 100*distance, z: 0 });


        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
        return () => {
            second
        }
    }, [])

    return (
        <>
            <RigidBody type="fixed">
                <mesh position={[0, 0, 8]}>
                    <boxGeometry args={[100, 100, 4]} />
                    <meshToonMaterial wireframe={useWireframe} color="lightblue" visible={false} />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[0, 0, -8]}>
                    <boxGeometry args={[100, 100, 4]} />
                    <meshToonMaterial wireframe={useWireframe} color="lightblue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[0, boundsPos.y, 0]}>
                    <boxGeometry args={[100, 4, 80]} />
                    <meshToonMaterial wireframe={useWireframe} color="blue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[-boundsPos.x, 0, 0]}>
                    <boxGeometry args={[4, 100, 80]} />
                    <meshToonMaterial wireframe={useWireframe} color="blue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[boundsPos.x, 0, 0]}>
                    <boxGeometry args={[4, 100, 80]} />
                    <meshToonMaterial wireframe={useWireframe} color="blue" />
                </mesh>
            </RigidBody>
            <RigidBody type="fixed">
                <mesh position={[0, - boundsPos.y, 0]}>
                    <boxGeometry args={[100, 4, 80]} />
                    <meshToonMaterial wireframe={useWireframe} color="blue" />
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