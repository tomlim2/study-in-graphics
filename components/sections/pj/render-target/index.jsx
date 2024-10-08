"use client";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import * as THREE from 'three';
import "./SectionRenderTarget.scss";

function DrawingThing() {
    const { camera } = useThree();
    const sphereRef = useRef();
    const planeRef = useRef();
    const moveOnPlane = (event) => {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) * 2 - 1;
        const y = -(clientY / innerHeight) * 2 + 1;

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera({ x, y }, camera);
        const intersects = raycaster.intersectObjects([planeRef.current]);
        if (intersects.length > 0) {
            const { point } = intersects[0];
            sphereRef.current.position.copy(point);
        }
    }

    return (
        <>
            <mesh ref={sphereRef}>
                <sphereGeometry args={[.08, 32, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh ref={planeRef} onPointerMove={moveOnPlane}>
                <planeGeometry args={[5, 5, 1]} />
                <meshBasicMaterial color="black" />
            </mesh>
        </>
    );
}

function Cube() {
    const cam = useRef()
    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('orange');
        const target = new THREE.RenderTarget(1024, 1024, {
            format: THREE.RGBAFormat,
            stencilBuffer: false
        });
        target.samples = 8;

        return [scene, target];
    }, []);
    useFrame((state) => {
        // cam.current.position.z = 5 + Math.sin(state.clock.getElapsedTime() * 1.5) * 2
        state.gl.setRenderTarget(target)
        state.gl.render(scene, cam.current)
        state.gl.setRenderTarget(null)
      })
    return (
        <>
            <PerspectiveCamera ref={cam} position={[0, 0, 3]} />
            {createPortal(<DrawingThing />, scene)}
            <mesh>
                <planeGeometry args={[5, 5, 2]} />
                <meshBasicMaterial color="red" map={target.texture} />
            </mesh>
        </>
    );
}

const SectionRenderTarget = () => {
    return (
        <div className={"sectionRenderTarget"}>
            <Canvas >
                <Cube />
                <OrbitControls />
            </Canvas>
        </div>
    );
}

export default SectionRenderTarget;