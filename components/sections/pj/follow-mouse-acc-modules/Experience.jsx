import { OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import BouncingBall from "./BouncingBall";


const Experience = () => {
    const meshRef = useRef();
    const lightRef = useRef();

    let deltaX, deltaY, nodeStartX, nodeStartY;
    let centerX = 0;
    let centerY = 0;
    let accelX = 0.0;
    let accelY = 0.0;
    let springing = 0.01;
    let damping = 0.89;
    let angle = 0;
    let frequency = 0.01;
    // Declare the variable for the curve tightness
    let organicConstant = 1.0;
    useFrame((state) => {
        nodeStartX = centerX;
        nodeStartY = centerY; 
        const { pointer } = state;
        deltaX = (pointer.x * (innerWidth/200)) - centerX;
        deltaY = (pointer.y * (innerHeight/200)) - centerY;

        // Create springing effect
        deltaX *= springing / 12;
        deltaY *= springing / 12;
        accelX += deltaX * 16;
        accelY += deltaY * 16;

        // Move center
        centerX += accelX;
        centerY += accelY;

        // Slow down springing
        accelX *= damping;
        accelY *= damping;

        // Change curve tightness based on the overall acceleration;
        // use abs() to avoid dependence on direction of acceleration
        organicConstant = 1 - (Math.abs(accelX) + Math.abs(accelY)) * 0.001;
        
        meshRef.current.position.x = nodeStartX + Math.sin(angle) * (accelX * 11);
        meshRef.current.position.y = nodeStartY + Math.sin(angle) * (accelY * 11);

        angle += frequency;

        lightRef.current.position.x = (pointer.x * (innerWidth/200));
        lightRef.current.position.y = (pointer.y * (innerHeight/200));
    })

    const imgGradientMap = useTexture("/assets/textures/toonGradientMaps/3.jpg")
    imgGradientMap.minFilter = THREE.NearestFilter
    imgGradientMap.magFilter = THREE.NearestFilter

    return (
        <>
            <ambientLight intensity={1.5} />
            <pointLight ref={lightRef} intensity={80} position={[0, 0, 4]} distance={0} />
            <BouncingBall />
            <mesh ref={meshRef}>
                <sphereGeometry args={[.5, 16, 16]} />
                <meshToonMaterial color="forestgreen" gradientMap={imgGradientMap} />
            </mesh>
            <OrbitControls />
        </>
    )
}

export default Experience;