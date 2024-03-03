const createFirework = (count) => {
    // Geometry
    const positionsArray = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
        const i3 = i * 3

        positionsArray[i3] = Math.random() - 0.5
        positionsArray[i3 + 1] = Math.random() - 0.5
        positionsArray[i3 + 2] = Math.random() - 0.5
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionsArray, 3))
    // Material
    const material = new THREE.PointsMaterial()
    // Points
    const firework = new THREE.Points(geometry, material)
}

export default function Fireworks() {
    return <></>
}