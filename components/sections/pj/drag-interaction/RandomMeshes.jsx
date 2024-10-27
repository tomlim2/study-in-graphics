import { useMemo } from "react";
import { RigidBody } from "@react-three/rapier";


function Box(props) {
    return (
        <mesh position={props.position} scale={props.scale} rotation={props.rotation}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" wireframe={true} />
        </mesh>
    )
}

export default function RandomMeshes() {
    const [meshesTransforms] = useMemo(() => {
        const meshesTransforms = []
        for (let i = 0; i < 10; i++) {
            const offset = 20;
            const x = Math.random() * offset - offset / 2;
            const y = Math.random() * offset - offset / 2;
            const z = 0;
            const scaleX = 1 + Math.random() * 2;
            const scaleY = 1 + Math.random() * 2;
            const scaleZ = 1 + Math.random() * 2;
            const rotX = Math.random() * Math.PI;
            const rotY = Math.random() * Math.PI;
            const rotZ = Math.random() * Math.PI;
            meshesTransforms.push({
                position: [x, y, z],
                scale: [scaleX, scaleY, scaleZ],
                rotation: [rotX, rotY, rotZ]
            });
        }
        return [meshesTransforms]
    }, []);

    return (
        <>
            {meshesTransforms.map((meshTransform, index) => {
                return (
                    <RigidBody key={index}>
                        <Box {...meshTransform} />
                    </RigidBody>
                )
            })}

        </>

    )
}