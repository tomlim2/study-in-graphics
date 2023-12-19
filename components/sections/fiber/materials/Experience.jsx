import { GradientTexture, OrbitControls } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react"
import { Color, DoubleSide, NearestFilter, TextureLoader } from "three";

const Experience = () => {
    const meshTemp = useRef()
    const refPointLight = useRef()
    const colorMap = useLoader(TextureLoader, "/assets/images/img_uv_default.png");
    const alphaMap = useLoader(TextureLoader, "/assets/images/img_alpha_00.png");
    const gradientTexture = useLoader(TextureLoader, "/assets/images/toonGradientMap/024.png");
    const matcapsMapA = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00007.png");
    const matcapsMapB = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00337.png");
    const matcapsMapC = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00102.png");
    const matcapsMapD = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00282.png");
    const matcapsMapE = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00523.png");
    const matcapsMapF = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00635.png");
    const matcapsMapG = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00636.png");
    const matcapsMapH = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00386.png");
    const matcapsMapI = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00239.png");
    const matcapsMapJ = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00374.png");
    const matcapsMapK = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00077.png");
    const matcapsMapL = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00166.png");
    const matcapsMapM = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00038.png");
    const matcapsMapN = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00205.png");
    const matcapsMapO = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00052.png");
    const matcapsMapP = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00638.png");
    const matcapsMapR = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00290.png");
    const matcapsMapQ = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00257.png");
    const matcapsMapS = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00114.png");
    const matcapsMapT = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00107.png");
    const matcapsMapU = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00076.png");
    const matcapsMapV = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00068.png");
    const matcapsMapW = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00038.png");
    const matcapsMapX = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00044.png");
    const matcapsMapY = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00046.png");
    const matcapsMapZ = useLoader(TextureLoader, "/assets/images/matcaps/matcap_00045.png");

    gradientTexture.minFilter = NearestFilter;
    gradientTexture.magFilter = NearestFilter;
    gradientTexture.generateMipmaps = false;

    const materialList = [
        <meshStandardMaterial key={1} color={"red"} />,
        <meshStandardMaterial key={2} map={colorMap} />,
        <meshBasicMaterial key={3} color={"yellow"} />,
        <meshStandardMaterial key={4} wireframe={true} color={"blue"} />,
        <meshStandardMaterial key={5} transparent={true} opacity={.5} map={colorMap} />,
        <meshStandardMaterial key={6} transparent={true} alphaMap={alphaMap} color={"green"} side={DoubleSide} />,
        <meshStandardMaterial key={7} flatShading={true} color={"red"} />,
        <meshMatcapMaterial key={8} matcap={matcapsMapA} />,
        <meshMatcapMaterial key={9} matcap={matcapsMapB} />,
        <meshPhongMaterial key={10} shininess={100} specular={new Color(0x1188ff)} color={0xffffff} />,
        <meshToonMaterial key={11} color={0x00ffff} />,
        <meshToonMaterial key={12} color={0xff00ff}>
        </meshToonMaterial>,
        <meshToonMaterial key={13} color={0xff0000} />,
        <meshToonMaterial key={14} color={0x00ff00} />,
        <meshMatcapMaterial key={15} matcap={matcapsMapE} />,
        <meshMatcapMaterial key={16} matcap={matcapsMapF} />,
        <meshMatcapMaterial key={17} matcap={matcapsMapG} />,
        <meshMatcapMaterial key={18} matcap={matcapsMapH} />,
        <meshMatcapMaterial key={19} matcap={matcapsMapI} />,
        <meshMatcapMaterial key={20} matcap={matcapsMapJ} />,
        <meshMatcapMaterial key={21} matcap={matcapsMapK} />,
        <meshMatcapMaterial key={22} matcap={matcapsMapL} />,
        <meshMatcapMaterial key={23} matcap={matcapsMapM} />,
        <meshMatcapMaterial key={24} matcap={matcapsMapN} />,
        <meshMatcapMaterial key={25} matcap={matcapsMapO} />,
        <meshMatcapMaterial key={26} matcap={matcapsMapP} />,
        <meshMatcapMaterial key={27} matcap={matcapsMapQ} />,
        <meshMatcapMaterial key={28} matcap={matcapsMapR} />,
        <meshMatcapMaterial key={29} matcap={matcapsMapS} />,
        <meshMatcapMaterial key={30} matcap={matcapsMapT} />,
        <meshMatcapMaterial key={25} matcap={matcapsMapU} />,
        <meshStandardMaterial key={26} color={0x00ffff} metalness={.45} roughness={.65} />,
        <meshToonMaterial key={27} gradientMap={gradientTexture}>
        </meshToonMaterial>,
        <meshMatcapMaterial key={28} matcap={matcapsMapX} />,
        <meshToonMaterial key={29}>
            <GradientTexture
                stops={[0, 1]}
                colors={['yellow', 'red']}
                size={1024}
            />
        </meshToonMaterial>,
        <meshToonMaterial key={30}>
            <GradientTexture
                stops={[0, 1]}
                colors={['aquamarine', 'hotpink']}
                size={1024}
            />
        </meshToonMaterial>,
    ]

    const testMesh = (keyNumber = 0, position = [0, 0, 0], castMaterial = <meshStandardMaterial color={"red"} />) => {
        return (
            <mesh key={keyNumber} castShadow receiveShadow position={position} scale={.5}>
                <sphereGeometry />
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
        if (refPointLight.current) {
            refPointLight.current.position.x = Math.sin(time) * 8;
            refPointLight.current.position.y = Math.cos(time) * 8;
        }

    })

    const breakNumber = 6;
    let countBreak = 1;
    let col = 0;
    let row = 0;

    return (
        <>
            <OrbitControls makeDefault />
            <ambientLight color={0xffffff} intensity={.5} />
            <pointLight ref={refPointLight} color={0xffffff} intensity={80} position={[2, 3, 8]} />
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