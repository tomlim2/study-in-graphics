import { useControls } from "leva";
import { CameraControls, useGLTF } from "@react-three/drei";
import flowFieldVertexShader from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/vertex.glsl'
import flowFieldFragmentSahder from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/fragment.glsl'
import flowFieldParticleShader from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/particles.glsl'
import simplexNose3d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise3d.glsl'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshBasicMaterial, PlaneGeometry, SphereGeometry, Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";

import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer";
import { useFrame } from "@react-three/fiber";

const Experience = (props) => {
  const renderer = props.canvasRef

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

  const baseGeometry = {}
  baseGeometry.instance = new SphereGeometry(3)
  baseGeometry.count = baseGeometry.instance.attributes.position.count

  const gpgpu = {}
  gpgpu.size = Math.ceil(Math.sqrt(baseGeometry.count))
  gpgpu.computation = new GPUComputationRenderer(gpgpu.size, gpgpu.size, renderer)

  const particles = {}

  // Base particles
  const baseParticlesTexture = gpgpu.computation.createTexture()
  // console.log(baseParticlesTexture, 'baseParticlesTexture');
  // console.log(baseParticlesTexture.image.data, 'baseParticlesTexture.image.data');
  for (let i = 0; i < baseGeometry.count; i++) {
    const i3 = i * 3
    const i4 = i * 4

    // Position based on geometry
    baseParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3 + 0]
    baseParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1]
    baseParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2]
    baseParticlesTexture.image.data[i4 + 3] = 0
  }

  // console.log(baseParticlesTexture.image.data)

  // Particles variable
  gpgpu.particlesVariable = gpgpu.computation.addVariable('uParticles', flowFieldParticleShader, baseParticlesTexture)
  gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [gpgpu.particlesVariable])

  
  const onUpdateGeometry = (geometry) => {
    geometry = baseGeometry.instance
  }

  // Init
  gpgpu.computation.init()
  
  console.log(gpgpu.computation);

  useFrame((state, delta) => {
    // GPGPU Update
    gpgpu.computation.compute()
  })

  gpgpu.debug = new Mesh(
    new PlaneGeometry(3, 3),
    new MeshBasicMaterial({ map: gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture })
  )
  gpgpu.debug.position.x = 3


  return (
    <>
      <color attach={'background'} args={[clearColor]} />
      <CameraControls makeDefault maxDistance={100} dollySpeed={0.25} />
      <mesh {...gpgpu.debug}></mesh>
      <points frustumCulled={false}>
        <sphereGeometry onUpdate={(geometry) => onUpdateGeometry(geometry)} args={[1, 16, 16]} />
        <shaderMaterial
          ref={shaderRef}
          blending={AdditiveBlending}
          depthWrite={false}
          vertexShader={
            `${simplexNose3d}
            ${flowFieldVertexShader}
            `
          }
          fragmentShader={`${flowFieldFragmentSahder}`}
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
