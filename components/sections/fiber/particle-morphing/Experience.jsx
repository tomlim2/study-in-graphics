import { CameraControls, useGLTF } from "@react-three/drei";
import morphingVertexShader from 'raw-loader!glslify-loader!shaders/particle-morphing/vertex.glsl'
import morphingFragnentSahder from 'raw-loader!glslify-loader!shaders/particle-morphing/fragment.glsl'
import { AdditiveBlending, Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";

const Experience = () => {
  const shaderRef = useRef()
  let particles = null
  const gltfModels = useGLTF('/particle-morphing/models.glb')
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
  useEffect(() => {
    console.log(gltfModels, 'gltfModels');
    // Positions
    gltfModels.scene.children.map((child) => {
      console.log(child)
    })
  }, [gltfModels])
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Materials
    if (particles)
      particles.material.uniforms.uResolution.value.set(setUResolution())

    if (shaderRef.current) {
      shaderRef.current.uniforms.uResolution.value = new Uniform(setUResolution())
    }
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
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <points>
        <sphereGeometry args={[3]} setIndex={null} />
        <shaderMaterial
          ref={shaderRef}
          blending={AdditiveBlending}
          depthWrite={false}
          vertexShader={morphingVertexShader}
          fragmentShader={morphingFragnentSahder}
          uniforms={{
            uSize: new Uniform(0.05),
            uResolution: new Uniform(setUResolution()),
          }
          }
        />
      </points>
    </>
  );
};

export default Experience;
