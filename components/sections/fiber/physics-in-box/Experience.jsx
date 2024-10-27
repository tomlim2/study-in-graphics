import { Physics, RigidBody } from "@react-three/rapier";


const Experience = () => {

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight
        position={[2, 2, 2]}
        intensity={10}
      />
      <Physics>
        <RigidBody>
          <mesh castShadow position={[- 2, 2, 0]}>
            <sphereGeometry attach="geometry" args={[1, 32, 32]} />
            <meshToonMaterial attach="material" color="hotpink" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">

          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshToonMaterial attach="material" color="greenyellow" />
          </mesh>
        </RigidBody>

      </Physics>
    </>
  );
};

export default Experience;
