"use client";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import fbo from 'raw-loader!glslify-loader!shaders/water-color/fbo.glsl';
import vertexShader from 'raw-loader!glslify-loader!shaders/water-color/vertex.glsl';

import * as THREE from 'three';
import "./SectionRenderTarget.scss";
import { Environment } from "@react-three/drei";

const ZOOM = 1000

function SourceTarget() {
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
            <mesh ref={planeRef} onPointerMove={moveOnPlane} visible={false}>
                <planeGeometry args={[4, 4, 1]} />
                <meshBasicMaterial color="black" />
            </mesh>
        </>
    );
}
function SecScene() {
    const planeRef = useRef();

    return (
        <>
            <mesh ref={planeRef} visible={false}>
                <planeGeometry args={[4, 4, 1]} />
                <meshBasicMaterial map={targetSource.texture} />
            </mesh>
        </>
    );
}

function ThridScene({ targetSource }) {
    const planeRef = useRef();

    return (
        <>
            <mesh ref={planeRef} visible={false}>
                <planeGeometry args={[4, 4, 1]} />
                <meshBasicMaterial map={targetSource.texture} />
            </mesh>
        </>
    );
}

function FboScene() {
    const shaderMaterialRef = useRef();
    const { camera } = useThree();

    useFrame((state) => {
        state.gl.setRenderTarget(sourceTarget)
        state.gl.render(sourceScene, camera)
        // state.gl.setRenderTarget(null)
        // state.gl.setRenderTarget(sectarget)
        // state.gl.setRenderTarget(sectarget)
        // state.gl.render(secScene, camera)
        shaderMaterialRef.current.uniforms.uTDiffuse.value = sourceTarget.texture;
        // shaderMaterialRef.current.uniforms.uTPrev.value = sectarget.texture;


        state.gl.setRenderTarget(null)
        // state.gl.render(thirdScene, camera)
    })

    const { innerWidth, innerHeight } = window;
    const aspectRatio = innerWidth / innerHeight;
    const planeWidth = innerWidth / ZOOM;
    const planeHeight = planeWidth / aspectRatio;

    return (
        <>
            {/* {createPortal(<SourceTarget />, sourceScene)} */}
            {/* {createPortal(<SecScene />, secScene)} */}
            {/* {createPortal(<ThridScene targetSource={sectarget} />, thirdScene)}  */}
            <mesh>
                <planeGeometry args={[planeWidth, planeHeight, 1]} />
                <shaderMaterial
                    ref={shaderMaterialRef}
                    vertexShader={vertexShader}
                    fragmentShader={fbo}
                    uniforms={{
                        uTDiffuse: {
                            value: null
                        },
                        uTPrev: {
                            value: null
                        }
                    }} />
            </mesh>
        </>
    );
}

const FinalScene = () => {
    const { camera } = useThree();

    const [sourceScene, sourceTarget] = useMemo(() => {
        const sourceScene = new THREE.Scene();
        // scene.background = new THREE.Color('orange');

        const sourceTarget = new THREE.RenderTarget(512, 512, {
            format: THREE.RGBAFormat,
            stencilBuffer: false,
        });
        sourceTarget.samples = 8;

        return [sourceScene, sourceTarget];
    }, []);

    // const [fboScene, fboTarget] = useMemo(() => {
    //     const fboScene = new THREE.Scene();
    //     // scene.background = new THREE.Color('orange');
    //     // { createPortal(<SecScene />, secScene) }
    //     const fboTarget = new THREE.RenderTarget(512, 512, {
    //         format: THREE.RGBAFormat,
    //         stencilBuffer: false,
    //     });
    //     fboTarget.samples = 8;

    //     return [fboScene, fboTarget];
    // }, []);

    const { innerWidth, innerHeight } = window;
    const aspectRatio = innerWidth / innerHeight;
    const planeWidth = innerWidth / ZOOM;
    const planeHeight = planeWidth / aspectRatio;

    useFrame((state) => {
        state.gl.setRenderTarget(sourceTarget)
        state.gl.render(sourceScene, camera)
        // state.gl.render(fboScene, camera)
        state.gl.setRenderTarget(null)
    })

    return (
        <>
        {/* <SourceTarget /> */}
            {createPortal(<SourceTarget />, sourceScene)}
            <mesh>
                <planeGeometry args={[planeWidth, planeHeight, 1]} />
                <meshBasicMaterial map={sourceTarget.texture} />
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
                gl={{
                    antialias: true,
                    alpha: false,
                }}
            >
                <FinalScene />
                {/* <SourceTarget /> */}
                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    );
}

export default SectionRenderTarget;