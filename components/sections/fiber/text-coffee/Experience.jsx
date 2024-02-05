import {
  CameraControls, Center, Decal, Text3D, useGLTF, useTexture,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { useThree } from "@react-three/fiber";

const Experience = ({ margin = 0.5 }) => {
  const { width, height } = useThree((state) => state.viewport)

  return (
    <>
      <Center bottom right position={[-width / 2 + margin, height / 2 - margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font="/assets/textCoffee/Inter_Bold.json">
          top left
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center top left position={[width / 2 - margin, -height / 2 + margin, 0]}>
        <Text3D letterSpacing={-0.06} size={0.5} font="/assets/textCoffee/Inter_Bold.json">
          bottom right
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
      <Center rotation={[-0.5, -0.25, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font="/assets/textCoffee/Inter_Bold.json">
          {`hello\nworld`}
          <meshNormalMaterial />
        </Text3D>
        <Center position={[-1.25, 0, 0]}>
          <Cup scale={2} />
        </Center>
      </Center>
    </>
  );
};

export default Experience;

function Cup(props) {
  const { nodes, materials } = useGLTF('/assets/textCoffee/coffee-transformed.glb')
  const texture = useTexture('/assets/textCoffee/1200px-Starbucks_Logo_ab_2011.svg.png')
  console.log(materials);
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.coffee_cup_top_16oz.geometry} material={materials['13 - Default']}>
        {/* <Decal position={[0, 0.75, 0.3]} rotation={[0, 0, 0]} scale={[0.52, 0.6, 0.6]} map={texture} /> */}
      </mesh>
    </group>
  )
}