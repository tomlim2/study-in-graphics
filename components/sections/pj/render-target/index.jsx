"use client";
import { Environment, OrbitControls, OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import fbo from 'raw-loader!glslify-loader!shaders/water-color/fbo.glsl';
import vertexShader from 'raw-loader!glslify-loader!shaders/water-color/vertex.glsl';

import * as THREE from 'three';
import "./SectionRenderTarget.scss";

let ZOOM = 200

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
            {/* <OrthographicCamera makeDefault near={0} far={1000} zoom={1} /> */}
            <mesh ref={sphereRef}>
                <sphereGeometry args={[.08, 32, 32]} />
                <meshBasicMaterial color="white" />
            </mesh>
            <mesh ref={planeRef} onPointerMove={moveOnPlane}>
                <planeGeometry args={[4, 4, 1]} />
                <meshBasicMaterial color="black" />
            </mesh>
        </>
    );
}

function Cube() {
    const { camera } = useThree();
    const [scene, target] = useMemo(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color('orange');
        // const { innerWidth, innerHeight } = window;
        const target = new THREE.RenderTarget(1024, 1024, {
            format: THREE.RGBAFormat,
            stencilBuffer: true,
        });
        target.samples = 8;

        return [scene, target];
    }, []);
    useFrame((state) => {
        state.gl.setRenderTarget(target)
        state.gl.render(scene, camera)
        state.gl.setRenderTarget(null)
    })

    const { innerWidth, innerHeight } = window;
    const aspectRatio = innerWidth / innerHeight;
    const planeWidth = innerWidth / ZOOM;
    const planeHeight = planeWidth / aspectRatio;

    return (
        <>
            {createPortal(<DrawingThing />, scene)}
            <mesh>
                <planeGeometry args={[planeWidth, planeHeight, 1]} />
                <shaderMaterial
                    vertexShader={vertexShader}
                    fragmentShader={fbo}
                    uniforms={{
                        uTDiffuse: {
                            value: target.texture
                        }
                    }} />
            </mesh>
        </>
    );
}

const SectionRenderTarget = () => {
    return (
        <div className={"sectionRenderTarget"}>
            <Canvas
                orthographic={true}
                camera={{ zoom: ZOOM }}
            >
                <Cube />
                {/* <DrawingThing /> */}
                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    );
}

export default SectionRenderTarget;