import "@lottiefiles/lottie-player";
import "./SectionLottieFileBasic.scss";

const SectionLottieFileBasic = () => {
  return (
    <div className={"section"}>
      hihi
      <lottie-player
        autoplay
        // controls
        loop
        mode="normal"
        src="/assets/lotties/heart-animation.json"
        style={{ width: 320 + "px" }}
      ></lottie-player>
    </div>
  );
};

export default SectionLottieFileBasic;
