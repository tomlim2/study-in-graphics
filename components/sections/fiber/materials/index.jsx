"use client";
import { Canvas } from "@react-three/fiber";
import Experience from './Experience'

const SectionMaterials = () => {
    return (
        <Canvas shadows camera={{ position: [0, 0, 50], fov: 10 }}>
            <Experience />
        </Canvas>
    )
}

export default SectionMaterials;