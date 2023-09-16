
import { useEffect, useState, useRef } from "react";
import { shaderMap } from "./shader/shaderMap";
import { Canvas } from "@react-three/fiber";
import ButtonBasic from "components/buttons/buttonBasic";
import Experience from "./Experience";

import styles from "../../../fiber/common/fiber.module.scss";

const ProjectGlsl = () => {
  const [shaderNumber, setShaderNumber] = useState(0);
  const [isOn, setIsOn] = useState(false);
  const [mousePos, setMousePos] = useState();
  const refCanvas = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsOn(true);
        } else {
          setIsOn(false);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(refCanvas.current);
  }, []);

  const created = (state) => {
    // state.gl.setClearColor("#252525");
  };
  const onMouseEnter = (index) => {
    if (index !== shaderNumber) setShaderNumber(index);
  };
  const onClick = (index) => {
    if (index !== shaderNumber) setShaderNumber(index);
  };

  return (
    <div className={styles["canvas-wrapper"]}>
      <div className={styles["canvas-main"]} ref={refCanvas}>
        {isOn && (
          <Canvas onCreated={created}>
            {shaderMap.map((shader, index) => {
              if (shaderNumber === index) {
                return (
                  <Experience key={index} shader={shader} mousePos={mousePos} />
                );
              }
            })}
          </Canvas>
        )}
      </div>
      <div className={styles["canvas-info"]}>
        <div>
          <h2>Shader patterns</h2>
          <div className="buttons">
            {shaderMap.map((shader, index) => (
              <ButtonBasic
                key={index}
                onClick={() => onClick(index)}
                onMouseEnter={() => onMouseEnter(index)}
                activated={shaderNumber == index}
              >
                {index + 1}
              </ButtonBasic>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectGlsl;
