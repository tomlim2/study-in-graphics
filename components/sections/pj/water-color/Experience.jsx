import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import vertexShader from 'raw-loader!glslify-loader!shaders/water-color/vertex.glsl';
import fragmentShader from 'raw-loader!glslify-loader!shaders/water-color/fragment.glsl';
import fbo from 'raw-loader!glslify-loader!shaders/water-color/fbo.glsl';

const Plane = () => {
    const uniforms = {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2() },
        pointer: { value: new THREE.Vector2() },
    };
    const { render, scene, camera } = useThree()

    const setupPipeline = () => {
        console.log('hi');
        const sourceTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

        const fboScene = new THREE.Scene();
        const fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const fboMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader,
            fragmentShader: fbo
        })
    }


    useEffect(() => {

        const raycast = new THREE.Raycaster();
        const raycastPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );

        const dummy = new THREE.Mesh(
            new THREE.SphereGeometry(1, 20, 20),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 })
        );

        window.addEventListener('mousemove', (event) => {
            uniforms.pointer.value.x = (event.clientX / window.innerWidth) * 2 - 1;
            uniforms.pointer.value.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycast.setFromCamera(uniforms.pointer.value, camera);

            const intersects = raycast.intersectObject(raycastPlane);
            if (intersects.length > 0) {
                dummy.position.copy(intersects[0].point);
                console.log(intersects[0].point);
            }
        })

        scene.add(raycastPlane, dummy);

        setupPipeline();

        return () => {

        }
    }, [])

    return (
        <></>
    );
};

const Experience = () => {
    return (
        <Plane />
    );
};

export default Experience;
