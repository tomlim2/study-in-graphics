import { OrbitControls, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { use, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import { useControls } from "leva";

function FollowGeometry(props) {
    const meshRef = useRef();
    const imgGradientMap = useTexture("/assets/textures/toonGradientMaps/3.jpg")
    imgGradientMap.minFilter = THREE.NearestFilter
    imgGradientMap.magFilter = THREE.NearestFilter

    return (
        <mesh ref={meshRef} position={props.pos}>
            <sphereGeometry args={[.5, 16, 16]} />
            <meshToonMaterial color="forestgreen" gradientMap={imgGradientMap} />
        </mesh>
    )
}

const Experience = () => {
    let geometriesLength = 8
    const [infos, setInfos] = useState(Array.from({ length: geometriesLength }, (_, index) => {
        return (
            {
                position: new THREE.Vector3(0 + index * 2, index * 2, 0)
            }
        )
    }));

    useFrame((state) => {
        const { pointer, clock } = state;
        let mouse = new THREE.Vector3(pointer.x * innerWidth / 200, pointer.y * innerHeight / 200, 0);
        let newArray = infos.map((info, index) => {
            let speed = 0.2;
            if (index === 0) {
                let currentPosition = info.position.clone().lerp(mouse, speed)
                return (
                    {
                        position: currentPosition,
                    }
                )
            } else {
                let target = infos[index - 1].position.clone()
                let currentPosition = info.position.clone().lerp(target, speed)
                let offsetPosition = target.clone().sub(currentPosition).normalize().multiplyScalar(0.25)
                return (
                    {
                        position: currentPosition.sub(offsetPosition)
                    }
                )
            }
        })
        setInfos(newArray)
        // console.log("geometries", geometries);

    })
    return (
        <>
            <ambientLight intensity={.5} />
            <pointLight intensity={80} position={[0, 0, 4]} distance={0} />
            {infos.map((info, index) => {
                return (
                    <FollowGeometry key={index} pos={info.position} />
                )
            })
            }
            <FollowGeometry pos={new THREE.Vector3(0, 0, 4)} />
        </>
    )
}

export default Experience;