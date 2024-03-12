import SectionHalftoneShading from "@/components/sections/fiber/halftone-shading";
import styles from "./page.module.scss";
import SectionLightsShading from "components/sections/fiber/lights-shading";

export const metadata = {
  title: "Lights Shading | Fiber | yslim",
  description: "My playground",
};

const LightsShadingPage = () => {

  return (
    <main className={styles.page}>
      <SectionHalftoneShading/>
    </main>
  );
};

export default LightsShadingPage;
