import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

const Experience = () => {
    const meshRef = useRef();
    let x, y;
    useFrame((state) => {
        const { pointer } = state;
        x = (pointer.x * (innerWidth/200)) ;
        y = (pointer.y * (innerHeight/200));
        meshRef.current.position.x = x;
        meshRef.current.position.y = y;
    })

    return (
        <>
            <ambientLight intensity={.1} />
            <directionalLight intensity={2} position={[10, 10, 10]} />
            <mesh ref={meshRef}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshToonMaterial color="orange" />
            </mesh>
            <OrbitControls />
        </>
    )
}

export default Experience;