import { useControls } from "leva";
import { CameraControls, useGLTF } from "@react-three/drei";
import morphingVertexShader from 'raw-loader!glslify-loader!shaders/particle-morphing/vertex.glsl'
import morphingFragnentSahder from 'raw-loader!glslify-loader!shaders/particle-morphing/fragment.glsl'
import simplexNose3d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise3D.glsl'
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";

const Experience = () => {
  const shaderRef = useRef()
  const gltfModels = useGLTF('/particle-morphing/models.glb')
  const { progress } = useControls("canvas", {
    progress: {
      value: 0, min: 0, max: 1, step: 0.01,
      onChange: (value) => {
        if (shaderRef.current) {
          shaderRef.current.uniforms.uProgress.value = value;
        }
      }
    },
  });
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

  const onUpdateBufferGeometry = (geo) => {
    console.log(geo, 'geo');
    console.log(gltfModels, 'gltfModels');
    particles = {}

    // // Positions
    const positions = gltfModels.scene.children.map((child) => {
      return child.geometry.attributes.position
    })
    console.log(positions, 'positions');
    particles.maxCount = 0

    for (const position of positions) {
      if (position.count > particles.maxCount) {
        particles.maxCount = position.count
      }
    }

    particles.positions = []
    for (const position of positions) {
      {
        const originalArray = position.array
        const newArray = new Float32Array(particles.maxCount * 3)

        for (let i = 0; i < particles.maxCount; i++) {
          const i3 = i * 3

          if (i3 < originalArray.length) {
            newArray[i3 + 0] = originalArray[i3 + 0]
            newArray[i3 + 1] = originalArray[i3 + 1]
            newArray[i3 + 2] = originalArray[i3 + 2]
          } else {
            const randomIndex = Math.floor(position.count * Math.random()) * 3
            newArray[i3 + 0] = originalArray[randomIndex + 0]
            newArray[i3 + 1] = originalArray[randomIndex + 1]
            newArray[i3 + 2] = originalArray[randomIndex + 2]
          }

        }
        particles.positions.push(new Float32BufferAttribute(newArray, 3))
      }
    }
    console.log(particles.positions, 'particles.positions');
    // Geometry
    geo.setAttribute('position', particles.positions[1])
    geo.setAttribute('position', particles.positions[1])
    geo.setAttribute('aPositionTarget', particles.positions[3])
  }

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />

      <points>
        <bufferGeometry onUpdate={(geo) => { onUpdateBufferGeometry(geo) }}>
        </bufferGeometry>
        <shaderMaterial
          ref={shaderRef}
          blending={AdditiveBlending}
          depthWrite={false}
          vertexShader={
            `${simplexNose3d}
            ${morphingVertexShader}
            `
          }
          fragmentShader={`${morphingFragnentSahder}`}
          uniforms={{
            uSize: new Uniform(0.3),
            uResolution: new Uniform(setUResolution()),
            uProgress: new Uniform(progress)
          }
          }
        />
      </points>
    </>
  );
};

export default Experience;
