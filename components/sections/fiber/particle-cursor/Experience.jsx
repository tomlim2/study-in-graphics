import { CameraControls } from "@react-three/drei";
import ParticleForCursor from "./ParticleForCursor";
import { CanvasTexture, DoubleSide, Raycaster, Vector2 } from "three";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";

const Experience = () => {
  const cursorOnMesh = new Vector2(-1, -1)
  const curosrOnMeshPrevious = new Vector2(-1, -1)

  /**
 * Sizes
 */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  }
  const displacement = {}

  // 2D canvas
  displacement.canvas = document.createElement('canvas')
  displacement.canvas.width = 128
  displacement.canvas.height = 128
  displacement.canvas.style.position = 'fixed'
  displacement.canvas.style.width = '256px'
  displacement.canvas.style.height = '256px'
  displacement.canvas.style.top = '50px'
  displacement.canvas.style.left = '20px'
  displacement.canvas.style.zIndex = 10
  document.body.append(displacement.canvas)

  // Context
  displacement.context = displacement.canvas.getContext('2d')
  displacement.context.fillStyle = 'black'
  displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)

  // Glow image
  displacement.glowImage = new Image()
  displacement.glowImage.src = '/particleCursor/glow.png'

  // Texture
  displacement.texture = new CanvasTexture(displacement.canvas)

  const tick = () => {
    if (displacement.canvas) {
      
      // Fade out
      displacement.context.globalCompositeOperation = 'source-over'
      displacement.context.globalAlpha = 0.02
      displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height)

      // Draw glow
      const glowSize = displacement.canvas.width * 0.5
      displacement.context.globalCompositeOperation = 'lighten'
      const dx = cursorOnMesh.x * displacement.canvas.width - glowSize * 0.5
      const dy = (1 - cursorOnMesh.y) * displacement.canvas.height - glowSize * 0.5
      
      // Speed alpha
      const cursorDistance = curosrOnMeshPrevious.distanceTo(new Vector2(dx, dy))
      curosrOnMeshPrevious.copy(new Vector2(dx, dy)*0.1)
      const alpha = Math.min(cursorDistance * 0.009, 1)
      displacement.context.globalAlpha = alpha

      

      displacement.context.drawImage(
        displacement.glowImage,
        dx,
        dy,
        glowSize,
        glowSize
      )


      // Texture
      displacement.texture.needsUpdate = true
    }
  }

  useFrame(state => {
    tick()
  })

  return (
    <>
      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <mesh onPointerMove={(event) => {
        cursorOnMesh.x = event.uv.x;
        cursorOnMesh.y = event.uv.y;
      }}
        visible={false}
      >
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial color={'red'} side={DoubleSide} />
      </mesh>
      <ParticleForCursor
        sizes={sizes}
        displacementTexture={displacement.texture}
      />
    </>
  );
};

export default Experience;
