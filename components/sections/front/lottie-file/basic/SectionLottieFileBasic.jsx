"use client";
import "./SectionLottieFileBasic.scss";
import { Player } from "@lottiefiles/react-lottie-player";

const SectionLottieFileBasic = () => {
  return (
    <div className={"section"}>
      <Player
        autoplay
        loop
        src="/assets/lotties/heart-animation.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
    </div>
  );
};

export default SectionLottieFileBasic;
