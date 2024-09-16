import * as THREE from "three"
import { useEffect, useRef, useState } from "react";

import fragmentShader from "raw-loader!glslify-loader!shaders/wave-on-click/fragmentShader.glsl";
import vertexShader from "raw-loader!glslify-loader!shaders/wave-on-click/vertexShader.glsl";
import simplexNoise4d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise4d.glsl'

import { useControls } from "leva";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { Bvh, CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Experience = (props) => {
    const renderer = props.renderer;
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const materialRef = useRef();
    const cameraRef = useRef();
    const dotRef = useRef();
    const sphereRef = useRef();
    const raycast = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let geometry = new THREE.IcosahedronGeometry(2.5, 8);
    geometry = mergeVertices(geometry);
    geometry.computeTangents();

    const castDotOnObject = (event) => {
        const camera = cameraRef.current.camera;
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycast.setFromCamera(mouse, camera);
        const intersects = raycast.intersectObject(sphereRef.current);
        if (intersects.length > 0) {
            const { point } = intersects[0];
            uniforms.uMouse.value.copy(point);
            dotRef.current.position.copy(point);
            uniforms.uVel.value = uniforms.uTime.value;
        }
    }

    useEffect(() => {
        addEventListener('mousemove', (event) => castDotOnObject(event))

        return () => {
            removeEventListener('mousemove', (event) => castDotOnObject(event))
        }
    }, [])


    const debugObject = {

    }
    const uniforms = {
        uTime: new THREE.Uniform(0),
        uSSA: new THREE.Uniform(-1),
        uSSB: new THREE.Uniform(1),
        uStpA: new THREE.Uniform(-1),
        uMouse: new THREE.Uniform(new THREE.Vector3(0, 0, 0)),
        uVel: new THREE.Uniform(0),
        deltaTime: new THREE.Uniform(0),
    }

    useFrame((state, delta) => {
        uniforms.uTime.value = state.clock.elapsedTime;            
        if(uniforms.uVel.value){
            uniforms.deltaTime.value = (1 - state.clock.elapsedTime - uniforms.uVel.value);
        }
    })

    const { rangeA, rangeB, uStpA } = useControls("wave-on-click", {
        // uStpA: {
        //     value: uniforms.uStpA.value,
        //     max: 2,
        //     min: -2,
        //     step: 0.001,
        //     onChange: (value) => {
        //         if (materialRef.current) {
        //             uniforms.uStpA = new THREE.Uniform(value);
        //             console.log(materialRef.current.uniforms.uStpA);

        //         }
        //     }
        // },
        rangeA: {
            value: uniforms.uSSA.value,
            max: 2,
            min: -2,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uSSA = new THREE.Uniform(value);
                    console.log(materialRef.current.uniforms.uSSA);

                }
            }
        },
        rangeB: {
            value: uniforms.uSSB.value,
            max: 2,
            min: -2,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uSSB = new THREE.Uniform(value);
                }
            }
        }
    })
    return (
        <>
            <CameraControls ref={cameraRef} maxDistance={35} dollySpeed={.25} />
            <Bvh firstHitOnly>
                <mesh ref={sphereRef}>
                    <bufferGeometry {...geometry} />
                    <shaderMaterial
                        ref={materialRef}
                        vertexShader={`${simplexNoise4d}
                        ${vertexShader}
                        `}
                        fragmentShader={fragmentShader}
                        side={THREE.DoubleSide}
                        uniforms={uniforms}
                        wireframe={true}
                    />
                </mesh>
            </Bvh>
            <mesh ref={dotRef}>
                <sphereGeometry args={[.1, 16, 16]} />
                <meshBasicMaterial color={"blue"} />
            </mesh>
            <mesh>
                <planeGeometry args={[40, 40, 16, 16]} />
                <meshBasicMaterial color={"white"} wireframe={true} />
            </mesh>
        </>
    )
}

export default Experience;