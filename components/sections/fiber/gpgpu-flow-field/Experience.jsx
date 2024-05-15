import { useControls } from "leva";
import { CameraControls, useGLTF } from "@react-three/drei";
import flowFieldVertexShader from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/vertex.glsl'
import flowFieldFragnentSahder from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/fragment.glsl'
import simplexNose3d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise3d.glsl'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Float32BufferAttribute, Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap/gsap-core";

const Experience = () => {
  const shaderRef = useRef()
  const bufferRef = useRef()
  const gltfModels = useGLTF('/gpgpu-flow-field/model.glb')
  const { clearColor, uSize } = useControls("canvas", {
    clearColor: {
      value: '#29191f',
    },
    uSize: {
      value: 0, min: 0, max: 3, step: .1,
      onChange: (num) => {

      }
    },
  }
  );
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
  let particles = null

  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Materials
    if (particles)
      shaderRef.current.uniforms.uResolution.value = setUResolution()


  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const setUResolution = () => {
    return new Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
  }


  return (
    <>
      <color attach={'background'} args={[clearColor]} />
      <CameraControls makeDefault maxDistance={100} dollySpeed={0.25} />
      <points frustumCulled={false}>
        <sphereGeometry args={[1, 32, 32]} />
        <shaderMaterial
          ref={shaderRef}
          blending={AdditiveBlending}
          depthWrite={false}
          vertexShader={
            `${simplexNose3d}
            ${flowFieldVertexShader}
            `
          }
          fragmentShader={`${flowFieldFragnentSahder}`}
          uniforms={{
            uSize: new Uniform(0.3),
            uResolution: new Uniform(setUResolution()),
            uProgress: new Uniform(0),
          }
          }
        />
      </points>
    </>
  );
};

export default Experience;
