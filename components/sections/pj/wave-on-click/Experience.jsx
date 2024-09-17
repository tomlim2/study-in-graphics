import * as THREE from "three"
import { useEffect, useRef, useState } from "react";

import fragmentShader from "raw-loader!glslify-loader!shaders/wave-on-click/fragmentShader.glsl";
import vertexShader from "raw-loader!glslify-loader!shaders/wave-on-click/vertexShader.glsl";
import simplexNoise4d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise4d.glsl'

import { useControls } from "leva";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { Bvh, CameraControls, DragControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Experience = (props) => {
    const renderer = props.renderer;
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const [mousePosition, setMousePosition] = useState(new THREE.Vector3(0, 0, 0));
    const materialRef = useRef();
    const cameraRef = useRef();
    const dotRef = useRef();
    const sphereRef = useRef();
    const raycast = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let geometry = new THREE.IcosahedronGeometry(4, 16);
    geometry = mergeVertices(geometry);
    geometry.computeTangents();
    const nonIndexedGeometry = geometry.toNonIndexed()
    

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
    const debugObject = {

    }
    const uniforms = {
        uTime: new THREE.Uniform(0),
        uSSA: new THREE.Uniform(-1),
        uSSB: new THREE.Uniform(1),
        uStpA: new THREE.Uniform(-1),
        uMouse: new THREE.Uniform(new THREE.Vector3(0, 0, 0)),
        uMouseWorldPosition: new THREE.Uniform(new THREE.Vector3(0, 0, 0)),
        uVel: new THREE.Uniform(0),
        deltaTime: new THREE.Uniform(0),
    }

    useFrame((state, delta) => {
        if (!sphereRef.current) return;

        const { mouse, clock } = state;
        const camera = cameraRef.current.camera;
        uniforms.uTime.value = state.clock.elapsedTime;

        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const pos = camera.position.clone().add(dir.multiplyScalar(distance));
        // console.log(pos);
        // setMousePosition(pos);
        uniforms.uMouseWorldPosition.value.copy(pos);
    })

    const onUpdateGeo = (geometry) => {
        if (geometry) {
          let len = geometry.attributes.position.count;
    
          let randoms = new Float32Array(len);
          let centers = new Float32Array(len * 3);
    
          for (let i = 0; i < len; i += 3) {
            let r = Math.random();
            randoms[i] = r;
            randoms[i + 1] = r;
            randoms[i + 2] = r;
    
            let x = geometry.attributes.position.array[i * 3];
            let y = geometry.attributes.position.array[i * 3 + 1];
            let z = geometry.attributes.position.array[i * 3 + 2];
    
            let x1 = geometry.attributes.position.array[i * 3 + 3];
            let y1 = geometry.attributes.position.array[i * 3 + 4];
            let z1 = geometry.attributes.position.array[i * 3 + 5];
    
            let x2 = geometry.attributes.position.array[i * 3 + 6];
            let y2 = geometry.attributes.position.array[i * 3 + 7];
            let z2 = geometry.attributes.position.array[i * 3 + 8];
    
            let center = new THREE.Vector3(x, y, z)
              .add(new THREE.Vector3(x1, y1, z1).add(new THREE.Vector3(x2, y2, z2)))
              .divideScalar(3);
    
            centers.set([center.x, center.y, center.z], i * 3);
            centers.set([center.x, center.y, center.z], (i + 1) * 3);
            centers.set([center.x, center.y, center.z], (i + 2) * 3);
          }
    
          const attributeRandoms = new THREE.BufferAttribute(randoms, 1);
          const attributeCenters = new THREE.BufferAttribute(centers, 3);
    
          geometry.setAttribute("aRandom", attributeRandoms);
          geometry.setAttribute("aCenter", attributeCenters);
        }
      };

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
            <CameraControls ref={cameraRef} maxDistance={35} dollySpeed={.25} enabled={false} />
            <Bvh firstHitOnly>
                <mesh ref={sphereRef} onPointerMove={castDotOnObject}>
                    <bufferGeometry {...nonIndexedGeometry}
                        onUpdate={(geometry) => {
                            onUpdateGeo(geometry);
                        }}
                    />
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
                {/* <sphereGeometry args={[.1, 16, 16]} /> */}
                {/* <meshBasicMaterial color={"blue"} /> */}
            </mesh>
            <mesh >
                <icosahedronGeometry args={[3.95, 16]} />
                <meshBasicMaterial color={"blue"}
                    // wireframe={true}
                />
            </mesh>
            {/* <mesh>
                <planeGeometry args={[40, 40, 16, 16]} />
                <meshBasicMaterial color={"white"} wireframe={true} />
            </mesh> */}
        </>
    )
}


export default Experience;