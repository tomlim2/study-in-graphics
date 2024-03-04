import { useLoader } from "@react-three/fiber";
import * as THREE from "three"


export default function Fireworks() {
    const heyMap = useLoader(THREE.TextureLoader, '/assets/images/thumbnails/test-glsl-1.png')
    const count = 20
    const positionsArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        positionsArray[i3] = Math.random() - 0.5
        positionsArray[i3 + 1] = Math.random() - 0.5
        positionsArray[i3 + 2] = Math.random() - 0.5
    }

    console.log(positionsArray);

    return <>
        <points>
            <bufferGeometry >
                <bufferAttribute
                    attach="attributes-position" //attribute parameter yang akan dikontrol
                    array={positionsArray}
                    count={count} //
                    itemSize={3} //dikeranakan telah diketahui bahwa tiap arraytype axis akan berisi 3 value pada 1d array
                />
            </bufferGeometry>
            <pointsMaterial
                map={heyMap}
                sizes={0.5}
                sizeAttenuation //merupakan parameter yang menscale object berdasarkan perspective camera
                transparent={false}
                alphaTest={0.5} //merupakan thresshold saat rendering untuk mencega bila opacity dibawah value alphatest
                opacity={1.0}
            />
        </points>
    </>
}