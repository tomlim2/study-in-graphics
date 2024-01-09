import SectionGlsl1 from "../../../components/sections/shader/glsl-1/index";
import styles from "./page.module.scss";
export const metadata = {
  title: "Glsl | Shader | yslim",
  description: "My playground",
};

const FragnentStill = () => {
  return (
    <main className={styles.page}>
      <SectionGlsl1 />
    </main>
  );
};

export default FragnentStill;
