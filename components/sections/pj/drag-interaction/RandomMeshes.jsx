import { useMemo } from "react";
import { InstancedRigidBodies, RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";


function Box(props) {
    

    return (
        <mesh position={props.position} scale={props.scale} rotation={props.rotation}>
            <sphereGeometry args={[.5, 32, 32]} />
            <meshToonMaterial color="red" />
        </mesh>
    )
}

export default function RandomMeshes() {
    const [meshesTransforms] = useMemo(() => {
        const meshesTransforms = []
        for (let i = 0; i < 100; i++) {
            const offset = 60;
            const x = Math.random() * offset - offset / 2;
            const y = Math.random() * offset - offset / 2;
            const z = 0;
            let scale = 1 + Math.random() * 2;
            const scaleX = scale;
            const scaleY = scale;
            const scaleZ = scale;
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

    useFrame((state) => {
        console.log(state);
        
    }, [])

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