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
    const { gl, scene, camera, raycaster } = useThree()

    const setupPipeline = () => {
        const sourceTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        const targetA = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        const targetB = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

        const fboScene = new THREE.Scene();
        const fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1000);
        fboCamera.zoom = 1000;

        const fboMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTDiffuse: { value: null },
                tPrev: { value: null },
                uResolution: { value: new THREE.Vector4(window.innerWidth, window.innerHeight, 1, 1) },
            },
            vertexShader,
            fragmentShader: fbo
        })

        const fboQuad = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            fboMaterial
        );
        fboScene.add(fboQuad);

        // final scene
        const finalScene = new THREE.Scene();
        const finalQuad = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.MeshBasicMaterial({
                map: targetA.texture
            })
        );
        finalScene.add(finalQuad);


        // pipeline loop
        // ping pong
        gl.setRenderTarget(targetA);
        gl.render(fboScene, fboCamera);
        fboMaterial.uniforms.uTDiffuse.value = sourceTarget.texture;
        fboMaterial.uniforms.tPrev.value = targetA.texture;

        // final out
        finalQuad.material.map = targetA.texture;
        gl.setRenderTarget(targetA);
        gl.render(finalScene, fboCamera);
    }

    useEffect(() => {
        const raycastPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.MeshBasicMaterial({
                color: 0xf0f0f0,
                side: THREE.DoubleSide,
            })
            // new THREE.ShaderMaterial({
            //     // uniforms: {},
            //     vertexShader: vertexShader,
            //     fragmentShader: fragmentShader,
            //     side: THREE.DoubleSide,
            // })
        );

        const dummy = new THREE.Mesh(
            new THREE.SphereGeometry(.05, 20, 20),
            new THREE.MeshToonMaterial({ color: 0xff0000 })
        );

        window.addEventListener('mousemove', (event) => {
            uniforms.pointer.value.x = (event.clientX / window.innerWidth) * 2 - 1;
            uniforms.pointer.value.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(uniforms.pointer.value, camera);

            const intersects = raycaster.intersectObject(raycastPlane);
            if (intersects.length > 0) {
                dummy.position.copy(intersects[0].point);
                console.log(intersects[0].point);
            }
        })

        scene.add(raycastPlane, dummy);

        const tempScene = new THREE.Scene();
        const tempCamera = camera;

        tempScene.add(raycastPlane, dummy);
        gl.render(tempScene, tempCamera);


        // setupPipeline();

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
