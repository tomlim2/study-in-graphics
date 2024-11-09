import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';


function Ball() {
    const meshRef = useRef();
    const [startMove, setStartMove] = useState(false);

    // Random initial position
    const initialPosition = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(20)-10,
        THREE.MathUtils.randFloatSpread(20)-10,
        THREE.MathUtils.randFloatSpread(20)-10
    );

    // Set initial position on mount
    useEffect(() => {
        if (meshRef.current) {
            meshRef.current.position.copy(initialPosition);
        }

        // Start movement after 3 seconds
        const timer = setTimeout(() => {
            setStartMove(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    // Animation loop to move towards origin
    useFrame(() => {
        if (startMove && meshRef.current) {
            // Interpolate position towards (0, 0, 0)
            meshRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.02);
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial color="orange" />
        </mesh>
    );
}

const Experience = () => {
    const numBalls = 10;  // Number of balls to create
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <OrbitControls />
            {Array.from({ length: numBalls }).map((_, i) => (
                <Ball key={i} />
            ))}
        </>
    )
}

export default Experience;