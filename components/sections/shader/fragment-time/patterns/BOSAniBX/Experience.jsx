import {
  Sky,
  AccumulativeShadows,
  Lightformer,
  useHelper,
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { shaders } from "./shaders";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { useControls } from "leva";
import { Router, useRouter } from "next/router";
import { Color } from "three";

const Experience = () => {
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  const planeDimention = { width: 3, height: 3 };

  const timeSpeed = useRef(1);

  useFrame((state, delta) => {
    if (materialRef && materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * timeSpeed.current;
    }
  });

  const eventHandler = (event, eventType) => {
    if (eventType == "onPointerEnter") {
      document.body.style.cursor = "pointer";
    }
    if (eventType == "onPointerLeave") {
      document.body.style.cursor = "default";
    }
    if (eventType == "onPointerMove") {
      document.body.style.cursor = "pointer";
      console.log("X", event.uv.x, "Y", event.uv.y); // UV coordinates on the geometry (in 2D)
      if (materialRef && materialRef.current) {
        materialRef.current.uniforms.uMouseX.value = event.uv.x;
        materialRef.current.uniforms.uMouseY.value = event.uv.y;
      }
    }
  };

  return (
    <>
      <OrbitControls makeDefault />
      <Environment
        background
        // files={[
        //   "/assets/environmentMaps/2/px.jpg",
        //   "/assets/environmentMaps/2/nx.jpg",
        //   "/assets/environmentMaps/2/py.jpg",
        //   "/assets/environmentMaps/2/ny.jpg",
        //   "/assets/environmentMaps/2/pz.jpg",
        //   "/assets/environmentMaps/2/nz.jpg",
        // ]}
        // files="/assets/environmentMaps/the_sky_is_on_fire_2k.hdr"
        // preset="sunset"
        // resolution={32}
        preset="sunset"
      ></Environment>
      <group>
        <mesh
          ref={meshRef}
          onClick={(event) => eventHandler(event, "onClick")}
          onContextMenu={(event) => eventHandler(event, "onRightClick")}
          onDoubleClick={(event) => eventHandler(event, "onDoubleClick")}
          onPointerUp={(event) => eventHandler(event, "onPointerUp")}
          onPointerDown={(event) => eventHandler(event, "onPointerDown")}
          onPointerOver={(event) => eventHandler(event, "onPointerOver")}
          onPointerEnter={(event) => eventHandler(event, "onPointerEnter")}
          onPointerOut={(event) => eventHandler(event, "onPointerOut")}
          onPointerLeave={(event) => eventHandler(event, "onPointerLeave")}
          onPointerMove={(event) => eventHandler(event, "onPointerMove")}
        >
          <boxGeometry
            args={[
              planeDimention.width,
              planeDimention.width,
              planeDimention.height,
            ]}
          />
          <shaderMaterial
            ref={materialRef}
            uniforms={{
              uTime: { value: 0 },
              uWidth: { value: planeDimention.width },
              uHeight: { value: planeDimention.height },
              uMouseX: { value: 0 },
              uMouseY: { value: 0 },
              uParamsA: { value: 12 },
              uParamsB: { value: 1 },
              uParamsC: { value: 0.02 },
              uParamsD: { value: 1 },
              uColorA: { value: new Color("#1d79a0") },
              uColorB: { value: new Color("#ffffff") },
            }}
            fragmentShader={shaders[0].fragment}
            vertexShader={shaders[0].vertex}
          />
        </mesh>
      </group>
    </>
  );
};

export default Experience;
