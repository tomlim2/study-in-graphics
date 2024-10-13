import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

const WIDTH = 128; // Number of dots on each axis
const PARTICLES = WIDTH * WIDTH; // Total number of dots

function PingPongDots() {
  const rt1 = useRef(); // Render target 1
  const rt2 = useRef(); // Render target 2
  const positionsVariable = useRef();
  const material = useRef();
  const pingPong = useRef(true); // Boolean to swap targets
  const { scene, camera } = useThree();

  useEffect(() => {
    const size = new THREE.Vector2(WIDTH, WIDTH);

    // Create render targets
    rt1.current = new THREE.WebGLRenderTarget(WIDTH, WIDTH, { format: THREE.RGBAFormat });
    rt2.current = new THREE.WebGLRenderTarget(WIDTH, WIDTH, { format: THREE.RGBAFormat });

    // Initialize shader material for drawing dots
    material.current = new THREE.ShaderMaterial({
      uniforms: {
        positionTexture: { value: rt1.current.texture },
        time: { value: 0 }
      },
      vertexShader: vertexShader,   // Define your vertex shader here
      fragmentShader: fragmentShader // Define your fragment shader here
    });

    // Initialize positions and other setup as needed (for example, GPUComputationRenderer, if used)
  }, []);

  useFrame(({ gl }) => {
    // Swap render targets using ping-pong
    pingPong.current = !pingPong.current;
    
    const readTarget = pingPong.current ? rt1.current : rt2.current;
    const writeTarget = pingPong.current ? rt2.current : rt1.current;

    // First pass: update particle positions
    gl.setRenderTarget(writeTarget);
    // Add logic here for updating positions if needed (via a compute shader, for example)

    // Second pass: render dots using the updated positions
    material.current.uniforms.positionTexture.value = writeTarget.texture;
    gl.setRenderTarget(null); // Render to screen
    gl.render(scene, camera);
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(PARTICLES * 3), 3]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        uniforms={{
          positionTexture: { value: null },
          time: { value: 0 }
        }}
        vertexShader={vertexShader}   // Dot position logic here
        fragmentShader={fragmentShader} // Dot color logic here
      />
    </points>
  );
}

// Vertex shader example (position based on texture coordinates)
const vertexShader = `
  uniform sampler2D positionTexture;

  void main() {
    vec2 uv = vec2(gl_VertexID % ${WIDTH}.0, gl_VertexID / ${WIDTH}.0) / ${WIDTH}.0;
    vec3 pos = texture2D(positionTexture, uv).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0; // Size of each dot
  }
`;

// Fragment shader example (color output for dots)
const fragmentShader = `
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // White dots
  }
`;

export default PingPongDots;
