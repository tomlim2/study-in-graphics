import SectionGlsl2 from "../../../components/sections/shader/glsl-2/index";
import styles from "./page.module.scss";
export const metadata = {
  title: "Glsl | Shader | yslim",
  description: "My playground",
};

const FragnentStill = () => {
  return (
    <main className={styles.page}>
      <SectionGlsl2 />
    </main>
  );
};

export default FragnentStill;
