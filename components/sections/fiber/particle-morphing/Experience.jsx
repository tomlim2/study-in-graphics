import { CameraControls } from "@react-three/drei";
import morphingVertexShader from 'raw-loader!glslify-loader!shaders/particle-morphing/vertex.glsl'
import morphingFragnentSahder from 'raw-loader!glslify-loader!shaders/particle-morphing/fragment.glsl'
import { Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";

const Experience = () => {
  const shaderRef = useRef()
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
  const handleResize = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

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
        <sphereGeometry args={[3]} />
        <shaderMaterial
          ref={shaderRef}
          vertexShader={morphingVertexShader}
          fragmentShader={morphingFragnentSahder}
          uniforms={{
            uSize: new Uniform(0.04),
            uResolution: new Uniform(setUResolution()),
          }
          }
        />
      </points>
    </>
  );
};

export default Experience;
