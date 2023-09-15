import Lottie from "react-lottie-player";
import lottieJson from "../jsons/heart-animation.json";
import "./SectionLottieFileBasic.scss";

const SectionLottieFileBasic = () => {
  return (
    <div className={"section"}>
      <Lottie
        loop
        animationData={lottieJson}
        play
        // style 은 선택
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default SectionLottieFileBasic;
