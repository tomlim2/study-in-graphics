import { useControls } from "leva";
import { CameraControls, useGLTF } from "@react-three/drei";
import flowFieldVertexShader from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/vertex.glsl'
import flowFieldFragnentSahder from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/fragment.glsl'
import flowFieldParticleShader from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/particles.glsl'
import simplexNose3d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise3d.glsl'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Float32BufferAttribute, SphereGeometry, Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer'
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
  console.log(baseParticlesTexture, 'baseParticlesTexture');
  console.log(baseParticlesTexture.image.data, 'baseParticlesTexture.image.data');

  // Particles variable
  gpgpu.particlesVariable = gpgpu.computation.addVariable('uParticles', flowFieldParticleShader, baseParticlesTexture)
  gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [gpgpu.particlesVariable])

  // Init
  console.log(renderer);
  gpgpu.computation.init()
  if (renderer) {
    
  }

  // Debug
  gpgpu.debug = <mesh position={[3, 0, 0]}><planeGeometry args={[3, 3]} /><meshBasicMaterial /></mesh>

  const onUpdateGeometry = (geometry) => {
    geometry = baseGeometry.instance

  }

  useFrame((state, delta) => {
    // GPGPU Update
    gpgpu.computation.compute()
  })


  return (
    <>
      <color attach={'background'} args={[clearColor]} />
      <CameraControls makeDefault maxDistance={100} dollySpeed={0.25} />
      {gpgpu.debug}
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
