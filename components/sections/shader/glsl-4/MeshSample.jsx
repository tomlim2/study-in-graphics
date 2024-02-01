import MaterialSample from "./MaterialSample"
import { useRef } from "react";

const MeshSample = () => {
    const width = 6
    const height = 6
    const materialRef = useRef();

    const eventHandler = (event, eventType) => {
        if (eventType == "onPointerEnter") {
            document.body.style.cursor = "pointer";
        }
        if (eventType == "onPointerLeave") {
            document.body.style.cursor = "default";
        }
        if (eventType == "onPointerMove") {
            document.body.style.cursor = "pointer";

            // console.log(MaterialSample); 
            if (materialRef && materialRef.current) {
                materialRef.current.uniforms.uMouse.value.x = event.uv.x;
                materialRef.current.uniforms.uMouse.value.y = event.uv.y;
            }
        }
    };

    return (
        <mesh onPointerMove={(event) => eventHandler(event, "onPointerMove")}>
            <planeGeometry args={[width, height]} />
            <MaterialSample width={width} height={height} materialRef={materialRef} />
        </mesh>
    )
}

export default MeshSample
