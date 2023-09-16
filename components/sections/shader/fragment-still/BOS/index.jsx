import { useEffect, useState, useRef } from "react";
import { shaderMap } from "./shader/shaderMap";
import { Canvas } from "@react-three/fiber";

import ButtonBasic from "components/buttons/buttonBasic";
import Experience from "./Experience";

import "../../common/section-shader.scss";

const BookOfShaders = () => {
  const [shaderNumber, setShaderNumber] = useState(0);
  const [resolution, setResolution] = useState();
  const [mousePos, setMousePos] = useState();
  const [isOn, setIsOn] = useState(false);
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

  const checkResolution = () => {
    setResolution({ x: window.innerWidth, y: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", checkResolution);
    return () => {
      window.removeEventListener("resize", checkResolution);
    };
  });

  return (
    <div className="canvas-wrapper">
      <div className="canvas-main" ref={refCanvas}>
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
      <div className="canvas-info">
        <div>
          <h2>Book of shaders</h2>
          <div className="buttons">
            {shaderMap.map((shader, index) => (
              <ButtonBasic
                key={index}
                onClick={() => onClick(index)}
                onMouseEnter={() => onMouseEnter(index)}
                activated={shaderNumber == index}
              >
                {`${index + 1} ${shader.name}`}
              </ButtonBasic>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOfShaders;
