"use client";
import { Canvas } from "@react-three/fiber";
import Experience from './Experience'

const SectionMaterials = () => {
    return (
        <Canvas shadows camera={{ position: [0, 0, 6] }}>
            <Experience />
        </Canvas>
    )
}

export default SectionMaterials;