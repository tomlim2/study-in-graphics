import * as THREE from "three"
import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";

export default function DraggableMesh() {
    const draggableObjRef = useRef();
    const rigidBodyRef = useRef();
    const mouse = { x: 0, y: 0 };

    const { camera } = useThree();
    const [isPonterDown, setIsPointerDown] = useState(false);
    const [offset, setOffset] = useState(new THREE.Vector3());

    const onPointerDown = (event) => {
        let check = true;

        setIsPointerDown(check);

        if (!draggableObjRef.current) return;

        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        const posObjOffset = new THREE.Vector3().subVectors(rigidBodyRef.current.translation(), pos);

        setOffset(posObjOffset);
    }

    const onPointerMove = (event) => {
        if (!isPonterDown) return;
        console.log(event);


        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));

        const newPos = pos.add(offset);
        rigidBodyRef.current.setTranslation(newPos, true);
        // draggableObjRef.current.position.copy(newPos);
    }

    const onPointerUp = (event) => {
        setIsPointerDown(false);
    }

    useFrame(() => {
        if (isPonterDown && draggableObjRef.current) {
            // api.position.copy(draggableObjRef.current.position);
        }
    });

    return (
        <>
            <mesh onPointerMove={onPointerMove} visible={false}>
                <planeGeometry args={[200, 200]} />
                <meshToonMaterial color="black" side={THREE.DoubleSide} />
            </mesh>
            <RigidBody ref={rigidBodyRef} type="fixed" onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}>
                <mesh
                    ref={draggableObjRef}

                >
                    <sphereGeometry args={[6, 32, 32]} />
                    <meshToonMaterial color="orange" side={THREE.DoubleSide}  />
                </mesh>
            </RigidBody>
        </>
    )
}