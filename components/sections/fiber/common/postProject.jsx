import { useRecoilState } from "recoil";
import { currentShaderIndex } from "stores/storeFiber";
import { useEffect, useRef, useState } from "react";

import styles from "./fiber.module.scss";


export default function PostProject(props) {
  const [currentIndex, setCurrentIndex] = useRecoilState(currentShaderIndex);
  const { canvasComponent, info, shaderIndex } = props;
  const [isOn, setIsOn] = useState(false);
  const refCanvas = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-50%",
      threshold: 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentIndex(shaderIndex);
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(refCanvas.current);
  });

  useEffect(() => {
    const isCurrentIndex = shaderIndex === currentIndex;
    const isPrevIndex = shaderIndex === currentIndex - 1;
    const isNextIndex = shaderIndex === currentIndex + 1;

    if (
      // isPrevIndex || isNextIndex ||
      isCurrentIndex
    ) {
      setIsOn(true);
    } else {
      setIsOn(false);
    }
  }, [currentIndex, shaderIndex]);

  return (
    <div className={styles["canvas-wrapper"]}>
      <div className={styles["canvas-main"]} ref={refCanvas}>
        {isOn && canvasComponent}
      </div>
      <div className={styles["canvas-info"]}>
        <div>
          <h2>{info}</h2>
        </div>
      </div>
    </div>
  );
}
