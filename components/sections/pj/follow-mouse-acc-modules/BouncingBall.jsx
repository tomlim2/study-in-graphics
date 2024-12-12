import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
const BouncingBall = () => {
    // const [acc, setAcc] = useState(.5)
    const ballRef = useRef();
    let daumping = .98;
    let velocity = new THREE.Vector3(0, 0.1, 0);
    let direction = new THREE.Vector3(1, 1, 1);
    useEffect(() => {
        addEventListener('click', () => {
            ballRef.current.position.y += velocity.y
            if (ballRef.current.position.y < -3) {
                velocity = new THREE.Vector3(0, 0.99, 0).multiply(direction);
            }
            if (ballRef.current.position.y > 3) {
                velocity = new THREE.Vector3(0, 0.99, 0).multiply(direction);
            }
            velocity = new THREE.Vector3(0, 0.99, 0).multiply(direction);

        })

        return () => {

        }
    }, [])


    useFrame((state) => {
        ballRef.current.position.add(velocity)
        if (ballRef.current.position.y < -3) {
            direction.multiplyScalar(-1)
            velocity.multiply(direction);
        }
        if (ballRef.current.position.y > 3) {
            direction.multiplyScalar(-1)
            velocity.multiply(direction);
        }
        velocity = velocity.multiplyScalar(daumping)
        if(Math.abs(velocity.y) < 0.001){
            velocity.multiplyScalar(0)
        }   
    })



    return (
        <>
            <mesh ref={ballRef}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshToonMaterial color="orange" />
            </mesh>
        </>
    )
}

export default BouncingBall