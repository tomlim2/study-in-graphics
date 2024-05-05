import { useControls } from "leva";
import { CameraControls, useGLTF } from "@react-three/drei";
import morphingVertexShader from 'raw-loader!glslify-loader!shaders/particle-morphing/vertex.glsl'
import morphingFragnentSahder from 'raw-loader!glslify-loader!shaders/particle-morphing/fragment.glsl'
import simplexNose3d from 'raw-loader!glslify-loader!shaders/libs/simplexNoise3d.glsl'
import { AdditiveBlending, BufferAttribute, BufferGeometry, Float32BufferAttribute, Uniform, Vector2 } from "three";
import { useEffect, useRef } from "react";
import gsap from "gsap/gsap-core";

const Experience = () => {
  const shaderRef = useRef()
  const bufferRef = useRef()
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
    morph: { value: 0, min: 0, max: 3, step: 1, onChange: (num) => { particles.morph(num) } },
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
    
    // Geometry
    if(bufferRef.current)
      bufferRef.current.onUpdate(geo => onUpdateBufferGeometry(geo))
    

    // Materials
    if (particles)
      shaderRef.current.uniforms.uResolution.value.set(setUResolution())

    if (shaderRef.current) 
      shaderRef.current.uniforms.uResolution.value = new Uniform(setUResolution())
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
    particles = {}
    particles.index = 0

    // Methods
    particles.morph = (index) => {
      // Update attributes
      geo.attributes.position = particles.positions[particles.index]
      geo.attributes.aPositionTarget = particles.positions[index]

      // Animate uProgress
      gsap.fromTo(
        shaderRef.current.uniforms.uProgress,
        { value: 0 },
        { value: 1, duration: 3, ease: 'linear' }
      )
      // Save index
      particles.index = index
    }

    // // Positions
    const positions = gltfModels.scene.children.map((child) => {
      return child.geometry.attributes.position
    })
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
    // Geometry
    const sizesArray = new Float32Array(particles.maxCount)
    for(let i = 0; i < particles.maxCount; i++)
	    sizesArray[i] = Math.random()
    
    geo.setAttribute('aPositionTarget', particles.positions[3])
    geo.setAttribute('position', particles.positions[particles.index])
    geo.setAttribute('aSize', new BufferAttribute(sizesArray, 1))

    
  }

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />

      <points>
        <bufferGeometry ref={bufferRef} onUpdate={(geo) => { onUpdateBufferGeometry(geo) }} />
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
