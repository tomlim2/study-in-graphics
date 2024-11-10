import { OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

const Experience = () => {
    const meshRef = useRef();
    const meshRef2 = useRef();
    const meshRef3 = useRef();
    const meshRef4 = useRef();
    let x, y, x1, y1, x2, y2, x3, y3;
    let scalar = 1.2;
    let normal1 = new THREE.Vector3(0, -1, 0);
    let normal2 = new THREE.Vector3(0, -1, 0);
    let normal3 = new THREE.Vector3(0, -1, 0);
    useFrame((state) => {
        const { pointer } = state;
        x = (pointer.x * (innerWidth/200));
        y = (pointer.y * (innerHeight/200));
        x1 = meshRef.current.position.x   - normal1.x * scalar;
        y1 = meshRef.current.position.y   - normal1.y * scalar;
        x2 = meshRef2.current.position.x  - normal2.x * scalar;
        y2 = meshRef2.current.position.y  - normal2.y * scalar;
        x3 = meshRef3.current.position.x  - normal3.x * scalar;
        y3 = meshRef3.current.position.y  - normal3.y * scalar;
        const previousPointer1 = new THREE.Vector3(x1, y1, 0);
        const currentPointer1 = new THREE.Vector3(x, y, 0);
        normal1 = currentPointer1.clone().sub(previousPointer1).normalize();

        const previousPointer2 = new THREE.Vector3(x2, y2, 0);
        const currentPointer2 = new THREE.Vector3(x1, y1, 0);
        normal2 = currentPointer2.clone().sub(previousPointer2).normalize();

        const previousPointer3 = new THREE.Vector3(x3, y3, 0);
        const currentPointer3 = new THREE.Vector3(x2, y2, 0);
        normal3 = currentPointer3.clone().sub(previousPointer3).normalize();

        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x, 0.1);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y, 0.1);
        meshRef2.current.position.x = THREE.MathUtils.lerp(meshRef2.current.position.x, x1, 0.2);
        meshRef2.current.position.y = THREE.MathUtils.lerp(meshRef2.current.position.y, y1, 0.2);
        meshRef3.current.position.x = THREE.MathUtils.lerp(meshRef3.current.position.x, x2, 0.2);
        meshRef3.current.position.y = THREE.MathUtils.lerp(meshRef3.current.position.y, y2, 0.2);
        meshRef4.current.position.x = THREE.MathUtils.lerp(meshRef4.current.position.x, x3, 0.2);
        meshRef4.current.position.y = THREE.MathUtils.lerp(meshRef4.current.position.y, y3, 0.2);
    })

    const imgGradientMap = useTexture("/assets/textures/toonGradientMaps/3.jpg")
    imgGradientMap.minFilter = THREE.NearestFilter
    imgGradientMap.magFilter = THREE.NearestFilter

    return (
        <>
            <ambientLight intensity={1.5} />
            <pointLight intensity={40} position={[0, 0, 4]} distance={0} />
            <mesh ref={meshRef}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshToonMaterial color="orange" gradientMap={imgGradientMap} />
            </mesh>
            <mesh ref={meshRef2}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshToonMaterial color="orange" gradientMap={imgGradientMap} />
            </mesh>
            <mesh ref={meshRef3}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshToonMaterial color="orange" gradientMap={imgGradientMap} />
            </mesh>
            <mesh ref={meshRef4}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshToonMaterial color="orange" gradientMap={imgGradientMap} />
            </mesh>
            <OrbitControls />
        </>
    )
}

export default Experience;