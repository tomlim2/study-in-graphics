import styles from "./page.module.scss";
import SectionLightsShading from "components/sections/fiber/lights-shading";

export const metadata = {
  title: "Lights Shading | Fiber | yslim",
  description: "My playground",
};

const LightsShadingPage = () => {

  return (
    <main className={styles.page}>
      <SectionLightsShading />
    </main>
  );
};

export default LightsShadingPage;
