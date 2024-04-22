import { CameraControls, useGLTF } from "@react-three/drei";
import morphingVertexShader from 'raw-loader!glslify-loader!shaders/particle-morphing/vertex.glsl'
import morphingFragnentSahder from 'raw-loader!glslify-loader!shaders/particle-morphing/fragment.glsl'
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";

const Experience = () => {
  const shaderRef = useRef()
  const gltfModels = useGLTF('/particle-morphing/models.glb')
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
  let particles = null
  useEffect(() => {
    console.log(gltfModels, 'gltfModels');
    particles = {}
    // Positions
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
            newArray[i3 + 0] = 0
            newArray[i3 + 1] = 0
            newArray[i3 + 2] = 0
          }
          particles.positions.push(new Float32BufferAttribute(newArray, 3))
          console.log(particles.positions, 'particles.positions');
          // Geometry
          particles.geometry = new BufferGeometry()
          particles.geometry.setAttribute('position', particles.positions[1])
        }
      }
    }

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
        <bufferGeometry setIndex={null}>
          {particles && <bufferAttribute
            attachObject={['attributes', 'position']}
            count={particles.maxCount}
            array={particles.positions}
            itemSize={3}></bufferAttribute>}
        </bufferGeometry>
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
