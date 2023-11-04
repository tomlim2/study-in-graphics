import { OrbitControls, Environment } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
const Experience = () => {
    const meshTemp = useRef()
    useFrame((state, delta)=>{
        const time = state.clock.elapsedTime;
        if(meshTemp.current){

            meshTemp.current.rotation.z = time;
        }

    })
    return (
        <>
            <OrbitControls makeDefault />
            <Environment background files={["/assets/images/environmentMaps/2/px.jpg",
                "/assets/images/environmentMaps/2/nx.jpg",
                "/assets/images/environmentMaps/2/py.jpg",
                "/assets/images/environmentMaps/2/ny.jpg",
                "/assets/images/environmentMaps/2/pz.jpg",
                "/assets/images/environmentMaps/2/nz.jpg",]} />
            <mesh ref={meshTemp} castShadow receiveShadow scale={2}>
                <boxGeometry />
                <meshStandardMaterial color={"red"} />
            </mesh>
        </>
    )
}

export default Experience