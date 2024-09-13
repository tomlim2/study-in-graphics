"use client";
import { Canvas } from "@react-three/fiber";
import "./SectionWaveOnClick.scss";
import Experience from "./Experience";

const SectionWaveOnClick = () => {
  return (
    <div className={"sectionWaveOnClick"}>
      <>
        <Canvas>
          <Experience />
        </Canvas>
      </>
    </div>
  );
};

export default SectionWaveOnClick;
