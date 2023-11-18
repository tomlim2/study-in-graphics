import { OrbitControls, Environment } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react"
import { DoubleSide, Group, TextureLoader } from "three";
const Experience = () => {
    const meshTemp = useRef()
    const colorMap = useLoader(TextureLoader, "/assets/images/img_uv_00.png");
    const alphaMap = useLoader(TextureLoader, "/assets/images/img_alpha_00.png");
    const materialList = [
        <meshStandardMaterial key={1} color={"red"} />,
        <meshStandardMaterial key={2} map={colorMap} />,
        <meshBasicMaterial key={3} color={"red"} />,
        <meshStandardMaterial key={4} wireframe={true} color={"blue"} />,
        <meshStandardMaterial key={5} transparent={true} opacity={.5} map={colorMap} />,
        <meshStandardMaterial key={6} transparent={true} alphaMap={alphaMap} color={"green"} side={DoubleSide} />,
        <meshStandardMaterial key={7} color={"red"} />,
        <meshStandardMaterial key={8} map={colorMap} />,
        <meshStandardMaterial key={9} color={"red"} />,
        <meshStandardMaterial key={9} color={"blue"} />,
        <meshStandardMaterial key={9} color={"green"} />,
        <meshStandardMaterial key={9} color={"yellow"} />,
    ]
    const testMesh = (keyNumber = 0, position = [0, 0, 0], castMaterial = <meshStandardMaterial color={"red"} />) => {
        return (
            <mesh key={keyNumber} castShadow receiveShadow position={position} scale={1}>
                <boxGeometry />
                {castMaterial}
            </mesh>
        )
    }
    const meshArray = []
    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        if (meshTemp.current) {

            meshTemp.current.rotation.z = time;
        }

    })
    const breakNumber = 3;
    let countBreak = 1;
    let col = 0;
    let row = 0;
    return (
        <>
            <OrbitControls makeDefault />
            <Environment
                background
                rotation={[0, 0, 0]}
                files={[
                    "/assets/images/environmentMaps/1/px.jpg",
                    "/assets/images/environmentMaps/1/nx.jpg",
                    "/assets/images/environmentMaps/1/py.jpg",
                    "/assets/images/environmentMaps/1/ny.jpg",
                    "/assets/images/environmentMaps/1/pz.jpg",
                    "/assets/images/environmentMaps/1/nz.jpg"
                ]} />
            <group position={[-(breakNumber + 1) * 1.2 / 2, -(materialList.length / breakNumber - 1) * 1.2 / 2, 0]}>
                {materialList.map((itemMaterial, index) => {
                    if (index > breakNumber * countBreak - 1) {
                        row = row + 1
                        countBreak = countBreak + 1
                        col = 0
                    }
                    col++;

                    return testMesh(index, [col * 1.2, row * 1.2, 0], itemMaterial)
                })}
            </group>
        </>
    )
}

export default Experience