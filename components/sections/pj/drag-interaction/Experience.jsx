import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react";

import { useFrame, useThree } from "@react-three/fiber";
import { Physics, useBox } from "@react-three/cannon";

function Box(props) {
    const [ref] = useBox(() => ({
        mass: 1000,
        angularVelocity: [0, 0, 0],
        linearVelocity: [0, 0, 0],
        ...props
    }));
    return (
        <mesh ref={ref} position={props.position} scale={props.scale} rotation={props.rotation}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="red" wireframe={true} />
        </mesh>
    )
}

function RandomPosObjects() {
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
                    <Box key={index} {...meshTransform} />
                )
            })}

        </>

    )
}

function InteractiveMesh() {
    const draggableObjRef = useRef();
    const mouse = { x: 0, y: 0 };

    const { camera } = useThree();
    const [isPonterDown, setIsPointerDown] = useState(false);
    const [offset, setOffset] = useState(new THREE.Vector3());

    const onPointerDown = (event) => {
        let check = true;
        console.log('onPointerDown');
        setIsPointerDown(check);
        console.log(check, 'check');


        if (!draggableObjRef.current) return;

        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        const posObjOffset = new THREE.Vector3().subVectors(draggableObjRef.current.position, pos);
        setOffset(posObjOffset);
    }

    const onPointerMove = (event) => {
        if (!isPonterDown) return;
        console.log(event);


        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        console.log(offset);

        const newPos = pos.add(offset);
        draggableObjRef.current.position.copy(newPos);
    }

    const onPointerUp = (event) => {
        console.log('onPointerUp');

        setIsPointerDown(false);
    }

    const [ref, api] = useBox(() => ({
        mass: 1,
        position: [0, 0, 0],
        type: "Static"
    }));

    useFrame(() => {
        if (isPonterDown && draggableObjRef.current) {
            api.position.copy(draggableObjRef.current.position);
        }
    });

    return (
        <>
            <mesh onPointerMove={onPointerMove} visible={false}>
                <planeGeometry args={[100, 100]} />
                <meshBasicMaterial color="black" side={THREE.DoubleSide} />
            </mesh>
            <mesh 
                ref={(mesh) => {
                    draggableObjRef.current = mesh;
                    ref.current = mesh;
                }}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
            >
                <sphereGeometry args={[4, 32, 32]} />
                <meshBasicMaterial color="orange" side={THREE.DoubleSide} wireframe={true} />
            </mesh>
        </>
    )
}

// Main Scene
const Experience = () => {
    return (
        <>
            <Physics gravity={[0, 0, 0]}>
                <RandomPosObjects />
                <InteractiveMesh />
            </Physics>
        </>
    );
}

export default Experience;