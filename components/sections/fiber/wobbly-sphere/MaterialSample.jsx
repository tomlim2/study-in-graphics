import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import fragmentShader from 'raw-loader!glslify-loader!./shader/fragmentShader.glsl'
import vertexShader from 'raw-loader!glslify-loader!./shader/vertexShader.glsl'
import { useControls } from "leva"

const MaterialSample = () => {
    const materialRef = useRef();
    const meshRef = useRef();
    const { color, intensity } = useControls("pointLight", {
        color: "#ffffff",
        intensity: { value: 30, min: 0, max: 120 },
    });
    const { fresnelColor } = useControls("fresnel", {
        fresnelColor: {
            value: "#ff99ff",
            onChange: (value) => {
                if (materialRef.current) {
                    customUniforms.uFresnelColor.value = new Color(value);
                }
            }
        },
    });

    useFrame((state, delta) => {
        if (materialRef.current) {
            customUniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.onBeforeCompile((shader)=>{
            //   console.log(shader);
            // }));
            // materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 2;
        }
    });

    const customUniforms = {
        uTime: {
            value: 0
        },
        uFresnelColor: {
            value: new Color(fresnelColor)
        }
    }
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            // console.log(materialRef.current.uniforms.uTime.value, "hi");
        }
    });
    const onUpdateShader = (shader) => {
        // glslTestMaterial.userData.shader = shader;
        shader.defines.NO_ANIMATION = true;
        shader.uniforms.uTime = customUniforms.uTime;
        shader.uniforms.uFresnelColor = customUniforms.uFresnelColor;

        // varying vec3 vNormalW;
        shader.vertexShader = shader.vertexShader.replace(
          /*glsl*/`varying vec3 vViewPosition;`,
          /*glsl*/`
            varying vec3 vViewPosition;
            varying vec3 vNN; 
            varying vec3 vEye;
          `)

        shader.vertexShader = shader.vertexShader.replace(
            /*glsl*/`vViewPosition = - mvPosition.xyz;`,
            /*glsl*/`
              vViewPosition = - mvPosition.xyz;
    
              mat4 LM = modelMatrix;
              LM[2][3] = 0.0;
              LM[3][0] = 0.0;
              LM[3][1] = 0.0;
              LM[3][2] = 0.0;
    
              vec4 GN = LM * vec4(objectNormal.xyz, 1.0);
              vNN = normalize(GN.xyz);
              vEye = normalize(GN.xyz-cameraPosition);
            `)

        shader.fragmentShader = shader.fragmentShader.replace(
          /*glsl*/`#include <color_pars_fragment>`,
          /*glsl*/`#include <color_pars_fragment>
            uniform float uTime;
            uniform vec3 uFresnelColor;
            varying vec3 vNN; 
            varying vec3 vEye;
          `)
        shader.fragmentShader = shader.fragmentShader.replace(
          /*glsl*/`#include <color_fragment>`,
          /*glsl*/`#include <color_fragment>
          float greenValue = sin(uTime)*.5 + 1.0;
          #ifdef NO_ANIMATION
          greenValue = 0.0;
          #else
          greenValue = sin(uTime)*2. + 1.0;
          #endif
    
          diffuseColor = vec4(0.0,greenValue,0.0,1);
          
          vec3 fresnelEffect = vec3(1.0) - -min(dot(vEye, normalize(vNN) ), 0.0);
          diffuseColor.rgb += pow(fresnelEffect, vec3(4.0))*uFresnelColor;
          `)
        console.log(shader.fragmentShader)
    }

    return <meshStandardMaterial
        ref={materialRef}
        color={'black'}
        transparent
        onBeforeCompile={(shader) => onUpdateShader(shader)} />

}

export default MaterialSample