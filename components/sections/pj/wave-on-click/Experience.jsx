import * as THREE from "three"
import { useEffect, useMemo, useRef, useState } from "react";

import fragmentShader from "raw-loader!glslify-loader!shaders/wave-on-click/fragmentShader.glsl";
import vertexShader from "raw-loader!glslify-loader!shaders/wave-on-click/vertexShader.glsl";
import simplexNoise4d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise4d.glsl'

import { useControls } from "leva";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js'
import { Bvh, CameraControls, DragControls, useKTX2 } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import CSM from "three-custom-shader-material";

const Experience = (props) => {
    const renderer = props.renderer;
    const [isMouseEnter, setIsMouseEnter] = useState(false);
    const [mousePosition, setMousePosition] = useState(new THREE.Vector3(0, 0, 0));
    const materialRef = useRef();

    const dotRef = useRef();
    const sphereRef = useRef();
    const raycast = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    const { camera } = useThree();


    const castDotOnObject = (event) => {

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


    useFrame((state, delta) => {
        if (!sphereRef.current) return;

        const { mouse, clock } = state;

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
    const normalMap = useLoader(THREE.TextureLoader, "/assets/textures/paintedPlaterWall/painted_plaster_wall_nor_gl_4k.png");
    // const KTX2NormalMap = useKTX2(normalMap);


    const { geometry, triangleDataTexture, triangleCount } = useMemo(() => {
        const geo = new THREE.IcosahedronGeometry(4, 32);
        const positionAttr = geo.getAttribute('position');
        const triangleCount = positionAttr.count / 3;
        const triangleData = new Float32Array(triangleCount * 4);

        for (let i = 0; i < triangleCount; i++) {
            const triIndex = i * 4;
            const vertIndex = i * 9;

            const centerX = (positionAttr.array[vertIndex] + positionAttr.array[vertIndex + 3] + positionAttr.array[vertIndex + 6]) / 3;
            const centerY = (positionAttr.array[vertIndex + 1] + positionAttr.array[vertIndex + 4] + positionAttr.array[vertIndex + 7]) / 3;
            const centerZ = (positionAttr.array[vertIndex + 2] + positionAttr.array[vertIndex + 5] + positionAttr.array[vertIndex + 8]) / 3;

            triangleData[triIndex] = centerX;
            triangleData[triIndex + 1] = centerY;
            triangleData[triIndex + 2] = centerZ;
            triangleData[triIndex + 3] = i / triangleCount;
        }

        const dataTexture = new THREE.DataTexture(
            triangleData,
            triangleCount,
            1,
            THREE.RGBAFormat,
            THREE.FloatType
        );

        if (geo) {
            const len = geo.attributes.position.count;

            const randoms = new Float32Array(len);
            const centers = new Float32Array(len * 3);

            for (let i = 0; i < len; i += 3) {
                const r = Math.random();
                randoms[i] = r;
                randoms[i + 1] = r;
                randoms[i + 2] = r;

                const x = geo.attributes.position.array[i * 3];
                const y = geo.attributes.position.array[i * 3 + 1];
                const z = geo.attributes.position.array[i * 3 + 2];

                const x1 = geo.attributes.position.array[i * 3 + 3];
                const y1 = geo.attributes.position.array[i * 3 + 4];
                const z1 = geo.attributes.position.array[i * 3 + 5];

                const x2 = geo.attributes.position.array[i * 3 + 6];
                const y2 = geo.attributes.position.array[i * 3 + 7];
                const z2 = geo.attributes.position.array[i * 3 + 8];

                const center = new THREE.Vector3(x, y, z)
                    .add(new THREE.Vector3(x1, y1, z1).add(new THREE.Vector3(x2, y2, z2)))
                    .divideScalar(3);

                centers.set([center.x, center.y, center.z], i * 3);
                centers.set([center.x, center.y, center.z], (i + 1) * 3);
                centers.set([center.x, center.y, center.z], (i + 2) * 3);
            }

            const attributeRandoms = new THREE.BufferAttribute(randoms, 1);
            const attributeCenters = new THREE.BufferAttribute(centers, 3);
            console.log(centers, 'centers');

            geo.setAttribute("aRandom", attributeRandoms);
            geo.setAttribute("aCenter", attributeCenters);
        }

        console.log(triangleData, 'triangleData');


        const mergedGeometry = mergeVertices(geo);
        mergedGeometry.computeTangents();

        const nonIndexedGeometry = mergedGeometry.toNonIndexed();

        return { geometry: nonIndexedGeometry, triangleDataTexture: dataTexture, triangleCount };
    }, []);

    const uniforms = {
        uTime: new THREE.Uniform(0),
        uSSA: new THREE.Uniform(-1),
        uSSB: new THREE.Uniform(1),
        uStpA: new THREE.Uniform(-1),
        uMouse: new THREE.Uniform(new THREE.Vector3(0, 0, 0)),
        uMouseWorldPosition: new THREE.Uniform(new THREE.Vector3(0, 0, 0)),
        uVel: new THREE.Uniform(0),
        deltaTime: new THREE.Uniform(0),
        uTriangleData: { type: "t", value: triangleDataTexture },
        uCollisionRaius: new THREE.Uniform(5.),
        uTriangleCount: new THREE.Uniform(triangleCount),
    }

    const { rangeA, rangeB } = useControls("wave-on-click", {
        rangeA: {
            value: uniforms.uSSA.value,
            max: 2,
            min: -2,
            step: 0.001,
            onChange: (value) => {
                if (materialRef.current) {
                    uniforms.uSSA = new THREE.Uniform(value);

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
            <Bvh firstHitOnly>
                <mesh receiveShadow castShadow ref={sphereRef} onPointerMove={castDotOnObject}>
                    <bufferGeometry {...geometry}
                    />
                    <CSM
                        baseMaterial={THREE.MeshStandardMaterial}
                        attach="material"
                        vertexShader={`${simplexNoise4d}
                        ${vertexShader}
                        `}
                        fragmentShader={fragmentShader}
                        side={THREE.DoubleSide}
                        uniforms={uniforms} 
                        normalMap={normalMap}
                        normalMapType={THREE.TangentSpaceNormalMap}
                        normalScale={new THREE.Vector2(.2, .2)}
                        roughness={.3}
                        wireframe
                        />
                </mesh>
            </Bvh>
            <mesh ref={dotRef}>
                {/* <sphereGeometry args={[.1, 16, 16]} /> */}
                {/* <meshBasicMaterial color={"blue"} /> */}
            </mesh>
            {/* {BasisGeometry()} */}
        </>
    )
}

const BasisGeometry = () => {
    
    return (
        <mesh>
            <icosahedronGeometry args={[3.95, 16]} />
            <meshBasicMaterial color={"gray"} wireframe />
        </mesh>
    )
}


export default Experience;