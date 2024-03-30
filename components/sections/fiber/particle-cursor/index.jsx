"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import { useRecoilValue } from "recoil";
import { isDebuggerState } from "@/stores/storeFiber"
import styles from "./ParticleCursor.module.scss";

const SectionParticleCursor = () => {
  const canvasConfig = useControls("canvas", {
    toneMapping: {
      value: THREE.CustomToneMapping,
      options: {
        ACESFilmic: THREE.ACESFilmicToneMapping,
        Cineon: THREE.CineonToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Custom: THREE.CustomToneMapping,
      },
    },
    toneMappingExposure: { value: 1.5, min: 0, max: 3, step: 0.01 },
  });
  const isDebugger = useRecoilValue(isDebuggerState)
  return (
    <>
      <canvas className={styles.displacement} width={128} height={128}></canvas>
      {!isDebugger && <Leva hidden={true} />}
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 50,
          position: [0, 0, 15],
        }}
        shadows
        gl={{
          toneMapping: canvasConfig.toneMapping,
          toneMappingExposure: canvasConfig.toneMappingExposure,
        }}
      >
        {isDebugger && <Perf position="bottom-right" />}
        <Experience />
      </Canvas>
    </>

  );
};

export default SectionParticleCursor;
