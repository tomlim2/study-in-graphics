import { useEffect, useState } from "react"
import Firework from "./Firework";
import * as THREE from "three"
import { useLoader } from "@react-three/fiber";


export default function FireworkWrapper() {
    const [fireworks, setFireworks] = useState([]);
    const textures = [
        useLoader(THREE.TextureLoader, '/fireworks/particles/1.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/2.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/3.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/4.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/5.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/6.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/7.png'),
        useLoader(THREE.TextureLoader, '/fireworks/particles/8.png'),
    ]
    useEffect(() => {
        const handleClickEvent = () => {
            const count = Math.round(Math.random() * 1000)
            const position = new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                Math.random(),
                (Math.random() - 0.5) * 2
            )
            const particleSize = 0.1 + Math.random() * 0.2
            const indexTexture = Math.floor(Math.random() * 8)
            const selectedTexture = textures[indexTexture]
            selectedTexture.flipY = false
            const color = new THREE.Color()
            color.setHSL(Math.random(), 1, 0.7)
            const radius = 2 * (0.25 + Math.random() * 0.5)
            const newFirework = <Firework
                key={count + particleSize}
                particleSize={particleSize}
                particleColor={color}
                count={count}
                position={position}
                texture={selectedTexture}
                radius={radius}
            />
            setFireworks((prev) => [...prev, newFirework])

        }
        window.addEventListener("click", handleClickEvent)

        return () => {
            window.removeEventListener("click", handleClickEvent)
        }
    }, [])

    return <>
        {fireworks}
    </>
}